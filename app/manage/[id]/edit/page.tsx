
"use client";

import { useRecipeForm } from "@/hooks/useRecipeForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { editRecipe, fetchRecipes } from "@/store/recipeSlice";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import IngredientRow from "@/components/IngredientRow";
import StepCard from "@/components/StepCard";
import { Save, ArrowLeft, Info, ListOrdered, Salad, Microscope, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { DietaryTag, Difficulty } from "@/types/recipe";
import { useState, useEffect } from "react";

const DIETARY_TAGS: DietaryTag[] = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "dairy-free",
  "keto",
  "paleo",
  "nut-free",
];

export default function EditRecipePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();
  const [showNutrition, setShowNutrition] = useState(false);
  const { recipes } = useAppSelector(s => s.recipes);
  
  const recipe = recipes.find(r => r.id === id);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addStep,
    updateStep,
    removeStep,
    moveStep,
    reset
  } = useRecipeForm(recipe || {});

  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipes());
    } else {
        reset();
    }
  }, [recipe, dispatch]);

  const handleUpdate = async () => {
    handleSubmit(async (data) => {
      try {
        await dispatch(editRecipe({ id: id as string, data: { ...data, published: true } as any })).unwrap();
        router.push("/manage");
      } catch (err) {
        console.error("Failed to update recipe:", err);
      }
    });
  };

  if (!recipe) return <div className="p-20 text-center animate-pulse text-[10px] items-center font-black uppercase tracking-widest text-muted-foreground">Calibrating Archive...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER */}
      <div className="flex items-end justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic flex items-center gap-3">
            Modify <span className="text-primary">Entry</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1 opacity-60">Updating: {recipe.title}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl px-6 font-bold uppercase tracking-widest text-[10px]">
             Discard
          </Button>
          <Button onClick={handleUpdate} className="rounded-xl px-8 bg-primary font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
             Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        {/* CORE INFO */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-primary rounded-full" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Core Manifest</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 md:col-span-2">
               <Input
                 placeholder="Recipe Title"
                 value={values.title}
                 onChange={(e) => handleChange("title", e.target.value)}
                 className={cn(
                   "h-12 text-lg font-bold rounded-xl border px-4 bg-muted/20",
                   errors.title && "border-destructive ring-destructive/10"
                 )}
               />
               {errors.title && <p className="text-[10px] text-destructive font-bold px-2 uppercase tracking-wide">{errors.title}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Archive Media Entry (URL)</label>
               <Input
                 placeholder="https://images.unsplash.com/..."
                 value={values.coverImageUrl}
                 onChange={(e) => handleChange("coverImageUrl", e.target.value)}
                 className="h-10 rounded-xl bg-muted/20 focus:bg-background"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</label>
               <Input
                  value={values.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="h-10 rounded-xl bg-muted/20"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Expertise Index</label>
               <div className="flex gap-1 p-1 bg-muted/20 rounded-xl border">
                  {["easy", "medium", "hard"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleChange("difficulty", d as Difficulty)}
                      className={cn(
                        "flex-1 h-8 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        values.difficulty === d ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background/40"
                      )}
                    >
                      {d}
                    </button>
                  ))}
               </div>
            </div>

            <div className="md:col-span-2 space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Contextual Description</label>
               <Textarea
                 value={values.description}
                 onChange={(e) => handleChange("description", e.target.value)}
                 className="min-h-[100px] rounded-xl bg-muted/20 p-4 text-sm leading-relaxed"
               />
            </div>
          </div>
        </section>

        {/* TIME & SERVINGS */}
        <section className="bg-muted/30 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-2 text-center">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Servings</label>
              <Input type="number" value={values.servings} onChange={(e) => handleChange("servings", Number(e.target.value))} className="h-10 text-center font-bold text-lg rounded-xl" />
           </div>
           <div className="space-y-2 text-center">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Prep (M)</label>
              <Input type="number" value={values.prepTimeMinutes} onChange={(e) => handleChange("prepTimeMinutes", Number(e.target.value))} className="h-10 text-center font-bold text-lg rounded-xl" />
           </div>
           <div className="space-y-2 text-center">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cook (M)</label>
              <Input type="number" value={values.cookTimeMinutes} onChange={(e) => handleChange("cookTimeMinutes", Number(e.target.value))} className="h-10 text-center font-bold text-lg rounded-xl" />
           </div>
        </section>

        {/* DIETARY TAGS */}
        <section className="space-y-4">
           <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Dietary Markers</h2>
           </div>
           <div className="flex flex-wrap gap-2">
              {DIETARY_TAGS.map((tag) => (
                 <Badge
                    key={tag}
                    onClick={() => {
                      const current = values.dietaryTags || [];
                      const next = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
                      handleChange("dietaryTags", next);
                    }}
                    className={cn(
                      "cursor-pointer px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      values.dietaryTags?.includes(tag) 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                 >
                    {tag}
                 </Badge>
              ))}
           </div>
        </section>

        {/* COMPONENTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
           <section className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Reagents</h2>
                 </div>
                 <Button variant="outline" size="sm" onClick={addIngredient} className="h-7 rounded-lg text-[8px] uppercase tracking-widest font-black">
                     Update List
                 </Button>
              </div>
              <div className="space-y-2">
                {values.ingredients?.map((ing, i) => (
                  <IngredientRow
                    key={ing.id}
                    ingredient={ing}
                    index={i}
                    editable={true}
                    onChange={updateIngredient}
                    onRemove={removeIngredient}
                    canRemove={(values.ingredients?.length || 0) > 1}
                  />
                ))}
              </div>
           </section>

           <section className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Phasing</h2>
                 </div>
                 <Button variant="outline" size="sm" onClick={addStep} className="h-7 rounded-lg text-[8px] uppercase tracking-widest font-black">
                     Extend Steps
                 </Button>
              </div>
              <div className="space-y-3">
                {values.steps?.map((step, i) => (
                  <StepCard
                    key={step.stepNumber}
                    step={step}
                    index={i}
                    editable={true}
                    onChange={updateStep}
                    onRemove={removeStep}
                    onMoveUp={() => moveStep(i, i - 1)}
                    onMoveDown={() => moveStep(i, i + 1)}
                    isFirst={i === 0}
                    isLast={i === (values.steps?.length || 0) - 1}
                  />
                ))}
              </div>
           </section>
        </div>
        
        {/* NUTRITION DRAWER */}
        <section className="border-t pt-10">
           <button 
             onClick={() => setShowNutrition(!showNutrition)}
             className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors mb-4"
           >
              {showNutrition ? "[-]" : "[+]"} Edit Macro Statistics
           </button>

           {showNutrition && (
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-muted/20 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
                {['calories', 'proteinG', 'carbsG', 'fatG', 'fiberG'].map(k => (
                    <div key={k} className="space-y-1">
                        <label className="text-[8px] font-bold uppercase tracking-wider opacity-60 ml-1">{k.replace('G', '').toUpperCase()}</label>
                        <Input type="number" placeholder="0" value={(values.nutrition as any)?.[k] || ""} onChange={(e) => handleChange("nutrition", {...values.nutrition, [k]: Number(e.target.value)})} className="h-9 rounded-lg text-center text-sm" />
                    </div>
                ))}
             </div>
           )}
        </section>

        {/* FINAL BUTTONS */}
        <div className="pt-20 pb-40 flex justify-center">
           <Button 
            onClick={handleUpdate} 
            className="rounded-2xl h-16 px-16 bg-primary text-primary-foreground font-black uppercase tracking-[.2em] text-xs transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 group"
          >
             Commit Updates <Microscope size={18} className="ml-3 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
