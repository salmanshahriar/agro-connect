"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { User, Store, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleLogin = (role: "farmer" | "buyer" | "admin") => {
    login(role)

    if (role === "farmer") {
      router.push("/farmer/dashboard")
    } else if (role === "buyer") {
      router.push("/buyer/marketplace")
    } else if (role === "admin") {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to AgroConnect
          </h1>
          <p className="text-muted-foreground">
            Choose a demo account to explore the platform
          </p>
        </div>

        <div className="space-y-4">
          <Card
            className="border-2 hover:border-primary transition-colors cursor-pointer"
            onClick={() => handleLogin("farmer")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Farmer Portal</CardTitle>
                  <CardDescription>Abdul Karim</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your produce, accept orders, and track earnings
              </p>
              <Button className="w-full" size="lg">
                Login as Farmer
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-2 hover:border-primary transition-colors cursor-pointer"
            onClick={() => handleLogin("buyer")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Buyer Portal</CardTitle>
                  <CardDescription>Shahed Alam - Cafe Owner</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Browse fresh produce, place orders, and track deliveries
              </p>
              <Button
                className="w-full bg-transparent"
                size="lg"
                variant="outline"
              >
                Login as Buyer
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-2 hover:border-primary transition-colors cursor-pointer"
            onClick={() => handleLogin("admin")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Admin Portal</CardTitle>
                  <CardDescription>Control Tower</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Verify farmers, monitor orders, and manage the platform
              </p>
              <Button className="w-full" size="lg" variant="secondary">
                Login as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Demo accounts are pre-configured with sample data for testing
        </p>
      </div>
    </div>
  )
}
