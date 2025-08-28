"use client";

import { useAuth } from "@/app/auth/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return <>{children}</>;
};
