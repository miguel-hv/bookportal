'use client';
import RegisterForm from '@/auth/components/RegisterForm';
import { registerUser } from '@/users/authService';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const handleRegister = async (data: { name: string; password: string }) => {
    await registerUser(data);
    router.push('/login');
  };

  return <RegisterForm onSubmit={handleRegister} />;
}
