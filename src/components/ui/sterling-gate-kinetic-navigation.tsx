import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Plus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export interface NavLink {
  href: string;
  label: string;
}

export interface KineticNavProps {
  brand: string;
  links: NavLink[];
}

export function KineticNav({ brand, links }: KineticNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  // Setup easing once
  useEffect(() => {
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }
  }, []);

  // Scroll direction listener — hide on scroll down, show on scroll up
  useEffect(() => {
    lastYRef.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastYRef.current;
        if (isOpen) {
          setHidden(false);
        } else if (y < 80) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }
        lastYRef.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  // Open/close animation
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const root = containerRef.current!;
      const navWrap = root.querySelector(".nav-overlay-wrapper") as HTMLElement | null;
      const menu = root.querySelector(".menu-content");
      const overlay = root.querySelector(".overlay");
      const bgPanels = root.querySelectorAll(".backdrop-layer");
      const menuLinks = root.querySelectorAll(".nav-link");
      const menuButtonTexts = root.querySelectorAll(".nav-close-btn .btn-text");
      const menuButtonIcon = root.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isOpen) {
        if (navWrap) navWrap.setAttribute("data-nav", "open");
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.18 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 135 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(
            bgPanels,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.1, duration: 0.6 },
            "<",
          )
          .fromTo(
            menuLinks,
            { yPercent: 140, rotate: 8 },
            { yPercent: 0, rotate: 0, stagger: 0.06 },
            "<+=0.3",
          );
      } else {
        if (navWrap) navWrap.setAttribute("data-nav", "closed");
        // Symmetrical reverse: links exit first, then panels slide back out, overlay fades
        tl.to(menuLinks, {
          yPercent: 140,
          rotate: 8,
          stagger: { each: 0.05, from: "end" },
          duration: 0.45,
        })
          .to(
            bgPanels,
            {
              xPercent: 101,
              stagger: { each: 0.08, from: "end" },
              duration: 0.55,
            },
            "<+=0.05",
          )
          .to(overlay, { autoAlpha: 0, duration: 0.4 }, "<")
          .to(menuButtonTexts, { yPercent: 0, stagger: 0.12 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50">
      {/* Top bar — slides up on scroll down, slides down on scroll up */}
      <div
        className={`pointer-events-auto relative z-[60] flex items-center justify-between gap-6 px-6 py-6 transition-transform duration-500 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] md:px-12 md:py-8 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <a
          href="#top"
          className="font-display text-2xl tracking-tight text-[#f5f3ee] md:text-3xl"
        >
          {brand}
        </a>

        {/* Desktop inline nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-[#f5f3ee]/10 bg-[#0a0a0a]/50 px-2 py-1.5 backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#f5f3ee]/80 transition-colors hover:text-[#f5f3ee]"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 rounded-full bg-[#f5f3ee]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-full bg-[#f5f3ee] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#0a0a0a] transition-colors hover:bg-[#a8b89a]"
          >
            Inquire
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="nav-close-btn group relative h-12 gap-3 overflow-hidden rounded-full border border-[#f5f3ee]/15 bg-[#0a0a0a]/60 px-5 text-[#f5f3ee] backdrop-blur-md transition hover:border-[#f5f3ee]/40 hover:bg-[#141815]/80 text-sm font-serif font-extrabold flex-row flex items-center justify-center md:hidden"
        >
          <span className="relative block h-4 overflow-hidden text-[10px] uppercase tracking-[0.25em]">
            <span className="btn-text block">Menu</span>
            <span className="btn-text block">Close</span>
          </span>
          <span className="menu-button-icon inline-flex h-5 w-5 items-center justify-center">
            <Plus size={18} strokeWidth={1.5} />
          </span>
        </button>
      </div>

      {/* Overlay menu (mobile) */}
      <div
        className="nav-overlay-wrapper fixed inset-0 md:hidden"
        style={{ display: "none" }}
        data-nav="closed"
      >
        <div
          className="overlay absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          style={{ opacity: 0 }}
        />

        <div className="menu-content pointer-events-auto absolute inset-y-0 right-0 flex w-full max-w-md flex-col md:max-w-lg">
          {/* Layered moss/obsidian backdrop panels */}
          <div className="backdrop-layer absolute inset-0 bg-[#0a0a0a]" />
          <div className="backdrop-layer absolute inset-0 bg-[#141815]" />
          <div className="backdrop-layer absolute inset-0 bg-[#1e291b]" />

          <nav className="relative flex h-full flex-col justify-between px-8 pt-28 pb-12 md:px-14">
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <a
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className="nav-link group flex items-baseline gap-4 font-display text-4xl text-[#f5f3ee] transition-colors hover:text-[#a8b89a] md:text-5xl"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-[#a8b89a]/70">
                      0{i + 1}
                    </span>
                    <span className="italic">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-[#f5f3ee]/50">
              <span>Est. 1998</span>
              <span>Arboriculture</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
