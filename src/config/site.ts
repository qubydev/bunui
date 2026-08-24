export const siteConfig = {
  url: "https://bunui.xyz",
};

export function registryItemUrl(name: string) {
  return `${siteConfig.url}/r/${name}.json`;
}
