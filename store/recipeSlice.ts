import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Recipe, RecipeFilters } from "@/types/recipe";
import { CreateRecipeInput, UpdateRecipeInput } from "@/types/api";

interface RecipeState {
  recipes: Recipe[];
  filters: RecipeFilters;
  selectedRecipe: Recipe | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  filters: {
    category: "",
    dietaryTags: [],
    difficulty: "all",
    search: "",
    maxCookTime: null,
    published: null,
  },
  selectedRecipe: null,
  status: "idle",
  error: null,
};

// THUNKS

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await fetch("/api/recipes");
    return (await res.json()) as Recipe[];
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (data: CreateRecipeInput) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return (await res.json()) as Recipe;
  }
);

export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ id, data }: { id: string; data: UpdateRecipeInput }) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return (await res.json()) as Recipe;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id: string) => {
    await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    return id;
  }
);

export const rateRecipe = createAsyncThunk(
  "recipes/rateRecipe",
  async ({ id, rating }: { id: string; rating: number }) => {
    const res = await fetch(`/api/recipes/${id}/rate`, {
      method: "POST",
      body: JSON.stringify({ rating }),
    });
    return { id, ...(await res.json()) };
  }
);

// SLICE

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
    setSelectedRecipe(state, action) {
      state.selectedRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = "failed";
      })

      // CREATE
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })

      // EDIT
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) state.recipes[index] = action.payload;
      })

      // DELETE
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (r) => r.id !== action.payload
        );
      })

      // RATE
      .addCase(rateRecipe.fulfilled, (state, action) => {
        const recipe = state.recipes.find(
          (r) => r.id === action.payload.id
        );
        if (recipe) {
          recipe.rating = action.payload.rating;
          recipe.ratingCount = action.payload.ratingCount;
        }
      });
  },
});

export const { setFilters, clearFilters, setSelectedRecipe } =
  recipeSlice.actions;

export default recipeSlice.reducer;