import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Breadcrumb from "@/components/breadcrumb"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rajaul Uddin Portfolio",
  description:
    "BSc CSIT graduate passionate about software engineering and backend development. Skilled in Python, SQL, and building scalable applications.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <Navigation />
          <Breadcrumb />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
