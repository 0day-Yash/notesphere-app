import { ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutMePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/about-bg.jpg')",
          opacity: 0.13,
          filter: "blur(1.5px)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-2xl w-full rounded-xl shadow-2xl bg-background/80 backdrop-blur-md p-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-tight leading-tight text-primary">Yash Kulkarni</span>
            <ShieldCheck className="text-primary h-6 w-6" aria-label="Verified" />
            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold ml-2">He/Him</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">#HIRING</span>
          <span className="text-base font-medium text-muted-foreground text-center">
            CEO @ PurpleRain TechSafe &bull; Co-Founder, CodeQuestt Hackathon &bull; Volunteer @ Trace Labs
          </span>
          <span className="text-sm text-muted-foreground">St. Mary's School, Udupi, Karnataka, India</span>
        </div>
        <div className="prose prose-neutral dark:prose-invert text-balance text-lg leading-relaxed mb-8 text-center">
          <p>
            Driven by a passion for cybersecurity, software development, and technological innovation, I’ve spent over five years at the intersection of tech leadership, ethical hacking, and digital problem-solving.
          </p>
          <p>
            As the Founder & CEO of <span className="font-semibold text-primary">PurpleRain TechSafe</span>, I lead a cybersecurity startup dedicated to safeguarding small businesses through cutting-edge, affordable security solutions. I am also the Co-Founder of <span className="font-semibold text-primary">CodeQuestt Hackathon</span>, where I design and execute large-scale hackathons to empower the next generation of tech innovators.
          </p>
          <p>
            My expertise spans ethical hacking, OSINT, Python, Linux, and web development. I’ve built advanced security tools, implemented microservices, and optimized UI/UX for digital efficiency and scale. As a volunteer with Trace Labs, I use OSINT to help find missing persons and compete in global CTFs.
          </p>
          <p>
            <span className="font-semibold text-primary">Cool fact:</span> I once solved a CTF challenge in under 7 minutes that stumped 50+ teams, and I love using chess strategies to approach cybersecurity problems!
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between mb-8">
          <div>
            <h3 className="font-semibold mb-2 text-primary text-lg">Achievements</h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Special invite to IIT Delhi’s Ethical Hacking seminar</li>
              <li>1st place at C.O.D.E Hack 2023</li>
              <li>4th place at ATL All-India Robotics Championship</li>
              <li>Multiple CTF and hackathon wins</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary text-lg">Skills</h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Ethical Hacking & OSINT</li>
              <li>Python, JavaScript, TypeScript</li>
              <li>Linux System Administration</li>
              <li>UI/UX & Web Development</li>
              <li>Microservices & Cloud</li>
              <li>Team Leadership & Mentoring</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex gap-3">
            <Link href="mailto:yash@example.com" target="_blank" rel="noopener">
              <Button variant="ghost" size="sm" className="font-semibold text-primary">Contact</Button>
            </Link>
            <Link href="https://portfolio.example.com" target="_blank" rel="noopener">
              <Button variant="ghost" size="sm" className="font-semibold text-primary flex items-center gap-1">
                Portfolio <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/yashkulkarni" target="_blank" rel="noopener">
              <Button variant="ghost" size="sm" className="font-semibold text-primary">LinkedIn</Button>
            </Link>
          </div>
          <span className="text-xs text-muted-foreground mt-2">Open to collaboration & new opportunities</span>
        </div>
        <Link href="/" className="mt-4">
          <Button variant="outline" size="sm">← Back to Home</Button>
        </Link>
      </div>
      {/* Subtle animated sparkle */}
      <Sparkles className="absolute bottom-8 right-8 text-primary/30 animate-pulse z-0" size={40} />
    </div>
  )
}