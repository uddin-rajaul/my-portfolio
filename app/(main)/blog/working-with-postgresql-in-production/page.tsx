"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function PostgreSQLProductionPost() {
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
            {["PostgreSQL", "SQL", "Production"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Working with PostgreSQL in Production: Lessons from Real-World Experience
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2025
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              8 min read
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
            Working with production databases is a different experience from practicing SQL in tutorials. 
            At Gorkhali Agents, I&apos;ve had the opportunity to work directly with PostgreSQL databases 
            that power real applications. Here&apos;s what I&apos;ve learned about handling data in production.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Writing Queries That Actually Work
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            In production, you can&apos;t afford slow queries. I&apos;ve learned to write efficient SQL 
            using proper joins, filters, and indexing strategies. Here&apos;s an example of a query 
            pattern I use frequently:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`SELECT 
    u.id,
    u.email,
    o.order_date,
    o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
    AND o.status = 'completed'
ORDER BY o.order_date DESC
LIMIT 100;`}</code>
            </pre>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            The key lessons here: always limit results when you don&apos;t need everything, 
            filter early with WHERE clauses, and use appropriate JOIN types based on your data needs.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Debugging Data-Related Issues
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            One of the most challenging parts of my work has been diagnosing production issues. 
            Schema mismatches, inconsistent data, and database connectivity problems are common. 
            I&apos;ve developed a systematic approach:
          </p>

          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
            <li>
              <strong className="text-foreground">Check schema first:</strong> Verify table 
              structures match what the application expects
            </li>
            <li>
              <strong className="text-foreground">Validate data types:</strong> Type mismatches 
              cause silent failures
            </li>
            <li>
              <strong className="text-foreground">Review constraints:</strong> Foreign key and 
              unique constraints can block inserts unexpectedly
            </li>
            <li>
              <strong className="text-foreground">Check connection limits:</strong> Pool exhaustion 
              is a common issue under load
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Understanding DDL vs DML Operations
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            From my Oracle Database Labs project and production work, I&apos;ve learned the 
            importance of understanding the difference between DDL (Data Definition Language) 
            and DML (Data Manipulation Language) operations:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`-- DDL: Creating and modifying structures
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DML: Working with data
INSERT INTO audit_log (action, table_name, record_id)
VALUES ('UPDATE', 'users', 42);`}</code>
            </pre>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            DDL operations are typically run during deployments, while DML is what your 
            application does constantly. Understanding this distinction helps when 
            troubleshooting migration issues.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Subqueries and Set Operations
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Complex data problems often require combining multiple queries. I frequently 
            use subqueries and set operations:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`-- Find users who have orders but no recent activity
SELECT id, email FROM users
WHERE id IN (
    SELECT DISTINCT user_id FROM orders
)
EXCEPT
SELECT id, email FROM users
WHERE last_login > CURRENT_DATE - INTERVAL '90 days';`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Key Takeaways
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Working with PostgreSQL in production has taught me that database skills go 
            beyond writing queries. You need to understand:
          </p>

          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
            <li>How data flows between your application and database</li>
            <li>The importance of proper indexing and query optimization</li>
            <li>Schema design principles that prevent future problems</li>
            <li>Debugging techniques for data-related issues</li>
            <li>Secure practices for handling production data</li>
          </ul>

          <p className="text-muted-foreground leading-relaxed">
            These skills directly support my goal of growing into a data engineering role, 
            where understanding databases is fundamental to building reliable data pipelines.
          </p>
        </motion.div>
      </article>
    </main>
  );
}
