"use client";


import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export default function DocumentPage({
    params,
    }: {
    params: { documentid: Id<"documents"> };
}) {

  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentid ,
});

  const createDocument = useMutation(api.documents.createDocument);

  if (!document) {
    return <div>You don't have access to this document</div>;
  }
  return (
    
      
      <main className="p-24 space-y-8">
        <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>

      </div>
      <div className="flex gap-4">
        <div className="bg-gray-900 p-12 rounded flex-1 h-[600px]">
            {document.documentUrl && <iframe 
            className="w-full h-full"
            src={document.documentUrl} />}
        </div>

        <div className="w-[300px] bg-gray-900">


        </div>
    </div>
    </main>
  );
}
