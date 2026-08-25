import {Button as ButtonPrimitive} from "@base-ui/react/button";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonStyles = `
[data-bunui-button] {
  --button-bg: var(--primary);
  --button-bg-hover: color-mix(in oklch, var(--primary), var(--background) 14%);
  --button-fg: var(--primary-foreground);
  --button-focus: var(--ring);
  transform: translateZ(0);
  transform-origin: 50% 50%;
  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    box-shadow 140ms ease,
    color 140ms ease,
    transform 120ms ease;
}

[data-bunui-button][data-variant="primary"],
[data-bunui-button][data-variant="default"] {
  --button-bg: var(--primary);
  --button-bg-hover: color-mix(in oklch, var(--primary), var(--background) 14%);
  --button-fg: var(--primary-foreground);
}

[data-bunui-button][data-variant="secondary"] {
  --button-bg: var(--secondary);
  --button-bg-hover: color-mix(in oklch, var(--secondary), var(--foreground) 5%);
  --button-fg: var(--secondary-foreground);
}

[data-bunui-button][data-variant="outline"] {
  --button-bg: var(--background);
  --button-bg-hover: var(--muted);
  --button-fg: var(--foreground);
}

.dark [data-bunui-button][data-variant="outline"] {
  --button-bg: color-mix(in oklch, var(--input) 30%, transparent);
  --button-bg-hover: color-mix(in oklch, var(--input) 50%, transparent);
}

[data-bunui-button][data-variant="ghost"] {
  --button-bg: transparent;
  --button-bg-hover: var(--muted);
  --button-fg: var(--foreground);
}

[data-bunui-button][data-variant="destructive"],
[data-bunui-button][data-variant="danger-soft"] {
  --button-bg: color-mix(in oklch, var(--destructive) 12%, transparent);
  --button-bg-hover: color-mix(in oklch, var(--destructive) 20%, transparent);
  --button-fg: var(--destructive);
  --button-focus: var(--destructive);
}

.dark [data-bunui-button][data-variant="destructive"] {
  --button-bg: color-mix(in oklch, var(--destructive) 20%, transparent);
  --button-bg-hover: color-mix(in oklch, var(--destructive) 30%, transparent);
}

[data-bunui-button][data-variant="danger"] {
  --button-bg: var(--destructive);
  --button-bg-hover: color-mix(in oklch, var(--destructive), var(--background) 16%);
  --button-fg: white;
  --button-focus: var(--destructive);
}

[data-bunui-button][data-variant="success"] {
  --button-bg: oklch(0.55 0.16 145);
  --button-bg-hover: oklch(0.5 0.16 145);
  --button-fg: white;
  --button-focus: oklch(0.55 0.16 145);
}

[data-bunui-button][data-variant="success-soft"] {
  --button-bg: color-mix(in oklch, oklch(0.55 0.16 145) 13%, transparent);
  --button-bg-hover: color-mix(in oklch, oklch(0.55 0.16 145) 21%, transparent);
  --button-fg: oklch(0.42 0.14 145);
  --button-focus: oklch(0.55 0.16 145);
}

.dark [data-bunui-button][data-variant="success-soft"] {
  --button-fg: oklch(0.78 0.14 145);
}

[data-bunui-button][data-variant="link"] {
  --button-bg: transparent;
  --button-bg-hover: transparent;
  --button-fg: var(--primary);
}

@media (hover: hover) {
  [data-bunui-button]:not(:disabled):not([data-disabled="true"]):hover {
    transform: scaleX(1.012) scaleY(1.012);
  }
}

[data-bunui-button]:not(:disabled):not([data-disabled="true"]):active {
  transform: scaleX(1.07) scaleY(0.91);
  transition-duration: 70ms;
}

@media (prefers-reduced-motion: reduce) {
  [data-bunui-button],
  [data-bunui-button]:hover,
  [data-bunui-button]:active {
    animation: none !important;
    transform: none !important;
    transition:
      background-color 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease,
      color 140ms ease;
  }
}
`;

