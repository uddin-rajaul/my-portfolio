import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Calendar } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Rajaul Uddin",
  description:
    "Explore Rajaul Uddin's portfolio of software development projects including AI-powered applications, e-commerce APIs, and machine learning solutions.",
}

export default function ProjectsPage() {
  const projects = [
    {
      title: "YapBoard – AI-Powered Whiteboard",
      description:
        "An innovative whiteboard application with AI-powered features including real-time background removal using U²-Net architecture. Built with modern backend technologies for scalability and performance.",
      longDescription: [
        "Integrated U²-Net for real-time background removal",
        "Used PostgreSQL + SQLAlchemy for database management",
        "Implemented JWT authentication and API routes",
        "Built with FastAPI for scalability",
        "Used Git for version control and collaborative development",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "AI/ML", "U²-Net"],
      github: "https://github.com/knockboard/yapboard",
      demo: "#",
      period: "September 2024 - December 2024",
      status: "Completed",
    },
    {
      title: "E-Commerce API using Django Rest Framework",
      description:
        "A comprehensive e-commerce backend API supporting product management, image uploads, and categorization with clean, modular architecture.",
      longDescription: [
        "Developed an E-commerce API that supports retrieving products, querying products, uploading product images, and categorizing products",
        "Wrote modular, testable Python code following OOP and clean code principles",
        "Implemented RESTful API design patterns",
        "Used Git for version control",
      ],
      tech: ["Python", "Django", "Django REST Framework", "OOP"],
      github: "https://github.com/uddin-rajaul/e-com",
      period: "March 2024 - April 2024",
      status: "Completed",
    },
    {
      title: "Diabetes Prediction - Django and ML",
      description:
        "A machine learning-powered web application that predicts diabetic conditions using SVM algorithm with a user-friendly Django interface.",
      longDescription: [
        "Implemented a Machine Learning-based project using Python and Django",
        "Trained a model using an SVM algorithm to predict diabetic conditions based on input data",
        "Created a web interface for easy interaction with the ML model",
        "Used Git for version control",
      ],
      tech: ["Python", "Django", "Machine Learning", "SVM", "Scikit-learn"],
      github: "https://github.com/uddin-rajaul/Diabetes-prediction",
      period: "April 2024 - May 2024",
      status: "Completed",
    },
    {
      title: "Oracle Database Management",
      description:
        "Comprehensive database management project focusing on real-world SQL operations and database design using Oracle's enterprise features.",
      longDescription: [
        "Practiced real-world SQL operations using Oracle's HR Schema and custom tablespaces",
        "Performed data retrieval using SELECT, WHERE, ORDER BY, and single-row functions",
        "Joined multiple tables and implemented subqueries and set operators",
        "Designed and managed custom schemas using DDL, DCL, and DML statements",
      ],
      tech: ["Oracle Database", "SQL", "PL/SQL", "Database Design"],
      github: "#",
      period: "February 2025 - June 2025",
      status: "In Progress",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 py-12 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            My <span className="text-purple-600 dark:text-purple-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
            A showcase of my development work and technical expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-gray-900 dark:text-white text-xl transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant={project.status === "Completed" ? "default" : "secondary"}
                    className={
                      project.status === "Completed"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>{project.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed transition-colors">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-gray-900 dark:text-white font-semibold mb-2 transition-colors">Key Features:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1 transition-colors">
                    {project.longDescription.map((feature, featureIndex) => (
                      <li key={featureIndex}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    <a href={project.github} className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 bg-transparent transition-colors"
                    >
                      <a href={project.demo} className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
