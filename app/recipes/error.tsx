
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function RecipesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Recipe Engine Error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-40 h-40 bg-destructive/5 text-destructive rounded-full flex items-center justify-center shadow-inner relative group">
         <div className="absolute inset-0 bg-destructive/10 blur-3xl group-hover:scale-150 transition-transform" />
         <AlertTriangle size={80} strokeWidth={1} className="relative z-10" />
      </div>

      <div className="space-y-4">
        <h1 className="text-6xl font-black tracking-tighter uppercase italic text-destructive">System <span className="text-foreground not-italic tracking-normal lowercase font-normal italic">Interruption</span></h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto font-medium leading-relaxed">
          The culinary engine encountered an unexpected exception while synchronizing the gallery.
        </p>
      </div>

      <div className="flex gap-6">
        <Button 
          onClick={() => reset()} 
          className="h-16 px-12 rounded-3xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw size={18} className="mr-3" /> Retry Sync
        </Button>
        <Link href="/">
          <Button variant="outline" className="h-16 px-10 rounded-3xl border-2 font-black uppercase tracking-widest text-sm hover:bg-background/80">
            <Home size={18} className="mr-3" /> Abort To Home
          </Button>
        </Link>
      </div>

      <div className="pt-10 border-t border-dashed w-full max-w-sm">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">Error Trace ID</p>
         <p className="text-[10px] font-mono opacity-60 truncate">{error.digest || "CORE_UNCAUGHT_EXCEPTION_0x8402"}</p>
      </div>
    </div>
  );
}
