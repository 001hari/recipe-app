
"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchRecipes } from "@/store/recipeSlice";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Heart, ChefHat, Salad, Layers, ExternalLink, Bookmark } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CookbookPage() {
  const { recipes, status } = useAppSelector((s) => s.recipes);
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const savedRecipes = recipes.filter((r) => savedIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-16 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="text-center py-24 px-4 relative overflow-hidden rounded-[4rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/10 via-background to-background border border-rose-500/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-rose-500/5 blur-[120px] rounded-full -z-10" />
        <div className="inline-flex items-center gap-3 bg-rose-500/10 text-rose-500 px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px] mb-8 shadow-sm">
           <Bookmark size={14} className="fill-current" /> My Personal Cookbook
        </div>
        <h1 className="text-8xl font-black tracking-tighter mb-6 uppercase italic text-rose-500 drop-shadow-sm">
          Saved <span className="text-foreground not-italic tracking-normal lowercase font-normal italic">Gallery</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          Your curated selection of flavors and techniques. All the recipes you want to revisit and perfect.
        </p>
      </div>

      {savedIds.length === 0 ? (
        <div className="text-center py-40 border-4 border-dashed border-rose-500/10 rounded-[4rem] group hover:border-rose-500/30 transition-colors">
           <div className="w-24 h-24 bg-rose-500/5 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
              <Heart size={48} strokeWidth={1} />
           </div>
           <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">Your cookbook is empty</h3>
           <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-10 leading-relaxed font-medium">Found something interesting? Tap the heart icon on any recipe to save it for later.</p>
           <Link href="/recipes">
             <Button className="rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/20">Explore Recipes</Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {savedRecipes.map((recipe) => (
             <RecipeCard 
               key={recipe.id} 
               recipe={recipe} 
               variant="public" 
             />
           ))}
        </div>
      )}
    </div>
  );
}