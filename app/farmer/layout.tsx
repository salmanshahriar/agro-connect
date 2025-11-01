import type React from "react"
import { FarmerNav } from "@/components/farmer-nav"

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden md:block w-64 flex-shrink-0">
        <FarmerNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  )
}
