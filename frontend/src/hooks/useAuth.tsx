// CoreChat/frontend/src/hooks/useAuth.ts

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginCredentials, RegisterData } from '@/types'; 
import * as authService from '@/services/authService'; 
import { Loader } from 'lucide-react';

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  isLoadingAuth: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedToken = localStorage.getItem('jwtToken');
        const storedUser = localStorage.getItem('currentUser');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to parse stored user or token:", e);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoadingAuth(false);
      }
    };
    loadAuthState();
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    clearError();
    setIsLoadingAuth(true);
    try {
      const response = await authService.loginUser(credentials);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      setToken(response.token);
      setCurrentUser(response.user);
      router.push('/chat');
      return true;
    } catch (err: any) {
      console.error("Login failed:", err.data?.message || err.message);
      setError(err.data?.message || "Login failed. Please check your credentials.");
      return false;
    } finally {
      setIsLoadingAuth(false);
    }
  }, [router, clearError]);

  const register = useCallback(async (data: RegisterData) => {
    clearError();
    setIsLoadingAuth(true);
    try {
      const response = await authService.registerNewUser(data);
      router.push('/login?registered=true');
      return true;
    } catch (err: any) {
      console.error("Registration failed:", err.data?.message || err.message);
      setError(err.data?.message || "Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoadingAuth(false);
    }
  }, [router, clearError]);

  const logout = useCallback(async () => {
    clearError();
    setIsLoadingAuth(true);
    try {
      await authService.logoutUser();
    } catch (err: any) {
      console.error("Server-side logout failed:", err.data?.message || err.message);
      setError("Logout failed on server. Please try again.");
    } finally {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('currentUser');
      setToken(null);
      setCurrentUser(null);
      setIsLoadingAuth(false);
      router.push('/login');
    }
  }, [router, clearError]);

  const value = {
    currentUser,
    token,
    isLoadingAuth,
    login,
    register,
    logout,
    error,
    clearError,
  };

  if (isLoadingAuth && !currentUser) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-inter">
        <Loader className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-3 text-lg">Loading...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
