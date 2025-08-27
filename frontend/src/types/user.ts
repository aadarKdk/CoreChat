// CoreChat/frontend/src/types/user.ts

export interface BaseUser {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
  status?: "online" | "offline" | "away" | "do_not_disturb";
  lastSeen?: string;
}

export interface User extends BaseUser {
  email: string;
  gender?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
