const NOTES = [
  {
    name: "Proximity",
    where: "DRESS experimental typography",
    why: "Small fashion elements form recognizable letterforms through spatial closeness. Increasing the distance between them weakens the perceived grouping.",
  },
  {
    name: "Similarity",
    where: "The Rail's hangers, labels and controls",
    why: "Repeated garment presentation and control styling make shared roles and collection membership clear.",
  },
  {
    name: "Continuity",
    where: "The horizontal clothing rail",
    why: "The continuous rail guides the eye from garment to garment in a natural left-to-right path.",
  },
  {
    name: "Closure",
    where: "Magnetic fashion image · Perception Study 03",
    why: "Nine fragments remain perceptually readable before they assemble, demonstrating how the eye completes an incomplete image.",
  },
  {
    name: "Figure–Ground",
    where: "Jacket / negative-space artwork",
    why: "The jacket is perceived first as the figure. Its central negative space simultaneously forms a tree. By shifting contrast rather than changing the geometry, the interaction demonstrates how the same composition can alternate between figure and ground.",
  },
  {
    name: "Common Region",
    where: "Wardrobe collection composition",
    why: "Different garments become perceptual groups when enclosed within shared editorial regions such as Essentials, Outerwear and Accessories.",
  },
  {
    name: "Common Fate",
    where: "Category transitions on The Rail",
    why: "Garments enter and leave together in a coordinated direction, making their selected category feel like a group.",
  },
  {
    name: "Focal Point",
    where: "Featured jacket and selected garment on The Rail",
    why: "The selected hanger grows and comes forward while neighboring garments subtly recede.",
  },
] as const;

export function DesignNotes() {
  return (
    <section id="notes" className="scroll-mt-24 border-t border-border bg-[#ece8df] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Design notes · 08 principles</p>
          <h2 className="mt-4 max-w-[9ch] font-heading text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">
            Behind the feeling.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
            The interface comes first. These notes connect the shopping experience to the decisions behind it.
          </p>
        </div>

        <ol className="border-t border-foreground/20">
          {NOTES.map((note, index) => (
            <li key={note.name} className="grid gap-3 border-b border-foreground/20 py-5 sm:grid-cols-[2.4rem_9rem_1fr] sm:gap-5 sm:py-6">
              <span className="pt-1 font-mono text-[10px] tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-lg font-semibold tracking-[-0.03em]">{note.name}</h3>
              <div>
                <p className="text-xs font-semibold">{note.where}</p>
                <p className="mt-1.5 max-w-xl text-xs leading-6 text-muted-foreground">{note.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
