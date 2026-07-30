"use node";

import Mux from "@mux/mux-node";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function readEnv(...names: string[]): string | null {
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }
  return null;
}

function normalizePrivateKey(value: string): string {
  return value.includes("\\n") ? value.replace(/\\n/g, "\n") : value;
}

function getMuxJwtCredentials(): { keyId: string; keySecret: string } {
  const keyId = readEnv("MUX_SIGNING_KEY", "MUX_SIGNING_KEY_ID");
  if (!keyId) {
    throw new Error(
      "Missing required environment variable: MUX_SIGNING_KEY (or legacy MUX_SIGNING_KEY_ID)",
    );
  }

  const keySecret = readEnv("MUX_PRIVATE_KEY", "MUX_SIGNING_PRIVATE_KEY");
  if (!keySecret) {
    throw new Error(
      "Missing required environment variable: MUX_PRIVATE_KEY (or legacy MUX_SIGNING_PRIVATE_KEY)",
    );
  }

  return { keyId, keySecret: normalizePrivateKey(keySecret) };
}

// Mux is optional in internal/local deployments: without credentials, uploads
// stay in "processing" and the player streams the original file from the
// bucket instead of Mux HLS renditions.
export function isMuxConfigured(): boolean {
  return Boolean(process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_SECRET);
}

let cachedMux: Mux | null = null;

export function getMuxClient(): Mux {
  if (cachedMux) return cachedMux;

  cachedMux = new Mux({
    tokenId: requireEnv("MUX_TOKEN_ID"),
    tokenSecret: requireEnv("MUX_TOKEN_SECRET"),
  });

  return cachedMux;
}

export async function createMuxAssetFromInputUrl(videoId: string, inputUrl: string) {
  const mux = getMuxClient();
  return await mux.video.assets.create({
    inputs: [{ url: inputUrl }],
    playback_policies: ["public"],
    video_quality: "basic",
    // Mux currently supports 1080p as the lowest adaptive streaming max tier.
    max_resolution_tier: "1080p",
    mp4_support: "none",
    passthrough: videoId,
  });
}

// Local-dev relay: when the bucket is on localhost (MinIO), Mux's servers
// can't pull from the presigned URL, so we push the bytes to a Mux direct
// upload instead and wait for the asset to appear.
export async function createMuxAssetViaDirectUpload(
  videoId: string,
  bytes: ArrayBuffer,
  contentType: string,
): Promise<{ id: string | undefined }> {
  const mux = getMuxClient();
  const upload = await mux.video.uploads.create({
    cors_origin: "*",
    new_asset_settings: {
      playback_policies: ["public"],
      video_quality: "basic",
      max_resolution_tier: "1080p",
      mp4_support: "none",
      passthrough: videoId,
    },
  });

  const put = await fetch(upload.url, {
    method: "PUT",
    headers: { "content-type": contentType },
    body: bytes,
  });
  if (!put.ok) {
    throw new Error(`Mux direct upload PUT failed: ${put.status}`);
  }

  // The asset id appears on the upload shortly after the bytes land.
  for (let i = 0; i < 30; i++) {
    const state = await mux.video.uploads.retrieve(upload.id);
    if (state.asset_id) {
      return { id: state.asset_id };
    }
    if (state.status === "errored" || state.status === "cancelled" || state.status === "timed_out") {
      throw new Error(`Mux direct upload ${state.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error("Timed out waiting for Mux to create an asset from the direct upload.");
}

export async function getMuxAsset(assetId: string) {
  const mux = getMuxClient();
  return await mux.video.assets.retrieve(assetId);
}

export async function deleteMuxAsset(assetId: string) {
  const mux = getMuxClient();
  await mux.video.assets.delete(assetId);
}

export async function createSignedPlaybackId(assetId: string) {
  const mux = getMuxClient();
  return await mux.video.assets.createPlaybackId(assetId, {
    policy: "signed",
  });
}

export async function createPublicPlaybackId(assetId: string) {
  const mux = getMuxClient();
  return await mux.video.assets.createPlaybackId(assetId, {
    policy: "public",
  });
}

export async function deletePlaybackId(assetId: string, playbackId: string) {
  const mux = getMuxClient();
  await mux.video.assets.deletePlaybackId(assetId, playbackId);
}

export function buildMuxPlaybackUrl(playbackId: string, token?: string): string {
  const url = new URL(`https://stream.mux.com/${playbackId}.m3u8`);
  // Cap delivery cost at 720p while preserving lower adaptive renditions.
  url.searchParams.set("max_resolution", "720p");
  if (token) {
    url.searchParams.set("token", token);
  }
  return url.toString();
}

export function buildMuxThumbnailUrl(playbackId: string, token?: string): string {
  const base = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;
  if (!token) return base;
  return `${base}&token=${encodeURIComponent(token)}`;
}

export async function signPlaybackToken(playbackId: string, expiration = "1h") {
  const mux = getMuxClient();
  const credentials = getMuxJwtCredentials();
  return await mux.jwt.signPlaybackId(playbackId, {
    keyId: credentials.keyId,
    keySecret: credentials.keySecret,
    type: "video",
    expiration,
  });
}

export async function signThumbnailToken(playbackId: string, expiration = "1h") {
  const mux = getMuxClient();
  const credentials = getMuxJwtCredentials();
  return await mux.jwt.signPlaybackId(playbackId, {
    keyId: credentials.keyId,
    keySecret: credentials.keySecret,
    type: "thumbnail",
    expiration,
  });
}

export function verifyMuxWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature) {
    throw new Error("Missing mux-signature header");
  }

  const mux = getMuxClient();
  const webhookSecret = requireEnv("MUX_WEBHOOK_SECRET");

  mux.webhooks.verifySignature(
    rawBody,
    {
      "mux-signature": signature,
    },
    webhookSecret,
  );
}

