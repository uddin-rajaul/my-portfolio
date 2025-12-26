"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function DataFlowsPost() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {["Cloud", "APIs", "Data Engineering"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Understanding Data Flows Between APIs, Databases, and Cloud Services
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2025
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              7 min read
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            One of the most valuable skills I&apos;ve developed working at Gorkhali Agents is 
            understanding how data moves through modern applications. This knowledge is 
            essential for debugging issues and building reliable systems.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            The Typical Data Flow
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            In most cloud-based applications, data follows a predictable path:
          </p>

          <div className="bg-zinc-900 rounded-lg p-6 mb-6">
            <pre className="text-sm">
              <code>{`┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│     API     │────▶│  Database   │
│  (Request)  │     │  (Process)  │     │  (Storage)  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Cloud     │
                    │  Services   │
                    │ (Pub/Sub,   │
                    │  Storage)   │
                    └─────────────┘`}</code>
            </pre>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Understanding this flow helps when debugging. If data isn&apos;t appearing where 
            expected, I check each step: Was the request received? Did the API process it 
            correctly? Was it stored in the database?
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Working with Google Cloud Services
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            At work, I use several GCP services that handle data:
          </p>

          <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-6">
            <li>
              <strong className="text-foreground">Cloud Run:</strong> Hosts our backend 
              services that process API requests
            </li>
            <li>
              <strong className="text-foreground">Cloud Functions:</strong> Handles 
              event-driven processing and webhooks
            </li>
            <li>
              <strong className="text-foreground">Pub/Sub:</strong> Manages message 
              queues for async processing
            </li>
            <li>
              <strong className="text-foreground">BigQuery:</strong> Stores analytical 
              data for reporting
            </li>
            <li>
              <strong className="text-foreground">Firestore:</strong> NoSQL database 
              for real-time data
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Ensuring Data Integrity
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            One of my responsibilities is ensuring data is stored and retrieved correctly. 
            This involves several practices:
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            1. Validating at API Boundaries
          </h3>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# FastAPI example with Pydantic validation
from pydantic import BaseModel, EmailStr, validator
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    age: Optional[int] = None
    
    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
    
    @validator('age')
    def age_must_be_positive(cls, v):
        if v is not None and v < 0:
            raise ValueError('Age must be positive')
        return v`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            2. Database Constraints
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Application validation isn&apos;t enough. Database constraints provide a 
            safety net:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure email format
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            3. Handling Failures Gracefully
          </h3>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`import asyncio
from typing import Optional

async def fetch_with_retry(
    url: str, 
    max_retries: int = 3,
    backoff_factor: float = 2.0
) -> Optional[dict]:
    """Fetch data with exponential backoff retry."""
    
    for attempt in range(max_retries):
        try:
            response = await http_client.get(url)
            response.raise_for_status()
            return response.json()
            
        except Exception as e:
            if attempt == max_retries - 1:
                log.error(f"Failed after {max_retries} attempts: {e}")
                return None
            
            wait_time = backoff_factor ** attempt
            log.warning(f"Attempt {attempt + 1} failed, retrying in {wait_time}s")
            await asyncio.sleep(wait_time)
    
    return None`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Debugging Production Issues
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            When something goes wrong with data, I follow a systematic approach:
          </p>

          <ol className="list-decimal list-inside text-muted-foreground space-y-3 mb-6">
            <li>
              <strong className="text-foreground">Check the logs:</strong> Cloud 
              Logging shows what happened at each step
            </li>
            <li>
              <strong className="text-foreground">Trace the request:</strong> Follow 
              the data from client to database
            </li>
            <li>
              <strong className="text-foreground">Verify the schema:</strong> Ensure 
              database schema matches application expectations
            </li>
            <li>
              <strong className="text-foreground">Check connectivity:</strong> VPC 
              settings and IAM permissions can block access
            </li>
            <li>
              <strong className="text-foreground">Review recent changes:</strong> Check 
              deployment history for related changes
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Documentation and Knowledge Sharing
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            A significant part of my work involves documenting workflows and 
            data-related configurations. Good documentation helps the team:
          </p>

          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
            <li>Onboard new team members faster</li>
            <li>Troubleshoot issues without depending on one person</li>
            <li>Maintain consistent practices across the team</li>
            <li>Reduce time spent on repeated questions</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Looking Forward: Data Engineering
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Understanding these data flows is directly relevant to data engineering. 
            ETL pipelines are essentially:
          </p>

          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
            <li>
              <strong className="text-foreground">Extract:</strong> Pull data from 
              various sources (APIs, databases, files)
            </li>
            <li>
              <strong className="text-foreground">Transform:</strong> Clean, validate, 
              and reshape the data
            </li>
            <li>
              <strong className="text-foreground">Load:</strong> Store in a data 
              warehouse for analysis
            </li>
          </ul>

          <p className="text-muted-foreground leading-relaxed">
            My current work with PostgreSQL, Python, and cloud services gives me 
            hands-on experience with each of these stages. Learning tools like 
            BigQuery and understanding data flows prepares me for building and 
            maintaining data pipelines.
          </p>
        </motion.div>
      </article>
    </main>
  );
}
