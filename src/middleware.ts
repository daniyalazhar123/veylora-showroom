import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken, COOKIE_NAME_PROD, COOKIE_NAME_DEV } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. CSRF Origin Check on State-Changing API Mutations
  const method = req.method.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && pathname.startsWith("/api/")) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    if (origin && host) {
      const originHost = origin.replace(/^https?:\/\//, "");
      if (originHost !== host) {
        return new NextResponse(
          JSON.stringify({ error: "CSRF origin mismatch: Request rejected by Veylora Security Guard" }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  }

  // 2. Token Extraction
  const token =
    req.cookies.get(COOKIE_NAME_PROD)?.value || req.cookies.get(COOKIE_NAME_DEV)?.value;

  const payload = token ? await verifyJwtToken(token) : null;

  // 3. Route Protection: /dashboard/user and /dashboard/admin
  const isUserDashboard = pathname.startsWith("/dashboard/user");
  const isAdminDashboard = pathname.startsWith("/dashboard/admin");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // If user is already authenticated and visits /login or /signup, redirect to dashboard
  if (isAuthPage && payload) {
    const target = payload.role === "admin" ? "/dashboard/admin" : "/dashboard/user";
    return NextResponse.redirect(new URL(target, req.url));
  }

  // If accessing any dashboard without valid token, redirect to /login
  if ((isUserDashboard || isAdminDashboard) && !payload) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin Route Restriction: User trying to open /dashboard/admin MUST be redirected to /dashboard/user
  if (isAdminDashboard && payload?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/user?error=admin_required", req.url));
  }

  // 4. Create response and apply stringent security headers
  const res = NextResponse.next();

  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' ws: wss:; frame-ancestors 'none';"
  );

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/api/:path*",
  ],
};
