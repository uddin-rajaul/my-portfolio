"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const links = [
  {
    category: "Navigation",
    items: [
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Photography", href: "/photography" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    category: "Socials",
    items: [
      { name: "GitHub", href: "https://github.com/uddin-rajaul", external: true },
      { name: "LinkedIn", href: "https://linkedin.com/in/rajaul-uddin", external: true },
      { name: "Twitter", href: "https://twitter.com", external: true },
    ],
  },
  {
    category: "Recent Work",
    items: [
      { name: "YapBoard", href: "https://github.com/knockboard/yapboard", external: true },
      { name: "E-Commerce API", href: "https://github.com/uddin-rajaul/e-com", external: true },
    ],
  },
]

export function QuickLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
      {links.map((section) => (
        <div key={section.category} className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {section.category}
          </h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
