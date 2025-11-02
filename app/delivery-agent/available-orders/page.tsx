"use client"

import React, { useState, useEffect } from "react"
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

// Mock orders data with coordinates (Singapore area)
const availableOrders = [
  {
    id: "ORD-001",
    pickup: "Green Valley Farm",
    dropoff: "City Fresh Market",
    pickupAddress: "Plot 45, Sector 12, Farmville",
    dropoffAddress: "123 Market Street, Downtown",
    pickupCoords: { lat: 1.3521, lng: 103.8198 },
    dropoffCoords: { lat: 1.2897, lng: 103.8501 },
    distance: "12 km",
    amount: 350,
    weight: "80kg",
    items: "Tomatoes, Carrots",
    urgency: "high",
    estimatedTime: "45 mins",
  },
  {
    id: "ORD-002",
    pickup: "Organic Fields Co-op",
    dropoff: "Green Grocers Ltd",
    pickupAddress: "Village Road, Organic Valley",
    dropoffAddress: "456 Commerce Ave, City Center",
    pickupCoords: { lat: 1.3644, lng: 103.9915 },
    dropoffCoords: { lat: 1.3048, lng: 103.8318 },
    distance: "8 km",
    amount: 280,
    weight: "100kg",
    items: "Potatoes",
    urgency: "medium",
    estimatedTime: "30 mins",
  },
  {
    id: "ORD-003",
    pickup: "Sunny Acres Farm",
    dropoff: "Fresh Food Hub",
    pickupAddress: "Highway 7, Rural District",
    dropoffAddress: "789 Distribution Center, East Side",
    pickupCoords: { lat: 1.4382, lng: 103.7890 },
    dropoffCoords: { lat: 1.3138, lng: 103.8627 },
    distance: "18 km",
    amount: 420,
    weight: "150kg",
    items: "Mixed Vegetables",
    urgency: "high",
    estimatedTime: "60 mins",
  },
  {
    id: "ORD-004",
    pickup: "Harvest Moon Farm",
    dropoff: "Downtown Market",
    pickupAddress: "Rural Route 5, Farmlands",
    dropoffAddress: "234 Central Plaza, Downtown",
    pickupCoords: { lat: 1.2880, lng: 103.7654 },
    dropoffCoords: { lat: 1.2965, lng: 103.8477 },
    distance: "15 km",
    amount: 390,
    weight: "120kg",
    items: "Onions, Garlic",
    urgency: "low",
    estimatedTime: "50 mins",
  },
  {
    id: "ORD-005",
    pickup: "Fresh Greens Co.",
    dropoff: "Retail Hub Center",
    pickupAddress: "Farm District, North Zone",
    dropoffAddress: "567 Shopping District, West",
    pickupCoords: { lat: 1.3783, lng: 103.8480 },
    dropoffCoords: { lat: 1.3140, lng: 103.7632 },
    distance: "22 km",
    amount: 480,
    weight: "200kg",
    items: "Lettuce, Spinach",
    urgency: "medium",
    estimatedTime: "75 mins",
  },
]

export default function OrderMapView() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any>({})

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
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  const initMap = () => {
    const L = (window as any).L
    if (!L) return

    const mapInstance = L.map("map").setView([1.3521, 103.8198], 11)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance)

    const newMarkers: any = {}

    availableOrders.forEach((order) => {
      // Custom icon for pickup (green)
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

      // Custom icon for dropoff (blue)
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

      const pickupMarker = L.marker(
        [order.pickupCoords.lat, order.pickupCoords.lng],
        { icon: pickupIcon }
      ).addTo(mapInstance)

      const dropoffMarker = L.marker(
        [order.dropoffCoords.lat, order.dropoffCoords.lng],
        { icon: dropoffIcon }
      ).addTo(mapInstance)

      // Add route line
      const routeLine = L.polyline(
        [
          [order.pickupCoords.lat, order.pickupCoords.lng],
          [order.dropoffCoords.lat, order.dropoffCoords.lng],
        ],
        {
          color: "#6366f1",
          weight: 3,
          opacity: 0.6,
          dashArray: "10, 10",
        }
      ).addTo(mapInstance)

      pickupMarker.on("click", () => {
        setSelectedOrder(order.id)
        mapInstance.setView(
          [order.pickupCoords.lat, order.pickupCoords.lng],
          13
        )
      })

      dropoffMarker.on("click", () => {
        setSelectedOrder(order.id)
        mapInstance.setView(
          [order.dropoffCoords.lat, order.dropoffCoords.lng],
          13
        )
      })

      newMarkers[order.id] = { pickupMarker, dropoffMarker, routeLine }
    })

    setMarkers(newMarkers)
    setMap(mapInstance)
  }

  useEffect(() => {
    if (!map || !markers) return
    const L = (window as any).L

    Object.keys(markers).forEach((orderId) => {
      const { pickupMarker, dropoffMarker, routeLine } = markers[orderId]
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
  }, [selectedOrder, hoveredOrder, map, markers])

  const handleAcceptOrder = (orderId: string) => {
    alert(`Order ${orderId} accepted!`)
  }

  const handleViewRoute = (order: any) => {
    if (!map) return
    setSelectedOrder(order.id)
    const bounds = (window as any).L.latLngBounds([
      [order.pickupCoords.lat, order.pickupCoords.lng],
      [order.dropoffCoords.lat, order.dropoffCoords.lng],
    ])
    map.fitBounds(bounds, { padding: [50, 50] })
  }

  const getUrgencyColor = (urgency: string) => {
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
                  <p className="text-xs text-muted-foreground">
                    Total Value
                  </p>
                </div>
                <p className="text-xl font-bold text-foreground">
                  ৳{availableOrders.reduce((sum, o) => sum + o.amount, 0)}
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
                      <Badge variant={getUrgencyColor(order.urgency)} className="text-xs">
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
              <span className="text-xs text-muted-foreground">Pickup Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">Dropoff Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-indigo-500"></div>
              <span className="text-xs text-muted-foreground">Delivery Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}