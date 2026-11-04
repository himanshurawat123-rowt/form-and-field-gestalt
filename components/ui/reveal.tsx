"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Distance travelled on entry, in px. */
  y?: number;
}

/**
 * Scroll-into-view reveal.
 *
 * Gestalt role: **Continuity** — content arrives along one consistent vertical
 * vector with one easing curve, so the page feels like a single continuous
 * surface rather than a stack of unrelated blocks. Honours
 * `prefers-reduced-motion`.
 */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.55, ease: [0.22, 0.85, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
