"use client";

import { RecipeStep } from "@/types/recipe";
import { useState, useEffect } from "react";

interface Props {
  step: RecipeStep;
}

export default function StepCard({ step }: Props) {
  const [time, setTime] = useState(step.durationMinutes || 0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 0) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="border p-3 mt-2">
      <p>
        Step {step.stepNumber}: {step.instruction}
      </p>

      {step.durationMinutes && (
        <button
          className="border px-2 mt-2"
          onClick={() => setRunning(true)}
        >
          Start Timer ({step.durationMinutes} min)
        </button>
      )}

      {running && <p>Time left: {time} min</p>}
    </div>
  );
}