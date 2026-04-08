
import { notFound } from 'next/navigation';
import { Recipe } from '@/types/recipe';
import RecipeDetailClient from '@/components/RecipeDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getRecipe(slug: string): Promise<Recipe | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/recipes?slug=${slug}&published=true`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const recipes = await res.json();
  return recipes[0] || null;
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <RecipeDetailClient recipe={recipe} />
    </div>
  );
}