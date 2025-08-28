'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that protects routes requiring authentication
 * This is a placeholder that will be replaced with actual Supabase auth integration
 */
export function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This is a placeholder for actual authentication check
    // TODO: Replace with Supabase auth check
    const checkAuth = async () => {
      try {
        // Simulate auth check with a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, we'll assume the user is authenticated
        // In a real app, this would check the session with Supabase
        const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(isLoggedIn);
        
        if (!isLoggedIn) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
}