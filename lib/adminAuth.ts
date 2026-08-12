// lib/adminAuth.ts
// Interim auth for /admin: one shared passcode plus a self-declared
// @tcc-carpets.com email, no real user accounts (see "Auth (interim)" in
// CLAUDE.md's Superadmin Panel roadmap section). The email isn't verified —
// anyone with the passcode can type any address on the allowed domain — this
// is a detective control (who to ask about a change) not an access-control
// upgrade; full per-person auth is still a deliberate later phase.
import "server-only";
import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = "tcc_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const ALLOWED_EMAIL_DOMAIN = "tcc-carpets.com";

function getPasscode(): string {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) {
    throw new Error("[adminAuth] Missing ADMIN_PASSCODE env var");
  }
  return passcode;
}

export function isAllowedEmail(email: string): boolean {
  return email.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

// Signed with the shared passcode as the HMAC key, so rotating
// ADMIN_PASSCODE also invalidates every existing session cookie.
function sign(value: string): string {
  return crypto.createHmac("sha256", getPasscode()).update(value).digest("hex");
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

// Cookie is "<email>.<hmac(email)>". Split on the *last* dot — a hex HMAC
// digest never contains one, even though the email local/domain parts do.
export function createSessionCookieValue(email: string): string {
  return `${email}.${sign(email)}`;
}

export function parseSessionCookie(value: string | undefined): { email: string } | null {
  if (!value) return null;
  const dot = value.lastIndexOf(".");
  if (dot === -1) return null;
  const email = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!timingSafeStringEqual(signature, sign(email))) return null;
  return { email };
}

export function isValidSessionCookie(value: string | undefined): boolean {
  return parseSessionCookie(value) !== null;
}
