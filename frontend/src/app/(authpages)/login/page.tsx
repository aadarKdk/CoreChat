// CoreChat/frontend/src/app/(authpages)/login/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Import the useAuth hook
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // For loading spinner

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Destructure login function, loading state, error, and error clear from useAuth
  const { login, isLoadingAuth, error, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered'); // Check if redirected from registration

  // Clear any auth errors when component mounts or form inputs change
  useEffect(() => {
    clearError();
  }, [email, password, clearError]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    const success = await login({ email, password }); // Call the login function from useAuth
    if (success) {
      // Redirection to '/chat' is handled automatically by the useAuth hook upon successful login
    }
  };

  return (
    <div>
      <Card className="w-[380px] bg-slate-800 border-slate-700 shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-400">Welcome Back</CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to your account to continue chatting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Display success message if redirected after registration */}
          {registered && (
            <div className="mb-4 p-3 bg-green-900/40 text-green-300 border border-green-700 rounded-md text-sm">
              Registration successful! Please log in.
            </div>
          )}
          {/* Display authentication errors from useAuth */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 text-red-300 border border-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400 rounded-md" // Added rounded-md for consistency
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400 rounded-md" // Added rounded-md for consistency
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 rounded-md transition-colors duration-300 mt-2 shadow-lg" // Added shadow-lg for consistency
                disabled={isLoadingAuth} // Disable button when authentication is in progress
              >
                {isLoadingAuth ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
