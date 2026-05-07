import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Large Visual Element */}
        <div className="relative">
          <h1 className="text-[12rem] font-bold text-slate-200 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 bg-white rounded-2xl shadow-xl ring-1 ring-slate-200">
              <AlertCircle className="h-12 w-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Lost ?
          </h2>
          <p className="text-slate-500">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link href="/" passHref>
            <Button 
              className="h-12 px-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Decorative background element */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[120px]" />
        </div>
      </div>
    </div>
  );
}