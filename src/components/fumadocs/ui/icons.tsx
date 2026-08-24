/**
 * Minimal Lucide icon subset used by the BunUI docs shell.
 * @license lucide-react - ISC
 */
import type {ComponentProps} from "react";
import {createElement, forwardRef} from "react";

type LucideProps = ComponentProps<"svg"> & {size?: string | number};
type SVGElementType = "circle" | "line" | "path" | "rect";
type IconNode = [SVGElementType, Record<string, string>][];

const defaults: LucideProps = {
  fill: "none",
  height: 24,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  viewBox: "0 0 24 24",
  width: 24,
  xmlns: "http://www.w3.org/2000/svg",
};

function createIcon(name: string, nodes: IconNode) {
  const Icon = forwardRef<SVGSVGElement, LucideProps>(({children, color = "currentColor", size = 24, ...props}, ref) => (
    <svg ref={ref} {...defaults} height={size} stroke={color} width={size} {...props}>
      {nodes.map(([tag, attrs]) => createElement(tag, attrs))}
      {children}
    </svg>
  ));
  Icon.displayName = name;
  return Icon;
}

export const Search = createIcon("search", [
  ["circle", {cx: "11", cy: "11", key: "4ej97u", r: "8"}],
  ["path", {d: "m21 21-4.3-4.3", key: "1qie3q"}],
]);

export const PanelLeft = createIcon("panel-left", [
  ["rect", {height: "18", key: "1m3agn", rx: "2", width: "18", x: "3", y: "3"}],
  ["path", {d: "M9 3v18", key: "fh3hqa"}],
]);

export const PanelRight = createIcon("panel-right", [
  ["rect", {height: "18", key: "1m3agn", rx: "2", width: "18", x: "3", y: "3"}],
  ["path", {d: "M15 3v18", key: "14nvp0"}],
]);

export const Moon = createIcon("moon", [["path", {d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18"}]]);

export const Sun = createIcon("sun", [
  ["circle", {cx: "12", cy: "12", key: "4exip2", r: "4"}],
  ["path", {d: "M12 2v2", key: "tus03m"}],
  ["path", {d: "M12 20v2", key: "1lh1kg"}],
  ["path", {d: "m4.93 4.93 1.41 1.41", key: "149t6j"}],
  ["path", {d: "m17.66 17.66 1.41 1.41", key: "ptbguv"}],
  ["path", {d: "M2 12h2", key: "1t8f8n"}],
  ["path", {d: "M20 12h2", key: "1q8mjw"}],
  ["path", {d: "m6.34 17.66-1.41 1.41", key: "1m8zz5"}],
  ["path", {d: "m19.07 4.93-1.41 1.41", key: "1shlcs"}],
]);

export const Airplay = createIcon("airplay", [
  ["path", {d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1", key: "ns4c3b"}],
  ["path", {d: "m12 15 5 6H7Z", key: "14qnn2"}],
]);

export const X = createIcon("x", [
  ["path", {d: "M18 6 6 18", key: "1bl5f8"}],
  ["path", {d: "m6 6 12 12", key: "d8bk6v"}],
]);

export const Text = createIcon("text", [
  ["path", {d: "M15 18H3", key: "olowqp"}],
  ["path", {d: "M17 6H3", key: "16j9eg"}],
  ["path", {d: "M21 12H3", key: "2avoz0"}],
]);
