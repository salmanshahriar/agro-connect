"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Package,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  Navigation,
  Phone,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

const ApexChart = dynamic(() => import("@/components/apex-chart"), {
  ssr: false,
})

export default function DeliveryDashboard() {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const { t } = useLanguage()
  const { user } = useAuth()

  const earningsData = [
    { month: "January", earnings: 3200 },
    { month: "February", earnings: 3450 },
    { month: "March", earnings: 2980 },
    { month: "April", earnings: 4100 },
    { month: "May", earnings: 4650 },
    { month: "June", earnings: 4850 },
    { month: "July", earnings: 3900 },
  ]

  const stats = {
    totalEarnings: 28450,
    activeDeliveries: 3,
    completedToday: 8,
    totalCompleted: 671,
  }

  const activeDeliveries = [
    {
      id: "DEL-001",
      pickup: "Green Valley Farm",
      dropoff: "City Fresh Market",
      pickupAddress: "Plot 45, Sector 12, Farmville",
      dropoffAddress: "123 Market Street, Downtown",
      distance: "12 km",
      amount: 350,
      status: "in_transit",
      items: "Tomatoes (50kg), Carrots (30kg)",
      customerPhone: "+880 1712-345678",
      estimatedTime: "25 mins",
    },
    {
      id: "DEL-002",
      pickup: "Organic Fields Co-op",
      dropoff: "Green Grocers Ltd",
      pickupAddress: "Village Road, Organic Valley",
      dropoffAddress: "456 Commerce Ave, City Center",
      distance: "8 km",
      amount: 280,
      status: "pickup_pending",
      items: "Potatoes (100kg)",
      customerPhone: "+880 1723-456789",
      estimatedTime: "15 mins",
    },
    {
      id: "DEL-003",
      pickup: "Sunny Acres Farm",
      dropoff: "Fresh Food Hub",
      pickupAddress: "Highway 7, Rural District",
      dropoffAddress: "789 Distribution Center, East Side",
      distance: "18 km",
      amount: 420,
      status: "pickup_pending",
      items: "Mixed Vegetables (150kg)",
      customerPhone: "+880 1734-567890",
      estimatedTime: "10 mins",
    },
  ]

  const recentDeliveries = [
    {
      id: "DEL-098",
      route: "Green Valley → City Market",
      distance: "15 km",
      amount: 380,
      completedAt: "2 hours ago",
      rating: 5,
    },
    {
      id: "DEL-097",
      route: "Organic Co-op → Downtown Store",
      distance: "10 km",
      amount: 290,
      completedAt: "4 hours ago",
      rating: 5,
    },
    {
      id: "DEL-096",
      route: "Farm Express → Market Hub",
      distance: "22 km",
      amount: 450,
      completedAt: "5 hours ago",
      rating: 4,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_transit":
        return "default"
      case "pickup_pending":
        return "secondary"
      case "delivered":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_transit":
        return "In Transit"
      case "pickup_pending":
        return "Pickup Pending"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.welcome")}, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground">
            Track your deliveries and manage your routes
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="bg-transparent">
            <MapPin className="mr-2 h-4 w-4" />
            View Map
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Navigation className="mr-2 h-4 w-4" />
            Start Route
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{stats.totalEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-primary">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Deliveries
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.activeDeliveries}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently on route
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.completedToday}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.completedToday} deliveries done
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Completed
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalCompleted}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All-time deliveries
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <ApexChart
          data={earningsData}
          title="Earnings Over Time"
          color="#2563eb"
          currency="৳"
          lastMonthLabel={t("dashboard.last_month")}
          height={250}
          showAverage={true}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Active Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">
                        {delivery.id}
                      </p>
                      <Badge variant={getStatusColor(delivery.status)}>
                        {getStatusText(delivery.status)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        ৳{delivery.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {delivery.distance}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2">
                      <Package className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Pickup: {delivery.pickup}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {delivery.pickupAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Dropoff: {delivery.dropoff}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {delivery.dropoffAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        ETA: {delivery.estimatedTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedDelivery(delivery)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Delivery Details - {delivery.id}
                          </DialogTitle>
                          <DialogDescription>
                            Complete delivery information and customer contact
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <p className="text-sm font-medium mb-1">Items</p>
                            <p className="text-sm text-muted-foreground">
                              {delivery.items}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Customer Contact
                            </p>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <p className="text-sm">
                                {delivery.customerPhone}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">
                                Distance
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {delivery.distance}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">
                                Payment
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ৳{delivery.amount}
                              </p>
                            </div>
                          </div>
                          <Button className="w-full bg-primary">
                            <Navigation className="mr-2 h-4 w-4" />
                            Start Navigation
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Navigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              asChild
            >
              <Link href="/delivery/all">View All Deliveries</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Completed Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">
              Recently Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">
                        {delivery.id}
                      </p>
                      <div className="flex items-center">
                        {Array.from({ length: delivery.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500 text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{delivery.route}</p>
                    <p className="text-xs text-muted-foreground">
                      {delivery.distance} • {delivery.completedAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ৳{delivery.amount}
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
              <Link href="/delivery/history">View Full History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
