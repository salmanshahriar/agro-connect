"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  MapPin,
  AlertCircle,
  TrendingUp,
  Truck,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react"

interface Order {
  id: string
  farmer: string
  farmerLocation: string
  buyer: string
  buyerLocation: string
  driver: string
  pickupCoords: [number, number]
  dropoffCoords: [number, number]
  currentCoords?: [number, number]
  items: string
  amount: number
  status: "in_transit" | "confirmed" | "delivered" | "disputed"
  urgency: "high" | "medium" | "low"
  progress: number
}

const activeOrders: Order[] = [
  {
    id: "ORD-245",
    farmer: "Rahman Farm",
    farmerLocation: "Kumira Market",
    buyer: "City Fresh Market",
    buyerLocation: "Chittagong City",
    driver: "Abdul Karim",
    pickupCoords: [22.5025, 91.7051],
    dropoffCoords: [22.3569, 91.8332],
    currentCoords: [22.4297, 91.7692],
    items: "Tomatoes (80kg)",
    amount: 2500,
    status: "in_transit",
    urgency: "high",
    progress: 65,
  },
  {
    id: "ORD-244",
    farmer: "Green Valley",
    farmerLocation: "Bhatiari Co-op",
    buyer: "Fresh Mart",
    buyerLocation: "GEC Market",
    driver: "Mohammad Ali",
    pickupCoords: [22.445, 91.73],
    dropoffCoords: [22.364, 91.82],
    currentCoords: [22.4045, 91.775],
    items: "Rice (180kg)",
    amount: 3000,
    status: "in_transit",
    urgency: "medium",
    progress: 45,
  },
  {
    id: "ORD-243",
    farmer: "Fresh Fields",
    farmerLocation: "Kumira Poultry",
    buyer: "Kotowali Market",
    buyerLocation: "Anderkilla",
    driver: "Rafiq Ahmed",
    pickupCoords: [22.51, 91.715],
    dropoffCoords: [22.3414, 91.827],
    items: "Chicken (100kg)",
    amount: 1600,
    status: "confirmed",
    urgency: "high",
    progress: 0,
  },
  {
    id: "ORD-238",
    farmer: "Fish Landing Center",
    farmerLocation: "Kumira Ghat",
    buyer: "Agrabad Market",
    buyerLocation: "Agrabad",
    driver: "Pending",
    pickupCoords: [22.5172, 91.7221],
    dropoffCoords: [22.338, 91.81],
    items: "Seafood (120kg)",
    amount: 1800,
    status: "disputed",
    urgency: "high",
    progress: 20,
  },
]

