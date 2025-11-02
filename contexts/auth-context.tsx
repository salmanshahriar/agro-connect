"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

type UserRole = "farmer" | "buyer" | "admin" | "delivery-agent" | null

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

const DEMO_ACCOUNTS: Record<string, User> = {
  farmer: {
    id: "farmer_1",
    name: "Abdul Karim",
    role: "farmer",
    phone: "+880 1712-345678",
    location: "Gazipur, Dhaka",
    verified: true,
    avatar: "/avatars/farmer.jpg",
    farmPhoto: "/farms/karim-farm.jpg",
  },
  buyer: {
    id: "buyer_1",
    name: "Shahed Alam",
    role: "buyer",
    phone: "+880 1812-345678",
    location: "Dhanmondi, Dhaka",
    businessName: "Shahed's Cafe",
    avatar: "/avatars/buyer.jpg",
  },
  admin: {
    id: "admin_1",
    name: "Admin User",
    role: "admin",
    phone: "+880 1912-345678",
    location: "Dhaka",
    avatar: "/avatars/admin.jpg",
  },
  "delivery-agent": {
    id: "delivery_1",
    name: "Rashid Ahmed",
    role: "delivery-agent",
    phone: "+880 1612-345678",
    location: "Mirpur, Dhaka",
    verified: true,
    avatar: "/avatars/delivery.jpg",
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("agroconnect_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("agroconnect_user")
      }
    }
    setIsLoaded(true)
  }, [])

  const login = (role: UserRole) => {
    if (!role) return

    const demoUser = DEMO_ACCOUNTS[role]
    if (demoUser) {
      setUser(demoUser)
      localStorage.setItem("agroconnect_user", JSON.stringify(demoUser))
    }
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