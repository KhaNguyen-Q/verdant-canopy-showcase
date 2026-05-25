import { ASSETS } from "./assets";
import { BackgroundImage, Reveal } from "./_shared";

export function SelectedWork() {
  return (
    <section id="work" className="bg-[#0a0a0a] py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#a8b89a]">
              — Selected Work
            </p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9" delay={120}>
            <h2 className="font-display text-4xl leading-[1.05] text-[#f5f3ee] md:text-6xl">
              Estates, archives, and quiet survivals.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {ASSETS.portfolio.map((src, i) => (
            <Reveal
              key={src}
              delay={i * 100}
              className={
                i === 0
                  ? "col-span-12 md:col-span-7"
                  : i === 1
                    ? "col-span-12 md:col-span-5 md:mt-24"
                    : "col-span-12 md:col-span-8 md:col-start-3"
              }
            >
              <BackgroundImage
                src={src}
                className="aspect-[4/3] w-full"
                overlayClassName="bg-black/10"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
