"use client";

import * as React from "react";
import { Recorder } from "@/components/ui/recorder";

export default function RecorderDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <Recorder />
      </div>
    </div>
  );
}
