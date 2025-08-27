// CoreChat/frontend/src/types/auth.ts

import { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  username: string;
  gender?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User; 
}

export interface RegisterResponse {
  message: string;
  user: User;
}
