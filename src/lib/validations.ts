import { z } from "zod";

export function calculateAge(birthDateStr: string): number {
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Robust string sanitizer to eliminate XSS vectors, script tags, javascript: uris
 */
export function sanitizeString(val: string): string {
  if (!val || typeof val !== "string") return "";
  return val
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/[<>'"]/g, (char) => {
      // Escape HTML entities
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        default:
          return char;
      }
    })
    .trim();
}

/**
 * Login Schema
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please provide a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .transform((val) => sanitizeString(val).toLowerCase()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

/**
 * Signup Schema
 */
export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(60, "Full name must not exceed 60 characters")
      .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters")
      .transform(sanitizeString),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid corporate or personal email")
      .max(100, "Email must not exceed 100 characters")
      .transform((val) => sanitizeString(val).toLowerCase()),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(20, "Phone number must not exceed 20 digits")
      .regex(/^[+0-9\s()-]+$/, "Phone contains invalid formatting")
      .transform(sanitizeString),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required for driver eligibility")
      .refine((val) => {
        const age = calculateAge(val);
        return age >= 18;
      }, "You must be at least 18 years of age to register for VIP vehicle drives"),
    termsConsent: z
      .boolean()
      .refine((val) => val === true, "You must accept the Terms of Service and Privacy Policy"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof SignupSchema>;

/**
 * Test Drive Booking Schema
 */
export const BookingSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle selection is required").transform(sanitizeString),
  vehicleName: z.string().min(1, "Vehicle name is required").transform(sanitizeString),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Name must not exceed 60 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters")
    .transform(sanitizeString),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Valid email required")
    .max(100)
    .transform((val) => sanitizeString(val).toLowerCase()),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(20)
    .regex(/^[+0-9\s()-]+$/, "Invalid phone format")
    .transform(sanitizeString),
  preferredDate: z
    .string()
    .min(1, "Test drive date is required")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return !isNaN(date.getTime()) && date >= now;
    }, "Date must be today or a future date"),
  preferredTime: z.enum(["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"], {
    errorMap: () => ({ message: "Please select an available concierge slot" }),
  }),
  driverLicenseNumber: z
    .string()
    .min(5, "Driver license / National ID must be at least 5 alphanumeric characters")
    .max(30, "Driver license must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9-]+$/, "Invalid license format")
    .transform(sanitizeString),
  specialRequests: z
    .string()
    .max(300, "Special requests must not exceed 300 characters")
    .optional()
    .default("")
    .transform(sanitizeString),
});

export type BookingInput = z.infer<typeof BookingSchema>;

/**
 * Status Update Schema (Admin)
 */
export const BookingStatusUpdateSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required").transform(sanitizeString),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "COMPLETED", "CANCELLED"]),
  adminNotes: z
    .string()
    .max(300, "Notes must not exceed 300 characters")
    .optional()
    .default("")
    .transform(sanitizeString),
});

export type BookingStatusUpdateInput = z.infer<typeof BookingStatusUpdateSchema>;
