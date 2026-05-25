import { ASSETS } from "./assets";
import { BackgroundVideo, Reveal } from "./_shared";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative bg-[#0a0a0a] py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 md:px-12">
        <Reveal className="col-span-12 md:col-span-7">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-[#a8b89a]">
            — Our Philosophy
          </p>
          <h2 className="font-display text-balance text-4xl leading-[1.05] text-[#f5f3ee] md:text-7xl">
            A tree is not a problem to be solved.
            <span className="text-[#f5f3ee]/40">
              {" "}
              It is a structure to be understood, a life to be kept.
            </span>
          </h2>
          <p className="mt-12 max-w-md text-sm leading-relaxed text-[#f5f3ee]/60 md:text-base">
            We work at the intersection of biology and craft. Every assignment
            begins with patience — reading the canopy, the soil, the long memory
            of the site — before a single cut is made.
          </p>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-5" delay={200}>
          <BackgroundVideo
            src={ASSETS.philosophy.video}
            poster={ASSETS.philosophy.poster}
            className="aspect-[3/4] w-full"
            overlayClassName="bg-black/20"
          />
        </Reveal>
      </div>
    </section>
  );
}
