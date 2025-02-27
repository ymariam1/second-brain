"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadDocumentForm from "./upload-document-form";
import { Upload } from "lucide-react";

export default function UploadDocumentButton() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4"/> Upload Document
        </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Upload a Document</DialogTitle>
            <DialogDescription>
                Upload a document for you to search over in the future.
            </DialogDescription>
            <UploadDocumentForm 
                onUpload={() => setIsOpen(false)}
            />
            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}
