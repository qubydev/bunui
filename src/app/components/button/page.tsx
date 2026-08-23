import {CodeBlock} from "@/components/codeblock";
import {ComponentPreview} from "@/components/component-preview";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "@/components/fumadocs/layouts/notebook/page";

const toc = [
  {title:"Usage",url:"#usage",depth:2},
  {title:"Examples",url:"#examples",depth:2},
  {title:"Variants",url:"#variants",depth:3},
  {title:"Sizes",url:"#sizes",depth:3},
  {title:"With Icons",url:"#with-icons",depth:3},
  {title:"Icon Only",url:"#icon-only",depth:3},
  {title:"Loading",url:"#loading",depth:3},
  {title:"Loading State",url:"#loading-state",depth:3},
  {title:"Full Width",url:"#full-width",depth:3},
  {title:"Disabled State",url:"#disabled-state",depth:3},
  {title:"Render Function",url:"#render-function",depth:3},
  {title:"Adding custom variants",url:"#adding-custom-variants",depth:3},
  {title:"Customization",url:"#customization",depth:2},
  {title:"Tailwind CSS",url:"#tailwind-css",depth:3},
  {title:"Global CSS",url:"#global-css",depth:3},
  {title:"Styling Reference",url:"#styling-reference",depth:2},
  {title:"CSS Classes",url:"#css-classes",depth:3},
  {title:"Interactive States",url:"#interactive-states",depth:3},
  {title:"API Reference",url:"#api-reference",depth:2},
] as any;

export default function ButtonPage() {
  return (
    <DocsPage toc={toc}>
      <section className="flex flex-col gap-2">
        <DocsTitle>Button</DocsTitle>
        <DocsDescription className="text-md mt-2 mb-4">
          A clickable button component with multiple variants and states.
        </DocsDescription>
      </section>

      <DocsBody className="prose-sm">
        <h2 id="usage">Usage</h2>
        <CodeBlock code={'import { Button } from "@bunui/react";'} lang="tsx" title={undefined} />
        <ComponentPreview name="button-basic" />

        <h2 id="examples">Examples</h2>

        <h3 id="variants">Variants</h3>
        <ComponentPreview name="button-variants" />

        <h3 id="sizes">Sizes</h3>
        <ComponentPreview name="button-sizes" />

        <h3 id="with-icons">With Icons</h3>
        <ComponentPreview name="button-with-icons" />

        <h3 id="icon-only">Icon Only</h3>
        <ComponentPreview name="button-icon-only" />

        <h3 id="loading">Loading</h3>
        <ComponentPreview name="button-loading" />

        <h3 id="loading-state">Loading State</h3>
        <ComponentPreview name="button-loading-state" />

        <h3 id="full-width">Full Width</h3>
        <ComponentPreview name="button-full-width" />

        <h3 id="disabled-state">Disabled State</h3>
        <ComponentPreview name="button-disabled" />

        <h3 id="render-function">Render Function</h3>
        <ComponentPreview name="button-render-function" />

        <h3 id="adding-custom-variants">Adding custom variants</h3>
        <p>You can extend BunUI components by wrapping them and adding your own custom variants.</p>
        <ComponentPreview name="button-custom-variants" />

        <h2 id="customization">Customization</h2>

        <h3 id="tailwind-css">Tailwind CSS</h3>
        <ComponentPreview name="button-custom-styles" />

        <h3 id="global-css">Global CSS</h3>
        <p>
          To customize the Button component classes, you can use the <code>@layer components</code> directive.
        </p>
        <CodeBlock
          code={'@layer components {\n  .button {\n    @apply bg-purple-500 text-white hover:bg-purple-600;\n  }\n\n  .button--icon-only {\n    @apply rounded-lg bg-blue-500;\n  }\n}'}
          lang="css"
          title={undefined}
        />

        <h2 id="styling-reference">Styling Reference</h2>
        <p>
          BunUI follows the BEM methodology so component variants and states are reusable and easy to customize.
        </p>

        <h3 id="css-classes">CSS Classes</h3>
        <h4>Base &amp; Size Classes</h4>
        <ul>
          <li><code>.button</code> - Base button styles</li>
          <li><code>.button--sm</code> - Small size variant</li>
          <li><code>.button--md</code> - Medium size variant</li>
          <li><code>.button--lg</code> - Large size variant</li>
        </ul>

        <h4>Variant Classes</h4>
        <ul>
          <li><code>.button--primary</code></li>
          <li><code>.button--secondary</code></li>
          <li><code>.button--tertiary</code></li>
          <li><code>.button--outline</code></li>
          <li><code>.button--ghost</code></li>
          <li><code>.button--danger</code></li>
          <li><code>.button--danger-soft</code></li>
        </ul>

        <h4>Modifier Classes</h4>
        <ul>
          <li><code>.button--icon-only</code></li>
          <li><code>.button--icon-only.button--sm</code></li>
          <li><code>.button--icon-only.button--lg</code></li>
        </ul>

        <h3 id="interactive-states">Interactive States</h3>
        <ul>
          <li><strong>Hover:</strong> <code>:hover</code> or <code>[data-hovered="true"]</code></li>
          <li><strong>Active/Pressed:</strong> <code>:active</code> or <code>[data-pressed="true"]</code></li>
          <li><strong>Focus:</strong> <code>:focus-visible</code> or <code>[data-focus-visible="true"]</code></li>
          <li><strong>Disabled:</strong> <code>:disabled</code> or <code>[aria-disabled="true"]</code></li>
          <li><strong>Pending:</strong> <code>[data-pending]</code></li>
        </ul>

        <h2 id="api-reference">API Reference</h2>
        <h3>Button</h3>
        <div className="not-prose my-4 overflow-x-auto rounded-xl border border-separator">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-default/60">
              <tr><th className="p-3">Prop</th><th className="p-3">Type</th><th className="p-3">Default</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-separator">
              <tr><td className="p-3"><code>variant</code></td><td className="p-3">primary | secondary | tertiary | outline | ghost | danger | danger-soft</td><td className="p-3">primary</td><td className="p-3">Visual style variant</td></tr>
              <tr><td className="p-3"><code>size</code></td><td className="p-3">sm | md | lg</td><td className="p-3">md</td><td className="p-3">Size of the button</td></tr>
              <tr><td className="p-3"><code>fullWidth</code></td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Whether the button fills its container</td></tr>
              <tr><td className="p-3"><code>isDisabled</code></td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Whether the button is disabled</td></tr>
              <tr><td className="p-3"><code>isPending</code></td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Whether the button is pending/loading</td></tr>
              <tr><td className="p-3"><code>isIconOnly</code></td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Whether the button contains only an icon</td></tr>
              <tr><td className="p-3"><code>onPress</code></td><td className="p-3">(e: PressEvent) =&gt; void</td><td className="p-3">-</td><td className="p-3">Handler called when the button is pressed</td></tr>
              <tr><td className="p-3"><code>children</code></td><td className="p-3">ReactNode | render function</td><td className="p-3">-</td><td className="p-3">Button content or render prop</td></tr>
            </tbody>
          </table>
        </div>
      </DocsBody>
    </DocsPage>
  );
}