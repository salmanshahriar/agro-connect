import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, MapPin, User, AlertCircle } from "lucide-react"

export default function OrderMonitoring() {
  const orders = [
    {
      id: "ORD-245",
      farmer: "Rahman Farm",
      farmerLocation: "Jessore",
      buyer: "City Fresh Market",
      buyerLocation: "Dhaka",
      items: "Tomatoes (50 kg)",
      amount: 2500,
      status: "in_transit",
      orderDate: "2025-01-15",
      deliveryDate: "2025-01-17",
      issues: [],
    },
    {
      id: "ORD-244",
      farmer: "Green Valley",
      farmerLocation: "Bogra",
      buyer: "Fresh Mart",
      buyerLocation: "Chittagong",
      items: "Potatoes (100 kg)",
      amount: 3000,
      status: "confirmed",
      orderDate: "2025-01-14",
      deliveryDate: "2025-01-16",
      issues: [],
    },
    {
      id: "ORD-238",
      farmer: "Organic Farms",
      farmerLocation: "Jessore",
      buyer: "Green Grocers",
      buyerLocation: "Sylhet",
      items: "Carrots (30 kg)",
      amount: 1800,
      status: "disputed",
      orderDate: "2025-01-12",
      deliveryDate: "2025-01-14",
      issues: ["Payment dispute reported"],
    },
    {
      id: "ORD-243",
      farmer: "Fresh Fields",
      farmerLocation: "Sylhet",
      buyer: "Market Hub",
      buyerLocation: "Dhaka",
      items: "Cabbage (40 kg)",
      amount: 1600,
      status: "delivered",
      orderDate: "2025-01-13",
      deliveryDate: "2025-01-15",
      issues: [],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "secondary"
      case "in_transit":
        return "default"
      case "delivered":
        return "default"
      case "disputed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order Monitoring
        </h1>
        <p className="text-muted-foreground">
          Track and manage all platform orders
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">47</div>
            <p className="text-sm text-muted-foreground">Active Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-sm text-muted-foreground">In Transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-sm text-accent">Requires Attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">1,243</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className={order.status === "disputed" ? "border-destructive" : ""}
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg text-foreground">
                      {order.id}
                    </CardTitle>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    {order.issues.length > 0 && (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Issues
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ordered on{" "}
                    {new Date(order.orderDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    ৳{order.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Order Value</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Farmer Info */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Farmer
                  </h4>
                  <p className="text-sm font-medium text-foreground">
                    {order.farmer}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {order.farmerLocation}
                  </p>
                </div>

                {/* Order Details */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Order Details
                  </h4>
                  <p className="text-sm font-medium text-foreground">
                    {order.items}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Delivery:{" "}
                    {new Date(order.deliveryDate).toLocaleDateString("en-GB")}
                  </p>
                </div>

                {/* Buyer Info */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Buyer
                  </h4>
                  <p className="text-sm font-medium text-foreground">
                    {order.buyer}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {order.buyerLocation}
                  </p>
                </div>
              </div>

              {/* Issues */}
              {order.issues.length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Issues Reported
                  </h4>
                  <ul className="space-y-1">
                    {order.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-foreground">
                        • {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {order.status === "disputed" && (
                  <Button variant="default" size="sm" className="bg-primary">
                    Resolve Dispute
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto bg-transparent"
                >
                  Contact Parties
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
