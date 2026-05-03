/**
 * AES-256-GCM for thank-you URL payloads (Web Crypto).
 * Key: VITE_THANK_YOU_URL_KEY = base64 encoding of exactly 32 raw bytes (256-bit).
 */
const GCM_IV_LENGTH = 12;

/** 32-byte key from standard or URL-safe base64 (e.g. `openssl rand -base64 32`). */
function decodeKey32FromBase64(s: string): Uint8Array | null {
  const t = s.trim();
  try {
    const normalized = t.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (normalized.length % 4)) % 4;
    const bin = atob(normalized + "=".repeat(padLen));
    if (bin.length !== 32) return null;
    const out = new Uint8Array(32);
    for (let i = 0; i < 32; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

function bytesToBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function getKeyBytes(): Uint8Array | null {
  const b64 = import.meta.env.VITE_THANK_YOU_URL_KEY as string | undefined;
  if (!b64?.trim()) return null;
  return decodeKey32FromBase64(b64);
}

function base64FlexibleToBytes(s: string): Uint8Array {
  const t = s.trim();
  const normalized = t.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (normalized.length % 4)) % 4;
  const bin = atob(normalized + "=".repeat(padLen));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export type ThankYouPayload = { name: string; orderId: string };

export async function decryptThankYouPayload(
  token: string
): Promise<ThankYouPayload | null> {
  const keyBytes = getKeyBytes();
  if (!keyBytes) return null;
  const combined = base64FlexibleToBytes(token);
  if (combined.length < GCM_IV_LENGTH + 16) return null;
  const iv = combined.slice(0, GCM_IV_LENGTH);
  const ciphertext = combined.slice(GCM_IV_LENGTH);
  const keyMaterial = keyBytes.buffer.slice(
    keyBytes.byteOffset,
    keyBytes.byteOffset + keyBytes.byteLength
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyMaterial,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  try {
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );
    const text = new TextDecoder().decode(plain);
    const obj = JSON.parse(text) as ThankYouPayload;
    if (typeof obj?.name !== "string" || typeof obj?.orderId !== "string") return null;
    return { name: obj.name, orderId: obj.orderId };
  } catch {
    return null;
  }
}

/** Build `c` query value (for tooling / server-side link generation). */
export async function encryptThankYouPayload(
  payload: ThankYouPayload
): Promise<string | null> {
  const keyBytes = getKeyBytes();
  if (!keyBytes) return null;
  const iv = crypto.getRandomValues(new Uint8Array(GCM_IV_LENGTH));
  const keyMaterial = keyBytes.buffer.slice(
    keyBytes.byteOffset,
    keyBytes.byteOffset + keyBytes.byteLength
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyMaterial,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const plain = new TextEncoder().encode(JSON.stringify(payload));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain)
  );
  const combined = new Uint8Array(iv.length + ciphertext.length);
  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  return bytesToBase64Url(combined);
}
