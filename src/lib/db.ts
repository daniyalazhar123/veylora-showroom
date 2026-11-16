import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { UserRole } from "./auth";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  phone?: string;
  dateOfBirth?: string;
  createdAt: string;
}

export type BookingStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED";

export interface BookingRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  vehicleId: string;
  vehicleName: string;
  preferredDate: string;
  preferredTime: string;
  driverLicenseNumber: string;
  specialRequests?: string;
  status: BookingStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: "LOGIN" | "LOGOUT" | "SIGNUP" | "BOOKING_CREATED" | "BOOKING_APPROVED" | "BOOKING_REJECTED" | "BOOKING_CANCELLED" | "RATE_LIMIT_BLOCKED" | "SECURITY_DENIED" | "ACCOUNT_DELETED" | "DATA_EXPORTED";
  details: string;
  ipAddress: string;
  userAgent?: string;
  status: "SUCCESS" | "FAILURE" | "WARNING";
}

interface DatabaseSchema {
  users: UserRecord[];
  bookings: BookingRecord[];
  auditLogs: AuditLogRecord[];
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "veylora-db.json");

// Generate initial bcrypt hashes (salt rounds 10 for quick seed)
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("Admin@123", 10);
const USER_PASSWORD_HASH = bcrypt.hashSync("User@123", 10);

const INITIAL_DB: DatabaseSchema = {
  users: [
    {
      id: "usr_admin_001",
      name: "Alexander Vance",
      email: "admin@veylora.com",
      passwordHash: ADMIN_PASSWORD_HASH,
      role: "admin",
      phone: "+92 300 1112233",
      createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "usr_client_002",
      name: "Tariq Mansoor",
      email: "user@veylora.com",
      passwordHash: USER_PASSWORD_HASH,
      role: "user",
      phone: "+92 321 4455667",
      createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    },
  ],
  bookings: [
    {
      id: "bkg_001",
      userId: "usr_client_002",
      userEmail: "user@veylora.com",
      userName: "Tariq Mansoor",
      userPhone: "+92 321 4455667",
      vehicleId: "civic-rs",
      vehicleName: "Honda Civic RS Turbo",
      preferredDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split("T")[0],
      preferredTime: "02:00 PM",
      driverLicenseNumber: "DL-PK-98214A",
      specialRequests: "Please prepare the Ignite Red trim with sport paddle demonstration.",
      status: "APPROVED",
      adminNotes: "VIP Concierge test drive confirmed. Assigned to Sophia Laurent.",
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      approvedBy: "admin@veylora.com",
    },
    {
      id: "bkg_002",
      userId: "usr_client_002",
      userEmail: "user@veylora.com",
      userName: "Tariq Mansoor",
      userPhone: "+92 321 4455667",
      vehicleId: "honda-cg125",
      vehicleName: "Honda CG 125 Special Edition",
      preferredDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split("T")[0],
      preferredTime: "10:00 AM",
      driverLicenseNumber: "DL-PK-98214A",
      specialRequests: "Requesting Golden Edition 5-Speed test ride.",
      status: "PENDING",
      adminNotes: "Awaiting bay inspection clearance.",
      createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    },
    {
      id: "bkg_003",
      userId: "usr_external_003",
      userEmail: "hamza.sheikh@executive.pk",
      userName: "Hamza Sheikh",
      userPhone: "+92 333 5558899",
      vehicleId: "escalade-v",
      vehicleName: "Cadillac Escalade-V",
      preferredDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split("T")[0],
      preferredTime: "04:00 PM",
      driverLicenseNumber: "DL-ISB-44120",
      specialRequests: "Chauffeured pickup requested from Serena Hotel.",
      status: "PENDING",
      adminNotes: "Executive high-value enquiry.",
      createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    },
    {
      id: "bkg_004",
      userId: "usr_external_004",
      userEmail: "zainab.malik@speedcraft.pk",
      userName: "Zainab Malik",
      userPhone: "+92 301 9988776",
      vehicleId: "ducati-panigale-v4s",
      vehicleName: "Ducati Panigale V4 S",
      preferredDate: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString().split("T")[0],
      preferredTime: "12:00 PM",
      driverLicenseNumber: "DL-LHR-77610",
      specialRequests: "Track riding suit will be brought for safety verification.",
      status: "APPROVED",
      adminNotes: "Track gear and safety briefing scheduled.",
      createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      approvedBy: "admin@veylora.com",
    },
  ],
  auditLogs: [
    {
      id: "log_init_001",
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      actorEmail: "admin@veylora.com",
      actorRole: "admin",
      action: "LOGIN",
      details: "Admin session initialized securely via HTTPS __Host-veylora_token",
      ipAddress: "127.0.0.1",
      status: "SUCCESS",
    },
    {
      id: "log_init_002",
      timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
      actorEmail: "user@veylora.com",
      actorRole: "user",
      action: "BOOKING_CREATED",
      details: "Test drive booking requested for Honda Civic RS Turbo (FE1-VTEC-RS)",
      ipAddress: "127.0.0.1",
      status: "SUCCESS",
    },
    {
      id: "log_init_003",
      timestamp: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
      actorEmail: "admin@veylora.com",
      actorRole: "admin",
      action: "BOOKING_APPROVED",
      details: "Booking bkg_001 approved by Executive Director Alexander Vance",
      ipAddress: "127.0.0.1",
      status: "SUCCESS",
    },
  ],
};

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(INITIAL_DB, null, 2), "utf8");
      return INITIAL_DB;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, "utf8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading database file, using fallback cache:", err);
    return INITIAL_DB;
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error persisting database to disk:", err);
  }
}

