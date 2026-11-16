import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { findUserByEmail } from "@/lib/db";
import { signJwtToken, getCookieOptions, getActiveCookieName } from "@/lib/auth";
import { comparePassword } from "@/lib/passwords";
import { logAuditEvent, getClientIp } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimitKey = `login_${ip}`;

  // 1. Rate Limiting: Max 5 attempts per minute
  const rateCheck = checkRateLimit(rateLimitKey, 5, 60000);
  if (!rateCheck.success) {
    logAuditEvent(
      req,
      { email: "anonymous", role: "guest" },
      "RATE_LIMIT_BLOCKED",
      `Excessive login attempts blocked from IP ${ip}. Retry after ${rateCheck.resetInSeconds}s.`,
      "WARNING"
    );
    return NextResponse.json(
      {
        error: `Security threshold reached: Maximum 5 attempts allowed per minute. Please wait ${rateCheck.resetInSeconds} seconds before retrying.`,
        retryAfter: rateCheck.resetInSeconds,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateCheck.resetInSeconds) },
      }
    );
  }

  try {
    const body = await req.json();

    // 2. Input Validation via Zod + Sanitization
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // 3. Find User
    const user = findUserByEmail(email);
    if (!user) {
      logAuditEvent(
        req,
        { email, role: "guest" },
        "LOGIN",
        `Failed authentication attempt: user with email ${email} not found`,
        "FAILURE"
      );
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // 4. Verify Password
    const passwordValid = await comparePassword(password, user.passwordHash);
    if (!passwordValid) {
      logAuditEvent(
        req,
        { email, role: user.role },
        "LOGIN",
        `Failed authentication attempt: incorrect password for ${email}`,
        "FAILURE"
      );
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // 5. Generate 1-hour JWT Token
    const token = await signJwtToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    });

    // 6. Reset Rate Limiter on Successful Auth
    resetRateLimit(rateLimitKey);

    // 7. Record Audit Log in Database
    logAuditEvent(
      req,
      { email: user.email, role: user.role },
      "LOGIN",
      `Successful login: session established with 1-hour expiration for ${user.role} ${user.name}`,
      "SUCCESS"
    );

    // 8. Set HttpOnly Cookie (Strictly Protected from Client JS & LocalStorage)
    const cookieOptions = getCookieOptions();
    const cookieName = getActiveCookieName();

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });

    response.cookies.set(cookieName, token, cookieOptions);

    // In dev, also set the fallback name if cookieName differs so local tools work seamlessly
    if (process.env.NODE_ENV !== "production") {
      response.cookies.set("veylora_token", token, cookieOptions);
    }

    return response;
  } catch (error) {
    console.error("Login server error:", error);
    return NextResponse.json(
      { error: "Internal sanctuary authentication error. Please try again." },
      { status: 500 }
    );
  }
}
