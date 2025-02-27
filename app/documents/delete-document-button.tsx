"use client";

import { LoadingButton } from "@/components/loading-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
  
  export function DeleteDocumentButton({
    documentId

  }: {
    documentId: Id<"documents">
  }) {
    const [isLoading, setIsLoading] = useState(false);
    const deleteDocument = useMutation(api.documents.deleteDocument);
    const router = useRouter();
return(
    <AlertDialog>
  <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="flex item-center gap-2">
        <TrashIcon className="w-4 h-4"/> Delete
        </Button>

  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <LoadingButton 
      onClick={() => {
        setIsLoading(true);
        deleteDocument({
          documentId,
        }).then(() => {
            router.push("/");
        }).finally(() => {
          setIsLoading(false);
          })
        }}
      isLoading={isLoading} 
      loadingText="Deleting..."> Delete</LoadingButton>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )}