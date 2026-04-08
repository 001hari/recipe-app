"use client";

import { Ingredient } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";

interface Props {
  ingredient: Ingredient;
}

export default function IngredientRow({ ingredient }: Props) {
  const { scaleIngredient } = useCooking();

  return (
    <div className="flex justify-between border p-2">
      <span>{ingredient.name}</span>
      <span>
        {scaleIngredient(ingredient.quantity)} {ingredient.unit}
      </span>
    </div>
  );
}