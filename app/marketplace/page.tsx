"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import {
  Search,
  MapPin,
  ShoppingCart,
  Filter,
  MessageCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      farmer: "Rahman Farm",
      farmerVerified: true,
      category: "Vegetables",
      price: 50,
      unit: "kg",
      available: "50 kg",
      location: "Jessore",
      image: "/fresh-red-tomatoes.jpg",
      rating: 4.8,
      farmerPhone: "1XXXXXXXXX1",
    },
    {
      id: 2,
      name: "Organic Potatoes",
      farmer: "Green Valley",
      farmerVerified: true,
      category: "Vegetables",
      price: 30,
      unit: "kg",
      available: "100 kg",
      location: "Bogra",
      image: "/organic-potatoes.jpg",
      rating: 4.9,
      farmerPhone: "1XXXXXXXXX2",
    },
    {
      id: 3,
      name: "Fresh Carrots",
      farmer: "Organic Farms",
      farmerVerified: true,
      category: "Vegetables",
      price: 60,
      unit: "kg",
      available: "30 kg",
      location: "Jessore",
      image: "/fresh-orange-carrots.jpg",
      rating: 4.7,
      farmerPhone: "1XXXXXXXXX3",
    },
    {
      id: 4,
      name: "Green Cabbage",
      farmer: "Fresh Fields",
      farmerVerified: true,
      category: "Vegetables",
      price: 40,
      unit: "kg",
      available: "40 kg",
      location: "Sylhet",
      image: "/green-cabbage.jpg",
      rating: 4.6,
      farmerPhone: "1XXXXXXXXX4",
    },
    {
      id: 5,
      name: "Red Onions",
      farmer: "Valley Farms",
      farmerVerified: true,
      category: "Vegetables",
      price: 45,
      unit: "kg",
      available: "80 kg",
      location: "Dhaka",
      image: "/red-onions.jpg",
      rating: 4.8,
      farmerPhone: "1XXXXXXXXX5",
    },
    {
      id: 6,
      name: "Fresh Spinach",
      farmer: "Green Harvest",
      farmerVerified: true,
      category: "Leafy Greens",
      price: 35,
      unit: "kg",
      available: "25 kg",
      location: "Chittagong",
      image: "/fresh-spinach.jpg",
      rating: 4.9,
      farmerPhone: "1XXXXXXXXX6",
    },
    {
      id: 7,
      name: "Ripe Mangoes",
      farmer: "Fruit Paradise",
      farmerVerified: true,
      category: "Fruits",
      price: 120,
      unit: "kg",
      available: "60 kg",
      location: "Rajshahi",
      image: "/ripe-mangoes.jpg",
      rating: 4.9,
      farmerPhone: "1XXXXXXXXX7",
    },
    {
      id: 8,
      name: "Fresh Cucumbers",
      farmer: "Green Valley",
      farmerVerified: true,
      category: "Vegetables",
      price: 35,
      unit: "kg",
      available: "45 kg",
      location: "Bogra",
      image: "/fresh-cucumbers.jpg",
      rating: 4.7,
      farmerPhone: "1XXXXXXXXX8",
    },
  ]

  const categories = ["all", "Vegetables", "Fruits", "Leafy Greens", "Grains"]
  const locations = [
    "all",
    "Jessore",
    "Bogra",
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory
    const matchesLocation =
      selectedLocation === "all" || product.location === selectedLocation
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("marketplace.title")}
            </h1>
            <p className="text-muted-foreground">
              Browse fresh produce from verified farmers across Bangladesh
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  t("marketplace.search_placeholder") ||
                  "Search for produce or farmers..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : ""
                      }
                    >
                      {category === "all"
                        ? t("marketplace.all_products") || "All"
                        : category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Location
                </label>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Button
                      key={location}
                      variant={
                        selectedLocation === location ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedLocation(location)}
                      className={
                        selectedLocation === location
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : ""
                      }
                    >
                      {location === "all" ? "All Locations" : location}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
              >
                <div className="aspect-video bg-muted relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.farmerVerified && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      Verified
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{product.farmer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {product.location}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Available:
                      </span>
                      <span className="font-medium text-foreground">
                        {product.available}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Price:
                      </span>
                      <span className="text-xl font-bold text-foreground">
                        ৳{product.price}/{product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Rating:
                      </span>
                      <span className="font-medium text-foreground">
                        {product.rating} ⭐
                      </span>
                    </div>
                    {isAuthenticated ? (
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(
                              `https://wa.me/88${product.farmerPhone}?text=Hi, I'm interested in ${product.name} from AgroConnect`,
                              "_blank"
                            )
                          }
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        asChild
                      >
                        <Link href="/login?role=buyer">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Login to Order
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}

          {/* Login CTA for non-authenticated users */}
          {!isAuthenticated && filteredProducts.length > 0 && (
            <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready to place an order?
              </h3>
              <p className="text-muted-foreground mb-6">
                Login to start ordering fresh produce from local farmers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/login?role=buyer">Login as Buyer</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login?role=farmer">Login as Farmer</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
