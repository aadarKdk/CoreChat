// CoreChat/frontend/src/app/(authpages)/register/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // Assuming a simple string input for gender for now
  const { register, isLoadingAuth, error, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    clearError();
  }, [name, username, email, password, gender, clearError]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await register({ name, username, email, password, gender: gender || undefined });
    if (success) {
      // Redirection is handled inside useAuth hook
    }
  };

  return (
    <div>
      <Card className="w-[420px] bg-slate-800 border-slate-700 shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-400">Create an Account</CardTitle>
          <CardDescription className="text-slate-400">
            Join CoreChat to connect with your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 text-red-300 border border-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username" className="text-slate-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-slate-300">Password</Label>n
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender" className="text-slate-300">Gender (Optional)</Label>
                <Select onValueChange={(value) => setGender(value)} value={gender}>
                  <SelectTrigger
                    id="gender"
                    className="bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white"
                  >
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border border-slate-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 rounded-md transition-colors duration-300 mt-2"
                disabled={isLoadingAuth}
              >
                {isLoadingAuth ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