// User Methods
export function findUserByEmail(email: string): UserRecord | undefined {
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): UserRecord | undefined {
  const db = readDb();
  return db.users.find((u) => u.id === id);
}

export function createUser(user: Omit<UserRecord, "id" | "createdAt">): UserRecord {
  const db = readDb();
  const newUser: UserRecord = {
    ...user,
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

/**
 * GDPR Art. 17 & DPDP: Delete user account and associated personal data
 */
export function deleteUser(userId: string): boolean {
  const db = readDb();
  const userIndex = db.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) return false;

  // Remove user
  db.users.splice(userIndex, 1);

  // Anonymize or remove user bookings
  db.bookings = db.bookings.filter((b) => b.userId !== userId);

  writeDb(db);
  return true;
}

/**
 * GDPR Art. 15/20 & DPDP: Export all personal data for user portability
 */
export function getUserExportData(userId: string) {
  const db = readDb();
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;

  const bookings = db.bookings.filter((b) => b.userId === userId);

  return {
    exportDate: new Date().toISOString(),
    organization: "VEYLORA Luxury Showroom Sanctuary",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth || "Not provided",
      role: user.role,
      memberSince: user.createdAt,
    },
    bookings: bookings.map((b) => ({
      referenceId: b.id,
      vehicle: b.vehicleName,
      date: b.preferredDate,
      time: b.preferredTime,
      driverLicenseProvided: b.driverLicenseNumber ? `***${b.driverLicenseNumber.slice(-4)}` : "None",
      specialRequests: b.specialRequests || "None",
      status: b.status,
      createdAt: b.createdAt,
    })),
    dataRightsNotice: "Under GDPR (EU) and DPDP (India/Global), this export reflects all active records held in VEYLORA sanctuary systems.",
  };
}

// Booking Methods
export function getAllBookings(): BookingRecord[] {
  const db = readDb();
  return db.bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getBookingsByUserId(userId: string): BookingRecord[] {
  const db = readDb();
  return db.bookings
    .filter((b) => b.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getBookingById(id: string): BookingRecord | undefined {
  const db = readDb();
  return db.bookings.find((b) => b.id === id);
}

export function createBooking(
  bookingData: Omit<BookingRecord, "id" | "createdAt" | "updatedAt" | "status">
): BookingRecord {
  const db = readDb();
  const newBooking: BookingRecord = {
    ...bookingData,
    id: `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.bookings.unshift(newBooking);
  writeDb(db);
  return newBooking;
}

export function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminNotes?: string,
  approvedBy?: string
): BookingRecord | null {
  const db = readDb();
  const index = db.bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;

  db.bookings[index].status = status;
  db.bookings[index].updatedAt = new Date().toISOString();
  if (adminNotes !== undefined) {
    db.bookings[index].adminNotes = adminNotes;
  }
  if (approvedBy) {
    db.bookings[index].approvedBy = approvedBy;
  }

  writeDb(db);
  return db.bookings[index];
}

// Audit Log Methods
export function recordAuditLog(log: Omit<AuditLogRecord, "id" | "timestamp">): AuditLogRecord {
  const db = readDb();
  const newLog: AuditLogRecord = {
    ...log,
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  db.auditLogs.unshift(newLog);
  // Keep last 1,000 logs
  if (db.auditLogs.length > 1000) {
    db.auditLogs = db.auditLogs.slice(0, 1000);
  }
  writeDb(db);
  return newLog;
}

export function getAuditLogs(limit: number = 50): AuditLogRecord[] {
  const db = readDb();
  return db.auditLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
