
export type UserRole = 'USER' | 'ADMIN';

export type User = {
  id: number;
  username: string;
  role: UserRole;
};

export type RegisterUserRequest = {
  username: string;
  password: string;
  role: UserRole;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};