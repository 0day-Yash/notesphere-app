import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { GithubIcon, BookOpenText, Share2, Lock, Unlock, FileText, Users, Sparkles, ShieldCheck, Globe, UserCheck } from "lucide-react"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpenText className="h-7 w-7 text-primary" />
            <span className="text-2xl font-extrabold tracking-tight text-primary">NoteSphere</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 md:flex">
              <Link href="#features" className="text-base font-semibold transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#about" className="text-base font-semibold transition-colors hover:text-primary">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 px-4">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-secondary/40 blur-2xl opacity-70" />
          <div className="max-w-2xl w-full bg-background/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-primary/10">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center text-primary mb-4 leading-tight">
              Organize. Collaborate. Inspire.
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-8">
              NoteSphere is your modern, cloud-based note-taking platform—built for seamless collaboration, privacy, and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/register">
                <Button size="lg" className="px-8 py-6 text-lg shadow-lg w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg w-full sm:w-auto">
                  <GithubIcon className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container py-20">
          <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">Why NoteSphere?</h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="bg-background/80 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-primary/10 hover:scale-105 transition-transform">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Beautiful Markdown Editor</h3>
              <p className="text-muted-foreground text-center">
                Write and format notes with a distraction-free, real-time markdown editor.
              </p>
            </div>
            <div className="bg-background/80 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-primary/10 hover:scale-105 transition-transform">
              <Share2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Effortless Sharing</h3>
              <p className="text-muted-foreground text-center">
                Share notes with a unique URL or collaborate in real time with others.
              </p>
            </div>
            <div className="bg-background/80 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-primary/10 hover:scale-105 transition-transform">
              <div className="flex gap-2 mb-4">
                <Lock className="h-10 w-10 text-primary" />
                <Unlock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Privacy Controls</h3>
              <p className="text-muted-foreground text-center">
                Toggle between public and private notes with a single click.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action + Side Cards */}
        <section className="container py-16 flex flex-col items-center">
          <div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            {/* Main CTA Card */}
            <div className="flex-1 max-w-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/20 rounded-2xl shadow-xl p-10 flex flex-col items-center border border-primary/10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 tracking-tight">
                Ready to elevate your note-taking?
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-6">
                Join a growing community of thinkers, creators, and collaborators. Your ideas deserve a beautiful home.
              </p>
              <Link href="/register">
                <Button size="lg" className="px-10 py-5 text-lg shadow-lg">
                  Start for Free
                </Button>
              </Link>
            </div>
            {/* Side Cards */}
            <div className="flex flex-col gap-6 w-full max-w-xs">
              {/* Sign In Card */}
              <div className="bg-background/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-primary/10">
                <h3 className="text-lg font-semibold mb-2 text-primary">Already have an account?</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">Sign in to access your notes.</p>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
              </div>
              {/* Meet the Dev Card */}
              <div className="bg-background/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-primary/10">
                <h3 className="text-lg font-semibold mb-2 text-primary">Meet the dev.<br />Yash Kulkarni</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Building secure, collaborative tools for the future.
                </p>
                <div className="flex gap-2 w-full">
                  <Link href="/about-me" className="w-1/2">
                    <Button variant="ghost" size="sm" className="w-full">About Me</Button>
                  </Link>
                  <Link href="https://yashk.app" target="_blank" rel="noopener" className="w-1/2">
                    <Button variant="outline" size="sm" className="w-full">Portfolio</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} NoteSphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
