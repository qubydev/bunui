"use client";

import * as React from "react";
import { BendySlider } from "@/components/ui/bendy-slider";

export default function BendySliderDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-[280px]">
        <BendySlider />
      </div>
    </div>
  );
}
