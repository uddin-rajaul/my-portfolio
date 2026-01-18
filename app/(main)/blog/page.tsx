"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const staticPosts = [
  {
    slug: "data-pipeline-dbt-airflow",
    title: "Building a Modern Data Pipeline with dbt, Airflow, and Snowflake",
    description: "A deep dive into creating an automated ELT pipeline using dbt Core, Cosmos, and Airflow to process TPC-H data.",
    date: "January 2026",
    readTime: "10 min read",
    tags: ["dbt", "Airflow", "Snowflake"],
  },
  {
    slug: "postgresql-learning-guide",
    title: "PostgreSQL Learning Guide",
    description:
      "A comprehensive guide to configuring a beautiful psql environment, understanding PostgreSQL basics, and mastering advanced SQL queries.",
    date: "January 2026",
    readTime: "15 min read",
    tags: ["PostgreSQL", "SQL", "Database"],
  },
  {
    slug: "linux-for-everyday-use",
    title: "Linux for Everyday Use - Complete Beginner's Guide",
    description:
      "Switching to Linux? Here is a complete beginner's guide to file systems, terminal commands, installing software, and more on Pop!_OS.",
    date: "January 2026",
    readTime: "12 min read",
    tags: ["Linux", "Pop!_OS", "Terminal"],
  },
  {
    slug: "pop-os-terminal-improvements",
    title: "Pop!_OS Terminal Improvements Guide",
    description:
      "Make your terminal beautiful and powerful with lsd, starship, zoxide. Plus a guide to UV, the fast Python package manager.",
    date: "January 2026",
    readTime: "14 min read",
    tags: ["Terminal", "Productivity", "Python"],
  },
  {
    slug: "working-with-postgresql-in-production",
    title: "Working with PostgreSQL in Production: Lessons from Real-World Experience",
    description:
      "Insights from debugging data issues, writing optimized SQL queries, and handling schema mismatches in a production environment.",
    date: "December 2025",
    readTime: "8 min read",
    tags: ["PostgreSQL", "SQL", "Production"],
  },
  {
    slug: "python-automation-data-processing",
    title: "Python for Automation and Data Processing",
    description:
      "How I use Python for data validation, transformation, and small automation tasks in cloud-based workflows.",
    date: "December 2025",
    readTime: "6 min read",
    tags: ["Python", "Automation", "Data Processing"],
  },
  {
    slug: "understanding-data-flows-cloud-services",
    title: "Understanding Data Flows Between APIs, Databases, and Cloud Services",
    description:
      "A practical look at how data moves through modern applications and what I learned supporting backend services.",
    date: "December 2025",
    readTime: "7 min read",
    tags: ["Cloud", "APIs", "Data Engineering"],
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState(staticPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          const dbPosts = data.map((post: any) => ({
            slug: post.slug,
            title: post.title,
            description: post.description,
            date: new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            readTime: post.read_time,
            tags: post.tags || [],
          }));
          
          // Combine DB posts with static posts, avoiding duplicates by slug
          const allPosts = [...dbPosts, ...staticPosts];
          const uniquePosts = Array.from(new Map(allPosts.map(item => [item.slug, item])).values());
          setPosts(uniquePosts);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-28 right-[10%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/postgresql-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute top-48 left-[5%] w-9 h-9 md:w-11 md:h-11 opacity-15"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/images/python-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-36 right-[12%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src="/images/cloud-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-52 left-[8%] w-8 h-8 md:w-10 md:h-10 opacity-15"
          animate={{ y: [0, 12, 0], x: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image src="/images/database-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        
        {/* Floating dots */}
        <motion.div
          className="absolute top-40 right-[28%] w-2 h-2 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-36 left-[22%] w-3 h-3 rounded-full bg-blue-500/15"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Writing about databases, Python, and lessons learned from working with production data.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="py-6 border-b border-border/50 hover:border-primary/50 transition-colors">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
