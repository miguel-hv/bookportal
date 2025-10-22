import { LoginUserRequest, RegisterUserRequest, User } from "../user/UserModel"

export async function registerUser(data: RegisterUserRequest): Promise<User> {
  const res = await fetch('api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to register user');
  }

  return res.json();
}

export async function loginUser(data: LoginUserRequest): Promise<User> {
  const res = await fetch('api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Invalid credentials');
  }

  return res.json();
}

export async function logoutUser() {
  await fetch('api/logout', { method: 'POST' });
}
