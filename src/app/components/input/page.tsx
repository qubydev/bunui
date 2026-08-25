import {ComponentPreview} from "@/components/component-preview";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "@/components/fumadocs/layouts/notebook/page";
import {InstallCommand} from "@/components/install-command";
import {registryItemUrl} from "@/config/site";

const toc = [
  {title:"Installation",url:"#installation",depth:2},
  {title:"Basic",url:"#basic",depth:2},
  {title:"Sizes",url:"#sizes",depth:2},
  {title:"Disabled State",url:"#disabled-state",depth:2},
] as any;

export default function InputPage() {
  return (
    <DocsPage toc={toc}>
      <section className="flex flex-col gap-2">
        <DocsTitle>Input</DocsTitle>
        <DocsDescription className="text-md mt-2 mb-4">
          A playful text input with soft springy focus and pointer interactions.
        </DocsDescription>
      </section>

      <DocsBody className="prose-sm">
        <ComponentPreview name="input-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item={registryItemUrl("input")} />

        <h2 id="basic">Basic</h2>
        <ComponentPreview name="input-basic" />

        <h2 id="sizes">Sizes</h2>
        <ComponentPreview name="input-sizes" />

        <h2 id="disabled-state">Disabled State</h2>
        <ComponentPreview name="input-disabled" />
      </DocsBody>
    </DocsPage>
  );
}
