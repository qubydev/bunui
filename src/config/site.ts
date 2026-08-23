export const siteConfig = {
  url: "https://bunui.vercel.app",
};

export function registryItemUrl(name: string) {
  return `${siteConfig.url}/r/${name}.json`;
}
