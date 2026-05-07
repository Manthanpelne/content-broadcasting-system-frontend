"use client"

import { useEffect, useState } from "react";
import { ContentService } from "@/services/content-service";
import { useParams, useRouter } from "next/navigation";
import { Link, Link2, Loader2, MonitorOff } from "lucide-react";
import {toast} from "sonner"
import Link from 'next/link';

export default function PublicLivePage() {
  const { teacherId } = useParams();
  const [activeContent, setActiveContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const router= useRouter()

  useEffect(() => {

    if (teacherId === "undefined" || !teacherId){
       toast.error("Login first !!");
       setLoading(false);
       router.push("/login")
       return;
    } 

    const checkBroadcast = async () => {
      const all = await ContentService.getTeacherContent(teacherId);
      const now = new Date();

      // LOGIC: Must be Approved AND current time must be between Start and End
      const current = all.find(item => {
        const start = new Date(item.startTime);
        const end = new Date(item.endTime);
        return item.status === 'approved' && now >= start && now <= end;
      });

      setActiveContent(current || null);
      setLoading(false);
    };

    checkBroadcast();
    // Optional: Poll every 30 seconds to update live content
    const interval = setInterval(checkBroadcast, 30000);
    return () => clearInterval(interval);
  }, [teacherId]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );

  if (!activeContent) return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-slate-500">
      <MonitorOff className="h-16 w-16 mb-4 opacity-20" />
      <h1 className="text-xl font-medium">No content currently broadcasting</h1>
      <p className="text-sm text-slate-400">Please check back later.</p>
      <Link href="/" className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:underline">
        <Link className="h-4 w-4" />
        Back to Dashboard
      </Link>
       
    </div>
  );

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        <img 
          src={activeContent.fileUrl} 
          alt={activeContent.title} 
          className="w-full h-full object-contain"
        />
        
        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-12 text-white">
          <div className="max-w-4xl">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-widest">
              Live Broadcast: {activeContent.subject}
            </span>
            <h1 className="text-4xl font-bold mt-4">{activeContent.title}</h1>
            <p className="text-lg text-slate-300 mt-2 line-clamp-2">{activeContent.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}