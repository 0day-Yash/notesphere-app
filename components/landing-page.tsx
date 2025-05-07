import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { GithubIcon, BookOpenText, Share2, Lock, Unlock, FileText } from "lucide-react"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpenText className="h-6 w-6" />
            <span className="text-xl font-bold">NoteSphere</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 md:flex">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
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
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              Your thoughts, organized and accessible from anywhere.
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              NoteSphere is a modern note-taking application inspired by Obsidian, reimagined for seamless online
              collaboration and intuitive UI/UX.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </section>
        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="mt-4 text-muted-foreground">
                NoteSphere empowers you with a sleek, user-friendly interface to create, organize, and manage notes
                effortlessly.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <FileText className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Markdown Editor</h3>
                  <p className="text-muted-foreground">
                    A clean, distraction-free markdown editor with support for rich text formatting.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Share2 className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Sharing</h3>
                  <p className="text-muted-foreground">Share your notes with others via a unique URL.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" />
                  <Unlock className="h-5 w-5 text-primary -ml-2" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Public/Private Mode</h3>
                  <p className="text-muted-foreground">
                    Control who can view and edit your notes with a simple toggle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
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
