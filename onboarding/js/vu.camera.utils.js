const DEBUG_ALLOW_VIRTUAL = '__DEBUG_ALLOW_VIRTUAL__' === 'true';

export let suspiciousCameraKeywords = [];

let keywordsLoaded = false;

const CDN_BASE_URL = 'https://vu-om-websdk-cdn.security-47a.workers.dev/';
const MANIFEST_URL = CDN_BASE_URL + 'manifest.json';
const XDATA_URL    = CDN_BASE_URL + 'xdata.json';
const XSTATS_URL   = CDN_BASE_URL + 'xstats.json'; 


function getAesKeyString() {
  const part1 = 'c14d7bbc3ec66fd4';
  const part2 = '4633c62da5519356';
  const part3 = '629d0d828f38cc91';
  const part4 = 'b655af8449e707f4';
  return part1 + part2 + part3 + part4;
}

const AES_KEY_STRING = getAesKeyString();

const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwOaYNi6lEb6eu8jgGdiM
6Qj1UsHcP1IjS/OvqEK1khs8s0zz9Q32rkDVF+ZUVGNjXcd0sCYi7QQSuOum79Z/
FJKKFNTEUqYLOUL2i4xbLIarzAGzdQkKiCs//AikXqWoxVbLqH4bOwjfCU2OmbNf
ETpcRCzVw3BttgAx+nfjc7jZ/e7YJe37BO9wdcAVkFzVIWqnjtG09uiuISqubuT3
ZS4CUlMzmcF/UdCf6GIra4YRwOD1YYhY47p9VtNab07ewh29WFX41nFq4V5pKLIo
isjI+ALkbJQnbORphgqLJrNNT3H39VDmYgGbG8WeQvCm5subZrOaMy/FNz92RhHU
RwIDAQAB
-----END PUBLIC KEY-----`;

const FALLBACK_XDATA = { "iv": "N914/Co0bCXL36nNv2giAA==", "data": "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" };

function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '').replace(/\s+/g, '');
  const binary = atob(b64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
  return buffer.buffer;
}

async function verifySignature(publicKeyPem, dataHex, signatureB64) {
  const publicKeyBuffer = pemToArrayBuffer(publicKeyPem);
  const publicKey = await crypto.subtle.importKey(
    'spki',
    publicKeyBuffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));
  const data = new TextEncoder().encode(dataHex);

  return await crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signature, data);
}

async function decryptKeywords({ iv, data }, keyStr) {
  console.log('[CDN] iv =', iv);
  console.log('[CDN] data =', data);

  if (!iv || !data || typeof iv !== 'string' || typeof data !== 'string') {
    throw new Error('Invalid xdata input format');
  }

  try {
    const keyBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(keyStr));
    const key = await crypto.subtle.importKey('raw', keyBuffer, 'AES-CBC', false, ['decrypt']);
    const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
    const encryptedBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));

    const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: ivBytes }, key, encryptedBytes);
    return JSON.parse(new TextDecoder().decode(decryptedBuffer));
  } catch (err) {
    console.error('[CDN] ❌ Decryption threw:', err.message || err);
    throw err;
  }
}

// =======================
// NEW: Hardened xstats
// =======================
// internal state
let xstatsLoaded = false;
let xstats = { active: false, fp: false }; // safe defaults (fail-closed)

async function loadXstats() {
  if (xstatsLoaded) return xstats;

  try {
    const [mRes, xsRes] = await Promise.allSettled([
      fetch(MANIFEST_URL, { cache: 'no-cache' }),
      fetch(XSTATS_URL,   { cache: 'no-cache' })
    ]);
    if (
      mRes.status !== 'fulfilled' || xsRes.status !== 'fulfilled' ||
      !mRes.value.ok || !xsRes.value.ok
    ) throw new Error('CDN fetch error');

    const manifest   = await mRes.value.json();
    const xstatsText = await xsRes.value.text();

    const xsEntry = manifest.files?.find(f => f.filename === 'xstats.json');
    if (!xsEntry?.sha256 || !xsEntry?.signature) throw new Error('xstats.json not listed in manifest');

    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(xstatsText));
    const hashHex = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (hashHex !== xsEntry.sha256) throw new Error('xstats SHA mismatch');

    const sigOK = await verifySignature(PUBLIC_KEY_PEM, xsEntry.sha256, xsEntry.signature);
    if (!sigOK) throw new Error('xstats signature invalid');

    const parsed = JSON.parse(xstatsText);

    // normalize schema → always return both keys
    xstats = {
      active: typeof parsed.active === 'boolean' ? parsed.active : false,
      fp:     typeof parsed.fp === 'boolean'     ? parsed.fp     : false
    };

  } catch (e) {
    console.warn('[CDN] ⚠️ xstats load failed (fail-closed):', e.message || e);
    xstats = { active: false, fp: false };
  }

  xstatsLoaded = true;
  return xstats;
}

// === Public API ===
export async function getXstats() {
  if (DEBUG_ALLOW_VIRTUAL) {
    // debug override can set everything to true if you want
    return { active: true, fp: true };
  }
  return await loadXstats();
}

// =======================
// Existing xdata loader
// =======================
export async function loadSuspiciousCameraKeywords() {
  if (keywordsLoaded || DEBUG_ALLOW_VIRTUAL) return;

  let manifest = null;
  let xdataText = null;

  try {
    const [manifestRes, xdataRes] = await Promise.allSettled([
      fetch(MANIFEST_URL, { cache: 'no-cache' }),
      fetch(XDATA_URL, { cache: 'no-cache' })
    ]);

    if (
      manifestRes.status !== 'fulfilled' ||
      xdataRes.status !== 'fulfilled' ||
      !manifestRes.value.ok ||
      !xdataRes.value.ok
    ) {
      throw new Error('CDN fetch failed or returned non-200');
    }

    manifest = await manifestRes.value.json();
    xdataText = await xdataRes.value.text();

    const xdataEntry = manifest.files?.find(f => f.filename === 'xdata.json');
    if (!xdataEntry) throw new Error('xdata.json not listed in manifest');

    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(xdataText));
    const hashHex = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (hashHex !== xdataEntry.sha256) throw new Error('SHA mismatch');

    const signatureValid = await verifySignature(PUBLIC_KEY_PEM, xdataEntry.sha256, xdataEntry.signature);
    if (!signatureValid) throw new Error('Signature verification failed');

    const xdata = JSON.parse(xdataText);
    const decryptedKeywords = await decryptKeywords(xdata, AES_KEY_STRING);

    if (!Array.isArray(decryptedKeywords)) {
      console.error('[CDN] ❌ Decrypted xdata is not an array:', decryptedKeywords);
      throw new Error('Invalid decrypted format');
    }

    suspiciousCameraKeywords = decryptedKeywords.map(p => new RegExp(p, 'i'));
    console.log('suspiciousCameraKeywords', suspiciousCameraKeywords);
    console.info('[CDN] ✅ Verified and loaded keywords from xdata.json');
  } catch (err) {
    console.warn('[CDN] ⚠️ Failed to load xdata.json — using hardcoded encrypted fallback:', err.message);
    try {
      const fallbackDecrypted = await decryptKeywords(FALLBACK_XDATA, AES_KEY_STRING);
      suspiciousCameraKeywords = fallbackDecrypted.map(p => new RegExp(p, 'i'));
      console.info('[CDN] ✅ Loaded keywords from encrypted fallback');
      console.log('suspiciousCameraKeywords', suspiciousCameraKeywords);
    } catch (fallbackErr) {
      console.error('[CDN] ❌ Fallback decryption failed:', fallbackErr.message);
    }
  }

  keywordsLoaded = true;
}

// =======================
// Device helpers
// =======================
export async function listVideoInputs() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(d => d.kind === 'videoinput');
}

export function isSuspiciousCameraLabel(label) {
  console.log('isSuspiciousCameraLabel label=', label);
  return suspiciousCameraKeywords.some(rx => rx.test(label));
}

export async function cameraAnomalyDevice() {
  const cams = await listVideoInputs();
  return cams.some(cam => isSuspiciousCameraLabel(cam.label));
}
