import { Recipe, Ingredient, Nutrition } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";

export function useRecipeScaler(recipe: Recipe, multiplier: number) {
  const { scaleIngredient } = useCooking();

  const scaledIngredients: Ingredient[] = recipe.ingredients.map((ing) => ({
    ...ing,
    quantity: scaleIngredient(ing.quantity * multiplier),
  }));

  const scaledServings = recipe.servings * multiplier;

  let scaledNutrition: Nutrition | undefined = undefined;

  if (recipe.nutrition) {
    scaledNutrition = {
      calories: recipe.nutrition.calories * multiplier,
      proteinG: recipe.nutrition.proteinG * multiplier,
      carbsG: recipe.nutrition.carbsG * multiplier,
      fatG: recipe.nutrition.fatG * multiplier,
      fiberG: recipe.nutrition.fiberG * multiplier,
    };
  }

  return {
    scaledIngredients,
    scaledServings,
    scaledNutrition,
  };
}