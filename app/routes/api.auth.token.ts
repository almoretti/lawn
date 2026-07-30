import { createFileRoute } from "@tanstack/react-router";

// Hands the browser its identity JWT. Convex only accepts signed JWTs, so
// whatever upstream identity exists is translated into one here:
// - AUTH_MODE=gateway (Numan tools-prod): the Istio ingress gateway enforces
//   Google Workspace SSO and injects the authenticated user's email as a
//   trusted header. We mint a JWT from that email, signed with the app's
//   keypair; Convex validates it against our /api/auth/jwks. Never trust a
//   client-supplied copy of these headers — the gateway must strip inbound
//   ones (platform anti-spoof guarantee).
// - AUTH_MODE=cloudflare: behind Cloudflare Access, echo the edge-attached
//   Cf-Access-Jwt-Assertion (the CF_Authorization cookie is HttpOnly, so JS
//   can't read it directly); Convex validates against the CF team certs.
// - AUTH_MODE=dev (local): mint a token for a fixed dev identity.

// Gateway-injected email header precedence (per platform docs). The Google
// variant may arrive as "provider:user@numan.com" — take the last segment.
function gatewayEmail(request: Request): string | null {
  for (const header of [
    "x-forwarded-email",
    "x-auth-request-email",
    "x-goog-authenticated-user-email",
  ]) {
    const value = request.headers.get(header);
    if (value) {
      const email = value.split(":").pop()?.trim();
      if (email) return email;
    }
  }
  return null;
}

export const Route = createFileRoute("/api/auth/token")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const mode = process.env.AUTH_MODE ?? (import.meta.env.DEV ? "dev" : "gateway");

        if (mode === "gateway") {
          const email = gatewayEmail(request);
          if (!email) {
            return Response.json({ token: null }, { status: 401 });
          }
          const { mintIdentityToken } = await import("@/lib/devAuth.server");
          return Response.json({ token: mintIdentityToken({ sub: email, email }) });
        }

        if (mode === "cloudflare") {
          const cfToken = request.headers.get("cf-access-jwt-assertion");
          if (cfToken) {
            return Response.json({ token: cfToken });
          }
          return Response.json({ token: null }, { status: 401 });
        }

        if (mode === "dev") {
          const { mintDevToken } = await import("@/lib/devAuth.server");
          return Response.json({ token: mintDevToken() });
        }

        return Response.json({ token: null }, { status: 401 });
      },
    },
  },
});
