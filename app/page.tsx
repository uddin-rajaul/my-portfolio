"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AsciiArt } from "@/components/home/ascii-art"
import { QuickLinks } from "@/components/home/quick-links"
import { Hero } from "@/components/home/hero"
import { FeaturedProject } from "@/components/home/featured-project"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
      
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[12%] left-[8%] w-12 h-12 md:w-16 md:h-16 opacity-20"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/python-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute top-[18%] right-[10%] w-10 h-10 md:w-14 md:h-14 opacity-20"
          animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/images/postgresql-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute top-[45%] left-[5%] w-14 h-14 md:w-18 md:h-18 opacity-15"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src="/images/docker-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[6%] w-12 h-12 md:w-16 md:h-16 opacity-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image src="/images/cloud-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] left-[10%] w-10 h-10 md:w-12 md:h-12 opacity-15"
          animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Image src="/images/git-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] right-[8%] w-11 h-11 md:w-14 md:h-14 opacity-20"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <Image src="/images/database-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute top-[28%] left-[20%] w-8 h-8 md:w-10 md:h-10 opacity-15"
          animate={{ y: [0, 6, 0], x: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        >
          <Image src="/images/terminal-icon.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          className="absolute top-[35%] right-[25%] w-2 h-2 rounded-full bg-blue-500/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[35%] left-[25%] w-3 h-3 rounded-full bg-blue-500/25"
          animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-10 relative z-10 flex flex-col items-center">
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AsciiArt />
        </motion.div>

        <div className="relative w-full flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none -z-10" />
          <Hero />
        </div>

        <QuickLinks />

        <FeaturedProject />
      </div>
    </div>
  )
}



