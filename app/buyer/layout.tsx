import type React from "react"
import { BuyerNav } from "@/components/buyer-nav"

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden md:block w-64 flex-shrink-0">
        <BuyerNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  )
}
