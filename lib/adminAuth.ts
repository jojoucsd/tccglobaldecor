// lib/adminAuth.ts
// Interim auth for /admin: one shared passcode, no user accounts (see
// "Auth (interim)" in CLAUDE.md's Superadmin Panel roadmap section — full
// per-person auth is a deliberate later phase, not implemented here).
import "server-only";
import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = "tcc_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getPasscode(): string {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) {
    throw new Error("[adminAuth] Missing ADMIN_PASSCODE env var");
  }
  return passcode;
}

// Session token is derived from the passcode via HMAC rather than being the
// passcode itself, so the cookie value doesn't leak the shared secret and
// rotating ADMIN_PASSCODE automatically invalidates existing sessions.
function expectedSessionToken(): string {
  return crypto.createHmac("sha256", getPasscode()).update("tcc-admin-session").digest("hex");
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPasscode(input: string): boolean {
  if (!input) return false;
  return timingSafeStringEqual(input, getPasscode());
}

export function createSessionCookieValue(): string {
  return expectedSessionToken();
}

export function isValidSessionCookie(value: string | undefined): boolean {
  if (!value) return false;
  return timingSafeStringEqual(value, expectedSessionToken());
}
