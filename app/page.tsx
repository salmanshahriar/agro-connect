import { Navigation } from "@/components/navigation"
import { LandingClient } from "@/components/landing-client"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <LandingClient />
    </div>
  )
}
