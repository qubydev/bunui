import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";
import {highlight} from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";
import {CodeBlock as CodeBlockClient} from "./codeblock-client";

export async function CodeBlock({className,code,collapsible,isIsolated=false,lang,showLineNumbers,title,...props}:{code:string;lang:string;isIsolated?:boolean;showLineNumbers?:boolean;title:string|undefined;collapsible?:boolean} & CodeBlockProps) {
  let rendered; let renderedPreview;
  try {
    const trimmedCode=code?.trim()||"";
    if(!trimmedCode){rendered=<Base.Pre><code /></Base.Pre>}
    else {
      const lines=trimmedCode.split("\n");
      if(lines.length>10){renderedPreview=await highlight(lines.slice(0,5).join("\n"),{components:{pre:(props)=><Base.Pre {...props}/>},lang:lang||"text"});}
      rendered=await highlight(trimmedCode,{components:{pre:(props)=><Base.Pre {...props}/>},lang:lang||"text"});
    }
  } catch(error) {
    console.error("Syntax highlighting error:",error);
    rendered=<Base.Pre><code>{code}</code></Base.Pre>;
  }
  return <CodeBlockClient className={className} code={code?.trim()||""} collapsible={collapsible} isIsolated={isIsolated} lang={lang} preview={renderedPreview} showLineNumbers={showLineNumbers} title={title} {...props}>{rendered}</CodeBlockClient>;
}