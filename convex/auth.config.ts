// Identity providers Convex accepts JWTs from, driven by deployment env vars:
// - CF_ACCESS_TEAM_DOMAIN (+ CF_ACCESS_AUD): Cloudflare Access — production.
//   Tokens are validated against the team's public certs; CF_ACCESS_AUD is the
//   Access application's audience tag.
// - DEV_AUTH_ISSUER: local dev only — the Vite server mints tokens and serves
//   the matching JWKS (see src/lib/devAuth.server.ts).
// - CLERK_JWT_ISSUER_DOMAIN: legacy Clerk support, kept for upstream parity.

type Provider = Record<string, string | undefined>;

// Convex requires every statically-referenced process.env.X in this file to be
// set on the deployment; dynamic lookup keeps each provider optional.
const env = (name: string): string | undefined => process.env[name];

const providers: Provider[] = [];

const clerkIssuerDomain = env("CLERK_JWT_ISSUER_DOMAIN");
if (clerkIssuerDomain) {
  providers.push({
    domain: clerkIssuerDomain,
    applicationID: "convex",
  });
}

const cfAccessTeamDomain = env("CF_ACCESS_TEAM_DOMAIN");
if (cfAccessTeamDomain) {
  const issuer = `https://${cfAccessTeamDomain}`;
  providers.push({
    type: "customJwt",
    issuer,
    jwks: `${issuer}/cdn-cgi/access/certs`,
    applicationID: env("CF_ACCESS_AUD"),
    algorithm: "RS256",
  });
}

const devAuthIssuer = env("DEV_AUTH_ISSUER");
if (devAuthIssuer) {
  providers.push({
    type: "customJwt",
    issuer: devAuthIssuer,
    jwks: `${devAuthIssuer}/api/auth/jwks`,
    applicationID: "convex",
    algorithm: "RS256",
  });
}

export default { providers };
