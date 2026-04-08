'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { createRecipe, fetchRecipes } from '@/store/recipeSlice';

export default function HomePage() {
	const dispatch = useAppDispatch();
	const { recipes, status } = useAppSelector((s) => s.recipes);

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	return (
		<div className="p-10">
			<h1 className="text-2xl font-bold">Recipes</h1>
			<button
				onClick={() =>
					dispatch(
						createRecipe({
							title: 'Redux Recipe',
							description: 'test',
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
							steps: [{ stepNumber: 1, instruction: 'Cook' }],
							published: true,
						}),
					)
				}
			>
				Add Recipe
			</button>
			{status === 'loading' && <p>Loading...</p>}

			{recipes.map((r) => (
				<div key={r.id} className="mt-4 border p-3">
					{r.title} - ⭐ {r.rating}
				</div>
			))}
		</div>
	);
}
