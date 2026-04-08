import { NextRequest, NextResponse } from 'next/server';
import { getRecipes, setRecipes } from '@/lib/db';
import { generateId, generateUniqueSlug } from '@/lib/utils';
import { CreateRecipeInput } from '@/types/api';
import { Recipe } from '@/types/recipe';
import { DietaryTag } from '@/types/recipe';

// GET /api/recipes
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const recipes = getRecipes();

	const category = searchParams.get('category');
	const dietaryTags = searchParams.get('dietaryTags');
	const difficulty = searchParams.get('difficulty');
	const search = searchParams.get('search');
	const maxCookTime = searchParams.get('maxCookTime');
	const published = searchParams.get('published');
	const slug = searchParams.get('slug');

	let result = [...recipes];

	if (slug) {
		result = result.filter((r) => r.slug === slug);
	}

	if (category) {
		result = result.filter((r) => r.category === category);
	}

	if (dietaryTags) {
		const tags = dietaryTags.split(',') as DietaryTag[];

		result = result.filter((r) => tags.every((tag) => r.dietaryTags.includes(tag)));
	}

	if (difficulty) {
		result = result.filter((r) => r.difficulty === difficulty);
	}

	if (search) {
		result = result.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));
	}

	if (maxCookTime) {
		const max = Number(maxCookTime);
		result = result.filter((r) => r.prepTimeMinutes + r.cookTimeMinutes <= max);
	}

	if (published !== null) {
		if (published === 'true') result = result.filter((r) => r.published);
		if (published === 'false') result = result.filter((r) => !r.published);
	}

	result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return NextResponse.json(result);
}

// POST /api/recipes
export async function POST(req: NextRequest) {
	const body: CreateRecipeInput = await req.json();

	if (!body.title || body.title.length < 3) {
		return NextResponse.json({ error: 'Title must be at least 3 characters' }, { status: 400 });
	}

	if (!body.ingredients || body.ingredients.length === 0) {
		return NextResponse.json({ error: 'At least one ingredient required' }, { status: 400 });
	}

	if (!body.steps || body.steps.length === 0) {
		return NextResponse.json({ error: 'At least one step required' }, { status: 400 });
	}

	if (body.servings < 1) {
		return NextResponse.json({ error: 'Servings must be >= 1' }, { status: 400 });
	}

	const recipes = getRecipes();

	const slug = generateUniqueSlug(
		body.title,
		recipes.map((r) => r.slug),
	);

	const now = new Date().toISOString();

	const newRecipe: Recipe = {
		...body,
		id: generateId(),
        published: true,
		slug,
		rating: 0,
		ratingCount: 0,
		createdAt: now,
		updatedAt: now,
	};

	setRecipes([...recipes, newRecipe]);

	return NextResponse.json(newRecipe, { status: 201 });
}
