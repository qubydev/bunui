"use client";

import * as React from "react";
import { GlideButton, Arrow } from "@/components/ui/glide-button";

export default function GlideButtonDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <GlideButton>
        Start <Arrow>a</Arrow> project
      </GlideButton>
    </div>
  );
}
