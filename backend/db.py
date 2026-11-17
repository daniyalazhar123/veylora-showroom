"""
VEYLORA USA · Beverly Hills Sanctuary
Database Engine: Neon Serverless Postgres + pgvector
"""

import os
import uuid
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("veylora.db")

# Load environment variables from multiple potential locations
load_dotenv(".env")
load_dotenv(".env.local")
load_dotenv("backend/.env")
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env.local"))
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

# In-memory backup store if database credentials are not configured yet
_in_memory_bookings: List[Dict[str, Any]] = []
_in_memory_knowledge: List[Dict[str, Any]] = []


def is_neon_configured() -> bool:
    """Check if a valid database URL is present."""
    return bool(DATABASE_URL and not DATABASE_URL.startswith("postgresql://user:password"))


def get_connection():
    """Establish a connection to Neon PostgreSQL."""
    if not is_neon_configured():
        raise ConnectionError(
            "DATABASE_URL is not configured with valid credentials in .env or .env.local"
        )
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


def init_db():
    """
    Initialize Neon Database:
    1. Ensure vector extension (pgvector)
    2. Create test_drive_bookings table
    3. Create vehicles_knowledge table with 1024-dim vector
    """
    if not is_neon_configured():
        logger.warning(
            "⚠️ DATABASE_URL not set or contains placeholder. Neon tables cannot be initialized yet."
        )
        return False

    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                # 1. Enable pgvector extension
                logger.info("Initializing pgvector extension in Neon...")
                cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")

                # 2. Create test_drive_bookings table
                logger.info("Creating test_drive_bookings table...")
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS test_drive_bookings (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        full_name TEXT NOT NULL,
                        phone TEXT NOT NULL,
                        email TEXT NOT NULL,
                        car_name TEXT NOT NULL DEFAULT 'Rolls-Royce Ghost Black Badge',
                        car_price INT NOT NULL DEFAULT 462400,
                        booking_date TEXT NOT NULL,
                        time_slot TEXT NOT NULL,
                        location TEXT NOT NULL,
                        has_license BOOLEAN NOT NULL DEFAULT TRUE,
                        booking_id TEXT NOT NULL,
                        status TEXT NOT NULL DEFAULT 'CONFIRMED',
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                """)

                # 3. Create vehicles_knowledge table for Cohere embed-english-v3.0 (1024 dimensions)
                logger.info("Creating vehicles_knowledge table...")
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS vehicles_knowledge (
                        id SERIAL PRIMARY KEY,
                        content TEXT NOT NULL,
                        embedding vector(1024)
                    );
                """)

                conn.commit()
                logger.info("✅ Neon Postgres database initialized successfully with pgvector.")
                return True
    except Exception as e:
        logger.error(f"❌ Error initializing Neon database: {e}")
        return False


def save_booking(
    full_name: str,
    phone: str,
    email: str,
    car_name: str = "Rolls-Royce Ghost Black Badge",
    car_price: int = 462400,
    booking_date: str = "",
    time_slot: str = "2 PM",
    location: str = "Beverly Hills Showroom",
    has_license: bool = True,
    booking_id: str = "",
    status: str = "CONFIRMED"
) -> Dict[str, Any]:
    """Save a test drive booking to Neon or fallback memory."""
    # Strict compliance: enforce car_price = 462400
    if car_price != 462400:
        car_price = 462400

    booking_record = {
        "id": str(uuid.uuid4()),
        "full_name": full_name,
        "phone": phone,
        "email": email,
        "car_name": car_name or "Rolls-Royce Ghost Black Badge",
        "car_price": car_price,
        "booking_date": booking_date,
        "time_slot": time_slot,
        "location": location,
        "has_license": has_license,
        "booking_id": booking_id,
        "status": status,
        "created_at": datetime.utcnow().isoformat()
    }

    if is_neon_configured():
        try:
            with get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO test_drive_bookings (
                            full_name, phone, email, car_name, car_price,
                            booking_date, time_slot, location, has_license,
                            booking_id, status
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id, full_name, phone, email, car_name, car_price,
                                  booking_date, time_slot, location, has_license,
                                  booking_id, status, created_at;
                    """, (
                        full_name, phone, email, car_name, car_price,
                        booking_date, time_slot, location, has_license,
                        booking_id, status
                    ))
                    row = cur.fetchone()
                    conn.commit()
                    if row:
                        return dict(row)
        except Exception as e:
            logger.error(f"Failed to persist booking to Neon, falling back to local session: {e}")

    # Fallback in-memory
    _in_memory_bookings.insert(0, booking_record)
    return booking_record


def fetch_all_bookings() -> List[Dict[str, Any]]:
    """Retrieve all test drive bookings."""
    if is_neon_configured():
        try:
            with get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        SELECT id, full_name, phone, email, car_name, car_price,
                               booking_date, time_slot, location, has_license,
                               booking_id, status, created_at
                        FROM test_drive_bookings
                        ORDER BY created_at DESC;
                    """)
                    rows = cur.fetchall()
                    return [dict(r) for r in rows]
        except Exception as e:
            logger.error(f"Error querying test_drive_bookings from Neon: {e}")

    return _in_memory_bookings


def insert_vehicle_knowledge(content: str, embedding: List[float]) -> bool:
    """Insert knowledge text and vector into vehicles_knowledge."""
    if is_neon_configured():
        try:
            with get_connection() as conn:
                with conn.cursor() as cur:
                    # pgvector expects vector format like '[0.1, 0.2, ...]'
                    embedding_str = str(embedding)
                    cur.execute("""
                        INSERT INTO vehicles_knowledge (content, embedding)
                        VALUES (%s, %s::vector);
                    """, (content, embedding_str))
                    conn.commit()
                    return True
        except Exception as e:
            logger.error(f"Error inserting knowledge into Neon: {e}")

    # Fallback in-memory
    _in_memory_knowledge.append({"content": content, "embedding": embedding})
    return True


def search_vehicle_knowledge(query_embedding: List[float], limit: int = 3) -> List[Dict[str, Any]]:
    """Search vehicles_knowledge using cosine distance via pgvector."""
    if is_neon_configured():
        try:
            with get_connection() as conn:
                with conn.cursor() as cur:
                    embedding_str = str(query_embedding)
                    # '<=>' is pgvector's cosine distance operator
                    cur.execute("""
                        SELECT id, content, (1 - (embedding <=> %s::vector)) AS similarity
                        FROM vehicles_knowledge
                        ORDER BY embedding <=> %s::vector
                        LIMIT %s;
                    """, (embedding_str, embedding_str, limit))
                    rows = cur.fetchall()
                    return [dict(r) for r in rows]
        except Exception as e:
            logger.error(f"Error performing vector search on Neon: {e}")

    # Fallback in-memory cosine similarity calculation
    results = []
    if _in_memory_knowledge and query_embedding:
        import math
        def cosine_similarity(v1, v2):
            dot = sum(a * b for a, b in zip(v1, v2))
            norm1 = math.sqrt(sum(a * a for a in v1))
            norm2 = math.sqrt(sum(b * b for b in v2))
            if norm1 == 0 or norm2 == 0:
                return 0.0
            return dot / (norm1 * norm2)

        for item in _in_memory_knowledge:
            sim = cosine_similarity(query_embedding, item["embedding"])
            results.append({"content": item["content"], "similarity": sim})
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:limit]

    return results
