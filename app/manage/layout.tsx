
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle, ChefHat, ExternalLink, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

export default function ManageLayout({ children }: Props) {
  const pathname = usePathname();

  const navItems = [
    { label: "My Recipes", href: "/manage", icon: ChefHat },
    { label: "Create New", href: "/manage/create", icon: PlusCircle },
  ];

  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-background to-background animate-in fade-in duration-1000">
      {/* SIDEBAR */}
      <aside className="w-80 border-r-2 border-background/50 bg-card/40 backdrop-blur-3xl sticky top-0 h-screen p-10 flex flex-col shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 bg-primary/5 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest text-primary/40">
           Chef Dashboard
        </div>
        
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                < ChefHat size={28} strokeWidth={2.5} />
             </div>
             <div>
                <h2 className="text-2xl font-black tracking-tight leading-none">Chef <span className="text-primary italic">Console</span></h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 opacity-60">Manage Your Creations</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all group/item",
                pathname === item.href
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105"
                  : "hover:bg-background/80 hover:scale-102"
              )}
            >
              <item.icon size={20} strokeWidth={pathname === item.href ? 2.5 : 2} className={cn(
                "transition-transform",
                pathname === item.href ? "" : "group-hover/item:rotate-12"
              )} />
              {item.label}
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            onClick={async () => {
              await fetch('/api/auth', { method: 'DELETE' });
              window.location.href = '/recipes';
            }}
            className="w-full justify-start gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-destructive hover:bg-destructive/5 mt-4"
          >
             Sign Out Session
          </Button>
          
          <div className="pt-10 border-t border-dashed mt-10 space-y-4">
             <Link 
              href="/recipes" 
              className="flex items-center gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
             >
               <ExternalLink size={14} /> View Public Gallery
             </Link>
             <div className="flex items-center gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-30 cursor-not-allowed">
               <Settings size={14} /> My Settings (PRO)
             </div>
          </div>
        </nav>

        <div className="mt-auto p-6 bg-primary/5 rounded-3xl border border-primary/10 relative overflow-hidden group/upgrade">
           <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 blur-3xl group-hover:upgrade:scale-150 transition-transform" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-primary/60">System Status</p>
           <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-xs font-bold">Chef Node ACTIVE</span>
           </div>
           <p className="text-[9px] text-muted-foreground">Version 4.0.0 Alpha Professional</p>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-16 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
