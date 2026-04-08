"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setFilters, clearFilters } from "@/store/recipeSlice";

export default function RecipeFiltersBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.recipes.filters);

  return (
    <div className="border p-4 flex gap-2">
      <input
        placeholder="Search"
        value={filters.search}
        onChange={(e) =>
          dispatch(setFilters({ ...filters, search: e.target.value }))
        }
        className="border p-1"
      />

      <button
        onClick={() => dispatch(clearFilters())}
        className="border px-2"
      >
        Clear
      </button>
    </div>
  );
}