"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sprout,
  ShoppingBag,
  TrendingUp,
  Shield,
  MapPin,
  Clock,
  Store,
  Package,
  Users,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const DEMO_MARKETPLACE_ITEMS = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 45,
    rating: 4.8,
    reviews: 156,
    image: "/fresh-red-tomatoes.jpg",
    farmer: "Abdul Karim",
  },
  {
    id: 2,
    name: "Green Cucumbers",
    price: 35,
    rating: 4.6,
    reviews: 89,
    image: "/fresh-green-cucumbers.jpg",
    farmer: "Rahim Mia",
  },
  {
    id: 3,
    name: "Red Onions",
    price: 40,
    rating: 4.9,
    reviews: 201,
    image: "/red-onions.jpg",
    farmer: "Fatema Begum",
  },
  {
    id: 4,
    name: "Fresh Carrots",
    price: 50,
    rating: 4.7,
    reviews: 134,
    image: "/fresh-orange-carrots.jpg",
    farmer: "Abdul Karim",
  },
]

export function LandingClient() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("agroconnect_cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("agroconnect_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: any) => {
    const existingItem = cart.find((i) => i.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      )
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ])
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((i) => i.id !== id))
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <>
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("landing.hero_title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              {t("landing.hero_subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated ? (
                <>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/login?role=farmer">
                      <Sprout className="mr-2 h-5 w-5" />
                      {t("landing.farmer_portal")}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                    asChild
                  >
                    <Link href="/login?role=buyer">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      {t("landing.buyer_portal")}
                    </Link>
                  </Button>
                </>
              ) : null}
            </div>

            {!isAuthenticated && (
              <p className="mt-4 text-sm text-muted-foreground">
                {t("landing.try_demo")}
              </p>
            )}
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-12 md:mt-16 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/bangladeshi-farmers-harvesting-fresh-vegetables-in.jpg"
              alt="Farmers harvesting fresh produce"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Marketplace Summary Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("landing.explore_title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("landing.explore_subtitle")}
            </p>
          </div>

          {/* Marketplace Items Grid */}
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  150+
                </h3>
                <p className="text-muted-foreground">{t("landing.products")}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">50+</h3>
                <p className="text-muted-foreground">{t("landing.farmers")}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  24/7
                </h3>
                <p className="text-muted-foreground">
                  {t("landing.open_market")}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {DEMO_MARKETPLACE_ITEMS.map((item) => (
              <Card
                key={item.id}
                className="border-border overflow-hidden hover:shadow-lg transition-shadow pt-0"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.farmer}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      ৳{item.price}/kg
                    </span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-primary"
                        >
                          ⭐ {item.rating}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground">
                            {t("reviews.title")}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("reviews.excellent")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t("reviews.highly_recommend")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t("reviews.great_quality")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t("reviews.very_satisfied")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total {item.reviews} reviews
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/marketplace">
                <Store className="mr-2 h-5 w-5" />
                {t("landing.visit_marketplace")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("landing.why_choose")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("landing.why_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("landing.fair_prices")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("landing.fair_prices_desc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("landing.verified_quality")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("landing.verified_quality_desc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("landing.local_sourcing")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("landing.local_sourcing_desc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("landing.realtime_updates")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("landing.realtime_updates_desc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("landing.fresh_produce")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("landing.fresh_produce_desc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("landing.easy_ordering")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("landing.easy_ordering_desc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("landing.how_works")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                {t("landing.for_farmers")}
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                      {step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t(`landing.step${step}_title`)}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`landing.step${step}_desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                {t("landing.for_buyers")}
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex gap-4">
                    <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                      {step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t(`landing.buyer_step${step}_title`)}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`landing.buyer_step${step}_desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Hidden when logged in */}
      {!isAuthenticated && (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {t("landing.ready_join")}
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 leading-relaxed">
              {t("landing.ready_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/login">{t("landing.try_demo_btn")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/login">{t("landing.get_started")}</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">AgroConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AgroConnect. {t("landing.footer_desc")}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
