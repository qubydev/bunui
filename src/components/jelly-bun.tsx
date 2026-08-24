"use client";

import {type CSSProperties, useEffect, useId, useRef} from "react";
import gsap from "gsap";
import {cn} from "@/utils/cn";

interface JellyBunProps {
  className?: string;
  size?: number;
}

const bodyStyle = {
  transformBox: "fill-box",
  transformOrigin: "bottom center",
} satisfies CSSProperties;

const eyeData = {
  left: {
    height: 103.245,
    rx: 27.295,
    y: 254.878,
  },
  right: {
    height: 103.245,
    rx: 27.295,
    y: 254.878,
  },
};

const bunBodyPath =
  "M306 78.5c36.5 0 25.267 54.5 43.767 69.5 0 0 4.5-44 17.5-57s31.311-8.08 43.5 5c61.5 66 142.965 75 172.593 186.544C616.581 407.615 563.83 530.197 306 530.197S-4.315 407.615 28.906 282.544C58.534 171 140 162 201.5 96c12.189-13.08 30.5-18 43.5-5s17.5 57 17.5 57c18.5-15 7-69.5 43.5-69.5";

export function JellyBun({className, size = 160}: JellyBunProps) {
  const shadowId = useId().replace(/:/g, "");
  const clipId = `${shadowId}-body-clip`;
  const blurId = `${shadowId}-inner-shadow-blur`;
  const mainGlowId = `${shadowId}-main-glow`;
  const rimGlowId = `${shadowId}-rim-glow`;
  const bunRef = useRef<SVGSVGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGRectElement>(null);
  const rightEyeRef = useRef<SVGRectElement>(null);
  const activeTweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const lookTweenRef = useRef<gsap.core.Timeline | null>(null);
  const followTweenRef = useRef<gsap.core.Tween | null>(null);
  const blinkTweensRef = useRef<Set<gsap.core.Timeline>>(new Set());
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkStaggerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleBlinkRef = useRef<(() => void) | null>(null);
  const reduceMotionRef = useRef(false);
  const isPressedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const hasPointerRef = useRef(false);

  useEffect(() => {
    const bun = bunRef.current;
    const eyes = eyesRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!bun || !eyes || !leftEye || !rightEye) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduceMotionRef.current = reduceMotion;

    gsap.set([eyes, leftEye, rightEye], {transformOrigin: "50% 50%"});

    const intro = reduceMotion
      ? null
      : gsap
          .timeline()
          .fromTo(
            bun,
            {
              opacity: 0,
              scaleX: 0.96,
              scaleY: 1.04,
              y: -150,
            },
            {
              duration: 0.38,
              ease: "power2.in",
              opacity: 1,
              scaleX: 0.98,
              scaleY: 1.02,
              y: 0,
            },
          )
          .to(bun, {
            duration: 0.1,
            ease: "power2.out",
            scaleX: 1.14,
            scaleY: 0.82,
            y: 8,
          }, "-=0.05")
          .to(bun, {
            duration: 0.16,
            ease: "power2.out",
            scaleX: 0.96,
            scaleY: 1.08,
            y: -6,
          })
          .to(bun, {
            duration: 0.38,
            ease: "elastic.out(1, 0.42)",
            scaleX: 1,
            scaleY: 1,
            y: 0,
          });

    const followPointer = (event: PointerEvent) => {
      hasPointerRef.current = true;
      lookTweenRef.current?.kill();
      lookTweenRef.current = null;

      if (lookTimerRef.current) {
        clearTimeout(lookTimerRef.current);
      }

      const rect = bun.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      const localX = (event.clientX - rect.left) * (612 / rect.width);
      const localY = (event.clientY - rect.top) * (612 / rect.height);
      const dx = localX - 306;
      const dy = localY - 306;
      const distance = isHoveringRef.current ? 0.28 : 0.16;

      followTweenRef.current = gsap.to(eyes, {
        duration: isHoveringRef.current ? 0.34 : 0.5,
        ease: "power3.out",
        overwrite: "auto",
        x: gsap.utils.clamp(-70, 70, dx * distance),
        y: gsap.utils.clamp(-40, 40, dy * distance),
      });
    };

    const stopAnimation = () => {
      activeTweenRef.current?.kill();
      activeTweenRef.current = null;
    };

    const blinkEye = (
      eye: SVGRectElement,
      data: {height: number; rx: number; y: number},
    ) => {
      if (isPressedRef.current) {
        return;
      }

      const tween = gsap
        .timeline({
          onComplete: () => {
            blinkTweensRef.current.delete(tween);
          },
        })
        .to(eye, {
          attr: {
            height: 0,
            rx: 0,
            y: data.y + data.height / 2,
          },
          duration: 0.1,
          ease: "power2.in",
          overwrite: "auto",
        })
        .to(eye, {
          attr: {
            height: data.height,
            rx: data.rx,
            y: data.y,
          },
          duration: 0.16,
          ease: "power2.out",
          overwrite: "auto",
        });

      blinkTweensRef.current.add(tween);
    };

    const scheduleBlink = () => {
      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }

      blinkTimerRef.current = setTimeout(() => {
        if (isPressedRef.current) {
          scheduleBlink();
          return;
        }

        const isLeftFirst = Math.random() > 0.5;
        const firstEye = isLeftFirst ? leftEye : rightEye;
        const firstData = isLeftFirst ? eyeData.left : eyeData.right;
        const secondEye = isLeftFirst ? rightEye : leftEye;
        const secondData = isLeftFirst ? eyeData.right : eyeData.left;

        blinkEye(firstEye, firstData);

        blinkStaggerTimerRef.current = setTimeout(() => {
          blinkEye(secondEye, secondData);
        }, gsap.utils.random(45, 85));

        scheduleBlink();
      }, gsap.utils.random(1800, 5000));
    };

    scheduleBlinkRef.current = scheduleBlink;

    const scheduleLook = () => {
      if (lookTimerRef.current) {
        clearTimeout(lookTimerRef.current);
      }

      lookTimerRef.current = setTimeout(() => {
        if (isHoveringRef.current || hasPointerRef.current) {
          return;
        }

        lookTweenRef.current?.kill();
        lookTweenRef.current = gsap
          .timeline()
          .to(eyes, {
            duration: gsap.utils.random(0.35, 0.6),
            ease: "power2.inOut",
            x: (Math.random() > 0.5 ? 1 : -1) * gsap.utils.random(35, 60),
          })
          .to(eyes, {
            delay: gsap.utils.random(0.3, 1),
            duration: gsap.utils.random(0.4, 0.7),
            ease: "power2.inOut",
            x: 0,
          });

        scheduleLook();
      }, gsap.utils.random(1000, 3500));
    };

    if (!reduceMotion) {
      scheduleBlink();
      scheduleLook();
      window.addEventListener("pointermove", followPointer);
    }

    return () => {
      stopAnimation();
      intro?.kill();
      lookTweenRef.current?.kill();
      followTweenRef.current?.kill();
      scheduleBlinkRef.current = null;

      blinkTweensRef.current.forEach((tween) => {
        tween.kill();
      });
      blinkTweensRef.current.clear();

      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }

      if (blinkStaggerTimerRef.current) {
        clearTimeout(blinkStaggerTimerRef.current);
      }

      if (lookTimerRef.current) {
        clearTimeout(lookTimerRef.current);
      }

      window.removeEventListener("pointermove", followPointer);
    };
  }, []);

  const stopLook = () => {
    if (lookTimerRef.current) {
      clearTimeout(lookTimerRef.current);
    }

    lookTweenRef.current?.kill();
    lookTweenRef.current = null;
  };

  const resumeLook = () => {
    const eyes = eyesRef.current;

    if (!eyes || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    lookTimerRef.current = setTimeout(() => {
      if (isHoveringRef.current || hasPointerRef.current) {
        return;
      }

      lookTweenRef.current?.kill();
      lookTweenRef.current = gsap
        .timeline()
        .to(eyes, {
          duration: gsap.utils.random(0.35, 0.6),
          ease: "power2.inOut",
          x: (Math.random() > 0.5 ? 1 : -1) * gsap.utils.random(35, 60),
        })
        .to(eyes, {
          delay: gsap.utils.random(0.3, 1),
          duration: gsap.utils.random(0.4, 0.7),
          ease: "power2.inOut",
          x: 0,
        });

      resumeLook();
    }, gsap.utils.random(1000, 3500));
  };

  const enterHover = () => {
    const eyes = eyesRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!eyes || !leftEye || !rightEye) {
      return;
    }

    gsap.to(eyes, {
      duration: 0.3,
      ease: "back.out(1.5)",
      scale: 1.12,
    });
  };

  const leaveHover = () => {
    const eyes = eyesRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!eyes || !leftEye || !rightEye) {
      return;
    }

    gsap.to(eyes, {
      duration: 0.5,
      ease: "elastic.out(1, 0.65)",
      overwrite: "auto",
      scale: 1,
      x: 0,
      y: 0,
    });

    gsap.to([leftEye, rightEye], {
      duration: 0.25,
      ease: "power2.out",
      x: 0,
    });
  };

  const press = () => {
    const bun = bunRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!bun || !leftEye || !rightEye) {
      return;
    }

    isPressedRef.current = true;
    if (blinkTimerRef.current) {
      clearTimeout(blinkTimerRef.current);
    }

    if (blinkStaggerTimerRef.current) {
      clearTimeout(blinkStaggerTimerRef.current);
    }

    blinkTweensRef.current.forEach((tween) => {
      tween.kill();
    });
    blinkTweensRef.current.clear();

    gsap.set(leftEye, {attr: eyeData.left});
    gsap.set(rightEye, {attr: eyeData.right});

    activeTweenRef.current?.kill();
    activeTweenRef.current = gsap.to(bun, {
      duration: 0.18,
      ease: "power2.out",
      scaleX: 1.08,
      scaleY: 0.9,
    });

    gsap.to([leftEye, rightEye], {
      duration: 0.15,
      ease: "power2.out",
      overwrite: "auto",
      scaleY: 0.35,
    });
  };

  const release = () => {
    const bun = bunRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!bun || !leftEye || !rightEye || !isPressedRef.current) {
      return;
    }

    isPressedRef.current = false;
    if (!reduceMotionRef.current) {
      scheduleBlinkRef.current?.();
    }

    activeTweenRef.current?.kill();

    gsap.to([leftEye, rightEye], {
      duration: 0.4,
      ease: "back.out(2.5)",
      overwrite: "auto",
      scaleY: 1,
    });

    activeTweenRef.current = gsap
      .timeline({
        onComplete: () => {
          activeTweenRef.current = null;
        },
      })
      .to(bun, {
        duration: 0.18,
        ease: "power2.out",
        scaleX: 0.94,
        scaleY: 1.08,
      })
      .to(bun, {
        duration: 0.16,
        ease: "power2.out",
        scaleX: 1.045,
        scaleY: 0.97,
      })
      .to(bun, {
        duration: 0.14,
        ease: "power2.out",
        scaleX: 0.985,
        scaleY: 1.02,
      })
      .to(bun, {
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
        scaleX: 1,
        scaleY: 1,
      });
  };

  return (
    <svg
      ref={bunRef}
      aria-label="Animated BunUI mascot"
      className={cn("jelly-bun-mascot group touch-none select-none overflow-visible", className)}
      fill="none"
      height={size}
      role="img"
      viewBox="0 0 612 612"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      onLostPointerCapture={() => {
        if (isPressedRef.current) {
          release();
        }
      }}
      onPointerCancel={release}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        press();
      }}
      onPointerEnter={(event) => {
        isHoveringRef.current = true;
        stopLook();
        enterHover();
      }}
      onPointerLeave={() => {
        isHoveringRef.current = false;
        leaveHover();
        resumeLook();
      }}
      onPointerUp={(event) => {
        event.preventDefault();
        release();

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={bunBodyPath} />
        </clipPath>
        <filter id={blurId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <radialGradient id={mainGlowId} cx="36%" cy="20%" r="78%">
          <stop offset="0%" stopColor="var(--background)" stopOpacity="0.28" />
          <stop offset="36%" stopColor="var(--background)" stopOpacity="0.1" />
          <stop offset="72%" stopColor="var(--background)" stopOpacity="0.02" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={rimGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="var(--background)" stopOpacity="0" />
          <stop offset="92%" stopColor="var(--background)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="0.24" />
        </radialGradient>
      </defs>

      <g className="transition-transform duration-300 ease-in-out group-hover:scale-y-[1.2]" style={bodyStyle}>
        <path d={bunBodyPath} fill="currentColor" />
        <g clipPath={`url(#${clipId})`}>
          <ellipse cx="268" cy="190" rx="270" ry="210" fill={`url(#${mainGlowId})`} />
          <ellipse cx="306" cy="306" rx="315" ry="250" fill={`url(#${rimGlowId})`} opacity="0.55" />
          <path
            d={bunBodyPath}
            fill="none"
            filter={`url(#${blurId})`}
            opacity="0.16"
            stroke="var(--background)"
            strokeWidth="26"
          />
        </g>
      </g>

      <g ref={eyesRef} fill="var(--background)">
        <rect ref={leftEyeRef} x="201.569" y="254.878" width="54.589" height="103.245" rx="27.295" />
        <rect ref={rightEyeRef} x="355.842" y="254.878" width="54.589" height="103.245" rx="27.295" />
      </g>
    </svg>
  );
}
