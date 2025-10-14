'use client';
import RegisterForm from '@/auth/components/RegisterForm';
import { registerUser } from '@/auth/authService';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/user/UserModel';

export default function RegisterPage() {
  const router = useRouter();
  const handleRegister = async (data: { username: string; password: string, role: UserRole }) => {
    await registerUser(data);
    router.push('/login');
  };

  return <RegisterForm onSubmit={handleRegister} />;
}
