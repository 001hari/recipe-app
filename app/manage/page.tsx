
"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchRecipes } from "@/store/recipeSlice";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Plus, ChefHat, Salad, Layers, ShieldCheck, FileEdit, BarChart3 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ManageDashboard() {
  const { recipes, status } = useAppSelector((s) => s.recipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const myRecipes = recipes; 

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      {/* SIMPLE ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-dashed">
         <div className="bg-card border rounded-2xl p-8 shadow-sm relative group overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-4 block flex items-center gap-2">
              <ChefHat size={14} className="text-primary" /> Recipe Inventory
            </h3>
            <div className="flex items-baseline gap-3">
               <span className="text-5xl font-black tracking-tighter">{myRecipes.length}</span>
               <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">Items Registered</span>
            </div>
         </div>

         <div className="bg-card border rounded-2xl p-8 shadow-sm relative group overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-4 block flex items-center gap-2">
              <BarChart3 size={14} className="text-emerald-500" /> Active Gallery
            </h3>
            <div className="flex items-baseline gap-3">
               <span className="text-5xl font-black tracking-tighter text-emerald-500">Live</span>
               <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">All Recipes Public</span>
            </div>
         </div>
      </div>

      {/* CONTENT LIST */}
      <div>
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-2xl font-black tracking-tighter uppercase italic text-primary">Master <span className="text-foreground not-italic tracking-normal lowercase font-normal italic">Gallery</span></h2>
           <Link href="/manage/create">
             <Button className="h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Plus size={16} className="mr-2" /> New Creation
             </Button>
           </Link>
        </div>

        {myRecipes.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed rounded-[2rem] group hover:border-primary/20 transition-colors">
             <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-tiny group-hover:scale-110 transition-transform">
                <ChefHat size={32} strokeWidth={1.5} />
             </div>
             <h3 className="text-xl font-black tracking-tight mb-2 uppercase">Your portfolio is empty</h3>
             <p className="text-muted-foreground text-[10px] max-w-xs mx-auto mb-8 leading-relaxed font-medium">Ready to share your culinary expertise with the world? Start your first masterpiece today.</p>
             <Link href="/manage/create">
               <Button className="rounded-xl px-10 h-11 font-black uppercase tracking-widest text-[9px] border">Create First Recipe</Button>
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} variant="manage" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}