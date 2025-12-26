import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-8 animate-fadeInUp">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
          Available for hire
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
          Software Engineer & <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Backend Specialist
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Hi, I'm Rajaul. I craft robust APIs, optimize databases, and deploy scalable cloud solutions.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
          <Link href="/projects">
            View Projects
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="rounded-full px-8 h-12 text-base hover:bg-primary/5">
          <Link href="/about" className="group">
            More About Me <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