const buttonVariants = cva(
  "group/button relative isolate inline-flex w-fit shrink-0 origin-center items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent bg-[var(--button-bg)] bg-clip-padding text-sm font-medium whitespace-nowrap text-[var(--button-fg)] outline-none select-none hover:bg-[var(--button-bg-hover)] focus-visible:border-[var(--button-focus)] focus-visible:ring-3 focus-visible:ring-[var(--button-focus)]/35 disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "[--button-bg:var(--primary)] [--button-bg-hover:color-mix(in_oklch,var(--primary),var(--background)_14%)] [--button-fg:var(--primary-foreground)]",
        primary:
          "[--button-bg:var(--primary)] [--button-bg-hover:color-mix(in_oklch,var(--primary),var(--background)_14%)] [--button-fg:var(--primary-foreground)]",
        outline:
          "border-border [--button-bg:var(--background)] [--button-bg-hover:var(--muted)] [--button-fg:var(--foreground)] aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:[--button-bg:color-mix(in_oklch,var(--input)_30%,transparent)] dark:[--button-bg-hover:color-mix(in_oklch,var(--input)_50%,transparent)]",
        secondary:
          "[--button-bg:var(--secondary)] [--button-bg-hover:color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] [--button-fg:var(--secondary-foreground)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "[--button-bg:transparent] [--button-bg-hover:var(--muted)] [--button-fg:var(--foreground)] aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "[--button-bg:color-mix(in_oklch,var(--destructive)_12%,transparent)] [--button-bg-hover:color-mix(in_oklch,var(--destructive)_20%,transparent)] [--button-fg:var(--destructive)] [--button-focus:var(--destructive)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:[--button-bg:color-mix(in_oklch,var(--destructive)_20%,transparent)] dark:[--button-bg-hover:color-mix(in_oklch,var(--destructive)_30%,transparent)] dark:focus-visible:ring-destructive/40",
        danger:
          "[--button-bg:var(--destructive)] [--button-bg-hover:color-mix(in_oklch,var(--destructive),var(--background)_16%)] [--button-fg:white] [--button-focus:var(--destructive)]",
        "danger-soft":
          "[--button-bg:color-mix(in_oklch,var(--destructive)_12%,transparent)] [--button-bg-hover:color-mix(in_oklch,var(--destructive)_20%,transparent)] [--button-fg:var(--destructive)] [--button-focus:var(--destructive)]",
        success:
          "[--button-bg:oklch(0.55_0.16_145)] [--button-bg-hover:oklch(0.5_0.16_145)] [--button-fg:white] [--button-focus:oklch(0.55_0.16_145)]",
        "success-soft":
          "[--button-bg:color-mix(in_oklch,oklch(0.55_0.16_145)_13%,transparent)] [--button-bg-hover:color-mix(in_oklch,oklch(0.55_0.16_145)_21%,transparent)] [--button-fg:oklch(0.42_0.14_145)] [--button-focus:oklch(0.55_0.16_145)] dark:[--button-fg:oklch(0.78_0.14_145)]",
        link: "rounded-sm [--button-bg:transparent] [--button-bg-hover:transparent] [--button-fg:var(--primary)] px-0 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3 text-sm in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 px-4",
        lg: "h-11 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-10 px-0",
        "icon-xs":
          "size-7 px-0 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 px-0 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11 px-0 [&_svg:not([class*='size-'])]:size-5",
      },
      isIconOnly: {
        true: "px-0",
        false: null,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isIconOnly: false,
    },
    compoundVariants: [
      {
        isIconOnly: true,
        size: "xs",
        className: "size-7",
      },
      {
        isIconOnly: true,
        size: "sm",
        className: "size-9",
      },
      {
        isIconOnly: true,
        size: "default",
        className: "size-10",
      },
      {
        isIconOnly: true,
        size: "md",
        className: "size-10",
      },
      {
        isIconOnly: true,
        size: "lg",
        className: "size-11",
      },
    ],
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  isIconOnly,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <>
      <style>{buttonStyles}</style>
      <ButtonPrimitive
        data-bunui-button=""
        data-slot="button"
        data-variant={variant}
        className={cn(buttonVariants({variant, size, isIconOnly, className}))}
        {...props}
      />
    </>
  );
}

export {Button, buttonVariants};
