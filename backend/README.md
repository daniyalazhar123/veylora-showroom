# VEYLORA USA · Beverly Hills Showroom Backend & AI Concierge

Enterprise FastAPI backend for **VEYLORA USA** (445 N Canon Drive, Beverly Hills, CA 90210). Handles VIP test drive bookings stored in serverless **Neon Postgres (with pgvector)** and powers a **RAG (Retrieval-Augmented Generation) AI Concierge** using **Cohere** (`embed-english-v3.0`) and **Groq** (`llama-3.3-70b-versatile`).

---

## Architecture & Technology Stack

| Component | Technology | Description |
|---|---|---|
| **API Framework** | FastAPI (Python 3.12+) | High-throughput asynchronous REST API with CORS enabled for Next.js (`http://localhost:3000`) |
| **Database** | Neon Serverless PostgreSQL | Postgres with `pgvector` extension for semantic vector similarity search |
| **Embeddings** | Cohere (`embed-english-v3.0`) | 1024-dimensional dense vector embeddings |
| **LLM Inference** | Groq Cloud (`llama-3.3-70b-versatile`) | Ultra-low latency OpenAI-compatible chat completion |
| **Frontend** | Next.js 15 App Router | Luxury Black (`#080809`) + Gold (`#D4AF37`) showroom interface |

---

## Quickstart & Local Run

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` or populate `.env.local` in project root:
```ini
# Neon PostgreSQL Database URL
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Cohere API Key (https://dashboard.cohere.com)
COHERE_API_KEY="your-cohere-api-key"

# Groq API Key (https://console.groq.com)
GROQ_API_KEY="gsk_your-groq-api-key"
```

### 3. Seed Knowledge Base (pgvector)
```bash
python seed_rag.py
```

### 4. Run the FastAPI Server
```bash
uvicorn main:app --reload --port 8000
```
Server runs at `http://localhost:8000`. Interactive Swagger documentation is available at `http://localhost:8000/docs`.

---

## API Endpoints

### 1. `POST /api/book-test-drive`
Saves a VIP test drive reservation to Neon DB and returns a confirmed `booking_id` (`VEYLORA-XXXX`).
- **Enforced Pricing Rule:** `car_price = 462400` USD strictly preserved.

**Sample Request Body:**
```json
{
  "full_name": "Alexander Vance",
  "phone": "+1 (310) 849-2000",
  "email": "vance.vip@veylora.com",
  "car_name": "Rolls-Royce Ghost Black Badge",
  "car_price": 462400,
  "booking_date": "2026-11-20",
  "time_slot": "2 PM",
  "location": "Beverly Hills Showroom",
  "has_license": true
}
```

### 2. `GET /api/bookings`
Returns all recorded test drive bookings from Neon DB ordered by creation timestamp.

### 3. `POST /api/ask`
RAG-powered conversational endpoint for prospective luxury clientele. Embeds the inquiry using Cohere, queries pgvector in Neon using cosine distance, and generates a refined response via Groq.

**Sample Request Body:**
```json
{
  "question": "What is the price and horsepower of the Rolls-Royce Ghost Black Badge?"
}
```

**Sample Response:**
```json
{
  "success": true,
  "question": "What is the price and horsepower of the Rolls-Royce Ghost Black Badge?",
  "answer": "The Rolls-Royce Ghost Black Badge is commissioned at $462,400 USD. It is powered by a peerless 6.75L Twin-Turbo V12 producing 563 HP, accompanied by the bespoke Starlight headliner.",
  "sources": [
    "Rolls-Royce Ghost Black Badge: $462,400, 6.75L V12, 563 HP, Starlight headliner."
  ]
}
```

---

## Resilience & Fallback Design
If `DATABASE_URL`, `COHERE_API_KEY`, or `GROQ_API_KEY` are not set during local sandboxing, the backend operates in an in-memory fallback mode:
- Bookings are stored in-memory and return valid `VEYLORA-XXXX` booking IDs.
- Deterministic 1024-dim fallback vectors prevent crashes during local testing.
- The AI endpoint falls back to contextual luxury responses so the frontend remains fully functional at all times.
