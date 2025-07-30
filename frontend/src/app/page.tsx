// src/app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Centered main content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">💬 CoreChat</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Real-time communication made simple.
        </p>

        <div className="flex space-x-4">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <span className="font-semibold">corechat</span>
        <p>© 2025 CoreChat. All rights reserved.</p>
      </footer>
    </div>
  )
}
