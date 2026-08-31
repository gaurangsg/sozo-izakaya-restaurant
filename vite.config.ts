import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Use the project's SSR error wrapper instead of TanStack Start's default entry.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
    // Produces a standard self-hostable Node server. Set NITRO_PRESET to target
    // another independent deployment platform when needed.
    nitro({ preset: process.env.NITRO_PRESET || "node-server" }),
  ],
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  server: {
    host: "::",
    port: 8080,
  },
});
