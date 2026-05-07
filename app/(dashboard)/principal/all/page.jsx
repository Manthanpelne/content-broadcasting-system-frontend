"use client"

import { useEffect, useState } from "react";
import { ContentService } from "@/services/content-service";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";
import { Search, Filter, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/statusBadge";
import {Button} from "@/components/ui/button"

export default function AllContentPage() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 2;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ContentService.getAllContent();
        setAllData(data);
        setFilteredData(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = allData;

    if (statusFilter !== "all") {
      result = result.filter(item => item.status === statusFilter);
    }

    if (searchQuery) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(result);
  }, [searchQuery, statusFilter, allData]);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Audit Log</h1>
        <p className="text-muted-foreground">View and filter all historical and current uploads.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by title, teacher, or subject..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Title & Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Schedule Window</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems?.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50/50">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{item.title}</span>
                    <span className="text-xs text-slate-500">By {item.teacherName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm px-2 py-1 bg-slate-100 rounded text-slate-600">
                    {item.subject}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <StatusBadge status={item.status} />
                    {item.status === 'rejected' && (
                      <span className="text-[10px] text-red-500 italic max-w-[150px] truncate" title={item.rejectionReason}>
                        Reason: {item.rejectionReason}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  <div>Start: {format(new Date(item.startTime), "MMM d, HH:mm")}</div>
                  <div>End: {format(new Date(item.endTime), "MMM d, HH:mm")}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {currentItems?.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            No matching content found for your filters.
          </div>
        )}

      </div>

      {currentItems?.length > 0 && (
        <div className="flex gap-2 justify-center p-4">
          <Button
           className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:pointer-events-none"
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
          > Previous </Button>
          <Button 
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:pointer-events-none"
            disabled={indexOfLastItem >= filteredData.length} 
            onClick={() => setCurrentPage(prev => prev + 1)}
          > Next </Button>
        </div>
      )}

    </div>
  );
}