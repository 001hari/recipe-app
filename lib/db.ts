
import { Recipe } from "@/types/recipe";

const initialRecipes: Recipe[] = [
  {
    id: "1",
    title: "Paneer Butter Masala",
    slug: "paneer-butter-masala",
    description: "Rich and creamy tomato-based curry with cubes of paneer, butter, and cream. A North Indian masterpiece.",
    coverImageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1587&auto=format&fit=crop",
    authorId: "chef_123",
    category: "Indian",
    dietaryTags: ["vegetarian", "gluten-free"],
    difficulty: "medium",
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    ingredients: [
      { id: "i1", name: "Paneer", quantity: 250, unit: "g", optional: false },
      { id: "i2", name: "Butter", quantity: 50, unit: "g", optional: false },
      { id: "i3", name: "Tomato Puree", quantity: 1, unit: "cup", optional: false },
      { id: "i4", name: "Heavy Cream", quantity: 0.5, unit: "cup", optional: false }
    ],
    steps: [
      { stepNumber: 1, instruction: "Sauté the tomato puree in butter until it releases oil.", durationMinutes: 10 },
      { stepNumber: 2, instruction: "Add spices and paneer cubes. Simmer gently.", durationMinutes: 5 },
      { stepNumber: 3, instruction: "Finish with a splash of heavy cream and fresh coriander.", durationMinutes: 2 }
    ],
    nutrition: { calories: 420, proteinG: 18, carbsG: 12, fatG: 34, fiberG: 2 },
    published: true,
    rating: 4.8,
    ratingCount: 156,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Wild Mushroom Risotto",
    slug: "wild-mushroom-risotto",
    description: "Creamy Arborio rice slow-cooked with earthy wild mushrooms and truffle oil.",
    coverImageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2670&auto=format&fit=crop",
    authorId: "chef_123",
    category: "Italian",
    dietaryTags: ["vegetarian", "gluten-free"],
    difficulty: "medium",
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    ingredients: [
      { id: "i2_1", name: "Arborio Rice", quantity: 200, unit: "g", optional: false },
      { id: "i2_2", name: "Porcini Mushrooms", quantity: 150, unit: "g", optional: false },
      { id: "i2_3", name: "Vegetable Broth", quantity: 1, unit: "l", optional: false }
    ],
    steps: [
      { stepNumber: 1, instruction: "Sauté mushrooms until golden. Set aside.", durationMinutes: 8 },
      { stepNumber: 2, instruction: "Toast rice and slowly add warm broth one ladle at a time.", durationMinutes: 20 },
      { stepNumber: 3, instruction: "Fold in mushrooms and parmesan cheese.", durationMinutes: 2 }
    ],
    nutrition: { calories: 510, proteinG: 14, carbsG: 72, fatG: 18, fiberG: 4 },
    published: true,
    rating: 4.9,
    ratingCount: 204,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Mediterranean Buddha Bowl",
    slug: "mediterranean-buddha-bowl",
    description: "A colorful assembly of quinoa, hummus, roasted chickpeas, and fresh Mediterranean vegetables.",
    coverImageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop",
    authorId: "chef_123",
    category: "Healthy",
    dietaryTags: ["vegan", "vegetarian", "gluten-free"],
    difficulty: "easy",
    servings: 1,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    ingredients: [
      { id: "i3_1", name: "Quinoa", quantity: 1, unit: "cup", optional: false },
      { id: "i3_2", name: "Chickpeas", quantity: 0.5, unit: "cup", optional: false },
      { id: "i3_3", name: "Hummus", quantity: 2, unit: "tbsp", optional: false }
    ],
    steps: [
      { stepNumber: 1, instruction: "Roast chickpeas with paprika until crunchy.", durationMinutes: 10 },
      { stepNumber: 2, instruction: "Base the bowl with quinoa and arrange toppings artfully.", durationMinutes: 5 }
    ],
    nutrition: { calories: 450, proteinG: 16, carbsG: 65, fatG: 14, fiberG: 12 },
    published: true,
    rating: 4.7,
    ratingCount: 128,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
      id: "4",
      title: "Classic Avocado Toast",
      slug: "classic-avocado-toast",
      description: "Artisanal sourdough topped with perfectly ripe avocado, chili flakes, and a soft poached egg.",
      coverImageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2680&auto=format&fit=crop",
      authorId: "chef_123",
      category: "Breakfast",
      dietaryTags: ["vegetarian"],
      difficulty: "easy",
      servings: 1,
      prepTimeMinutes: 5,
      cookTimeMinutes: 5,
      ingredients: [
        { id: "i4_1", name: "Sourdough Bread", quantity: 1, unit: "piece", optional: false },
        { id: "i4_2", name: "Avocado", quantity: 1, unit: "piece", optional: false },
        { id: "i4_3", name: "Large Egg", quantity: 1, unit: "piece", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Toast the bread and poach the egg separately.", durationMinutes: 4 },
        { stepNumber: 2, instruction: "Mash avocado on toast and top with egg and seasonings.", durationMinutes: 2 }
      ],
      nutrition: { calories: 380, proteinG: 12, carbsG: 32, fatG: 22, fiberG: 9 },
      published: true,
      rating: 4.6,
      ratingCount: 512,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "5",
      title: "Greek Salad Supreme",
      slug: "greek-salad-supreme",
      description: "Crisp cucumbers, juicy tomatoes, kalamata olives, and premium feta cheese with Greek dressing.",
      coverImageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1587&auto=format&fit=crop",
      authorId: "chef_123",
      category: "Salad",
      dietaryTags: ["vegetarian", "gluten-free"],
      difficulty: "easy",
      servings: 2,
      prepTimeMinutes: 10,
      cookTimeMinutes: 0,
      ingredients: [
        { id: "i5_1", name: "Feta Cheese", quantity: 100, unit: "g", optional: false },
        { id: "i5_2", name: "Cucumber", quantity: 1, unit: "piece", optional: false },
        { id: "i5_3", name: "Kalamata Olives", quantity: 0.5, unit: "cup", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Chop all vegetables into uniform cubes.", durationMinutes: 8 },
        { stepNumber: 2, instruction: "Toss with olive oil and top with feta slabs.", durationMinutes: 2 }
      ],
      nutrition: { calories: 310, proteinG: 8, carbsG: 12, fatG: 26, fiberG: 4 },
      published: true,
      rating: 4.5,
      ratingCount: 84,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "6",
      title: "Blueberry Pancake Stack",
      slug: "blueberry-pancake-stack",
      description: "Fluffy buttermilk pancakes bursting with fresh blueberries, served with Canadian maple syrup.",
      coverImageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2670&auto=format&fit=crop",
      authorId: "chef_123",
      category: "Breakfast",
      dietaryTags: ["vegetarian"],
      difficulty: "easy",
      servings: 4,
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      ingredients: [
        { id: "i6_1", name: "Blueberries", quantity: 1, unit: "cup", optional: false },
        { id: "i6_2", name: "Milk", quantity: 250, unit: "ml", optional: false },
        { id: "i6_3", name: "Pancake Flour", quantity: 200, unit: "g", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Whisk batter until smooth and fold in berries.", durationMinutes: 5 },
        { stepNumber: 2, instruction: "Cook on a hot griddle until golden brown on both sides.", durationMinutes: 10 }
      ],
      nutrition: { calories: 320, proteinG: 8, carbsG: 55, fatG: 8, fiberG: 3 },
      published: true,
      rating: 4.9,
      ratingCount: 312,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "7",
      title: "Veggie Margherita Pizza",
      slug: "veggie-margherita-pizza",
      description: "Traditional thin-crust pizza with fresh mozzarella, basil leaves, and homemade San Marzano sauce.",
      coverImageUrl: "https://images.pexels.com/photos/29609013/pexels-photo-29609013.jpeg",
      authorId: "chef_123",
      category: "Italian",
      dietaryTags: ["vegetarian"],
      difficulty: "medium",
      servings: 2,
      prepTimeMinutes: 20,
      cookTimeMinutes: 10,
      ingredients: [
        { id: "i7_1", name: "Pizza Dough", quantity: 400, unit: "g", optional: false },
        { id: "i7_2", name: "Fresh Mozzarella", quantity: 200, unit: "g", optional: false },
        { id: "i7_3", name: "Basil Leaves", quantity: 1, unit: "piece", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Roll out dough and spread tomato sauce thinly.", durationMinutes: 10 },
        { stepNumber: 2, instruction: "Add mozzarella and bake at high temp until bubbly.", durationMinutes: 8 },
        { stepNumber: 3, instruction: "Top with fresh basil and a drizzle of olive oil.", durationMinutes: 2 }
      ],
      nutrition: { calories: 580, proteinG: 22, carbsG: 65, fatG: 24, fiberG: 3 },
      published: true,
      rating: 4.8,
      ratingCount: 421,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "8",
      title: "Chocolate Lava Cake",
      slug: "chocolate-lava-cake",
      description: "Oozing with warm dark chocolate, this individual cake is the ultimate indulgence for chocolate lovers.",
      coverImageUrl: "https://images.pexels.com/photos/33813614/pexels-photo-33813614.jpeg",
      authorId: "chef_123",
      category: "Dessert",
      dietaryTags: ["vegetarian"],
      difficulty: "medium",
      servings: 2,
      prepTimeMinutes: 15,
      cookTimeMinutes: 12,
      ingredients: [
        { id: "i8_1", name: "Dark Chocolate", quantity: 100, unit: "g", optional: false },
        { id: "i8_2", name: "Butter", quantity: 50, unit: "g", optional: false },
        { id: "i8_3", name: "Sugar", quantity: 3, unit: "tbsp", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Melt chocolate and butter. Whisk in eggs and sugar.", durationMinutes: 10 },
        { stepNumber: 2, instruction: "Bake in ramekins until sides are set but center is soft.", durationMinutes: 12 }
      ],
      nutrition: { calories: 450, proteinG: 6, carbsG: 35, fatG: 32, fiberG: 2 },
      published: true,
      rating: 4.9,
      ratingCount: 278,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "9",
      title: "Roasted Red Pepper Pasta",
      slug: "roasted-red-pepper-pasta",
      description: "Pasta tossed in a silky roasted red pepper sauce with garlic and fresh parsley.",
      coverImageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1587&auto=format&fit=crop",
      authorId: "chef_123",
      category: "Pasta",
      dietaryTags: ["vegetarian", "dairy-free"],
      difficulty: "easy",
      servings: 3,
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      ingredients: [
        { id: "i9_1", name: "Penne Pasta", quantity: 300, unit: "g", optional: false },
        { id: "i9_2", name: "Red Bell Pepper", quantity: 2, unit: "piece", optional: false },
        { id: "i9_3", name: "Garlic", quantity: 4, unit: "piece", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Roast peppers until charred and blend into a sauce.", durationMinutes: 15 },
        { stepNumber: 2, instruction: "Toss al dente pasta with the sauce and garnish.", durationMinutes: 5 }
      ],
      nutrition: { calories: 380, proteinG: 12, carbsG: 70, fatG: 6, fiberG: 5 },
      published: true,
      rating: 4.7,
      ratingCount: 192,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "10",
      title: "Thai Green Veggie Curry",
      slug: "thai-green-veggie-curry",
      description: "A fragrant and spicy curry with coconut milk, bamboo shoots, and fresh Thai basil.",
      coverImageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2670&auto=format&fit=crop",
      authorId: "chef_123",
      category: "Asian",
      dietaryTags: ["vegan", "vegetarian", "gluten-free"],
      difficulty: "medium",
      servings: 4,
      prepTimeMinutes: 15,
      cookTimeMinutes: 20,
      ingredients: [
        { id: "i10_1", name: "Coconut Milk", quantity: 400, unit: "ml", optional: false },
        { id: "i10_2", name: "Tofu", quantity: 200, unit: "g", optional: false },
        { id: "i10_3", name: "Thai Curry Paste", quantity: 2, unit: "tbsp", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Simmer paste with coconut milk and vegetables.", durationMinutes: 15 },
        { stepNumber: 2, instruction: "Add tofu cubes and Thai basil at the end.", durationMinutes: 5 }
      ],
      nutrition: { calories: 420, proteinG: 14, carbsG: 18, fatG: 32, fiberG: 4 },
      published: true,
      rating: 4.8,
      ratingCount: 231,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  },
  {
      id: "11",
      title: "Garlic Butter Naan",
      slug: "garlic-butter-naan",
      description: "Soft and fluffy Indian flatbread topped with garlic butter and fresh cilantro.",
      coverImageUrl: "https://images.pexels.com/photos/28125427/pexels-photo-28125427.jpeg",
      authorId: "chef_123",
      category: "Indian",
      dietaryTags: ["vegetarian"],
      difficulty: "medium",
      servings: 6,
      prepTimeMinutes: 60,
      cookTimeMinutes: 10,
      ingredients: [
        { id: "i11_1", name: "Plain Flour", quantity: 500, unit: "g", optional: false },
        { id: "i11_2", name: "Yogurt", quantity: 0.5, unit: "cup", optional: false },
        { id: "i11_3", name: "Minced Garlic", quantity: 2, unit: "tbsp", optional: false }
      ],
      steps: [
        { stepNumber: 1, instruction: "Knead dough and let it rise for 1 hour.", durationMinutes: 60 },
        { stepNumber: 2, instruction: "Roll out and cook on a very hot tandoor or tawa.", durationMinutes: 8 },
        { stepNumber: 3, instruction: "Brush with garlic butter while hot.", durationMinutes: 2 }
      ],
      nutrition: { calories: 280, proteinG: 7, carbsG: 45, fatG: 8, fiberG: 2 },
      published: true,
      rating: 4.9,
      ratingCount: 395,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  }
];

let recipes: Recipe[] = [...initialRecipes];

export function getRecipes() {
  return recipes;
}

export function setRecipes(newRecipes: Recipe[]) {
  recipes = newRecipes;
}
