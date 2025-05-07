"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock API call
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be an API call to validate credentials
      if (email && password) {
        const newUser = {
          id: "user-1",
          name: email.split("@")[0],
          email,
        }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        return
      }
      throw new Error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    // Mock API call
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be an API call to create a new user
      const newUser = {
        id: "user-" + Date.now(),
        name,
        email,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
