"use client";

import { Nutrition } from "@/types/recipe";

interface Props {
  nutrition: Nutrition;
  multiplier?: number;
}

export default function NutritionPanel({
  nutrition,
  multiplier = 1,
}: Props) {
  return (
    <div className="border p-4 mt-4">
      <p>Calories: {nutrition.calories * multiplier}</p>
      <p>Protein: {nutrition.proteinG * multiplier}g</p>
      <p>Carbs: {nutrition.carbsG * multiplier}g</p>
      <p>Fat: {nutrition.fatG * multiplier}g</p>
      <p>Fiber: {nutrition.fiberG * multiplier}g</p>
    </div>
  );
}