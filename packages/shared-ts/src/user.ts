export interface User {
  userId: number;
  email: string;
  password: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
