import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>
      
      <LoginForm />
      
      <div className="text-center text-sm">
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="underline underline-offset-4 hover:text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}