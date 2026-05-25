import { useRef, type MouseEvent } from "react";
import logo from "@/assets/logo-menintrees.png";

export interface LogoButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
  size?: number;
  ariaLabel?: string;
}

/**
 * 3D shiny logo button — perspective tilt that tracks the cursor,
 * a specular highlight that follows the pointer, and a subtle bevel.
 * Clicking it toggles the navigation overlay.
 */
export function LogoButton({
  onClick,
  isOpen = false,
  size = 64,
  ariaLabel = "Toggle navigation menu",
}: LogoButtonProps) {
  const wrapRef = useRef<HTMLButtonElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    const shine = shineRef.current;
    if (!el || !inner || !shine) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotY = (px - 0.5) * 28; // left/right tilt
    const rotX = (0.5 - py) * 28; // up/down tilt

    inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    shine.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0) 55%)`;
  };

  const handleLeave = () => {
    const inner = innerRef.current;
    const shine = shineRef.current;
    if (inner) inner.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (shine)
      shine.style.background =
        "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 60%)";
  };

  return (
    <button
      ref={wrapRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className="logo-3d-btn group relative shrink-0 cursor-pointer rounded-full outline-none"
      style={{
        width: size,
        height: size,
        perspective: 600,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full rounded-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -inset-2 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(168,184,154,0.45) 0%, rgba(168,184,154,0) 70%)",
          }}
        />

        {/* Outer ring bevel */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 220deg, #2a2a2a, #6b6b6b, #1a1a1a, #5a5a5a, #2a2a2a)",
            padding: 2,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0a0a0a]">
            <img
              src={logo}
              alt="Men in Trees"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              draggable={false}
            />

            {/* Specular shine — follows cursor */}
            <div
              ref={shineRef}
              className="pointer-events-none absolute inset-0 mix-blend-screen transition-[background] duration-150 ease-out"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 60%)",
              }}
            />

            {/* Sweep highlight on hover */}
            <div
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"
            />

            {/* Inner vignette */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -8px 18px rgba(0,0,0,0.6)",
              }}
            />
          </div>
        </div>

        {/* Open-state pulse ring */}
        {isOpen && (
          <div className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-[#a8b89a]/50" />
        )}
      </div>
    </button>
  );
}
