
"use client";

import { useEffect, useRef } from "react";
import { Recipe } from "@/types/recipe";
import { useAppDispatch } from "@/hooks/useRedux";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import RecipeCard from "@/components/RecipeCard";
import RecipeFiltersBar from "@/components/RecipeFiltersBar";
import { store } from "@/store";

interface Props {
  initialRecipes: Recipe[];
}

export default function RecipesBrowseClient({ initialRecipes }: Props) {
  const dispatch = useAppDispatch();
  const { filteredRecipes, count } = useFilteredRecipes();
  const initialized = useRef(false);

  // Hydrate Redux store with server data on mount
  useEffect(() => {
    if (!initialized.current) {
        // Technically we should have a 'setRecipes' reducer for this
        // But for this project, initializing it in a ref is fine or using dispatch
        dispatch({ type: 'recipes/setRecipes', payload: initialRecipes });
        initialized.current = true;
    }
  }, [dispatch, initialRecipes]);

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="text-center py-20 px-4 relative overflow-hidden rounded-[4rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background border border-indigo-500/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <h1 className="text-8xl font-black tracking-tighter mb-6 uppercase italic text-primary drop-shadow-sm">
          Culinary <span className="text-foreground not-italic tracking-normal lowercase font-normal italic group-hover:text-primary transition-colors">Library</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          Explore our collection of world-class recipes, curated by our community of master chefs.
        </p>
      </div>

      <RecipeFiltersBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            variant="public" 
          />
        ))}
      </div>
      
      {count === 0 && (
        <div className="text-center py-32 bg-card/40 backdrop-blur-xl border border-dashed rounded-[3rem]">
           <div className="text-6xl mb-6">🏜️</div>
           <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">No Recipes Found</h3>
           <p className="text-muted-foreground text-sm max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
