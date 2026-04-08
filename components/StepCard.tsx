"use client";

import { RecipeStep } from "@/types/recipe";
import { useEffect, useState } from "react";

let activeTimer: NodeJS.Timeout | null = null;

export default function StepCard({ step }: { step: RecipeStep }) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const startTimer = () => {
    if (!step.durationMinutes) return;

    if (activeTimer) clearInterval(activeTimer);

    let totalSeconds = step.durationMinutes * 60;
    setTimeLeft(totalSeconds);

    activeTimer = setInterval(() => {
      totalSeconds--;

      if (totalSeconds <= 0) {
        clearInterval(activeTimer!);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(totalSeconds);
    }, 1000);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border p-3 mt-2">
      <p>
        Step {step.stepNumber}: {step.instruction}
      </p>

      {step.durationMinutes && (
        <button onClick={startTimer} className="border px-2 mt-2">
          Start Timer ({step.durationMinutes} min)
        </button>
      )}

      {timeLeft !== null && (
        <p className={timeLeft < 10 ? "text-red-500" : ""}>
          {timeLeft === 0 ? "Time's Up!" : formatTime(timeLeft)}
        </p>
      )}
    </div>
  );
}