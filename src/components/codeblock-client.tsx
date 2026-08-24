"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";
import * as React from "react";
import {Button} from "@/registry/default/ui/button";
import {FumadocsCustomCodeblock as BaseCodeBlock} from "@/mdx-components/fumadocs-custom-codeblock";
import {cn} from "@/utils/cn";

export function CodeBlock({children,className,code,collapsible,isIsolated=false,preview,showLineNumbers,title,...props}:{isIsolated?:boolean;lang?:string;code?:string;collapsible?:boolean;showLineNumbers?:boolean;title:string|undefined;children:React.ReactNode|React.ReactElement;preview?:React.ReactNode} & CodeBlockProps) {
  const [isCollapsed,setIsCollapsed]=React.useState(true);
  if(!collapsible){
    return <BaseCodeBlock code={code} title={title} className={cn("code-block-wrapper docs-code-block standalone-code-block",isIsolated&&"is-isolated",showLineNumbers&&"docs-code-block-line-numbers",className)} {...props}>{children}</BaseCodeBlock>;
  }
  return <div className="relative">
    <div className={cn("code-block-wrapper",isIsolated&&"is-isolated",isCollapsed&&"mask-to-bottom relative max-h-[150px] overflow-hidden")}>
      <BaseCodeBlock code={code} title={title} className={cn("docs-code-block docs-code-block-with-toggle shadow-none",showLineNumbers&&"docs-code-block-line-numbers",className)} {...props}>
        {isCollapsed&&preview?preview:children}
      </BaseCodeBlock>
    </div>
    <div className="absolute end-1/2 bottom-2 translate-x-1/2">
      <Button className="border border-separator text-xs shadow-none" size="sm" type="button" variant="secondary" onPress={()=>setIsCollapsed(!isCollapsed)}>
        {isCollapsed?"Expand code":"Collapse code"}
      </Button>
    </div>
  </div>;
}
