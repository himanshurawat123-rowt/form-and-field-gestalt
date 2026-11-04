"use client";

import * as React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Minus, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";

import { DesignNotes } from "@/components/sections/design-notes";
import { FigureGroundEditorial } from "@/components/sections/figure-ground-editorial";
import { PerceptionStudy } from "@/components/sections/perception-study";
import { MagneticFashionClosure } from "@/components/ui/magnetic-fashion-closure";
import { DesignProcess } from "@/components/sections/project-process";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { ClothingRailHero, type RailGarment } from "@/components/ui/product-rail-gallery";
import { GestaltAnnotation } from "@/components/ui/gestalt-annotation";
import { PRODUCTS, type StoreProduct } from "@/lib/products";
import { ALL_PRODUCTS, RAIL_CATEGORY_OPTIONS, RAIL_PRODUCTS, type RailCategory } from "@/lib/rail-products";
import { cn } from "@/lib/utils";

interface BagLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

export function Storefront() {
  const [railCategory, setRailCategory] = React.useState<RailCategory>("all");
  const [railDirection, setRailDirection] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [bag, setBag] = React.useState<BagLine[]>([]);
  const [bagOpen, setBagOpen] = React.useState(false);
  const [saved, setSaved] = React.useState<string[]>([]);
  const [toast, setToast] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  const filteredRailProducts = React.useMemo(() => {
    const term = query.trim().toLowerCase();
    return RAIL_PRODUCTS.filter((product) => {
      const inCategory = railCategory === "all" || product.railCategories.includes(railCategory);
      const inSearch = !term || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term);
      return inCategory && inSearch;
    });
  }, [railCategory, query]);

  const bagCount = bag.reduce((count, line) => count + line.quantity, 0);
  const subtotal = bag.reduce((total, line) => {
    const product = ALL_PRODUCTS.find((entry) => entry.id === line.productId);
    return total + (product?.price ?? 0) * line.quantity;
  }, 0);

  React.useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToBag = React.useCallback((product: StoreProduct, size: string, color: string) => {
    setBag((current) => {
      const existing = current.find((line) => line.productId === product.id && line.size === size && line.color === color);
      if (existing) {
        return current.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...current, { productId: product.id, size, color, quantity: 1 }];
    });
    setToast(`${product.name} · ${size} added to your bag`);
  }, []);

  const addRailItem = React.useCallback((item: RailGarment, size: string, color: string) => {
    const product = ALL_PRODUCTS.find((entry) => entry.id === item.id);
    if (!product) {
      setToast("That piece is no longer available.");
      return;
    }
    addToBag(product, size, color);
  }, [addToBag]);

  const toggleSaved = React.useCallback((productId: string, nextSaved: boolean) => {
    setSaved((current) =>
      nextSaved
        ? current.includes(productId) ? current : [...current, productId]
        : current.filter((id) => id !== productId)
    );
    setToast(nextSaved ? "Saved to your edit." : "Removed from your edit.");
  }, []);

  const updateQuantity = (line: BagLine, change: number) => {
    setBag((current) =>
      current.flatMap((entry) => {
        if (entry !== line) return [entry];
        const quantity = entry.quantity + change;
        return quantity > 0 ? [{ ...entry, quantity }] : [];
      })
    );
  };

  const focusSearch = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    window.setTimeout(() => searchRef.current?.focus(), reducedMotion ? 0 : 350);
  };

  const shopFeatured = () => {
    setRailCategory("jackets");
    setRailDirection(1);
    setQuery("");
    document.getElementById("collection")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader bagCount={bagCount} onOpenBag={() => setBagOpen(true)} onSearch={focusSearch} />

      <main id="main">
        <CampaignHero />

        <section id="featured" className="relative scroll-mt-28 border-y border-border/70">
          <div className="mx-auto grid max-w-[1440px] gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[420px] overflow-hidden bg-[#d7d0c3] sm:min-h-[560px]">
              <Image
                src={PRODUCTS[3]?.image ?? ""}
                alt="A relaxed field jacket from the everyday collection"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
              />
              <span className="absolute left-5 top-5 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] sm:left-8 sm:top-8">
                The piece to keep
              </span>
              <span aria-hidden="true" className="absolute bottom-4 right-5 font-heading text-[clamp(4rem,12vw,11rem)] font-extrabold leading-none tracking-[-0.09em] text-background/80 mix-blend-screen sm:bottom-7 sm:right-8">
                FIELD
              </span>
            </div>
            <div className="flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-14 lg:px-[clamp(2.5rem,7vw,8rem)] lg:py-16">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">04 / Outerwear</p>
                <h2 className="mt-5 max-w-lg font-heading text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
                  The Field
                  <br />
                  Jacket
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                  A dependable layer with a little room to move. Cut from durable cotton twill and finished with utility pockets.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-5">
                <div>
                  <p className="text-sm font-semibold">Field Jacket</p>
                  <p className="mt-1 text-xs text-muted-foreground">Cotton twill · Field olive</p>
                </div>
                <button
                  type="button"
                  onClick={shopFeatured}
                  className="inline-flex min-h-12 items-center gap-3 bg-primary px-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Find your size <ArrowUpRight aria-hidden="true" className="size-4" />
                </button>
              </div>
              <GestaltAnnotation
                className="mt-6"
                align="left"
                principles={[
                  {
                    name: "PROXIMITY",
                    explanation: "The featured garment's name, material, colour and action are grouped together.",
                  },
                  {
                    name: "FOCAL POINT",
                    explanation: "The featured jacket and its image receive more visual weight than supporting details.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <EditorialStory />
        <FigureGroundEditorial />
        <MagneticFashionClosure />
        <PerceptionStudy />

        <section id="collection" className="relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-8 border-b border-border pb-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">COLLECTION / 01</p>
                <h2 className="mt-3 font-heading text-5xl font-semibold uppercase tracking-[-0.065em] sm:text-7xl">THE RAIL</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Browse by form.</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" />
                <span aria-live="polite">
                  {filteredRailProducts.length} {filteredRailProducts.length === 1 ? "piece" : "pieces"} in this edit
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div role="group" aria-label="Browse clothing categories" className="flex flex-wrap gap-x-5 gap-y-1">
                {RAIL_CATEGORY_OPTIONS.map((item, index) => {
                  const active = railCategory === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        const currentIndex = RAIL_CATEGORY_OPTIONS.findIndex((option) => option.value === railCategory);
                        setRailDirection(index >= currentIndex ? 1 : -1);
                        setRailCategory(item.value);
                      }}
                      className={cn(
                        "min-h-11 border-b px-0.5 text-[10px] font-semibold tracking-[0.14em] transition-colors",
                        active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <GestaltAnnotation
                className="mt-3"
                align="left"
                principles={[
                  {
                    name: "PROXIMITY",
                    explanation: "Category controls sit together, and each garment's label and price stay grouped with its piece.",
                  },
                  {
                    name: "SIMILARITY",
                    explanation: "The categories share one typographic treatment, while garments share consistent hanger and label presentation.",
                  },
                ]}
              />
              <label className="flex min-h-10 items-center gap-2 border-b border-border px-1 text-muted-foreground focus-within:border-foreground">
                <Search aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.7} />
                <span className="sr-only">Search products</span>
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find a piece"
                  className="w-full min-w-0 bg-transparent py-2 text-xs text-foreground outline-none placeholder:text-muted-foreground sm:w-36"
                />
              </label>
            </div>

            <GestaltAnnotation
              className="ml-auto mt-3"
              align="right"
              principles={[
                {
                  name: "CONTINUITY",
                  explanation: "The horizontal clothing rail creates a continuous visual path from left to right.",
                },
                {
                  name: "COMMON FATE",
                  explanation: "When categories change, related garments move together in the same coordinated direction.",
                },
              ]}
            />

            <AnimatePresence mode="wait" initial={false} custom={railDirection}>
              {filteredRailProducts.length ? (
                <motion.div
                  key={railCategory}
                  custom={railDirection}
                  variants={{
                    enter: (direction: number) => ({ opacity: 0, x: direction * 38 }),
                    center: { opacity: 1, x: 0 },
                    exit: (direction: number) => ({ opacity: 0, x: direction * -38 }),
                  }}
                  initial={reducedMotion ? false : "enter"}
                  animate="center"
                  exit={reducedMotion ? undefined : "exit"}
                  layout
                  transition={{
                    duration: reducedMotion ? 0 : 0.45,
                    ease: [0.22, 0.85, 0.3, 1],
                  }}
                  className="pt-4"
                >
                  <ClothingRailHero
                    items={filteredRailProducts}
                    aria-label="Interactive garment collection"
                    caption="Select a garment to explore its details."
                    autoplay={false}
                    hanger="wood"
                    onAddToBag={addRailItem}
                    onToggleSave={(id, next) => toggleSaved(id, next)}
                    savedIds={saved}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`${railCategory}-empty`}
                  initial={reducedMotion ? false : { opacity: 0, x: railDirection * 38 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: railDirection * -38 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 0.85, 0.3, 1] }}
                  className="grid min-h-64 place-items-center py-16 text-center"
                >
                  <div>
                    <p className="font-heading text-xl font-semibold">No pieces found.</p>
                    <p className="mt-2 text-sm text-muted-foreground">Try another search or browse the full rail.</p>
                    <button type="button" onClick={() => { setRailCategory("all"); setQuery(""); }} className="mt-5 border-b border-foreground pb-1 text-xs font-semibold">
                      Clear filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Drag the hangers · Use arrow keys · Select a piece for details
            </p>
          </div>
        </section>

        <DesignProcess />
        <DesignNotes />
      </main>

      <SiteFooter />

      <Dialog.Root open={bagOpen} onOpenChange={setBagOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-foreground/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex h-[100dvh] w-full max-w-[30rem] flex-col border-l border-border bg-background shadow-2xl focus:outline-none">
            <div className="flex items-start justify-between border-b border-border px-6 py-6 sm:px-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">FORM &amp; FIELD</p>
                <Dialog.Title className="mt-2 font-heading text-3xl font-semibold tracking-[-0.05em]">Your bag <span className="text-muted-foreground">({bagCount})</span></Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted-foreground">A considered edit, ready when you are.</Dialog.Description>
              </div>
              <Dialog.Close aria-label="Close shopping bag" className="grid size-10 place-items-center rounded-full border border-border text-lg transition-colors hover:bg-secondary">
                ×
              </Dialog.Close>
            </div>

            {bag.length ? (
              <>
                <ul className="flex-1 space-y-0 overflow-y-auto px-6 sm:px-8">
                  {bag.map((line) => {
                    const product = PRODUCTS.find((entry) => entry.id === line.productId);
                    if (!product) return null;
                    return (
                      <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4 border-b border-border py-5">
                        <div className="relative h-28 w-[5.5rem] shrink-0 bg-secondary">
                          <Image src={product.image ?? ""} alt="" fill sizes="88px" className="object-cover" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold">{product.name}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{line.color} · Size {line.size}</p>
                            </div>
                            <p className="shrink-0 text-sm font-medium">{formatPrice(product.price * line.quantity)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="inline-flex h-8 items-center border border-border">
                              <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(line, -1)} className="grid size-8 place-items-center hover:bg-secondary">
                                <Minus aria-hidden="true" className="size-3" />
                              </button>
                              <span className="w-7 text-center text-xs tabular-nums">{line.quantity}</span>
                              <button type="button" aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(line, 1)} className="grid size-8 place-items-center hover:bg-secondary">
                                <Plus aria-hidden="true" className="size-3" />
                              </button>
                            </div>
                            <button type="button" onClick={() => setBag((current) => current.filter((entry) => entry !== line))} className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">
                              <Trash2 aria-hidden="true" className="size-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-border px-6 py-6 sm:px-8">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Shipping and taxes are calculated at checkout.</p>
                  <button
                    type="button"
                    onClick={() => { setBagOpen(false); setToast("Your edit is ready for checkout."); }}
                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 bg-primary text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Continue to checkout <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="grid flex-1 place-items-center p-8 text-center">
                <div>
                  <ShoppingBag aria-hidden="true" className="mx-auto size-7 text-muted-foreground" strokeWidth={1.4} />
                  <p className="mt-5 font-heading text-xl font-semibold">Your bag is taking shape.</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Find a piece you love and it will be waiting here.</p>
                  <Dialog.Close asChild>
                    <a href="#collection" className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-foreground text-xs font-semibold uppercase tracking-[0.12em]">
                      Explore the collection <ArrowRight aria-hidden="true" className="size-4" />
                    </a>
                  </Dialog.Close>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 border border-foreground/10 bg-foreground px-5 py-3 text-xs font-medium text-background shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CampaignHero() {
  const heroRef = React.useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const scrollY = useMotionValue(0);
  const imageY = useTransform(scrollY, [0, 1000], [0, 54]);
  const pointerX = useMotionValue(0);
  const sharedX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.8 });
  const headlineShift = useTransform(sharedX, [-1, 1], [-4, 4]);
  const objectShift = useTransform(sharedX, [-1, 1], [-10, 10]);

  const trackHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || window.innerWidth < 640) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, normalizedX)) * (window.innerWidth < 1024 ? 0.55 : 1));
  };

  const resetHeroPointer = () => pointerX.set(0);

  const renderHeadlineLine = (text: string, delay: number, accent = false) => (
    <motion.div
      style={{ x: headlineShift }}
      whileHover={reducedMotion ? undefined : { y: -2, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 240, damping: 25 }}
      className={accent ? "block whitespace-nowrap text-primary" : "block whitespace-nowrap"}
    >
      {(() => {
        const wordStarts = Array.from(text.matchAll(/\S+/g), (match) => match.index ?? 0);
        return Array.from(text).map((letter, index) => {
          const wordIndex = wordStarts.filter((start) => start <= index).length - 1;
          const wordStart = wordStarts[Math.max(0, wordIndex)] ?? 0;
          const letterDelay = delay + Math.max(0, wordIndex) * 0.26 + (index - wordStart) * 0.025;

          return (
            <motion.span
              key={`${text}-${index}`}
              aria-hidden="true"
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={reducedMotion ? { duration: 0 } : {
                type: "spring",
                stiffness: 180,
                damping: 24,
                mass: 0.75,
                delay: letterDelay,
              }}
              className={letter === " " ? "inline-block w-[0.3em]" : "inline-block"}
            >
              {letter === " " ? "" : letter}
            </motion.span>
          );
        });
      })()}
    </motion.div>
  );

  React.useEffect(() => {
    if (reducedMotion) return;
    const updateScroll = () => scrollY.set(window.scrollY);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [reducedMotion, scrollY]);

  return (
    <section
      ref={heroRef}
      id="top"
      onPointerMove={trackHeroPointer}
      onPointerLeave={resetHeroPointer}
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid min-h-[650px] max-w-[1440px] grid-cols-1 items-center px-5 pb-12 pt-16 sm:px-8 sm:pt-20 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-16 lg:pt-10">
        <div className="relative z-10 pb-8 lg:pb-0">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 0.85, 0.3, 1] }}
            className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="size-2 rounded-full bg-primary" />
            Autumn / winter · 2026
          </motion.p>
          <div
            className="relative isolate mt-8 pb-8"
          >
            <h1 className="display-type max-w-[9ch] font-heading font-extrabold uppercase">
              <span className="sr-only">Wear what moves you.</span>
              <div aria-hidden="true">
                {renderHeadlineLine("WEAR WHAT", 0.1)}
                {renderHeadlineLine("MOVES YOU.", 0.62, true)}
              </div>
            </h1>

            <motion.div
              aria-hidden="true"
              style={{ x: objectShift }}
              initial={reducedMotion ? false : { opacity: 0, y: -8, rotate: -5 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 20, delay: 1.22 }}
              whileHover={reducedMotion ? undefined : { rotate: 4 }}
              className="pointer-events-auto absolute right-[6%] top-[-1.1rem] z-10 text-primary/80"
            >
              <svg viewBox="0 0 48 42" className="h-9 w-10 sm:h-10 sm:w-12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 8c0-2 1.4-3.5 3.2-3.5S28.5 6 27.1 7.7L24 11" />
                <path d="m24 11-18 17c-.7.7-.2 1.9.8 1.9h34.4c1 0 1.5-1.2.8-1.9L24 11Z" />
              </svg>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={{ x: objectShift }}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 23, delay: 1.34 }}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              className="pointer-events-auto absolute bottom-1 left-[2%] z-10 text-foreground/75"
            >
              <svg viewBox="0 0 54 42" className="h-8 w-11 sm:h-9 sm:w-12" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 7 12-4 12 4 9 8-7 7-5-4v20H18V22l-5 4-7-8 9-11Z" />
                <path d="m15 7 12 9 12-9M27 16v22" />
              </svg>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={{ x: objectShift }}
              initial={reducedMotion ? false : { opacity: 0, rotate: 5 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22, delay: 1.46 }}
              whileHover={reducedMotion ? undefined : { rotate: -3, y: -2 }}
              className="pointer-events-auto absolute bottom-[-0.2rem] right-[9%] z-10 text-primary/75"
            >
              <svg viewBox="0 0 58 34" className="h-7 w-12 sm:h-8 sm:w-14" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8c8-6 14 6 22 0s14 6 22 0" />
                <path d="M3 17c8-6 14 6 22 0s14 6 22 0" />
                <path d="M3 26c8-6 14 6 22 0s14 6 22 0" />
                <path d="M47 8v18l6 4" />
              </svg>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={{ x: objectShift }}
              initial={reducedMotion ? false : { opacity: 0, y: -7, rotate: 8 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 22, delay: 1.58 }}
              whileHover={reducedMotion ? undefined : { rotate: 5 }}
              className="pointer-events-auto absolute bottom-[-1.3rem] right-[1%] z-10 text-primary"
            >
              <svg viewBox="0 0 24 34" className="h-8 w-6" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v5" />
                <path d="M12 7 3 10v20l9 2 9-2V10l-9-3Z" />
                <circle cx="12" cy="12" r="1" />
                <path d="M7 17h10" />
              </svg>
            </motion.div>

            <motion.svg
              aria-hidden="true"
              style={{ x: objectShift }}
              viewBox="0 0 520 18"
              preserveAspectRatio="none"
              className="pointer-events-none absolute bottom-[-1.1rem] left-0 h-3 w-[84%] text-primary/55"
              initial={reducedMotion ? false : { opacity: 0 }}
              whileInView={reducedMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.35, delay: 1.62 }}
            >
              <motion.path
                d="M1 12C112 2 205 17 314 8s141-5 205-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={reducedMotion ? false : { pathLength: 0 }}
                whileInView={reducedMotion ? undefined : { pathLength: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 0.85, 0.3, 1], delay: 1.62 }}
              />
            </motion.svg>
          </div>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:max-w-xl">
            <p className="max-w-[30ch] text-sm leading-7 text-muted-foreground">
              A quieter kind of wardrobe. Thoughtful layers, honest materials, and room to make them your own.
            </p>
            <a href="#collection" className="group inline-flex min-h-12 shrink-0 items-center gap-3 self-start border-b border-foreground pb-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
              Explore the collection
              <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-1 motion-reduce:transition-none" />
            </a>
          </div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 0.85, 0.3, 1], delay: 1.55 }}
          >
            <GestaltAnnotation
              className="mt-7"
              align="left"
              principles={[
                {
                  name: "COMMON FATE",
                  explanation: "The headline and clothing details drift together as one visual group.",
                },
                {
                  name: "FOCAL POINT",
                  explanation: "The oversized headline remains the first point of focus.",
                },
              ]}
            />
          </motion.div>
        </div>

        <div className="relative -mx-5 h-[min(112vw,620px)] overflow-hidden sm:mx-0 sm:h-[min(78vw,720px)] lg:ml-[-8%] lg:h-[min(75vh,760px)]">
          <span aria-hidden="true" className="editorial-outline absolute -left-4 top-[8%] z-0 select-none font-heading text-[clamp(6rem,17vw,17rem)] font-extrabold leading-none tracking-[-0.1em] text-foreground/20">
            MOVE
          </span>
          <motion.div
            className="absolute inset-x-[10%] inset-y-[3%] z-10 overflow-hidden bg-[#d0c9bd]"
            style={{ y: reducedMotion ? 0 : imageY }}
          >
            <Image
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=90"
              alt="Fashion campaign portrait in a softly structured neutral outfit"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="object-cover object-center"
            />
            <span className="absolute bottom-4 left-4 bg-background/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em]">
              Form follows feeling · No. 01
            </span>
          </motion.div>
          <span className="absolute right-0 top-[20%] z-20 hidden -rotate-90 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Designed for the in-between
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-5 right-5 h-px bg-border sm:left-8 sm:right-8 lg:left-12 lg:right-12" />
    </section>
  );
}

