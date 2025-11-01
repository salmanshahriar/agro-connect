import type React from "react"
import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden md:block w-64 flex-shrink-0">
        <AdminNav />
      </aside>

       {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  )
}
