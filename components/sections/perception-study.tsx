"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const LETTERS = [
  ["D", ["11110", "10001", "10001", "10001", "10001", "10001", "11110"]],
  ["R", ["11110", "10001", "10001", "11110", "10100", "10010", "10001"]],
  ["E", ["11111", "10000", "10000", "11110", "10000", "10000", "11111"]],
  ["S", ["01111", "10000", "10000", "01110", "00001", "00001", "11110"]],
  ["S", ["01111", "10000", "10000", "01110", "00001", "00001", "11110"]],
] as const;

const REGIONS = [
  {
    name: "ESSENTIALS",
    index: "01",
    pieces: [
      { kind: "tee", name: "Cotton T-shirt", tone: "ink" },
      { kind: "shirt", name: "Relaxed shirt", tone: "rust" },
      { kind: "trousers", name: "Tailored trousers", tone: "ink" },
    ],
  },
  {
    name: "OUTERWEAR",
    index: "02",
    pieces: [
      { kind: "coat", name: "Long coat", tone: "rust" },
      { kind: "jacket", name: "Field jacket", tone: "ink" },
      { kind: "scarf", name: "Woven scarf", tone: "ink" },
    ],
  },
  {
    name: "ACCESSORIES",
    index: "03",
    pieces: [
      { kind: "bag", name: "Everyday bag", tone: "ink" },
      { kind: "shoe", name: "Leather shoe", tone: "rust" },
      { kind: "cap", name: "Soft cap", tone: "ink" },
    ],
  },
] as const;

type GarmentKind = (typeof REGIONS)[number]["pieces"][number]["kind"];
type GarmentTone = "ink" | "rust";

function GarmentGlyph({
  kind,
  tone,
  className,
}: {
  kind: GarmentKind;
  tone: GarmentTone;
  className?: string;
}) {
  const color = tone === "rust" ? "#8f452f" : "#25221f";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {kind === "tee" && (
        <>
          <path d="m15 10 5-3h8l5 3 8 6-5 7-5-3v20H17V20l-5 3-5-7 8-6Z" />
          <path d="m20 7 4 5 4-5M24 12v28" />
        </>
      )}
      {kind === "shirt" && (
        <>
          <path d="m15 9 5-2h8l5 2 8 6-5 8-5-3v20H17V20l-5 3-5-8 8-6Z" />
          <path d="m20 7 4 7 4-7M24 14v26m-2-19h4m-4 6h4m-4 6h4" />
        </>
      )}
      {kind === "trousers" && (
        <>
          <path d="M13 8h22l-2 32H23l-1-18-3 18h-9L13 8Z" />
          <path d="M13 13h21M23 9l1 13" />
        </>
      )}
      {kind === "coat" && (
        <>
          <path d="m15 8 9-3 9 3 7 7-5 7-4-3v20H17V19l-4 3-5-7 7-7Z" />
          <path d="m15 8 9 8 9-8M24 16v23m-2-14h4" />
        </>
      )}
      {kind === "jacket" && (
        <>
          <path d="m15 9 9-3 9 3 7 7-5 6-4-3v20H17V19l-4 3-5-6 7-7Z" />
          <path d="m15 9 9 7 9-7M24 16v23m-5-12h4m6 0h4m-15 6h5m5 0h5" />
        </>
      )}
      {kind === "scarf" && (
        <>
          <path d="M13 8h23v8H22v6h14v8H22v10h-9V8Z" />
          <path d="M17 12h3m-3 6h3m-3 6h3m-3 6h3m-3 6h3" />
        </>
      )}
      {kind === "bag" && (
        <>
          <path d="M11 18h26l2 22H9l2-22Z" />
          <path d="M17 18v-5a7 7 0 0 1 14 0v5" />
          <path d="M19 27h10" />
        </>
      )}
      {kind === "shoe" && (
        <>
          <path d="M9 29c5 0 8-3 10-11l7 8c3 3 6 4 11 5l3 2v6H8c-2-3-1-8 1-10Z" />
          <path d="m20 21 5 5m-8-2 5 5m-14 5h31" />
        </>
      )}
      {kind === "cap" && (
        <>
          <path d="M10 28a14 14 0 0 1 28 0H10Z" />
          <path d="M10 28c6-1 13 0 19 3 4 2 7 1 10-1" />
          <path d="M23 14v3" />
        </>
      )}
    </svg>
  );
}

function LetterGlyph({ kind }: { kind: number }) {
  const fill = kind % 9 === 0;
  const shape = kind % 3;

  if (shape === 0) {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M5 3h6l2 3-2 2 2 5H3l2-5-2-2 2-3Z" fill={fill ? "currentColor" : "none"} />
        <path d="m5 3 3 3 3-3M8 6v7" />
      </svg>
    );
  }

  if (shape === 1) {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v2L2 10h12L8 4" fill={fill ? "currentColor" : "none"} />
        <path d="M8 2c1.5 0 1.5 2 0 2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M4 3h8v10H4z" fill={fill ? "currentColor" : "none"} />
      <path d="M6 6h4m-4 2h3" />
    </svg>
  );
}

