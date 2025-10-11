
export type UserRole = 'USER' | 'ADMIN';

export type User = {
  id: number;
  name: string;
  role: UserRole;
};

export type RegisterUserRequest = {
  name: string;
  password: string;
  role: UserRole;
};

export type LoginUserRequest = {
  name: string;
  password: string;
};