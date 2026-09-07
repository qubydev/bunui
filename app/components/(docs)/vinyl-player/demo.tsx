"use client";

import { useState } from "react";
import { VinylDisk } from "@/components/ui/vinyl-player";

export default function VinylPlayerDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex h-full items-center justify-center">
      <button
        type="button"
        onClick={() => setIsPlaying((playing) => !playing)}
        aria-label={isPlaying ? "Pause vinyl" : "Play vinyl"}
        aria-pressed={isPlaying}
        className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <VinylDisk isPlaying={isPlaying} className="w-24" />
      </button>
    </div>
  );
}
