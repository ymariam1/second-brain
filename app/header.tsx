'use client'

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import Image from "next/image";

export function Header() {
    return <div className="bg-slate-900 py-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 text-2xl">
                <Image src='/brain.jpg' alt='2ndBrain Logo' width={50} height={50} className="rounded"/>
                SecondBrain
            </div>
        <div>

            <Unauthenticated>
                <SignInButton />
                </Unauthenticated>
                <Authenticated>
                <div className="flex gap-6">
                    <ModeToggle />
                    <UserButton />
                </div>
            </Authenticated>
        </div>
        </div>
    </div>
}