function EditorialStory() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="editorial" className="relative isolate overflow-hidden bg-[#292722] text-[#f4f0e8]">
      <div className="mx-auto grid min-h-[540px] max-w-[1440px] items-center gap-8 px-5 py-16 sm:px-8 lg:min-h-[640px] lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-20">
        <div className="relative z-10 lg:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d3a08d]">A note on getting dressed</p>
          <h2 className="mt-7 max-w-[9ch] font-heading text-5xl font-semibold leading-[0.92] tracking-[-0.065em] sm:text-7xl">
            Made for
            <br />
            <span className="editorial-outline text-[#f4f0e8]/35">the long way</span>
            <br />
            home.
          </h2>
          <p className="mt-7 max-w-[34ch] text-sm leading-7 text-[#f4f0e8]/65">
            The best clothes don’t ask for an occasion. They move with the day, soften with time, and become part of the story.
          </p>
          <a href="#collection" className="mt-8 inline-flex items-center gap-3 border-b border-[#f4f0e8]/50 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4f0e8] transition-colors hover:border-[#d3a08d]">
            Find your everyday <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
        <motion.figure
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 0.85, 0.3, 1] }}
          className="relative ml-auto aspect-[4/3] w-full max-w-[760px] overflow-hidden bg-[#777166] lg:aspect-[1.16/1]"
        >
          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85"
            alt="A model in layered everyday clothing, caught mid-stride"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
          />
          <span aria-hidden="true" className="absolute -bottom-5 -left-3 font-heading text-[clamp(5rem,12vw,12rem)] font-extrabold leading-none tracking-[-0.1em] text-background/75 mix-blend-screen">
            FORM
          </span>
          <figcaption className="absolute right-4 top-4 bg-foreground/80 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-background">
            On the move · 08:42
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default Storefront;
