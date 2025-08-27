// CoreChat/frontend/src/services/authService.ts

import { LoginCredentials, LoginResponse, RegisterData, RegisterResponse } from '@/types';
import { POST } from './api';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return POST<LoginResponse>('/api/users/login', credentials);
};

export const registerNewUser = async (data: RegisterData): Promise<RegisterResponse> => {
  return POST<RegisterResponse>('/api/users/register', data);
};

export const logoutUser = async (): Promise<{ message: string }> => {
  return POST<{ message: string }>('/api/users/logout', {});
};
