import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight, Sparkles } from 'lucide-react'
import type { Metadata } from "next"
import ContactForm from "./contact-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact - Rajaul Uddin",
  description:
    "Get in touch with Rajaul Uddin for opportunities, collaborations, or project discussions.",
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "uddin.rajaul1@gmail.com",
      href: "mailto:uddin.rajaul1@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 982-321-1188",
      href: "tel:+9779823211188",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kathmandu, Nepal",
      href: null,
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Panel - Info */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-24">
          <div className="max-w-lg space-y-8 animate-fadeInUp">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new opportunities
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Let's work
                <br />
                <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  together.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4 pt-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="group">
                  {method.href ? (
                    <a 
                      href={method.href}
                      className="flex items-center gap-4 p-4 -mx-4 rounded-xl hover:bg-card/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{method.label}</p>
                        <p className="text-lg font-medium group-hover:text-primary transition-colors">{method.value}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 -mx-4">
                      <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{method.label}</p>
                        <p className="text-lg font-medium">{method.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              <Button asChild variant="outline" size="lg" className="rounded-full gap-2">
                <Link href="https://github.com/uddin-rajaul" target="_blank">
                  <Github className="w-5 h-5" />
                  GitHub
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full gap-2">
                <Link href="https://www.linkedin.com/in/rajaul-uddin/" target="_blank">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-1/2 flex items-center justify-center px-8 py-16 lg:px-16 xl:px-24 bg-card/30 border-t lg:border-t-0 lg:border-l border-border/50">
          <div className="w-full max-w-md animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Send a Message</span>
                </div>
                <h2 className="text-3xl font-bold">Drop me a line</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
