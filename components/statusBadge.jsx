import { cn } from "@/lib/utils";

export function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700 ring-amber-200",
    approved: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    rejected: "bg-red-100 text-red-700 ring-red-200",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-lg px-4 py-1.5 w-max text-xs font-medium ring-1 ring-inset",
      styles[status] || "bg-slate-100 text-slate-700 ring-slate-200"
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}