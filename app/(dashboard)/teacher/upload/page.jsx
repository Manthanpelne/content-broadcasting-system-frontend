"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentSchema } from "@/lib/validations";
import { ContentService } from "@/services/content-service";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, X, FileImage } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contentSchema),
    defaultValues: { rotationDuration: 10 }
  });

  const fileWatch = watch("file");

  // Handle local preview
  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };


  
   const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const onDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    // Reuse your base64 conversion logic here
    handleFileSelection(file);
  }
};


  const onSubmit = async (data) => {
    // 1. Get the actual file from the FileList
    const file = data.file[0];

    // 2. Convert to Base64 string
    const base64String = await fileToBase64(file);

    try {
      const payload = {
        ...data,
        fileUrl: base64String, 
        teacherId: user.id,
        teacherName: user.name,
      };

      await ContentService.uploadContent(payload);
      toast.success("Content uploaded successfully and sent for approval!");
      router.push("/teacher/content");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };



  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-none shadow-lg ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle>Upload New Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input {...register("title")} placeholder="e.g., Morning Assembly" />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject *</label>
                <Input {...register("subject")} placeholder="e.g., Physics" />
                {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea {...register("description")} placeholder="Optional details..." />
            </div>

            {/* File Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Media File (JPG, PNG, GIF) *</label>
              <div className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${preview ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 hover:border-slate-300'}`}>
                {preview ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                    <button 
                      type="button"
                      onClick={() => setPreview(null)}
                      className="absolute top-2 right-2 p-1 bg-white/80 rounded-full shadow-sm hover:bg-white"
                    >
                      <X className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                ) : (
                  <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop} 
                  className="flex flex-col items-center justify-center space-y-2 text-slate-500">
                    <div className="p-3 bg-white rounded-full shadow-sm ring-1 ring-slate-200">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm">Click to upload or drag and drop</p>
                    <p className="text-xs">Max size: 10MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  {...register("file")} 
                  onChange={handlePreview}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              {errors.file && <p className="text-xs text-red-500">{errors.file.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time *</label>
                <Input type="datetime-local" {...register("startTime")} />
                {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Time *</label>
                <Input type="datetime-local" {...register("endTime")} />
                {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rotation (sec)</label>
                <Input type="number" {...register("rotationDuration")} />
                {errors.rotationDuration && <p className="text-xs text-red-500">{errors.rotationDuration.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full h-11 cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit for Approval"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}