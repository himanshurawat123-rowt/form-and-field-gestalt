"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
}

export interface SegmentedProps {
  /** Accessible name of the whole control group. */
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
  className?: string;
}

/**
 * Segmented single-select control (radiogroup semantics).
 *
 * Gestalt role: **Similarity** — every segment shares one shape, size, weight
 * and radius, so the eye reads the control as a single, predictable instrument
 * no matter which lab it belongs to. The selected segment is filled with the
 * foreground colour instead of the accent, so the page keeps exactly one
 * emerald focal point ("Shop the edit").
 */
export function Segmented({ label, value, onChange, options, className }: SegmentedProps) {
  const refs = React.useRef([] as (HTMLButtonElement | null)[]);

  const move = (delta: number) => {
    const index = options.findIndex((option) => option.value === value);
    const next = (index + delta + options.length) % options.length;
    const target = options[next];
    if (!target) return;
    onChange(target.value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm",
        className
      )}
    >
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                move(1);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                move(-1);
              }
            }}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs font-semibold outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-card",
              "motion-reduce:transition-none",
              active ? "text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-foreground shadow-sm" />}
            <span className="relative z-10 whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Segmented;
