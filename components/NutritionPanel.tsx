
"use client";

import { Nutrition } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface NutritionPanelProps {
  nutrition: Nutrition;
  servingMultiplier?: number;
  className?: string;
}

export default function NutritionPanel({
  nutrition,
  servingMultiplier = 1,
  className,
}: NutritionPanelProps) {
  const scaled = {
    calories: Math.round((nutrition?.calories || 0) * servingMultiplier),
    proteinG: Number(((nutrition?.proteinG || 0) * servingMultiplier).toFixed(1)),
    carbsG: Number(((nutrition?.carbsG || 0) * servingMultiplier).toFixed(1)),
    fatG: Number(((nutrition?.fatG || 0) * servingMultiplier).toFixed(1)),
    fiberG: Number(((nutrition?.fiberG || 0) * servingMultiplier).toFixed(1)),
  };

  const MacroBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
    const ratio = scaled.calories > 0 
      ? Math.min((value * (label === "Fat" ? 9 : 4)) / scaled.calories, 1) 
      : 0;
    
    return (
      <div className="mb-3 last:mb-0">
        <div className="flex justify-between text-xs mb-1 font-medium italic uppercase tracking-wider">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-bold">{value}g</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", color)}
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={cn("bg-card border rounded-2xl p-6 shadow-sm relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 p-3 bg-primary/5 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest text-primary/30">
        Nutrition Analyst
      </div>
      
      <div className="mb-8 text-center">
        <div className="text-4xl font-black tracking-tighter text-primary">
          {scaled.calories || 0}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
          kcal Per Serving
        </div>
      </div>

      <div className="space-y-4">
        <MacroBar label="Protein" value={scaled.proteinG} color="bg-emerald-500" />
        <MacroBar label="Carbs" value={scaled.carbsG} color="bg-amber-500" />
        <MacroBar label="Fat" value={scaled.fatG} color="bg-rose-500" />
        <MacroBar label="Fiber" value={scaled.fiberG} color="bg-sky-500" />
      </div>

      <p className="mt-8 pt-4 border-t text-[8px] text-muted-foreground leading-relaxed italic text-center uppercase tracking-widest">
        * Estimates based on a standard reference intake.
      </p>
    </div>
  );
}