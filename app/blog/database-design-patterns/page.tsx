import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Database Design Patterns I Wish I Knew Earlier - Rajaul Uddin",
  description:
    "Essential database design patterns and principles that can save you from common pitfalls in application development.",
}

export default function DatabaseDesignPatterns() {
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
          <div className="w-full h-64 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Database Design Patterns I Wish I Knew Earlier</h1>
              <p className="text-green-100">Essential patterns for scalable database architecture</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>November 18, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Database design mistakes are expensive to fix later. After working with various database systems and
                refactoring schemas multiple times, I've learned some patterns that can save significant pain down the
                road.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                1. The Audit Trail Pattern
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Always include these fields in your tables:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    -- Business fields here
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    is_deleted BOOLEAN DEFAULT FALSE
);`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                This pattern has saved me countless times when debugging issues or implementing soft deletes. You'll
                thank yourself later.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                2. Polymorphic Associations
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                When you need to associate records with different types of entities:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    commentable_type VARCHAR(50) NOT NULL,
    commentable_id INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient queries
CREATE INDEX idx_comments_polymorphic 
ON comments(commentable_type, commentable_id);`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                This allows comments on posts, products, or any other entity without creating separate comment tables
                for each.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                3. The Status Machine Pattern
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Instead of boolean flags, use status enums for better state management:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status order_status DEFAULT 'pending',
    status_changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                This approach makes state transitions explicit and prevents invalid states.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                4. Denormalization for Performance
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Sometimes breaking normalization rules improves performance significantly:
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Counter Caches</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Store computed values like comment counts directly in the parent table instead of counting every
                    time.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Materialized Views</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    For complex aggregations, materialized views can provide significant performance improvements.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Key Takeaways</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Good database design is about finding the right balance between normalization, performance, and
                maintainability. These patterns have served me well across different projects and database systems. The
                key is to think about future requirements and plan for change from the beginning.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