export default function AdminMonitoring() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any>({})

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.onload = () => initMap()
    document.body.appendChild(script)

    return () => {
      if (mapRef.current) mapRef.current.remove()
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  const initMap = () => {
    const L = (window as any).L
    if (!L || mapRef.current) return

    const map = L.map("map").setView([22.43, 91.77], 11)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map)

    const newMarkers: any = {}

    activeOrders.forEach((order) => {
      const statusColors = {
        in_transit: "#3b82f6",
        confirmed: "#f59e0b",
        delivered: "#10b981",
        disputed: "#ef4444",
      }

      const pickupIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: #10b981; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      const dropoffIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: ${
          statusColors[order.status]
        }; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <rect x="1" y="3" width="15" height="13"/>
            <path d="M16 8h5l3 5v5h-4"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      const pickupMarker = L.marker(order.pickupCoords, {
        icon: pickupIcon,
      }).addTo(map)

      const dropoffMarker = L.marker(order.dropoffCoords, {
        icon: dropoffIcon,
      }).addTo(map)

      const routeLine = L.polyline([order.pickupCoords, order.dropoffCoords], {
        color: statusColors[order.status],
        weight: 3,
        opacity: 0.5,
        dashArray: order.status === "confirmed" ? "10, 10" : "",
      }).addTo(map)

      if (order.currentCoords && order.status === "in_transit") {
        const vehicleIcon = L.divIcon({
          className: "vehicle-marker",
          html: `<div style="background: #6366f1; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(99,102,241,0.5); animation: pulse 2s infinite;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="1" y="3" width="15" height="13"/>
              <path d="M16 8h5l3 5v5h-4"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        const vehicleMarker = L.marker(order.currentCoords, {
          icon: vehicleIcon,
        }).addTo(map)

        newMarkers[order.id] = {
          pickupMarker,
          dropoffMarker,
          routeLine,
          vehicleMarker,
        }
      } else {
        newMarkers[order.id] = { pickupMarker, dropoffMarker, routeLine }
      }

      pickupMarker.on("click", () => setSelectedOrder(order.id))
      dropoffMarker.on("click", () => setSelectedOrder(order.id))
      if (newMarkers[order.id].vehicleMarker) {
        newMarkers[order.id].vehicleMarker.on("click", () =>
          setSelectedOrder(order.id)
        )
      }
    })

    markersRef.current = newMarkers
    mapRef.current = map
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      in_transit: "default",
      confirmed: "secondary",
      delivered: "default",
      disputed: "destructive",
    }
    return variants[status] || "outline"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_transit":
        return <Truck className="h-3 w-3" />
      case "confirmed":
        return <Clock className="h-3 w-3" />
      case "delivered":
        return <CheckCircle className="h-3 w-3" />
      case "disputed":
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const stats = {
    total: activeOrders.length,
    inTransit: activeOrders.filter((o) => o.status === "in_transit").length,
    disputed: activeOrders.filter((o) => o.status === "disputed").length,
    totalValue: activeOrders.reduce((sum, o) => sum + o.amount, 0),
  }

  const filteredOrders =
    filterStatus === "all"
      ? activeOrders
      : activeOrders.filter((o) => o.status === filterStatus)

  const selectedOrderData = activeOrders.find((o) => o.id === selectedOrder)

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel */}
      <div className="w-96 border-r border-border overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Track My Delivery
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time tracking & management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-blue-500" />
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-muted-foreground">In Transit</p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.inTransit}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-xs text-muted-foreground">Issues</p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.disputed}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <p className="text-xs text-muted-foreground">Value</p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ৳{(stats.totalValue / 1000).toFixed(1)}K
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {["all", "in_transit", "confirmed", "disputed"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="flex-shrink-0"
              >
                {status.replace("_", " ")}
              </Button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className={`cursor-pointer transition-all ${
                  selectedOrder === order.id
                    ? "ring-2 ring-primary shadow-md"
                    : "hover:shadow-sm"
                } ${order.status === "disputed" ? "border-red-500" : ""}`}
                onClick={() => {
                  setSelectedOrder(order.id)
                  if (mapRef.current) {
                    const L = (window as any).L
                    const coords = order.currentCoords || order.pickupCoords
                    mapRef.current.setView(coords, 13, { animate: true })
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {order.id}
                      </span>
                      <Badge
                        variant={getStatusBadge(order.status)}
                        className="text-xs"
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {order.status.replace("_", " ")}
                        </span>
                      </Badge>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      ৳{order.amount}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {order.farmer}
                        </p>
                        <p className="text-muted-foreground truncate">
                          {order.farmerLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Package className="h-3 w-3 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {order.buyer}
                        </p>
                        <p className="text-muted-foreground truncate">
                          {order.buyerLocation}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-muted-foreground mb-1">
                        {order.items}
                      </p>
                      {order.status === "in_transit" && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {order.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Map Panel */}
      <div className="flex-1 relative">
        <div id="map" className="w-full h-full" />

        {/* Legend */}
        <Card className="absolute top-4 right-4 z-[1000] w-52">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Map Legend
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Pickup Point</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">In Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500" />
                <span className="text-muted-foreground">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-muted-foreground">Issue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-indigo-500" />
                <span className="text-muted-foreground">Live Vehicle</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Order Details */}
        {selectedOrderData && (
          <Card className="absolute bottom-4 left-4 right-4 z-[1000] max-w-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedOrderData.id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Driver: {selectedOrderData.driver}
                  </p>
                </div>
                <Badge variant={getStatusBadge(selectedOrderData.status)}>
                  {getStatusIcon(selectedOrderData.status)}
                  <span className="ml-1">
                    {selectedOrderData.status.replace("_", " ")}
                  </span>
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">From</p>
                  <p className="font-medium text-foreground">
                    {selectedOrderData.farmerLocation}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">To</p>
                  <p className="font-medium text-foreground">
                    {selectedOrderData.buyerLocation}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Contact Driver
                </Button>
                {selectedOrderData.status === "disputed" && (
                  <Button size="sm" className="flex-1 bg-red-500">
                    Resolve Issue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
