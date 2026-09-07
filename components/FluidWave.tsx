"use client";

import { useEffect, useRef } from "react";
import { bindFullscreenQuad, createProgram, hexToRgb } from "@/lib/webgl";

// rendered below native resolution, then upscaled by css, which softens the flame and cuts the pixel cost
const RESOLUTION_SCALE = 0.5;

// the field is already fully developed at t=0, so start mid flow rather than at the origin of the noise
const TIME_OFFSET = 18;

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.18;

  // a lean, so the tongues are not perfectly vertical
  float x = uv.x + 0.05 * sin(uv.y * 3.2 + t * 0.6);

  // turbulence scrolling upward is what makes the licks climb
  float a = fbm(vec2(x * 2.6, uv.y * 1.6 - t));
  float b = fbm(vec2(x * 5.3 + 4.2, uv.y * 2.9 - t * 1.5));
  float f = a * 0.72 + b * 0.34;

  // subtracting height tapers every tongue to a tip
  float e = clamp(f * 2.4 - uv.y * 2.3, 0.0, 1.0);

  // transparent so the footer background shows through in either theme; premultiplied to match the canvas compositor
  float alpha = 0.3 * smoothstep(0.06, 0.5, e) + 0.7 * smoothstep(0.5, 0.96, e);

  gl_FragColor = vec4(u_color * alpha, alpha);
}
`;

export default function FluidWave({ color = "#FC4C01" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;

    const compiled = createProgram(gl, VERT, FRAG);
    if (!compiled) return;

    gl.useProgram(compiled.program);
    const quad = bindFullscreenQuad(gl, compiled.program, "a_pos");

    const uResolution = gl.getUniformLocation(compiled.program, "u_resolution");
    const uTime = gl.getUniformLocation(compiled.program, "u_time");
    gl.uniform3f(
      gl.getUniformLocation(compiled.program, "u_color"),
      ...hexToRgb(color),
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startedAt = performance.now();
    const elapsed = () => (performance.now() - startedAt) / 1000;

    let frame = 0;

    const draw = () => {
      gl.uniform1f(uTime, TIME_OFFSET + (reduceMotion ? 0 : elapsed()));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (frame || reduceMotion) return;
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * RESOLUTION_SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * RESOLUTION_SCALE));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
      // redraw at once so a resize never exposes a blank or stretched frame
      draw();
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // no reason to burn frames while the footer is off screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else pause();
    });
    visibilityObserver.observe(canvas);

    return () => {
      pause();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      gl.deleteBuffer(quad);
      compiled.dispose();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
