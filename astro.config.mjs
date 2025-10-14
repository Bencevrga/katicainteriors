import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  site: "https://example.com",
  output: "static",
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
});
