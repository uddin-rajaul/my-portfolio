"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

export default function Breadcrumb() {
  const pathname = usePathname()

  // Don't show breadcrumb on homepage
  if (pathname === "/") {
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter((segment) => segment !== "")
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: "Home",
        href: "/",
      },
    ]

    // Map path segments to readable labels
    const segmentLabels: Record<string, string> = {
      about: "About",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      tools: "Tools",
    }

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1

      breadcrumbs.push({
        label: segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        current: isLast,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors"
      aria-label="Breadcrumb"
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <Fragment key={item.href}>
              <li className="flex items-center">
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Home className="w-4 h-4 mr-1" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : item.current ? (
                  <span className="text-purple-600 dark:text-purple-400 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
              {index < breadcrumbs.length - 1 && (
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </nav>
  )
}
