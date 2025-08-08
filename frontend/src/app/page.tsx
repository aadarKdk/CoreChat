//CoreChat/frontend/src/app/page.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Shield, Share, Star, ArrowRight, Phone, Lock, Zap } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            {/* Main chat bubble */}
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-white" />
              {/* AI indicator dots */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse delay-300"></div>
            </div>
            {/* Neural network lines */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 40 40">
                <path
                  d="M8 12 L20 8 L32 12 M12 28 L20 32 L28 28"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
          <span className="text-xl font-bold text-white">CoreChat</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="outline" className="border-gray-400 text-gray-100 hover:bg-gray-600 hover:text-white hover:border-gray-300 bg-transparent">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Connect instantly
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                with everyone
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Experience seamless, secure messaging that brings people together effortlessly. 
              Chat, share, and connect with advanced features designed for modern communication.
            </p>
            
            <Link href= "/login">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
            >
              Start Chatting Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </Link>
            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-red-400 border-2 border-white flex items-center justify-center text-white font-semibold">
                    Max
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-white font-semibold">
                    Ivy
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 border-2 border-white flex items-center justify-center text-white font-semibold">
                    Zoe
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">28,547</div>
                  <div className="text-sm text-gray-400">Happy Users</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4.9/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phone Mockups */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/chat.png"
                alt="CoreChat mobile interface"
                width={300}
                height={600}
                className="mx-auto"
              />
            </div>
            <div className="absolute top-8 -right-4 z-0">
              <Image
                src="/boy.png"
                alt="CoreChat contacts view"
                width={250}
                height={500}
                className="opacity-80"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Features for a better experience
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need for seamless communication
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8">
                {/* Audio Calling icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Audio Calling</h3>
                <p className="text-gray-300 leading-relaxed">
                  Make crystal-clear voice calls with clear audio quality for seamless communication anywhere, anytime.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8">
                {/* Keep Safe & Private icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Keep Safe & Private</h3>
                <p className="text-gray-300 leading-relaxed">
                  Keep conversations secure with end-to-end encryption, ensuring total privacy for all your messages.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8">
                {/* Lightning Fast Sharing icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast Sharing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Share documents, photos, and videos instantly with lightning-fast file sharing capabilities.
                </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © CoreChat 2025. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
