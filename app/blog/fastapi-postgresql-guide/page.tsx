import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Building APIs with FastAPI and PostgreSQL - Rajaul Uddin",
  description:
    "Learn how to build scalable REST APIs using FastAPI and PostgreSQL with practical examples and best practices.",
}

export default function FastAPIPostgreSQLGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:opacity-80 mb-8 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          {/* Hero Image */}
          <div className="w-full h-64 bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Building APIs with FastAPI and PostgreSQL</h1>
              <p className="text-purple-100">A practical guide to modern API development</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                FastAPI has become my go-to framework for building modern REST APIs. Combined with PostgreSQL, it
                creates a powerful stack for scalable backend applications. In this guide, I'll share the patterns and
                practices I've learned from building production APIs.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Why FastAPI + PostgreSQL?</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                After working with Django and other frameworks, FastAPI stands out for several reasons:
              </p>

              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                <li>
                  <strong>Performance:</strong> Built on Starlette and Pydantic, it's incredibly fast
                </li>
                <li>
                  <strong>Type Safety:</strong> Python type hints provide excellent developer experience
                </li>
                <li>
                  <strong>Auto Documentation:</strong> Swagger UI and ReDoc generated automatically
                </li>
                <li>
                  <strong>Modern Python:</strong> Async/await support out of the box
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Setting Up the Project</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Here's how I structure a typical FastAPI project:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`project/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   └── core/
├── requirements.txt
└── .env`}
              </pre>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Database Connection</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                I use SQLAlchemy with asyncpg for async database operations:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"

engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                The async approach is crucial for handling concurrent requests efficiently.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Key Lessons Learned</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    1. Use Dependency Injection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    FastAPI's dependency injection system is powerful for database sessions, authentication, and
                    configuration management.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Separate Schemas</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Keep your Pydantic schemas separate from SQLAlchemy models. This provides flexibility and better API
                    design.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    3. Handle Errors Gracefully
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Implement proper exception handling and return meaningful error responses to API consumers.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Next Steps</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This combination has served me well in production applications. The type safety, performance, and
                developer experience make it an excellent choice for modern API development. In future posts, I'll dive
                deeper into authentication, testing, and deployment strategies.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
