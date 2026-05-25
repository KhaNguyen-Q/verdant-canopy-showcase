import { useEffect, useRef, type ReactNode } from "react";

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
}

export function BackgroundVideo({
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

export function BackgroundImage({
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

export function Reveal({
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
