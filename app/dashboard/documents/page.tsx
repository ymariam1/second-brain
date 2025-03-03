"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import DocumentCard from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
  
      <main className="w-full space-y-8">
        <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton/>
      </div>
      {!documents && 
      <div className="grid grid-cols-3 gap-8"> 
      {new Array(8).fill('').map((_, i) => (
        <Card key={i} className="h-[200px] p-6 flex flex-col justify-between">
          <Skeleton className="h-[20px] rounded" />
          <Skeleton className="h-[20px] rounded" />
          <Skeleton className="h-[20px] rounded" />
          <Skeleton className="w-[80px] h-[40px] rounded" />
          </Card>
      ))}
      </div>}
      {documents && documents.length > 0 &&
        <div className= "grid grid-cols-4 gap-8">
        {documents?.map((doc) => (
          <DocumentCard key={doc._id} document={doc} />
        ))}
        </div>
        }

{documents && documents.length === 0 &&
        <div className= "flex py-24 flex-col justify center items-center gap-8">
          <Image
          src="/undraw_file-search_cbur.svg"
          width="200"
          height="200"
          alt= "A picture of documents"/>
          <h2 className="text-2xl">You have no documents</h2>
        </div>
        }
    </main>
  );
}
