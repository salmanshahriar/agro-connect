"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import dynamic from "next/dynamic"

const ApexChart = dynamic(() => import("@/components/apex-chart"), {
  ssr: false,
})

export default function AdminDashboard() {
  const revenueData = [
    { month: "January", earnings: 8500 },
    { month: "February", earnings: 9200 },
    { month: "March", earnings: 10100 },
    { month: "April", earnings: 9800 },
    { month: "May", earnings: 11200 },
    { month: "June", earnings: 12500 },
    { month: "July", earnings: 13800 },
  ]

  const stats = {
    totalFarmers: 156,
    verifiedFarmers: 142,
    pendingVerification: 14,
    totalBuyers: 89,
    activeOrders: 47,
    completedOrders: 1243,
    totalRevenue: 2450000,
    platformFee: 122500,
  }

  const recentActivity = [
    {
      type: "verification",
      message: "New farmer registration: Rahman Farm",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      type: "order",
      message: "Order #ORD-245 completed successfully",
      time: "12 minutes ago",
      status: "success",
    },
    {
      type: "alert",
      message: "Payment dispute reported for Order #ORD-238",
      time: "1 hour ago",
      status: "warning",
    },
    {
      type: "verification",
      message: "Green Valley Farm verified successfully",
      time: "2 hours ago",
      status: "success",
    },
    {
      type: "order",
      message: "New order placed: ORD-246",
      time: "3 hours ago",
      status: "info",
    },
  ]

  const topFarmers = [
    {
      name: "Rahman Farm",
      location: "Jessore",
      orders: 89,
      revenue: 125000,
      rating: 4.9,
    },
    {
      name: "Green Valley",
      location: "Bogra",
      orders: 76,
      revenue: 98000,
      rating: 4.8,
    },
    {
      name: "Organic Farms",
      location: "Jessore",
      orders: 65,
      revenue: 87000,
      rating: 4.7,
    },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Platform overview and monitoring
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Farmers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalFarmers}
            </div>
            <p className="text-xs text-primary mt-1">
              {stats.verifiedFarmers} verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Verification
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.pendingVerification}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Orders
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.activeOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.completedOrders} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Platform Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ৳{stats.platformFee.toLocaleString()}
            </div>
            <p className="text-xs text-primary mt-1">5% commission</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <ApexChart
          data={revenueData}
          title="Platform Revenue"
          color="#15803d"
          currency="৳"
          lastMonthLabel="Last month"
          height={250}
          showAverage={true}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="mt-1">
                    {activity.status === "success" && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                    {activity.status === "warning" && (
                      <AlertCircle className="h-5 w-5 text-accent" />
                    )}
                    {activity.status === "pending" && (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                    {activity.status === "info" && (
                      <Package className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Farmers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">
              Top Performing Farmers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFarmers.map((farmer, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">
                        {farmer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {farmer.location}
                      </p>
                    </div>
                    <Badge variant="default">{farmer.rating} ⭐</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Orders</p>
                      <p className="font-semibold text-foreground">
                        {farmer.orders}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-semibold text-foreground">
                        ৳{farmer.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
