"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProjectSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
            </div>
            <div className="mt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24 mb-2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {/* Featured Post Skeleton */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-2"></div>
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Grid Skeleton */}
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24 mb-2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6 mb-2"></div>
              <div className="flex items-center gap-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/5"></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AboutSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ContactSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Contact Info Skeleton */}
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-40"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form Skeleton */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16 mb-2"></div>
                <div
                  className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${index === 3 ? "h-24" : "h-10"}`}
                ></div>
              </div>
            ))}
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
