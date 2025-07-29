import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, ExternalLink } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Rajaul Uddin",
  description:
    "Learn more about Rajaul Uddin's background, experience, education, and technical skills in software engineering and backend development.",
}

export default function AboutPage() {
  const skills = {
    Programming: ["Python (OOP, scripting)", "SQL", "C"],
    Frameworks: ["Django", "FastAPI"],
    Databases: ["PostgreSQL", "Oracle", "MongoDB"],
    "Dev Tools": ["Git", "Docker", "VSCode"],
    Cloud: ["GCP", "AWS", "VPC", "Terraform", "CI/CD", "GitHub Actions"],
    Concepts: ["Object-Oriented Programming", "RESTful APIs", "Software Development Lifecycle"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 py-12 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            About <span className="text-purple-600 dark:text-purple-400">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
            Software Engineer & Backend Developer
          </p>
        </div>

        {/* Summary */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-8 transition-colors">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white transition-colors">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
              Software engineer with a passion for backend development and building scalable applications. Experienced
              in Python, SQL, and modern web technologies. Always eager to learn new technologies and solve challenging
              problems.
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-8 transition-colors">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white transition-colors">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-l-2 border-purple-400 dark:border-purple-500 pl-6">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">Intern</h3>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 transition-colors"
                  >
                    Current
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-3 text-gray-500 dark:text-gray-400 transition-colors">
                  <span className="font-medium">Gorkhali Agents</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>April 2025 - Present</span>
                  </div>
                  <a
                    href="https://gorkhaliagents.ai/"
                    className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 transition-colors">
                  <li>
                    • Designed and deployed containerized applications using Docker and Cloud Run on Google Cloud
                    Platform
                  </li>
                  <li>• Configured IAM roles, VPC networks, and managed permissions for secure access</li>
                  <li>
                    • Utilized Google Cloud Storage (GCS) and Artifact Registry for storing models and deployment
                    artifacts
                  </li>
                  <li>
                    • Automated infrastructure provisioning using Terraform and deployment pipelines using GitHub
                    Actions
                  </li>
                  <li>
                    • Gained practical experience in CI/CD, infrastructure as code (IaC), and cloud-native development
                  </li>
                  <li>• Followed GCP best practices for scalability, cost control, and security hardening</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-8 transition-colors">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white transition-colors">Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-l-2 border-purple-400 dark:border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">BSc. CSIT</h3>
              <div className="flex items-center gap-4 mb-3 text-gray-500 dark:text-gray-400 transition-colors">
                <span className="font-medium">Trinity Int'l College, Tribhuwan University</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>2021 - 2025</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3 transition-colors">
                Coursework: Object Oriented Programming, Operating System, Calculus, Web Development, Advance Database,
                Software Engineering, DSA, AI, Data Handling, Database Design
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-8 transition-colors">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white transition-colors">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3 transition-colors">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Volunteering */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white transition-colors">Volunteering</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-l-2 border-purple-400 dark:border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Volunteer</h3>
              <div className="flex items-center gap-4 mb-3 text-gray-500 dark:text-gray-400 transition-colors">
                <span className="font-medium">Trinity International College</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Dillibazar, Kathmandu</span>
                </div>
              </div>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 transition-colors">
                <li>• Volunteered at a Cyber Security Workshop for BSc CSIT, BCA, BBM, and BBS students</li>
                <li>• Assisted with event setup, coordination, and participant support</li>
                <li>• Helped students understand basic cybersecurity concepts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
