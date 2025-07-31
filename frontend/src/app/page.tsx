import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center space-x-2">
          {/* Using your logo for the header */}
          <span className="text-xl font-bold text-slate-800">Core</span>
          <Image
            src="/logo.png" // Path to your logo
            alt="CoreChatLogo"
            width={40}
            height={40}
            className="rounded-md"
          />
          
        </div>
        <nav>
          <Link href="/login" passHref>
            <Button variant="ghost" className="mr-2">Login</Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="default">Sign Up</Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 py-16">
        <div className="mb-8 max-w-4xl mx-auto">
          {/* CoreChat with Tech Gradient */}
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-transparent bg-clip-text">
              CoreChat
            </span>
            : Intelligent Communication, Evolved.
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Experience next-generation AI-powered conversations for seamless and efficient communication.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register" passHref>
            <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </Link>
          <Link href="/features" passHref>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50">Learn More</Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-gray-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-2">
          <span className="flex items-center gap-1">
            &copy; {currentYear}{' '}
            <span className="font-semibold text-slate-800">Core</span>
            <Image
              src="/logo.png"
              alt="CoreChatLogo"
              width={30}
              height={30}
              className="rounded-md ml-0.5"
            />
          </span>
          <span> - All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}