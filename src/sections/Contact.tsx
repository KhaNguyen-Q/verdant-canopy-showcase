import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SERVICE_OPTIONS } from "./assets";
import { BackgroundImage, Reveal } from "./_shared";

type FormState = {
  name: string;
  email: string;
  service: string;
  property: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
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
