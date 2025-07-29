import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Rajaul Uddin",
  description: "Read Rajaul Uddin's thoughts on software development, backend engineering, and technology insights.",
}

export default function BlogPage() {
  const blogPosts = [
    {
      year: "2025",
      posts: [
        {
          date: "Jan 15",
          title: "Building APIs with FastAPI and PostgreSQL",
          slug: "fastapi-postgresql-guide",
        },
      ],
    },
    {
      year: "2024",
      posts: [
        {
          date: "Dec 20",
          title: "Docker containers for Python applications",
          slug: "docker-python-containers",
        },
        {
          date: "Nov 18",
          title: "Database design patterns I wish I knew earlier",
          slug: "database-design-patterns",
        },
        {
          date: "Oct 25",
          title: "Simple guide to Django REST Framework",
          slug: "django-rest-framework-guide",
        },
        {
          date: "Sep 12",
          title: "Cloud deployment with GCP and Terraform",
          slug: "gcp-terraform-deployment",
        },
        {
          date: "Aug 08",
          title: "Authentication in modern web applications",
          slug: "modern-web-authentication",
        },
        {
          date: "Jul 03",
          title: "SQL optimization techniques that matter",
          slug: "sql-optimization-techniques",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {blogPosts.map((yearGroup) => (
          <div key={yearGroup.year} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8">{yearGroup.year}</h2>
            <div className="space-y-6">
              {yearGroup.posts.map((post, index) => (
                <div key={index} className="flex gap-8 items-start border-b border-gray-800 pb-4">
                  <div className="text-gray-400 text-sm font-mono min-w-[60px]">{post.date}</div>
                  <div className="flex-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gray-100 hover:text-white hover:underline transition-colors text-lg"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Coming Soon Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            More articles coming soon. Follow me on{" "}
            <a href="https://github.com/uddin-rajaul" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              GitHub
            </a>{" "}
            for updates.
          </p>
        </div>
      </div>
    </div>
  )
}
