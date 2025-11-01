"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from "lucide-react"

export default function FarmerVerification() {
  const [filter, setFilter] = useState<
    "all" | "pending" | "verified" | "rejected"
  >("pending")

  const farmers = [
    {
      id: 1,
      name: "Rahman Farm",
      owner: "Abdul Rahman",
      location: "Jessore",
      phone: "+880 1712-345678",
      email: "rahman@farm.com",
      farmSize: "5 acres",
      crops: ["Tomatoes", "Potatoes", "Carrots"],
      status: "pending",
      registeredDate: "2025-01-10",
      documents: ["NID", "Land Ownership", "Farm Photos"],
    },
    {
      id: 2,
      name: "Green Valley",
      owner: "Karim Hossain",
      location: "Bogra",
      phone: "+880 1723-456789",
      email: "karim@greenvalley.com",
      farmSize: "8 acres",
      crops: ["Potatoes", "Onions", "Cabbage"],
      status: "verified",
      registeredDate: "2025-01-05",
      verifiedDate: "2025-01-08",
      documents: ["NID", "Land Ownership", "Farm Photos"],
    },
    {
      id: 3,
      name: "Organic Farms",
      owner: "Rahim Uddin",
      location: "Jessore",
      phone: "+880 1734-567890",
      email: "rahim@organic.com",
      farmSize: "3 acres",
      crops: ["Carrots", "Spinach", "Lettuce"],
      status: "pending",
      registeredDate: "2025-01-12",
      documents: ["NID", "Land Ownership", "Farm Photos"],
    },
  ]

  const filteredFarmers = farmers.filter(
    (farmer) => filter === "all" || farmer.status === filter
  )

  const handleVerify = (farmerId: number) => {}

  const handleReject = (farmerId: number) => {}

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Farmer Verification
        </h1>
        <p className="text-muted-foreground">
          Review and verify farmer registrations
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-primary" : ""}
        >
          All
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          onClick={() => setFilter("pending")}
          className={
            filter === "pending" ? "bg-accent text-accent-foreground" : ""
          }
        >
          Pending
        </Button>
        <Button
          variant={filter === "verified" ? "default" : "outline"}
          onClick={() => setFilter("verified")}
          className={filter === "verified" ? "bg-primary" : ""}
        >
          Verified
        </Button>
        <Button
          variant={filter === "rejected" ? "default" : "outline"}
          onClick={() => setFilter("rejected")}
          className={filter === "rejected" ? "bg-destructive" : ""}
        >
          Rejected
        </Button>
      </div>

      {/* Farmers List */}
      <div className="space-y-4">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg text-foreground">
                      {farmer.name}
                    </CardTitle>
                    <Badge
                      variant={
                        farmer.status === "verified"
                          ? "default"
                          : farmer.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {farmer.status === "verified" && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {farmer.status === "pending" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {farmer.status === "rejected" && (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {farmer.status.charAt(0).toUpperCase() +
                        farmer.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Owner: {farmer.owner}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Farmer Details */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Farm Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{farmer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{farmer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{farmer.email}</span>
                    </div>
                    <div className="text-sm mt-3">
                      <p className="text-muted-foreground">Farm Size:</p>
                      <p className="font-medium text-foreground">
                        {farmer.farmSize}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Crops:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {farmer.crops.map((crop) => (
                          <Badge key={crop} variant="outline">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents & Actions */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Documents Submitted
                  </h4>
                  <div className="space-y-2 mb-4">
                    {farmer.documents.map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground">{doc}</span>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm mb-4">
                    <p className="text-muted-foreground">Registered:</p>
                    <p className="font-medium text-foreground">
                      {new Date(farmer.registeredDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                    {farmer.status === "verified" && farmer.verifiedDate && (
                      <>
                        <p className="text-muted-foreground mt-2">Verified:</p>
                        <p className="font-medium text-foreground">
                          {new Date(farmer.verifiedDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </>
                    )}
                  </div>

                  {farmer.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleVerify(farmer.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleReject(farmer.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No farmers found
          </h3>
          <p className="text-muted-foreground">
            No farmers match the selected filter
          </p>
        </div>
      )}
    </div>
  )
}
