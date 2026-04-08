
"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setFilters, clearFilters } from "@/store/recipeSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DietaryTag, Difficulty } from "@/types/recipe";
import { Search, X, Filter, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";

const DIETARY_TAGS: DietaryTag[] = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "dairy-free",
  "keto",
  "paleo",
  "nut-free",
];

export default function RecipeFiltersBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.recipes.filters);
  const { categories, count } = useFilteredRecipes();

  const handleUpdate = (field: string, value: any) => {
    dispatch(setFilters({ ...filters, [field]: value }));
  };

  const handleTagToggle = (tag: DietaryTag) => {
    const next = filters.dietaryTags.includes(tag)
      ? filters.dietaryTags.filter((t) => t !== tag)
      : [...filters.dietaryTags, tag];
    handleUpdate("dietaryTags", next);
  };

  const activeFilterCount = [
    filters.category,
    filters.difficulty !== "all",
    filters.search,
    filters.maxCookTime !== null,
    filters.dietaryTags.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="bg-card/40 backdrop-blur-3xl border-2 border-background/50 rounded-[3rem] p-8 shadow-2xl space-y-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 bg-primary/5 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest text-primary/40">
        Filter Engine
      </div>
      
      {/* SEARCH ROW */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group/search">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors" size={22} />
          <Input
            placeholder="Search recipes, ingredients, or keywords..."
            value={filters.search}
            onChange={(e) => handleUpdate("search", e.target.value)}
            className="pl-14 h-16 rounded-3xl border-2 border-background shadow-inner text-lg font-medium transition-all focus:ring-4 focus:ring-primary/10 hover:border-primary/20"
          />
        </div>
        
        <div className="flex gap-3">
           <Button 
            variant="outline" 
            onClick={() => dispatch(clearFilters())} 
            className="h-16 rounded-3xl px-10 border-2 font-bold uppercase tracking-widest text-xs hover:bg-destructive hover:text-destructive-foreground transition-all"
            disabled={activeFilterCount === 0}
           >
             <X size={16} className="mr-2" /> Clear All
           </Button>
           
           <div className="h-16 flex items-center bg-primary text-primary-foreground rounded-3xl px-8 font-black tracking-tight text-xl">
             {count} <span className="text-sm font-bold uppercase opacity-60 ml-2 tracking-widest">Recipes Found</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* DROPDOWNS */}
        <div className="space-y-6">
           <div>
             <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Categories</label>
             <select
               value={filters.category}
               onChange={(e) => handleUpdate("category", e.target.value)}
               className="w-full h-14 rounded-2xl border-2 border-background bg-card text-sm font-bold px-4 appearance-none hover:border-primary/20 transition-all outline-none"
             >
               <option value="">All Categories</option>
               {categories.map((c) => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
           </div>

           <div>
             <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Skill Level</label>
             <div className="flex gap-2 p-1.5 bg-background/50 rounded-2xl border shadow-inner">
               {["all", "easy", "medium", "hard"].map((d) => (
                 <button
                   key={d}
                   onClick={() => handleUpdate("difficulty", d)}
                   className={cn(
                     "flex-1 h-10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                     filters.difficulty === d ? "bg-primary text-primary-foreground shadow-lg scale-105" : "hover:bg-background/80"
                   )}
                 >
                   {d}
                 </button>
               ))}
             </div>
           </div>
        </div>

        {/* DIETARY TAGS */}
        <div className="flex-1">
           <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Dietary Preferences</label>
           <div className="flex flex-wrap gap-2 pt-2">
             {DIETARY_TAGS.map((tag) => (
               <Badge
                 key={tag}
                 onClick={() => handleTagToggle(tag)}
                 className={cn(
                   "cursor-pointer px-4 py-2 text-[10px] uppercase font-black transition-all border-2",
                   filters.dietaryTags.includes(tag) 
                     ? "bg-primary border-primary text-primary-foreground scale-105 shadow-md"
                     : "bg-background/40 border-background shadow-inner hover:bg-background hover:border-primary/20"
                 )}
                 variant="outline"
               >
                 {tag}
               </Badge>
             ))}
           </div>
        </div>

        {/* SLIDER / MAX TIME */}
        <div>
           <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block flex justify-between items-center">
             <span>Max Prep+Cook Time</span>
             <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg">{filters.maxCookTime || 0}m</span>
           </label>
           <div className="space-y-6 pt-4">
              <input 
                type="range"
                min="0"
                max="120"
                step="5"
                value={filters.maxCookTime || 0}
                onChange={(e) => handleUpdate("maxCookTime", Number(e.target.value) || null)}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary border-2 border-background shadow-inner"
              />
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                <span>Instantly</span>
                <span>2 Hours+</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}