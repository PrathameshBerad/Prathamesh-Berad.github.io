// Generates the decorative SVG assets used by the portfolio:
//  - tool "tokens" mapped onto the 3D toolkit spheres
//  - branded project cards for the Work carousel
//  - the site favicon
// Pure string generation — no native deps, no system fonts required at build
// time (the browser rasterizes the SVGs at runtime).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = resolve(root, "public");
mkdirSync(resolve(pub, "images/tools"), { recursive: true });

const ACCENT = "#5eead4";
const BG = "#0a0e17";

/* ----------------------------- tool tokens ----------------------------- */
const tools = [
  { file: "notion", label: "Notion", color: "#ffffff" },
  { file: "figma", label: "Figma", color: "#f24e1e" },
  { file: "miro", label: "Miro", color: "#ffd02f" },
  { file: "n8n", label: "n8n", color: "#ea4b71" },
  { file: "gpt", label: "GPT", color: "#10a37f" },
  { file: "claude", label: "Claude", color: "#d97757" },
  { file: "github", label: "GitHub", color: "#ffffff" },
  { file: "powerbi", label: "Power BI", color: "#f2c811" },
  { file: "devops", label: "DevOps", color: "#3b9eff" },
];

const toolSvg = ({ label, color }) => {
  const fontSize = label.length > 6 ? 34 : 44;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <radialGradient id="g" cx="38%" cy="32%" r="80%">
      <stop offset="0%" stop-color="#172234"/>
      <stop offset="100%" stop-color="#0b1220"/>
    </radialGradient>
  </defs>
  <circle cx="128" cy="128" r="124" fill="url(#g)"/>
  <circle cx="128" cy="128" r="124" fill="none" stroke="${color}" stroke-opacity="0.85" stroke-width="6"/>
  <circle cx="128" cy="128" r="108" fill="none" stroke="${color}" stroke-opacity="0.18" stroke-width="2"/>
  <text x="128" y="128" fill="${color}" font-family="Geist, Segoe UI, Arial, sans-serif"
    font-size="${fontSize}" font-weight="700" text-anchor="middle" dominant-baseline="central"
    letter-spacing="0.5">${label}</text>
</svg>`;
};

for (const t of tools) {
  writeFileSync(resolve(pub, `images/tools/${t.file}.svg`), toolSvg(t));
}

/* ---------------------------- project cards ---------------------------- */
const projects = [
  { file: "recruit-ai", title: "Recruit-AI", tag: "AI HIRING ASSISTANT", accent: "#5eead4" },
  { file: "profitability", title: "Profitability\nCalculator", tag: "E-COMMERCE WEB APP", accent: "#34d399" },
  { file: "selleros", title: "SellerOS", tag: "SELLER OPERATIONS", accent: "#22d3ee" },
  { file: "travonomic", title: "Travonomic", tag: "AI TRAVEL COPILOT", accent: "#a78bfa" },
  { file: "swiggy", title: "Swiggy\nMulti-Cart", tag: "PRODUCT CASE STUDY", accent: "#fb923c" },
];

const cardSvg = ({ title, tag, accent }) => {
  const lines = title.split("\n");
  const startY = 360 - (lines.length - 1) * 46;
  const titleTspans = lines
    .map(
      (l, i) =>
        `<tspan x="80" y="${startY + i * 92}">${l}</tspan>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1424"/>
      <stop offset="100%" stop-color="#070b14"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#bg)"/>
  <rect width="1200" height="750" fill="url(#glow)"/>
  <g stroke="${accent}" stroke-opacity="0.12" stroke-width="1.5">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${94 * i}" x2="1200" y2="${94 * i}"/>`).join("")}
  </g>
  <circle cx="980" cy="180" r="120" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
  <circle cx="980" cy="180" r="78" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="2"/>
  <rect x="78" y="118" width="58" height="6" rx="3" fill="${accent}"/>
  <text x="80" y="168" fill="${accent}" font-family="Geist, Segoe UI, Arial, sans-serif"
    font-size="26" font-weight="700" letter-spacing="4">${tag}</text>
  <text fill="#f3f7fb" font-family="Geist, Segoe UI, Arial, sans-serif"
    font-size="84" font-weight="700" letter-spacing="-1">${titleTspans}</text>
  <text x="80" y="660" fill="#8aa0b6" font-family="Geist, Segoe UI, Arial, sans-serif"
    font-size="30" font-weight="500">Prathamesh Berad · Product</text>
</svg>`;
};

for (const p of projects) {
  writeFileSync(resolve(pub, `images/${p.file}.svg`), cardSvg(p));
}

/* ------------------------------- favicon ------------------------------- */
writeFileSync(
  resolve(pub, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="${ACCENT}" stroke-opacity="0.6" stroke-width="2"/>
  <text x="32" y="33" fill="${ACCENT}" font-family="Geist, Segoe UI, Arial, sans-serif"
    font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="central">PB</text>
</svg>`
);

console.log("Generated tool tokens, project cards, and favicon.");
