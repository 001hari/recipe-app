'use client';

import { useEffect } from 'react';
import { fetchRecipes, createRecipe, rateRecipe } from '@/store/recipeSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useCooking } from '@/context/CookingContext';
import RecipeCard from '@/components/RecipeCard';
import RecipeFiltersBar from '@/components/RecipeFiltersBar';

export default function HomePage() {
	const dispatch = useAppDispatch();
	const { recipes, status } = useAppSelector((s) => s.recipes);

	const { servingMultiplier, setServingMultiplier, scaleIngredient, theme, toggleTheme } = useCooking();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);
	return (
		<div className="p-10 space-y-6">
			<h1 className="text-2xl font-bold">FULL SYSTEM TEST</h1>

			{/* 🔹 CONTEXT TEST */}
			<div className="border p-4">
				<h2 className="font-semibold">Context Test</h2>

				<p>Multiplier: {servingMultiplier}</p>
				<button onClick={() => setServingMultiplier(servingMultiplier + 1)} className="border px-2">
					Increase
				</button>

				<p>Scaled 100 → {scaleIngredient(100)}</p>

				<p>Theme: {theme}</p>
				<button onClick={toggleTheme} className="border px-2">
					Toggle Theme
				</button>
			</div>

			{/* 🔹 CREATE RECIPE */}
			<div className="border p-4">
				<h2 className="font-semibold">Create Recipe</h2>

				<button
					className="border px-2"
					onClick={() =>
						dispatch(
							createRecipe({
								title: 'Test ' + Date.now(),
								description: 'desc',
								authorId: 'user',
								category: 'Dinner',
								dietaryTags: ['vegan'],
								difficulty: 'easy',
								servings: 2,
								prepTimeMinutes: 5,
								cookTimeMinutes: 10,
								ingredients: [
									{
										id: '1',
										name: 'Salt',
										quantity: 1,
										unit: 'tsp',
										optional: false,
									},
								],
								steps: [{ stepNumber: 1, instruction: 'Cook something' }],
								published: true,
							}),
						)
					}
				>
					Add Recipe
				</button>
			</div>

			{/* 🔹 RECIPES LIST */}
			<div className="border p-4">
				<h2 className="font-semibold">Recipes</h2>

				<div className="p-10 space-y-4">
					<RecipeFiltersBar />

					{recipes.map((r) => (
						<RecipeCard key={r.id} recipe={r} variant="public" />
					))}
				</div>
				{status === 'loading' && <p>Loading...</p>}

				{recipes.map((r) => (
					<div key={r.id} className="border p-2 mt-2">
						<p>
							{r.title} | ⭐ {r.rating} ({r.ratingCount})
						</p>

						<button className="border px-2 mr-2" onClick={() => dispatch(rateRecipe({ id: r.id, rating: 5 }))}>
							Rate 5
						</button>

						<button className="border px-2" onClick={() => dispatch(rateRecipe({ id: r.id, rating: 3 }))}>
							Rate 3
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

// "use client";

// import { useEffect } from "react";
// import { fetchRecipes } from "@/store/recipeSlice";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

// export default function HomePage() {

//   return (
//   );
// }
