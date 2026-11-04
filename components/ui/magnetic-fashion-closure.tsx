"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { GestaltAnnotation } from "@/components/ui/gestalt-annotation";

const FRAGMENTS = [
  { column: 0, row: 0, x: -28, y: -24, rotate: -6, z: 12 },
  { column: 1, row: 0, x: 8, y: -30, rotate: 4, z: -6 },
  { column: 2, row: 0, x: 26, y: -18, rotate: 7, z: 10 },
  { column: 0, row: 1, x: -34, y: 4, rotate: 5, z: -8 },
  { column: 1, row: 1, x: 0, y: 0, rotate: -3, z: 14 },
  { column: 2, row: 1, x: 32, y: 8, rotate: -5, z: -10 },
  { column: 0, row: 2, x: -24, y: 28, rotate: -7, z: 8 },
  { column: 1, row: 2, x: -8, y: 32, rotate: 6, z: -12 },
  { column: 2, row: 2, x: 28, y: 24, rotate: 3, z: 6 },
];

const IMAGE = "/closure-editorial.jpg";

export function MagneticFashionClosure() {
  const artworkRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [assembled, setAssembled] = React.useState(Boolean(reducedMotion));
  const [manualAssembly, setManualAssembly] = React.useState(false);
  const target = useMotionValue(reducedMotion ? 0.88 : 0);
  const progress = useSpring(
    target,
    reducedMotion
      ? { stiffness: 10000, damping: 1000 }
      : { stiffness: 150, damping: 28, mass: 0.78 }
  );

  React.useEffect(() => {
    if (!reducedMotion) return;
    target.set(0.88);
    setAssembled(true);
  }, [reducedMotion, target]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || manualAssembly) return;

    const artwork = artworkRef.current;
    if (!artwork) return;

    const bounds = artwork.getBoundingClientRect();
    const x = Math.max(bounds.left, Math.min(event.clientX, bounds.right));
    const y = Math.max(bounds.top, Math.min(event.clientY, bounds.bottom));
    const distance = Math.hypot(event.clientX - x, event.clientY - y);
    const proximity = Math.max(0, Math.min(1, 1 - distance / 260));

    target.set(reducedMotion ? 0.88 : proximity);
    setAssembled(proximity > 0.88 || Boolean(reducedMotion));
  };

  const handlePointerLeave = () => {
    if (manualAssembly) return;
    target.set(reducedMotion ? 0.88 : 0);
    setAssembled(Boolean(reducedMotion));
  };

  const toggleAssembly = () => {
    const next = !manualAssembly;
    setManualAssembly(next);
    target.set(next ? 1 : reducedMotion ? 0.88 : 0);
    setAssembled(next || Boolean(reducedMotion));
  };

  return (
    <section
      id="closure-study"
      aria-labelledby="closure-title"
      className="scroll-mt-28 border-y border-border/70 bg-[#ece8df]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-12">
        <div className="relative">
          <GestaltAnnotation
            className="mb-5"
            align="left"
            principles={[
              {
                name: "CLOSURE",
                explanation: "The image remains perceptually readable in fragments before the pieces complete it.",
              },
            ]}
          />
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            PERCEPTION STUDY · 03
          </p>
          <h2
            id="closure-title"
            className="mt-5 font-heading text-[clamp(2.85rem,6vw,5.4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.075em]"
          >
            COMPLETE
            <br />
            THE LOOK.
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            You see the whole
            <br />
            before every piece arrives.
          </p>
          <button
            type="button"
            aria-pressed={manualAssembly}
            onClick={toggleAssembly}
            className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-foreground/35 pb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-foreground sm:hidden"
          >
            {manualAssembly ? "TAP TO RELEASE" : "TAP TO COMPLETE"}
          </button>
        </div>

        <div className="min-w-0">
          <div
            ref={artworkRef}
            className="relative mx-auto grid aspect-[4/5] w-full max-w-[620px] grid-cols-3 grid-rows-3 [perspective:1100px]"
            role="img"
            aria-label="Nine softly separated fragments of indigo denim jeans hanging on wooden hangers, coming together into one continuous fashion image"
          >
            {FRAGMENTS.map((fragment) => (
              <ClosureFragment
                key={`${fragment.row}-${fragment.column}`}
                fragment={fragment}
                progress={progress}
              />
            ))}
            <p className="sr-only">
              Move toward the photograph to magnetically assemble the fragments into one continuous image of denim garments on hangers.
            </p>
          </div>

          <div className="mt-4 flex min-h-14 items-center justify-between gap-4 border-b border-foreground/20 py-3">
            <AnimatePresence mode="wait" initial={false}>
              {assembled ? (
                <motion.p
                  key="assembled"
                  initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  className="font-heading text-xs font-semibold uppercase leading-5 tracking-[0.12em] sm:text-sm"
                  aria-live="polite"
                >
                  THE WHOLE WAS
                  <br />
                  ALREADY THERE.
                </motion.p>
              ) : (
                <motion.p
                  key="prompt"
                  initial={false}
                  animate={{ opacity: 0.5 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  MOVE CLOSER TO COMPLETE
                </motion.p>
              )}
            </AnimatePresence>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              Closure / 03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosureFragment({
  fragment,
  progress,
}: {
  fragment: (typeof FRAGMENTS)[number];
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, (value) => fragment.x * (1 - value));
  const y = useTransform(progress, (value) => fragment.y * (1 - value));
  const rotate = useTransform(progress, (value) => fragment.rotate * (1 - value));
  const z = useTransform(progress, (value) => fragment.z * (1 - value));
  const scale = useTransform(progress, [0, 1], [0.985, 1.01]);
  const position = `${fragment.column * 50}% ${fragment.row * 50}%`;

  return (
    <motion.div
      aria-hidden="true"
      className="relative min-h-0 min-w-0 bg-no-repeat"
      style={{
        x,
        y,
        z,
        rotate,
        scale,
        backgroundImage: `url("${IMAGE}")`,
        backgroundSize: "300% 300%",
        backgroundPosition: position,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    />
  );
}
