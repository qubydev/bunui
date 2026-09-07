"use client";

import {
  useId,
  useState,
  type ComponentProps,
  type ReactNode,
  type SVGProps,
} from "react";
import { cn } from "@/lib/utils";

export type VinylDiskProps = SVGProps<SVGSVGElement> & {
  isPlaying?: boolean;
  spinDuration?: number;
};

export function VinylDisk({
  isPlaying = false,
  spinDuration = 3000,
  className,
  style,
  ...props
}: VinylDiskProps) {
  const id = useId().replace(/:/g, "");
  const blurId = `${id}-vinyl-blur`;
  const armShadowId = `${id}-vinyl-arm-shadow`;
  const rightHighlightId = `${id}-vinyl-right-highlight`;
  const leftHighlightId = `${id}-vinyl-left-highlight`;
  const innerRingId = `${id}-vinyl-inner-ring`;
  const labelId = `${id}-vinyl-label`;

  return (
    <svg
      data-slot="vinyl-disk"
      data-playing={isPlaying || undefined}
      viewBox="0 0 300 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("block h-auto w-full", className)}
      style={{ overflow: "visible", ...style }}
      {...props}
    >
      <g
        className="animate-spin motion-reduce:animate-none"
        style={{
          animationDuration: `${Math.max(1, spinDuration)}ms`,
          animationPlayState: isPlaying ? "running" : "paused",
          transformBox: "view-box",
          transformOrigin: "127.677px 126.56px",
        }}
      >
        <g filter={`url(#${blurId})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M129.27 20.18c-60.018 0-108.73 48.712-108.73 108.73.003 60.019 48.712 108.73 108.73 108.73S238 188.929 238 128.91c0-60.018-48.711-108.73-108.73-108.73m0 105.68a3.048 3.048 0 1 1 .005 6.097 3.048 3.048 0 0 1-.005-6.097"
            fill="#000"
            fillOpacity=".509"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M127.677 17.83c-60.018 0-108.73 48.71-108.73 108.73 0 60.018 48.712 108.729 108.73 108.729s108.73-48.711 108.73-108.729c0-60.02-48.711-108.73-108.73-108.73m0 105.679a3.05 3.05 0 0 1 3.051 3.051 3.05 3.05 0 0 1-3.051 3.05 3.05 3.05 0 0 1-3.05-3.05 3.05 3.05 0 0 1 3.05-3.051"
          fill="#000"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M127.677 86.982c-21.84 0-39.577 17.738-39.577 39.578s17.737 39.577 39.577 39.577 39.578-17.737 39.578-39.577-17.738-39.578-39.578-39.578m0 36.968c1.44 0 2.61 1.17 2.61 2.61s-1.17 2.609-2.61 2.609a2.61 2.61 0 0 1 0-5.219"
          fill="#333"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M127.677 17.83c-60.018 0-108.73 48.71-108.73 108.73 0 60.018 48.712 108.729 108.73 108.729s108.73-48.711 108.73-108.729c0-60.02-48.711-108.73-108.73-108.73m0 2.112c58.861 0 106.638 47.757 106.638 106.62s-47.777 106.637-106.638 106.637c-58.86 0-106.637-47.776-106.637-106.637.002-58.861 47.777-106.62 106.637-106.62"
          fill="#000"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M182.665 126.56c0 30.356-24.631 55.005-54.988 55.005v51.632c58.861 0 106.638-47.776 106.638-106.637z"
          fill={`url(#${rightHighlightId})`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.69 126.56c0-30.357 24.631-55.006 54.988-55.006v-51.63C68.817 19.924 21.04 67.699 21.04 126.56z"
          fill={`url(#${leftHighlightId})`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M156.288 97.949c-15.792-15.792-41.429-15.792-57.221 0s-15.792 41.429 0 57.221 41.429 15.792 57.221 0 15.792-41.429 0-57.221m-1.258 1.258c15.093 15.098 15.093 39.607 0 54.705-15.098 15.093-39.607 15.093-54.705 0-15.093-15.098-15.093-39.607 0-54.705 15.098-15.093 39.607-15.093 54.705 0"
          fill={`url(#${innerRingId})`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M149.987 104.249c-12.313-12.318-32.307-12.318-44.62 0-12.319 12.313-12.319 32.308 0 44.621 12.313 12.318 32.307 12.318 44.62 0 12.319-12.313 12.319-32.308 0-44.621m-20.153 20.154a3.046 3.046 0 0 1 0 4.313 3.046 3.046 0 0 1-4.314 0 3.046 3.046 0 0 1 2.157-5.204c.809 0 1.584.32 2.157.891"
          fill={`url(#${labelId})`}
        />
        <path
          opacity=".743"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M153.508 100.729a36.44 36.44 0 0 0-14.27-8.822l-.729 2.187a34.1 34.1 0 0 1 13.365 8.269 34.1 34.1 0 0 1 9.169 16.597l2.245-.505a36.3 36.3 0 0 0-9.78-17.726m-59.56 20.106-2.286-.394c-1.899 11.273 1.492 23.263 10.185 31.949 8.663 8.669 20.611 12.066 31.855 10.197l-.376-2.274c-10.533 1.751-21.723-1.44-29.845-9.557-8.14-8.146-11.314-19.365-9.533-29.921"
          fill="#fff"
        />
      </g>

      <g
        filter={`url(#${armShadowId})`}
        className="transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{
          transformBox: "view-box",
          transformOrigin: "276px 46px",
          transform: `rotate(${isPlaying ? 0 : -45}deg)`,
        }}
      >
        <path
          d="M206.145 165.152c6.367-6.438 9.444-8.059 15.366-17.041l33.938-66.264c-2.433-2.56-5.168-5.716-4.286-8.36l13.134-24.374c.987-1.497 5.2-1.658 8.655-1.441l3.485-6.805 5.182 3.018-3.337 6.675c2.68 2.689 3.933 5.954 3.344 7.716l-12.298 25.326c-.569.864-5.522 1.718-8.211 1.292l-33.588 67.186c-5.922 8.982-10.693 11.653-18.151 18.668l1.617 2.798-33.413 19.526-4.961-6.602 30.124-24.226z"
          fill="#000"
        />
      </g>

      <defs>
        <radialGradient
          id={rightHighlightId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-45 398.653 -166.247)scale(66.8573 150.807)"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={leftHighlightId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(135 6.393 14.318)scale(66.8573 150.807)"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={innerRingId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 112.41 -33.3354 0 127.679 126.553)"
        >
          <stop stopColor="#6c6c6c" />
          <stop offset="1" stopColor="#3e3e3e" />
        </radialGradient>
        <radialGradient
          id={labelId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 90.6513 -31.5539 0 127.677 126.56)"
        >
          <stop stopColor="#f7f7f7" />
          <stop offset="1" stopColor="#e1e1e1" />
        </radialGradient>
        <filter
          id={blurId}
          x="13.141"
          y="12.781"
          width="232.259"
          height="232.259"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.7" result="effect1_foregroundBlur_22_63" />
        </filter>
        <filter
          id={armShadowId}
          x="168.621"
          y="40.867"
          width="117.148"
          height="160.205"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_22_63" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_22_63" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="shape" result="effect2_innerShadow_22_63" />
        </filter>
      </defs>
    </svg>
  );
}

export type VinylPlayerProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  artist?: ReactNode;
  playing?: boolean;
  defaultPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  disabled?: boolean;
  spinDuration?: number;
};

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      {playing ? (
        <>
          <rect x="7" y="5" width="3.5" height="14" rx="1" />
          <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
        </>
      ) : (
        <path d="M8.25 5.35c0-.94 1.03-1.51 1.83-1.01l10.07 6.3a1.6 1.6 0 0 1 0 2.72l-10.07 6.3c-.8.5-1.83-.07-1.83-1.01z" />
      )}
    </svg>
  );
}

