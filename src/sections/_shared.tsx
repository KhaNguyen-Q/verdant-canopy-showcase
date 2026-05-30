import { useEffect, useRef, useState, type ReactNode } from "react";

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
  /** Fade the video out near the end of each loop to mask the restart. */
  fadeLoop?: boolean;
  /** Seconds before the video ends to begin fading out. */
  fadeDuration?: number;
}

export function BackgroundVideo({
  src,
  poster,
  className = "",
  overlayClassName = "bg-black/55",
  children,
  fadeLoop = false,
  fadeDuration = 0.8,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [faded, setFaded] = useState(false);

  // Lazy-load: only attach the video source when the hero is near the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setReady(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fade-out mask near the end of each loop iteration.
  useEffect(() => {
    if (!fadeLoop) return;
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const d = v.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      setFaded(v.currentTime >= d - fadeDuration);
    };
    const onSeeked = () => setFaded(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("play", onSeeked);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("play", onSeeked);
    };
  }, [fadeLoop, fadeDuration, ready]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {ready && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            transitionDuration: `${fadeDuration * 1000}ms`,
            opacity: faded ? 0 : 1,
          }}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
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
