"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Data Pipeline Automation",
    description:
      "A modern ELT pipeline using dbt Core and Apache Airflow (via Cosmos) on Snowflake. Includes automated documentation, data quality tests, and dimensional modeling.",
    tech: ["dbt", "Airflow", "Snowflake", "Docker"],
    github: "https://github.com/uddin-rajaul/Data-Pipeline-Project-dbt-Airflow-",
    demo: null,
    status: "Completed",
  },
  {
    title: "YapBoard – AI-Powered Whiteboard",
    description:
      "An innovative whiteboard application with AI-powered features including real-time background removal using U²-Net architecture.",
    tech: ["Python", "FastAPI", "PostgreSQL", "AI/ML"],
    github: "https://github.com/knockboard/yapboard",
    demo: null,
    status: "Completed",
  },
  {
    title: "E-Commerce API",
    description:
      "A comprehensive e-commerce backend API supporting product management, image uploads, and categorization with clean, modular architecture.",
    tech: ["Python", "Django", "DRF", "OOP"],
    github: "https://github.com/uddin-rajaul/e-com",
    demo: null,
    status: "Completed",
  },
  {
    title: "Diabetes Prediction ML",
    description:
      "A machine learning-powered web application that predicts diabetic conditions using SVM algorithm with a user-friendly Django interface.",
    tech: ["Python", "Django", "ML", "SVM"],
    github: "https://github.com/uddin-rajaul/Diabetes-prediction",
    demo: null,
    status: "Completed",
  },
  {
    title: "Oracle Database Labs",
    description:
      "Practiced real-world SQL using Oracle's HR Schema. Wrote and optimized queries using joins, subqueries, set operations, and stored procedures.",
    tech: ["Oracle DB", "SQL", "PL/SQL"],
    github: null,
    demo: null,
    status: "Academic",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-28 right-[10%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/docker-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute top-44 left-[5%] w-9 h-9 md:w-11 md:h-11 opacity-15"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/images/python-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-[15%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src="/images/database-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-28 left-[8%] w-8 h-8 md:w-10 md:h-10 opacity-15"
          animate={{ y: [0, 8, 0], x: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image src="/images/terminal-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        
        {/* Floating dots */}
        <motion.div
          className="absolute top-36 right-[30%] w-2 h-2 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-52 left-[25%] w-3 h-3 rounded-full bg-blue-500/15"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg">
            A collection of projects I&apos;ve built, from APIs to machine learning applications.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="py-6 border-b border-border/50 hover:border-primary/50 transition-colors group">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.status !== "Completed" && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-4 text-sm">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
