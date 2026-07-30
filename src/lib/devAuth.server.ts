// App-side identity token minting (server only). Used by /api/auth/token in
// two modes:
// - gateway (production): the Istio gateway's trusted email header is
//   translated into a JWT so Convex can authenticate the websocket.
// - dev (local): a fixed dev identity is minted with no IdP at all.
// Tokens are RS256-signed. The key comes from AUTH_JWT_PRIVATE_KEY (PEM, \n
// escapes allowed — set it via the app secret in production so it's stable
// across restarts) or, failing that, a generated per-checkout keypair in
// .convex/dev-auth-key.pem (git-ignored). /api/auth/jwks serves the matching
// public key for Convex to validate against (see convex/auth.config.ts,
// DEV_AUTH_ISSUER — the issuer URL both sides must agree on).
import { generateKeyPairSync, createPublicKey, createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const KEY_DIR = path.resolve(process.cwd(), ".convex");
const KEY_PATH = path.join(KEY_DIR, "dev-auth-key.pem");
const KID = "lawn-app";

export const DEV_AUTH_ISSUER = process.env.DEV_AUTH_ISSUER ?? "http://127.0.0.1:5296";

function getPrivateKeyPem(): string {
  const fromEnv = process.env.AUTH_JWT_PRIVATE_KEY;
  if (fromEnv) {
    return fromEnv.replace(/\\n/g, "\n");
  }
  if (existsSync(KEY_PATH)) {
    return readFileSync(KEY_PATH, "utf8");
  }
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const pem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
  mkdirSync(KEY_DIR, { recursive: true });
  writeFileSync(KEY_PATH, pem, { mode: 0o600 });
  return pem;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

export function devJwks() {
  const jwk = createPublicKey(getPrivateKeyPem()).export({ format: "jwk" }) as Record<
    string,
    unknown
  >;
  return { keys: [{ ...jwk, kid: KID, use: "sig", alg: "RS256" }] };
}

export function mintIdentityToken(identity: {
  sub: string;
  email: string;
  name?: string;
}): string {
  const pem = getPrivateKeyPem();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT", kid: KID };
  const payload = {
    iss: DEV_AUTH_ISSUER,
    aud: "convex",
    sub: identity.sub,
    name: identity.name ?? identity.email,
    email: identity.email,
    iat: now,
    exp: now + 60 * 60,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  return `${signingInput}.${b64url(signer.sign(pem))}`;
}

export function mintDevToken(): string {
  return mintIdentityToken({
    sub: process.env.DEV_AUTH_USER_ID ?? "local-dev-user",
    email: process.env.DEV_AUTH_EMAIL ?? "dev@localhost",
    name: process.env.DEV_AUTH_NAME ?? "Local Dev",
  });
}
