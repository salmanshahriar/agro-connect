"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sprout,
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  LogOut,
  Store,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export function FarmerNav() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      href: "/farmer/dashboard",
      label: "nav.dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/farmer/produce",
      label: "dashboard.manage_produce",
      icon: Package,
    },
    {
      href: "/farmer/orders",
      label: "dashboard.view_all_orders",
      icon: ShoppingCart,
    },
    {
      href: "/farmer/earnings",
      label: "dashboard.total_earnings",
      icon: DollarSign,
    },
    { href: "/farmer/settings", label: "settings.title", icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const closeMobileMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Side Navigation */}
      <div
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "flex flex-col h-full bg-card border-r border-border"
        )}
      >
        <div className="p-6 border-b border-border">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <div className="bg-primary rounded-lg p-2">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-semibold text-foreground block">
                AgroConnect
              </span>
              <span className="text-xs text-muted-foreground">
                {t("landing.farmer_portal")}
              </span>
            </div>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <Link
            href="/marketplace"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={closeMobileMenu}
          >
            <Store className="h-5 w-5" />
            {t("nav.marketplace")}
          </Link>
        </div>

        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("dashboard.welcome")}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={closeMobileMenu}
              >
                <Icon className="h-5 w-5" />
                {t(item.label)}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => {
              handleLogout()
              closeMobileMenu()
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            {t("nav.logout")}
          </Button>
        </div>
      </div>
    </>
  )
}
