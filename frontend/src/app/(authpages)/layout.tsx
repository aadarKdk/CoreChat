//CoreChat/fronend/src/app/(authpages)/layout.tsx

import Link from "next/link"; 
import { MessageCircle } from "lucide-react"; 
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-white select-none">CoreChat</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-gray-300 text-sm font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 max-w-md mx-auto w-full">
        {children} {/* Renders the child components passed to AuthLayout */}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-sm">
            <div>© CoreChat 2025. All rights reserved.</div>
            <div className="flex flex-wrap items-center space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
