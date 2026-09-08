import { componentPageMetadata } from "@/lib/seo";
import Demo from "./demo";

const HREF = "/components/streak-grid";

export const metadata = componentPageMetadata(HREF);

export default function Page() {
  return <Demo />;
}
