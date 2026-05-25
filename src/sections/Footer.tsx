import { ASSETS } from "./assets";

export function Footer() {
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
