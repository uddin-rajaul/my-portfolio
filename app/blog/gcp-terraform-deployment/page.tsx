import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cloud Deployment with GCP and Terraform - Rajaul Uddin",
  description: "Learn how to deploy applications to Google Cloud Platform using Terraform for infrastructure as code.",
}

export default function GCPTerraformDeployment() {
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
          <div className="w-full h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Cloud Deployment with GCP and Terraform</h1>
              <p className="text-indigo-100">Infrastructure as Code for scalable deployments</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>September 12, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>9 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                During my internship at Gorkhali Agents, I've gained hands-on experience with GCP and Terraform.
                Infrastructure as Code (IaC) has transformed how we deploy and manage cloud resources. Here's what I've
                learned about this powerful combination.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Why Terraform + GCP?</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Reproducible Infrastructure
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Terraform configurations ensure your infrastructure is consistent across development, staging, and
                    production environments.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Version Control</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Infrastructure changes are tracked in Git, providing audit trails and rollback capabilities.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cost Management</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Terraform helps optimize costs by managing resource lifecycles and preventing resource sprawl.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Basic Terraform Setup</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Here's a typical Terraform configuration for a GCP project:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`# main.tf
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_service" "app" {
  name     = "my-app"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/\${var.project_id}/my-app:latest"
        
        env {
          name  = "DATABASE_URL"
          value = google_sql_database_instance.main.connection_name
        }
      }
    }
  }
}`}
              </pre>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Cloud Run Deployment</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Cloud Run is perfect for containerized applications. Here's how I configure it:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`resource "google_cloud_run_service" "api" {
  name     = "api-service"
  location = var.region

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "10"
        "run.googleapis.com/cpu-throttling" = "false"
      }
    }
    
    spec {
      container_concurrency = 80
      containers {
        image = var.image_url
        
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }
        
        ports {
          container_port = 8080
        }
      }
    }
  }
  
  traffic {
    percent         = 100
    latest_revision = true
  }
}`}
              </pre>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">IAM and Security</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Proper IAM configuration is crucial for security:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`# Service account for Cloud Run
resource "google_service_account" "cloud_run_sa" {
  account_id   = "cloud-run-service"
  display_name = "Cloud Run Service Account"
}

# Grant minimal required permissions
resource "google_project_iam_member" "cloud_run_sql" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:\${google_service_account.cloud_run_sa.email}"
}

resource "google_project_iam_member" "cloud_run_storage" {
  project = var.project_id
  role    = "roles/storage.objectViewer"
  member  = "serviceAccount:\${google_service_account.cloud_run_sa.email}"
}`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Following the principle of least privilege ensures better security posture.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Lessons Learned</h2>

              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                <li>Always use remote state storage (GCS bucket) for team collaboration</li>
                <li>Implement proper state locking to prevent concurrent modifications</li>
                <li>Use modules to organize and reuse Terraform configurations</li>
                <li>Plan before apply - always review changes in staging first</li>
                <li>Monitor costs regularly - cloud resources can add up quickly</li>
              </ul>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This combination has made our deployment process more reliable and scalable. The learning curve is worth
                it for the long-term benefits of infrastructure as code.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
