"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";


export default function DashboardLayout({ children }) {
  const { user, isAuthenticated } = useAuthStore();
const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only redirecting if hydration is complete and user is still not authenticated
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  // Show nothing (or a loading spinner) until we know the auth status
  if (!isHydrated) return null; 

  // Final check to prevent content flash before redirect
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-slate-50/50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}