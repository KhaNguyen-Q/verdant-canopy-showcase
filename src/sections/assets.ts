import { Leaf, TreePine, Scissors, Axe } from "lucide-react";

/* ============================================================
   VISUAL ASSETS — edit these paths to swap in your own files.
   All videos/images flow through this single config object.
   ============================================================ */
export const ASSETS = {
  brand: {
    name: "Sylvan & Co.",
    tagline: "Arboriculture · Est. 1998",
  },
  hero: {
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

export const SERVICE_OPTIONS = ASSETS.services.map((s) => s.title);

export const NAV_LINKS = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Selected Work" },
  { href: "#contact", label: "Contact" },
];
