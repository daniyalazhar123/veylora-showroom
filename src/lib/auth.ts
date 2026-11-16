import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export type UserRole = "admin" | "user";

export interface TokenPayload {
  sub: string; // User ID
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "veylora-super-secret-cryptographic-key-luxury-showroom-2026-secure-token";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);

// Cookie Names: Production uses __Host- prefix for HTTPS hardening; dev uses fallback
export const COOKIE_NAME_PROD = "__Host-veylora_token";
export const COOKIE_NAME_DEV = "veylora_token";

export function getActiveCookieName(): string {
  return process.env.NODE_ENV === "production" ? COOKIE_NAME_PROD : COOKIE_NAME_DEV;
}

/**
 * Generate 1-hour signed JWT token
 */
export async function signJwtToken(payload: TokenPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // Strictly 1 hour (3600 seconds)

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer("veylora.showroom")
    .setAudience("veylora.client")
    .sign(SECRET_KEY);
}

/**
 * Verify JWT token and return payload, or null if invalid or expired
 */
export async function verifyJwtToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      issuer: "veylora.showroom",
      audience: "veylora.client",
    });

    return {
      sub: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as UserRole,
      phone: payload.phone as string | undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Extract token from either NextRequest or Next/headers cookies
 */
export function extractTokenFromRequest(req: NextRequest): string | null {
  const prodToken = req.cookies.get(COOKIE_NAME_PROD)?.value;
  if (prodToken) return prodToken;
  const devToken = req.cookies.get(COOKIE_NAME_DEV)?.value;
  return devToken || null;
}

/**
 * Get current session user in Server Components / API Routes
 */
export async function getServerSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token =
    cookieStore.get(COOKIE_NAME_PROD)?.value || cookieStore.get(COOKIE_NAME_DEV)?.value;

  if (!token) return null;

  const payload = await verifyJwtToken(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    phone: payload.phone,
  };
}

/**
 * Standard secure cookie options
 */
export function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true, // Never accessible to client javascript or localStorage
    secure: isProd, // Requires HTTPS in production
    sameSite: "lax" as const,
    path: "/",
    maxAge: 3600, // Strictly 1 hour
  };
}
