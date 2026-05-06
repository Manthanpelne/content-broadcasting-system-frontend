"use client"

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/statsCard";
import { ContentService } from "@/services/content-service";

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await ContentService.getTeacherContent(user.id);
        setStats({
          total: data.length,
          pending: data.filter(i => i.status === 'pending').length,
          approved: data.filter(i => i.status === 'approved').length,
          rejected: data.filter(i => i.status === 'rejected').length,
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [user.id]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">Here is what is happening with your content.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Uploads" value={stats.total} icon={FileText} />
        <StatsCard title="Pending" value={stats.pending} icon={Clock} className="bg-amber-50/30" />
        <StatsCard title="Approved" value={stats.approved} icon={CheckCircle2} className="bg-emerald-50/30" />
        <StatsCard title="Rejected" value={stats.rejected} icon={XCircle} className="bg-red-50/30" />
      </div>

      {/* Placeholder for Recent Activity Table */}
      <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-sm text-slate-500">Recent activity will appear here as you upload content.</p>
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