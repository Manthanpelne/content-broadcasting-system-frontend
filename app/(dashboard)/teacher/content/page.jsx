"use client"

import { useEffect, useState } from "react";
import { ContentService } from "@/services/content-service";
import { useAuthStore } from "@/store/useAuthStore";
import { format } from "date-fns";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { AlertCircle, Loader } from "lucide-react";
import { StatusBadge } from "@/components/statusBadge";

export default function MyContentPage() {
  const { user } = useAuthStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ContentService.getTeacherContent(user.id).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [user.id]);


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Submissions</h1>
        <p className="text-muted-foreground">Track the status of your uploaded media.</p>
      </div>

        {loading  ? <>
         <Loader className="animate-spin h-[300px] w-12 opacity-25 flex-1 items-center m-auto"/>
        </> : <>
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
         <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    <span className="text-xs text-slate-400">ID: {item.id.slice(0, 8)}</span>
                  </div>
                </TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell className="text-xs text-slate-500">
                  {format(new Date(item.startTime), "MMM d, h:mm a")} - <br/>
                  {format(new Date(item.endTime), "MMM d, h:mm a")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center ">
                    <StatusBadge status={item.status} />
                    {item.status === 'rejected' && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 max-w-[150px]">
                        <AlertCircle className="h-3 w-3 flex-shrink-0" />
                        <span className="mt-0.5">Reason: {item.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  No content uploaded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        </>}
       
    </div>
  );
}