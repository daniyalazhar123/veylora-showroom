# VEYLORA USA — Beverly Hills Showroom Fleet Engine

An enterprise-grade, high-performance digital showroom application built for **VEYLORA USA** (445 N Canon Drive, Beverly Hills, CA 90210). Engineered with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS, featuring hardware-accelerated scroll cinematography, strict cryptographic session integrity, and zero-dependency security controls.

---

## Technical Architecture Overview

```
                                      ┌────────────────────────┐
                                      │  Client Browser (DOM)  │
                                      └───────────┬────────────┘
                                                  │
                                      ┌───────────▼────────────┐
                                      │   Edge Middleware      │
                                      │  - CSRF Origin Check   │
                                      │  - CSP & HSTS Headers  │
                                      │  - RBAC Route Guard    │
                                      └───────────┬────────────┘
                                                  │
                   ┌──────────────────────────────┴──────────────────────────────┐
                   │                                                             │
        ┌──────────▼──────────┐                                       ┌──────────▼──────────┐
        │  Showroom Viewport  │                                       │ Secure Rest API     │
        │  - Scene 01: Foyer  │                                       │ - /api/auth/*       │
        │  - Scene 02: Fleet  │                                       │ - /api/bookings/*   │
        │  - 360° Studio      │                                       │ - /api/logs         │
        └──────────┬──────────┘                                       └──────────┬──────────┘
                   │                                                             │
        ┌──────────▼──────────┐                                       ┌──────────▼──────────┐
        │ CSS GPU Transitions │                                       │ Persistence Layer   │
        │ Hardware Accelerated│                                       │ - Atomic File I/O   │
        │ will-change: scale  │                                       │ - Audit Log Ledger  │
        └─────────────────────┘                                       └─────────────────────┘
```

---

## Core Engineering Specifications

| Domain | Implementation | Technical Standard |
|---|---|---|
| **Framework** | Next.js 15.1.7 (Turbopack / App Router) | React 19 Concurrent Root, Server/Client Component Boundaries |
| **Styling** | Tailwind CSS 3.4 + Custom CSS Design Tokens | Pure CSS GPU transitions, `#080809` obsidian & `#D4AF37` gilded gold |
| **Authentication** | HS256 Signed JSON Web Tokens (via `jose`) | 3,600s strict TTL, stored exclusively in `httpOnly` secure cookies |
| **Password Hashing** | Bcrypt (12 salt rounds) | Cost factor 12, resistant to offline rainbow table & brute-force attacks |
| **Abuse Prevention** | In-Memory Sliding-Window Rate Limiter | 5 requests/minute bucket on sensitive auth & booking mutation endpoints |
| **Data Sanitation** | Zod Schemas + HTML Character Escaping | Strict input boundary validation; sanitizes `< > " '` against stored/reflected XSS |
| **Compliance** | GDPR Art. 15, 17 & CCPA / DPDP | Self-serve Right to Access (JSON export) & Right to Erasure account deletion |

---

## Showroom Scenography Engine

The front-facing showroom floor is architected around modular scene controllers rather than monolithic page bloat:

- **Scene 01 (`01-entrance.tsx`):** Sticky viewport transition orchestrating the approach along 445 N Canon Drive, through the gilded bronze gate into the welcoming foyer. Implements graceful asset degradation for 4K video feeds with local black luxury fallbacks.
- **Scene 02 (`02-select-car.tsx`):** 7/12 asymmetric showcase spotlighting the flagship Rolls-Royce Ghost Black Badge ($420,000 USD MSRP). Features hardware-accelerated intersection observer transitions and technical specification telemetry.
- **360° Turntable (`VehicleViewer360.tsx`):** Pure CSS 3D transform matrix (`rotateY`) rendering studio lighting and paint swatches without heavy WebGL/Three.js bundle penalties.

---

## Security & Threat Model

1. **Zero Client-Side Secret Exposure:** No authentication tokens or sensitive environment parameters are ever persisted to `localStorage` or `sessionStorage`. All administrative tokens use `__Host-` prefixed cookies in production with `SameSite=Lax` and `HttpOnly; Secure`.
2. **Deterministic Role-Based Access Control (RBAC):** Next.js middleware intercepts protected routes (`/dashboard/admin`, `/dashboard/user`). Standard clients attempting privilege escalation to administrative panels are immediately redirected to their respective client dashboard.
3. **Audit Trail Persistence:** Every security-sensitive transaction (authentication attempt, reservation status modification, account deletion) is immutably logged with timestamp, action type, client identifier, and caller IP address.

---

## Local Development Workflow

### Prerequisites
- **Node.js:** `>= 20.x` LTS
- **npm:** `>= 10.x`

### Setup & Run
```bash
# Clone the repository
git clone https://github.com/daniyalazhar123/veylora-showroom.git
cd veylora-showroom

# Install verified production dependencies
npm install

# Configure local development environment
cp .env.example .env.local

# Run production validation test suite
npm run verify

# Launch Next.js local development server
npm run dev
```

Server binds to `http://localhost:3000`.

### Production Build Verification
```bash
# Execute static optimization and TypeScript type compilation
npm run build
```
Target: 20 routes generated, 0 type errors, 0 hydration warnings.

---

## Project Structure

```
├── data/
│   └── veylora-db.json          # Persistent JSON datastore with atomic file writes
├── docs/
│   └── evidence/                # Automated security & frontend audit evidence reports
├── public/
│   ├── receptionists/           # Executive client director portrait assets
│   └── vehicles/                # Studio vehicle fleet photography & vector assets
├── scripts/
│   └── verify.mjs               # 14-point automated frontend & security test harness
└── src/
    ├── app/                     # Next.js App Router (pages & API handlers)
    │   ├── (showroom)/          # Modular scene controllers (Scene 01, Scene 02...)
    │   ├── api/auth/            # Cryptographic login, signup, session & GDPR endpoints
    │   ├── api/bookings/        # Reservation management & status transition API
    │   ├── dashboard/           # Protected user & admin operational cockpits
    │   ├── privacy/             # Cross-border privacy disclosure documentation
    │   └── terms/               # Beverly Hills showroom vehicle test drive terms
    ├── components/              # Modular UI components (360 viewer, navigation, cards)
    ├── lib/                     # Core domain logic (auth, db, rate-limiting, validations)
    └── middleware.ts            # Edge request inspection, CSP headers & RBAC routing
```

---

## License
Proprietary & Confidential. Copyright © 2026 VEYLORA USA. All rights reserved.
