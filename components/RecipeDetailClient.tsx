
"use client";

import { Recipe } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { rateRecipe } from "@/store/recipeSlice";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import IngredientRow from "./IngredientRow";
import StepCard from "./StepCard";
import NutritionPanel from "./NutritionPanel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, Star, Clock, Users, ChevronLeft, ChevronRight, Scale, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Props {
  recipe: Recipe;
}

export default function RecipeDetailClient({ recipe }: Props) {
  const { 
    servingMultiplier, 
    setServingMultiplier, 
    unitSystem, 
    setUnitSystem, 
    toggleTheme, 
    theme 
  } = useCooking();
  
  const dispatch = useAppDispatch();
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);
  const isSaved = savedIds.includes(recipe.id);

  const [isCooking, setIsCooking] = useState(false);
  const [cookingTime, setCookingTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCooking) {
      interval = setInterval(() => {
        setCookingTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCooking]);

  const formatCookingTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRate = (rating: number) => {
    dispatch(rateRecipe({ id: recipe.id, rating }));
  };

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="space-y-8 pb-32">
       {/* FLOATING TIMER OVERLAY */}
       {isCooking && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
           <div className="bg-primary px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-6 border-4 border-white/20 backdrop-blur-3xl">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/60">Cooking Session</span>
                <span className="text-2xl font-black text-white tabular-nums font-mono">{formatCookingTime(cookingTime)}</span>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <Button 
                onClick={() => setIsCooking(false)}
                variant="ghost" 
                className="rounded-xl text-white hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest px-4"
              >
                End Session
              </Button>
           </div>
        </div>
      )}

      {/* HEADER SECTION - SIMPLIFIED */}
      <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-lg border-4 border-background/50">
        {recipe.coverImageUrl ? (
          <Image 
            src={recipe.coverImageUrl} 
            alt={recipe.title} 
            fill 
            className="object-cover transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full text-white">
          <div className="flex gap-2 mb-3">
            {recipe.dietaryTags.map((tag) => (
              <Badge key={tag} className="bg-white/10 backdrop-blur-md border-0 text-white font-bold px-3 py-1 uppercase tracking-wider text-[8px]">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            {recipe.title}
          </h1>
          <p className="text-sm opacity-80 max-w-xl leading-relaxed">
            {recipe.description}
          </p>
        </div>

        
        <div className="absolute top-8 right-8 flex gap-3">
          <Button 
            variant="secondary" 
            size="icon" 
            className={cn(
              "rounded-2xl w-14 h-14 backdrop-blur-xl border-white/20 transition-all hover:scale-110",
              isSaved ? "bg-rose-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
            )}
            onClick={() => isSaved ? dispatch(unsaveRecipe(recipe.id)) : dispatch(saveRecipe(recipe.id))}
          >
            <Heart size={28} fill={isSaved ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      {/* META INFO & CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-wrap gap-8 p-10 bg-card/60 backdrop-blur-xl border rounded-[3rem] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 bg-primary/5 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest text-primary/40">
            Recipe Info
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-default">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
              <Star size={32} />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black tracking-tight">{recipe.rating}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{recipe.ratingCount} Ratings</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-default">
            <div className="w-16 h-16 rounded-3xl bg-sky-500/10 text-sky-500 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
              <Clock size={32} />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black tracking-tight">{totalTime}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Mins</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-default border-r pr-8 mr-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
              <Users size={32} />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black tracking-tight">{Math.round(recipe.servings * servingMultiplier)}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Servings</div>
            </div>
          </div>

          {/* CONTROLS AREA */}
          <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
             <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">Adjust Servings</span>
                  <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl border">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setServingMultiplier(Math.max(0.5, servingMultiplier - 0.5))}
                      className="rounded-xl w-10 h-10 hover:bg-background shadow-none"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <span className="text-lg font-black w-8 text-center">{servingMultiplier}x</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setServingMultiplier(servingMultiplier + 0.5)}
                      className="rounded-xl w-10 h-10 hover:bg-background shadow-none"
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => {
                        setIsCooking(true);
                        document.getElementById('preparation-guide')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={cn(
                        "h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl transition-all",
                        isCooking 
                          ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-primary text-primary-foreground shadow-primary/20 hover:scale-105 active:scale-95"
                      )}
                    >
                       {isCooking ? "Cooking Enabled" : "Start Cooking Session"}
                       <ChevronRight size={18} className={cn("ml-2", isCooking && "animate-spin")} />
                    </Button>
                    {isCooking && (
                        <p className="text-[8px] text-center font-black uppercase text-emerald-500 tracking-[0.2em] animate-pulse">Session Active</p>
                    )}
                </div>

                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">Unit System</span>
                  <div className="flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border">
                    <Button 
                      variant={unitSystem === 'metric' ? 'secondary' : 'ghost'} 
                      size="sm"
                      onClick={() => setUnitSystem('metric')}
                      className="rounded-xl gap-2 font-bold px-4 hover:bg-background shadow-none"
                    >
                      <Globe size={14} /> Metric
                    </Button>
                    <Button 
                      variant={unitSystem === 'imperial' ? 'secondary' : 'ghost'} 
                      size="sm"
                      onClick={() => setUnitSystem('imperial')}
                      className="rounded-xl gap-2 font-bold px-4 hover:bg-background shadow-none"
                    >
                      <Scale size={14} /> Imperial
                    </Button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4">
           {recipe.nutrition && (
             <NutritionPanel nutrition={recipe.nutrition} servingMultiplier={servingMultiplier} />
           )}
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* INGREDIENTS */}
        <div className="lg:col-span-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-primary">Ingredients</h2>
            <Badge variant="outline" className="rounded-full font-mono text-xs">{recipe.ingredients.length} Items</Badge>
          </div>
          <div className="space-y-1 bg-card/60 backdrop-blur-xl border rounded-[2rem] p-8 shadow-inner overflow-hidden">
            {recipe.ingredients.map((ing, i) => (
              <IngredientRow 
                key={ing.id} 
                ingredient={ing} 
                index={i} 
                scaled={true} 
              />
            ))}
          </div>
        </div>

        {/* STEPS */}
        <div className="lg:col-span-8" id="preparation-guide">
          <div className="mb-8 flex items-center justify-between">
             <h2 className="text-3xl font-black tracking-tighter uppercase italic text-primary">Preparation Guide</h2>
             <Badge variant="outline" className="rounded-full font-mono text-xs">{recipe.steps.length} Phases</Badge>
          </div>
          <div className="space-y-6">
            {recipe.steps.map((step, i) => (
              <StepCard 
                key={`step-${step.stepNumber}-${i}`} 
                step={step} 
                index={i} 
              />
            ))}
          </div>
          
          {/* RATING SECTION */}
          <div className="mt-20 pt-16 border-t border-dashed">
            <div className="text-center max-w-xl mx-auto space-y-8">
               <div>
                 <h3 className="text-2xl font-black tracking-tight mb-2 uppercase italic">Rate This Recipe</h3>
                 <p className="text-muted-foreground text-sm">Tell other food lovers what you think of this creation!</p>
               </div>
               <div className="flex justify-center gap-3">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                     key={star} 
                     onClick={() => handleRate(star)}
                     className="w-16 h-16 rounded-2xl bg-muted/60 border hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl"
                   >
                     <Star fill={star <= (recipe.rating || 0) ? "currentColor" : "none"} strokeWidth={2} />
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
