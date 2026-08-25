import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { InstallCommand } from "@/components/install-command";

function Section({ children, id, title }: { children: React.ReactNode; id: string; title: string }) {
  return (
    <section id={id} className="scroll-m-20 py-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function ButtonPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 xl:grid-cols-[1fr_13rem]">
      <article className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Button</h1>
        <p className="text-base leading-7 text-muted-foreground">
          A clickable button component with multiple variants and states.
        </p>

        <div className="py-8">
          <ComponentPreview name="button-basic" />
        </div>

        <Section id="installation" title="Installation">
          <InstallCommand item="https://bunui.xyz/r/button.json" />
        </Section>

        <Section id="variants" title="Variants">
          <ComponentPreview name="button-variants" />
        </Section>

        <Section id="sizes" title="Sizes">
          <ComponentPreview name="button-sizes" minHeight="10rem" />
        </Section>

        <Section id="with-icons" title="With Icons">
          <ComponentPreview name="button-with-icons" minHeight="10rem" />
        </Section>

        <Section id="icon-only" title="Icon Only">
          <ComponentPreview name="button-icon-only" minHeight="10rem" />
        </Section>

        <Section id="disabled-state" title="Disabled State">
          <ComponentPreview name="button-disabled" minHeight="10rem" />
        </Section>

        <Section id="customization" title="Customization">
          <p className="mb-4 text-sm leading-6 text-muted-foreground">
            Use the built-in props for common styles, then pass <code>className</code> for one-off customization.
          </p>
          <CodeBlock
            code={`<Button variant="outline" size="lg" className="rounded-xl px-8">
  Get started
</Button>`}
            title="custom-button.tsx"
          />
        </Section>

        <Section id="api-reference" title="API Reference">
          <h3 className="mb-4 text-base font-medium text-foreground">Button</h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[47.5rem] border-collapse text-left text-sm">
              <thead className="bg-muted/60 text-foreground">
                <tr>
                  <th className="p-3 font-medium">Prop</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Default</th>
                  <th className="p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3">default | primary | secondary | outline | ghost | success | success-soft | danger | danger-soft</td>
                  <td className="p-3">default</td>
                  <td className="p-3">Visual style variant.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3">xs | sm | md | lg | icon | icon-sm | icon-lg</td>
                  <td className="p-3">default</td>
                  <td className="p-3">Size of the button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">disabled</td>
                  <td className="p-3">boolean</td>
                  <td className="p-3">false</td>
                  <td className="p-3">Whether the button is disabled.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">isIconOnly</td>
                  <td className="p-3">boolean</td>
                  <td className="p-3">false</td>
                  <td className="p-3">Whether the button contains only an icon.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3">string</td>
                  <td className="p-3">-</td>
                  <td className="p-3">Custom classes applied to the button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">onClick</td>
                  <td className="p-3">MouseEventHandler</td>
                  <td className="p-3">-</td>
                  <td className="p-3">Handler called when the button is clicked.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">children</td>
                  <td className="p-3">ReactNode</td>
                  <td className="p-3">-</td>
                  <td className="p-3">Button content.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </article>

      <aside className="hidden xl:block">
        <nav className="sticky top-20 flex flex-col gap-2 text-sm text-muted-foreground">
          <a className="hover:text-foreground" href="#installation">Installation</a>
          <a className="hover:text-foreground" href="#variants">Variants</a>
          <a className="hover:text-foreground" href="#sizes">Sizes</a>
          <a className="hover:text-foreground" href="#with-icons">With Icons</a>
          <a className="hover:text-foreground" href="#icon-only">Icon Only</a>
          <a className="hover:text-foreground" href="#disabled-state">Disabled State</a>
          <a className="hover:text-foreground" href="#customization">Customization</a>
          <a className="hover:text-foreground" href="#api-reference">API Reference</a>
        </nav>
      </aside>
    </main>
  );
}
