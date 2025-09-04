// CoreChat/frontend/src/app/layout.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initializeAuth, isLoadingAuth, currentUser } = useAuthStore();
  const router = useRouter();

  // Initialize the auth state from localStorage on first render.
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Handle the loading and redirection logic based on auth state.
  useEffect(() => {
    if (!isLoadingAuth && !currentUser) {
      router.push("/login");
    }
  }, [isLoadingAuth, currentUser, router]);

  // This is the correct structure: <html> and <body> tags must always be present.
  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoadingAuth ? (
          // Display the loading component as the main content while loading
          <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-inter">
            <Loader className="h-10 w-10 animate-spin text-blue-500" />
            <p className="ml-3 text-lg">Loading...</p>
          </div>
        ) : (
          // Render the children once loading is complete
          children
        )}
      </body>
    </html>
  );
}