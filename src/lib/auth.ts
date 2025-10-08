/** Auth façade — TODO: implémentez une vraie logique côté front (sessionStorage, etc.) */
const AUTH_KEY = "auth_ecommerce_token";

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) !== null;
}
export function setToken(email: string): void {
  const authToken = btoa(`${email}:${Date.now()}`);
  sessionStorage.setItem(AUTH_KEY, authToken);
}
export function clearToken(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
