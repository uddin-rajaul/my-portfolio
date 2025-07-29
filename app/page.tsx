import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Phone, ArrowRight, Code, Database, Cloud, Zap, Users } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"

export default function HomePage() {
  const featuredProjects = [
    {
      title: "YapBoard – AI-Powered Whiteboard",
      description:
        "Real-time background removal using U²-Net, PostgreSQL + SQLAlchemy, JWT authentication, built with FastAPI",
      tech: ["Python", "FastAPI", "PostgreSQL", "AI/ML"],
      github: "https://github.com/knockboard/yapboard",
      period: "Sep 2024 - Dec 2024",
      status: "Featured",
    },
    {
      title: "E-Commerce API",
      description: "Django Rest Framework API supporting product management, image uploads, and categorization",
      tech: ["Django", "Python", "REST API"],
      github: "https://github.com/uddin-rajaul/e-com",
      period: "Mar 2024 - Apr 2024",
      status: "Production",
    },
    {
      title: "Diabetes Prediction ML",
      description: "Machine Learning project using SVM algorithm to predict diabetic conditions",
      tech: ["Python", "Django", "Machine Learning"],
      github: "https://github.com/uddin-rajaul/Diabetes-prediction",
      period: "Apr 2024 - May 2024",
      status: "Completed",
    },
  ]

  const services = [
    {
      title: "Backend Development",
      description: "Building scalable APIs and server-side applications using Python, Django, and FastAPI",
      icon: Code,
    },
    {
      title: "Database Design",
      description: "Designing efficient database schemas with PostgreSQL, Oracle, and MongoDB",
      icon: Database,
    },
    {
      title: "Cloud Solutions",
      description: "Deploying applications on GCP and AWS with Docker, Terraform, and CI/CD pipelines",
      icon: Cloud,
    },
    {
      title: "API Integration",
      description: "Creating and integrating RESTful APIs with proper authentication and documentation",
      icon: Zap,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden bg-white dark:bg-gray-900 transition-colors">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl transition-colors"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl transition-colors"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-4 py-2 mb-6 transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-400 text-sm font-medium">
                    Available for opportunities
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight transition-colors">
                  Hi, I'm <span className="text-purple-600 dark:text-purple-400">Rajaul</span>
                  <br />
                  <span className="text-3xl lg:text-5xl text-gray-700 dark:text-gray-300">Software Engineer</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl transition-colors">
                  I build scalable backend applications and APIs using modern technologies. Passionate about clean code,
                  efficient databases, and cloud solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white shadow-lg"
                >
                  <Link href="/projects" className="flex items-center gap-2">
                    View My Work
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 bg-transparent transition-colors"
                >
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>

              {/* Contact Links */}
              <div className="flex justify-center lg:justify-start gap-6">
                <a
                  href="mailto:uddin.rajaul1@gmail.com"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="tel:+9779823211188"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/uddin-rajaul" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rajaul-uddin/" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Cat Programmer Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-purple-300/50 dark:from-purple-600/20 dark:to-purple-700/20 rounded-3xl blur-2xl transform rotate-6 transition-colors"></div>
                <img
                  src="/images/cat-programmer-clean.png"
                  alt="Cat programmer working at desk"
                  className="relative w-full max-w-lg h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              What I Do
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
              Specialized in backend development, database design, and cloud solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                    <service.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">Some of my recent work</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 hidden sm:flex bg-transparent transition-colors"
            >
              <Link href="/projects" className="flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge
                      variant="secondary"
                      className={`${
                        project.status === "Featured"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : project.status === "Production"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      } transition-colors`}
                    >
                      {project.status}
                    </Badge>
                    <a
                      href={project.github}
                      className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed transition-colors">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-xs transition-colors">{project.period}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button
              asChild
              variant="outline"
              className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 bg-transparent transition-colors"
            >
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">Technologies I work with</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {[
              { name: "Python", logo: "/python.svg?height=40&width=40" },
              { name: "SQL", logo: "/sql-database-generic-svgrepo-com.svg?height=40&width=40" },
              { name: "Django", logo: "/django-icon-svgrepo-com.svg?height=40&width=40" },
              { name: "FastAPI", logo: "/fastapi-svgrepo-com.svg?height=40&width=40" },
              { name: "PostgreSQL", logo: "/pgsql-svgrepo-com.svg?height=40&width=40" },
              { name: "Docker", logo: "/docker-svgrepo-com.svg?height=40&width=40" },
              { name: "GCP", logo: "/gcp.svg?height=40&width=40" },
              { name: "Git", logo: "/git.svg?height=40&width=40" },
              { name: "AWS", logo: "/aws.svg?height=40&width=40" },
              { name: "Terraform", logo: "/terraform.svg?height=40&width=40" },
              { name: "CI/CD", logo: "/cicd.svg?height=40&width=40" },
                          
            ].map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center hover:scale-110 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-3 group-hover:drop-shadow-lg transition-all duration-300">
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={`${skill.name} logo`}
                    className="w-10 h-10 group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 transition-colors">
            <CardContent className="text-center py-12 px-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                Let's Build Something Amazing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg transition-colors">
                I'm always interested in discussing new opportunities, whether it's a full-time position, freelance
                project, or collaboration. Let's connect and create something great together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 shadow-lg"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Let's Talk
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 bg-transparent transition-colors"
                >
                  <Link href="/about">Learn More About Me</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
