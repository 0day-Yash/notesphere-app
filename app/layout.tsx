import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { NotesProvider } from "@/context/notes-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NoteSphere",
  description: "A modern web-based note-taking application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NotesProvider>{children}</NotesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
