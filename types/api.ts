import { Recipe } from "./recipe";

export type CreateRecipeInput = Omit<
  Recipe,
  | "id"
  | "slug"
  | "rating"
  | "ratingCount"
  | "createdAt"
  | "updatedAt"
>;

export type UpdateRecipeInput = Partial<CreateRecipeInput>;

export interface RateRecipeInput {
  rating: number; // 1–5
}