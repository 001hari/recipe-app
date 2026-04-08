
"use client";

import { Ingredient, MeasurementUnit } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  scaled?: boolean;
  editable?: boolean;
  onChange?: (
    index: number,
    field: keyof Ingredient,
    value: string | number | boolean
  ) => void;
  onRemove?: (index: number) => void;
  canRemove?: boolean;
  className?: string;
}

export default function IngredientRow({
  ingredient,
  index,
  scaled = false,
  editable = false,
  onChange,
  onRemove,
  canRemove = true,
  className,
}: IngredientRowProps) {
  const { scaleIngredient, convertUnit, unitSystem } = useCooking();

  const displayQty = scaled
    ? scaleIngredient(ingredient.quantity)
    : ingredient.quantity;

  const displayUnit = convertUnit(displayQty, ingredient.unit);

  if (!editable) {
    return (
      <div
        className={cn(
          "flex items-center justify-between py-2 border-b last:border-0",
          className
        )}
      >
        <span className="flex-1 font-medium">{ingredient.name}</span>
        <span className="text-muted-foreground bg-accent/30 px-2 py-0.5 rounded text-sm">
          {displayUnit}
        </span>
        {ingredient.optional && (
          <span className="ml-2 text-xs text-muted-foreground italic">
            (Optional)
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-3 items-end mb-4", className)}>
      <div className="flex-1 min-w-[200px]">
        <label className="text-xs font-semibold uppercase mb-1 block">Name</label>
        <Input
          value={ingredient.name}
          onChange={(e) => onChange?.(index, "name", e.target.value)}
          placeholder="Ingredient name"
        />
      </div>

      <div className="w-20">
        <label className="text-xs font-semibold uppercase mb-1 block">Qty</label>
        <Input
          type="number"
          value={ingredient.quantity === 0 ? "" : ingredient.quantity}
          onChange={(e) => onChange?.(index, "quantity", e.target.value === "" ? 0 : Number(e.target.value))}
          placeholder="0"
          className="h-10 text-center font-bold text-sm bg-muted/20"
        />
      </div>

      <div className="w-24">
        <label className="text-xs font-semibold uppercase mb-1 block">Unit</label>
        <select
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={ingredient.unit}
          onChange={(e) =>
            onChange?.(index, "unit", e.target.value as MeasurementUnit)
          }
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
          <option value="cup">cup</option>
          <option value="piece">piece</option>
        </select>
      </div>

      <div className="flex items-center gap-2 mb-2 pb-1">
        <Checkbox
          id={`optional-${index}`}
          checked={ingredient.optional}
          onCheckedChange={(val) => onChange?.(index, "optional", !!val)}
        />
        <label htmlFor={`optional-${index}`} className="text-sm cursor-pointer">
          Optional
        </label>
      </div>

      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove?.(index)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 mb-1"
        >
          <Trash2 size={18} />
        </Button>
      )}
    </div>
  );
}