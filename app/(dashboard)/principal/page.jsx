"use client"

import { StatsCard } from "@/components/statsCard";
import { ContentService } from "@/services/content-service";
import { useQuery } from "@tanstack/react-query";
import { LayoutDashboard, AlertCircle, CheckCircle, Ban } from "lucide-react";

export default function PrincipalDashboard() {
 
  const { data: items, isLoading } = useQuery({
    queryKey: ['all-content'], // Using a generic key for all content
    queryFn: ContentService.getAllContent,
    refetchInterval: 30000 
  });

  const stats = {
    total: items?.length || 0,
    pending: items?.filter(i => i.status === 'pending').length || 0,
    approved: items?.filter(i => i.status === 'approved').length || 0,
    rejected: items?.filter(i => i.status === 'rejected').length || 0,
  };

  // 3. React Query handles the loading state
  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Principal Overview</h1>
        <p className="text-muted-foreground">Manage and review content across the institution.</p>
      </div>
 

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="System Total" value={stats.total} icon={LayoutDashboard} />
        <StatsCard title="Awaiting Review" value={stats.pending} icon={AlertCircle} className="ring-amber-200 bg-amber-50/50" />
        <StatsCard title="Live Content" value={stats.approved} icon={CheckCircle} className="ring-emerald-200 bg-emerald-50/50" />
        <StatsCard title="Rejected" value={stats.rejected} icon={Ban} className="ring-red-200 bg-red-50/50" />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-64 bg-slate-200 rounded" />
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-slate-100 rounded-xl" />)}
      </div>
    </div>
  );
}