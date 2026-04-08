
"use client";

import { Recipe } from "@/types/recipe";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { deleteRecipe } from "@/store/recipeSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Star, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  recipe: Recipe;
  variant: "public" | "manage";
  onEdit?: (recipe: Recipe) => void;
  className?: string;
}

export default function RecipeCard({ recipe, variant, onEdit, className }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);
  const isSaved = savedIds.includes(recipe.id);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      dispatch(unsaveRecipe(recipe.id));
    } else {
      dispatch(saveRecipe(recipe.id));
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(recipe.id));
    }
  };

  return (
    <div className={cn(
      "group relative bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300",
      className
    )}>
      <Link href={`/recipes/${recipe.slug}`} className="block h-full">
        {/* IMAGE SECTION */}
        <div className="relative h-56 overflow-hidden bg-muted/20">
          {recipe.coverImageUrl ? (
            <Image 
              src={recipe.coverImageUrl} 
              alt={recipe.title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-black text-4xl uppercase tracking-tighter opacity-5 italic">
               No Media
            </div>
          )}
          
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute top-4 left-4 flex justify-between items-start right-4">
             <Badge className="bg-white/90 backdrop-blur-sm border-0 text-primary font-black px-3 py-1 uppercase tracking-wider text-[8px] shadow-sm">
               {recipe.category}
             </Badge>

             {variant === 'public' && (
               <Button 
                variant="secondary" 
                size="icon" 
                onClick={handleToggleSave}
                className={cn(
                  "rounded-xl w-9 h-9 backdrop-blur-md transition-all active:scale-95",
                  isSaved ? "bg-rose-500 text-white" : "bg-white/80 hover:bg-white text-muted-foreground"
                )}
               >
                 <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
               </Button>
             )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg w-fit">
               <span className="flex items-center gap-1.5"><Clock size={12} /> {totalTime}m</span>
               <span className="flex items-center gap-1.5"><Star size={12} fill="currentColor" /> {recipe.rating}</span>
             </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2 gap-4">
             <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-1">
               {recipe.title}
             </h3>
             <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-[8px] font-black uppercase tracking-widest rounded-lg shrink-0">
               {recipe.difficulty}
             </Badge>
          </div>
          
          <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed h-8 mb-4">
            {recipe.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
             {recipe.dietaryTags.slice(0, 3).map(tag => (
               <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                 {tag}
               </span>
             ))}
          </div>

          {/* MANAGE ACTIONS */}
          {variant === "manage" && (
            <div className="mt-6 pt-4 border-t border-dashed flex gap-2">
               <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-xl h-10 border font-bold uppercase tracking-widest text-[9px]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/manage/${recipe.id}/edit`);
                }}
               >
                 <Edit size={12} className="mr-2" /> Modify
               </Button>
               <Button 
                variant="outline" 
                size="sm"
                className="rounded-xl w-10 h-10 border text-destructive hover:bg-destructive/10 shrink-0"
                onClick={handleDelete}
               >
                 <Trash2 size={14} />
               </Button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
