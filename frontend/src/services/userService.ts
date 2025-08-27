// CoreChat/frontend/src/services/userService.ts

import { User } from '@/types';
import { GET } from './api';

// Fetches all registered users
export const getAllUsers = async (token: string): Promise<User[]> => {
  return GET<User[]>('/api/users', token);
};

