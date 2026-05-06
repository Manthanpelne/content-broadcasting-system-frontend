"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell } from "lucide-react";
import { toast } from "sonner";

export function Navbar() {
const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(()=>{
      router.push("/login");
    },3000)
  };
console.log("iser",user)
  return (
<nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand/Logo */}
      <div></div>

        {/* Right: User Info & Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-medium text-slate-900">{user.name}</span>
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-tight">
                  {user.role}
                </span>
              </div>
              
              <div className="h-8 w-px bg-slate-200 mx-1" />

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-slate-500 cursor-pointer hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}