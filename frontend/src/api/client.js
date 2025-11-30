import { API_BASE } from "./config";
import { auth, waitForUser } from "../../src/firebase";

export async function fetchWithAuth(path, options = {}) {
  // Try to get current user immediately
  let user = auth.currentUser;

  // If not yet loaded (page refresh), wait for Firebase
  if (!user) {
    user = await waitForUser();
  }

  const token = await user.getIdToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle errors
  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    throw new Error(`Request failed (${res.status}): ${detail}`);
  }

  return res.json();
}
