'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useFormik } from 'formik'; 
import * as Yup from 'yup'; 
import axios from "axios"; // Axios for API calls
import { useState } from 'react'; // React hook for state management

export default function RegisterPage() {
  // State variables for displaying messages (success/error) to the user
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be 50 characters or less')
      .required('Full Name is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Clear previous messages
      setMessage('');
      setMessageType('');
      try {
        // Make a POST request to the registration API endpoint
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}register`, values);
        setMessage('Registration successful! You can now log in.');
        setMessageType('success');
        resetForm();
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.';
        if (axios.isAxiosError(error) && error.response) {
          // Check for specific error messages from the server
          if (error.response.data?.message) errorMessage = error.response.data.message;
          else if (error.response.status === 409) errorMessage = 'Email or username already exists.';
          else errorMessage = `Server error: ${error.response.status}`;
        } else {
          // Fallback for non-Axios errors
          errorMessage = error.message;
        }
        // Set error message
        setMessage(errorMessage);
        setMessageType('error');
      } finally {
        setSubmitting(false); // Always set submitting to false after the request
      }
    },
  });
  return (
    <Card className="w-full max-w-md border-2 border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
        <CardDescription>Join CoreChat and start connecting.</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className={`p-3 rounded-lg text-center mb-4 ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
        {/* Registration form */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Your full name" {...formik.getFieldProps('name')} />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Choose a unique username" {...formik.getFieldProps('username')} />
            {formik.touched.username && formik.errors.username && <p className="text-red-500 text-sm">{formik.errors.username}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
