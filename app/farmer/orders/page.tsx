import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check, X } from "lucide-react"

export default function FarmerOrders() {
  const orders = [
    {
      id: "ORD-001",
      buyer: "City Fresh Market",
      buyerLocation: "Dhaka",
      item: "Fresh Tomatoes",
      quantity: "50 kg",
      price: 50,
      total: 2500,
      status: "pending",
      date: "2025-01-15",
      deliveryDate: "2025-01-17",
    },
    {
      id: "ORD-002",
      buyer: "Green Grocers Ltd",
      buyerLocation: "Chittagong",
      item: "Organic Potatoes",
      quantity: "100 kg",
      price: 30,
      total: 3000,
      status: "confirmed",
      date: "2025-01-14",
      deliveryDate: "2025-01-16",
    },
    {
      id: "ORD-003",
      buyer: "Organic Store",
      buyerLocation: "Dhaka",
      item: "Fresh Carrots",
      quantity: "30 kg",
      price: 60,
      total: 1800,
      status: "delivered",
      date: "2025-01-12",
      deliveryDate: "2025-01-14",
    },
    {
      id: "ORD-004",
      buyer: "Fresh Mart",
      buyerLocation: "Sylhet",
      item: "Green Cabbage",
      quantity: "40 kg",
      price: 40,
      total: 1600,
      status: "in_transit",
      date: "2025-01-13",
      deliveryDate: "2025-01-15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "outline"
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track your orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
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
                    {new Date(order.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Buyer</p>
                  <p className="font-medium text-foreground">{order.buyer}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.buyerLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Product</p>
                  <p className="font-medium text-foreground">{order.item}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="font-medium text-foreground">
                    ৳{order.price}/{order.quantity.split(" ")[1]}
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    Total: ৳{order.total}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Delivery Date
                  </p>
                  <p className="font-medium text-foreground">
                    {new Date(order.deliveryDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
