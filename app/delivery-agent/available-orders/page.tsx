"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  MapPin,
  DollarSign,
  Navigation,
  Clock,
  Weight,
  TrendingUp,
} from "lucide-react"

interface Order {
  id: string
  pickup: string
  dropoff: string
  pickupAddress: string
  dropoffAddress: string
  pickupCoords: [number, number]
  dropoffCoords: [number, number]
  distance: string
  amount: number
  weight: string
  items: string
  urgency: "high" | "medium" | "low"
  estimatedTime: string
}

const availableOrders: Order[] = [
  {
    id: "ORD-001",
    pickup: "Kumira Wholesale Market",
    dropoff: "Chittagong City Market",
    pickupAddress: "Kumira Bazar, Sitakunda",
    dropoffAddress: "Chawk Bazar, Chittagong",
    pickupCoords: [22.5025, 91.7051],
    dropoffCoords: [22.3569, 91.8332],
    distance: "18 km",
    amount: 450,
    weight: "80kg",
    items: "Tomatoes, Carrots",
    urgency: "high",
    estimatedTime: "35 mins",
  },
  {
    id: "ORD-002",
    pickup: "Kumira Fish Landing Center",
    dropoff: "Agrabad Commercial Area",
    pickupAddress: "Kumira Ghat Road, Sitakunda",
    dropoffAddress: "Agrabad Access Road, Chittagong",
    pickupCoords: [22.5172, 91.7221],
    dropoffCoords: [22.338, 91.81],
    distance: "22 km",
    amount: 550,
    weight: "120kg",
    items: "Fresh Fish, Seafood",
    urgency: "high",
    estimatedTime: "40 mins",
  },

  {
    id: "ORD-004",
    pickup: "Kumira Poultry Farm",
    dropoff: "Kotowali Market",
    pickupAddress: "Kumira Union, Sitakunda",
    dropoffAddress: "Anderkilla, Chittagong",
    pickupCoords: [22.51, 91.715],
    dropoffCoords: [22.3414, 91.827],
    distance: "20 km",
    amount: 420,
    weight: "100kg",
    items: "Chicken, Eggs",
    urgency: "high",
    estimatedTime: "38 mins",
  },
  {
    id: "ORD-005",
    pickup: "Bhatiari Farmers Co-op",
    dropoff: "GEC Circle Market",
    pickupAddress: "Bhatiari, Sitakunda",
    dropoffAddress: "GEC Circle, Chittagong",
    pickupCoords: [22.445, 91.73],
    dropoffCoords: [22.364, 91.82],
    distance: "24 km",
    amount: 500,
    weight: "180kg",
    items: "Rice, Lentils, Onions",
    urgency: "medium",
    estimatedTime: "50 mins",
  },
]

export default function OrderMapView() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any>({})

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.onload = () => initMap()
    document.body.appendChild(script)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return

    Object.keys(markersRef.current).forEach((orderId) => {
      const { routeLine } = markersRef.current[orderId]
      const isSelected = selectedOrder === orderId
      const isHovered = hoveredOrder === orderId

      if (isSelected || isHovered) {
        routeLine.setStyle({
          color: "#8b5cf6",
          weight: 4,
          opacity: 0.9,
        })
      } else {
        routeLine.setStyle({
          color: "#6366f1",
          weight: 3,
          opacity: 0.6,
        })
      }
    })
  }, [selectedOrder, hoveredOrder])

  const initMap = () => {
    const L = (window as any).L
    if (!L || mapRef.current) return

    const map = L.map("map").setView([22.43, 91.77], 11)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)

    const newMarkers: any = {}

    availableOrders.forEach((order) => {
      const pickupIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: #10b981; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      const dropoffIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: #3b82f6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      const pickupMarker = L.marker(order.pickupCoords, {
        icon: pickupIcon,
      }).addTo(map)

      const dropoffMarker = L.marker(order.dropoffCoords, {
        icon: dropoffIcon,
      }).addTo(map)

      const routeLine = L.polyline([order.pickupCoords, order.dropoffCoords], {
        color: "#6366f1",
        weight: 3,
        opacity: 0.6,
        dashArray: "10, 10",
      }).addTo(map)

      pickupMarker.on("click", () => handleSelectOrder(order.id))
      dropoffMarker.on("click", () => handleSelectOrder(order.id))

      newMarkers[order.id] = { pickupMarker, dropoffMarker, routeLine }
    })

    markersRef.current = newMarkers
    mapRef.current = map
  }

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrder(orderId)
    const order = availableOrders.find((o) => o.id === orderId)
    if (order && mapRef.current) {
      const L = (window as any).L
      const bounds = L.latLngBounds([order.pickupCoords, order.dropoffCoords])
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }

  const handleViewRoute = (order: Order) => {
    handleSelectOrder(order.id)
  }

  const handleAcceptOrder = (orderId: string) => {
    alert(`Order ${orderId} accepted! Starting navigation...`)
  }

  const getUrgencyColor = (
    urgency: string
  ): "default" | "destructive" | "secondary" | "outline" => {
    switch (urgency) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getUrgencyText = (urgency: string) => {
    return urgency.charAt(0).toUpperCase() + urgency.slice(1) + " Priority"
  }

  const totalValue = availableOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Order Cards (1/3 width) */}
      <div className="w-1/3 border-r border-border overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Available Orders
            </h1>
            <p className="text-muted-foreground">
              {availableOrders.length} orders ready for pickup
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Total Value</p>
                </div>
                <p className="text-xl font-bold text-foreground">
                  ৳{totalValue.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <p className="text-xl font-bold text-foreground">
                  {availableOrders.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Cards */}
          <div className="space-y-4">
            {availableOrders.map((order) => (
              <Card
                key={order.id}
                className={`cursor-pointer transition-all ${
                  selectedOrder === order.id
                    ? "ring-2 ring-primary"
                    : "hover:shadow-md"
                }`}
                onMouseEnter={() => setHoveredOrder(order.id)}
                onMouseLeave={() => setHoveredOrder(null)}
                onClick={() => handleViewRoute(order)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm font-semibold">
                        {order.id}
                      </CardTitle>
                      <Badge
                        variant={getUrgencyColor(order.urgency)}
                        className="text-xs"
                      >
                        {getUrgencyText(order.urgency)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        ৳{order.amount}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Pickup */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {order.pickup}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {order.pickupAddress}
                      </p>
                    </div>
                  </div>

                  {/* Dropoff */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Package className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {order.dropoff}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {order.dropoffAddress}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      <span>{order.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Weight className="h-3 w-3" />
                      <span>{order.weight}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{order.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Items: {order.items}
                    </p>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAcceptOrder(order.id)
                    }}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Accept Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Map (2/3 width) */}
      <div className="w-2/3 relative">
        <div id="map" className="w-full h-full"></div>

        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-[1000]">
          <h3 className="text-sm font-semibold text-foreground mb-3">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">
                Pickup Location
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">
                Dropoff Location
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-indigo-500"></div>
              <span className="text-xs text-muted-foreground">
                Delivery Route
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
