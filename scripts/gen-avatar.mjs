// Processes the source avatar render into the hero avatar PNG.
//
// The source is a stylized 3D character render on a light-grey backdrop with a
// white podium. We key out that low-saturation, high-luminance background,
// erode the thin colour-contaminated halo around the figure, feather the edge,
// then trim to the figure's bounding box.
//
// Run: node scripts/gen-avatar.mjs   (override source with AVATAR_SRC=path)
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/images/avatar.png");
mkdirSync(dirname(out), { recursive: true });

const candidates = [
  process.env.AVATAR_SRC,
  resolve(root, "scripts/avatar_cutout.png"),
  resolve(root, "scripts/source-avatar.png"),
  resolve(root, "scripts/source-photo.jpg"),
].filter(Boolean);
const SRC = candidates.find((p) => existsSync(p));
if (!SRC) throw new Error("No avatar source found in scripts/");

const OUT_W = 1000;

// Background key thresholds (tuned to the render's grey backdrop ~rgb(200) and
// dark/saturated subject). A pixel is FOREGROUND if it is colourful (saturated)
// or dark; the light, desaturated remainder is background.
const SAT_FG = 22; // saturation at/above which a pixel is definitely subject
const LUM_FG = 135; // luminance at/below which a pixel is definitely subject

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;
const n = w * h;

// 1. Binary foreground mask.
const mask = Buffer.alloc(n);
for (let p = 0; p < n; p++) {
  const i = p * c;
  const r = data[i],
    g = data[i + 1],
    b = data[i + 2],
    origA = data[i + 3];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const fg = origA > 128 && (sat >= SAT_FG || lum <= LUM_FG);
  mask[p] = fg ? 255 : 0;
}

// 1b. Keep only the largest connected component (drops detached remnants such
// as the podium edge or its shadow), via iterative flood fill.
const comp = new Int32Array(n).fill(-1);
const stack = new Int32Array(n);
const sizes = [];
let cid = 0;
for (let s = 0; s < n; s++) {
  if (mask[s] !== 255 || comp[s] !== -1) continue;
  let sp = 0;
  stack[sp++] = s;
  comp[s] = cid;
  let sz = 0;
  while (sp) {
    const p = stack[--sp];
    sz++;
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0 && mask[p - 1] === 255 && comp[p - 1] === -1) {
      comp[p - 1] = cid;
      stack[sp++] = p - 1;
    }
    if (x < w - 1 && mask[p + 1] === 255 && comp[p + 1] === -1) {
      comp[p + 1] = cid;
      stack[sp++] = p + 1;
    }
    if (y > 0 && mask[p - w] === 255 && comp[p - w] === -1) {
      comp[p - w] = cid;
      stack[sp++] = p - w;
    }
    if (y < h - 1 && mask[p + w] === 255 && comp[p + w] === -1) {
      comp[p + w] = cid;
      stack[sp++] = p + w;
    }
  }
  sizes.push(sz);
  cid++;
}
let bestId = 0;
for (let i = 1; i < sizes.length; i++) if (sizes[i] > sizes[bestId]) bestId = i;
for (let p = 0; p < n; p++) if (mask[p] === 255 && comp[p] !== bestId) mask[p] = 0;

// 2. Despeckle + spread, then re-map to erode the halo (~2px) and feather.
const { data: blurred, info: binfo } = await sharp(mask, {
  raw: { width: w, height: h, channels: 1 },
})
  .median(5)
  .blur(2.0)
  .raw()
  .toBuffer({ resolveWithObject: true });
const bc = binfo.channels; // sharp may expand the mask to 3 channels

const rgb = await sharp(SRC).removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(n * 4);
let minX = w,
  minY = h,
  maxX = 0,
  maxY = 0;
for (let p = 0; p < n; p++) {
  const v = blurred[p * bc];
  const a = v <= 110 ? 0 : v >= 170 ? 255 : Math.round(((v - 110) / 60) * 255);
  rgba[p * 4] = rgb[p * 3];
  rgba[p * 4 + 1] = rgb[p * 3 + 1];
  rgba[p * 4 + 2] = rgb[p * 3 + 2];
  rgba[p * 4 + 3] = a;
  if (a > 16) {
    const x = p % w;
    const y = (p - x) / w;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

// Tight bounding box of the figure (with a small transparent margin).
const pad = 12;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(w - 1, maxX + pad);
maxY = Math.min(h - 1, maxY + pad);
const bw = maxX - minX + 1;
const bh = maxY - minY + 1;

await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left: minX, top: minY, width: bw, height: bh })
  .resize({ width: OUT_W })
  .png()
  .toFile(out);

console.log(
  `Avatar written to ${out} from ${SRC} — figure bbox ${bw}x${bh} → width ${OUT_W}`
);
