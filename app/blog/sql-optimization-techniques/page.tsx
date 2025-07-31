import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SQL Optimization Techniques That Matter - Rajaul Uddin",
  description: "Practical SQL optimization techniques to improve database performance and query efficiency.",
}

export default function SQLOptimizationTechniques() {
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
          <div className="w-full h-64 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">SQL Optimization Techniques That Matter</h1>
              <p className="text-orange-100">Performance tuning for faster database queries</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>July 3, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>9 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Slow queries can kill application performance. Through working with PostgreSQL and Oracle databases,
                I've learned that small optimizations can yield massive performance improvements. Here are the
                techniques that have made the biggest difference in real projects.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">1. Index Strategy</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Proper indexing is the foundation of query performance:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`-- Composite index for common query patterns
CREATE INDEX idx_orders_user_status_date 
ON orders(user_id, status, created_at);

-- Partial index for specific conditions
CREATE INDEX idx_active_products 
ON products(category_id) 
WHERE is_active = true;

-- Covering index to avoid table lookups
CREATE INDEX idx_user_profile_covering 
ON users(id) 
INCLUDE (name, email, created_at);`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Remember: indexes speed up reads but slow down writes. Find the right balance for your workload.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                2. Query Rewriting Techniques
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Avoid SELECT *</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {`-- Bad: Fetches unnecessary data
SELECT * FROM users WHERE status = 'active';

-- Good: Only fetch what you need
SELECT id, name, email FROM users WHERE status = 'active';`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Use EXISTS instead of IN</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {`-- Slower with large subqueries
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- Faster with EXISTS
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id AND o.total > 100
);`}
                  </pre>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. Join Optimization</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Proper join techniques can dramatically improve performance:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`-- Use appropriate join types
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;

-- Filter early to reduce join size
SELECT u.name, o.total
FROM (
    SELECT id, name FROM users 
    WHERE created_at > '2024-01-01'
) u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';`}
              </pre>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. Pagination Done Right</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                OFFSET becomes slow with large datasets. Use cursor-based pagination:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`-- Slow with large offsets
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 10000;

-- Fast cursor-based pagination
SELECT * FROM posts 
WHERE created_at < '2024-01-15 10:30:00'
ORDER BY created_at DESC 
LIMIT 20;

-- For next page, use the last created_at value as cursor`}
              </pre>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                5. Analyzing Query Performance
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Always use EXPLAIN to understand query execution:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`-- PostgreSQL
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM orders 
WHERE user_id = 123 AND status = 'pending';

-- Look for:
-- • Sequential scans on large tables
-- • High cost operations
-- • Missing index usage
-- • Excessive buffer reads`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                The execution plan tells you exactly where the bottlenecks are.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Performance Monitoring</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Optimization is an ongoing process. Set up monitoring for slow queries, track performance metrics over
                time, and regularly review query patterns. Tools like pg_stat_statements in PostgreSQL can help identify
                the queries that need attention most.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Remember: premature optimization is the root of all evil, but ignoring performance until it becomes a
                problem is equally dangerous. Profile first, optimize second.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
