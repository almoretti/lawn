import { createFileRoute } from "@tanstack/react-router";

// Public keys for app-minted identity tokens (dev and gateway auth modes),
// fetched by the Convex backend to validate them (see convex/auth.config.ts,
// DEV_AUTH_ISSUER). Not served in cloudflare mode, where Convex validates
// against Cloudflare Access's public certs instead.
export const Route = createFileRoute("/api/auth/jwks")({
  server: {
    handlers: {
      GET: async () => {
        const mode = process.env.AUTH_MODE ?? (import.meta.env.DEV ? "dev" : "gateway");
        if (mode !== "dev" && mode !== "gateway") {
          return Response.json({ keys: [] }, { status: 404 });
        }
        const { devJwks } = await import("@/lib/devAuth.server");
        return Response.json(devJwks());
      },
    },
  },
});
