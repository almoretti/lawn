import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // Listen on IPv4 loopback (not just ::1) — the local Convex backend fetches
  // the dev-auth JWKS from http://127.0.0.1:5296/api/auth/jwks.
  server: {
    host: "127.0.0.1",
  },
  // pragmatic-drag-and-drop ships ESM subpath dirs that Node's SSR resolver
  // can't import (ERR_UNSUPPORTED_DIR_IMPORT); bundle it into the SSR build.
  ssr: {
    noExternal: ["@atlaskit/pragmatic-drag-and-drop"],
  },
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      srcDirectory: "app",
      spa: {
        enabled: true,
        maskPath: "/mono",
        prerender: {
          outputPath: "/_shell",
          crawlLinks: false,
        },
      },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
      },
      pages: [
        { path: "/" },
        { path: "/compare/frameio" },
        { path: "/compare/wipster" },
        { path: "/for/video-editors" },
        { path: "/for/agencies" },
        { path: "/pricing" },
      ],
    }),
    viteReact(),
  ],
});
