"use client"

import Link from "next/link"
import { ArrowRight, Database, GitBranch, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

export function FeaturedProject() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Project release date: January 18, 2026
    const releaseDate = new Date('2026-01-18');
    const currentDate = new Date();
    
    // Calculate difference in months
    const diffTime = Math.abs(currentDate.getTime() - releaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Show only if within 90 days (approx 3 months)
    if (diffDays <= 90) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto mt-8 mb-16"
    >
      <div className="rounded-xl border border-border bg-card/50 p-1">
        <div className="rounded-lg bg-background/50 p-6 md:p-8 relative overflow-hidden group hover:bg-background/80 transition-colors">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium tracking-wide">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        LATEST PROJECT
                    </div>
                    
                    <h3 className="text-2xl font-bold">Data Pipeline Automation</h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                        A modern ELT pipeline processing TPC-H data using dbt and Airflow. 
                        Features automated documentation, data quality checks, and dimensional modeling on Snowflake.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="font-mono text-xs">dbt Core</Badge>
                        <Badge variant="secondary" className="font-mono text-xs">Airflow</Badge>
                        <Badge variant="secondary" className="font-mono text-xs">Snowflake</Badge>
                        <Badge variant="secondary" className="font-mono text-xs">Cosmos</Badge>
                    </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                     <Link 
                        href="/blog/data-pipeline-dbt-airflow"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                        Read Case Study
                    </Link>
                    <Link 
                        href="https://github.com/uddin-rajaul/Data-Pipeline-Project-dbt-Airflow-"
                        target="_blank"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium whitespace-nowrap"
                    >
                        View on GitHub <GitBranch className="ml-2 w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  )
}
