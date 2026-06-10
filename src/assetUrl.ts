// Prefix runtime asset paths (things in /public) with Vite's base URL so they
// resolve correctly both at the dev root ("/") and on GitHub Pages
// ("/Prathamesh-Berad.github.io/"). Pass paths WITHOUT a leading slash.
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
