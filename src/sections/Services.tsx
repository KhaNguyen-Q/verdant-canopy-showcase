import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "./assets";
import { Reveal } from "./_shared";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof ASSETS.services)[number];
  index: number;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [active, setActive] = useState(false);

  // On touch devices, reveal the image when the card scrolls into the
  // central band of the viewport so mobile users see the hover animation.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window);
    if (!isTouch) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setActive(e.isIntersecting));
      },
      {
        // Trigger when the card crosses the middle ~40% of the viewport
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal delay={index * 80}>
      <a
        ref={cardRef}
        href="#contact"
        data-active={active ? "true" : "false"}
        className="service-card group relative block aspect-[4/5] overflow-hidden border-t border-white/10"
      >
        <img
          src={service.image}
          alt={service.title}
          className="service-card__img absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="service-card__scrim absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]/95 transition-opacity duration-700 group-hover:from-black/30 group-hover:via-black/40 group-hover:to-black/80" />

        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          <div className="flex items-start justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-[#f5f3ee]/50">
              {service.number}
            </span>
            <Icon
              size={20}
              className="text-[#a8b89a] transition group-hover:text-[#f5f3ee]"
            />
          </div>
          <div>
            <h3 className="font-display text-3xl text-[#f5f3ee] md:text-4xl">
              {service.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#f5f3ee]/60">
              {service.blurb}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#f5f3ee]/70 transition group-hover:text-[#f5f3ee]">
              Discuss scope <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[#0a0a0a] py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#a8b89a]">
              — Capabilities
            </p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9" delay={120}>
            <h2 className="font-display text-balance text-4xl leading-[1.05] text-[#f5f3ee] md:text-6xl">
              Four disciplines, one continuous practice of care.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {ASSETS.services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        /* Scroll-triggered reveal for touch devices — mirrors the
           desktop hover animation so mobile users get the same effect. */
        .service-card[data-active="true"] .service-card__img {
          opacity: 1;
          transform: scale(1.05);
        }
        .service-card[data-active="true"] .service-card__scrim {
          background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.8)
          );
        }
      `}</style>
    </section>
  );
}
