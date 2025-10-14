'use client';
import LoginForm from '@/auth/components/LoginForm';
import { loginUser } from '@/auth/authService';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (data: { username: string; password: string }) => {
    await loginUser(data);
    router.push('/');
  };

  return <LoginForm onSubmit={handleLogin} />;
}
