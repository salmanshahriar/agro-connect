"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Package, ShoppingCart, TrendingUp, Plus, ImageIcon } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

const ApexChart = dynamic(() => import("@/components/apex-chart"), { ssr: false })

export default function FarmerDashboard() {
  const [isAddProduceOpen, setIsAddProduceOpen] = useState(false)
  const [productImage, setProductImage] = useState<string | null>(null)
  const { t } = useLanguage()
  const { user } = useAuth()

  const earningsData = [
    { month: "January", earnings: 3200 },
    { month: "February", earnings: 3800 },
    { month: "March", earnings: 4100 },
    { month: "April", earnings: 3900 },
    { month: "May", earnings: 4500 },
    { month: "June", earnings: 4800 },
    { month: "July", earnings: 5200 },
  ]

  const stats = {
    totalEarnings: 45250,
    activeListings: 12,
    pendingOrders: 5,
    completedOrders: 48,
  }

  const recentOrders = [
    { id: "ORD-001", buyer: "City Fresh Market", item: "Tomatoes", quantity: "50 kg", amount: 2500, status: "pending" },
    {
      id: "ORD-002",
      buyer: "Green Grocers Ltd",
      item: "Potatoes",
      quantity: "100 kg",
      amount: 3000,
      status: "confirmed",
    },
    { id: "ORD-003", buyer: "Organic Store", item: "Carrots", quantity: "30 kg", amount: 1800, status: "delivered" },
  ]

  const topProduce = [
    { name: "Tomatoes", quantity: "150 kg", revenue: 7500, trend: "+12%" },
    { name: "Potatoes", quantity: "300 kg", revenue: 9000, trend: "+8%" },
    { name: "Carrots", quantity: "120 kg", revenue: 7200, trend: "+15%" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
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
          <p className="text-muted-foreground">Manage your farm and track your sales</p>
        </div>
        <Dialog open={isAddProduceOpen} onOpenChange={setIsAddProduceOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              {t("dashboard.add_produce")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t("produce.add_title")}</DialogTitle>
              <DialogDescription>{t("produce.add_desc")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Image Upload */}
              <div className="grid gap-2">
                <Label>{t("produce.image")}</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {productImage ? (
                    <div className="space-y-2">
                      <img
                        src={productImage || "/placeholder.svg"}
                        alt="Preview"
                        className="h-32 w-32 object-cover mx-auto rounded"
                      />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">{t("produce.add_image")}</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">{t("produce.product_name")}</Label>
                <Input id="name" placeholder={t("produce.product_name_placeholder")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">{t("produce.quantity")}</Label>
                  <Input id="quantity" type="number" placeholder="100" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">{t("produce.unit")}</Label>
                  <Input id="unit" placeholder="kg" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">
                  {t("produce.price")} ({t("produce.currency")})
                </Label>
                <Input id="price" type="number" placeholder="50" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">{t("produce.description")}</Label>
                <Textarea id="description" placeholder={t("produce.description_placeholder")} rows={3} />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">{t("produce.add_button")}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("dashboard.total_earnings")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">৳{stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-primary">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("dashboard.active_listings")}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeListings}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.available_purchase")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("dashboard.pending_orders")}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.awaiting_confirmation")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("dashboard.completed_orders")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.this_month")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <ApexChart
          data={earningsData}
          title={t("dashboard.earnings_over_time")}
          color="#15803d"
          currency="৳"
          lastMonthLabel={t("dashboard.last_month")}
          height={250}
          showAverage={true}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">{t("dashboard.recent_orders")}</CardTitle>
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
                            : order.status === "confirmed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.buyer}</p>
                    <p className="text-sm text-foreground">
                      {order.item} - {order.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">৳{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <Link href="/farmer/orders">{t("dashboard.view_all_orders")}</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Top Selling Produce */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">{t("dashboard.top_selling")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProduce.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.quantity} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">৳{item.revenue.toLocaleString()}</p>
                    <p className="text-sm text-primary">{item.trend}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <Link href="/farmer/produce">{t("dashboard.manage_produce")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
