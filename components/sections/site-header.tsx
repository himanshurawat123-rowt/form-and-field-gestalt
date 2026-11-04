"use client";

import * as React from "react";
import { Search, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#featured", label: "The edit" },
  { href: "#collection", label: "Shop" },
  { href: "#notes", label: "Design notes" },
  { href: "#process", label: "Process" },
] as const;

interface SiteHeaderProps {
  bagCount: number;
  onOpenBag: () => void;
  onSearch: () => void;
}

export function SiteHeader({ bagCount, onOpenBag, onSearch }: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors motion-reduce:transition-none",
        scrolled ? "border-border/80 bg-background" : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="FORM & FIELD, home" className="group flex flex-col leading-none text-foreground">
          <span className="font-heading text-base font-extrabold tracking-[-0.06em] sm:text-lg">FORM <span className="font-normal">&amp;</span> FIELD</span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.19em] text-muted-foreground">Objects for everyday</span>
        </a>

        <nav aria-label="Page sections" className="hidden items-center gap-5 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:content-[''] hover:after:scale-x-100 motion-reduce:after:transition-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search the collection"
            className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <Search aria-hidden="true" className="size-[18px]" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingBag aria-hidden="true" className="size-[17px]" strokeWidth={1.6} />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums">{String(bagCount).padStart(2, "0")}</span>
          </button>
        </div>
      </div>
      <nav aria-label="Mobile page sections" className="flex gap-5 overflow-x-auto border-t border-border/70 px-5 py-2.5 lg:hidden">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default SiteHeader;
