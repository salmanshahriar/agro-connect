"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FarmerProduce() {
  const [isAddProduceOpen, setIsAddProduceOpen] = useState(false)
  const [productImage, setProductImage] = useState<string | null>(null)
  const { t } = useLanguage()
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
      id: 5,
      name: "Red Onions",
      farmer: "Valley Farms",
      farmerVerified: true,
      category: "Vegetables",
      price: 45,
      unit: "kg",
      available: "80 kg",
      location: "Dhaka",
      image: "/red-onions.jpg",
      rating: 4.8,
      farmerPhone: "1XXXXXXXXX5",
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
            My Produce
          </h1>
          <p className="text-muted-foreground">Manage your product listings</p>
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
                      <p className="text-sm text-muted-foreground">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">
                        {t("produce.add_image")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">{t("produce.product_name")}</Label>
                <Input
                  id="name"
                  placeholder={t("produce.product_name_placeholder")}
                />
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
                <Textarea
                  id="description"
                  placeholder={t("produce.description_placeholder")}
                  rows={3}
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                {t("produce.add_button")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Produce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produceList.map((item) => (
          <Card key={item.id} className="overflow-hidden pt-0">
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
