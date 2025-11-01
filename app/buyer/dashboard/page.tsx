"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const ApexChart = dynamic(() => import("@/components/apex-chart"), {
  ssr: false,
})

export default function BuyerDashboard() {
  const spendingData = [
    { month: "January", earnings: 2800 },
    { month: "February", earnings: 3200 },
    { month: "March", earnings: 3600 },
    { month: "April", earnings: 3400 },
    { month: "May", earnings: 3900 },
    { month: "June", earnings: 4200 },
    { month: "July", earnings: 4500 },
  ]

  const stats = {
    activeOrders: 3,
    completedOrders: 24,
    totalSpent: 38500,
    savedAmount: 5200,
  }

  const recentOrders = [
    {
      id: "ORD-101",
      farmer: "Rahman Farm",
      item: "Tomatoes",
      quantity: "50 kg",
      amount: 2500,
      status: "in_transit",
      date: "2025-01-15",
    },
    {
      id: "ORD-102",
      farmer: "Green Valley",
      item: "Potatoes",
      quantity: "100 kg",
      amount: 3000,
      status: "confirmed",
      date: "2025-01-14",
    },
    {
      id: "ORD-103",
      farmer: "Organic Farms",
      item: "Carrots",
      quantity: "30 kg",
      amount: 1800,
      status: "delivered",
      date: "2025-01-12",
    },
  ]

  const recommendedProducts = [
    {
      name: "Fresh Tomatoes",
      farmer: "Rahman Farm",
      price: 50,
      unit: "kg",
      location: "Jessore",
      image: "/placeholder.svg?key=2hy99",
    },
    {
      name: "Organic Potatoes",
      farmer: "Green Valley",
      price: 30,
      unit: "kg",
      location: "Bogra",
      image: "/placeholder.svg?key=45zjn",
    },
    {
      name: "Fresh Carrots",
      farmer: "Organic Farms",
      price: 60,
      unit: "kg",
      location: "Jessore",
      image: "/placeholder.svg?key=ft51w",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, City Fresh Market
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.activeOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Orders
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.completedOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{stats.totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Amount Saved
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{stats.savedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-primary mt-1">vs market prices</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <ApexChart
          data={spendingData}
          title="Monthly Spending"
          color="#d97706"
          currency="৳"
          lastMonthLabel="Last month"
          height={250}
          showAverage={true}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{order.id}</p>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "in_transit"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {order.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.farmer}
                    </p>
                    <p className="text-sm text-foreground">
                      {order.item} - {order.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ৳{order.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              asChild
            >
              <Link href="/buyer/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.farmer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ৳{product.price}/{product.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              asChild
            >
              <Link href="/buyer/marketplace">Browse More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
