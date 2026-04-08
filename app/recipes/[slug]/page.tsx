"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchRecipes } from "@/store/recipeSlice";
import IngredientRow from "@/components/IngredientRow";
import StepCard from "@/components/StepCard";

export default function RecipeDetailPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector((s) => s.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return <p>Not Found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{recipe.title}</h1>

      <p>{recipe.description}</p>

      <h2 className="mt-4 font-semibold">Ingredients</h2>
      {recipe.ingredients.map((ing) => (
        <IngredientRow key={ing.id} ingredient={ing} />
      ))}

      <h2 className="mt-4 font-semibold">Steps</h2>
      {recipe.steps.map((step) => (
        <StepCard key={step.stepNumber} step={step} />
      ))}
    </div>
  );
}