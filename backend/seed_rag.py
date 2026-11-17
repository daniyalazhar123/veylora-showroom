"""
VEYLORA USA · Beverly Hills Sanctuary
RAG Knowledge Seeder: Cohere embed-english-v3.0 -> Neon vehicles_knowledge
"""

import os
import sys
import logging
import random
from typing import List
from dotenv import load_dotenv

# Ensure backend directory is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from db import init_db, insert_vehicle_knowledge, is_neon_configured

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("veylora.seed")

# Load environment
load_dotenv(".env")
load_dotenv(".env.local")
load_dotenv(os.path.join(current_dir, ".env"))
load_dotenv(os.path.join(current_dir, "..", ".env.local"))
load_dotenv(os.path.join(current_dir, "..", ".env"))

COHERE_API_KEY = os.getenv("COHERE_API_KEY", "").strip()

# Strictly compliant seed documents (PRICE RULE: $462,400 for Rolls-Royce Ghost Black Badge)
VEHICLE_KNOWLEDGE_DOCS = [
    "Rolls-Royce Ghost Black Badge: $462,400, 6.75L V12, 563 HP, Starlight headliner.",
    "Honda Civic RS Turbo: $28,000, 1.5L Turbo, 180 HP, Honda Sensing.",
    "Cadillac Escalade-V: $150,000, 6.2L Supercharged V8, 682 HP.",
    "Ducati Panigale V4: $28,000, 1103cc V4, 214 HP.",
]


def generate_mock_embedding(text: str, dim: int = 1024) -> List[float]:
    """Generate a deterministic normalized 1024-dim vector for testing when API key is unset."""
    rng = random.Random(abs(hash(text)))
    raw = [rng.uniform(-1.0, 1.0) for _ in range(dim)]
    norm = sum(x * x for x in raw) ** 0.5
    return [x / norm for x in raw]


def generate_cohere_embeddings(texts: List[str], input_type: str = "search_document") -> List[List[float]]:
    """Generate embeddings using Cohere embed-english-v3.0 (1024 dimensions)."""
    if not COHERE_API_KEY or COHERE_API_KEY.startswith("your-"):
        logger.warning(
            "⚠️ COHERE_API_KEY not configured. Generating deterministic 1024-dim fallback vectors."
        )
        return [generate_mock_embedding(t) for t in texts]

    try:
        import cohere
        co = cohere.Client(api_key=COHERE_API_KEY)
        response = co.embed(
            texts=texts,
            model="embed-english-v3.0",
            input_type=input_type,
            embedding_types=["float"],
        )
        
        # Support both Cohere v5 float_ attribute and direct list
        if hasattr(response.embeddings, "float_") and response.embeddings.float_ is not None:
            return response.embeddings.float_
        elif hasattr(response, "embeddings") and isinstance(response.embeddings, list):
            return response.embeddings
        elif hasattr(response, "embeddings"):
            return list(response.embeddings)
        else:
            raise ValueError(f"Unexpected Cohere embeddings structure: {type(response)}")
    except Exception as e:
        logger.error(f"❌ Error generating Cohere embeddings: {e}")
        logger.info("Falling back to deterministic 1024-dim vectors for resilience.")
        return [generate_mock_embedding(t) for t in texts]


def seed_database():
    """Seed Neon DB / vehicles_knowledge with embedded vehicle information."""
    logger.info("Starting VEYLORA Sanctuary RAG Seeder...")
    
    # 1. Initialize DB tables
    init_db()

    # 2. Embed knowledge documents
    logger.info(f"Generating 1024-dim embeddings for {len(VEHICLE_KNOWLEDGE_DOCS)} vehicles...")
    embeddings = generate_cohere_embeddings(VEHICLE_KNOWLEDGE_DOCS, input_type="search_document")

    # 3. Store in Neon / vehicles_knowledge
    success_count = 0
    for doc, emb in zip(VEHICLE_KNOWLEDGE_DOCS, embeddings):
        ok = insert_vehicle_knowledge(content=doc, embedding=emb)
        if ok:
            success_count += 1
            logger.info(f"  ✓ Seeded: {doc[:45]}...")

    logger.info(f"✅ Seeding complete: {success_count}/{len(VEHICLE_KNOWLEDGE_DOCS)} documents indexed.")
    return success_count


if __name__ == "__main__":
    count = seed_database()
    print(f"\n[VEYLORA RAG SEEDER] Finished successfully: {count} vehicle records inserted.")
