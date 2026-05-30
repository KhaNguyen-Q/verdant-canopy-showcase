import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "./assets";
import { BackgroundVideo, Reveal } from "./_shared";

export function Hero() {
  return (
    <section id="top" className="relative h-screen w-full">
      <BackgroundVideo
        src={ASSETS.hero.video}
        poster={ASSETS.hero.poster}
        className="h-full w-full"
        overlayClassName="bg-gradient-to-b from-black/80 via-black/65 to-black/90"
        fadeLoop
        fadeDuration={1}
      >
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
          <div className="grid w-full grid-cols-12 items-end gap-6">
            <Reveal className="col-span-12 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] text-[#f5f3ee]/70">
                {ASSETS.brand.tagline}
              </p>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-9" delay={150}>
              <h1 className="font-display text-balance text-5xl leading-[1.02] text-[#f5f3ee] md:text-[7.5rem]">
                Preserving
                <br />
                <span className="italic text-[#a8b89a]">nature's</span> architecture.
              </h1>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-1 md:justify-self-end" delay={300}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-[#f5f3ee]/40 bg-[#f5f3ee]/5 px-6 py-3 text-base uppercase tracking-[0.25em] text-[#f5f3ee] backdrop-blur-sm transition hover:border-[#f5f3ee] hover:bg-[#f5f3ee]/15 md:text-lg"
              >
                Inquire <ArrowUpRight size={20} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </BackgroundVideo>
    </section>
  );
}
