"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GestaltAnnotation } from "@/components/ui/gestalt-annotation";

interface FigureGroundEditorialProps {
  className?: string;
}

export function FigureGroundEditorial({ className }: FigureGroundEditorialProps) {
  const [pointerShifted, setPointerShifted] = React.useState(false);
  const [manualShifted, setManualShifted] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const interaction = useMotionValue(0);
  const attention = useSpring(
    interaction,
    reducedMotion
      ? { duration: 0 }
      : { stiffness: 145, damping: 31, mass: 0.75 }
  );
  const backgroundColor = useTransform(attention, [0, 1], ["#f3f0e8", "#e7e2d8"]);
  const jacketFilter = useTransform(
    attention,
    [0, 1],
    ["brightness(1) saturate(1)", "brightness(1.18) saturate(0.76)"]
  );
  const artworkTransform = useTransform(attention, [0, 1], ["scale(1)", "scale(1.008)"]);
  const shifted = pointerShifted || manualShifted;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const distance = Math.hypot((x - 0.5) / 0.23, (y - 0.53) / 0.38);
    const proximity = Math.max(0, Math.min(1, 1 - distance));

    interaction.set(proximity);
    setManualShifted(false);
    setPointerShifted(proximity >= 0.32);
  };

  const handlePointerLeave = () => {
    interaction.set(0);
    setPointerShifted(false);
  };

  const togglePerspective = () => {
    setManualShifted((current) => {
      const next = !current;
      interaction.set(next ? 1 : 0);
      setPointerShifted(false);
      return next;
    });
  };

  return (
    <motion.section
      id="perception"
      aria-labelledby="perception-title"
      style={{ backgroundColor }}
      className={`relative scroll-mt-28 overflow-hidden border-y border-foreground/10 text-[#201f1b] ${className ?? ""}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div className="relative z-10">
            <GestaltAnnotation
              className="mb-5"
              align="left"
              principles={[
                {
                  name: "FIGURE–GROUND",
                  explanation: "The jacket is seen first; shifting contrast lets its unchanged tree-shaped negative space become the figure.",
                },
              ]}
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
              PERCEPTION STUDY · 02
            </p>
            <h2
              id="perception-title"
              className="mt-5 font-heading text-[clamp(3.6rem,8vw,7.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em]"
            >
              FIGURE /
              <br />
              GROUND
            </h2>
            <p className="mt-7 text-base leading-7 tracking-[0.01em] opacity-75 sm:text-lg">
              First the jacket.
              <br />
              Then the space between.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[670px]">
            <div
              className="relative aspect-[926/1068] w-full"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <motion.div
                className="absolute inset-0"
                style={{ filter: jacketFilter, transform: artworkTransform }}
              >
                <Image
                  src="/figure-ground-jacket.png"
                  alt="A black jacket whose central cream negative space forms the silhouette of a tree"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 56vw"
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-[36%] top-[56%] h-[44%] w-[28%]"
                style={{
                  background:
                    "linear-gradient(to top, transparent, rgba(255,255,255,0.24), transparent)",
                  filter: "blur(9px)",
                }}
                initial={false}
                animate={
                  shifted && !reducedMotion
                    ? { opacity: 0.12, y: ["0%", "-100%"] }
                    : { opacity: 0, y: "0%" }
                }
                transition={{
                  duration: reducedMotion ? 0 : 1.1,
                  ease: "easeInOut",
                  repeat: shifted && !reducedMotion ? 1 : 0,
                  repeatDelay: 0.25,
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-current/20 pb-3">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] opacity-55 sm:text-[10px]">
                MOVE INTO THE NEGATIVE SPACE →
              </p>
              <button
                type="button"
                aria-pressed={shifted}
                onClick={togglePerspective}
                className="group inline-flex min-h-11 items-center gap-2 border-b border-current/35 pb-1 text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-current sm:text-[10px]"
              >
                SHIFT PERSPECTIVE
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex min-h-16 flex-col justify-center gap-4 border-b border-current/20 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={shifted ? "ground" : "figure"}
                initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.17em]">
                  {shifted ? "GROUND → FIGURE" : "FIGURE"}
                </span>
                <span className="h-3 w-px bg-current/20" aria-hidden="true" />
                <span className="text-xs">
                  {shifted ? "THE SPACE BETWEEN" : "THE JACKET"}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence initial={false}>
            {shifted && (
              <motion.p
                key="revealed"
                initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
                className="font-heading text-xs font-semibold uppercase tracking-[0.12em] sm:text-right"
              >
                SAME IMAGE.
                <br className="sm:hidden" /> DIFFERENT PERCEPTION.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default FigureGroundEditorial;
