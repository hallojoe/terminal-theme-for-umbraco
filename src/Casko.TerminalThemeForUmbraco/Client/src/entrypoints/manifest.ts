export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Terminal Theme Entrypoint",
    alias: "TerminalTheme.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
