"use client"

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/statsCard";
import { ContentService } from "@/services/content-service";
import { LayoutDashboard, AlertCircle, CheckCircle, Ban } from "lucide-react";

export default function PrincipalDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await ContentService.getAllContent();
      setStats({
        total: data.length,
        pending: data.filter(i => i.status === 'pending').length,
        approved: data.filter(i => i.status === 'approved').length,
        rejected: data.filter(i => i.status === 'rejected').length,
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if(loading) return <DashboardSkeleton/>

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