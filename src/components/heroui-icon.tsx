import type {SVGProps} from "react";

export function HeroUIIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M81 134.703v144.612a19.8 19.8 0 0 0 9.319 16.801l98.857 61.655c13.173 8.216 30.236-1.265 30.236-16.801V219.412a19.8 19.8 0 0 1 9.697-17.033l60.303-35.753v311.547c0 15.484 16.96 24.973 30.138 16.863l102.032-62.807A19.8 19.8 0 0 0 431 415.366V116.194c0-15.409-16.812-24.91-29.994-16.951l-111.594 67.383v-132.8c0-15.366-16.731-24.874-29.914-16.998L90.642 117.704A19.8 19.8 0 0 0 81 134.703"
        fill="currentColor"
      />
    </svg>
  );
}
