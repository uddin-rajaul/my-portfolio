"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ghost, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [-15, 15, -15],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative mb-8"
        >
          <Ghost className="w-40 h-40 text-muted-foreground/80" strokeWidth={1.5} />
          
          {/* Eyes blinking animation */}
          <motion.div 
            className="absolute top-12 left-10 w-4 h-4 bg-foreground rounded-full"
            animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1] }}
          />
          <motion.div 
            className="absolute top-12 right-10 w-4 h-4 bg-foreground rounded-full"
            animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1] }}
          />
          
          {/* Blush */}
          <div className="absolute top-20 left-8 w-6 h-3 bg-red-400/30 rounded-full blur-sm" />
          <div className="absolute top-20 right-8 w-6 h-3 bg-red-400/30 rounded-full blur-sm" />
          
          {/* Question marks */}
          <motion.div
            className="absolute -top-4 -right-8 text-4xl font-bold text-primary/50"
            animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ?
          </motion.div>
           <motion.div
            className="absolute -top-8 -left-4 text-3xl font-bold text-primary/50"
            animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            ?
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 max-w-md mx-auto"
        >
          <div>
            <h1 className="text-8xl font-black text-primary/10 select-none">404</h1>
            <h2 className="text-3xl font-bold -mt-8 relative z-20">Lost in Space?</h2>
          </div>
          
          <p className="text-muted-foreground text-lg">
            This page seems to have drifted away. Let&apos;s get you back on solid ground.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => router.back()} variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
