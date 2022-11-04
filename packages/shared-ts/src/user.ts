export interface User {
  userId: number;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
