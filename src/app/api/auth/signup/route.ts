import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/lib/validations";
import { findUserByEmail, createUser } from "@/lib/db";
import { signJwtToken, getCookieOptions, getActiveCookieName } from "@/lib/auth";
import { hashPassword } from "@/lib/passwords";
import { logAuditEvent, getClientIp } from "@/lib/audit";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimitKey = `signup_${ip}`;

  // Rate Limiting: 5 attempts per minute
  const rateCheck = checkRateLimit(rateLimitKey, 5, 60000);
  if (!rateCheck.success) {
    return NextResponse.json(
      {
        error: `Security threshold reached: Maximum 5 attempts allowed per minute. Please wait ${rateCheck.resetInSeconds} seconds before retrying.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // 1. Zod Input Validation & Sanitization
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, dateOfBirth, password } = parsed.data;

    // 2. Prevent Duplicate Accounts
    const existing = findUserByEmail(email);
    if (existing) {
      logAuditEvent(
        req,
        { email, role: "guest" },
        "SIGNUP",
        `Duplicate registration attempt blocked for existing email ${email}`,
        "WARNING"
      );
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    // 3. Hash Password with Bcrypt (Salt Rounds: 12)
    const passwordHash = await hashPassword(password);

    // 4. Create User Record in Database
    const newUser = createUser({
      name,
      email,
      phone,
      dateOfBirth,
      passwordHash,
      role: "user",
    });

    // 5. Generate 1-hour JWT Token
    const token = await signJwtToken({
      sub: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      phone: newUser.phone,
    });

    // 6. Record Audit Log
    logAuditEvent(
      req,
      { email: newUser.email, role: newUser.role },
      "SIGNUP",
      `New user membership created for ${newUser.name} (${newUser.email})`,
      "SUCCESS"
    );

    // 7. Set HttpOnly Cookie
    const cookieOptions = getCookieOptions();
    const cookieName = getActiveCookieName();

    const response = NextResponse.json({
      success: true,
      message: "Membership established successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
      },
    });

    response.cookies.set(cookieName, token, cookieOptions);
    if (process.env.NODE_ENV !== "production") {
      response.cookies.set("veylora_token", token, cookieOptions);
    }

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal membership processing error. Please try again." },
      { status: 500 }
    );
  }
}
