import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { HeaderActions } from "./header-actions";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"


export function Header() {
    return <div className="bg-slate-900 py-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 text-2xl">
                <Image src='/brain.jpg' alt='2ndBrain Logo' width={50} height={50} className="rounded"/>
                SecondBrain
            </Link>

            <div>
                <nav><Link href="/dashboard/" className="hover:text-slate-300">Documents</Link></nav>
            </div>
        </div>

        <div className="flex gap-6 items-center">
            
            <ModeToggle />
           <HeaderActions />

        </div>
        </div>
    </div>
}