"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Users } from "lucide-react"

export default function Broadcasts() {
  const [message, setMessage] = useState("")
  const [audience, setAudience] = useState<"all" | "farmers" | "buyers">("all")

  const previousBroadcasts = [
    {
      id: 1,
      message:
        "Platform maintenance scheduled for tonight 11 PM - 2 AM. Please plan accordingly.",
      audience: "all",
      sentDate: "2025-01-14",
      recipients: 245,
    },
    {
      id: 2,
      message:
        "New quality standards for produce photos. Please update your listings.",
      audience: "farmers",
      sentDate: "2025-01-12",
      recipients: 156,
    },
    {
      id: 3,
      message:
        "Special discount on bulk orders this week! Check out featured farmers.",
      audience: "buyers",
      sentDate: "2025-01-10",
      recipients: 89,
    },
  ]

  const handleSend = () => {
    setMessage("")
  }

  const getAudienceCount = () => {
    switch (audience) {
      case "farmers":
        return 156
      case "buyers":
        return 89
      default:
        return 245
    }
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Broadcast Messages
        </h1>
        <p className="text-muted-foreground">
          Send announcements to farmers and buyers
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* New Broadcast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">New Broadcast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Audience Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Select Audience
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={audience === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAudience("all")}
                    className={audience === "all" ? "bg-primary" : ""}
                  >
                    All Users
                  </Button>
                  <Button
                    variant={audience === "farmers" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAudience("farmers")}
                    className={audience === "farmers" ? "bg-primary" : ""}
                  >
                    Farmers Only
                  </Button>
                  <Button
                    variant={audience === "buyers" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAudience("buyers")}
                    className={audience === "buyers" ? "bg-primary" : ""}
                  >
                    Buyers Only
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Will reach {getAudienceCount()} users
                </p>
              </div>

              {/* Message Input */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Type your broadcast message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {message.length} / 500 characters
                </p>
              </div>

              {/* Send Button */}
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Broadcast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Previous Broadcasts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">
              Previous Broadcasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousBroadcasts.map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">
                      {broadcast.audience === "all"
                        ? "All Users"
                        : broadcast.audience === "farmers"
                        ? "Farmers"
                        : "Buyers"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(broadcast.sentDate).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    {broadcast.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Sent to {broadcast.recipients} users</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
