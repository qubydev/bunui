"use client";

import {useEffect, useRef} from "react";
import gsap from "gsap";

import {BunUILogo} from "@/components/bunui-logo";
import {BunUILogotype} from "@/components/bunui-logotype";

const clips = [
  {id: "b", x: 0, width: 395},
  {id: "u1", x: 395, width: 365},
  {id: "n", x: 760, width: 390},
  {id: "u2", x: 1150, width: 360},
  {id: "i", x: 1510, width: 143},
] as const;

export function AnimatedBrand({className}: {className?: string}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const parts = svg.querySelectorAll<SVGGElement>("[data-brand-part]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(parts, {opacity: 1, y: 0, scaleX: 1, scaleY: 1});
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(parts, {
        opacity: 0,
        y: -90,
        scaleX: 0.94,
        scaleY: 1.06,
        transformOrigin: "50% 100%",
      });

      const timeline = gsap.timeline({delay: 0.08});
      parts.forEach((part) => {
        timeline
          .to(part, {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power3.in",
          })
          .to(part, {
            scaleX: 1.12,
            scaleY: 0.82,
            duration: 0.08,
            ease: "power2.out",
          })
          .to(part, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.26,
            ease: "elastic.out(1, 0.42)",
          });
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} aria-hidden="true" className={className} viewBox="0 0 2320 612" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {clips.map((clip) => (
          <clipPath key={clip.id} id={`brand-${clip.id}`}>
            <rect x={clip.x} y="0" width={clip.width} height="612" />
          </clipPath>
        ))}
      </defs>

      <g data-brand-part>
        <BunUILogo size={612} />
      </g>

      <g transform="translate(667 0)">
        {clips.map((clip) => (
          <g key={clip.id} data-brand-part clipPath={`url(#brand-${clip.id})`}>
            <BunUILogotype height={612} width={1653} />
          </g>
        ))}
      </g>
    </svg>
  );
}
