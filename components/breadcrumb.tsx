"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb() {
  const pathname = usePathname()

  // Don't show breadcrumb on homepage
  if (pathname === "/") {
    return null
  }

  const pathSegments = pathname.split("/").filter((segment) => segment !== "")
  
  // If we are at the root of a section (e.g. /about), we don't need breadcrumbs
  // because the navigation already highlights the current section.
  // We only need breadcrumbs for nested pages like /blog/my-post
  if (pathSegments.length < 2) {
    return null
  }

  return (
    <div className="px-6 pb-8">
      <div className="max-w-6xl mx-auto flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

          return (
            <div key={href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
