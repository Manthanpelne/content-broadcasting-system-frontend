"use client"

import { useEffect, useState } from "react";
import { ContentService } from "@/services/content-service";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Loader } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function PendingApprovalsPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRejecting, setIsRejecting] = useState(false);

const fetchPending = async () => {
    setIsLoading(true);
    try {
      const all = await ContentService.getAllContent();
      setItems(all.filter(i => i.status === 'pending'));
    } catch (error) {
      toast.error("Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (id) => {
    await ContentService.updateStatus(id, 'approved');
    toast.success("Content approved and scheduled for broadcast.");
    fetchPending();
  };


const handleReject = async () => {
    if (!rejectionReason.trim()) return toast.error("Reason is mandatory");
    
    setIsRejecting(true); // Start Loader
    try {
      await ContentService.updateStatus(selectedItem.id, 'rejected', rejectionReason);
      toast.error("Content rejected.");
      setIsRejectModalOpen(false);
      setRejectionReason("");
      await fetchPending(); // Refresh list
    } catch (error) {
      toast.error("Failed to reject content");
    } finally {
      setIsRejecting(false); // Stop Loader
    }
  };

  //console.log("items",items)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>
    
      {isLoading ? <>
      <Loader className="animate-spin h-[300px] w-12 opacity-25 flex-1 items-center m-auto"/>
      </> : <>
       {items?.length ? <>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group relative rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
              <img src={item?.fileUrl} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{item.subject}</span>
              </div>
              <p className="text-xs text-slate-500">By {item.teacherName}</p>
            </div>

            <div className="mt-6 flex gap-2">
              <Button onClick={() => handleApprove(item.id)} className="flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 h-9">
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { setSelectedItem(item); setIsRejectModalOpen(true); }}
                className="flex-1 cursor-pointer border-red-200 text-red-600 hover:bg-red-50 h-9"
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
       </> : <>
          <div className="">
               <h2 className="italic text-2xl opacity-25">No Pending Approvals</h2>
          </div>
       </> }
      
      </>}
    

      {/* Rejection Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Content</DialogTitle>
            <DialogDescription>Please provide a reason for rejection. This will be visible to the teacher.</DialogDescription>
          </DialogHeader>
          <Textarea 
            placeholder="e.g., Image resolution is too low or incorrect subject chosen." 
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="mt-4"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject}>Confirm Rejection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}