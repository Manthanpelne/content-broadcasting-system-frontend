"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MENU_ITEMS } from "@/lib/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  
  // Safety check: if no user, don't render menu
  const role = user?.role || "TEACHER";
  const items = MENU_ITEMS[role];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">EduCast</Link>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
         <div className="px-3 py-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</p>
            <p className="text-sm font-medium text-slate-700 capitalize">{role.toLowerCase()}</p>
         </div>
      </div>
    </div>
  );
}