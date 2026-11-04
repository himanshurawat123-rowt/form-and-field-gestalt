import * as React from "react";

export interface GestaltPrincipleNote {
  name: string;
  explanation: string;
}

interface GestaltAnnotationProps {
  principles: GestaltPrincipleNote[];
  className?: string;
  inverse?: boolean;
  align?: "left" | "center" | "right";
}

export function GestaltAnnotation({
  principles,
  className,
  inverse = false,
  align = "center",
}: GestaltAnnotationProps) {
  const alignment =
    align === "right"
      ? "right-0"
      : align === "left"
        ? "left-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <details className={`group relative w-fit max-w-full ${className ?? ""}`}>
      <summary
        className={`flex cursor-pointer list-none items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] marker:hidden [&::-webkit-details-marker]:hidden ${
          inverse ? "text-[#f4f0e8]/65" : "text-muted-foreground"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-5 shrink-0 ${inverse ? "bg-[#d3a08d]" : "bg-primary/70"}`}
        />
        <span className={inverse ? "text-[#d3a08d]" : "text-primary"}>GESTALT ↗</span>
        <span className="min-w-0 leading-5">
          {principles.map((principle) => principle.name).join(" · ")}
        </span>
      </summary>
      <div
        className={`absolute ${alignment} top-full z-50 mt-2 w-[min(22rem,calc(100vw-2.5rem))] border-l px-4 py-3 shadow-sm ${
          inverse
            ? "border-[#d3a08d] bg-[#292722]/95 text-[#f4f0e8]"
            : "border-primary/70 bg-background/95 text-foreground"
        }`}
      >
        <ul className="space-y-2.5">
          {principles.map((principle) => (
            <li key={principle.name}>
              <p
                className={`text-[9px] font-semibold uppercase tracking-[0.15em] ${
                  inverse ? "text-[#d3a08d]" : "text-primary"
                }`}
              >
                {principle.name}
              </p>
              <p
                className={`mt-0.5 text-[11px] leading-5 ${
                  inverse ? "text-[#f4f0e8]/75" : "text-muted-foreground"
                }`}
              >
                {principle.explanation}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
