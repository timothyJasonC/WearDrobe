"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface CircleProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  unit?: string;
  max: number
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CircleProgressProps
>(({ className, value, unit, max, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-20 w-20 overflow-hidden rounded-full bg-primary/20 justify-center items-center ${(max - value) <= 50 ? "flex" : "hidden"}`,
      className
    )}
    {...props}
    style={{ background: `radial-gradient(closest-side, white 70%, transparent 80% 100%), 
      conic-gradient(${(max - value) <= 15 ? "#ef4444" : (max - value) <= 25 ? "#eab308" : "#9ca3af"} ${(value / max * 100)}%, 
      white 0)`}}
  >
    <div className="font-semibold">{`${(value || 0)}${unit}`}</div>
  </ProgressPrimitive.Root>
))

CircleProgress.displayName = ProgressPrimitive.Root.displayName
