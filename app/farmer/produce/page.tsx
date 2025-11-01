import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function FarmerProduce() {
  const produceList = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      quantity: "50 kg",
      price: 50,
      unit: "kg",
      status: "active",
      image: "/fresh-red-tomatoes.jpg",
      location: "Jessore",
    },
    {
      id: 2,
      name: "Organic Potatoes",
      category: "Vegetables",
      quantity: "100 kg",
      price: 30,
      unit: "kg",
      status: "active",
      image: "/organic-potatoes.png",
      location: "Jessore",
    },
    {
      id: 3,
      name: "Fresh Carrots",
      category: "Vegetables",
      quantity: "30 kg",
      price: 60,
      unit: "kg",
      status: "active",
      image: "/fresh-orange-carrots.jpg",
      location: "Jessore",
    },
    {
      id: 4,
      name: "Green Cabbage",
      category: "Vegetables",
      quantity: "0 kg",
      price: 40,
      unit: "kg",
      status: "out_of_stock",
      image: "/green-cabbage.jpg",
      location: "Jessore",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Produce
          </h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary/90" asChild>
          <Link href="/farmer/produce/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Produce
          </Link>
        </Button>
      </div>

      {/* Produce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produceList.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={item.status === "active" ? "default" : "secondary"}
              >
                {item.status === "active" ? "Active" : "Out of Stock"}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                {item.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium text-foreground">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium text-foreground">
                    ৳{item.price}/{item.unit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium text-foreground">
                    {item.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
