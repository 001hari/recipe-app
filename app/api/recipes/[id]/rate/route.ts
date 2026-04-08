import { NextRequest, NextResponse } from "next/server";
import { getRecipes, setRecipes } from "@/lib/db";
import { RateRecipeInput } from "@/types/api";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body: RateRecipeInput = await req.json();
  console.log('hello')
  if (body.rating < 1 || body.rating > 5) {
    return NextResponse.json(
      { error: "Rating must be 1–5" },
      { status: 400 }
    );
  }
  console.log((await params).id)
  const {id} = await params
  const recipes = getRecipes();
  const index = recipes.findIndex((r) => r.id === id);
  console.log(recipes);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const recipe = recipes[index];

  const totalRating = recipe.rating * recipe.ratingCount + body.rating;
  const newCount = recipe.ratingCount + 1;
  const newRating = totalRating / newCount;

  const updated = {
    ...recipe,
    rating: Number(newRating.toFixed(2)),
    ratingCount: newCount,
  };

  recipes[index] = updated;
  setRecipes(recipes);

  return NextResponse.json({
    rating: updated.rating,
    ratingCount: updated.ratingCount,
  });
}