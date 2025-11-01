import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package, Truck, CheckCircle } from "lucide-react"

export default function BuyerOrders() {
  const orders = [
    {
      id: "ORD-101",
      farmer: "Rahman Farm",
      farmerLocation: "Jessore",
      items: [{ name: "Fresh Tomatoes", quantity: "50 kg", price: 2500 }],
      total: 2500,
      status: "in_transit",
      orderDate: "2025-01-15",
      deliveryDate: "2025-01-17",
      trackingSteps: [
        { label: "Order Placed", completed: true },
        { label: "Confirmed by Farmer", completed: true },
        { label: "In Transit", completed: true },
        { label: "Delivered", completed: false },
      ],
    },
    {
      id: "ORD-102",
      farmer: "Green Valley",
      farmerLocation: "Bogra",
      items: [{ name: "Organic Potatoes", quantity: "100 kg", price: 3000 }],
      total: 3000,
      status: "confirmed",
      orderDate: "2025-01-14",
      deliveryDate: "2025-01-16",
      trackingSteps: [
        { label: "Order Placed", completed: true },
        { label: "Confirmed by Farmer", completed: true },
        { label: "In Transit", completed: false },
        { label: "Delivered", completed: false },
      ],
    },
    {
      id: "ORD-103",
      farmer: "Organic Farms",
      farmerLocation: "Jessore",
      items: [{ name: "Fresh Carrots", quantity: "30 kg", price: 1800 }],
      total: 1800,
      status: "delivered",
      orderDate: "2025-01-12",
      deliveryDate: "2025-01-14",
      trackingSteps: [
        { label: "Order Placed", completed: true },
        { label: "Confirmed by Farmer", completed: true },
        { label: "In Transit", completed: true },
        { label: "Delivered", completed: true },
      ],
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
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg text-foreground">
                      {order.id}
                    </CardTitle>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ordered on{" "}
                    {new Date(order.orderDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    ৳{order.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Order Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Order Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            <p className="text-sm font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} - ৳{item.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {order.farmer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.farmerLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Expected Delivery
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.deliveryDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Order Tracking
                  </h4>
                  <div className="space-y-4">
                    {order.trackingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-1 ${
                            step.completed ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              step.completed
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm">
                  Contact Farmer
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    Leave Review
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto bg-transparent"
                >
                  View Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
