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
import CreateNoteForm from "./create-note-form";
import { toast } from "sonner"
import { PlusIcon, Upload } from "lucide-react";

export default function CreateNoteButton() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon className="w-4 h-4"/> Create Note
        </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create a Note</DialogTitle>
            <DialogDescription>
                Type whatever note you want to be searchable later on.
            </DialogDescription>
            <CreateNoteForm 
                onNoteCreated={() => {
                  setIsOpen(false);
                  toast("Your note has been sucessfully created")
                }}
            />
            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}
