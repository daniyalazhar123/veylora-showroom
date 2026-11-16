interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store for rate limiting with automatic cleanup
const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_ATTEMPTS = 5; // Max 5 attempts per minute

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  limit: number;
  resetInSeconds: number;
}

/**
 * Check and record an attempt for an identifier (e.g. IP + endpoint)
 */
export function checkRateLimit(
  identifier: string,
  maxAttempts: number = MAX_ATTEMPTS,
  windowMs: number = WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(identifier) || { timestamps: [] };

  // Filter out timestamps outside the active window
  const validTimestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxAttempts) {
    const oldestTimestamp = validTimestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    const resetInSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

    // Update with cleaned timestamps
    rateLimitMap.set(identifier, { timestamps: validTimestamps });

    return {
      success: false,
      remaining: 0,
      limit: maxAttempts,
      resetInSeconds,
    };
  }

  // Record new attempt
  validTimestamps.push(now);
  rateLimitMap.set(identifier, { timestamps: validTimestamps });

  const resetTime = validTimestamps[0] + windowMs;
  const resetInSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

  return {
    success: true,
    remaining: maxAttempts - validTimestamps.length,
    limit: maxAttempts,
    resetInSeconds,
  };
}

/**
 * Reset rate limit for an identifier (e.g. after successful login)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier);
}

// Periodic cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      const active = record.timestamps.filter((t) => now - t < WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, { timestamps: active });
      }
    }
  }, 5 * 60 * 1000);
}
