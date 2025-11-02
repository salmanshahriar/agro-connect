"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sprout, Menu, X, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("agroconnect_cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const getDashboardLink = () => {
    if (!user) return "/"
    if (user.role === "farmer") return "/farmer/dashboard"
    if (user.role === "buyer") return "/buyer/dashboard"
    if (user.role === "admin") return "/admin/dashboard"
    if (user.role === "delivery-agent") return "/delivery-agent/dashboard"
    return "/"
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              AgroConnect
            </span>
          </Link>

          {/* Desktop Navigation - Centered Links */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/marketplace"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.marketplace")}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("nav.dashboard")}
                </Link>
              </>
            ) : null}
          </div>

          {/* Desktop Right Side Items */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {language === "bn" ? "বাংলা" : "EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("bn")}>
                  বাংলা
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Icon - Show for buyers and non-logged-in users */}
            {(!isAuthenticated || user?.role === "buyer") && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">{t("cart.title")}</h4>
                    {cart.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        {t("cart.empty")}
                      </p>
                    ) : (
                      <>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center text-sm pb-2 border-b"
                            >
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-muted-foreground">
                                  {item.quantity}x ৳{item.price}
                                </p>
                              </div>
                              <p className="font-semibold">
                                ৳{item.quantity * item.price}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2">
                          <p className="font-semibold">
                            {t("cart.total")}: ৳
                            {cart.reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )}
                          </p>
                        </div>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          size="sm"
                        >
                          {t("cart.checkout")}
                        </Button>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.avatar || "/placeholder.svg"}
                        alt={user?.name}
                      />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()}>{t("nav.dashboard")}</Link>
                  </DropdownMenuItem>
                  {user?.role === "farmer" && (
                    <DropdownMenuItem asChild>
                      <Link href="/farmer/settings">{t("settings.title")}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login?role=farmer">{t("nav.farmer_login")}</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/login?role=buyer">{t("nav.buyer_login")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/marketplace"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("nav.marketplace")}
              </Link>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLanguage("bn")}
                  className={
                    language === "bn"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  বাংলা
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLanguage("en")}
                  className={
                    language === "en"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  EN
                </Button>
              </div>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 pb-2 border-b border-border">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.avatar || "/placeholder.svg"}
                        alt={user?.name}
                      />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={getDashboardLink()}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("nav.dashboard")}
                  </Link>
                  {user?.role === "farmer" && (
                    <Link
                      href="/farmer/settings"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Settings
                    </Link>
                  )}
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login?role=farmer">
                      {t("nav.farmer_login")}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link href="/login?role=buyer">{t("nav.buyer_login")}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
