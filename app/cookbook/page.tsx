"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchRecipes } from "@/store/recipeSlice";
import RecipeCard from "@/components/RecipeCard";

export default function CookbookPage() {
  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector((s) => s.recipes);
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const savedRecipes = recipes.filter((r) =>
    savedIds.includes(r.id)
  );

  return (
    <div>
      <h1 className="text-xl font-bold">My Cookbook</h1>

      {savedRecipes.length === 0 && <p>No saved recipes</p>}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {savedRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} variant="public" />
        ))}
      </div>
    </div>
  );
}