export function VinylPlayer({
  title,
  artist,
  playing,
  defaultPlaying = false,
  onPlayingChange,
  disabled = false,
  spinDuration = 3000,
  className,
  ...props
}: VinylPlayerProps) {
  const isControlled = playing !== undefined;
  const [internalPlaying, setInternalPlaying] = useState(defaultPlaying);
  const isPlaying = isControlled ? playing : internalPlaying;

  const setPlaying = (next: boolean) => {
    if (disabled) return;
    if (!isControlled) setInternalPlaying(next);
    onPlayingChange?.(next);
  };

  return (
    <div
      data-slot="vinyl-player"
      data-playing={isPlaying || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "w-full max-w-sm rounded-3xl border border-border bg-card p-5 text-card-foreground",
        disabled && "opacity-55",
        className,
      )}
      {...props}
    >
      <div data-slot="vinyl-player-record" className="mx-auto w-full max-w-[300px] px-1">
        <VinylDisk isPlaying={isPlaying} spinDuration={spinDuration} />
      </div>

      <div className="mt-3 flex min-w-0 items-center gap-4">
        <div data-slot="vinyl-player-details" className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{title}</div>
          {artist ? (
            <div className="mt-0.5 truncate text-xs text-muted-foreground">{artist}</div>
          ) : null}
        </div>

        <button
          data-slot="vinyl-player-control"
          type="button"
          disabled={disabled}
          aria-label={isPlaying ? "Pause" : "Play"}
          aria-pressed={isPlaying}
          onClick={() => setPlaying(!isPlaying)}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-foreground text-background transition-transform duration-150 ease-out hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none motion-reduce:transition-none"
        >
          <PlayPauseIcon playing={isPlaying} />
        </button>
      </div>
    </div>
  );
}

export default VinylPlayer;
