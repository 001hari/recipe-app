import { NextRequest, NextResponse } from "next/server";
import { getRecipes, setRecipes } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/utils";
import { UpdateRecipeInput } from "@/types/api";

// GET /api/recipes/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const recipes = getRecipes();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}

// PUT /api/recipes/[id]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body: UpdateRecipeInput = await req.json();

  const recipes = getRecipes();
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existing = recipes[index];

  let slug = existing.slug;

  if (body.title && body.title !== existing.title) {
    slug = generateUniqueSlug(
      body.title,
      recipes.map((r) => r.slug)
    );
  }

  const updated = {
    ...existing,
    ...body,
    slug,
    updatedAt: new Date().toISOString(),
  };

  recipes[index] = updated;
  setRecipes(recipes);

  return NextResponse.json(updated);
}

// DELETE /api/recipes/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const recipes = getRecipes();

  const filtered = recipes.filter((r) => r.id !== id);

  setRecipes(filtered);

  return NextResponse.json({ success: true });
}