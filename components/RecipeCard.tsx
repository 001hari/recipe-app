"use client";

import { Recipe } from "@/types/recipe";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";

interface Props {
  recipe: Recipe;
  variant: "public" | "manage";
}

export default function RecipeCard({ recipe, variant }: Props) {
  const dispatch = useAppDispatch();
  const savedIds = useAppSelector((s) => s.cookbook.savedIds);

  const isSaved = savedIds.includes(recipe.id);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="font-bold text-lg">{recipe.title}</h2>

        <div className="flex gap-2 mt-2">
          <Badge>{recipe.category}</Badge>
          <Badge>{recipe.difficulty}</Badge>
        </div>

        <p className="mt-2 text-sm">
          ⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
        </p>

        <p>⭐ {recipe.rating}</p>

        <button
          className="mt-2 border px-2"
          onClick={() =>
            isSaved
              ? dispatch(unsaveRecipe(recipe.id))
              : dispatch(saveRecipe(recipe.id))
          }
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </CardContent>
    </Card>
  );
}