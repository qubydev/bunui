"use client";

import {Paperclip} from "@gravity-ui/icons";
import {Button} from "@bunui/react";
import React, {useState} from "react";

function Spinner() {
  return <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

export function LoadingState() {
  const [isLoading, setLoading] = useState(false);
  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button isPending={isLoading} onPress={handlePress}>
      {({isPending}) => (
        <>
          {isPending ? <Spinner /> : <Paperclip />}
          {isPending ? "Uploading..." : "Upload File"}
        </>
      )}
    </Button>
  );
}