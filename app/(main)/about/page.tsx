"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Calendar, Briefcase, GraduationCap, Code2, ArrowRight } from "lucide-react";

const skills = [
  {
    category: "Programming",
    items: ["Python (Automation, OOP)", "Bash/Shell Scripting", "SQL"],
  },
  {
    category: "Cloud Platform",
    items: ["Google Cloud Platform", "AWS (Basic)", "BigQuery", "Firestore"],
  },
  {
    category: "Infrastructure",
    items: ["Terraform", "Docker", "GitHub Actions", "Cloud Build"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Oracle", "MongoDB"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-24 right-[8%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/python-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute top-40 left-[6%] w-9 h-9 md:w-11 md:h-11 opacity-15"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/images/postgresql-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-[12%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src="/images/cloud-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-48 left-[10%] w-8 h-8 md:w-10 md:h-10 opacity-15"
          animate={{ y: [0, 8, 0], x: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image src="/images/git-icon.png" alt="" fill className="object-contain" />
        </motion.div>
        
        {/* Floating dots */}
        <motion.div
          className="absolute top-32 right-[25%] w-2 h-2 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 left-[20%] w-3 h-3 rounded-full bg-blue-500/15"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 right-[30%] w-2 h-2 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I work with SQL, relational databases, and Python, and have supported real application 
            data in a production environment. I am learning ETL concepts and cloud data tools and 
            want to grow into a data engineering role.
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Kathmandu, Nepal</p>
              <p className="text-sm text-muted-foreground">UTC+5:45</p>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Experience</h2>
          </div>

          <div className="py-6 border-b border-border/50">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-medium">Cloud & DevOps Engineer</h3>
                <Link 
                  href="https://gorkhaliagents.ai/" 
                  target="_blank"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Gorkhali Agents <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                April 2025 - Present
              </span>
            </div>
            <ul className="text-muted-foreground space-y-2 mt-4">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Worked with PostgreSQL, writing SQL queries, joins, filters, and debugging data-related issues
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Supported backend services by understanding data flows between APIs, databases, and cloud services
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Used Python for automation and data processing tasks, including validation and transformation
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Followed secure data handling practices using Secret Manager and proper access control
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Skills</h2>
          </div>

          <div className="space-y-6">
            {skills.map((skillGroup, index) => (
              <div key={skillGroup.category} className="py-4 border-b border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Education</h2>
          </div>

          <div className="py-6 border-b border-border/50">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-medium">BSc. CSIT</h3>
                <p className="text-muted-foreground">Trinity Int&apos;l College, Tribhuwan University</p>
              </div>
              <span className="text-sm text-muted-foreground">2021 - 2025</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              OOP, Operating Systems, Web Development, Advanced Database, Software Engineering, DSA, AI, Data Handling
            </p>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            href="/contact" 
            className="group flex items-center justify-between py-6 border-b border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">Get in touch</p>
                <p className="text-sm text-muted-foreground">Let&apos;s work together</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
