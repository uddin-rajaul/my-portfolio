"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Photography", href: "/photography" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="py-8 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-mono font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
          ~/rajaul
        </Link>

        <div className="flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
