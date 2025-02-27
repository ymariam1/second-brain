import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton({
    isLoading, 
    children, 
    loadingText,
    onClick,
}: {
    isLoading: boolean, 
    children: ReactNode, 
    loadingText: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) {
    return (
        <Button 
            className="flex gap-2 items-center"
            type="submit" 
            disabled={isLoading}
            onClick={(e) => {
                onClick?.(e);
            }}
            >
                {isLoading && <Loader2 className="animate-spin mr-2" />}
                {isLoading ? loadingText : children}
            </Button>
    );
}   
