import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Monitor, ShieldCheck, GraduationCap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
          <Monitor className="h-4 w-4" />
          Next-Gen Content Broadcasting
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Empowering <span className="text-blue-600">Educational</span> Environments
        </h1>
        
        <p className="text-lg text-slate-600">
          A seamless platform for teachers to broadcast content and principals to maintain quality. 
          Real-time scheduling, approval workflows, and live broadcasting.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="px-8 h-12 cursor-pointer text-base font-semibold bg-blue-600 hover:bg-blue-700">
              Staff Login
            </Button>
          </Link>
          <Link href="/live/demo-teacher">
            <Button size="lg" variant="outline" className="px-8 h-12 cursor-pointer text-base font-semibold border-slate-200">
              View Live Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Pills */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-5xl">
        <div className="flex flex-col items-center p-6 text-center">
          <GraduationCap className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="font-bold text-slate-900">Teacher Tools</h3>
          <p className="text-sm text-slate-500">Upload subject-based content with automated scheduling.</p>
        </div>
        <div className="flex flex-col items-center p-6 text-center">
          <ShieldCheck className="h-10 w-10 text-emerald-500 mb-4" />
          <h3 className="font-bold text-slate-900">Principal Approval</h3>
          <p className="text-sm text-slate-500">Robust workflow to approve, reject, and monitor broadcast quality.</p>
        </div>
        <div className="flex flex-col items-center p-6 text-center">
          <Monitor className="h-10 w-10 text-amber-500 mb-4" />
          <h3 className="font-bold text-slate-900">Live Broadcast</h3>
          <p className="text-sm text-slate-500">Dynamic public pages for students with auto-refresh content.</p>
        </div>
      </div>
    </div>
  );
}