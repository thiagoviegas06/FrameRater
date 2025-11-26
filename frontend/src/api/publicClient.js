import { API_BASE } from "./config";

export async function fetchPublic(path) {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "API error");
  }

  return res.json();
}
