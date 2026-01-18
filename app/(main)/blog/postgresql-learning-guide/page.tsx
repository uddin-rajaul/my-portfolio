"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function PostgreSQLLearningGuide() {
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
            {["PostgreSQL", "SQL", "Database"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            PostgreSQL Learning Guide
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              January 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              15 min read
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
            This guide covers everything from configuring a beautiful psql environment to understanding PostgreSQL basics and mastering advanced SQL queries.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            🎨 Beautiful psql Configuration
          </h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Setup Commands</h3>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Create the config file
nano ~/.psqlrc

# Copy config to postgres user
sudo cp ~/.psqlrc /var/lib/postgresql/.psqlrc
sudo chown postgres:postgres /var/lib/postgresql/.psqlrc

# Connect to PostgreSQL
sudo -u postgres psql`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Configuration File (~/.psqlrc)</h3>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`-- ================================
-- Beautiful PostgreSQL Configuration
-- ================================

-- Turn off welcome messages during setup
\\set QUIET 1

-- ================================
-- FORMATTING
-- ================================

-- Use Unicode box-drawing characters for tables
\\pset linestyle unicode
\\pset border 2

-- Show NULL values clearly
\\pset null '∅'

-- Auto-expand tables when they're too wide
\\x auto

-- Better table format
\\pset format aligned

-- Show query execution time
\\timing on

-- ================================
-- COLORS & PROMPT
-- ================================

-- Colorful prompt with database name
\\set PROMPT1 '%[%033[1;34m%]%n%[%033[0m%]@%[%033[1;36m%]%/%[%033[0m%]%R%[%033[1;34m%]%#%[%033[0m%] '

-- Continuation prompt for multi-line queries
\\set PROMPT2 '%[%033[1;34m%]...%[%033[0m%] '

-- ================================
-- HISTORY
-- ================================

-- Separate history file per database
\\set HISTFILE ~/.psql_history- :DBNAME

-- Don't save duplicate commands
\\set HISTCONTROL ignoredups

-- Increase history size
\\set HISTSIZE 10000

-- ================================
-- ERROR HANDLING
-- ================================

-- Show detailed error messages
\\set VERBOSITY verbose

-- Stop on first error in scripts
\\set ON_ERROR_STOP on

-- Show error rollback info
\\set ON_ERROR_ROLLBACK interactive

-- ================================
-- HELPFUL SHORTCUTS
-- ================================

-- Quick table info
\\set info 'SELECT schemaname, tablename, tableowner FROM pg_tables WHERE schemaname NOT IN (\\'pg_catalog\\', \\'information_schema\\') ORDER BY tablename;'

-- Database size
\\set dbsize 'SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) AS size FROM pg_database ORDER BY pg_database_size(pg_database.datname) DESC;'

-- Table sizes
\\set tablesize 'SELECT tablename, pg_size_pretty(pg_total_relation_size(schemaname||''.''||tablename)) AS size FROM pg_tables WHERE schemaname NOT IN (\\'pg_catalog\\', \\'information_schema\\') ORDER BY pg_total_relation_size(schemaname||''.''||tablename) DESC;'

-- Active queries
\\set activity 'SELECT pid, usename, application_name, client_addr, state, query FROM pg_stat_activity WHERE state != \\'idle\\' ORDER BY query_start DESC;'

-- Show all databases with sizes
\\set databases 'SELECT d.datname as "Database", pg_catalog.pg_get_userbyid(d.datdba) as "Owner", pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname)) as "Size" FROM pg_catalog.pg_database d ORDER BY pg_catalog.pg_database_size(d.datname) DESC;'

-- Turn messages back on
\\set QUIET 0

-- Welcome message
\\echo '\\n'
\\echo '╔════════════════════════════════════════╗'
\\echo '║   PostgreSQL - Ready! 🐘              ║'
\\echo '╚════════════════════════════════════════╝'
\\echo ''
\\echo 'Shortcuts available:'
\\echo '  :info      - List all tables'
\\echo '  :dbsize    - Show database sizes'
\\echo '  :tablesize - Show table sizes'
\\echo '  :activity  - Show active queries'
\\echo '  :databases - List all databases'
\\echo ''
\\echo 'Commands:'
\\echo '  \\\\l         - List databases'
\\echo '  \\\\c dbname  - Connect to database'
\\echo '  \\\\dt        - List tables'
\\echo '  \\\\d table   - Describe table'
\\echo '  \\\\q         - Quit'
\\echo '\\n'`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Custom Shortcuts</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Once configured, use these shortcuts in psql:
          </p>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`:info       -- List all your tables
:dbsize     -- Show database sizes
:tablesize  -- Show table sizes
:activity   -- Show running queries
:databases  -- List all databases`}</code>
            </pre>
          </div>

          <hr className="my-12 border-zinc-800" />

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            🐘 PostgreSQL Basics
          </h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Starting PostgreSQL</h3>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Connect as postgres user
sudo -u postgres psql

# Connect to specific database
sudo -u postgres psql -d database_name

# Connect as specific user
psql -U username -d database_name

# Connect to remote database
psql -h hostname -U username -d database_name`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Essential psql Commands</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Database Operations:
          </p>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`\\l                    -- List all databases
\\c database_name      -- Connect to database
\\q                    -- Quit psql

CREATE DATABASE mydb;
DROP DATABASE mydb;`}</code>
            </pre>
          </div>
          
           <p className="text-muted-foreground leading-relaxed mb-6">
            Table Operations:
          </p>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`\\dt                   -- List all tables
\\dt+                  -- List tables with sizes
\\d table_name         -- Describe table structure
\\d+ table_name        -- Detailed table description

-- Copy table structure
CREATE TABLE new_table (LIKE old_table);`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Schema Operations</h3>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`\\dn                   -- List schemas
\\dn+                  -- List schemas with details

CREATE SCHEMA schema_name;
DROP SCHEMA schema_name CASCADE;
SET search_path TO schema_name;`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">User/Role Operations</h3>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`\\du                   -- List users and roles
\\du+                  -- Detailed user information

CREATE USER username WITH PASSWORD 'password';
ALTER USER username WITH SUPERUSER;
DROP USER username;`}</code>
            </pre>
          </div>
          
          <hr className="my-12 border-zinc-800" />

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            🎓 PostgreSQL Theory
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            PostgreSQL is a powerful, open-source <strong>relational database management system (RDBMS)</strong>. 
            Key concepts include Databases, Tables, Rows, Columns, Schemas, Primary Keys, and Foreign Keys.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">ACID Properties</h3>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li><strong>Atomicity</strong>: All operations in a transaction succeed or all fail</li>
            <li><strong>Consistency</strong>: Database moves from one valid state to another</li>
            <li><strong>Isolation</strong>: Concurrent transactions don&apos;t interfere with each other</li>
             <li><strong>Durability</strong>: Committed data persists even after system failure</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Database Design Principles</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Normalization is key. Example of good design:
          </p>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`-- GOOD: Normalized
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    price DECIMAL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</code>
            </pre>
          </div>
          
           <hr className="my-12 border-zinc-800" />

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            📊 SQL Fundamentals
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            Check the full resource for examples of creating tables, data types, INSERT, SELECT, UPDATE, DELETE, and Advanced Queries including JOINS.
          </p>
       
        </motion.div>
      </article>
    </main>
  );
}
