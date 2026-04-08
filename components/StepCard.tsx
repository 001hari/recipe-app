
"use client";

import { RecipeStep } from "@/types/recipe";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Timer, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface StepCardProps {
  step: RecipeStep;
  index: number;
  editable?: boolean;
  onChange?: (index: number, field: keyof RecipeStep, value: string | number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

// Global active timer holder for single-timer enforcement
let activeTimer: NodeJS.Timeout | null = null;
let activeSetTimeLeft: ((val: number | null) => void) | null = null;

export default function StepCard({
  step,
  index,
  editable = false,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  className,
}: StepCardProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const startTimer = () => {
    if (!step.durationMinutes) return;

    // Stop existing timer
    if (activeTimer) clearInterval(activeTimer);
    if (activeSetTimeLeft) activeSetTimeLeft(null);

    let totalSeconds = step.durationMinutes * 60;
    setTimeLeft(totalSeconds);
    activeSetTimeLeft = setTimeLeft;

    activeTimer = setInterval(() => {
      totalSeconds--;

      if (totalSeconds <= 0) {
        clearInterval(activeTimer!);
        setTimeLeft(0);
        activeTimer = null;
        activeSetTimeLeft = null;
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

  if (editable) {
    return (
      <div className={cn("bg-card border rounded-lg p-4 mb-4 shadow-sm", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold leading-none">
              {step.stepNumber}
            </div>
            <h3 className="font-semibold text-sm uppercase">Step Details</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              disabled={isFirst}
              onClick={() => onMoveUp?.(index)}
              className="h-8 w-8"
            >
              <ChevronUp size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={isLast}
              onClick={() => onMoveDown?.(index)}
              className="h-8 w-8"
            >
              <ChevronDown size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove?.(index)}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Textarea
            value={step.instruction}
            onChange={(e) => onChange?.(index, "instruction", e.target.value)}
            placeholder="Describe this step..."
            className="min-h-[80px]"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase mb-1 block">Duration (mins)</label>
              <Input
                type="number"
                value={step.durationMinutes || ""}
                onChange={(e) => onChange?.(index, "durationMinutes", Number(e.target.value))}
                placeholder="Optional timer"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase mb-1 block">Tip</label>
              <Input
                value={step.tip || ""}
                onChange={(e) => onChange?.(index, "tip", e.target.value)}
                placeholder="Chef's tip"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col md:flex-row gap-4 bg-muted/30 p-6 rounded-2xl relative border border-transparent hover:border-primary/20 transition-all", className)}>
      <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm border border-primary/20">
        {step.stepNumber}
      </div>
      
      <div className="flex-1">
        <p className="text-lg leading-relaxed">{step.instruction}</p>
        
        {step.tip && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl text-sm italic text-amber-800 dark:text-amber-200 shadow-sm">
            <span className="font-bold uppercase text-[10px] not-italic block mb-1">Chef's Tip</span>
            {step.tip}
          </div>
        )}

        {step.durationMinutes && (
          <div className="mt-4 flex items-center gap-4">
            <Button
              variant={timeLeft !== null ? "secondary" : "outline"}
              size="sm"
              onClick={startTimer}
              className={cn(
                "rounded-full gap-2 transition-all active:scale-95",
                timeLeft === 0 && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              )}
            >
              <Timer size={16} />
              {timeLeft === null ? `Start Timer (${step.durationMinutes}m)` : 
               timeLeft === 0 ? "Time's Up!" : formatTime(timeLeft)}
            </Button>
            
            {timeLeft !== null && timeLeft > 0 && (
              <span className={cn(
                "font-mono text-xl animate-pulse font-bold tracking-tight",
                timeLeft < 10 && "text-destructive"
              )}>
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}