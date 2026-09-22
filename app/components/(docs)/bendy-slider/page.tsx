import JsonLd from "@/components/JsonLd";
import { componentJsonLd, componentPageMetadata } from "@/lib/seo";
import Demo from "./demo";

const HREF = "/components/bendy-slider";

export const metadata = componentPageMetadata(HREF);

export default function Page() {
  return (
    <>
      <JsonLd data={componentJsonLd(HREF)} />
      <Demo />
    </>
  );
}
