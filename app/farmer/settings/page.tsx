"use client"

import type React from "react"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, Edit2, Save, X, FileText, Shield } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function FarmerSettings() {
  const { user } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [editingProfile, setEditingProfile] = useState(false)
  const [nidVerified, setNidVerified] = useState(user?.verified || false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    farmPhoto: user?.farmPhoto || "",
  })

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveProfile = () => {
    setEditingProfile(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Settings className="h-8 w-8" />
          {t("settings.title")}
        </h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("settings.profile")}</CardTitle>
            <CardDescription>
              View and edit your profile information
            </CardDescription>
          </div>
          {!editingProfile && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingProfile(true)}
              className="bg-transparent"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {t("settings.edit_profile")}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {editingProfile ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={profileData.farmPhoto || "/placeholder.svg"}
                  />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Change Photo
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {t("common.save")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingProfile(false)}
                  className="bg-transparent"
                >
                  <X className="mr-2 h-4 w-4" />
                  {t("common.cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.location}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined Date</p>
                  <p className="font-medium text-foreground">2024-10-15</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* NID Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("settings.nid_verification")}
          </CardTitle>
          <CardDescription>
            Complete your identity verification for better trust and credibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  National ID Verification
                </h4>
                <p className="text-sm text-muted-foreground">
                  Verify your identity with your National ID
                </p>
              </div>
              <div>
                {nidVerified ? (
                  <Badge className="bg-green-600">Verified</Badge>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <FileText className="mr-2 h-4 w-4" />
                        {t("settings.verify_now")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>
                          {t("settings.nid_verification")}
                        </DialogTitle>
                        <DialogDescription>
                          Upload a clear photo of your National ID for
                          verification
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="nid-number">NID Number</Label>
                          <Input
                            id="nid-number"
                            placeholder="Enter your NID number"
                            type="text"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="nid-image">NID Photo</Label>
                          <Input id="nid-image" type="file" accept="image/*" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          * Clear, legible photos are required. Processing takes
                          1-2 business days.
                        </p>
                        <Button
                          onClick={() => {
                            setNidVerified(true)
                          }}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Submit for Verification
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            {nidVerified && (
              <div className="p-4 border border-green-200 rounded-lg bg-green-50/50">
                <p className="text-sm text-green-800">
                  Your identity is verified. This increases buyer confidence in
                  your products and listings.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Language Preference Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.language")}</CardTitle>
          <CardDescription>
            Choose your preferred language for the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={language === "bn" ? "default" : "outline"}
              onClick={() => setLanguage("bn")}
              className={language === "bn" ? "bg-primary" : "bg-transparent"}
            >
              বাংলা (Bangla)
            </Button>
            <Button
              variant={language === "en" ? "default" : "outline"}
              onClick={() => setLanguage("en")}
              className={language === "en" ? "bg-primary" : "bg-transparent"}
            >
              English
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Current Language:{" "}
            <span className="font-semibold">
              {language === "bn" ? "বাংলা" : "English"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
