import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">Enter your information to create an account</p>
      </div>
      
      <RegisterForm />
      
      <div className="text-center text-sm">
        <p>
          Already have an account?{' '}
          <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}