"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function PopOsTerminalImprovements() {
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
             {["Terminal", "Zsh", "Productivity"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Pop!_OS Terminal Improvements Guide
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              January 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              14 min read
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
             Supercharge your Pop!_OS terminal with <code>lsd</code>, <code>fzf</code>, <code>starship</code>, and more. Also includes a guide to <code>uv</code>, the lightning-fast Python package manager.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             Better File Listings with lsd
          </h2>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`sudo apt update && sudo apt install lsd -y

# Add aliases to ~/.zshrc
alias ls="lsd"
alias ll="lsd -lh"
alias la="lsd -lAh"
alias lt="lsd --tree"
alias l="lsd -lah"`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             🧭 Navigation Aliases
          </h2>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Navigation aliases
alias ..="cd .."
alias ...="cd ../.."

# Quick directory jumps
alias ~="cd ~"

# List after changing directory
cd() { builtin cd "$@" && lsd; }

# Create and enter directory
mkcd() { mkdir -p "$1" && cd "$1"; }`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             🎨 Visual Improvements
          </h2>
           <h3 className="text-xl font-semibold mt-8 mb-4">1. Starship Prompt</h3>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`curl -sS https://starship.rs/install.sh | sh
echo 'eval "$(starship init zsh)"' >> ~/.zshrc`}</code>
            </pre>
          </div>
           <h3 className="text-xl font-semibold mt-8 mb-4">2. Zsh Plugins</h3>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Syntax Highlighting
sudo apt install zsh-syntax-highlighting

# Auto-suggestions
sudo apt install zsh-autosuggestions`}</code>
            </pre>
          </div>

           <h2 className="text-2xl font-semibold mt-12 mb-4">
             🔍 Search & Navigation
          </h2>
           <h3 className="text-xl font-semibold mt-8 mb-4">Fuzzy Finder (fzf) & Zoxide</h3>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`sudo apt install fzf
curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash
echo 'eval "$(zoxide init zsh)"' >> ~/.zshrc`}</code>
            </pre>
          </div>

          <hr className="my-12 border-zinc-800" />

          <h2 className="text-2xl font-semibold mt-12 mb-4">
             UV - Fast Python Package Manager
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
             UV is a drop-in replacement for pip that is 10-100x faster.
          </p>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Basic UV Shortcuts (add to .zshrc)
alias uvi="uv pip install"
alias uvr="uv pip uninstall"
alias uvl="uv pip list"
alias venv="uv venv"
alias va="source .venv/bin/activate"

# Quick Project Setup
uvproject() {
    mkdir -p "$1" && cd "$1"
    uv venv
    source .venv/bin/activate
}`}</code>
            </pre>
          </div>
          
           <h3 className="text-xl font-semibold mt-8 mb-4">Performance</h3>
           <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`# pip install pandas (old way) -> ~ 10-30 seconds
# uv pip install pandas (UV way) -> ~ 1-3 seconds`}</code>
            </pre>
          </div>

        </motion.div>
      </article>
    </main>
  );
}
