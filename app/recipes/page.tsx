"use client";

import { useEffect } from "react";
import { fetchRecipes } from "@/store/recipeSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import RecipeCard from "@/components/RecipeCard";
import RecipeFiltersBar from "@/components/RecipeFiltersBar";

export default function RecipesPage() {
  const dispatch = useAppDispatch();
  const { filteredRecipes } = useFilteredRecipes();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-xl font-bold">Browse Recipes</h1>

      <RecipeFiltersBar />

      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} variant="public" />
        ))}
      </div>
    </div>
  );
}