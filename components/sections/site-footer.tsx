export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="#top" className="font-heading text-xl font-extrabold tracking-[-0.06em]">
              FORM <span className="font-normal">&amp;</span> FIELD
            </a>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-background/65">
              Thoughtful pieces, made for the everyday. Designed to be worn, lived in, and found with ease.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-background/65">
            <a href="#collection" className="hover:text-background">Shop the edit</a>
            <a href="#notes" className="hover:text-background">Design notes</a>
            <a href="#process" className="hover:text-background">The process</a>
            <a href="#top" className="hover:text-background">Back to top ↑</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-background/50">
            An independent design study · 2026
          </p>
        </div>

        <div className="flex flex-col gap-7 border-t border-background/20 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="space-y-2 text-[10px] uppercase tracking-[0.14em] text-background/55">
            <p>Design Foundations Assignment • Lab 3: Creative Web Typography</p>
            <p>Curated &amp; Developed by Himanshu Rawat • Mentored by Prof. Pankaj Badoni</p>
          </div>
          <div className="sm:text-right">
            <p className="font-heading text-sm font-semibold tracking-[0.04em] text-background/85">
              HIMANSHU RAWAT
            </p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-background/55">
              SAP ID · 590036544
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-background/55">
              B.TECH CSE · IMMERSIVE TECHNOLOGY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