export function PerceptionStudy() {
  const [dispersed, setDispersed] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const entered = useInView(sectionRef, { once: true, margin: "-70px 0px" });
  let glyphIndex = 0;

  return (
    <section ref={sectionRef} id="perception-study" className="relative overflow-hidden border-y border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={false}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-foreground/20 pb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Perception study · 04</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
              {dispersed ? "Dispersed / 02" : "Connected / 01"}
            </p>
          </div>

          <div className="pt-8 sm:pt-12">
            <h2 className="sr-only">Dress together.</h2>
            <svg
              aria-hidden="true"
              viewBox="0 0 540 140"
              preserveAspectRatio="xMinYMid meet"
              className="h-auto w-full max-w-[1080px] overflow-visible text-foreground"
            >
              {LETTERS.map(([letter, rows], letterIndex) => {
                const cells = rows.flatMap((row, rowIndex) =>
                  Array.from(row).flatMap((filled, columnIndex) =>
                    filled === "1" ? [{ rowIndex, columnIndex }] : []
                  )
                );
                const letterStart = letterIndex * 112;

                return (
                  <g key={`${letter}-${letterIndex}`} aria-label={letter}>
                    {cells.map(({ rowIndex, columnIndex }) => {
                    const index = glyphIndex++;
                      const directionX = columnIndex - 2;
                      const directionY = rowIndex - 3;
                      const spread = dispersed
                        ? { x: Math.sign(directionX) * (8 + (index % 3) * 2), y: Math.sign(directionY) * (6 + (index % 2) * 2) }
                        : { x: 0, y: 0 };

                      return (
                        <motion.g
                          key={`${letterIndex}-${rowIndex}-${columnIndex}`}
                          initial={false}
                          animate={{ x: spread.x, y: entered ? spread.y : 12, opacity: entered ? 1 : 0 }}
                          transition={reducedMotion ? { duration: 0 } : {
                            type: "spring",
                            stiffness: 175,
                            damping: 22,
                            delay: entered && !dispersed ? 0.35 + index * 0.0015 : 0,
                          }}
                          style={{ transformOrigin: `${letterStart + columnIndex * 18 + 7}px ${rowIndex * 18 + 7}px` }}
                        >
                          <g transform={`translate(${letterStart + columnIndex * 18}, ${rowIndex * 18})`}>
                            <LetterGlyph kind={index} />
                          </g>
                        </motion.g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>

            <div className="mt-1 flex flex-col gap-5 sm:mt-3 sm:flex-row sm:items-end sm:justify-between">
              <motion.p
                aria-hidden="true"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 12 }}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.72 }}
                className="display-type max-w-[9ch] font-heading font-extrabold uppercase"
              >
                Together.
              </motion.p>
              <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground sm:text-right">
                Space creates relationships.
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              aria-pressed={dispersed}
              onClick={() => setDispersed((value) => !value)}
              className="group inline-flex min-h-11 w-fit items-center gap-3 border-b border-primary pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-offset-4"
            >
              {dispersed ? "Bring it together ↙" : "Break the group ↗"}
            </button>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Gestalt ↗ Proximity · Common Region
            </p>
          </div>

          <div className="pt-12 sm:pt-16">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">An edit in three parts</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">Pieces find their place.</h3>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Collection study / 04</span>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">
              {REGIONS.map((region, regionIndex) => (
                <div key={region.name} className="relative min-h-[190px] px-4 pb-4 pt-7 sm:px-3 lg:px-5">
                  <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: !entered ? 0 : dispersed ? 0.08 : 1 }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.45, delay: entered && !dispersed ? 1.35 + regionIndex * 0.08 : 0 }}
                    className="pointer-events-none absolute inset-0 border border-foreground/35 bg-[#ece8df]/35"
                  >
                    <motion.span
                      initial={false}
                      animate={{ scaleX: entered && !dispersed ? 1 : 0 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.55, delay: entered && !dispersed ? 1.38 + regionIndex * 0.08 : 0 }}
                      className="absolute -left-px -top-px h-px w-9 origin-left bg-primary"
                    />
                    <span className="absolute -left-px -top-px h-3 w-px bg-primary" />
                    <span className="absolute -bottom-px -right-px h-3 w-px bg-primary" />
                    <span className="absolute -bottom-px -right-px h-px w-9 bg-primary" />
                  </motion.div>
                  <div className="relative z-10 flex items-center justify-between">
                    <h4 className="bg-background px-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground">{region.name}</h4>
                    <span className="font-mono text-[9px] tabular-nums text-muted-foreground">{region.index}</span>
                  </div>
                  <div className="relative z-10 mt-5 flex min-h-24 items-center justify-around">
                    {region.pieces.map((piece, pieceIndex) => {
                      const offsets = [
                        { x: -18, y: -7 },
                        { x: 17, y: 9 },
                        { x: 4, y: -12 },
                      ];
                      const spread = dispersed
                        ? offsets[(pieceIndex + regionIndex) % offsets.length]
                        : { x: 0, y: 0 };

                      return (
                        <motion.div
                          key={piece.kind}
                          initial={false}
                          animate={{ x: entered ? spread.x : 0, y: entered ? spread.y : 8, opacity: entered ? 1 : 0 }}
                          transition={reducedMotion ? { duration: 0 } : {
                            type: "spring",
                            stiffness: 170,
                            damping: 22,
                            delay: entered && !dispersed ? 1.42 + regionIndex * 0.08 + pieceIndex * 0.045 : 0,
                          }}
                          className="grid size-[4.3rem] shrink-0 place-items-center sm:size-[3.6rem] lg:size-[4.3rem]"
                          title={piece.name}
                        >
                          <GarmentGlyph
                            kind={piece.kind}
                            tone={piece.tone}
                            className="h-12 w-12 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                          />
                          <span className="sr-only">{piece.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
