// CoreChat/frontend/app/(authpages)/layout.tsx

import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoreChat Authentication",
  description: "Login and Register pages for the CoreChat application.",
};

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
          {/* Header */}
          <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-800">Core</span>
              <Image
                src="/logo.png"
                alt="CoreChatLogo"
                width={42}
                height={42}
                className="rounded-md ml-1"
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

          {/* Main Content Area */}
          <main className="flex-1 flex items-center justify-center p-4">
            {children}
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
                  width={36}
                  height={36}
                  className="rounded-md ml-1"
                />
              </span>
              <span> - All rights reserved.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
