'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react'; // Import useState for message handling

export default function RegisterPage() {
  // State for displaying success/error messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Define the validation schema using Yup, matching your User model
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

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setMessage(''); // Clear previous messages
      setMessageType('');

      try {
        console.log('Attempting to register with data:', values);
        // Await the axios.post call
        const response = await axios.post("http://localhost:8080/api/register", values);

        console.log('Registration successful:', response.data);
        setMessage('Registration successful! You can now log in.');
        setMessageType('success');
        resetForm(); // Reset the form fields on success

      } catch (error) {
        console.error('Registration error:', error);
        let errorMessage = 'An unexpected error occurred during registration.';

        // Check for specific error responses from the backend
        if (axios.isAxiosError(error) && error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message; // Use backend's error message
          } else if (error.response.status === 409) {
            errorMessage = 'Email or username already exists. Please try another.';
          } else if (error.response.status === 400) {
            errorMessage = 'Invalid input. Please check your details.';
          } else {
            errorMessage = `Server error: ${error.response.status}`;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = 'No response from server. Please check your internet connection or server status.';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        setMessage(errorMessage);
        setMessageType('error');

      } finally {
        setSubmitting(false); // Always re-enable the submit button
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-800 px-4">
      <div className="w-full max-w-md space-y-6 p-6 border rounded-xl shadow-lg bg-white dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-400">Join the conversation in seconds!</p>
        </div>

        {/* Message Display Area */}
        {message && (
          <div className={`p-3 rounded-md text-center ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              {...formik.getFieldProps('name')}
              className={formik.touched.name && formik.errors.name ? 'border-red-500' : ''}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a unique username"
              {...formik.getFieldProps('username')}
              className={formik.touched.username && formik.errors.username ? 'border-red-500' : ''}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...formik.getFieldProps('email')}
              className={formik.touched.email && formik.errors.email ? 'border-red-500' : ''}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...formik.getFieldProps('password')}
              className={formik.touched.password && formik.errors.password ? 'border-red-500' : ''}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}