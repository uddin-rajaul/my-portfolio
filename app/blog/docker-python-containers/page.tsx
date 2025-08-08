import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Docker Containers for Python Applications - Rajaul Uddin",
  description:
    "Learn how to containerize Python applications with Docker, including best practices for production deployments.",
}

export default function DockerPythonContainers() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:opacity-80 mb-8 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          {/* Hero Image */}
          <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Docker Containers for Python Applications</h1>
              <p className="text-blue-100">Containerization best practices and optimization</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>December 20, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>6 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Containerizing Python applications has become essential for modern development workflows. Docker
                provides consistency across environments and simplifies deployment. Here's what I've learned from
                containerizing various Python projects.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                The Multi-Stage Build Approach
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                For production applications, I use multi-stage builds to keep images lean:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`# Build stage
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "main.py"]`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                This approach reduces the final image size significantly by excluding build dependencies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Optimization Strategies</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Layer Caching</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Copy requirements.txt first and install dependencies before copying source code. This leverages
                    Docker's layer caching effectively.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Non-Root User</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Always run containers as non-root users for security. Create a dedicated user for your application.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Health Checks</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Implement proper health checks to ensure your container orchestrator can monitor application health.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Environment Configuration</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Use environment variables for configuration and secrets management:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Docker Compose makes it easy to manage multi-container applications with proper networking.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Production Considerations</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In production, I've found that proper logging, monitoring, and resource limits are crucial. Container
                orchestration platforms like Kubernetes or Google Cloud Run handle scaling and reliability, but your
                application needs to be container-ready from the start.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
