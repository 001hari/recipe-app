
import { Recipe } from '@/types/recipe';
import RecipesBrowseClient from '@/components/RecipesBrowseClient';
import { getBaseUrl } from '@/lib/utils';

async function getRecipes(): Promise<Recipe[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/recipes?published=true`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function RecipesPage() {
  const initialRecipes = await getRecipes();

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <RecipesBrowseClient initialRecipes={initialRecipes} />
    </div>
  );
}