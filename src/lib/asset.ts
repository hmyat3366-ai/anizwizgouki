/** Returns a public asset URL that works with Vite's base path setting. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Strip leading "./" or "/" from the path
  const clean = path.replace(/^\.?\//, "");
  return `${base}${clean}`;
}
