import { NextRequest } from "next/server";
import { recordAuditLog, AuditLogRecord } from "./db";

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export function logAuditEvent(
  req: NextRequest,
  actor: { email: string; role: string },
  action: AuditLogRecord["action"],
  details: string,
  status: AuditLogRecord["status"] = "SUCCESS"
): AuditLogRecord {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || undefined;

  return recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action,
    details,
    ipAddress: ip,
    userAgent,
    status,
  });
}
