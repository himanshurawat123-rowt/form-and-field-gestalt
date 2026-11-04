const NEEDS = ["Fast product discovery", "Clear hierarchy", "Easy comparison", "Simple navigation", "Low visual clutter"];

const REFINEMENTS = [
  "Raised the primary action’s contrast so it is easier to find.",
  "Kept product name, price and variant choices close to the selected garment.",
  "Reduced the filter set to familiar categories and made each result explicit.",
];

function Wireframe() {
  return (
    <div role="img" aria-label="Wireframe showing campaign, product rail, filters and product details" className="bg-[#e7e2d8] p-4 sm:p-6">
      <div className="flex items-center justify-between border-b border-foreground/20 pb-3">
        <span className="h-2 w-14 bg-foreground/60" />
        <span className="h-2 w-24 bg-foreground/20" />
        <span className="h-2 w-10 bg-foreground/20" />
      </div>
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 py-4">
        <div className="flex min-h-24 flex-col justify-end bg-foreground/10 p-3">
          <span className="h-3 w-3/4 bg-foreground/50" />
          <span className="mt-2 h-2 w-1/2 bg-foreground/25" />
        </div>
        <div className="min-h-24 bg-foreground/25" />
      </div>
      <div className="flex gap-2 border-y border-foreground/20 py-3">
        {[0, 1, 2, 3].map((item) => <span key={item} className="h-4 w-12 rounded-full bg-foreground/15" />)}
      </div>
      <div className="flex items-end justify-between gap-2 py-4">
        {[0, 1, 2, 3, 4].map((item) => (
          <div key={item} className="flex w-full flex-col items-center">
            <span className={`h-14 w-7 ${item === 2 ? "bg-foreground/60" : "bg-foreground/20"}`} />
            <span className="mt-2 h-1.5 w-10 bg-foreground/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DesignProcess() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <header>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Project notes</p>
            <h2 className="mt-4 max-w-[9ch] font-heading text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl">
              Design with intent.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              A compact record of the brief, audience and decisions that shaped the store.
            </p>
          </header>

          <div className="divide-y divide-border border-y border-border">
            <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Problem</h3>
              <p className="max-w-2xl font-heading text-xl font-medium leading-snug tracking-[-0.03em] sm:text-2xl">
                Fashion e-commerce can become visually cluttered, making product discovery and decisions harder than they need to be.
              </p>
            </article>
            <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Audience</h3>
              <div>
                <p className="text-sm leading-7">
                  Young digital shoppers who value fashion, speed, visual clarity and intuitive browsing.
                </p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  The interface supports quick scanning as well as a slower, more considered look at fit and fabric.
                </p>
              </div>
            </article>
            <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">User needs</h3>
              <ul className="flex flex-wrap gap-2">
                {NEEDS.map((need) => (
                  <li key={need} className="border border-border px-3 py-2 text-xs font-medium">{need}</li>
                ))}
              </ul>
            </article>
            <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Ideation</h3>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Gestalt principles are used as functional design rules, not decoration: grouping helps comparison, a continuous rail guides browsing, and movement gives filters a clear result.
              </p>
            </article>
            <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Wireframe</h3>
              <div className="max-w-lg">
                <Wireframe />
                <p className="mt-2 text-[10px] leading-5 text-muted-foreground">Campaign → featured piece → story → collection → product detail.</p>
              </div>
            </article>
            <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Testing &amp; iteration</h3>
              <div>
                <p className="text-sm leading-7 text-muted-foreground">
                  The interaction path is reviewed from collection discovery through product selection and bag confirmation. Refinements focus on clarity rather than invented research metrics.
                </p>
                <ul className="mt-4 space-y-2">
                  {REFINEMENTS.map((refinement) => (
                    <li key={refinement} className="flex gap-2.5 text-xs leading-5 text-foreground/80">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      {refinement}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
