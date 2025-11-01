"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { DEMO_ACCOUNTS } from "@/lib/demo-data"

type UserRole = "farmer" | "buyer" | "admin" | null

interface User {
  id: string
  name: string
  role: UserRole
  phone: string
  location: string
  verified?: boolean
  avatar?: string
  businessName?: string
  farmPhoto?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("agroconnect_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (role: UserRole) => {
    if (!role) return

    const demoUser = DEMO_ACCOUNTS[role]
    setUser(demoUser as User)
    localStorage.setItem("agroconnect_user", JSON.stringify(demoUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("agroconnect_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
