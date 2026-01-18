"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function LinuxEveryday() {
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
             {["Linux", "Pop!_OS", "Terminal"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Linux for Everyday Use - Complete Beginner&apos;s Guide
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              January 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              12 min read
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
            Switching to Linux can be daunting, but it&apos;s rewarding. This guide covers the philosophy, file system, essential commands, and how to survive your first weeks on Pop!_OS.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             🎯 Philosophy: Think Different
          </h2>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
             <li><strong>Windows/Mac way:</strong> Click everything</li>
             <li><strong>Linux way:</strong> Type commands (faster once you learn!)</li>
             <li><strong>Don&apos;t worry:</strong> Pop!_OS has a great GUI too, so you can use both!</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             📁 File System Basics
          </h2>
          <h3 className="text-xl font-semibold mt-8 mb-4">Where Everything Lives</h3>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`/                    Root (top of everything)
├── home/
│   └── yourname/    YOUR files (like C:\\Users\\YourName)
│       ├── Documents/
│       ├── Downloads/
│       ├── Pictures/
│       └── Desktop/
├── usr/             Programs (like C:\\Program Files)
├── etc/             Configuration files
├── tmp/             Temporary files
└── var/             Logs and changing data`}</code>
            </pre>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong>Important:</strong> <code>~</code> means your home folder (`/home/yourname`). 
            <code>/</code> is NOT the same as <code>\</code> in Windows! Everything is case-sensitive.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             🖥️ Essential Terminal Commands
          </h2>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Navigation
pwd                    # Where am I? (Print Working Directory)
ls                     # List files
ls -la                 # List ALL files (including hidden)
cd Documents           # Go to Documents folder
cd ~                   # Go home
cd ..                  # Go up one level

# File Operations
touch file.txt         # Create empty file
mkdir folder           # Create folder
cp file.txt backup.txt # Copy file
mv old.txt new.txt     # Rename/move file
rm file.txt            # Delete file
rm -rf folder          # Force delete (CAREFUL!)

# Viewing details
cat file.txt           # Show entire file
less file.txt          # View file (press q to quit)
head file.txt          # First 10 lines`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             📦 Installing Software
          </h2>
          <h3 className="text-xl font-semibold mt-8 mb-4">APT (Terminal - Most Common)</h3>
            <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Search for software
apt search firefox

# Install software
sudo apt install firefox

# Update all software
sudo apt update          # Refresh list
sudo apt upgrade         # Install updates

# Remove software
sudo apt remove firefox
sudo apt autoremove      # Clean up leftovers`}</code>
            </pre>
          </div>
          
           <h2 className="text-2xl font-semibold mt-12 mb-4">
             🔐 Permissions System
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
             Understanding permissions (`ls -l`):
          </p>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`-rw-r--r--
│││││││││└─ Others can read
││││││└─└── Group can read
│││└─└────── Owner can read/write
│└───────── Not a directory`}</code>
            </pre>
          </div>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`chmod +x script.sh     # Make executable
sudo chown user:group file.txt`}</code>
            </pre>
          </div>

           <h2 className="text-2xl font-semibold mt-12 mb-4">
             📚 Learning Path
          </h2>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li>Week 1: Get Comfortable (Terminal, Pop!_Shop)</li>
            <li>Week 2: File Management (nano, permissions, backup)</li>
            <li>Week 3: System Maintenance (updates, htop)</li>
            <li>Week 4: Power User (zsh, scripting)</li>
          </ul>

        </motion.div>
      </article>
    </main>
  );
}
