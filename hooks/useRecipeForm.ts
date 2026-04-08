import { useState } from "react";
import { Recipe, Ingredient, RecipeStep } from "@/types/recipe";

export function useRecipeForm(initialValues?: Partial<Recipe>) {
  const [values, setValues] = useState<Partial<Recipe>>({
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
    servings: 1,
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    dietaryTags: [],
    ingredients: [
      {
        id: crypto.randomUUID(),
        name: "",
        quantity: 1,
        unit: "g",
        optional: false,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "",
      },
    ],
    published: false,
    ...initialValues,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Recipe, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // INGREDIENTS

  const addIngredient = () => {
    setValues((prev) => ({
      ...prev,
      ingredients: [
        ...(prev.ingredients || []),
        {
          id: crypto.randomUUID(),
          name: "",
          quantity: 1,
          unit: "g",
          optional: false,
        },
      ],
    }));
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: any
  ) => {
    const updated = [...(values.ingredients || [])];
    updated[index] = { ...updated[index], [field]: value };

    setValues((prev) => ({ ...prev, ingredients: updated }));
  };

  const removeIngredient = (index: number) => {
    if ((values.ingredients?.length || 0) <= 1) return;

    const updated = values.ingredients!.filter((_, i) => i !== index);

    setValues((prev) => ({ ...prev, ingredients: updated }));
  };

  // STEPS

  const addStep = () => {
    const steps = values.steps || [];
    setValues((prev) => ({
      ...prev,
      steps: [
        ...steps,
        {
          stepNumber: steps.length + 1,
          instruction: "",
        },
      ],
    }));
  };

  const updateStep = (
    index: number,
    field: keyof RecipeStep,
    value: any
  ) => {
    const updated = [...(values.steps || [])];
    updated[index] = { ...updated[index], [field]: value };

    setValues((prev) => ({ ...prev, steps: updated }));
  };

  const removeStep = (index: number) => {
    if ((values.steps?.length || 0) <= 1) return;

    let updated = values.steps!.filter((_, i) => i !== index);

    updated = updated.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));

    setValues((prev) => ({ ...prev, steps: updated }));
  };

  const moveStep = (from: number, to: number) => {
    const steps = [...(values.steps || [])];
    const [moved] = steps.splice(from, 1);
    steps.splice(to, 0, moved);

    const renumbered = steps.map((s, i) => ({
      ...s,
      stepNumber: i + 1,
    }));

    setValues((prev) => ({ ...prev, steps: renumbered }));
  };

  // VALIDATION

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!values.title || values.title.length < 3) {
      errs.title = "Title must be at least 3 chars";
    }

    if (!values.ingredients || values.ingredients.length === 0) {
      errs.ingredients = "At least 1 ingredient required";
    }

    if (!values.steps || values.steps.length === 0) {
      errs.steps = "At least 1 step required";
    }

    if ((values.servings || 0) < 1) {
      errs.servings = "Servings must be >= 1";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (onSubmit: (data: Partial<Recipe>) => void) => {
    if (validate()) {
      onSubmit(values);
    }
  };

  const reset = () => {
    setValues(initialValues || {});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addStep,
    updateStep,
    removeStep,
    moveStep,
  };
}