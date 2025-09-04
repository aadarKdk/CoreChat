// CoreChat/frontend/src/store/authStore.ts
import { create } from 'zustand';
import { User, LoginCredentials, RegisterData } from '@/types';
import * as authService from '@/services/authService';

// Define the state shape
interface AuthState {
  currentUser: User | null;
  token: string | null;
  isLoadingAuth: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  // A new action to initialize state from local storage
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // State
  currentUser: null,
  token: null,
  isLoadingAuth: true,
  error: null,

  // Actions
  clearError: () => set({ error: null }),

  initializeAuth: () => {
    try {
      const storedToken = localStorage.getItem('jwtToken');
      const storedUser = localStorage.getItem('currentUser');
      if (storedToken && storedUser) {
        set({
          token: storedToken,
          currentUser: JSON.parse(storedUser),
          isLoadingAuth: false,
        });
      } else {
        set({ isLoadingAuth: false });
      }
    } catch (e) {
      console.error("Failed to initialize auth state:", e);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('currentUser');
      set({ isLoadingAuth: false });
    }
  },

  login: async (credentials) => {
    get().clearError();
    set({ isLoadingAuth: true });
    try {
      const response = await authService.loginUser(credentials);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      set({
        token: response.token,
        currentUser: response.user,
        isLoadingAuth: false,
      });
      return true;
    } catch (err: any) {
      console.error("Login failed:", err.data?.message || err.message);
      set({
        error: err.data?.message || "Login failed. Please check your credentials.",
        isLoadingAuth: false,
      });
      return false;
    }
  },

  register: async (data) => {
    get().clearError();
    set({ isLoadingAuth: true });
    try {
      await authService.registerNewUser(data);
      set({ isLoadingAuth: false });
      return true;
    } catch (err: any) {
      console.error("Registration failed:", err.data?.message || err.message);
      set({
        error: err.data?.message || "Registration failed. Please try again.",
        isLoadingAuth: false,
      });
      return false;
    }
  },

  logout: async () => {
    get().clearError();
    set({ isLoadingAuth: true });
    try {
      await authService.logoutUser();
    } catch (err: any) {
      console.error("Server-side logout failed:", err.data?.message || err.message);
      set({ error: "Logout failed on server. Please try again." });
    } finally {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('currentUser');
      set({
        token: null,
        currentUser: null,
        isLoadingAuth: false,
      });
    }
  },
}));