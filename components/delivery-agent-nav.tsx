"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Store,
  MapPinned,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function DeliveryAgentNav() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  const navItems = [
    {
      href: "/delivery-agent/dashboard",
      label: "nav.dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/delivery-agent/orders",
      label: "dashboard.view_all_orders",
      icon: ShoppingCart,
    },
    {
      href: "/delivery-agent/available-orders",
      label: "dashboard.available-orders",
      icon: MapPinned,
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-semibold text-foreground block">
              AgroConnect
            </span>
            <span className="text-xs text-muted-foreground">
              {t("landing.buyer_portal")}
            </span>
          </div>
        </Link>
      </div>

      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("dashboard.welcome")}
        </p>
      </div>

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
            >
              <Icon className="h-5 w-5" />
              {t(item.label)}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {t("nav.logout")}
        </Button>
      </div>
    </div>
  )
}
