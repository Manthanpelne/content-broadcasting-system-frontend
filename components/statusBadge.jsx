import { cn } from "@/lib/utils"

export function StatusBadge({ status }) {
  return (
    <div className={cn(
      "px-2 py-1 rounded text-sm font-bold", 
      status === 'approved' && "bg-green-100 text-green-700", // Conditional logic
      status === 'rejected' && "bg-red-100 text-red-700",
      status === 'pending' && "bg-yellow-100 text-yellow-700"
    )}>
      {status}
    </div>
  )
}