import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Leaf,
  TreePine,
  Scissors,
  Axe,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ============================================================
   VISUAL ASSETS — edit these paths to swap in your own files.
   All videos/images flow through this single config object.
   ============================================================ */
const ASSETS = {
  brand: {
    name: "Sylvan & Co.",
    tagline: "Arboriculture · Est. 1998",
  },
  hero: {
    // Local placeholder shipped at /public/videos/hero.mp4 — swap freely.
    video: "/videos/hero.mp4",
    poster:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80",
  },
  philosophy: {
    video:
      "https://cdn.coverr.co/videos/coverr-a-forest-in-the-morning-fog-7307/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
  },
  services: [
    {
      id: "preservation",
      title: "Tree Preservation",
      number: "01",
      icon: Leaf,
      blurb:
        "Long-horizon stewardship plans for heritage specimens and protected canopies.",
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80",
    },
    {
      id: "removal",
      title: "Large-Scale Removal",
      number: "02",
      icon: Axe,
      blurb:
        "Engineered dismantling of high-risk trees in constrained estate environments.",
      image:
        "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1800&q=80",
    },
    {
      id: "pruning",
      title: "Structural Pruning",
      number: "03",
      icon: Scissors,
      blurb:
        "Precision cuts informed by biomechanics and the long arc of canopy form.",
      image:
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1800&q=80",
    },
    {
      id: "consulting",
      title: "Arboricultural Consulting",
      number: "04",
      icon: TreePine,
      blurb:
        "Reports, risk assessments, and development advisory for architects and estates.",
      image:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1800&q=80",
    },
  ],
  portfolio: [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=80",
  ],
} as const;

const SERVICE_OPTIONS = ASSETS.services.map((s) => s.title);

/* ============================================================
   Reusable media primitives
   ============================================================ */

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
}

function BackgroundVideo({
  src,
  poster,
  className = "",
  overlayClassName = "bg-black/55",
  children,
}: BackgroundVideoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {children}
    </div>
  );
}

interface BackgroundImageProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
  alt?: string;
}

function BackgroundImage({
  src,
  className = "",
  overlayClassName = "bg-black/50",
  children,
  alt = "",
}: BackgroundImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {children}
    </div>
  );
}

/* ============================================================
   Scroll reveal hook
   ============================================================ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Header
   ============================================================ */
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#philosophy", label: "Philosophy" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Selected Work" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="font-display text-2xl tracking-tight text-[#f5f3ee] md:text-3xl">
            {ASSETS.brand.name}
          </span>
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-[#f5f3ee] backdrop-blur transition hover:bg-black/50"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl transition-opacity ${
            open ? "pointer-events-auto" : ""
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`relative flex h-full flex-col items-start justify-center gap-6 px-8 md:px-24 ${
            open ? "pointer-events-auto" : ""
          }`}
        >
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-5xl text-[#f5f3ee]/90 transition hover:text-[#a8b89a] md:text-7xl"
              style={{
                transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transitionProperty: "transform, opacity, color",
                transitionDuration: "700ms",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   Sections
   ============================================================ */
function Hero() {
  return (
    <section id="top" className="relative h-screen w-full">
      <BackgroundVideo
        src={ASSETS.hero.video}
        poster={ASSETS.hero.poster}
        className="h-full w-full"
        overlayClassName="bg-gradient-to-b from-black/60 via-black/30 to-black/80"
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
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#f5f3ee]/80 transition hover:text-[#f5f3ee]"
              >
                Inquire <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </BackgroundVideo>
    </section>
  );
}

function Philosophy() {
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

function ServiceCard({
  service,
  index,
}: {
  service: (typeof ASSETS.services)[number];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <Reveal delay={index * 80}>
      <a
        href="#contact"
        className="group relative block aspect-[4/5] overflow-hidden border-t border-white/10"
      >
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]/95 transition-opacity duration-700 group-hover:from-black/30 group-hover:via-black/40 group-hover:to-black/80" />

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

function Services() {
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
    </section>
  );
}

function SelectedWork() {
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

/* ============================================================
   Contact form
   ============================================================ */

type FormState = {
  name: string;
  email: string;
  service: string;
  property: string;
};

type Status = "idle" | "loading" | "success" | "error";

function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    service: SERVICE_OPTIONS[0] ?? "",
    property: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // ============================================================
      // EmailJS / custom handler goes here. Example:
      // await emailjs.send("service_id", "template_id", form, "public_key");
      // ============================================================
      await new Promise((r) => setTimeout(r, 1100)); // placeholder latency

      setStatus("success");
      setForm({
        name: "",
        email: "",
        service: SERVICE_OPTIONS[0] ?? "",
        property: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0a0a] py-32 md:py-48"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <BackgroundImage
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80"
          className="h-full w-full"
          overlayClassName="bg-[#0a0a0a]/80"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-12 px-6 md:px-12">
        <Reveal className="col-span-12 md:col-span-5">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-[#a8b89a]">
            — Request a Consultation
          </p>
          <h2 className="font-display text-balance text-4xl leading-[1.05] text-[#f5f3ee] md:text-6xl">
            Begin a conversation about your trees.
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#f5f3ee]/60">
            We respond to every inquiry personally within two business days.
            Consultations are offered by appointment across private estates,
            institutions, and architectural projects.
          </p>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-7" delay={150}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 border border-white/10 bg-black/40 p-8 backdrop-blur md:p-12"
            noValidate
          >
            <Field label="Name" required>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="form-input"
                placeholder="Your full name"
                maxLength={100}
              />
            </Field>

            <Field label="Email" required>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="form-input"
                placeholder="you@domain.com"
                maxLength={255}
              />
            </Field>

            <Field label="Service" required>
              <select
                required
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                className="form-input appearance-none"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0a0a0a]">
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Property Details">
              <textarea
                value={form.property}
                onChange={(e) => update("property", e.target.value)}
                className="form-input min-h-[140px] resize-none"
                placeholder="Location, canopy, species, and any context that helps us prepare."
                maxLength={2000}
              />
            </Field>

            <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center justify-center gap-3 border border-[#f5f3ee]/80 px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#f5f3ee] transition hover:border-[#a8b89a] hover:text-[#a8b89a] disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              <div className="text-xs text-[#f5f3ee]/50">
                {status === "success" && (
                  <span className="inline-flex items-center gap-2 text-[#a8b89a]">
                    <CheckCircle2 size={14} /> Thank you — we'll be in touch.
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-center gap-2 text-red-400">
                    <AlertCircle size={14} /> {errorMessage || "Submission failed."}
                  </span>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(245, 243, 238, 0.18);
          padding: 14px 0;
          color: #f5f3ee;
          font-size: 15px;
          outline: none;
          transition: border-color 300ms ease;
        }
        .form-input::placeholder { color: rgba(245, 243, 238, 0.35); }
        .form-input:focus { border-color: #a8b89a; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-[#f5f3ee]/50">
        {label} {required && <span className="text-[#a8b89a]">*</span>}
      </span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <div>
          <p className="font-display text-xl text-[#f5f3ee]">{ASSETS.brand.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#f5f3ee]/40">
            {ASSETS.brand.tagline}
          </p>
        </div>
        <p className="text-xs text-[#f5f3ee]/40">
          © {new Date().getFullYear()} {ASSETS.brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   Page
   ============================================================ */
function Index() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f3ee]">
      <Header />
      <Hero />
      <Philosophy />
      <Services />
      <SelectedWork />
      <ContactSection />
      <Footer />
    </main>
  );
}
