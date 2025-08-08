//CoreChat/frontend/src/app/(authpages)/login/page.tsx

'use client';

import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const router = useRouter();
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState<'success' | 'error'>('success');

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}login`, values);
      if (data.isLoggedIn) {
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        // Redirect to homepage after a short delay
        setTimeout(() => router.push('/chat'), 1000);
      } else {
        setMessage('Invalid email or password.');
        setMessageType('error');
      }
    } catch (error: any) {
      // Handle various error scenarios from the API
      setMessage(error?.response?.data?.message || 'Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setSubmitting(false); // Ensure submitting state is reset
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: handleSubmit,
  });

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10 -z-10"></div>

      <Card className="w-full max-w-md border-2 border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold select-none">Welcome Back</CardTitle>
          <CardDescription>
            Log in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...formik.getFieldProps('email')}
              />
            </div>

            <div className="mt-4">

              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...formik.getFieldProps('password')}
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-center mt-4 ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col">
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
