'use client';
import LoginForm from '@/auth/components/LoginForm';
import { loginUser } from '@/auth/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (data: { username: string; password: string }) => {
    await loginUser(data);
    router.push('/');
  };

  return(
    <>
      <LoginForm onSubmit={handleLogin} />;
       <div className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Register here
          </Link>
        </div>
    </>
  )
}
