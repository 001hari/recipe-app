import { useAppSelector } from "@/hooks/useRedux";
import { Recipe } from "@/types/recipe";

export function useFilteredRecipes() {
  const { recipes, filters } = useAppSelector((s) => s.recipes);

  let filtered = [...recipes];

  if (filters.category) {
    filtered = filtered.filter((r) => r.category === filters.category);
  }

  if (filters.dietaryTags.length > 0) {
    filtered = filtered.filter((r) =>
      filters.dietaryTags.every((tag) =>
        r.dietaryTags.includes(tag)
      )
    );
  }

  if (filters.difficulty !== "all") {
    filtered = filtered.filter(
      (r) => r.difficulty === filters.difficulty
    );
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search)
    );
  }

  if (filters.maxCookTime !== null) {
    filtered = filtered.filter(
      (r) =>
        r.prepTimeMinutes + r.cookTimeMinutes <=
        filters.maxCookTime!
    );
  }

  if (filters.published !== null) {
    filtered = filtered.filter(
      (r) => r.published === filters.published
    );
  }

  const categories = Array.from(
    new Set(recipes.map((r) => r.category))
  );

  return {
    filteredRecipes: filtered,
    count: filtered.length,
    categories,
  };
}