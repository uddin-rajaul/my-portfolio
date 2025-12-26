import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { VisitorTracker } from "@/components/visitor-tracker"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rajaul Uddin - Software Engineer & Backend Developer",
  description:
    "BSc CSIT graduate passionate about software engineering and backend development. Skilled in Python, SQL, and building scalable applications.",
  icons: {
    icon: "/images/luffy-developer.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.className} min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/20`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <VisitorTracker />
          <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
