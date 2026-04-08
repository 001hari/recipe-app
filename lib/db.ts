import { Recipe } from "@/types/recipe";

let recipes: Recipe[] = [];

export function getRecipes() {
  return recipes;
}

export function setRecipes(newRecipes: Recipe[]) {
  recipes = newRecipes;
}