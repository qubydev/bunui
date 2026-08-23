"use client";

import {Button} from "@bunui/react";
import React from "react";

function Spinner() {
  return <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

export function Loading() {
  return (
    <Button isPending>
      {({isPending}) => (
        <>
          {isPending ? <Spinner /> : null}
          Uploading...
        </>
      )}
    </Button>
  );
}