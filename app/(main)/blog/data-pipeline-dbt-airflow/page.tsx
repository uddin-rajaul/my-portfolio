"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function DataPipelinePost() {
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
            {["dbt", "Airflow", "Data Engineering", "Snowflake"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
             Building a Modern Data Pipeline with dbt, Airflow, and Snowflake
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              January 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              10 min read
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
            I recently built a robust data transformation pipeline to process TPC-H sample data into analytics-ready fact tables. 
            This project uses <strong>dbt Core</strong> for transformation and <strong>Apache Airflow</strong> (via Cosmos) for orchestration, all targeting a <strong>Snowflake</strong> data warehouse.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Project Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The pipeline transforms raw source data into a structured dimensional model following modern data engineering best practices.
          </p>
           <ul className="list-disc list-inside text-muted-foreground mb-6">
             <li><strong>Source:</strong> TPC-H dataset (`orders`, `lineitem`)</li>
             <li><strong>Transformation:</strong> dbt Core (SQL-based)</li>
             <li><strong>Orchestration:</strong> Airflow DAGs dynamically generated using <a href="https://github.com/astronomer/astro-cosmos" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cosmos</a></li>
             <li><strong>Target:</strong> Snowflake</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Architecture Features
          </h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">1. Multi-Layer Transformation</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The dbt project is structured into three distinct layers:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
             <li><strong>Staging Layer:</strong> Raw data cleaning and column renaming (e.g., `stg_tpch_orders`).</li>
             <li><strong>Intermediate Layer:</strong> Business logic and joins (e.g., `int_order_items` joining orders and items).</li>
             <li><strong>Marts Layer:</strong> Final business-facing Fact tables (e.g., `fct_orders`).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">2. Automated Data Quality</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I implemented custom data quality checks in the `tests/` directory:
          </p>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`-- Example check: ensuring discounts are valid
select *
from {{ ref('fct_orders') }}
where item_discount_amount > 0  -- Should be negative`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">3. Dynamic Orchestration</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Instead of manually defining every task in Airflow, I used <strong>Cosmos</strong> to render the dbt project as an Airflow DAG automatically. This ensures the orchestrator stays in sync with the data model.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Key Learnings
          </h2>
          
           <h3 className="text-xl font-semibold mt-8 mb-4">Performance Optimization</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I initially faced performance issues where the DAG graph would disappear. I learned to switch the Cosmos `RenderConfig` to use <code>LoadMode.DBT_MANIFEST</code>. 
            This forces Airflow to read the pre-compiled `manifest.json` instead of reparsing the entire dbt project on every heartbeat, significantly improving stability.
          </p>

           <h3 className="text-xl font-semibold mt-8 mb-4">Automated Documentation</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I extended the DAG to include a `dbt_docs_generate` task using the `DbtDocsOperator`. 
            Now, the documentation website is rebuilt after every successful pipeline run, ensuring the data dictionary is always fresh.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mt-12">
            You can check out the full code and setup instructions on the <a href="https://github.com/uddin-rajaul/Data-Pipeline-Project-dbt-Airflow-" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Repository</a>.
          </p>

        </motion.div>
      </article>
    </main>
  );
}
