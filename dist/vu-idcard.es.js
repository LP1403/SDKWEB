// Reference the existing vu object
const vu$g = window.vu || {};
vu$g.sop = vu$g.sop || {};
vu$g.sop.audio = vu$g.sop.audio || {};
vu$g.face = vu$g.face || {};
vu$g.face.auth = vu$g.face.auth || {};
vu$g.face.auth.audio = vu$g.face.auth.audio || {};

vu$g.sop.audio.enabled = false;
vu$g.sop.audio.audioQueue = [];

vu$g.sop.audio.initialize = function () {
    if (window.vu.sop.audio.enabled != vu$g.sop.audio.enabled)
        vu$g.sop.audio.enabled = window.vu.sop.audio.enabled;

    if (window.vu.sop.audioPreloaded != vu$g.sop.audioPreloaded)
        vu$g.sop.audioPreloaded = window.vu.sop.audioPreloaded;
};

// if (typeof vu.sop.audio == "undefined") {
//     vu.sop.audio.enabled = true
//     vu.sop.audio.audioQueue = [];
// }

// if (typeof vu.sop.audio.audioQueue == "undefined") {
//     vu.sop.audio.audioQueue = [];
// }

// vu.sop.audio.snd = new Audio("data:audio/mp3;base64,"+vu.sop.audio.userError);

vu$g.sop.audio.play = function (audioId) {
    if (!vu$g.sop.audio.enabled)
        return;

    // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
    // console.log("vu.face.auth.audio.enabled", vu.face.auth.audio.enabled);

    // const stack = new Error().stack.split('\n');
    // const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    // console.log(`Caller: ${callerInfo}`);

    if (vu$g.sop.audio.enabled) {
        const audio = document.getElementById(audioId);

        if (!audio) {
            console.error(`Audio element with ID "${audioId}" not found.`);
            return;
        }

        audio.addEventListener('canplaythrough', () => {
            console.debug(`Audio "${audioId}" is ready.`);
        });

        audio.muted = false; // asegura que el audio no esté en silencio
        vu$g.sop.audio.audioQueue.push(audio);

        if (vu$g.sop.audio.audioQueue.length > 1) {
            const previousAudio = vu$g.sop.audio.audioQueue[vu$g.sop.audio.audioQueue.length - 2];
            if (previousAudio && previousAudio.id !== "vu.sop.audio.audioBeep") {
                console.log(`Pausing audio: ${previousAudio.id}`);
                previousAudio.pause();
            }
        }

        audio.play().then(() => {
            console.debug(`Audio "${audioId}" is playing.`);
        }).catch((e) => {
            console.error(`Audio "${audioId}" cannot be played. Error: `, e);
        });

        const handleAudioEvent = () => {
            vu$g.sop.audio.audioQueue = vu$g.sop.audio.audioQueue.filter(a => a.id !== audioId);
            console.debug(`Audio "${audioId}" has finished playing.`);
        };

        audio.addEventListener('pause', handleAudioEvent);
        audio.addEventListener('ended', handleAudioEvent);
    }
};

vu$g.sop.audioPreloaded = false;

vu$g.sop.audio.reproducir = function () {
    // console.log("window.vu.sop.audio.reproducir", window.vu.sop.audio.enabled);
    // console.log("vu.sop.audio.reproducir", vu.sop.audio.enabled);
    if (!vu$g.sop.audio.enabled)
        return;

    if (!vu$g.sop.audioPreloaded) {
        document.getElementById('vu.sop.audio.audioBeep').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.audioBeep').pause();
        document.getElementById('vu.sop.audio.facePoint').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.facePoint').pause();
        document.getElementById('vu.sop.audio.addFrontDocumentBottomMsg').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontDocumentBottomMsg').pause();
        document.getElementById('vu.sop.audio.addDocumentBottomText').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addDocumentBottomText').pause();

        document.getElementById('vu.sop.audio.faceGesturesSmile').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesSmile').pause();
        document.getElementById('vu.sop.audio.faceGesturesLookLeft').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesLookLeft').pause();
        document.getElementById('vu.sop.audio.faceGesturesNone').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesNone').pause();
        document.getElementById('vu.sop.audio.faceGesturesLookRight').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesLookRight').pause();
        document.getElementById('vu.sop.audio.faceGesturesEyeClose').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesEyeClose').pause();
        document.getElementById('vu.sop.audio.faceGesturesEyeRightClose').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesEyeRightClose').pause();
        document.getElementById('vu.sop.audio.faceGesturesEyeLeftClose').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesEyeLeftClose').pause();
        document.getElementById('vu.sop.audio.faceGesturesLookUp').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesLookUp').pause();
        document.getElementById('vu.sop.audio.faceGesturesLookDown').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceGesturesLookDown').pause();

        document.getElementById('vu.sop.audio.endOpApiBadScore').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.endOpApiBadScore').pause();
        document.getElementById('vu.sop.audio.faceComunicationErrorRegister').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceComunicationErrorRegister').pause();
        document.getElementById('vu.sop.audio.faceComunicationErrorEndOperation').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceComunicationErrorEndOperation').pause();
        document.getElementById('vu.sop.audio.faceNoSelfieFrontImg').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceNoSelfieFrontImg').pause();
        document.getElementById('vu.sop.audio.endOpApiDocumentDataError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.endOpApiDocumentDataError').pause();
        document.getElementById('vu.sop.audio.endOpApiDocumentBackFrontError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.endOpApiDocumentBackFrontError').pause();
        document.getElementById('vu.sop.audio.endOpApiDocumentBarcodeDoNotExist').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.endOpApiDocumentBarcodeDoNotExist').pause();
        document.getElementById('vu.sop.audio.endOpApiDocumentExpired').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.endOpApiDocumentExpired').pause();
        document.getElementById('vu.sop.audio.endOpApiPersonDataFail').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.endOpApiPersonDataFail').pause();

        document.getElementById('vu.sop.audio.addFrontDocumentComunicationError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontDocumentComunicationError').pause();
        document.getElementById('vu.sop.audio.addFrontDocumentPictureNotDetected').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontDocumentPictureNotDetected').pause();
        document.getElementById('vu.sop.audio.addFrontDocumentBarcodeNotDetected').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontDocumentBarcodeNotDetected').pause();
        document.getElementById('vu.sop.audio.addFrontDocumentError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontDocumentError').pause();
        document.getElementById('vu.sop.audio.addFrontApiErrorAntiSpoofing').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontApiErrorAntiSpoofing').pause();
        document.getElementById('vu.sop.audio.addFrontApiErrorFrontAlreadyExist').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addFrontApiErrorFrontAlreadyExist').pause();
        document.getElementById('vu.sop.audio.smallDocumentImg').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.smallDocumentImg').pause();
        document.getElementById('vu.sop.audio.badImageFormat').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.badImageFormat').pause();

        document.getElementById('vu.sop.audio.addBackDocumentFileUploadBottomMsg').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackDocumentFileUploadBottomMsg').pause();
        document.getElementById('vu.sop.audio.addBackDocumentBottomMsg').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackDocumentBottomMsg').pause();
        document.getElementById('vu.sop.audio.addBackDocumentComunicationError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackDocumentComunicationError').pause();
        document.getElementById('vu.sop.audio.addBackDocumentPictureNotDetected').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackDocumentPictureNotDetected').pause();
        document.getElementById('vu.sop.audio.addBackDocumentBarcodeNotDetected').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackDocumentBarcodeNotDetected').pause();
        document.getElementById('vu.sop.audio.addBackDocumentError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackDocumentError').pause();
        document.getElementById('vu.sop.audio.addBackApiErrorAntiSpoofing').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackApiErrorAntiSpoofing').pause();
        document.getElementById('vu.sop.audio.addBackApiErrorFrontAlreadyExist').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.addBackApiErrorFrontAlreadyExist').pause();

        document.getElementById('vu.sop.audio.browserOldVersion').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.browserOldVersion').pause();
        document.getElementById('vu.sop.audio.browserUnsupported').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.browserUnsupported').pause();
        document.getElementById('vu.sop.audio.osOldVersion').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.osOldVersion').pause();
        document.getElementById('vu.sop.audio.deviceNotSupported').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.deviceNotSupported').pause();

        document.getElementById('vu.sop.audio.cameraDenied').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.cameraDenied').pause();
        document.getElementById('vu.sop.audio.cameraAutoplayProtection').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.cameraAutoplayProtection').pause();
        document.getElementById('vu.sop.audio.cameraLowResolution').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.cameraLowResolution').pause();
        document.getElementById('vu.sop.audio.cameraError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.cameraError').pause();

        document.getElementById('vu.sop.audio.faceError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceError').pause();
        document.getElementById('vu.sop.audio.faceNoDocFrontImg').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceNoDocFrontImg').pause();
        document.getElementById('vu.sop.audio.faceErrorUserNotExist').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceErrorUserNotExist').pause();
        document.getElementById('vu.sop.audio.faceErrorFailAuth').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.faceErrorFailAuth').pause();

        document.getElementById('vu.sop.audio.userError').play().catch((error) => {
            console.warn("Playback error", error);
        });
        document.getElementById('vu.sop.audio.userError').pause();
    }

    vu$g.sop.audioPreloaded = true;
};

var vuSopAudio = vu$g.sop.audio;

const DEBUG_ALLOW_VIRTUAL = '"true"' === 'true';

let suspiciousCameraKeywords = [];

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

const FALLBACK_XDATA = { "iv": "N914/Co0bCXL36nNv2giAA==", "data": "jCqgWOmfIHL7IZ/DOuAS5Vikdb2ClFucsoX+RZI0TAglhmLLdzSaN5Pzh9ywgOTJxbrsCyrb4AxJC0v55sHiyUhYwrvOaaX9lxsz/jn4ykkT3xe0TElHQK60hRtiJs+8o05aFI4uEidBBsH/ikeuQyWx8UDEuYJ6lXXfz+9j1YQl2EneMRBysKi/Pxnq4Sl1ZExcT5R1aOCU1UvYdjK6bZcTyV6xX06E4ppmDekwkLFO4pgGw0QNWbx3R8OVYP1lFpVDMr1ZZHpCVYepcwCCW9nxa+r1GkCFVvWco97HgQroNDcU2yKa+e4o8mb5OKDefaPMbGqkMcUj1JoI2s39sIP4eO2mxN67QPdX6X2knyxFoHH+cd6usu1m+A8tuboeQNIIOBLwxbk3LbjW6z8EfjLlkZju8M1VDGl437S3vyzdqEhyXLAZylFciDQSBC/tUKlkQaJTReD4kSveAt6jp1GAiyey7vzZD5LAppfdbanbBjL76BEG+2qGD4CiAC9fHtxyfLn1jiC2jhloybhIwwmMkCo65dR74SfkBhli3W3NPNuP+V4aGAIGJzV0HmNgfOEx44RCKBuwv6ta2oQQXcRLH92c4ZgVNynN6wHDOGU1DAT25HrEN3rEwVQ21RPegtVBczm8lBRdZDcCGAhJzDzRIiINIEFHRT5UkVl0NUBIBVob3U5xF2yp/C1vfXRElmgPz+PXkHG4c6d8Ygzwde7s3vJ4vvS+p7aZcjCKw3an+mIy2Ma1DkLEZNuYj4eJroS6O6aE7BEuSQgYDNpBnIkIwzj54k1B4J8qYOlc/o11UebdWE+3eviHfvTLk1pDYAaMixLaDmyQBTd8Nswc6DMs1D2SosyVH9IFukAQgFF7x62PQUmSaKW5nf8cfn/wJIne5VlFK17bZs/cxA3971/oaNKj2VbmHHIlU2Dbp5KhJJzCJ/MCqjkfS2iQ8+RbKSructynnKJ100cOD00ZHv0DkEzoKp8r5oUjPXPvJ62Ad00T1PvGmply22k4CeVhcjkLcswCcNvT0ng9IEkQYtRYEidICL42nknA4pzaK3msUWj8sI0ReYrSRz9Nn6RtH0mfhSikYq33XwcXfX/V6LDBwovCghU+4dxK+0LckO5UMJeNdkcInAocv7DvAIMLXAClDPdRNfZEbdm99to4Qme1Us5mIP1tIU81ggAzjnVek5NEBLrJKANTvL6UjqlSDyD1ctKn5SwbaG+ZSrrhvIDE8CAw4IwOV0817Pgsdz/nHMnXJFQZe2rR0PWLyzGEfdu+cIWAuTh5thJdZjh4kz2Kv8nfKQ9FWX8VxTpt74Jhr1FvhMW0XlD8WxgVzqXPKzXgiiZXED/L1J1rjskHzCTy8SOaNnvwwX0dTfnr1ReCp8b6CGibBhgw908rqolLuatS0ar3OLJYsKvtPE7QWWHvTtSx4Uh7TvtFgEUige33Y992mC0MAsFR5xGhbDLRjl4KWvzV9LejP2OkJc6IhUH5P6rz8niNWRuTRWIoRb/vZtSRycBIjsp1ol0Ro6MR544nMq+LdjG5T5u+ZCgDhUQylAMcOKx1kJJtPkYdUlLb1yGcHRZTZ1e55pIEerwgik09dxpiOgZMG/og0/vklsAFLqqPFvKr7cdwC8we4eJFuaWxpZyKN3Qv3e8PMCW47/NtPBkza6Pc3hPWe5LCSYL9vnKmLpoQlOHJbqRVrga9mCMICsj4HKCocvCWiT3KtAfrDnv9kXrRafUp2oWu2gZggnd5cTNJmS/V00EYUy2azLcb1ksnvXnvMn1uenhpDrUWHY3zZ89hQDOxWtRYPlntyYeIHQrH8ZdRKaDmvHnIWDMUW4sCasNGuTon0BJgyY1+gzmCaeT1chuoL6bgtJ1QqvZ11EmSxXPUaZXlFJxTYQDjXeZHNPUMDq1Wx+OTTG8HScV4FiiKiPDVc3kkZ9jlpd//yzE7yP4ep2yAItwe3OGyW8bMONCRHl6EFjqduphzm4XmAmomboEkjX85I71QokK7vrJdhvW7TM8uPbjhuODbmoXKOaLJjc5ecfgM1ohTbLGM/zIk9ByYjsD2jeO5+9IJ4XtSa6yJxdBhcdIDJGsfA77Wl4V+D1u0GgWBgnK3MY/ZyBnX8FlRF9nb/9Guq8+ua8K77QcotWgMVEocx3N40lfMu9JyGgSu/oful09p/hjhG2eA8nzx3b88557DKe2b4SQYJ08JeHBzWNw=" };

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
async function getXstats() {
  return await loadXstats();
}

// =======================
// Existing xdata loader
// =======================
async function loadSuspiciousCameraKeywords() {
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
async function listVideoInputs() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(d => d.kind === 'videoinput');
}

function isSuspiciousCameraLabel(label) {
  console.log('isSuspiciousCameraLabel label=', label);
  return suspiciousCameraKeywords.some(rx => rx.test(label));
}

async function cameraAnomalyDevice() {
  const cams = await listVideoInputs();
  return cams.some(cam => isSuspiciousCameraLabel(cam.label));
}

// vu.sop.ui.js

// Reference the existing vu object
const vu$f = window.vu || {};
vu$f.sop = vu$f.sop || {};
vu$f.sop.steps = vu$f.sop.steps || {};
vu$f.sop.ui = vu$f.sop.ui || {};
vu$f.sop.ui.debug = vu$f.sop.ui.debug || {};
vu$f.sop.ui.user = vu$f.sop.ui.user || {};
vu$f.sop.msg = vu$f.sop.msg || {};
vu$f.sop.audio = vu$f.sop.audio || {};
vu$f.sop.api = vu$f.sop.api || {};

// vu.sop.steps = vu.sop.steps || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu$f.sop.audio = Object.assign(vu$f.sop.audio, vuSopAudio);
vu$f.face = vu$f.face || {};
vu$f.face.auth = vu$f.face.auth || {};
let moduleCamera$5 = null;

vu$f.sop.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    // Proceed to use vu.sop safely
    // Merge vu.sop.msg and window.vu.sop.msg
    vu$f.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu$f.sop.msg || {});

    // Merge vu.sop.audio and window.vu.sop.audio
    vu$f.sop.audio = Object.assign({}, window.vu.sop.audio || {}, vu$f.sop.audio || {});

    // // Merge vu.sop.api and window.vu.sop.api
    vu$f.sop.api = Object.assign({}, window.vu.sop.api || {}, vu$f.sop.api || {});

    vu$f.sop.steps = Object.assign({}, window.vu.sop.steps || {}, vu$f.sop.steps || {});

    vu$f.face.auth = Object.assign({}, window.vu.face.auth || {}, vu$f.face.auth || {});

    vu$f.sop.ui.bottomTextResizeScheduled = false;

    moduleCamera$5 = camera;
};

vu$f.sop.ui.user.initialize = function(sopApi)
{
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    // // Merge vu.sop.api and window.vu.sop.api
    //vu.sop.api = Object.assign({}, window.vu.sop.api || {}, sopApi || {});    

    // vu.sop.steps = Object.assign({}, window.vu.sop.steps || {}, vu.sop.steps || {});
};


// vu.sop.ui.assignApi = function(api, msg) {
//     vu.sop.api = Object.assign(vu.sop.api, api);
//     vu.sop.msg = Object.assign(vu.sop.msg, msg);
// };

vu$f.sop.ui.cameraBackGroundOverlayTopBGColor = "rgba(0, 0, 0, 1)";
vu$f.sop.ui.cameraBackGroundOverlayBottomBGColor = "rgba(0, 0, 0, 1)";

//---------------------------------------------------
// Subtitles
//---------------------------------------------------

vu$f.sop.ui.isEven  = function(x) { return !( x & 1 ); };
vu$f.sop.ui.isOdd = function(x) { return x & 1; };


vu$f.sop.ui.bottomTextNoOverlay = function(){
    let baseDiv = document.getElementById('vu.sop');
    let mainDiv = document.getElementById('vu.sop.ui');
    let bottomText = document.getElementById('vu.sop.ui.bottomText');
    let videoContainer = document.getElementById('vu.sop.ui.videoContainer');
    console.log("vu.sop.videoResizeStyleFillContainer", vu$f.sop.videoResizeStyleFillContainer);
    if (bottomText !== null) {
        if (vu$f.sop.videoResizeStyleFillContainer){
            Math.round((videoContainer.offsetWidth / videoContainer.offsetHeight)*10);

            mainDiv.offsetHeight - bottomText.offsetHeight;
            let videoContainerWidth = mainDiv.offsetWidth;
            // Mejora en la proporcion
            //if (true){
            if(window.innerHeight > window.innerWidth){
                baseDiv.style.height = Math.round((videoContainerWidth * 800) / 690) + "px";
            } else {
                baseDiv.style.height = Math.round((videoContainerWidth * 495) / 690) + "px";
            }


            let divheight = mainDiv.offsetHeight - bottomText.offsetHeight;
            let dheight = divheight;
            let dtop = (divheight/2);
            if (vu$f.sop.ui.isOdd(dtop)) { dtop = dtop - 1; }
            if (vu$f.sop.ui.isOdd(dheight)) { dheight = dheight + 3; }
            videoContainer.style.height = (dheight+2) + "px";
            videoContainer.style.top = dtop + "px";
        } else {
            let divheight = mainDiv.offsetHeight - bottomText.offsetHeight;
            let dheight = divheight;
            let dtop = (divheight/2);
            if (vu$f.sop.ui.isOdd(dtop)) { dtop = dtop - 1; }
            if (vu$f.sop.ui.isOdd(dheight)) { dheight = dheight + 3; }
            videoContainer.style.height = (dheight+2) + "px";
            videoContainer.style.top = dtop + "px";
        }
    }
};
vu$f.sop.ui.bottomTextResizeScheduled = false;

vu$f.sop.ui.bottomTextObserver = new ResizeObserver(entries => {
    if (vu$f.sop.ui.bottomTextResizeScheduled) return;

    vu$f.sop.ui.bottomTextResizeScheduled = true;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            vu$f.sop.ui.bottomTextResizeScheduled = false;
            console.trace("ResizeObserver fired in vu.sop.ui.bottomTextObserver");
            vu$f.sop.ui.bottomTextNoOverlay();            
        });
    });
});
//vu.sop.ui.bottomTextObserver.observe(document.getElementById('vu.sop.ui.bottomText'));


//---------------------------------------------------
// Generic
//---------------------------------------------------

vu$f.sop.ui.alertDraw = function(msg, closeMethod, e) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";

    let divAlertText = document.createElement("div");
    divAlertText.innerHTML = msg;

    let buttonClose = document.createElement("button");
    buttonClose.className = "vu.sop.btn vu.sop.btn-outline-secondary";
    buttonClose.id = "vu.sop.ui.alertButton";
    buttonClose.innerHTML = vu$f.sop.msg.close;
    buttonClose.onclick = closeMethod;
    
    divContainer.appendChild(divAlertText);
    divContainer.appendChild(buttonClose);
    return divContainer;
};

vu$f.sop.ui.alertDraw2 = function(msg, closeMethod) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";

    let divAlertText = document.createElement("div");
    divAlertText.innerHTML = msg;

    divContainer.appendChild(divAlertText);
    return divContainer;
};

vu$f.sop.ui.documentFileUploadFrontDraw = function() {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";
    divContainer.style = "margin-top: -2em;";

    let label = document.createElement("label");
    label.htmlFor = "documentFileUploadFrontInput";
    label.style = "display: inline-block; padding: 6px 12px; cursor: pointer; transform: translate(0px, -50%);";

    let imgUpload = document.createElement("img");
    imgUpload.style = "width: 100%";
    imgUpload.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJhcnJvdy1jaXJjbGUtdXAiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1jaXJjbGUtdXAgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik04IDI1NkM4IDExOSAxMTkgOCAyNTYgOHMyNDggMTExIDI0OCAyNDgtMTExIDI0OC0yNDggMjQ4UzggMzkzIDggMjU2em0xNDMuNiAyOC45bDcyLjQtNzUuNVYzOTJjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMTZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMjA5LjRsNzIuNCA3NS41YzkuMyA5LjcgMjQuOCA5LjkgMzQuMy40bDEwLjktMTFjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlMMjczIDEwNy43Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMEwxMDYuMyAyNDAuNGMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlsMTAuOSAxMWM5LjYgOS41IDI1LjEgOS4zIDM0LjQtLjR6Ij48L3BhdGg+PC9zdmc+";

    label.appendChild(imgUpload);

    let inputFile = document.createElement("input");
    inputFile.id = "documentFileUploadFrontInput";
    inputFile.type ="file";
    inputFile.style="display: none;";
    console.log("vu.sop.steps", vu$f.sop.steps);
    inputFile.onchange = function() {vu$f.sop.steps.uploadFrontDocumentPictureResolve(this.files);};
    divContainer.appendChild(label);
    divContainer.appendChild(inputFile);

    return divContainer;
};

vu$f.sop.ui.documentFileUploadBackDraw = function() {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";
    divContainer.style = "margin-top: -2em;";

    let label = document.createElement("label");
    label.htmlFor = "documentFileUploadBackInput";
    label.style = "display: inline-block; padding: 6px 12px; cursor: pointer; transform: translate(0px, -50%);";

    let imgUpload = document.createElement("img");
    imgUpload.style = "width: 100%";
    imgUpload.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJhcnJvdy1jaXJjbGUtdXAiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1jaXJjbGUtdXAgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik04IDI1NkM4IDExOSAxMTkgOCAyNTYgOHMyNDggMTExIDI0OCAyNDgtMTExIDI0OC0yNDggMjQ4UzggMzkzIDggMjU2em0xNDMuNiAyOC45bDcyLjQtNzUuNVYzOTJjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMTZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMjA5LjRsNzIuNCA3NS41YzkuMyA5LjcgMjQuOCA5LjkgMzQuMy40bDEwLjktMTFjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlMMjczIDEwNy43Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMEwxMDYuMyAyNDAuNGMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlsMTAuOSAxMWM5LjYgOS41IDI1LjEgOS4zIDM0LjQtLjR6Ij48L3BhdGg+PC9zdmc+";

    label.appendChild(imgUpload);

    let inputFile = document.createElement("input");
    inputFile.id = "documentFileUploadBackInput";
    inputFile.type ="file";
    inputFile.style="display: none;";
    inputFile.onchange = function() {vu$f.sop.steps.uploadBackDocumentPictureResolve(this.files);};
    divContainer.appendChild(label);
    divContainer.appendChild(inputFile);

    return divContainer;
};
vu$f.sop.ui.documentSelectUploadMethodDraw = function(takePictureMethod, uploadFileMethod) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";
    divContainer.style = "margin-top: -2em;";
    
    let divTakePicture = document.createElement("div");
    divTakePicture.style = "width: 50%; float: left;";

    let linkTakePicture = document.createElement("A");
    linkTakePicture.href = "javascript:"+ takePictureMethod;
    linkTakePicture.className = "vu.sop.ui.aPlainLink";

    let imgTakePicture = document.createElement("img");
    imgTakePicture.style = "width: 30%";
    imgTakePicture.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjYW1lcmEtcmV0cm8iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jYW1lcmEtcmV0cm8gZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00OCAzMkMyMS41IDMyIDAgNTMuNSAwIDgwdjM1MmMwIDI2LjUgMjEuNSA0OCA0OCA0OGg0MTZjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWODBjMC0yNi41LTIxLjUtNDgtNDgtNDhINDh6bTAgMzJoMTA2YzMuMyAwIDYgMi43IDYgNnYyMGMwIDMuMy0yLjcgNi02IDZIMzhjLTMuMyAwLTYtMi43LTYtNlY4MGMwLTguOCA3LjItMTYgMTYtMTZ6bTQyNiA5NkgzOGMtMy4zIDAtNi0yLjctNi02di0zNmMwLTMuMyAyLjctNiA2LTZoMTM4bDMwLjItNDUuM2MxLjEtMS43IDMtMi43IDUtMi43SDQ2NGM4LjggMCAxNiA3LjIgMTYgMTZ2NzRjMCAzLjMtMi43IDYtNiA2ek0yNTYgNDI0Yy02Ni4yIDAtMTIwLTUzLjgtMTIwLTEyMHM1My44LTEyMCAxMjAtMTIwIDEyMCA1My44IDEyMCAxMjAtNTMuOCAxMjAtMTIwIDEyMHptMC0yMDhjLTQ4LjUgMC04OCAzOS41LTg4IDg4czM5LjUgODggODggODggODgtMzkuNSA4OC04OC0zOS41LTg4LTg4LTg4em0tNDggMTA0Yy04LjggMC0xNi03LjItMTYtMTYgMC0zNS4zIDI4LjctNjQgNjQtNjQgOC44IDAgMTYgNy4yIDE2IDE2cy03LjIgMTYtMTYgMTZjLTE3LjYgMC0zMiAxNC40LTMyIDMyIDAgOC44LTcuMiAxNi0xNiAxNnoiPjwvcGF0aD48L3N2Zz4=";
    
    let pTakePicture = document.createElement("p");
    pTakePicture.innerHTML = vu$f.sop.msg.addDocumentCameraIconMsg;

    linkTakePicture.appendChild(imgTakePicture);
    linkTakePicture.appendChild(pTakePicture);

    let divUploadFile = document.createElement("div");
    divUploadFile.style = "width: 49%; float: left; height: 33%";

    let linkUploadFile = document.createElement("A");
    linkUploadFile.href = "javascript:"+ uploadFileMethod;
    linkUploadFile.className = "vu.sop.ui.aPlainLink";

    let imgUploadFile = document.createElement("img");
    imgUploadFile.style = "width: 22%; margin-bottom: 5px;";
    imgUploadFile.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLXVwbG9hZCIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtdXBsb2FkIGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em02NS4xOCAyMTYuMDFIMjI0djgwYzAgOC44NC03LjE2IDE2LTE2IDE2aC0zMmMtOC44NCAwLTE2LTcuMTYtMTYtMTZ2LTgwSDk0LjgyYy0xNC4yOCAwLTIxLjQxLTE3LjI5LTExLjI3LTI3LjM2bDk2LjQyLTk1LjdjNi42NS02LjYxIDE3LjM5LTYuNjEgMjQuMDQgMGw5Ni40MiA5NS43YzEwLjE1IDEwLjA3IDMuMDMgMjcuMzYtMTEuMjUgMjcuMzZ6TTM3NyAxMDVMMjc5LjEgN2MtNC41LTQuNS0xMC42LTctMTctN0gyNTZ2MTI4aDEyOHYtNi4xYzAtNi4zLTIuNS0xMi40LTctMTYuOXoiPjwvcGF0aD48L3N2Zz4=";
    
    let pUploadFile = document.createElement("p");
    pUploadFile.innerHTML = vu$f.sop.msg.addDocumentFileIconMsg;

    linkUploadFile.appendChild(imgUploadFile);
    linkUploadFile.appendChild(pUploadFile);

    divTakePicture.appendChild(linkTakePicture);
    divUploadFile.appendChild(linkUploadFile);
    divContainer.appendChild(divTakePicture);
    divContainer.appendChild(divUploadFile);
    return divContainer;
};

vu$f.sop.ui.alertResolve = null;
vu$f.sop.ui.alert = async function(msg, e) {
    let promise = new Promise(function(resolve, reject) {
        vu$f.sop.ui.show('vu.sop.ui.alert');
        vu$f.sop.ui.alertResolve = resolve;
        let divContainer = vu$f.sop.ui.alertDraw(msg, vu$f.sop.ui.alertClose, e);        

        const el = document.getElementById("vu.sop.ui.alert");
        if (!el) {
            console.warn("[vu.sop.ui.showBottomText] Element 'vu.sop.ui.bottomText' not found.");
            return;
        }     
        
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu$f.sop.ui.alertAndRefreshResolve = null;
vu$f.sop.ui.alertAndRefresh = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu$f.sop.ui.show('vu.sop.ui.alert');
        vu$f.sop.ui.alertAndRefreshResolve = resolve;
        let divContainer = vu$f.sop.ui.alertDraw(msg, vu$f.sop.ui.alertCloseAndRefresh);
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu$f.sop.ui.alertNoButton = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu$f.sop.ui.show('vu.sop.ui.alert');
        vu$f.sop.ui.alertResolve = resolve;
        let divContainer = vu$f.sop.ui.alertDraw2(msg, vu$f.sop.ui.alertClose);
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu$f.sop.ui.alertClose = function() {
    vu$f.sop.ui.hide('vu.sop.ui.alert');
    document.getElementById("vu.sop.ui.alert").innerHTML = "";
    vu$f.sop.ui.alertResolve(true);
};

vu$f.sop.ui.alertCloseAndRefresh = function() {
    window.location.reload(false);
};

vu$f.sop.ui.disable = function(id) {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
};

vu$f.sop.ui.enable = function(id) {
    const el = document.getElementById(id);
    if (el) el.disabled = false;
};

vu$f.sop.ui.hide = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
};

vu$f.sop.ui.show = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
};

vu$f.sop.ui.showWhiteLoading = async function() {
    return await vu$f.sop.ui.show('vu.sop.ui.whiteLoading');
};

vu$f.sop.ui.hideWhiteLoading = async function() {
    return await vu$f.sop.ui.hide('vu.sop.ui.whiteLoading');
};

vu$f.sop.ui.showLoading = async function() {
    return await vu$f.sop.ui.show("vu.sop.ui.loading");
};

vu$f.sop.ui.hideLoading = async function() {
    return await vu$f.sop.ui.hide("vu.sop.ui.loading");
};

vu$f.sop.ui.showVideo = async function() {
    return await vu$f.sop.ui.show("vu.sop.ui.videoContainer");
};

vu$f.sop.ui.showBottomText = async function(text) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (!el) {
        console.warn("[vu.sop.ui.showBottomText] Element 'vu.sop.ui.bottomText' not found.");
        return;
    }
    el.innerHTML = text;
    
    await vu$f.sop.ui.show("vu.sop.ui.bottomText");
};

vu$f.sop.ui.hideBottomText = async function() {
    return await vu$f.sop.ui.hide("vu.sop.ui.bottomText");
};

/*****************************************************************/

vu$f.sop.ui.showTopText = async function(text) {
    document.getElementById("vu.sop.ui.topText").innerHTML = text;
    await vu$f.sop.ui.show("vu.sop.ui.topText");
};

vu$f.sop.ui.hideTopText = async function() {
    return await vu$f.sop.ui.hide("vu.sop.ui.topText");
};

vu$f.sop.ui.showTopTextAutoHide = async function(text, time = 4000) {
    vu$f.sop.ui.showTopText(text);
    setTimeout(function() {
        vu$f.sop.ui.hideTopText();
    }, time);
};
/*****************************************************************/

vu$f.sop.ui.showBottomTextAlertTime = false;               // Variable para guardar el ultimo tiempo
vu$f.sop.ui.showBottomTextAlertMinTime = 2000;

vu$f.sop.ui.showBottomTextAlert = async function(text) {
    if (vu$f.sop.ui.showBottomTextAlertTime === false) { vu$f.sop.ui.showBottomTextAlertTime = new Date(); }
    if ((new Date().getTime() - vu$f.sop.ui.showBottomTextAlertTime.getTime()) > vu$f.sop.ui.showBottomTextAlertMinTime ) {
        //document.getElementById("vu.sop.ui.bottomTextAlert").innerHTML = text;
        vu$f.sop.ui.bottomTextAlert.text(text);
        //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "inline";
        vu$f.sop.ui.bottomTextAlert.show();
        vu$f.sop.ui.showBottomTextAlertTime = false;
    }
};

vu$f.sop.ui.hideBottomTextAlert = async function() {
    if (vu$f.sop.ui.showBottomTextAlertTime === false) { vu$f.sop.ui.showBottomTextAlertTime = new Date(); }
    if ((new Date().getTime() - vu$f.sop.ui.showBottomTextAlertTime.getTime()) > vu$f.sop.ui.showBottomTextAlertMinTime ) {
        //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "none";
        vu$f.sop.ui.bottomTextAlert.hide();
    }
};

vu$f.sop.ui.cleanAndHideBottomTextAlert = async function() {
    //document.getElementById("vu.sop.ui.bottomTextAlert").innerHTML = '';
    vu$f.sop.ui.bottomTextAlert.text('');
    //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "none";
    vu$f.sop.ui.bottomTextAlert.hide();
};

/* ----- */
if (typeof vu$f.sop.ui.bottomTextAlert == "undefined") { vu$f.sop.ui.bottomTextAlert = function() {}; }

vu$f.sop.ui.bottomTextAlert.text = function(text) {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.innerHTML = text);
};

vu$f.sop.ui.bottomTextAlert.show = function() {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.style.display = "inline");    
};

vu$f.sop.ui.bottomTextAlert.hide = function() {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.style.display = "none");    
};

/*****************************************************************/

vu$f.sop.ui.bottomTextBackGroundColor = function(color) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.backgroundColor = color;
};

vu$f.sop.ui.bottomTextFontFamily = function(fontFamily) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontFamily = fontFamily;
};

vu$f.sop.ui.bottomTextFontSize = function(fontSize) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontSize = fontSize;
};

vu$f.sop.ui.bottomTextFontWeight = function(fontWeight) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontWeight = fontWeight;
};

vu$f.sop.ui.bottomTextFontStyle = function(fontStyle) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontStyle = fontStyle;
};

vu$f.sop.ui.bottomTextColor = function(color) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.color = color;
};

vu$f.sop.ui.flash = async function () {
    const flashElement = document.getElementById('vu.sop.ui.flash');
    if (!flashElement) {
        console.warn("vu.sop.ui.flash element not found in DOM");
        return false;
    }

    try {
        flashElement.style.display = "block";
        await vu$f.sop.ui.sleep(100);
        flashElement.style.display = "none";
        return true;
    } catch (error) {
        console.error("Error in vu.sop.ui.flash:", error);
        return false;
    }
};

vu$f.sop.ui.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu$f.sop.ui.flipVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(180deg) ";
};

vu$f.sop.ui.keepVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(0deg)";
};

vu$f.sop.ui.isMobile = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true
    } else {
        // false for not mobile device
        return false
    }
};


vu$f.sop.ui.isDeviceCompatible = function() {
    const gl2 = document.createElement('canvas').getContext('webgl2');
    if (gl2) {
        console.log('webgl2 works!');
        return true
    }
    const gl1 = document.createElement('canvas').getContext('webgl');
    if (gl1) {
        let floatExt = gl1.getExtension("OES_TEXTURE_FLOAT");
        if (floatExt) {
            console.log('webgl1 and support OES_TEXTURE_FLOAT!');
            return true
        }
        let halfFloatExt = gl1.getExtension("OES_TEXTURE_HALF_FLOAT");
        if (halfFloatExt) {
            console.log('webgl1 and support OES_TEXTURE_HALF_FLOAT!');
            return true
        }
    }
    return false
};

vu$f.sop.ui.isBrowserCompatible = function() {
    const { userAgent } = navigator;
    // console.log("UserAgent", userAgent);
    if(userAgent.includes('Chrome/')) {
        var raw = userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        var chromeVersion =  raw ? parseInt(raw[2], 10) : false;
        console.log('Browser is Chrome', chromeVersion);
        if (chromeVersion < 87) {
            throw new Error('browserOldVersion')
        }
    } else if(userAgent.includes('AppleWebKit/')) {
        var appleWebKitVersion = parseInt(userAgent.split('AppleWebKit/')[1]);
        console.log('Browser is Safari', appleWebKitVersion);
        if (appleWebKitVersion < 604) {
            throw new Error('browserOldVersion')
        }
    } else if(userAgent.includes('Safari/')) {
        var safariVersion = parseInt(userAgent.split('Safari/')[1]);
        console.log('Browser is Safari', safariVersion);
        if (safariVersion < 604) {
            throw new Error('browserOldVersion')
        }
    }else if(userAgent.includes('Firefox/')){
        var firefoxVersion = parseInt(userAgent.split('Firefox/')[1]);
        console.log('Browser is Firefox', firefoxVersion);
        if (firefoxVersion < 84) {
            throw new Error('browserOldVersion')
        }
    } else if (userAgent.includes('Edg/')) {
        var edgeVersion = parseInt(userAgent.split('Edg/')[1]);
        console.log('Browser is Microsoft Edge', edgeVersion);
        if (edgeVersion < 87) {
            throw new Error('browserOldVersion')
        }
    } else {
        throw new Error('browserUnsupported')
    }
};

vu$f.sop.ui.isSOCompatible = function() {
    const { userAgent } = navigator;
     if(userAgent.includes('AppleWebKit/')) {
        parseInt(userAgent.split('AppleWebKit/')[1]);
        // console.log('Browser is Safari', appleWebKitVersion)
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS ([0-9]+)_([0-9]+)/);
            var iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10)];
            console.log('SO Version', iosVersion);
            if (iosVersion[0] < 14) {
                return false;
            }
            if (iosVersion[0] === 14) {
                if (iosVersion[1] < 3) {
                    return false;
                }
            }
        }
    }else if(userAgent.includes('Safari/')) {
        var safariVersion = parseInt(userAgent.split('Safari/')[1]);
        // console.log('Browser is Safari', safariVersion)
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)/);
            var iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10)];
            console.log('SO Version', iosVersion);
            if (iosVersion[0] < 14) {
                return false;
            }
            if (iosVersion[0] === 14) {
                if (iosVersion[1] < 3) {
                    return false;
                }
            }
        }
        if (safariVersion < 604) {
            return false;
        }
    }
    return true;
};

vu$f.sop.ui.showMirrorBackground  = function() {
    document.getElementById("vu.sop.ui.videoBg").style.display = "block";
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.display = "block";
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.display = "block";

    document.getElementById("vu.sop.ui.videoBg").srcObject = moduleCamera$5.stream;
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.backgroundColor = vu$f.sop.ui.cameraBackGroundOverlayTopBGColor;
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.backgroundColor = vu$f.sop.cameraBackGroundOverlayBottomBGColor;
};

vu$f.sop.ui.hideMirrorBackground  = function() {
    document.getElementById("vu.sop.ui.videoBg").style.display = "none";
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.display = "none";
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.display = "none";
};


//---------------------------------------------------
// Username
//---------------------------------------------------

//if (typeof vu.sop.ui.user == "undefined") { vu.sop.ui.user = function() {} }

vu$f.sop.ui.user.start = async function() {
    await vu$f.sop.ui.show("vu.sop.ui.userContainer");
    let promise = new Promise(function(resolve, reject) {
        vu$f.sop.ui.user.start.resolve = resolve;
        vu$f.sop.ui.user.start.reject = reject;
    });
    return promise;
};

vu$f.sop.ui.user.start.resolve = null;
vu$f.sop.ui.user.start.reject = null;

vu$f.sop.ui.user.hide = async function() {
    return await vu$f.sop.ui.hide("vu.sop.ui.userContainer");
};

vu$f.sop.ui.user.do  = async function() {
    vu$f.sop.audio.reproducir();
    await vu$f.sop.ui.disable('vu.sop.ui.userNameSendBtn');
    await vu$f.sop.ui.showWhiteLoading();
    let userName = document.getElementById("vu.sop.ui.userName").value;
    vu$f.sop.userNameValue = userName;

    if(vu$f.sop.operationIdValue) {
        await start();
    } else {
        await callNewOperation(userName);
    }
};


vu$f.sop.ui.user.doPreSetUser  = async function(userNameValue, loginFlag) {

    const stack = new Error().stack.split('\n');
    const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    console.log(`Caller: ${callerInfo}`);

    new Promise(function(resolve, reject) {
        vu$f.sop.ui.user.start.resolve = resolve;
        vu$f.sop.ui.user.start.reject = reject;
    });

    vu$f.sop.audio.reproducir();

    if(!loginFlag){
        if (vu$f.sop.operationIdValue) {
            await start();
        } else {
            await callNewOperationWithPresetUser(userNameValue);
        }
    } else {
        await vu$f.sop.ui.user.hide();
        await vu$f.sop.ui.showVideo();
        vu$f.sop.ui.user.start.resolve(true);
    }
};

async function callNewOperation(userName){
    await vu$f.sop.ui.showWhiteLoading();
    let response;
    
    try {

        if(vu$f.sop.enableTelemetry){
            await vu$f.telemetry.initTraceId();
        }

        response = await vu$f.sop.api.newOperation(userName, vu$f.sop.browserInfo);
    } catch (error) {
        response = {code: 0, message: vu$f.sop.msg.userComunicationError};
    }
    await vu$f.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        vu$f.sop.operationIdValue = response.operationId;
        vu$f.sop.operationGuidValue = response.operationGuid;
        window.vu.sop.operationIdValue = vu$f.sop.operationIdValue;
        window.vu.sop.operationGuidValue = vu$f.sop.operationGuidValue;
        await start();
    } else {
        console.log('newOperation', 'error', response);
        await vu$f.sop.ui.enable('vu.sop.ui.userNameSendBtn');
        vu$f.sop.ui.user.start.reject('error');
    }
}
async function callNewOperationWithPresetUser(userName){
    await vu$f.sop.ui.showWhiteLoading();
    let response;

    try {
        if(vu$f.sop.enableTelemetry){
            await vu$f.telemetry.initTraceId();
        }

        console.log("userName", userName);
        console.log("vu.sop.browserInfo", vu$f.sop.browserInfo);
        response = await vu$f.sop.api.newOperation(userName, vu$f.sop.browserInfo);
        console.log("response", response);            
    } catch (error) {
        response = {code: 0, message: vu$f.sop.msg.userComunicationError};
        console.log("error", error);
    }

    await vu$f.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        
        vu$f.sop.operationIdValue = response.operationId;
        vu$f.sop.operationGuidValue = response.operationGuid;
        window.vu.sop.operationIdValue = vu$f.sop.operationIdValue;
        window.vu.sop.operationGuidValue = vu$f.sop.operationGuidValue;
        
        start();
    } else {
        console.log('newOperation', 'error', response);
        let alertElement = document.getElementById("vu.sop.ui.alert");
        if (alertElement) {
            alertElement.innerHTML = "";
        }
        alert =  vu$f.sop.ui.alertAndRefresh(vu$f.sop.msg.addBackDocumentComunicationError);
        //vu.sop.ui.hide("vu.sop.ui.alertButton")
        await alert;
    }
}
async function start(){
    await vu$f.sop.ui.hideWhiteLoading();
    await vu$f.sop.ui.enable('vu.sop.ui.userNameSendBtn');
    await vu$f.sop.ui.user.hide();
    await vu$f.sop.ui.showVideo();
    vu$f.sop.ui.user.start.resolve(true);
}


//---------------------------------------------------
// Debug
//---------------------------------------------------

//if (typeof vu.sop.ui.debug == "undefined") { vu.sop.ui.debug = function() {} }

vu$f.sop.ui.debug.initialize = function() {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop || !window.vu.sop.ui ) {
        console.error("vu.sop is not defined");
        return;
    }
    vu$f.sop.ui.debug.debugInfoDiv = document.getElementById("vu.sop.ui.debugInfo.content");
    vu$f.sop.ui.debug.debugEvalDiv = document.getElementById("vu.sop.ui.debugEval.content");
    vu$f.sop.ui.debug.debugPerfDiv = document.getElementById("vu.sop.ui.debugPerf.content");
    vu$f.sop.ui.debug.debugVideoCenter = document.getElementById("vu.sop.ui.debugVideoCenter");
    vu$f.sop.ui.debug.enable = true;
};

vu$f.sop.ui.debug.enable = false;
vu$f.sop.ui.debug.hangDocumentScreen = false;
vu$f.sop.ui.debug.hangProofOfLife = false;
vu$f.sop.ui.debug.debugElementCenter = false;

vu$f.sop.ui.debug.timeLine = { 'frameConsistency': [] };
vu$f.sop.ui.debug.info = [];
vu$f.sop.ui.debug.perf = [];
vu$f.sop.ui.debug.eval = [];
vu$f.sop.ui.debug.finalEval = [];
vu$f.sop.ui.debug.faceBox = [];
vu$f.sop.ui.debug.faceGestures = [];

vu$f.sop.ui.boxCenterPoint = document.getElementById('vu.sop.ui.debugElementCenter');
vu$f.sop.ui.videoContainer = document.getElementById('vu.sop.ui.videoContainer');

vu$f.sop.ui.drawVideoCenter = function() {
    let videoContainer = document.getElementById('vu.sop.ui.videoContainer');
    let video = document.getElementById('vu.sop.ui.video');

    let fixX = Math.round((video.offsetWidth - videoContainer.offsetWidth)/2);
    let fixY = Math.round((video.offsetHeight - videoContainer.offsetHeight)/2);

    vu$f.sop.ui.debug.debugVideoCenter.style.left = Math.round((video.offsetWidth / 2) - fixX) - 5 + "px";
    vu$f.sop.ui.debug.debugVideoCenter.style.top = Math.round((video.offsetHeight / 2) - fixY) - 5 + "px";
    vu$f.sop.ui.debug.debugVideoCenter.style.display = 'block';
};

vu$f.sop.ui.cleanResults = function () {
    if(vu$f.sop.enableTelemetry){
        vu$f.sop.ui.debug.finalEval.push(vu$f.sop.ui.debug.eval[0]);
    }
    vu$f.sop.ui.debug.info = [];
    vu$f.sop.ui.debug.eval = [];
    vu$f.sop.ui.debug.perf = [];
};

vu$f.sop.ui.debugDraw = function () {
    vu$f.sop.ui.debug.initialize();

    vu$f.sop.ui.debug.debugInfoDiv.innerHTML = '';
    vu$f.sop.ui.debug.debugEvalDiv.innerHTML = '';
    vu$f.sop.ui.debug.debugPerfDiv.innerHTML = '';
    document.getElementById("vu.sop.ui.debugInfo").style.display = 'block';
    document.getElementById("vu.sop.ui.debugEval").style.display = 'block';
    document.getElementById("vu.sop.ui.debugTimeline").style.display = 'block';
    vu$f.sop.ui.debugDrawTimeLine(vu$f.sop.ui.debug.timeLine['frameConsistency'], 30);

    for (const value of vu$f.sop.ui.debug.info) {
        vu$f.sop.ui.debug.debugInfoDiv.innerHTML += value[0] + ': ' + '<span style="font-weight: bolder;">' + value[1] + '</span>';
        vu$f.sop.ui.debug.debugInfoDiv.innerHTML += '<br>';
    }
    for (const value of vu$f.sop.ui.debug.perf) {
        vu$f.sop.ui.debug.debugPerfDiv.innerHTML += value[0] + ': ' + '<span style="font-weight: bolder;">' + value[1] + '</span>';
        vu$f.sop.ui.debug.debugPerfDiv.innerHTML += '<br>';
    }
    for (const value of vu$f.sop.ui.debug.eval) {
        vu$f.sop.ui.debug.debugEvalDiv.innerHTML += value[0] + ': ' +
            '<span style="font-weight: bolder; color: ' + value[2] + '">' + value[1] + '</span>';
        vu$f.sop.ui.debug.debugEvalDiv.innerHTML += '<br>';
    }
    vu$f.sop.ui.cleanResults();
};

/*
Generate a function called vu.sop.ui.debugDrawTimeLine.
This function should take an array as an argument and draw a timeline based on the data in the array.
The array will contain objects with the following structure: [value, time]
- Value is a number that will be used to draw the timeline.
- Time is a JavaScript Date() object

And a second optional argument called threshold, which will be used to determine the maximum value to draw in green,
over that value the color will be red.
This will be drawn in a div with the id vu.sop.ui.debugTimeLine, and will be responsive to the size of the div.
And will be called in a loop for each frame of the video.
*/
/**
 * Draws a responsive timeline of value-time data on a canvas.
 * @param {Array} data - Array of [value, Date] pairs.
 * @param {number} [threshold=Infinity] - Optional threshold for color-coding.
 */
vu$f.sop.ui.debugDrawTimeLine = (function () {
    let initialized = false;
    let canvas, ctx;

    function initCanvas() {
        const container = document.getElementById('vu.sop.ui.debugTimeline.content');
        if (!container) {
            console.warn('Container #vu.sop.ui.debugTimeLine.content not found.');
            return;
        }

        canvas = document.createElement('canvas');
        canvas.style.width = "100%";
        canvas.style.height = "50px";
        canvas.style.display = "block";
        container.innerHTML = ''; // Clear previous canvas
        container.appendChild(canvas);

        ctx = canvas.getContext('2d');
        initialized = true;

        // Handle high-DPI screens
        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function draw(data, threshold = 30) {
        if (!initialized) initCanvas();
        if (!ctx || !canvas) return;
        if (!Array.isArray(data) || data.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);

        // Normalize time range
        const times = data.map(d => d[1].getTime());
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const timeSpan = maxTime - minTime || 1;

        // Normalize value range
        const values = data.map(d => d[0]);
        const maxValue = Math.max(...values, threshold);

        for (let i = 0; i < data.length; i++) {
            const [value, time] = data[i];
            const x = ((time.getTime() - minTime) / timeSpan) * width;
            const y = height - (value / maxValue) * height;

            ctx.beginPath();
            ctx.moveTo(x, height);
            ctx.lineTo(x, y);
            ctx.strokeStyle = value <= threshold ? 'green' : 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    return draw;
})();

vu$f.sop.ui.alertCameraSelection = async function (messageText) {
    return new Promise(async (resolve) => {
        vu$f.sop.ui.show('vu.sop.ui.alert');
        vu$f.sop.ui.alertResolve = resolve;

        const container = document.getElementById('vu.sop.ui.alert');
        container.innerHTML = '';

        // ✅ Create inner vertical align container
        const divContainer = document.createElement("div");
        divContainer.className = "vu.sop.ui.innerVerticalAlign";

        const label = document.createElement('div');
        label.style.marginBottom = '12px';
        label.innerText = messageText;
        divContainer.appendChild(label);

        const allCameras = await listVideoInputs();
        const physicalCameras = allCameras.filter(cam => !isSuspiciousCameraLabel(cam.label));

        let select;
        const noCamText = vu$f.sop.msg.noCameras;

        if (physicalCameras.length > 0) {
            select = document.createElement('select');
            select.className = 'vu.sop.custom-select';
            select.style.margin = '0 auto';
            select.style.display = 'block';

            physicalCameras.forEach(cam => {
                const opt = document.createElement('option');
                opt.value = cam.deviceId;
                opt.text = cam.label || vu$f.sop.msg.unnamedCamera;
                select.appendChild(opt);
            });

            divContainer.appendChild(select);
        } else {
            const noCamMsg = document.createElement('div');
            noCamMsg.style.margin = '16px auto';
            noCamMsg.style.color = '#b00020';
            noCamMsg.style.fontSize = '16px';
            noCamMsg.style.fontWeight = 'bold';
            noCamMsg.innerText = noCamText;
            divContainer.appendChild(noCamMsg);
        }

        const button = document.createElement('button');
        button.className = "vu.sop.btn vu.sop.btn-outline-secondary";
        button.style.marginTop = '12px';
        button.style.border = '1px solid';
        button.innerText = physicalCameras.length > 0 ? vu$f.sop.msg.continue : vu$f.sop.msg.retry;

        button.onclick = () => {
            if (physicalCameras.length > 0) {
                const deviceId = select.value;
                resolve(deviceId);
                vu$f.sop.ui.alertClose();
            } else {
                location.reload(); // 🔁 Refresh on retry
            }
        };

        divContainer.appendChild(button);

        // ✅ Append inner container to root alert
        container.appendChild(divContainer);
    });
};




var vuSopUi = vu$f.sop.ui;

// Reference the existing vu object
const vu$e = window.vu || {};
vu$e.extras = vu$e.extras || {};

vu$e.extras.detectEnvironment = function() {
    if (isReact()) {
        return 'react';
    } else if (isAngular()) {
        return 'angular';
    } else if (isVue()) {
        return 'vue';
    } else {
        return 'plain Web';
    }
};

const environmentMap = {
    react: 'React',
    angular: 'Angular',
    vue: 'Vue',
    plainweb: 'Plain Web'
};

vu$e.extras.loadedScripts = vu$e.extras.loadedScripts || {};

vu$e.extras.loadScript = async (rootPath, techStack, folder, scriptFileName, globalObjectName) => {
    // If the script is already loaded or loading, return the cached promise
    
    if (vu$e.extras.loadedScripts[globalObjectName]) {
        console.log("globalObjectName", globalObjectName);
        return vu$e.extras.loadedScripts[globalObjectName];
    }

    if (typeof window[globalObjectName] === 'undefined') {
        const environment = environmentMap[techStack?.toLowerCase()] || 'Plain Web';
        let scriptPath;

        switch (environment) {
            case 'React':
            case 'Angular':
            case 'Vue':
                //console.debug(`${environment} environment detected`);
                scriptPath = `/static/vu-om-websdk/${folder}/${scriptFileName}`;

                if (folder === "") {
                    scriptPath = `/static/vu-om-websdk/${scriptFileName}`;
                }

                // Cache the promise of the script load to prevent multiple loads
                vu$e.extras.loadedScripts[globalObjectName] = new Promise((resolve, reject) => {
                    const scriptAlreadyLoaded = Array.from(document.scripts).some(script => script.src.includes(scriptPath));

                    if (!scriptAlreadyLoaded) {
                        const script = document.createElement('script');
                        script.src = scriptPath;
                        script.type = 'text/javascript';
                        script.async = true;

                        // This function will check for the global object in a loop until it's available
                        // This function will check for the global object in a loop until it's available
                        const checkGlobalObject = () => {
                            console.log("checkGlobalObject");
                            console.log("globalObjectName ", globalObjectName);

                            // Split the globalObjectName string (e.g., 'vu.sop.msg') to resolve nested properties
                            const parts = globalObjectName.split('.');
                            let obj = window;

                            // Traverse the window object to reach the desired nested property (vu.sop.msg)
                            for (const part of parts) {
                                if (obj[part]) {
                                    obj = obj[part];
                                } else {
                                    obj = undefined;
                                    break;
                                }
                            }

                            console.log("Resolved object: ", obj);

                            // If the object is found, resolve the promise
                            if (obj) {
                                resolve(obj);
                                console.log("resolved ", obj);
                            } else {
                                // Keep retrying until the global object is attached
                                requestAnimationFrame(checkGlobalObject);
                            }
                        };

                        script.onload = () => {
                            console.log(`${globalObjectName} loaded successfully in ${environment} environment.`);
                            checkGlobalObject(); // Start checking for the global object
                        };

                        script.onerror = (event) => {
                            let errorDetails = {
                                message: `Failed to load ${scriptFileName} in ${environment}.`,
                                scriptPath: script.src,
                                errorEvent: event,
                                possibleCauses: [
                                    "Script file is missing or not found at the specified path.",
                                    "Network issues (e.g., server not responding).",
                                    "Cross-origin resource sharing (CORS) issues."
                                ]
                            };
                            console.error(`Error loading script:`, errorDetails);
                            reject(new Error(`Failed to load ${scriptFileName} in ${environment}. See console for more details.`));
                        };

                        document.head.appendChild(script);
                    } else {
                        console.log(`${globalObjectName} already loaded.`);
                        resolve(window[globalObjectName]);
                    }
                });

                return vu$e.extras.loadedScripts[globalObjectName];

            case 'Plain Web':
            default:
                //console.debug("Plain web environment detected");
                //scriptPath = `./${rootPath}/${folder}/${scriptFileName}`;

                if (folder === "") {
                    scriptPath = `${rootPath}/${scriptFileName}`;
                } else {
                    scriptPath = `${rootPath}/${folder}/${scriptFileName}`;
                }                

                // try {
                //     let module;
                //     if (folder === "") {
                //         module = await import(new URL(`./${rootPath}/${scriptFileName}`, import.meta.url).href);
                //     } else {
                //         module = await import(new URL(`./${rootPath}/${folder}/${scriptFileName}`, import.meta.url).href);
                //     }

                //     if (!window[globalObjectName] && module) {
                //         window[globalObjectName] = module.default || module;
                //     }

                //     // Cache the loaded script result
                //     vu.extras.loadedScripts[globalObjectName] = Promise.resolve(window[globalObjectName]);

                //     return window[globalObjectName];
                // } catch (error) {
                //     console.error(`Failed to dynamically import ${scriptFileName}:`, error);
                //     return null;
                // }

                // Cache the promise of the script load to prevent multiple loads
                vu$e.extras.loadedScripts[globalObjectName] = new Promise((resolve, reject) => {
                    const scriptAlreadyLoaded = Array.from(document.scripts).some(script => script.src.includes(scriptPath));

                    if (!scriptAlreadyLoaded) {
                        const script = document.createElement('script');
                        script.src = scriptPath;
                        script.type = 'text/javascript';
                        script.async = true;

                        // This function will check for the global object in a loop until it's available
                        // This function will check for the global object in a loop until it's available
                        const checkGlobalObject = () => {
                            console.log("checkGlobalObject");
                            console.log("globalObjectName ", globalObjectName);

                            // Split the globalObjectName string (e.g., 'vu.sop.msg') to resolve nested properties
                            const parts = globalObjectName.split('.');
                            let obj = window;

                            // Traverse the window object to reach the desired nested property (vu.sop.msg)
                            for (const part of parts) {
                                if (obj[part]) {
                                    obj = obj[part];
                                } else {
                                    obj = undefined;
                                    break;
                                }
                            }

                            console.log("Resolved object: ", obj);

                            // If the object is found, resolve the promise
                            if (obj) {
                                resolve(obj);
                                console.log("resolved ", obj);
                            } else {
                                // Keep retrying until the global object is attached
                                requestAnimationFrame(checkGlobalObject);
                            }
                        };

                        script.onload = () => {
                            console.log(`${globalObjectName} loaded successfully in ${environment} environment.`);
                            checkGlobalObject(); // Start checking for the global object
                        };

                        script.onerror = (event) => {
                            let errorDetails = {
                                message: `Failed to load ${scriptFileName} in ${environment}.`,
                                scriptPath: script.src,
                                errorEvent: event,
                                possibleCauses: [
                                    "Script file is missing or not found at the specified path.",
                                    "Network issues (e.g., server not responding).",
                                    "Cross-origin resource sharing (CORS) issues."
                                ]
                            };
                            console.error(`Error loading script:`, errorDetails);
                            reject(new Error(`Failed to load ${scriptFileName} in ${environment}. See console for more details.`));
                        };

                        document.head.appendChild(script);
                    } else {
                        console.log(`${globalObjectName} already loaded.`);
                        resolve(window[globalObjectName]);
                    }
                });

                return vu$e.extras.loadedScripts[globalObjectName];                
        }
    }

    // Return the global object if already loaded
    return window[globalObjectName];
};

const scriptGlobalObjectMapping = {
    "vu.face.orientation.js": "vu.face",
    // "jeelizFaceFilter.js": "JEEFACEFILTERAPI",
    "vu.face.mixedChallenge.js": "vu.face",
    "vu.face.ui.mixedChallenge.js": "vu.face.ui.gestures"        
};

vu$e.extras.cleanupGestureScripts = (gestureConfig, techStack) => {
    // Mapping of file names to their respective global object names
    const gestureScripts = ["vu.face.orientation.js"];
    const mixedChallengeScripts = ["vu.face.mixedChallenge.js", "vu.face.ui.mixedChallenge.js"];

    const removeScripts = (scripts) => {
        const environment = environmentMap[techStack?.toLowerCase()] || 'Plain Web';

        scripts.forEach((scriptName) => {
            const globalObjectName = scriptGlobalObjectMapping[scriptName];
            console.log("globalObjectName", globalObjectName);
            if (!globalObjectName) return;  // Skip if mapping not found

            // Remove from vu.extras.loadedScripts cache
            if (vu$e.extras.loadedScripts[globalObjectName]) {
                delete vu$e.extras.loadedScripts[globalObjectName];
                console.log(`Removed from loadedScripts cache: ${globalObjectName}`);
            }

            if (environment === "Plain Web") {
                // For Plain Web, delete the global object associated with the script
                if (window[globalObjectName]) {
                    delete window[globalObjectName];
                    console.log(`Removed module from window: ${globalObjectName}`);
                }

                const existingScript = Array.from(document.getElementsByTagName('script')).find(
                    (script) => script.src.includes(scriptName)
                );
                if (existingScript) {
                    console.log(`Removing script tag: ${scriptName}`);
                    existingScript.remove();
                }                
            } else {
                // For React/Angular/Vue, remove <script> tags if they exist
                const existingScript = Array.from(document.getElementsByTagName('script')).find(
                    (script) => script.src.includes(scriptName)
                );
                if (existingScript) {
                    console.log(`Removing script tag: ${scriptName}`);
                    existingScript.remove();
                }
            }
        });
    };

    if (gestureConfig == "points") {
        removeScripts(gestureScripts);
    } else {
        removeScripts(mixedChallengeScripts);
    }
};


vu$e.extras.loadFile = async (rootPath, folder, fileName, techStack) => {
    const environment = environmentMap[techStack?.toLowerCase()] || 'Plain Web';
    let path;

    switch (environment) {
        case 'React':
        case 'Angular':
        case 'Vue':
            console.debug(`${environment} environment detected`);
            path = `/static/vu-om-websdk/${folder}/${fileName}`;
            break;

        case 'Plain Web':
        default:
            console.debug("Plain web environment detected");
            //path = new URL(`${rootPath}/${folder}/${fileName}`, import.meta.url).href; // Use the same URL constructor logic
            // Simple path building that works with obfuscation
            if (rootPath.startsWith('http://') || rootPath.startsWith('https://') || rootPath.startsWith('/')) {
                // Absolute path
                path = `${rootPath}/${folder}/${fileName}`;
            } else {
                // Relative path
                path = `./${rootPath}/${folder}/${fileName}`;
            }
            break;            
    }

    console.debug(`Attempting to load file from path: ${path}`); 

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${fileName}. Status: ${response.status}`);
        }
        const htmlContent = await response.text();
        console.debug(`${fileName} loaded successfully.`);
        return htmlContent;
    } catch (error) {
        console.error(`Error loading HTML:`, error);
        throw error;
    }
};

function isReact() {
    return typeof window.React !== 'undefined' || typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
}

function isAngular() {
    return typeof window.ng !== 'undefined';
}

function isVue() {
    return typeof window.Vue !== 'undefined';
}

var vuExtras = vu$e.extras;

//import vuCamera from 'vu.camera'; //

// Reference the existing vu object
const vu$d = window.vu || {};
vu$d.sop = vu$d.sop || {};
vu$d.sop.ui = vuSopUi;
vu$d.sop.audio = vu$d.sop.audio || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu$d.sop.audio = Object.assign(vu$d.sop.audio, vuSopAudio);
vu$d.sop.msg = vu$d.sop.msg || {};
//vu.camera = vuCamera;

vu$d.error = vu$d.error || {};

vu$d.error.LOAD_ERROR = 'LoadError';
vu$d.error.USER_ERROR = 'UserError';
vu$d.error.TAKE_DOCUMENT_FRONT_ERROR = 'TakeDocumentFrontError';
vu$d.error.TAKE_DOCUMENT_BACK_ERROR = 'TakeDocumentBackError';
vu$d.error.UPLOAD_DOCUMENT_FRONT_ERROR = 'UploadDocumentFrontError';
vu$d.error.UPLOAD_DOCUMENT_BACK_ERROR = 'UploadDocumentBackError';
vu$d.error.CAMERA_ERROR = 'CameraError';
vu$d.error.CAMERA_FACE_ERROR = 'CameraFaceError';
vu$d.error.FACE_AUTH_ERROR = 'FaceAuthError';

let moduleCamera$4 = null;
vu$d.error.initialize = function(camera) {
    if(window.vu.sop.msg != vu$d.sop.msg)
        vu$d.sop.msg = window.vu.sop.msg;

    moduleCamera$4 = camera;
};

vu$d.error.LoadError = function(message) {
    this.name = vu$d.error.LOAD_ERROR;
    this.message = message;
};
vu$d.error.LoadError.prototype = Error.prototype;

vu$d.error.UserError = function(message) {
    this.name = vu$d.error.USER_ERROR;
    this.message = message;
};
vu$d.error.UserError.prototype = Error.prototype;

vu$d.error.TakeDocumentFrontError = function(message) {
    this.name = vu$d.error.TAKE_DOCUMENT_FRONT_ERROR;
    this.message = message;
};
vu$d.error.TakeDocumentFrontError.prototype = Error.prototype;

vu$d.error.TakeDocumentBackError = function(message) {
    this.name = vu$d.error.TAKE_DOCUMENT_BACK_ERROR;
    this.message = message;
};
vu$d.error.TakeDocumentBackError.prototype = Error.prototype;

vu$d.error.UploadDocumentFrontError = function(message) {
    this.name = vu$d.error.UPLOAD_DOCUMENT_FRONT_ERROR;
    this.message = message;
};
vu$d.error.UploadDocumentFrontError.prototype = Error.prototype;

vu$d.error.UploadDocumentBackError = function(message) {
    this.name = vu$d.error.UPLOAD_DOCUMENT_BACK_ERROR;
    this.message = message;
};
vu$d.error.UploadDocumentBackError.prototype = Error.prototype;

vu$d.error.CameraError = function(message) {
    this.name = vu$d.error.CAMERA_ERROR;
    this.message = message;
};
vu$d.error.CameraError.prototype = Error.prototype;

vu$d.error.CameraFaceError = function(message) {
    this.name = vu$d.error.CAMERA_FACE_ERROR;
    this.message = message;
};
vu$d.error.CameraFaceError.prototype = Error.prototype;

vu$d.error.FaceAuthError = function(message) {
    this.name = vu$d.error.FACE_AUTH_ERROR;
    this.message = message;
};
vu$d.error.FaceAuthError.prototype = Error.prototype;

vu$d.error.showError = async function(e) {

    const stack = new Error().stack.split('\n');
    const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    console.log(`Caller: ${callerInfo}`);
        
    console.log(e.name, e.message);

    // if(window.vu.sop.msg && window.vu.sop.msg != {} && window.vu.sop.msg != vu.sop.msg)
    //     vu.sop.msg = window.vu.sop.msg;

    // Object.assign(vu.sop.audio, window.vu.sop.audio);
    // Object.assign(vu.sop.msg, window.vu.sop.msg);
    // //Object.assign(vu.sop.api, window.vu.sop.api);

    // console.log("window.vu.sop.audio", window.vu.sop.audio);
    // console.log("vu.sop.audio", vu.sop.audio);    

    if(e.name === vu$d.error.LOAD_ERROR) {
        if (e.message === 'browserOldVersion') {
            vu$d.sop.audio.play('vu.sop.audio.browserOldVersion');
            await vu$d.sop.ui.alertNoButton(vu$d.sop.msg.browserOldVersion);
        } else if (e.message === 'browserUnsupported') {
            vu$d.sop.audio.play('vu.sop.audio.browserUnsupported');
            await vu$d.sop.ui.alertNoButton(vu$d.sop.msg.browserUnsupported);
        } else if (e.message === 'osOldVersion') {
            vu$d.sop.audio.play('vu.sop.audio.osOldVersion');
            await vu$d.sop.ui.alertNoButton(vu$d.sop.msg.osOldVersion);
        } else if(e.message === 'deviceNotSupported') {
            vu$d.sop.audio.play('vu.sop.audio.deviceNotSupported');
            await vu$d.sop.ui.alertNoButton(vu$d.sop.msg.deviceNotSupported);
        }
    } else if(e.name === vu$d.error.USER_ERROR) {
        vu$d.sop.audio.play('vu.sop.audio.userError');
    await vu$d.sop.ui.alert(vu$d.sop.msg.userError, e);
    } else if(e.name === vu$d.error.TAKE_DOCUMENT_FRONT_ERROR) {
        if (e.message === 'addFrontApiError') {
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentComunicationError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentPictureNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentBarcodeNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontApiErrorAntiSpoofing');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontApiErrorAntiSpoofing, e);
        } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontApiErrorFrontAlreadyExist');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontApiErrorFrontAlreadyExist, e);
        } else {
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentError, e);
        }
    } else if(e.name === vu$d.error.TAKE_DOCUMENT_BACK_ERROR) {
        if (e.message === 'addBackApiError') {
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentComunicationError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentPictureNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentBarcodeNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addBackApiErrorAntiSpoofing'){
            vu$d.sop.audio.play('vu.sop.audio.addBackApiErrorAntiSpoofing');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackApiErrorAntiSpoofing, e);
        } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
            vu$d.sop.audio.play('vu.sop.audio.addBackApiErrorFrontAlreadyExist');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackApiErrorFrontAlreadyExist, e);
        } else {
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentError, e);
        }
    } else if(e.name === vu$d.error.CAMERA_ERROR) {
        if (e.message === 'denied') {
            vu$d.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraDenied, e);
        } else if (e.message === 'autoplay') {
            vu$d.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'lowResolution') {
            vu$d.sop.audio.play('vu.sop.audio.cameraLowResolution');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraLowResolution, e);
        }  else if (e.message === 'cameraSelectionError') {
            vu$d.sop.audio.play('vu.sop.audio.cameraDenied'); // TODO Reemplazar con el audio cuando este generado
            const selectedDeviceId = await vu$d.sop.ui.alertCameraSelection(vu$d.sop.msg.selectOne);
            moduleCamera$4.selectedDeviceId = selectedDeviceId;
            await moduleCamera$4.start("vu.sop.ui.video");  

        }  else {
            vu$d.sop.audio.play('vu.sop.audio.cameraError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraError, e );
        }
    } else if(e.name === vu$d.error.CAMERA_FACE_ERROR) {
        if (e.message === 'denied') {
            vu$d.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraDenied, e );
        } else if (e.message === 'autoplay') {
            vu$d.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'registerApiError') {
            vu$d.sop.audio.play('vu.sop.audio.faceComunicationErrorRegister');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceComunicationErrorRegister, e);
        } else if (e.message === 'endOpApiError') {
            vu$d.sop.audio.play('vu.sop.audio.faceComunicationErrorEndOperation');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceComunicationErrorEndOperation, e);
        }  else {
            vu$d.sop.audio.play('vu.sop.audio.faceError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceError, e);
        }
    } else if(e.name === vu$d.error.FACE_AUTH_ERROR) {
        if (e.message === 'denied') {
            vu$d.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraDenied, e );
        } else if (e.message === 'autoplay') {
            vu$d.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu$d.sop.ui.alert(vu$d.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'faceNoDocFrontImg') {
            vu$d.sop.audio.play('vu.sop.audio.faceNoDocFrontImg');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceNoDocFrontImg, e);
        } else if (e.message === 'faceNoSelfieFrontImg') {
            vu$d.sop.audio.play('vu.sop.audio.faceNoSelfieFrontImg');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceNoSelfieFrontImg, e);
        } else if (e.message === 'registerApiError') {
            vu$d.sop.audio.play('vu.sop.audio.faceComunicationErrorRegister');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceComunicationErrorRegister, e);
        } else if (e.message === 'endOpApiBadScore') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiBadScore');
            await vu$d.sop.ui.alert(vu$d.sop.msg.endOpApiBadScore, e);
        } else if (e.message === 'endOpApiDocumentDataError') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiDocumentDataError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.endOpApiDocumentDataError, e);
        } else if (e.message === 'endOpApiDocumentBackFrontError') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiDocumentBackFrontError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.endOpApiDocumentBackFrontError, e);
        } else if (e.message === 'endOpApiDocumentBarcodeDoNotExist') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiDocumentBarcodeDoNotExist');
            await vu$d.sop.ui.alert(vu$d.sop.msg.endOpApiDocumentBarcodeDoNotExist, e);
        } else if (e.message === 'endOpApiDocumentExpired') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiDocumentExpired');
            await vu$d.sop.ui.alert(vu$d.sop.msg.endOpApiDocumentExpired, e);
        } else if (e.message === 'endOpApiPersonDataFail') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiPersonDataFail');
            await vu$d.sop.ui.alert(vu$d.sop.msg.endOpApiPersonDataFail, e);
        } else if (e.message === 'endOpApiError') {
            vu$d.sop.audio.play('vu.sop.audio.faceComunicationErrorEndOperation');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceComunicationErrorEndOperation, e );
        } else if (e.message === 'endOpApiBiometricFail') {
            vu$d.sop.audio.play('vu.sop.audio.faceNoSelfieFrontImg');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceNoSelfieFrontImg, e );
        } else if (e.message === 'userNotExist') {
            vu$d.sop.audio.play('vu.sop.audio.faceErrorUserNotExist');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceErrorUserNotExist, e);
        } else if (e.message === 'failAuth') {
            vu$d.sop.audio.play('vu.sop.audio.faceErrorFailAuth');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceErrorFailAuth, e);
        } else if (e.message === 'endOpApiBiometricCompareFail') {
            vu$d.sop.audio.play('vu.sop.audio.endOpApiBiometricCompareFail');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceBiometricCompareError, e);
        } else {
            vu$d.sop.audio.play('vu.sop.audio.faceError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.faceError, e );
        }
    } else if(e.name === vu$d.error.UPLOAD_DOCUMENT_FRONT_ERROR) {
        if (e.message === 'addFrontApiError') {
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentComunicationError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentPictureNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentBarcodeNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontApiErrorAntiSpoofing');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontApiErrorAntiSpoofing, e);
        } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
            vu$d.sop.audio.play('vu.sop.audio.addFrontApiErrorFrontAlreadyExist');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontApiErrorFrontAlreadyExist, e);
        } else if (e.message === 'smallDocumentImg'){
            vu$d.sop.audio.play('vu.sop.audio.smallDocumentImg');
            await vu$d.sop.ui.alert(vu$d.sop.msg.smallDocumentImg, e);
        } else if (e.message === 'badImageFormat'){
            vu$d.sop.audio.play('vu.sop.audio.badImageFormat');
            await vu$d.sop.ui.alert(vu$d.sop.msg.badImageFormat, e);
        } else {
            vu$d.sop.audio.play('vu.sop.audio.addFrontDocumentError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addFrontDocumentError, e);
        }
    } else if(e.name === vu$d.error.UPLOAD_DOCUMENT_BACK_ERROR) {
        if (e.message === 'addBackApiError') {
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentComunicationError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentPictureNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentBarcodeNotDetected');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addBackApiErrorAntiSpoofing'){
            vu$d.sop.audio.play('vu.sop.audio.addBackApiErrorAntiSpoofing');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackApiErrorAntiSpoofing, e);
        } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
            vu$d.sop.audio.play('vu.sop.audio.addBackApiErrorFrontAlreadyExist');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackApiErrorFrontAlreadyExist, e);
        } else if (e.message === 'smallDocumentImg'){
            vu$d.sop.audio.play('vu.sop.audio.smallDocumentImg');
            await vu$d.sop.ui.alert(vu$d.sop.msg.smallDocumentImg, e);
        } else if (e.message === 'badImageFormat'){
            vu$d.sop.audio.play('vu.sop.audio.badImageFormat');
            await vu$d.sop.ui.alert(vu$d.sop.msg.badImageFormat, e);
        } else {
            vu$d.sop.audio.play('vu.sop.audio.addBackDocumentError');
            await vu$d.sop.ui.alert(vu$d.sop.msg.addBackDocumentError, e);
        }
    } 
};

var vuError = vu$d.error;

// Reference the existing vu object
const vu$c = window.vu || {};
vu$c.sop = vu$c.sop || {};
vu$c.sop.documentCodes = vu$c.sop.documentCodes || {};

vu$c.sop.documentCodes.getVUIdFromId = function (id) {
    for (let step = 0; step < vu$c.sop.documentCodes.codeList.length; step++) {
        if (vu$c.sop.documentCodes.codeList[step][0] == id) {
           return "VU-" + vu$c.sop.documentCodes.codeList[step][1]
        }
    }
};

vu$c.sop.documentCodes.getIdFromVUId = function (vuid) {
    for (let step = 0; step < vu$c.sop.documentCodes.codeList.length; step++) {
        if (vu$c.sop.documentCodes.codeList[step][1] == vuid) {
           return vu$c.sop.documentCodes.codeList[step][0]
        }
    }
};

// id,code,description,shortdescription
vu$c.sop.documentCodes.codeList = [
    [1,  "ARG-ID-02",   "Documento Argentina", "argentina"],
    [2,  "ARG-ID-01",   "Documento Argentina antiguo", "argentinaantiguo"],
    [3,  "CHL-ID-02",   "Documento Chile,chile"],
    [4,  "CHL-ID-01",   "Documento Chile antiguo", "chileantiguo"],
    [5,  "COL-ID-01",   "Documento Colombia,colombia"],
    [6,  "ECU-ID-01",   "Documento Ecuador,ecuador"],
    [7,  "ECU-ID-02",   "Documento Ecuador Guayaquil", "ecuadorguayaquil"],
    [8,  "SLV-ID-01",   "Documento El Salvador", "elsalvador"],
    [9,  "ESP-ID-02",   "Documento España,espania"],
    [10, "MEX-ID-02",   "Documento México INE", "mexicoine"],
    [11, "MEX-ID-01",   "Documento México IFE", "mexicoife"],
    [12, "PAN-ID-02",   "Documento Panamá,panama"],
    [13, "PAN-ID-01",   "Documento Panamá antiguo", "panamaantiguo"],
    [14, "PAN-IDF-01",  "Documento Panamá residente", "panamaresidente"],
    [15, "ESP-PA-02",   "Pasaporte España", "espaniapasaporte"],
    [16, "PER-ID-01",   "Documento Perú", "peru"],
    [17, "PER-ID-02",   "Documento Perú nuevo", "perunuevo"],
    [18, "PRT-ID-01",   "Documento Portugal", "portugal"],
    [19, "ESP-SC-01",   "Credencial Real Madrid", "realmadrid"],
    [20, "DOM-ID-01",   "Documento República Dominicana", "republicadominicana"],
    [21, "URY-ID-01",   "Documento Uruguay", "uruguay"],
    [22, "PRY-ID-02",   "Documento Paraguay", "paraguay"],
    [23, "PRY-ID-01",   "Documento Paraguay antiguo", "paraguayantiguo"],
    [24, "ESP-ID-01",   "Documento España nuevo", "espanianuevo"],
    [25, "ARG-ID-03",   "Documento Argentina libreta", "argentinalibreta"],
    [26, "BOL-ID-01",   "Documento Bolivia", "bolivia"],
    [27, "MEX-IDF-01",  "Documento México residente", "mexicoresidente"],
    [28, "MEX-ID-03",   "Documento México cédula nacional", "mexicocedulanacional"],
    [29, "MEX-PA-01",   "Pasaporte México", "mexicopasaporte"],
    [30, "SLV-ID-02",   "Documento El Salvador cédula minoridad", "elsalvadorcedulaminoridad"],
    [31, "BRA-DL-01",   "Documento Brasil tránsito", "brasiltransito"],
    [32, "BRA-ID-01",   "Documento Brasil identidad", "brasilcarteiradeidentidade"],
    [33, "BRA-IDF-01",  "Documento Brasil cédula extranjero", "brasilcedulaextranjero"],
    [34, "BOL-ID-02",   "Documento Bolivia ejemplar B", "boliviaejemplarb"],
    [35, "",            "Documento Pasaporte Genérico", "genericpassport"],
    [36, "NLD-PA-01",   "Pasaporte Holanda", "holandapasaporte"],
    [37, "NLD-ID-01",   "Documento Holanda", "holanda"],
    [38, "DEU-ID-01",   "Documento Alemania", "alemania"],
    [39, "ESP-IDF-01",  "Documento España NIE", "espanianie"],
    [40, "FRA-ID-01",   "Documento Francia", "francia"],
    [41, "",            "Documento Genérico,generic"],
    [42, "URY-ID-03",   "Documento Uruguay Cédula", "uruguaycedula"],
    [43, "BRA-ID-02",   "Documento Brasil Identidad Nuevo", "brasilcarteiraidentidadenuevo"],
    [44, "ECU-ID-03",   "Documento Ecuador Cédula", "ecuadorcedula"],
    [45, "BOL-ID-03",   "Documento Bolivia ejemplar C", "boliviaejemplarc"],
    [46, "PER-ID-03",   "Documento Perú Dni E", "perudnie"],
    [47, "DOM-PA-01",   "Pasaporte República Dominicana", "republicadominicanapasaporte"],
    [48, "CRI-ID-03",   "Documento Costa Rica Cédula", "costaricacedula"],
    [49, "COL-IDF-01",  "Documento Colombia Cédula Extranjería", "colombiacedulaextranjeria"],
    [50, "HND-ID-01",   "Documento Honduras,honduras"],
    [51, "PER-IDF-01",  "Documento Perú Extranjería", "perucedulaextranjeria"],
    [52, "GTM-ID-01",   "Documento Guatemala Cédula", "guatemalacedula"],
    [53, "DEU-ID-02",   "Documento Alemania ejemplar B", "alemaniaejemplarb"],
    [54, "DEU-IDF-01",  "Documento Alemania residente", "alemaniaresidente"],
    [55, "DEU-IDF-02",  "Documento Alemania residente ejemplar B,alemaniaresidenteejemplarb"],
    [56, "DEU-PA-01",   "Pasaporte Alemania", "alemaniapasaporte"],
    [57, "DEU-PA-02",   "Pasaporte Alemania ejemplar B", "alemaniapasaporteejemplarb"],
    [58, "PRT-IDF-01",  "Documento Portugal residente", "portugalresidente"],
    [59, "PRT-IDF-02",  "Documento Portugal residente ejemplar B", "portugalresidenteejemplarb"],
    [60, "PRT-IDF-03",  "Documento Portugal residente ejemplar C", "portugalresidenteejemplarc"],
    [61, "PRT-PA-01",   "Pasaporte Portugal", "portugalpasaporte"],
    [62, "PRT-PA-02",   "Pasaporte Portugal ejemplar B", "portugalpasaporteejemplarb"],
    [63, "NLD-IDF-01",  "Documento Holanda residente", "holandaresidente"],
    [64, "NLD-IDF-02",  "Documento Holanda residente ejemplar B", "holandaresidenteejemplarb"],
    [65, "COL-ID-02",   "Documento Colombia ciudadania ejemplar B", "colombiaciudadaniab"],
    [66, "DOM-PA-02",   "Pasaporte República Dominicana ejemplar B", "republicadominicanapasaporteejemplarb"],
    [67, "ESP-PA-01",   "Pasaporte Reino de España", "reinoespaniapasaporte"],
    [68, "ESP-ID-05",   "Documento Reino de España", "reinoespania"],
    [69, "ARG-ID-04",   "Documento Argentina nuevo", "argentinanuevo"],
    [70, "BRA-DL-02",   "Documento Brasil tránsito ejemplar B", "BRA-DL-02"],
    [71, "TTO-ID-01",   "Documento Trinidad y Tobago Antiguo", "TTO-ID-01"],
    [72, "TTO-ID-02",   "Documento Trinidad y Tobago Nuevo", "TTO-ID-02"],
    [73, "TTO-DL-01",   "Documento Trinidad y Tobago Licencia Antigua", "TTO-DL-01"],
    [74, "TTO-DL-02",   "Documento Trinidad y Tobago Licencia Nueva", "TTO-DL-02"],
    [75, "URY-PA-01",   "Pasaporte Uruguay", "URY-PA-01"],
    [76, "PAN-ID-03",   "Documento Panamá nuevo", "PAN-ID-03"],
    [77, "PAN-IDF-02",  "Documento Panamá residente nuevo", "PAN-IDF-02"],
    [78, "VEN-ID-01",   "Cedula Venezuela", "VEN-ID-01"],
    [79, "VEN-PA-01",   "Pasaporte Venezuela", "VEN-PA-01"],
    [80, "VEN-PA-02",   "Pasaporte prorroga Venezuela", "VEN-PA-02"]
];        

var vuSopDocumentCodes = vu$c.sop.documentCodes;

// Reference the existing vu object
const vu$b = window.vu || {};
vu$b.face = vu$b.face || {};
vu$b.face.ui = vu$b.face.ui || {};
vu$b.sop = vu$b.sop || {};
vu$b.sop.ui = vu$b.sop.ui || {};
//vu.camera = vu.camera || {};

let moduleCamera$3 = null;

vu$b.face.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    
    vu$b.face = window.vu.face || {};
    vu$b.sop.msg = window.vu.sop.msg || {};
    vu$b.sop.audio = window.vu.sop.audio || {};
    vu$b.sop.steps = window.vu.sop.steps || {};
    vu$b.image = window.vu.image || {};
    vu$b.sop.ui = window.vu.sop.ui || {};
    moduleCamera$3 = camera;
};

//---------------------------------------------------
// FACE
//---------------------------------------------------



vu$b.face.ui.loop = false;

vu$b.face.ui.starSvg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
'<style type="text/css">.st0{fill:'+color+';}</style><g id="Layer_1"><path class="st0"' +
' d="m 507.80497,263.6018 -52.5396,62.69019 c -3.63142,4.333 -11.50349,4.333 -15.09627,0 l -0.36941,-0.46593 c -3.52934,-4.45149 -1.73618,-11.21455 1.89523,-15.50145 l 45.98275,-54.51299 -45.5472,-54.94611 c -3.61146,-4.35669 -5.63142,-11.33955 -2,-15.62645 v 0 c 3.63141,-4.333 11.50348,-4.333 15.09627,0 l 52.53959,62.69019 c 3.67005,4.333 3.67005,11.33955 0.0386,15.67255 z"' +
'/></g></svg>') +"')"};

vu$b.face.ui.circleSvg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400" style="enable-background:new 0 0 400 400;" xml:space="preserve">' +
'<style type="text/css">.st0{fill:'+color+';}</style><g id="Layer_1"><path class="st0"' +
'   transform="rotate(-157.76036,198.89912,199.17002)"'+
'        d="M 48.29569,327.37072 C 20.683192,294.30809 3.6837793,255.79508 2.9763579,211.63205 c 0.245377,-8.41318 16.0066581,-6.42993 16.0162551,1.88523 1.827925,38.65477 15.395089,69.72809 40.511369,101.45314 8.569597,8.38801 -5.054379,19.56838 -11.208292,12.4003 z"'+
'/></g></svg>') +"')"};

vu$b.face.ui.circleActive = vu$b.face.ui.circleSvg('#1DC600');
vu$b.face.ui.circleDetected = vu$b.face.ui.circleSvg('#88898a');
vu$b.face.ui.circleInactive = vu$b.face.ui.circleSvg('#000000');

vu$b.face.ui.eLeft = document.getElementById("vu.sop.ui.faceCircleLeft");
vu$b.face.ui.eLeftTop = document.getElementById("vu.sop.ui.faceCircleLeftTop");
vu$b.face.ui.eTop = document.getElementById("vu.sop.ui.faceCircleTop");
vu$b.face.ui.eRightTop = document.getElementById("vu.sop.ui.faceCircleRightTop");
vu$b.face.ui.eRight = document.getElementById("vu.sop.ui.faceCircleRight");
vu$b.face.ui.eRightBottom = document.getElementById("vu.sop.ui.faceCircleRightBottom");
vu$b.face.ui.eBottom = document.getElementById("vu.sop.ui.faceCircleBottom");
vu$b.face.ui.eLeftBottom = document.getElementById("vu.sop.ui.faceCircleLeftBottom");
var gesturesType = [];
var directionTags = [];
vu$b.face.ui.picturesTags = [];
vu$b.face.ui.useNewTags = false;


vu$b.face.ui.start = function() {
    gesturesType = [];
    gesturesType.push("SS");
    gesturesType.push("SCE");
    gesturesType.push("SBL");
    gesturesType.push("SBR");
    gesturesType.push("SML");
    gesturesType.push("SMR");

    directionTags = [];
    directionTags.push( { x: 'center', y: 'up', tag: 'SCU' });
    directionTags.push( { x: 'right', y: 'up', tag: 'SUR' });
    directionTags.push({ x: 'right', y: 'center', tag: 'SCR' });
    directionTags.push({ x: 'right', y: 'down', tag: 'SDR' });
    directionTags.push( { x: 'center', y: 'down', tag: 'SCD' });
    directionTags.push( { x: 'left', y: 'down', tag: 'SDL' });
    directionTags.push({ x: 'left', y: 'center', tag: 'SCL' });
    directionTags.push({ x: 'left', y: 'up', tag: 'SUL' });
    directionTags.push({ x: 'center', y: 'center', tag: 'SN' });

    vu$b.face.ui.eLeft = document.getElementById("vu.sop.ui.faceCircleLeft");
    vu$b.face.ui.eLeftTop = document.getElementById("vu.sop.ui.faceCircleLeftTop");
    vu$b.face.ui.eTop = document.getElementById("vu.sop.ui.faceCircleTop");
    vu$b.face.ui.eRightTop = document.getElementById("vu.sop.ui.faceCircleRightTop");
    vu$b.face.ui.eRight = document.getElementById("vu.sop.ui.faceCircleRight");
    vu$b.face.ui.eRightBottom = document.getElementById("vu.sop.ui.faceCircleRightBottom");
    vu$b.face.ui.eBottom = document.getElementById("vu.sop.ui.faceCircleBottom");
    vu$b.face.ui.eLeftBottom = document.getElementById("vu.sop.ui.faceCircleLeftBottom");
    
    vu$b.sop.ui.show("vu.sop.ui.faceCircleLeft");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleLeftTop");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleTop");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleRightTop");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleRight");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleRightBottom");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleBottom");
    vu$b.sop.ui.show("vu.sop.ui.faceCircleLeftBottom");

    vu$b.face.ui.loop = true;
    vu$b.face.start();
    doLoop();
    return true
};


vu$b.face.ui.stop = function() {
    vu$b.face.ui.loop = false;
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleLeft");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleLeftTop");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleTop");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleRightTop");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleRight");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleRightBottom");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleBottom");
    vu$b.sop.ui.hide("vu.sop.ui.faceCircleLeftBottom");
};

// Private function - not exposed to window scope
function doLoop() {
    // console.log("vu.face.ui.doLoop");
    let data = vu$b.face.getData();

    if (!data || data.length === 0 || data[0] == undefined ) {
        console.log("Data is unresolved or empty, skipping doLoop");
        return; // Exit function if data is not ready or is empty
    }    

    let eLeft = vu$b.face.ui.eLeft;
    let eLeftTop = vu$b.face.ui.eLeftTop;
    let eTop = vu$b.face.ui.eTop;
    let eRightTop = vu$b.face.ui.eRightTop;
    let eRight = vu$b.face.ui.eRight;
    let eRightBottom = vu$b.face.ui.eRightBottom;
    let eBottom = vu$b.face.ui.eBottom;
    let eLeftBottom = vu$b.face.ui.eLeftBottom;

    // console.log("vu.face.ui.doLoop data", data);
    // console.log("eLeft", eLeft);
    // console.log("eLeftTop", eLeftTop);
    // console.log("eTop", eTop);
    // console.log("eRightTop", eRightTop);
    // console.log("eRight", eRight);
    // console.log("eRightBottom", eRightBottom);
    // console.log("eBottom", eBottom);
    // console.log("eLeftBottom", eLeftBottom);

    if (data[0] == true) {
        let x = data[1][0];
        let y = data[1][1];
        // console.log('loop', x, y)
        if (x == 'center' && y == 'center') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'left' && y === 'center') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleActive;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'left' && y === 'up') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleActive;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'center' && y === 'up') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleActive;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'right' && y === 'up') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleActive;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'right' && y === 'center') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleActive;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'right' && y === 'down') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleActive;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'center' && y === 'down') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleActive;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
        }
        if (x === 'left' && y === 'down') {
            eLeft.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$b.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$b.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$b.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$b.face.ui.circleActive;
        }
    } else {
        eLeft.style.backgroundImage = vu$b.face.ui.circleInactive;
        eLeftTop.style.backgroundImage = vu$b.face.ui.circleInactive;
        eTop.style.backgroundImage =  vu$b.face.ui.circleInactive;
        eRightTop.style.backgroundImage = vu$b.face.ui.circleInactive;
        eRight.style.backgroundImage = vu$b.face.ui.circleInactive;
        eRightBottom.style.backgroundImage = vu$b.face.ui.circleInactive;
        eBottom.style.backgroundImage = vu$b.face.ui.circleInactive;
        eLeftBottom.style.backgroundImage = vu$b.face.ui.circleInactive;
    }

    if (vu$b.face.ui.loop == true) {
        setTimeout(function () {
            if(vu$b.face.ui.loop == true)
            {
                doLoop();
            }            
        }, 25);
    }
}

//---------------------------------------------------
// FACE - Gestures
//---------------------------------------------------


vu$b.face.ui.pointSvg = function(color) { return "url('data:image/svg+xml;base64," +
    btoa( '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="'+color+'" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>') +"')"};


vu$b.face.ui.arrowSvg = function(color, rotation) { return "url('data:image/svg+xml;base64," +
    btoa( '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="rotate('+rotation+' 256 256)" ><path fill="'+color+'" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"></path></g></svg>') +"')"};



vu$b.face.ui.faceDotColor = '#1DC600';


vu$b.face.ui.faceDotObserver = new ResizeObserver(entries => {
    console.trace("ResizeObserver fired in vu.face.ui.faceDotObserver");
    let height = vu$b.face.ui.faceDot.clientHeight;
    let vidWidth = document.getElementById('vu.sop.ui.videoContainer').clientWidth;
    vu$b.face.ui.faceDot.style.width = height + "px";
    vu$b.face.ui.faceDot.style.left = (vidWidth - height)/2 + "px";
});

// Private function - not exposed to window scope
function showFaceDot() {
    vu$b.face.ui.faceDot = document.getElementById("vu.sop.ui.faceDot");
    vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.pointSvg(vu$b.face.ui.faceDotColor);

    // TODO Center whit CSS (ugly fix)
    vu$b.sop.ui.show("vu.sop.ui.faceDot");
    /* height = vu.face.ui.faceDot.clientHeight
    vidWidth = document.getElementById('vu.sop.ui.videoContainer').clientWidth
    vu.face.ui.faceDot.style.width = height + "px"
    vu.face.ui.faceDot.style.left = (vidWidth - height)/2 + "px"*/
    vu$b.face.ui.faceDotObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));
}

// Private function - not exposed to window scope
function hideFaceDot() {
	vu$b.sop.ui.hide("vu.sop.ui.faceDot");
}

// Private function - not exposed to window scope
function moveDot(x, y) {
    console.log("vu.face.ui.moveDot", x, y);
    if (x == 'center' && y == 'center') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.pointSvg(vu$b.face.ui.faceDotColor);
        //vu.face.ui.faceDot.style.transform = 'rotate(0deg)';
        vu$b.face.ui.faceDot.style.backgroundPosition = '50% 50%';
    }
    if (x === 'left' && y === 'center') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 270);
        vu$b.face.ui.faceDot.style.backgroundPosition = '15% 50%'; // OK
    }
    if (x === 'left' && y === 'up') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 315);
        vu$b.face.ui.faceDot.style.backgroundPosition = '25% 25%'; //
    }
    if (x === 'center' && y === 'up') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 0);
        vu$b.face.ui.faceDot.style.backgroundPosition = '50% 15%'; // OK
    }
    if (x === 'right' && y === 'up') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 45);
        vu$b.face.ui.faceDot.style.backgroundPosition = '75% 25%'; //
    }
    if (x === 'right' && y === 'center') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 90);
        vu$b.face.ui.faceDot.style.backgroundPosition = '85% 50%'; // OK
    }
    if (x === 'right' && y === 'down') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 135);
        vu$b.face.ui.faceDot.style.backgroundPosition = '75% 75%'; //
    }
    if (x === 'center' && y === 'down') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 180);
        vu$b.face.ui.faceDot.style.backgroundPosition = '50% 85%'; // OK
    }
    if (x === 'left' && y === 'down') {
        vu$b.face.ui.faceDot.style.backgroundImage = vu$b.face.ui.arrowSvg(vu$b.face.ui.faceDotColor, 225);
        vu$b.face.ui.faceDot.style.backgroundPosition = '25% 75%'; //
    }
}

// Private variable for number of challenges - not exposed directly
let uiNumOfChallenges = 3;

// Public setter function to configure number of challenges (security: only accepts first configuration until release)
vu$b.face.ui.setNumOfChallenges = function(num) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$b.face.auth && vu$b.face.auth.initialized) || 
        (vu$b.sop && vu$b.sop.initialized)) {
        console.warn("[Security] vu.face.ui.setNumOfChallenges: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(num) || num < 1 || num > 10) {
        console.error("[Security] vu.face.ui.setNumOfChallenges: Invalid number of challenges. Must be an integer between 1 and 10.");
        return false;
    }
    
    uiNumOfChallenges = num;
    console.log("[Security] vu.face.ui.setNumOfChallenges: Number of challenges configured successfully.");
    return true;
};

// Secure getter function for number of challenges
vu$b.face.ui.getNumOfChallenges = function() {
    return uiNumOfChallenges;
};

function genChallenge() {
    let x = ['left', 'center', 'right'];
    let y = ['up', 'center', 'down'];
    let xr = x[Math.floor(Math.random() * x.length)];
    let yr = y[Math.floor(Math.random() * y.length)];
    return [xr, yr]
}

// Removed vu.face.ui.numOfChallenges direct assignment for security - now uses private variable in modules

vu$b.face.ui.challenges = [];
vu$b.face.ui.challengeNum = 0;
vu$b.face.ui.challengeValidaXTimes = 4;
vu$b.face.ui.challengeLoopTime = 100;
vu$b.face.ui.challengeLoop = false;
vu$b.face.ui.pictures = [];

function genChallenges() {
    vu$b.face.ui.challenges = [];
    var i;
    let cha;
    
    do {
        cha = genChallenge();
    } while (cha[0] === "center" && cha[1] === "center");

    vu$b.face.ui.challenges.push(cha);
        
    for (i = 1; i < uiNumOfChallenges; i++) {
        cha = genChallenge();
        while (cha === vu$b.face.ui.challenges[i-1] || (cha[0] === "center" && cha[1] === "center")) {
            cha = genChallenge();
        }
        vu$b.face.ui.challenges.push(cha);
    }
    vu$b.face.ui.challenges.splice(-1,1);
    vu$b.face.ui.challenges.push(['center','center']);
    return vu$b.face.ui.challenges
}
vu$b.face.ui.challengeResolve = null;

vu$b.face.ui.challengeStart = function() {
    let promise = new Promise(function (resolve, reject) {
        genChallenges();
        vu$b.face.ui.challengeLoop = true;
        showFaceDot();
        vu$b.sop.audio.play('vu.sop.audio.facePoint');
        vu$b.sop.ui.showBottomText(vu$b.sop.msg.facePoint);
        moduleCamera$3.config.orientation = 'user';
        moduleCamera$3.config.previewResolution = 'lowest';
        moduleCamera$3.config.pictureResolution = 'lowest';
        moduleCamera$3.config.pictureLessBlurry = false;
        vu$b.face.ui.pictures = [];
        vu$b.face.ui.picturesTags = [];        
        challengeDoLoop();
        vu$b.face.ui.challengeResolve = resolve;
        vu$b.face.ui.challengeReject = reject;
    });
    return promise
};

vu$b.face.ui.challengeStop = function() {
    vu$b.sop.ui.hideBottomText();
    hideFaceDot();
    genChallenges();
    vu$b.face.ui.challengeLoop = false;
    vu$b.face.ui.challengeNum = 0;
};

vu$b.face.ui.challengeValidaXTimesCounter = 0;
vu$b.face.ui.lastChallengeNum = 9999;
// Private function - not exposed to window scope
async function challengeDoLoop() {
    // console.log("vu.face.ui.challengeDoLoop");
    let challenge = vu$b.face.ui.challenges[vu$b.face.ui.challengeNum];
    if ( vu$b.face.ui.lastChallengeNum !== vu$b.face.ui.challengeNum) {
        moveDot(challenge[0], challenge[1]);
        vu$b.face.ui.lastChallengeNum = vu$b.face.ui.challengeNum;
    }
    let data = vu$b.face.getData();

    // console.log("challenge", challenge);
    // console.log("data", data);

    if (!data || data.length === 0 || data[0] == undefined ) {
        console.log("Data is unresolved or empty, call challengeDoLoop");
        //vu.face.ui.challengeDoLoop();
        return; 
    }      

    let x = data[1][0];
    let y = data[1][1];
    if (data[0] == true) {
        if (challenge[0] === x && challenge[1] === y) {
            vu$b.face.ui.challengeValidaXTimesCounter  = vu$b.face.ui.challengeValidaXTimesCounter + 1;
            if (vu$b.face.ui.challengeValidaXTimesCounter === vu$b.face.ui.challengeValidaXTimes ) {

                try {
                    vu$b.face.ui.pictures.push(await moduleCamera$3.takePicture());
                    console.log("vu.face.ui.pictures", vu$b.face.ui.pictures);
                    vu$b.face.ui.challengeNum = vu$b.face.ui.challengeNum + 1;
                    vu$b.face.ui.challengeValidaXTimesCounter = 0;

                    if (vu$b.face.ui.useNewTags) {
                        let gesture = directionTags.find(c => c.x === challenge[0] && c.y === challenge[1]);
                        vu$b.face.ui.picturesTags.push(gesture.tag);
                    } else {
                        if (challenge[0] === 'center' && challenge[1] === 'center') {
                            vu$b.face.ui.picturesTags.push("SN");
                        }
                        else {
                            let random = gesturesType[(Math.random() * gesturesType.length) | 0];
                            gesturesType = gesturesType.filter(item => item !== random);
                            vu$b.face.ui.picturesTags.push(random);
                        }
                    }

                } catch (err) {
                    vu$b.face.auth.release();
                    console.warn("[vu.camera] takePicture failed:", err.message);
                    vu$b.face.ui.challengeLoop = false;
                    vu$b.face.ui.loop = false;
                    vu$b.sop.ui.hideBottomText();
                    if (typeof vu$b.face.ui.challengeReject === 'function') {
                        vu$b.face.ui.challengeReject(err);
                    } else {
                        console.warn('[vu.camera] No rejection callback set for challenge UI.');
                    }

                    return; // stop the loop immediately
                }
            }
            //console.log("face.ui.challenge", vu.face.ui.challengeNum, vu.face.ui.challengeValidaXTimesCounter )
        } else {
            vu$b.face.ui.challengeValidaXTimesCounter = 0;
        }

        if (vu$b.face.ui.challengeNum == uiNumOfChallenges) {
            //console.log('stop', vu.face.ui.challengeNum)
            vu$b.face.ui.challengeStop();
            vu$b.face.ui.stop();
            vu$b.face.ui.challengeResolve(vu$b.face.ui.pictures);
        }
    }
    if (vu$b.face.ui.challengeLoop == true) {
        setTimeout(function () {
            if(vu$b.face.ui.challengeLoop == true)
            {
                challengeDoLoop();
            }
            
        }, vu$b.face.ui.challengeLoopTime);
    }
}
//---------------------------------------------------
// FACE - Progress Bar
//---------------------------------------------------

vu$b.face.ui.progress = function(color) { return "url('data:image/svg+xml;base64," +
    btoa( '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-minimize" class="svg-inline--fa fa-window-minimize fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m 237.42373,52.372881 -80,407.999999 c -5.09898,26.00481 21.5,48 48,48 h 32 c 26.5,0 42.90102,-21.99519 48,-48 l 80,-407.999999 c 5.09898,-26.004814 -21.5,-47.9999996 -48,-47.9999996 h -32 c -26.5,0 -42.90102,21.9951856 -48,47.9999996 z"></path></svg>') +"')"};


var vuFaceUi = vu$b.face.ui;

// Reference the existing vu object
// const vu = vu || {};
// vu.sop = vu.sop || {};
// vu.camera = vu.camera || {};
// vu.face = vu.face || {};
// vu.face.ui = vuFaceUi;
// vu.face.auth = vuFaceAuth;
// vu.extras = vuExtras;


const vu$a = {
  sop: {},
  camera: {},
  face: {
    ui: vuFaceUi,
    auth: {}
  },
  extras: vuExtras
};

vu$a.camera.video;                        // Video Element
vu$a.camera.stream;                       // Video Stream
vu$a.camera.track;                        // Video track
vu$a.camera.devices = null;
vu$a.camera.videoinput = [];
/**
 * pictureFormat: 'jpg'         // png or jpg
 * pictureResolution: 'highest' // highest or preview
 * pictureLessBlurry: 3         // Int or False
 * responseType: 'dataUrl'      // dataUlr, base64 or canvas
 * jpegCompression: 0.85        // from 0.1 to 1.0
 * orientation: 'user'          // environment or user
 * contrast: 'low'              // highest high medium low lowest int or default
 * brightness: 'high'           // highest high medium low lowest int or default
 * sharpness: 'high'            // highest high medium low lowest int or default
 * saturation: 'medium'         // highest high medium low lowest int or default
 * iso: 'medium'                // highest high medium low lowest int or default
 * previewResolution: 'highest' // highest or lowest
 * resolutionConstraints:       // Resolutions to try.
 */
vu$a.camera.config = {
    pictureFormat: 'jpg',
    pictureResolution: 'highest',
    takePictureLessBlurry: false,
    pictureLessBlurryBurst: 1,
    pictureForceLandscape: false,
    pictureForceLandscapeRotateClockwise: false,
    pictureFlashEffect: false,
    pictureFlashDivId: "vu.sop.ui.flash",
    jpegCompression: 0.95,
    responseType: 'dataUrl',
    orientation: 'user',
    contrast: 'default',
    brightness: 'default',
    sharpness: 'default',
    saturation: 'default',
    iso: 'default',
    zoom: 'default',
    fakeZoom: 'default',
    previewResolution: 'lowest',
    minimumResolutionInHighestPreviewResolution: 700,
    minimumResolutionInLowestPreviewResolution: 340,
    resolutionConstraints: [
        //{video: {width: {exact: 4032}, height: {exact: 3200}}},
        //{video: {width: {exact: 3200}, height: {exact: 2400}}},
        //{video: {width: {exact: 2650}, height: {exact: 2048}}},
        //{video: {width: {exact: 2592}, height: {exact: 1944}}},
        //{video: {width: {exact: 2048}, height: {exact: 1536}}},
        /*{video: {width: {exact: 1920}, height: {exact: 1080}}},
        {video: {width: {exact: 1600}, height: {exact: 1200}}},
        {video: {width: {exact: 1280}, height: {exact: 720}}},
        {video: {width: {exact: 800}, height: {exact: 600}}},
        {video: {width: {exact: 640}, height: {exact: 480}}},
        {video: {width: {exact: 320}, height: {exact: 240}}}*/
        {video: {width: {ideal: 1920}, height: {ideal: 1080}}},
        {video: {width: {ideal: 1600}, height: {ideal: 1200}}},
        {video: {width: {ideal: 1280}, height: {ideal: 720}}},
        //{video: {width: {ideal: 800}, height: {ideal: 600}}},
        //{video: {width: {ideal: 640}, height: {ideal: 480}}},
        //{video: {width: {ideal: 640}, height: {ideal: 360}}}
        //{video: {width: {ideal: 640}, height: {ideal: 360}}},
        //{video: {width: {ideal: 320}, height: {ideal: 240}}}
    ]
};


/**
 * Webgl filters val and range
 */
vu$a.camera.cssValues = {
    brightness: {
        default: 100,
        val: 100,
        max: 200,
        min: 0
    },
    contrast: {
        default: 100,
        val: 100,
        max: 200,
        min: 0
    },
    saturation: {
        default: 100,
        val: 100,
        max: 200,
        min: 0
    },
    zoom: {
        default: 1,
        val: 1,
        max: 3,
        min: 1
    },
};

vu$a.camera.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu$a.camera.isVerticalVideo = function() {
    if ( vu$a.camera.video.videoWidth < vu$a.camera.video.videoHeight) {
        return true
    } else {
        return false
    }
};

vu$a.camera.hasFocusControl = function() {
    if ("focusDistance" in vu$a.camera.stream.getVideoTracks()[0].getCapabilities()) {
        // console.log("Focus Control")
        return true
    } else {
        // console.log("NO Focus Control")
        return false
    }
};

/**
 * Return a array of values (example, min = 1, max = 5, returns = [1,2,3,4,5])
 *
 * @param min min value of range
 * @param max max value of range
 * @returns {Array} array range
 */
vu$a.camera.getRange = function (min, max) {
    var range = [];
    for (var i = min; i <= max; i++) {
        range.push(i);
    }
    return range;
};

/**
 * Example range = [1,2,3,4,5], returns 4
 *
 * @param range
 * @returns {*}
 */
vu$a.camera.getHighValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.75) - 1];
};

/**
 * Example range = [1,2,3,4,5], returns 3
 *
 * @param range
 * @returns {*}
 */
vu$a.camera.getMediumValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.5) - 1];
};

/**
 * Example range = [1,2,3,4,5], returns 2
 *
 * @param range
 * @returns {*}
 */
vu$a.camera.getLowValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.25) - 1];
};

/**
 * Set the video Stream and set the max resolution available
 *
 * @returns {true or Error}
 *      Error('denied') No camera or camera access denied
 */
vu$a.camera.setMaxResolution = async function () {
    if (vu$a.camera.stream) {
        vu$a.camera.stream.getTracks().forEach(track => track.stop());
    }

    vu$a.camera.stream = null;
    vu$a.camera.videoinput = [];

    for (let i = 0; i < vu$a.camera.config.resolutionConstraints.length; i++) {
        let constraints = vu$a.camera.config.resolutionConstraints[i];

        constraints.video.resizeMode = { exact: 'none' };

        if (vu$a.camera.selectedDeviceId) {
            constraints.video.deviceId = { exact: vu$a.camera.selectedDeviceId };
        } else {
            if (vu$a.camera.config.orientation !== 'user') {
                vu$a.camera.devices = await navigator.mediaDevices.enumerateDevices();
                vu$a.camera.devices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        vu$a.camera.videoinput.push(mediaDevice);
                    }
                });

                if (vu$a.camera.videoinput.length <= 2 || vu$a.camera.devices.length <= 2) {
                    constraints.video.facingMode = vu$a.camera.config.orientation;
                } else {
                    for (let i = 0; i < vu$a.camera.videoinput.length; i++) {
                        if (vu$a.camera.videoinput[i].label.includes('0, facing back')) {
                            constraints.video.deviceId = { exact: vu$a.camera.videoinput[i].deviceId };
                            break;
                        }
                    }
                }
            } else {
                constraints.video.facingMode = vu$a.camera.config.orientation;
            }
        }

        try {
            vu$a.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);");
            vu$a.camera.config.maxResolutionConstrains = constraints;
            console.log(constraints);
            console.log("Camera Orientation max reso", vu$a.camera.config.orientation, i, " || Max Resolution", constraints);            
            

            const actualTrack = vu$a.camera.stream?.getVideoTracks?.()[0];
            const currentDeviceId = actualTrack?.getSettings?.().deviceId;
            const actualLabel = actualTrack?.label || '';

            console.log('[Camera] Initial stream label:', actualLabel);
            console.log("Device ID:", currentDeviceId);                        

            if (isSuspiciousCameraLabel(actualLabel)) {
                console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
                vu$a.camera.stream.getTracks().forEach(t => t.stop());
                vu$a.camera.stream = null;
                throw new Error('cameraSelectionError');
            }            

            vu$a.camera.selectedDeviceId = currentDeviceId;

            return true;
        } catch (error) {
            console.error(constraints, error);
            // If it's already our custom error, re-throw as-is
            if (error.message === 'cameraSelectionError') {
                throw error;
            }

            
        }
        finally
        {
            if (vu$a.camera.stream != null) break;
        }
    }

    if (vu$a.camera.stream == null) {
        console.log("No camera or camera access denied");
        throw new Error('denied');
    }
};


/**
 * Set the video Stream and set the max resolution available
 *
 * @returns {true or Error}
 *      Error('denied') No camera or camera access denied
 */
vu$a.camera.setMinResolution = async function () {
    if (vu$a.camera.stream) {
        vu$a.camera.stream.getTracks().forEach(track => track.stop());
    }

    vu$a.camera.stream = null;
    vu$a.camera.videoinput = [];

    const reversedConstraints = vu$a.camera.config.resolutionConstraints.slice().reverse();

    for (let i = 0; i < reversedConstraints.length; i++) {
        let constraints = reversedConstraints[i];

        constraints.video.resizeMode = { exact: 'none' };

        if (vu$a.camera.selectedDeviceId) {
            constraints.video.deviceId = { exact: vu$a.camera.selectedDeviceId };
        } else {
            if (vu$a.camera.config.orientation !== 'user') {
                vu$a.camera.devices = await navigator.mediaDevices.enumerateDevices();
                vu$a.camera.devices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        vu$a.camera.videoinput.push(mediaDevice);
                    }
                });

                if (vu$a.camera.videoinput.length <= 2 || vu$a.camera.devices.length <= 2) {
                    constraints.video.facingMode = vu$a.camera.config.orientation;
                } else {
                    for (let i = 0; i < vu$a.camera.videoinput.length; i++) {
                        if (vu$a.camera.videoinput[i].label.includes('0, facing back')) {
                            constraints.video.deviceId = { exact: vu$a.camera.videoinput[i].deviceId };
                            break;
                        }
                    }
                }
            } else {
                constraints.video.facingMode = vu$a.camera.config.orientation;
            }
        }

        try {
            vu$a.camera.config.minResolutionConstrains = constraints;
            vu$a.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(constraints);
            console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);");
            console.log("Camera Orientation min reso", vu$a.camera.config.orientation, " || Min Resolution", constraints);

            const actualTrack = vu$a.camera.stream?.getVideoTracks?.()[0];
            const currentDeviceId = actualTrack?.getSettings?.().deviceId;
            const actualLabel = actualTrack?.label || '';

            console.log('[Camera] Initial stream label:', actualLabel);
            console.log("Device ID:", currentDeviceId);                        

            if (isSuspiciousCameraLabel(actualLabel)) {
                console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
                vu$a.camera.stream.getTracks().forEach(t => t.stop());
                vu$a.camera.stream = null;
                throw new Error('cameraSelectionError');
            }            

            vu$a.camera.selectedDeviceId = currentDeviceId;            

            return true;
        } catch (error) {
            console.error(constraints, error);
            // If it's already our custom error, re-throw as-is
            if (error.message === 'cameraSelectionError') {
                throw error;
            }
        }
        finally
        {
            if (vu$a.camera.stream != null) break;
        }        
    }

    if (vu$a.camera.stream == null) {
        console.log("No camera or camera access denied");
        throw new Error('denied');
    }
};



/**
 * Start video stream
 *
 * @returns {true or Error}
 *      Error('autoplay') Video anti-autoplay stop video stream
 */
vu$a.camera.start = async function(videoId) {
    if (typeof videoId === "string") {
        vu$a.camera.video = document.getElementById(videoId);
    } else {
        vu$a.camera.video = videoId;
    }

    if (vu$a.camera.selectedDeviceId) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const selected = devices.find(d =>
            d.kind === 'videoinput' &&
            d.deviceId === vu$a.camera.selectedDeviceId &&
            !isSuspiciousCameraLabel(d.label)
        );

        if (selected) {
            // continue with binding below using selectedDeviceId
            console.log('[Camera] Using previously device:', selected.label);
        } else {
            // fallback to fresh anomaly check if invalid
            vu$a.camera.selectedDeviceId = null;
        }
    }

    if (!vu$a.camera.selectedDeviceId) {
        const flagged = await cameraAnomalyDevice();
        if (flagged) {
            //await initCameraPicker(videoId);
            throw Error('cameraSelectionError');
        }
    }

    try {
        await vu$a.camera.setMaxResolution(vu$a.camera.config.orientation);
        console.log("previewResolution", vu$a.camera.config.previewResolution);
        console.log("vu.camera.video", vu$a.camera.video);

        const actualTrack = vu$a.camera.stream?.getVideoTracks()[0];
        const actualLabel = actualTrack?.label || '';

        console.debug('[Camera] Initial stream label:', actualLabel);

        // If no selectedDeviceId and camera looks suspicious (first-time permission case)
        if (!vu$a.camera.selectedDeviceId && isSuspiciousCameraLabel(actualLabel)) {
            console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
            vu$a.camera.stream.getTracks().forEach(t => t.stop());
            vu$a.camera.stream = null;
            throw new Error('cameraSelectionError');
        }

        if (vu$a.camera.config.previewResolution == 'highest'){
            vu$a.camera.track = vu$a.camera.stream.getVideoTracks()[0];
        } else {
            await vu$a.camera.setMinResolution(vu$a.camera.config.orientation);
            vu$a.camera.track = vu$a.camera.stream.getVideoTracks()[0];
        }

        if (vu$a.camera.config.contrast !== 'default') {
            vu$a.camera.setContrast(vu$a.camera.config.contrast);
        }
        if (vu$a.camera.config.brightness !== 'default') {
            vu$a.camera.setBrightness(vu$a.camera.config.brightness);
        }
        if (vu$a.camera.config.sharpness !== 'default') {
            vu$a.camera.setSharpness(vu$a.camera.config.sharpness);
        }
        if (vu$a.camera.config.saturation !== 'default') {
            vu$a.camera.setSaturation(vu$a.camera.config.saturation);
        }

        if (vu$a.camera.config.iso !== 'default') {
            vu$a.camera.setIso(vu$a.camera.config.iso);
        }
        if (vu$a.camera.config.zoom !== 'default') {
            //vu.camera.setZoom(vu.camera.config.zoom);
        }

        vu$a.camera.video.srcObject = vu$a.camera.stream;

    } catch (error) {
        console.log(error);
        throw Error(error.message)
    }
    try {
        let focusModes = vu$a.camera.stream.getVideoTracks()[0].getCapabilities().focusMode;
        if (focusModes.includes("continuous")) {
            vu$a.camera.stream.getVideoTracks()[0].applyConstraints({advanced: [{focusMode: "continuous"}]});
        } else if (focusModes.includes("auto")) {
            vu$a.camera.stream.getVideoTracks()[0].applyConstraints({advanced: [{focusMode: "auto"}]});
        }
    } catch (e) {
        console.log('Camera: set focus mode not supported');
    }

    let playPromise = vu$a.camera.video.play();
    if (playPromise !== undefined) {
        try {
            await playPromise;
        } catch (e) {
            console.log('Video anti-autoplay stop video stream', e);
            throw new Error('autoplay');
        }

        if (vu$a.camera.config.previewResolution == 'highest'){
            vu$a.camera.config.minimumResolution = vu$a.camera.config.minimumResolutionInHighestPreviewResolution;
        } else {
            vu$a.camera.config.minimumResolution = vu$a.camera.config.minimumResolutionInLowestPreviewResolution;        }

        if (vu$a.camera.video.videoHeight < vu$a.camera.config.minimumResolution ||
            vu$a.camera.video.videoWidth < vu$a.camera.config.minimumResolution){
            console.log('Camera too low resolution', vu$a.camera.video.videoHeight, vu$a.camera.video.videoWidth);
            throw new Error('lowResolution');
        }
        return true
    } else {
        return true
    }
};


/**
 * Take a frame of video
 *
 * @returns {canvas, b64string, dataUrl or Error}
 *      Error('crossSiteBlock') browser or some adBlock extension blocks taking a picture
 *      canvas canvas element - https://developer.mozilla.org/es/docs/Glossary/Canvas
 *      b64 base64 string
 *      dataUrl - https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/Datos_URIs
 */
vu$a.camera.takePicture = async function() {
    if (vu$a.camera.config.pictureFlashEffect) {
        document.getElementById(vu$a.camera.config.pictureFlashDivId).style.display = "block";
    }

    // 🔒 Check for unexpected camera device change
    const actualTrack = vu$a.camera.stream?.getVideoTracks?.()[0];
    const currentDeviceId = actualTrack?.getSettings?.().deviceId;
    const actualLabel = actualTrack?.label || '';

    if (vu$a.camera.selectedDeviceId && currentDeviceId && currentDeviceId !== vu$a.camera.selectedDeviceId) {
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly',  vu$a.camera.selectedDeviceId);
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly', currentDeviceId);
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly');
        vu$a.camera.stream.getTracks().forEach(t => t.stop());
        vu$a.camera.stream = null;
        // no exponer error informativo
        throw new Error('undefined');        
    }

    if (isSuspiciousCameraLabel(actualLabel)) {
        console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
        vu$a.camera.stream.getTracks().forEach(t => t.stop());
        vu$a.camera.stream = null;
        // no exponer error informativo
        throw new Error('undefined');  
    }

    let resConstrain = false;
    // Si la camara no tiene el preview en maxima resolucion y se solicita la foto en maxima resolucion,
    // se cambia la camara a maxima resolucion antes de sacar la foto.
    if ( vu$a.camera.config.pictureResolution === 'highest' &&
         vu$a.camera.config.previewResolution !== 'highest') {

        resConstrain = vu$a.camera.config.previewResolution;
        vu$a.camera.config.previewResolution = 'highest';

        vu$a.camera.stream.getTracks().forEach(track => {
            track.stop();
        });
        vu$a.camera.stream = await navigator.mediaDevices.getUserMedia(vu$a.camera.config.maxResolutionConstrains);
        console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.maxResolutionConstrains);");
        vu$a.camera.video.srcObject = vu$a.camera.stream;
        await vu$a.camera.video.play();
    }

    // Se prepara el canvas y se pone en consola la informacion de la foto y la camara
    let burstCanvas = [];
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
    canvas.width = vu$a.camera.video.videoWidth;
    canvas.height = vu$a.camera.video.videoHeight;

    console.log("Camera resolution", canvas.width, canvas.height);
    console.log("Camera config", vu$a.camera.config);

    if (vu$a.camera.config.takePictureLessBlurry === false) {
        // Si es una sola foto, se toma y la misma y se deja en el canvas.
        canvasContext.drawImage(vu$a.camera.video, 0, 0, canvas.width, canvas.height);
    } else {
        // Crear Canvas
        for ( var i = 0; i < vu$a.camera.config.pictureLessBlurryBurst; i++) {
            let canvasTemp = document.createElement('canvas');
            canvasTemp.width = vu$a.camera.video.videoWidth;
            canvasTemp.height = vu$a.camera.video.videoHeight;
            burstCanvas.push(canvasTemp);
            //console.log("canvas", i)
        }
        // Sacar fotos
        for ( var i = 0; i < vu$a.camera.config.pictureLessBlurryBurst; i++) {
            burstCanvas[i].getContext('2d').drawImage(vu$a.camera.video,0, 0,
                burstCanvas[i].width, burstCanvas[i].height);
            //console.log("picture", i);
            //console.log(burstCanvas[i].toDataURL('image/jpeg', vu.camera.config.jpegCompression))
        }
    }

    // Se restaura la camara al modo que estaba si se cambio la resolucion para tomar la foto.
    if (resConstrain !== false) {
        vu$a.camera.config.previewResolution = resConstrain;
        vu$a.camera.stream.getTracks().forEach(track => {
            track.stop();
        });
        vu$a.camera.stream = await navigator.mediaDevices.getUserMedia(vu$a.camera.config.minResolutionConstrains);
        console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.minResolutionConstrains);");
        vu$a.camera.video.srcObject = vu$a.camera.stream;
        await vu$a.camera.video.play();
    }

    if (vu$a.camera.config.pictureFlashEffect) {
        document.getElementById(vu$a.camera.config.pictureFlashDivId).style.display = "none";
    }

    // Filtrar para obtener la foto menos borrosa
    if (vu$a.camera.config.takePictureLessBlurry !== false) {
        let blurValue = 1000;
        // Get Best Picture
        for (var i = 0; i < vu$a.camera.config.pictureLessBlurryBurst; i++) {
            let newBlurValue = measureBlur(burstCanvas[i].getContext('2d').getImageData(0, 0,
                burstCanvas[i].width, burstCanvas[i].height)).avg_edge_width_perc;
            //console.log("picture "+i+" blur value:", newBlurValue)

            if (newBlurValue < blurValue){
                blurValue = newBlurValue;
                canvasContext.drawImage(burstCanvas[i], 0, 0, burstCanvas[i].width, burstCanvas[i].height);
            }
        }
    }

    if (vu$a.camera.config.pictureForceLandscape) {
        // validar si es portrait o landscape
        if (canvas.width < canvas.height) {
            // Es portrait, rotar 90 clockwise

            let canvas2 = document.createElement('canvas');
            canvas2.width = canvas.height;
            canvas2.height = canvas.width;

            let ctx2 = canvas2.getContext('2d');


            if (vu$a.camera.config.pictureForceLandscapeRotateClockwise) {
                // 90 clockwise
                ctx2.setTransform(
                     0,1, // x axis down the screen
                    -1,0, // y axis across the screen from right to left
                    canvas.height, // x origin is on the right side of the canvas
                    0             // y origin is at the top
                );
            } else {
                // 90 counter clockwise
                ctx2.setTransform(
                    0, //Horizontal scaling
                    -1, // Horizontal skewing
                    1, // Vertical skewing
                    0, // Vertical scaling
                    0, // Horizontal moving
                    canvas.width // Vertical moving
                );
            }
            ctx2.drawImage(canvas,0,0);

            canvas.width = canvas2.width;
            canvas.height = canvas2.height;
            canvasContext.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height);
        }
    }

    /***********************************************************************/
    // FIX
    // En algunos celulares, con la camara en vertical, la foto se toma en horizontal, mas alla que se muestre en vertical

    // Validamos si el video es vertical
    if (vu$a.camera.isVerticalVideo()) {
        // Validamos si la pantalla esta en vertical
        if(window.innerHeight > window.innerWidth){
             // Validamos que la imagen NO es vertical
             if (canvas.height < canvas.width) {
                let canvas2 = document.createElement('canvas');
                canvas2.width = canvas.height;
                canvas2.height = canvas.width;
                let ctx2 = canvas2.getContext('2d');
                ctx2.setTransform(
                     0,1, // x axis down the screen
                    -1,0, // y axis across the screen from right to left
                    canvas.height, // x origin is on the right side of the canvas
                    0             // y origin is at the top
                );
                ctx2.drawImage(canvas,0,0);

                canvas.width = canvas2.width;
                canvas.height = canvas2.height;
                canvasContext.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height);

                console.log('takePicture: Picture is horizontal and video is vertical - Image rotated 90r');

             } else { console.log('takePicture: Picture is horizontal - No action taken'); }
        } else { console.log('takePicture: Screen not vertical - No action taken'); }
    } else { console.log('takePicture: Video is not vertical - No action taken'); }
    /***********************************************************************/
    // Conversion del canvas a B64, dataUrl o se entrega el canvas limpio
    let dataUrl;
    if (vu$a.camera.config.responseType === 'dataUrl' || vu$a.camera.config.responseType === 'base64') {
        if (vu$a.camera.config.pictureFormat === 'jpg' || vu$a.camera.config.pictureFormat === 'jpeg') {
            dataUrl = canvas.toDataURL('image/jpeg', vu$a.camera.config.jpegCompression);
        } else {
            dataUrl = canvas.toDataURL('image/png');
        }
        if (dataUrl.length < 6) {
            console.log('browser or some adBlock extension blocks taking a picture');
            throw new Error('crossSiteBlock')
        } else {
            if (vu$a.camera.config.responseType === 'base64') {
                return dataUrl.split(",")[1]
            } else {
                return dataUrl
            }
        }
    }
    if (vu$a.camera.config.responseType === 'canvas') {
        dataUrl = canvas.toDataURL('image/png');
        if (dataUrl.length < 6) {
            console.log('browser or some adBlock extension blocks taking a picture');
            throw new Error('crossSiteBlock')
        } else {
            return canvas;
        }
    }
};

// Recomposición del base 64
vu$a.camera.verifyBeforeForceResolution = function (idealResolution) {
    if(vu$a.camera.isVerticalVideo()){
        return vu$a.camera.video.videoHeight > idealResolution;
    }else   {
        return vu$a.camera.video.videoWidth > idealResolution;
    }
};

vu$a.camera.resizeDataURL = function(dataUrl, resizeBy = "width", size = 1280, jpgQuality = 0.95) {
    return new Promise((resolve, reject) => {


        var img = new Image();
        img.onload = function() {
            var newWidth, newHeight;
            if (resizeBy === 'width') {
                newWidth = size;
                newHeight = img.height * (size / img.width);
            } else if (resizeBy === 'height') {
                newHeight = size;
                newWidth = img.width * (size / img.height);
            } else {
                console.error('El parámetro "resizeBy" debe ser "width" o "height');
                reject(dataUrl);
            }

            var canvasResized = document.createElement('canvas');
            canvasResized.width = newWidth;
            canvasResized.height = newHeight;
            var ctx = canvasResized.getContext('2d');

            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            var resizedDataUrl = canvasResized.toDataURL('image/jpeg', jpgQuality);

            resolve(resizedDataUrl);
        };

        img.src = dataUrl;

        img.onerror = function() {
            console.error('No se pudo cargar la imagen.');
            reject(dataUrl);
        };
    });
};

/* Camera Capabilities ----------------------------------------------------------*/

/**
 * Get camera Capabilities
 *
 * @returns {object} https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities
 */
vu$a.camera.getCapabilities = function() {
    if (typeof vu$a.camera.track.getCapabilities != "undefined") {
        return vu$a.camera.track.getCapabilities()
    } else {
        return false
    }
};


/**
 * Set native camera Capabilities
 *
 * @param value 'highest' 'high' 'medium' 'low' 'lowest' or int
 * @param attr 'sharpness' 'brightness' 'saturation' 'contrast' 'iso' 'zoom'
 * @returns {string}
 */
vu$a.camera.setCapabilities = function(value, attr) {
    if (vu$a.camera.getCapabilities() !== false) {
        let capabilities = vu$a.camera.getCapabilities();
        if (typeof capabilities[attr] != "undefined") {
            let highest = capabilities[attr].max;
            let lowest = capabilities[attr].min;
            let range = vu$a.camera.getRange(lowest, highest);
            if (value === 'highest') {
                vu$a.camera.track.applyConstraints({advanced: [{[attr]: highest}]});
                return true;
            } else if (value === 'high') {
                vu$a.camera.track.applyConstraints({advanced: [{[attr]: vu$a.camera.getHighValueOfRange(range)}]});
                return true;
            } else if (value === 'medium') {
                vu$a.camera.track.applyConstraints({advanced: [{[attr]: vu$a.camera.getMediumValueOfRange(range)}]});
                return true;
            } else if (value === 'low') {
                vu$a.camera.track.applyConstraints({advanced: [{[attr]: vu$a.camera.getLowValueOfRange(range)}]});
                return true;
            } else if (value === 'lowest') {
                vu$a.camera.track.applyConstraints({advanced: [{[attr]: lowest}]});
                return true;
            } else if (typeof value == 'number') {
                vu$a.camera.track.applyConstraints({advanced: [{[attr]: value}]});
                return true;
            } else {
                return false;
            }
        } else {
            return vu$a.camera.setCSSCapabilities(value, attr)
        }
    } else {
        return vu$a.camera.setCSSCapabilities(value, attr);
    }
};

vu$a.camera.setCSSCapabilities = function(value, attr) {
    if ( attr == 'contrast' || attr == 'brightness' || attr == 'saturation' || attr == 'zoom') {
        let highest = vu$a.camera.cssValues[attr].max;
        let lowest = vu$a.camera.cssValues[attr].min;
        let range = vu$a.camera.getRange(lowest, highest);
        if (value === 'highest') {
            value = highest;
        } else if (value === 'high') {
            value = vu$a.camera.getHighValueOfRange(range);
        } else if (value === 'medium') {
            value = vu$a.camera.getMediumValueOfRange(range);
        } else if (value === 'low') {
            value = vu$a.camera.getLowValueOfRange(range);
        } else if (value === 'lowest') {
            value = lowest;
        }
        vu$a.camera.cssValues[attr].val = value;
        vu$a.camera.video.style.filter = "contrast("+vu$a.camera.cssValues['contrast'].val+"%)" +
            "brightness("+vu$a.camera.cssValues['brightness'].val+"%)" +
            "saturate("+vu$a.camera.cssValues['saturation'].val+"%)";

        let newHeight = Math.round(100 * vu$a.camera.cssValues['zoom'].val);
        let newWidth = Math.round(100 * vu$a.camera.cssValues['zoom'].val);

        vu$a.camera.video.style.width =  newWidth + "%" ;
        vu$a.camera.video.style.height =  newHeight + "%";
        let top = -Math.abs(Math.round((newHeight - 100) / 2)) ;
        let left =  -Math.abs(Math.round((newWidth - 100) / 2));
        vu$a.camera.video.style.top = top  + "%";
        vu$a.camera.video.style.left = left  + "%";

        // vu.camera.video.style.transform = "scale("+vu.camera.cssValues['zoom'].val+")";
        return 'css'

    }
    return false;
};

// highest high medium low lowest or integrer
/**
 * Set camera sharpness
 *
 * @param value highest high medium low lowest or integrer
 * @returns {boolean}
 */
vu$a.camera.setSharpness = function(value) {
    return vu$a.camera.setCapabilities(value, 'sharpness')
};

/**
 * Set camera brightness
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$a.camera.setBrightness = function(value) {
    let status = vu$a.camera.setCapabilities(value, 'brightness');
    return status;
};

/**
 * Set camera saturation
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$a.camera.setSaturation = function(value) {
    let status = vu$a.camera.setCapabilities(value, 'saturation');
    return status;
};

/**
 * Set camera contrast
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$a.camera.setContrast = function(value) {
    let status = vu$a.camera.setCapabilities(value, 'contrast');
    return status;
};

/**
 * Set camera iso
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false}
 */
vu$a.camera.setIso = function(value) {
    return vu$a.camera.setCapabilities(value, 'iso')
};

/**
 * Set camera zoom
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$a.camera.setZoom = function(value) {
    let status = vu$a.camera.setCapabilities(value, 'zoom');
    return status;
};

vu$a.camera.release = async function () {
    if (vu$a.camera.stream) {
        vu$a.camera.stream.getTracks().forEach(function (track) {
            track.stop();
        });

        vu$a.camera.stream = null;
    }

    // if(vu.camera.video)
    //     vu.camera.video = null;  
    
    const canvasElement = document.querySelector('canvas');
    if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        
        if(ctx)
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }   
};


var vuCamera = vu$a.camera;

/*
    TODO - Hay algo que bloquea el tread de UI, hay que encontrarlo y solucionarlo, se nota en celulares.

 */

// Reference the existing vu object
const vu$9 = window.vu || {};
vu$9.sop = vu$9.sop || {};
vu$9.sop.document = vu$9.sop.document || {};
vu$9.sop.document.objectDetection = vu$9.sop.document.objectDetection || {};

vu$9.sop.document.objectDetection.minConfidence = 0.75;
vu$9.sop.document.objectDetection.maxNumBoxes = 1;
vu$9.sop.document.objectDetection.modelURL = 'js/models/documents/model.json';
vu$9.sop.document.objectDetection.labels = ['document'];

//------------------------------------------------------

vu$9.sop.document.objectDetection.model;

vu$9.sop.document.objectDetection.calculateMaxScores = async function(scores,
                                                                numBoxes,
                                                                numClasses) {
    let maxes = [];
    let classes = [];
    for (let i = 0; i < numBoxes; i++) {
        let max = Number.MIN_VALUE;
        let index = -1;
        for (let j = 0; j < numClasses; j++) {
            if (scores[i * numClasses + j] > max) {
                max = scores[i * numClasses + j];
                index = j;
            }
        }
        maxes[i] = max;
        classes[i] = index;
    }
    return [maxes, classes];
};

vu$9.sop.document.objectDetection.buildDetectedObjects = async function(width,
                                                                  height,
                                                                  boxes,
                                                                  scores,
                                                                  indexes,
                                                                  classes,
                                                                  scale){
    const count = indexes.length;
    let results = [];
    for (let i = 0; i < count; i++) {
        const bbox = [];
        for (let j = 0; j < 4; j++) {
            bbox[j] = boxes[indexes[i] * 4 + j];
        }
        const minY = bbox[0] * height;
        const minX = bbox[1] * width;
        const maxY = bbox[2] * height;
        const maxX = bbox[3] * width;
        bbox[0] = Math.round(minX*scale);
        bbox[1] = Math.round(minY*scale);
        bbox[2] = Math.round((maxX - minX)*scale);
        bbox[3] = Math.round((maxY - minY)*scale);
        //console.log(classes[indexes])
        //console.log(scores[indexes], scale)
        results.push([vu$9.sop.document.objectDetection.labels[classes[indexes]], bbox, scores[indexes]]);
    }
    return results
};


vu$9.sop.document.objectDetection.loadModel = async function(tfPath) {
    tf.wasm.setWasmPaths({
        'tfjs-backend-wasm.wasm': tfPath + 'tfjs-backend-wasm.wasm',
        'tfjs-backend-wasm-simd.wasm':  tfPath + 'tfjs-backend-wasm-simd.wasm',
        'tfjs-backend-wasm-threaded-simd.wasm':  tfPath + 'tfjs-backend-wasm-threaded-simd.wasm'
    });

    tf.ENV.set('DEBUG', false);
    tf.enableProdMode();

    //await tf.setBackend('cpu');
    await tf.setBackend('wasm');
    await tf.ready();

    //tf.enableDebugMode()
    //console.log(tf.ENV)
    if (!vu$9.sop.document.objectDetection.model) {
        console.log("Loading Model");
        vu$9.sop.document.objectDetection.model = tf.GraphModel;
        vu$9.sop.document.objectDetection.model = await tf.loadGraphModel(vu$9.sop.document.objectDetection.modelURL);
        console.log("Finished");
        return vu$9.sop.document.objectDetection.model
    } else {
        return vu$9.sop.document.objectDetection.model
    }
};

vu$9.sop.document.objectDetection.predictCanvas = document.createElement('canvas');
vu$9.sop.document.objectDetection.predictCanvasContext = vu$9.sop.document.objectDetection.predictCanvas.getContext('2d');


vu$9.sop.document.objectDetection.predictAsync = async function(video){
    //var start = new Date();
    let img;
    let scale;
    let newHeight;
    let newWidth;

    let tensor = tf.tidy(() => {
        img = tf.browser.fromPixels(video);
        scale = img.shape[1] / 640;
        newHeight = Math.round(img.shape[0]/scale);
        newWidth = Math.round(img.shape[1]/scale);

        img = tf.image.resizeBilinear(img, [newHeight, newWidth]);
        img = tf.cast(img, 'int32');
        return [img.expandDims(0), scale];
    });
    //console.log('Get Img Tensor - Time', new Date().getTime() - start.getTime(), 'ms')

    scale = tensor[1];
    tensor = tensor[0];

    let height = tensor.shape[1];
    let width = tensor.shape[2];

    //var start = new Date();
    let inference = await vu$9.sop.document.objectDetection.model.executeAsync(tensor);
    //console.log('executeAsync - Time', new Date().getTime() - start.getTime(), 'ms - shape ', tensor.shape)

    let prevBackend = tf.getBackend();
    tf.setBackend('cpu');
    let scores = await inference[0].data();
    let boxes = await inference[1].data();

    let [maxScores, classes] = await vu$9.sop.document.objectDetection.calculateMaxScores(scores, inference[0].shape[1], inference[0].shape[2]);
    //------------------------------------------------------------------
    let boxes2 = tf.tensor2d(boxes, [inference[1].shape[1], inference[1].shape[3]]);
    let indexTensor = await tf.image.nonMaxSuppressionAsync(boxes2, maxScores, vu$9.sop.document.objectDetection.maxNumBoxes, 0.5, vu$9.sop.document.objectDetection.minConfidence);

    let indexes = await indexTensor.data();
    let result = await vu$9.sop.document.objectDetection.buildDetectedObjects(width, height, boxes, maxScores, indexes, classes, scale);
    tf.setBackend(prevBackend);

    //console.log('result',result)
    //console.log(performance.now(), tf.memory());

    tensor.dispose();
    tf.dispose(boxes2);
    indexTensor.dispose();
    tf.dispose(indexes);
    tf.dispose(inference);

    //console.log('executeAsync - Time', new Date().getTime() - start.getTime(), 'ms - shape ', tensor.shape)
    return result
};

var vuSopDocumentObjectDetection = vu$9.sop.document.objectDetection;

// Reference the existing vu object
const vu$8 = window.vu || {};
vu$8.image = vu$8.image || {};

// ------------------------------------------------------------------------------------------------------------ //

vu$8.image.lab2rgb = function(lab){
  var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.204 + z *  1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

  return [Math.max(0, Math.min(1, r)) * 255,
          Math.max(0, Math.min(1, g)) * 255,
          Math.max(0, Math.min(1, b)) * 255]
};


vu$8.image.rgb2lab = function(rgb){
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
};

vu$8.image.getDataUrlFromArr = function (arr, w, h) {
  if(typeof w === 'undefined' || typeof h === 'undefined') {
    w = h = Math.sqrt(arr.length / 4);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = h;

  const imgData = ctx.createImageData(w, h);
  imgData.data.set(arr);
  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL();
};

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu$8.image.brigthSpotDetector == "undefined") { vu$8.image.brigthSpotDetector = function() {}; }

vu$8.image.brigthSpotDetector.borderDecimal = 0.15;
vu$8.image.brigthSpotDetector.minResult = 98;


vu$8.image.brigthSpotDetector.canvas = document.createElement("canvas");
vu$8.image.brigthSpotDetector.canvasContext = vu$8.image.brigthSpotDetector.canvas.getContext("2d", { willReadFrequently: true });
vu$8.image.brigthSpotDetector.canvasResize = document.createElement("canvas");
vu$8.image.brigthSpotDetector.canvasResizeContext = vu$8.image.brigthSpotDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu$8.image.brigthSpotDetector.hasABrightSpot = function(img) {
    let resize = 10;
    let scale;
    let height;
    let width;

    if (img.width > img.height) {
        scale = img.width / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    } else {
        scale = img.height / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    }

    vu$8.image.brigthSpotDetector.canvas.width = width;
    vu$8.image.brigthSpotDetector.canvas.height = height;
    vu$8.image.brigthSpotDetector.canvasContext.drawImage(img,0,0, width, height);
    let imageData = vu$8.image.brigthSpotDetector.canvasContext.getImageData(0, 0, width, height);
    let data = imageData.data;
    var r,g,b;
    var brightSportCount = 0;
    let lab;
    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        lab = vu$8.image.rgb2lab([r,g,b]);
        Math.floor(lab[0]);
        //console.log(lab[0])
        if ( lab[0] > vu$8.image.brigthSpotDetector.minResult )
        {
            brightSportCount = brightSportCount + 1;
        }
    }
    let maxBrightSpots = (width * height) * 0.07;
    if (maxBrightSpots < brightSportCount) {
        return [true, brightSportCount];
    } else {
        return [false, brightSportCount];
    }
};

vu$8.image.brigthSpotDetector.hasABrightSpotAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.brigthSpotDetector.hasABrightSpot(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

vu$8.image.brigthSpotDetector.thisAreaHasABrightSpot = function(img, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    let borderHorizontal = Math.round(box[2] * vu$8.image.brigthSpotDetector.borderDecimal);
    let borderVertical =  Math.round(box[3] * vu$8.image.brigthSpotDetector.borderDecimal);

    vu$8.image.brigthSpotDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu$8.image.brigthSpotDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu$8.image.brigthSpotDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu$8.image.brigthSpotDetector.hasABrightSpot(vu$8.image.brigthSpotDetector.canvasResize);
};

vu$8.image.brigthSpotDetector.thisAreaHasABrightSpotAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.brigthSpotDetector.thisAreaHasABrightSpot(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu$8.image.brightnessDetector == "undefined") { vu$8.image.brightnessDetector = function() {}; }

vu$8.image.brightnessDetector.minResult = 30;
vu$8.image.brightnessDetector.borderDecimal = 0.15;

vu$8.image.brightnessDetector.canvas = document.createElement("canvas");
vu$8.image.brightnessDetector.canvasContext = vu$8.image.brightnessDetector.canvas.getContext("2d", { willReadFrequently: true });
vu$8.image.brightnessDetector.canvasResize = document.createElement("canvas");
vu$8.image.brightnessDetector.canvasResizeContext = vu$8.image.brightnessDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu$8.image.brightnessDetector.isBright = function(img) {
    vu$8.image.brightnessDetector.canvas.width = 10;
    vu$8.image.brightnessDetector.canvas.height = 10;
    vu$8.image.brightnessDetector.canvasContext.drawImage(img,0,0, 10, 10);

    let imageData = vu$8.image.brightnessDetector.canvasContext.getImageData(0,0,10,10);
    let data = imageData.data;
    var r,g,b,avg;
    var colorSum = 0;
    let lab;
    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        lab = vu$8.image.rgb2lab([r,g,b]);
        //avg = Math.floor((r+g+b)/3);
        avg = Math.floor(lab[0]);
        colorSum += avg;
    }

    let result = Math.floor(colorSum / (10*10));
    //console.log('isBright score', result, '- time:', new Date().getTime() - startTime.getTime())
    if (vu$8.image.brightnessDetector.minResult > result) {
        return [false, result];
    } else {
        return [true, result];
    }
};

vu$8.image.brightnessDetector.isBrightAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.brightnessDetector.isBright(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

vu$8.image.brightnessDetector.thisAreaIsBright = function(img, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    let borderHorizontal = Math.round(box[2] * vu$8.image.brightnessDetector.borderDecimal);
    let borderVertical =  Math.round(box[3] * vu$8.image.brightnessDetector.borderDecimal);

    vu$8.image.brightnessDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu$8.image.brightnessDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu$8.image.brightnessDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu$8.image.brightnessDetector.isBright(vu$8.image.brightnessDetector.canvasResize);
};

vu$8.image.brightnessDetector.thisAreaIsBrightAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.brightnessDetector.thisAreaIsBright(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu$8.image.blurDetector == "undefined") { vu$8.image.blurDetector = function() {}; }

vu$8.image.blurDetector.minResult = 0.65;  // More is more blur
vu$8.image.blurDetector.borderDecimal = 0.15;
vu$8.image.blurDetector.resize = 128;

vu$8.image.blurDetector.canvas = document.createElement("canvas");
vu$8.image.blurDetector.canvasContext = vu$8.image.blurDetector.canvas.getContext("2d", { willReadFrequently: true });
vu$8.image.blurDetector.canvasResize = document.createElement("canvas");
vu$8.image.blurDetector.canvasResizeContext = vu$8.image.blurDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu$8.image.blurDetector.isBlurry = function(img) {
    let resize = vu$8.image.blurDetector.resize;
    let scale;
    let height;
    let width;

    if (img.width > img.height) {
        scale = img.width / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    } else {
        scale = img.height / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    }

    vu$8.image.blurDetector.canvas.width = width;
    vu$8.image.blurDetector.canvas.height = height;
    vu$8.image.blurDetector.canvasContext.drawImage(img, 0,0,width,height);

    let blurValue = measureBlur(vu$8.image.blurDetector.canvas.getContext('2d').getImageData(0, 0, width, height)).avg_edge_width_perc;
    //console.log('isBlurry score', blurValue, '- time:', new Date().getTime() - startTime.getTime())
    if (vu$8.image.blurDetector.minResult > blurValue) {
        return [false, blurValue]
    } else {
        return [true, blurValue]
    }
};

vu$8.image.blurDetector.isBlurryAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.blurDetector.isBlurry(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

vu$8.image.blurDetector.thisAreaIsBlurry = function(img, box) {
    let borderHorizontal = Math.round(box[2] * vu$8.image.blurDetector.borderDecimal);
    let borderVertical =  Math.round(box[3] * vu$8.image.blurDetector.borderDecimal);

    vu$8.image.blurDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu$8.image.blurDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu$8.image.blurDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu$8.image.blurDetector.isBlurry(vu$8.image.blurDetector.canvasResize);
};

vu$8.image.blurDetector.thisAreaIsBlurryAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.blurDetector.thisAreaIsBlurry(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ------------------------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------------------------ //
// https://github.com/timhuff/canvas-phash/blob/master/index.js

if (typeof vu$8.image.phash == "undefined") { vu$8.image.phash = function() {}; }

vu$8.image.phash.canvas = document.createElement("canvas");
vu$8.image.phash.canvasContext = vu$8.image.phash.canvas.getContext("2d", { willReadFrequently: true });
//document.getElementById('debug').appendChild(vu.image.phash.canvas);

vu$8.image.phash.getHammingDistance = function (buffer1, buffer2) {
    let hammingDistance = 0;
    for (let n = 0; n < 128; n++) {
        const x = buffer1.readUInt8(n);
        const y = buffer2.readUInt8(n);
        hammingDistance += vu$8.image.phash.bitCount(x ^ y);
    }
    return hammingDistance;
};

vu$8.image.phash.bitCount = function (n) {
    let count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
};


// Función auxiliar para convertir un hash binario a hexadecimal
vu$8.image.phash.binaryToHex =  function(binary) {
    let hex = '';
    for (let i = 0; i < binary.length; i += 4) {
        const chunk = binary.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
};

// Función auxiliar para convertir un hash hexadecimal a binario
vu$8.image.phash.hexToBinary = function(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        // Convertir cada carácter hexadecimal a 4 bits binarios
        const chunk = parseInt(hex[i], 16).toString(2).padStart(4, '0');
        binary += chunk;
    }
    return binary;
};

vu$8.image.phash.calculate = function(canvas) {
    vu$8.image.phash.canvasContext;

    // Paso 1: Reducir la imagen a 8x8 píxeles
    const size = 16;
    const resizedCanvas = vu$8.image.phash.canvas;
    resizedCanvas.width = size;
    resizedCanvas.height = size;
    const resizedCtx = resizedCanvas.getContext('2d');
    resizedCtx.drawImage(canvas, 0, 0, size, size);

    // Paso 2: Convertir la imagen a escala de grises
    const imageData = resizedCtx.getImageData(0, 0, size, size);
    const grayscalePixels = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        // Fórmula para convertir a escala de grises (luminosidad)
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        grayscalePixels.push(gray);
    }

    // Paso 3: Calcular el valor promedio de los píxeles
    const average = grayscalePixels.reduce((sum, val) => sum + val, 0) / grayscalePixels.length;

    // Paso 4: Generar el hash binario
    let hash = '';
    for (let i = 0; i < grayscalePixels.length; i++) {
        hash += grayscalePixels[i] > average ? '1' : '0';
    }

    // Paso 5: Convertir el hash binario a hexadecimal (opcional)
    const hexHash = vu$8.image.phash.binaryToHex(hash);

    return hexHash;
};

vu$8.image.phash.calculateAsync = function(canvas) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.phash.calculate(canvas) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// --------------------------------------------
// Area
vu$8.image.phash.canvasResize = document.createElement("canvas");
vu$8.image.phash.canvasResizeContext = vu$8.image.phash.canvasResize.getContext("2d", { willReadFrequently: true });

vu$8.image.phash.calculateThisArea = function(canvas, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    vu$8.image.phash.canvasResize.width = box[2];
    vu$8.image.phash.canvasResize.height = box[3];
    vu$8.image.phash.canvasResizeContext.drawImage(canvas, -(box[0]), -(box[1]));
    return vu$8.image.phash.calculate(vu$8.image.phash.canvasResize);
};

vu$8.image.phash.calculateThisAreaAsync = function(canvas, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.phash.calculateThisArea(canvas, box))
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// --------------------------------------------
// Center

vu$8.image.phash.canvasPreprocess = document.createElement("canvas");
vu$8.image.phash.canvasPreprocessContext = vu$8.image.phash.canvasPreprocess.getContext("2d", { willReadFrequently: true });
//document.getElementById('debug').appendChild(vu.image.phash.canvasPreprocess);

/*
Una funcion en javascript que resiba como input un canvas y un float de 0 a 1 llamado borde.
La funcion transforma una imagen rectangular en un cuadrado centrado, luego del cuadrado recorta un margen porcentual basado en el float de borde.
retorna un canvas que contiene la imagen recortada. la funcion en ingles.
*/
vu$8.image.phash.preprocessCenter = function (canvas, border = 0.1) {
  // Get canvas dimensions
  let width = 0;
  let height = 0;
  if ( canvas instanceof HTMLVideoElement ) {
    width = canvas.videoWidth;
    height = canvas.videoHeight;
  } else if ( canvas instanceof HTMLCanvasElement) {
      width = canvas.videoWidth;
      height = canvas.videoHeight;
  }
  if (width <= 0 || height <= 0) {
    throw new Error("Invalid video/canvas dimensions");
  }

  // Determine the size of the square (minimum of width and height)
  const squareSize = Math.min(width, height);

  // Calculate the starting coordinates to center the square
  const startX = Math.floor((width - squareSize) / 2);
  const startY = Math.floor((height - squareSize) / 2);

  // Calculate the border offset based on the border percentage
  const borderOffset = Math.floor(squareSize * border);

  // Calculate the final size after applying the border
  const finalSize = squareSize - (2 * borderOffset);

  // Create a new canvas for the result
  vu$8.image.phash.canvasPreprocess.width = finalSize;
  vu$8.image.phash.canvasPreprocess.height = finalSize;

  // Draw the centered and cropped image onto the result canvas
  vu$8.image.phash.canvasPreprocessContext.drawImage(
    canvas,
    startX + borderOffset,  // Source X (start from center square + border)
    startY + borderOffset,  // Source Y (start from center square + border)
    finalSize,              // Source width (square size minus borders)
    finalSize,              // Source height (square size minus borders)
    0,                      // Destination X
    0,                      // Destination Y
    finalSize,              // Destination width
    finalSize               // Destination height
  );

  return vu$8.image.phash.canvasPreprocess;
};

vu$8.image.phash.preprocessCenterObfuscated = function (canvas, border = [0.1, 0.1]) {
  // Get canvas dimensions
  let width = 0;
  let height = 0;
  if ( canvas instanceof HTMLVideoElement ) {
    width = canvas.videoWidth;
    height = canvas.videoHeight;
  } else if ( canvas instanceof HTMLCanvasElement) {
      width = canvas.videoWidth;
      height = canvas.videoHeight;
  }
  if (width <= 0 || height <= 0) {
    throw new Error("Invalid video/canvas dimensions");
  }

  vu$8.image.phash.canvasPreprocess.width = width;
  vu$8.image.phash.canvasPreprocess.height = height;
  vu$8.image.phash.canvasPreprocessContext.drawImage(canvas, 0, 0, width, height);  // Source dimensions

  //------------------
  // Create a temporary canvas with the original image and black rectangle
  // Calculate rectangle dimensions based on size
  const rectWidth = Math.floor(width * border[0]);
  const rectHeight = Math.floor(height * border[1]);

  // Calculate position to center the rectangle
  const x = Math.floor((width - rectWidth) / 2);
  const y = Math.floor((height - rectHeight) / 2);
  //------------------

  // Draw the black rectangle in the center
  vu$8.image.phash.canvasPreprocessContext.fillStyle = 'black';
  vu$8.image.phash.canvasPreprocessContext.fillRect(x, y, rectWidth, rectHeight);

  return vu$8.image.phash.canvasPreprocess;
};

vu$8.image.phash.calculatePreprocessed = function(canvas, preprocessed, border) {
    if (preprocessed === 'center') {
        vu$8.image.phash.preprocessCenter(canvas, border);
    } else if (preprocessed === 'centerObfuscated') {
        vu$8.image.phash.preprocessCenterObfuscated(canvas, border);
    }
    return vu$8.image.phash.calculate(vu$8.image.phash.canvasPreprocess);
};

vu$8.image.phash.calculatePreprocessedAsync = function(canvas, preprocess = 'center', border = 0.1) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$8.image.phash.calculatePreprocessed(canvas, preprocess, border))
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ----------------------------------------------------------------------------------------------------------------- //
vu$8.image.phash.compare = function (hash1, hash2) {
    // Convertir los hashes hexadecimales a binario
    const binary1 = vu$8.image.phash.hexToBinary(hash1);
    const binary2 = vu$8.image.phash.hexToBinary(hash2);

    // Calcular la distancia de Hamming
    let distance = 0;
    for (let i = 0; i < binary1.length; i++) {
        if (binary1[i] !== binary2[i]) {
            distance++;
        }
    }

    // Devolver la distancia de Hamming
    return distance;
};


vu$8.image.phash.detectOutliersInSelfies = async function (configuredLevel, selfieList) {
    const level = (configuredLevel || 'medium').toLowerCase();
    console.log("[pHash] Configured Level:", level);
    console.log("[pHash] Selfie List Length:", selfieList.length);

    const thresholds = {
        low: 35,     // more tolerant
        medium: 30,  // balanced
        high: 24     // strict
    };

    const threshold = thresholds[level] ?? thresholds.medium;
    console.log("[pHash] Using threshold:", threshold);

    const hashes = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const images = await Promise.all(selfieList.map((base64, index) => {
        return new Promise((resolve, reject) => {
            if (!base64 || typeof base64 !== 'string') {
                console.error(`[pHash] Invalid base64 at index ${index}`);
                return reject(new Error(`Invalid base64 at index ${index}`));
            }
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                console.log(`[pHash] Image ${index} loaded: ${img.width}x${img.height}`);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`[pHash] Failed to load image at index ${index}`);
                reject(new Error(`Failed to load image at index ${index}`));
            };
        });
    }));

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const hash = vu$8.image.phash.calculate(canvas);
        hashes.push(hash);
        console.log(`[pHash] Hash ${i}:`, hash);
    }

    for (let i = 0; i < hashes.length; i++) {
        for (let j = i + 1; j < hashes.length; j++) {
            const distance = vu$8.image.phash.compare(hashes[i], hashes[j]);
            console.log(`[pHash] Distance between frame ${i} and ${j}:`, distance);

            if (distance >= threshold) {
                console.warn(`[pHash] Outlier detected: frame ${i} vs ${j} → distance = ${distance} (threshold = ${threshold})`);
                return false;
            }
        }
    }

    console.log("[pHash] All frames passed consistency check.");
    return true;
};


// ------------------------------------------------------------------------------------------------------------ //
// Detectar inversion de canales
vu$8.image.channelInversion = vu$8.image.channelInversion || {};

/**
 * Crops a uniform margin around an image canvas
 * @param {HTMLCanvasElement} canvas - Canvas containing the image
 * @param {number} marginPercentage - Percentage of the image size to crop as margin
 * @returns {ImageData} The cropped image data
 */
vu$8.image.channelInversion.cropMargin = function (canvas, marginPercentage) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Calculate margin size in pixels
    const marginX = Math.floor(width * (marginPercentage / 100));
    const marginY = Math.floor(height * (marginPercentage / 100));

    // Calculate coordinates for cropping
    const x1 = marginX;
    const y1 = marginY;
    const x2 = width - marginX;
    const y2 = height - marginY;

    // Get the cropped image data
    const croppedWidth = x2 - x1;
    const croppedHeight = y2 - y1;

    if (croppedWidth <= 0 || croppedHeight <= 0) {
        throw new Error('Margin too large, resulting in empty crop area');
    }

    return ctx.getImageData(x1, y1, croppedWidth, croppedHeight);
};

/**
 * Calculate if the image has a bad color space (RGB vs BGR)
 * @param {string} base64Image - Base64 encoded image string
 * @param {Object} options - Configuration options
 * @param {boolean} options.debug - Enable debug logging
 * @param {number} options.margin - Margin percentage to crop
 * @param {number} options.minConfidence - Minimum confidence threshold
 * @param {number} options.minDistance - Minimum distance between R and B channels
 * @returns {Promise<{isBad: boolean, confidence: number}>} Result object
 */
vu$8.image.channelInversion.detect = async function (base64Image, options = {}) {
    const {
        debug = false,
        margin = 45,
        minConfidence = 5,
        minDistance = 16
    } = options;

    return new Promise((resolve, reject) => {
        // Create an image element
        const img = new Image();

        img.onload = function() {
            try {
                // Create canvas and draw the image
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Crop the image with margin
                const croppedImageData = vu$8.image.channelInversion.cropMargin(canvas, margin);
                const data = croppedImageData.data;

                // Calculate channel means (RGBA format)
                let rSum = 0, gSum = 0, bSum = 0;
                const pixelCount = croppedImageData.width * croppedImageData.height;

                for (let i = 0; i < data.length; i += 4) {
                    rSum += data[i];     // Red
                    gSum += data[i + 1]; // Green
                    bSum += data[i + 2]; // Blue
                    // Skip alpha channel (data[i + 3])
                }

                const rMean = rSum / pixelCount;
                const gMean = gSum / pixelCount;
                const bMean = bSum / pixelCount;

                // Calculate confidence - avoid division by zero
                const distance = Math.abs(rMean - bMean);
                const avgIntensity = (rMean + bMean + gMean) / 3;
                const confidence = (distance * 100) / Math.max(avgIntensity, 1e-6);

                if (debug) {
                    console.log(`Channel means - R: ${rMean.toFixed(2)}, G: ${gMean.toFixed(2)}, B: ${bMean.toFixed(2)}`);
                    console.log(`Distance: ${distance.toFixed(2)}, Confidence: ${confidence.toFixed(2)}`);
                }

                // Refined logic
                let isBad;
                if (distance < minDistance) {
                    // Channels too similar to determine
                    isBad = false;
                } else if (rMean > bMean) {
                    // Normal RGB - red typically > blue in natural images
                    isBad = false;
                } else {
                    // Blue > Red suggests color swap
                    isBad = confidence > minConfidence;
                }

                resolve({
                    isBad: isBad,
                    confidence: confidence
                });

            } catch (error) {
                reject(error);
            }
        };

        img.onerror = function() {
            reject(new Error('Failed to load image from base64 data'));
        };

        // Handle base64 with or without data URL prefix
        if (base64Image.startsWith('data:image/')) {
            img.src = base64Image;
        } else {
            img.src = `data:image/jpeg;base64,${base64Image}`;
        }
    });
};

/**
 * Converts BGR color channels to RGB by swapping Red and Blue channels
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} outputFormat - Output format: 'base64', 'canvas', or 'blob'
 * @returns {Promise<string|HTMLCanvasElement|Blob>} Converted image in specified format
 */
vu$8.image.channelInversion.bgrToRgb = async function (base64Image, outputFormat = 'base64') {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function() {
            try {
                // Create canvas and draw the image
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Get image data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Swap R and B channels (RGBA format: R, G, B, A)
                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i];     // Store original red value
                    data[i] = data[i + 2];   // Red = Blue
                    data[i + 2] = red;       // Blue = original Red
                    // Green (i + 1) and Alpha (i + 3) remain unchanged
                }

                // Put the modified data back to canvas
                ctx.putImageData(imageData, 0, 0);

                // Return in requested format
                switch (outputFormat.toLowerCase()) {
                    case 'canvas':
                        resolve(canvas);
                        break;

                    case 'blob':
                        canvas.toBlob(resolve, 'image/png');
                        break;

                    case 'base64':
                    default:
                        const base64Result = canvas.toDataURL('image/png');
                        resolve(base64Result);
                        break;
                }

            } catch (error) {
                reject(error);
            }
        };

        img.onerror = function() {
            reject(new Error('Failed to load image from base64 data'));
        };

        // Handle base64 with or without data URL prefix
        if (base64Image.startsWith('data:image/')) {
            img.src = base64Image;
        } else {
            img.src = `data:image/jpeg;base64,${base64Image}`;
        }
    });
};


/*
async function example() {
    try {
        const base64Image = "your_base64_image_string_here";

        const result = await vu.image.channelInversion.detect(base64Image, {
            debug: true,
            margin: 45,
            minConfidence: 5,
            minDistance: 16
        });

        console.log('Is bad color space:', result.isBad);
        console.log('Confidence:', result.confidence);
        if (result.isBad) {
            base64Image = vu.image.channelInversion.bgrToRgb(base64Image, 'base64')
            console.log('Converted image:', base64Image);
        }
    } catch (error) {
        console.error('Error analyzing image:', error);
    }
}
*/

// ------------------------------------------------------------------------------------------------------------ //
var vuImage = vu$8.image;

//import vuCamera from 'vu.camera'; //

// Reference the existing vu object
const vu$7 = window.vu || {};
vu$7.sop = vu$7.sop || {};
vu$7.sop.ui = vuSopUi;

vu$7.sop.document = vu$7.sop.document || {};
vu$7.sop.document.objectDetection = vuSopDocumentObjectDetection;
vu$7.sop.document.ui = vu$7.sop.document.ui || {};
vu$7.image = vuImage;
//vu.camera = vuCamera;
vu$7.sop.msg = vu$7.sop.msg || {};
vu$7.sop.audio = vu$7.sop.audio || {};

vu$7.sop.document.ui.sleepTime = 250;
vu$7.sop.document.ui.side = 'front';
//vu.sop.document.ui.feedbackTime = 100;
vu$7.sop.document.ui.photoTime = 3000;

vu$7.sop.document.ui.checkPictureQuality = true;

vu$7.sop.document.ui.previewBox = false; // WIP

vu$7.sop.document.ui.canvas = false;
vu$7.sop.document.ui.canvasContext = false;

/* ------------------------------------------------------ */

let moduleCamera$2 = null;
vu$7.sop.document.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");

    // Proceed to use vu.sop safely
    vu$7.sop.msg = window.vu.sop.msg || {};
    vu$7.sop.audio = window.vu.sop.audio || {};
    moduleCamera$2 = camera;
};

vu$7.sop.document.ui.setLimits = function() {
    if (moduleCamera$2.isVerticalVideo) {
        // Vertical Video
        vu$7.sop.document.ui.percentualLimitsActive = [[0,25],[0,100],[50,100],[0,100]];    // [left, top, width, height]
    } else {
        // Horizontal Video
        vu$7.sop.document.ui.percentualLimitsActive = [[0,35],[0,35],[65,100],[65,100]];    // [left, top, width, height]
    }
};


/* ------------------------------------------------------ */

vu$7.sop.document.ui.bg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?>'+
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 500" style="enable-background:new 0 0 750 500;" xml:space="preserve">' +
    '<style type="text/css">.st0{fill:'+color+';}</style>' +
    '<g id="Layer_1">' +
    '<path class="st0" ' +
    'd="M 20,172 V 44 C 20,30.7 30.7,20 44,20 h 128 c 6.6,0 8,1.4 8,8 v 8 c 0,6.6 -1.40149,7.859606 -8,8 H 44 v 128 c 0,6.6 -1.4,8 -8,8 h -8 c -6.6,0 -8,-1.4 -8,-8 z M 566,28 v 8 c 0,6.6 1.40149,7.859606 8,8 h 128 v 128 c 0,6.6 1.4,8 8,8 h 8 c 6.6,0 8,-1.4 8,-8 V 44 C 726,30.7 715.3,20 702,20 H 574 c -6.6,0 -8,1.4 -8,8 z m 152,290 h -8 c -6.6,0 -7.88622,1.40098 -8,8 V 454 H 574 c -6.6,0 -8,1.4 -8,8 v 8 c 0,6.6 1.4,8 8,8 h 128 c 13.3,0 24,-10.7 24,-24 V 326 c 0,-6.6 -1.4,-8 -8,-8 z M 180,470 v -8 c 0,-6.6 -1.40149,-7.85961 -8,-8 H 44 V 326 c 0,-6.6 -1.4,-8 -8,-8 h -8 c -6.6,0 -8,1.4 -8,8 v 128 c 0,13.3 10.7,24 24,24 h 128 c 6.6,0 8,-1.4 8,-8 z"' +
    '/></g>' +
    '</svg>') +"')"};

vu$7.sop.document.ui.bgStyle2 = function(color, bgcolor, bgopacity) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?>'+
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1500 1000" style="enable-background:new 0 0 1500 1000;" xml:space="preserve">' +
    '<style type="text/css">.st0{fill:'+color+';}</style>' +
    '<g id="Layer_1">' +
    '<path style="fill:'+bgcolor+';fill-opacity:'+bgopacity+';stroke-width:0.9443655;stroke:none" d="M -1.4140625 0.39453125 L -1.4140625 997.41406 L 1501.8945 997.41406 L 1501.8945 0.39453125 L -1.4140625 0.39453125 z M 380.31055 250.4043 L 1118.4434 250.4043 L 1118.4434 737.82812 L 380.31055 737.82812 L 380.31055 250.4043 z " id="rect15" />' +
    '<path id="path4-3-7" d="M 967.39775,244.00234 H 1102.348 c 13.3,0 22,8.7 22,22 v 135.46437 c 0,2.50362 -1.1556,2.53563 -2.1845,2.53563 h -5.4203 c -1.1442,0 -2.3952,-0.11832 -2.3952,-2.53562 V 268.23025 c 0,-6.75719 -4.8888,-14.22791 -14.1409,-14.22791 H 967.39775 c -3.42204,0 -3.02947,-1.40568 -3.04975,-3.43494 l -0.0331,-3.31268 c -0.01,-0.99461 -0.37229,-3.25238 3.08285,-3.25238 z" 	class="st0" />' +
    '<path id="path4-3" d="M 531.28045,744.1099 H 396.33021 c -13.3,0 -22,-8.70005 -22,-22.00005 V 586.64548 c 0,-2.50362 1.15559,-2.53563 2.18451,-2.53563 h 5.42031 c 1.14417,0 2.39518,0.11832 2.39518,2.53562 v 133.23647 c 0,8.56318 4.8888,14.22791 14.14087,14.22791 h 132.80937 c 3.42204,0 3.02947,1.40568 3.04975,3.43494 l 0.0331,3.31268 c 0.01,0.99461 0.37229,3.25243 -3.08285,3.25243 z" class="st0" />' +
    '<path id="path4-6" d="M 1124.2972,587.08425 V 722.0345 c 0,13.3 -8.7,22 -22,22 H 966.83283 c -2.50362,0 -2.53563,-1.15559 -2.53563,-2.1845 v -5.42032 c 0,-1.14417 0.11832,-2.39518 2.53562,-2.39518 h 133.23648 c 8.6133,0 14.2279,-4.8888 14.2279,-14.14086 V 587.08425 c 0,-3.42204 1.4057,-3.02947 3.4349,-3.04975 l 3.3127,-0.0331 c 0.9946,-0.01 3.2524,-0.37229 3.2524,3.08285 z" class="st0" />' +
    '<path id="path4" d="M 374.32294,400.94162 V 265.99137 c 0,-13.3 8.7,-22 22,-22 h 135.46437 c 2.50362,0 2.53563,1.15559 2.53563,2.18451 v 5.42031 c 0,1.14417 -0.11832,2.39518 -2.53562,2.39518 H 398.55085 c -7.72945,-0.0884 -14.22791,4.8888 -14.22791,14.14087 v 132.80938 c 0,3.42204 -1.40567,3.02947 -3.43494,3.04975 l -3.31267,0.0331 c -0.99461,0.01 -3.25239,0.37229 -3.25239,-3.08285 z" class="st0" />' +
    '</g></svg>') +"')"};

vu$7.sop.document.ui.bgActive = vu$7.sop.document.ui.bg('#1DC600');
vu$7.sop.document.ui.bgSmall = vu$7.sop.document.ui.bg('#3B83C6');
vu$7.sop.document.ui.bgInactive = vu$7.sop.document.ui.bg('#212529');

vu$7.sop.document.ui.setBgStyle2 = function(colorActive, colorSmall, colorInactive, bgColor, bgOpacity) {
    console.log("Document BackGround Style 2");
    vu$7.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background');

    vu$7.sop.document.ui.bgActive = vu$7.sop.document.ui.bgStyle2(colorActive, bgColor, bgOpacity);
    vu$7.sop.document.ui.bgSmall = vu$7.sop.document.ui.bgStyle2(colorSmall, bgColor, bgOpacity);
    vu$7.sop.document.ui.bgInactive = vu$7.sop.document.ui.bgStyle2(colorInactive, bgColor, bgOpacity);

    vu$7.sop.document.ui.bgElement.style.backgroundSize = '160%';
    vu$7.sop.document.ui.bgElement.style.backgroundPosition = '50% 49%';

    vu$7.sop.ui.bottomTextNoOverlay();
    vu$7.sop.ui.bottomTextObserver.observe(document.getElementById('vu.sop.ui.bottomText'));
};

/* ------------------------------------------------------ */

vu$7.sop.document.ui.resolve;
vu$7.sop.document.ui.reject;
vu$7.sop.document.ui.results = [];
vu$7.sop.document.ui.resultsTime = [];
vu$7.sop.document.ui.doLoop = false;

vu$7.sop.document.ui.start = async function(side) {
    vu$7.sop.document.ui.setLimits();
    vu$7.sop.document.ui.box = document.getElementById('vu.sop.document.ui.box');
    vu$7.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background');
    vu$7.sop.document.ui.bgElement.style.backgroundImage = vu$7.sop.document.ui.bgInactive;

    vu$7.sop.document.ui.canvas = document.createElement('canvas');
    vu$7.sop.document.ui.canvasContext = vu$7.sop.document.ui.canvas.getContext("2d", { willReadFrequently: true });

    await vu$7.sop.ui.show("vu.sop.document.ui.background");
    vu$7.sop.document.ui.side = side;
    if (side == "front"){
        //vu.sop.audio.play(vu.sop.audio.addFrontDocumentBottomMsg)
        vu$7.sop.ui.showBottomText(vu$7.sop.msg.addFrontDocumentBottomMsg);
    } else {
        vu$7.sop.audio.play('vu.sop.audio.addBackDocumentBottomMsg');
        vu$7.sop.ui.showBottomText(vu$7.sop.msg.addBackDocumentBottomMsg);
    }

    vu$7.sop.document.ui.results = [];
    vu$7.sop.document.ui.resultsTime = [];

    let promise = new Promise(function (resolve, reject) {
        vu$7.sop.document.ui.resolve = resolve;
        vu$7.sop.document.ui.reject = reject;
    });

    vu$7.sop.document.ui.loop(side);
    return promise
};

vu$7.sop.document.ui.loop = async function(promise) {
    // console.log("vu.sop.document.ui.loop", moduleCamera.video);         
    if(moduleCamera$2.video == null)
        return;
    
    vu$7.sop.document.ui.doLoop = true;

    let picture = null;
    let loopStartTime = new Date();
    let vWidth = moduleCamera$2.video.videoWidth;
    let vHeight = moduleCamera$2.video.videoHeight;
    let result;
    let box;
    vu$7.sop.ui.debug.info.push(['Video width', vWidth + 'px']);
    vu$7.sop.ui.debug.info.push(['Video height', vHeight + 'px']);
    vu$7.sop.ui.debug.info.push(['Video offsetWidth', moduleCamera$2.video.offsetWidth + 'px']);
    vu$7.sop.ui.debug.info.push(['Video offsetHeight', moduleCamera$2.video.offsetHeight + 'px']);
    vu$7.sop.ui.debug.info.push(['Video Center', '<span style="font-weight: bolder; color: darkblue;">POINT</span>']);
    vu$7.sop.ui.debug.info.push(['Document Center', '<span style="font-weight: bolder; color: #1DC600;">POINT</span>']);
    let boxConfidence;
    try {
        let boxStartTime = new Date();
        box = await vu$7.sop.document.objectDetection.predictAsync(moduleCamera$2.video);
        
        vu$7.sop.ui.debug.perf.push(['Doc Box', new Date().getTime() - boxStartTime.getTime() +'ms']);

        if (box && typeof box[0] !== 'undefined') {
            if (vu$7.sop.document.ui.previewBox) { vu$7.sop.document.ui.drawBox(box); }
            boxConfidence = Math.round(box[0][2]*100);
            result = vu$7.sop.document.ui.calculateResult(box[0][0], box[0][1], vWidth, vHeight);

            // Feedback
            if (result === "active") {
                vu$7.sop.document.ui.bgElement.style.backgroundImage = vu$7.sop.document.ui.bgActive;
            } else if (result === "small") {
                vu$7.sop.document.ui.bgElement.style.backgroundImage = vu$7.sop.document.ui.bgSmall;
            } else {
                vu$7.sop.document.ui.bgElement.style.backgroundImage = vu$7.sop.document.ui.bgInactive;
            }
            //
        } else {
            vu$7.sop.document.ui.bgElement.style.backgroundImage = vu$7.sop.document.ui.bgInactive;
            vu$7.sop.document.ui.box.style.display = 'none';
        }
    } catch (e) {
        console.log("e", e);
        result = 'inactive';
    }

    //console.log(result)

    let timeNow = Date.now();
    vu$7.sop.document.ui.results.push(result);
    vu$7.sop.document.ui.resultsTime.push(timeNow);

    // clean old results - TODO hacerlo por tiempo, no por contador.
    if (vu$7.sop.document.ui.results.length  >  200){
        vu$7.sop.document.ui.results.shift();
        vu$7.sop.document.ui.resultsTime.shift();
    }

    if (vu$7.sop.document.ui.results.length  >  3){
        let startPhotoIndex = false;
        for (let i = 0; i < vu$7.sop.document.ui.results.length; i++) {
            let time = vu$7.sop.document.ui.resultsTime[vu$7.sop.document.ui.results.length - i];
            if ( startPhotoIndex === false && timeNow >= ( time + vu$7.sop.document.ui.photoTime)) {
                startPhotoIndex = vu$7.sop.document.ui.results.length - i;
            }
        }
        // Feedback

        // Photo
        let takePhoto = true;
        for (let i = startPhotoIndex; i < vu$7.sop.document.ui.results.length; i++) {
            result = vu$7.sop.document.ui.results[i];
            if ( result !== "active" && takePhoto === true) {
                takePhoto = false;
            }
        }
        /* Picture Quality */
        let imageQualityIsOK = true;
        if (vu$7.sop.document.ui.checkPictureQuality) {
            if (box && typeof box[0] !== 'undefined') {
                let borderDecimal = 0.1;
                let borderHorizontal = Math.round(box[0][1][2] * borderDecimal);
                let borderVertical = Math.round(box[0][1][3] * borderDecimal);
                vu$7.sop.document.ui.height = box[0][1][3] - (borderVertical * 2);
                vu$7.sop.document.ui.width = box[0][1][2] - (borderHorizontal * 2);

                let horizontalCenterOffset = Math.round((vu$7.sop.document.ui.height - box[0][1][2]) / 4);
                let verticalCenterOffset = Math.round((vu$7.sop.document.ui.width - box[0][1][3]) / 4);
                vu$7.sop.document.ui.canvasContext.drawImage(moduleCamera$2.video,
                    -(box[0][1][0] + borderHorizontal - horizontalCenterOffset),
                    -(box[0][1][1] + borderVertical - verticalCenterOffset)
                );
                /* Blur y Brillo */
                vu$7.image.blurDetector.resize = 320;
                vu$7.image.blurDetector.minResult = 1.4;
                vu$7.image.brightnessDetector.minResult = 30;

                let isBrightStartTime = new Date();
                let isBright = vu$7.image.brightnessDetector.isBrightAsync(vu$7.sop.document.ui.canvas);
                let isBlurryStartTime = new Date();
                let isBlurry = vu$7.image.blurDetector.isBlurryAsync(vu$7.sop.document.ui.canvas);
                let hasABrightSpotStartTime = new Date();
                let hasABrightSpot = vu$7.image.brigthSpotDetector.hasABrightSpot(vu$7.sop.document.ui.canvas);


                isBright = await isBright;
                vu$7.sop.ui.debug.perf.push(['isBright', new Date().getTime() - isBrightStartTime.getTime() +'ms']);
                isBlurry = await isBlurry;
                vu$7.sop.ui.debug.perf.push(['isBlurry', new Date().getTime() - isBlurryStartTime.getTime() +'ms']);
                hasABrightSpot = await hasABrightSpot;
                vu$7.sop.ui.debug.perf.push(['hasABrightSpot', new Date().getTime() - hasABrightSpotStartTime.getTime() +'ms']);


                // Validacion de tamano del documento
                let documentSizeMin = 0.65;
                let documentSizeMax = 0.95;
                let documentSize = 'ok';
                let documentSizeAlert = false;
                if ((box[0][1][2] / moduleCamera$2.video.videoWidth) < documentSizeMin) {
                    documentSize = 'small';
                    documentSizeAlert = true;
                }
                if ((box[0][1][2] / moduleCamera$2.video.videoWidth) > documentSizeMax) {
                    documentSize = 'big';
                    documentSizeAlert = true;
                }
                // Validacion de rostro centrado
                let documentCenterX = box[0][1][0] + (box[0][1][2]/2);
                let documentCenterY = box[0][1][1] + (box[0][1][3]/2);
                let videoCenterX = moduleCamera$2.video.videoWidth/2;
                let videoCenterY = moduleCamera$2.video.videoHeight/2;
                let maxDistanceFromTheCenter = 0.25;

                let documentCenterVerticalAlert = false;
                if (Math.abs(documentCenterY - videoCenterY) > (videoCenterY * maxDistanceFromTheCenter)) {
                    documentSize = 'notCentered';
                    documentCenterVerticalAlert = true;
                }
                let documentCenterHorizontalAlert = false;
                if (Math.abs(documentCenterX - videoCenterX) > (videoCenterX * maxDistanceFromTheCenter)) {
                    documentSize = 'notCentered';
                    documentCenterHorizontalAlert = true;
                }

                //console.log(isBright[0], isBright[1], isBlurry[0], isBlurry[1], documentSize)
                let color;
                if (vu$7.sop.ui.debug.enable) {
                    vu$7.sop.ui.debug.eval.push(['Doc confidence', boxConfidence +"%", 'white']);
                    if (isBright[0]) {color = '#1DC600';} else { color = 'red';}
                    vu$7.sop.ui.debug.eval.push(['Doc is bright', hasABrightSpot[0], color]);
                    vu$7.sop.ui.debug.eval.push(['Doc is bright val', hasABrightSpot[1], color]);
                    vu$7.sop.ui.debug.eval.push(['Doc is bright min', vu$7.image.brightnessDetector.minResult, 'white']);

                    if (!hasABrightSpot[0]) {color = '#1DC600';} else { color = 'red';}
                    vu$7.sop.ui.debug.eval.push(['Doc has bright spot', hasABrightSpot[0], color]);
                    vu$7.sop.ui.debug.eval.push(['Doc has bright spot val', hasABrightSpot[1], color]);

                    if (isBlurry[0]) {color = 'red';} else { color = '#1DC600';}
                    vu$7.sop.ui.debug.eval.push(['Doc blurry', isBlurry[0], color]);
                    vu$7.sop.ui.debug.eval.push(['Doc blurry val', isBlurry[1].toFixed(2), color]);
                    vu$7.sop.ui.debug.eval.push(['Doc blurry max', vu$7.image.blurDetector.minResult, 'white']);

                    if (documentSizeAlert) { color = 'red';} else { color = '#1DC600';}
                    vu$7.sop.ui.debug.eval.push(['Doc size', box[0][1][2] + "px", color]);
                    vu$7.sop.ui.debug.eval.push(['Doc size', Math.round((box[0][1][2] / moduleCamera$2.video.videoWidth)*100) + "%", color]);
                    vu$7.sop.ui.debug.eval.push(['Doc min size', Math.round(documentSizeMin*100) + '%', 'white']);
                    vu$7.sop.ui.debug.eval.push(['Doc max size', Math.round(documentSizeMax*100) + '%', 'white']);

                    if (documentCenterVerticalAlert) { color = 'red';} else { color = '#1DC600';}
                    vu$7.sop.ui.debug.eval.push(['Doc Y Distance', Math.round(Math.abs(documentCenterY - videoCenterY)) + 'px', color]);
                    vu$7.sop.ui.debug.eval.push(['Doc Y Max', Math.round((videoCenterY * maxDistanceFromTheCenter)) + 'px', 'white']);

                    if (documentCenterHorizontalAlert) { color = 'red';} else { color = '#1DC600';}
                    vu$7.sop.ui.debug.eval.push(['Doc X Distance', Math.round(Math.abs(documentCenterX - videoCenterX)) + 'px', color]);
                    vu$7.sop.ui.debug.eval.push(['Doc X Max', Math.round((videoCenterX * maxDistanceFromTheCenter)) + 'px', 'white']);

                    if (documentSize !== 'ok') { color = 'red';} else { color = '#1DC600';}
                    vu$7.sop.ui.debug.eval.push(['Doc Result  ', documentSize, color]);
                    vu$7.sop.document.ui.drawBox(box);

                }

                // Face Size (ok - big - small)
                if (moduleCamera$2.video.videoWidth < 1080 && window.innerHeight > window.innerWidth){
                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.rotateScreen);
                    imageQualityIsOK = false;
                }
                if (documentSize == 'big'){
                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.documentClose);
                    imageQualityIsOK = false;
                }
                if (documentSize == 'small'){
                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.documentAway);
                    imageQualityIsOK = false;
                }
                if (documentSize == 'notCentered'){
                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.documentNotCentered);
                    imageQualityIsOK = false;
                }
                // is Bright
                if (isBright[0] == false){
                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.darkDocument);
                    imageQualityIsOK = false;
                }
                // Is blurry
                if (isBlurry[0] == true){

                    if(vu$7.sop.enableTelemetry){
                        vu$7.telemetry.addEvent("DocumentActivityProcess", "end", {"isBlurry" : true} );
                    }

                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.blurryDocument);
                    imageQualityIsOK = false;
                }
                // Doc is bright spot
                if (hasABrightSpot[0] == true){
                    vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.documentHasABrightSpot);
                    imageQualityIsOK = false;
                }
            } else {
                vu$7.sop.ui.showBottomTextAlert(vu$7.sop.msg.documentNotCentered);
                imageQualityIsOK = false;
            }
        }
        if (imageQualityIsOK) {
            vu$7.sop.ui.hideBottomTextAlert();
        } else {
            takePhoto = false;
        }
        if (vu$7.sop.ui.debug.enable) {
            vu$7.sop.ui.debug.perf.push(['Loop', new Date().getTime() - loopStartTime.getTime() +'ms']);
            vu$7.sop.ui.debugDraw();
            vu$7.sop.ui.drawVideoCenter();
            if (vu$7.sop.ui.debug.hangDocumentScreen) {
                takePhoto = false;
            }
        } else {
            vu$7.sop.ui.cleanResults();
        }
        /* ------------------ */
        if (takePhoto) {
            vu$7.sop.audio.play('vu.sop.audio.audioBeep');
            vu$7.sop.document.ui.doLoop = false;

            vu$7.sop.ui.flash();
            picture = await moduleCamera$2.takePicture();

            // Clean and hide bottomTextAlert
            await vu$7.sop.ui.cleanAndHideBottomTextAlert();

            // Clean Up
            //vu.sop.ui.showBottomText('')
            await vu$7.sop.ui.hide("vu.sop.document.ui.background");

            // Resolve Promise
            vu$7.sop.document.ui.resolve(picture);
            return;
        }
    } else {
        vu$7.sop.ui.cleanResults();
    }

    // Continuar loopeando
    setTimeout(function () {
        if(vu$7.sop.document.ui.doLoop == true)
        {
            vu$7.sop.document.ui.loop(promise);
        }
        
    }, 10);
};


vu$7.sop.document.ui.calculateResult = function(label, box, videoWidth, videoHeight) {
    let boxPercentualLeft = Math.round((box[0]*100)/videoWidth);
    let boxPercentualTop = Math.round((box[1]*100)/videoHeight);
    let boxPercentualWidth = Math.round((box[2]*100)/videoWidth);
    let boxPercentualHeight = Math.round((box[3]*100)/videoHeight);

    //console.log(box)
    //console.log(boxPercentualLeft,boxPercentualTop,boxPercentualWidth,boxPercentualHeight)

    if ( boxPercentualLeft > vu$7.sop.document.ui.percentualLimitsActive[0][0] &&
         boxPercentualLeft < vu$7.sop.document.ui.percentualLimitsActive[0][1] &&
         boxPercentualTop > vu$7.sop.document.ui.percentualLimitsActive[1][0] &&
         boxPercentualTop < vu$7.sop.document.ui.percentualLimitsActive[1][1] &&
         boxPercentualWidth > vu$7.sop.document.ui.percentualLimitsActive[2][0] &&
         boxPercentualWidth < vu$7.sop.document.ui.percentualLimitsActive[2][1] &&
         boxPercentualHeight > vu$7.sop.document.ui.percentualLimitsActive[3][0] &&
         boxPercentualHeight < vu$7.sop.document.ui.percentualLimitsActive[3][1]
    ) {
        return 'active';
    }
    return 'inactive';
};

/* ------------------------------------------------------ */

vu$7.sop.document.ui.box = document.getElementById('vu.sop.document.ui.box');
vu$7.sop.document.ui.boxCenterPoint = document.getElementById('vu.sop.ui.debugElementCenter');
vu$7.sop.document.ui.videoContainer = document.getElementById('vu.sop.ui.videoContainer');

vu$7.sop.document.ui.drawBox = function(predictResults) {
    let scale = moduleCamera$2.video.offsetHeight / moduleCamera$2.video.videoHeight;
    try {
        let bbox = predictResults[0][1];
        if (bbox[0] < 1) {
            bbox[0] = 1;
        }
        if (bbox[1] < 1) {
            bbox[1] = 1;
        }
        if (bbox[2] > moduleCamera$2.video.videoWidth) {
            bbox[2] = moduleCamera$2.video.videoWidth;
        }
        if (bbox[3] > moduleCamera$2.video.videoHeight) {
            bbox[3] = moduleCamera$2.video.videoHeight;
        }
        let bleft = bbox[0] * scale;
        let btop = bbox[1] * scale;
        let bwidth = bbox[2] * scale;
        let bheight = bbox[3] * scale;

        let fixX = Math.round((moduleCamera$2.video.offsetWidth - vu$7.sop.document.ui.videoContainer.offsetWidth)/2);
        let fixY = Math.round((moduleCamera$2.video.offsetHeight - vu$7.sop.document.ui.videoContainer.offsetHeight)/2);

        vu$7.sop.document.ui.boxCenterPoint.style.right    = Math.round((bleft + (bwidth / 2)) - fixX) - 5 + "px";
        vu$7.sop.document.ui.boxCenterPoint.style.top = Math.round((btop + (bheight / 2)) - fixY) - 5 + "px";
        vu$7.sop.document.ui.boxCenterPoint.style.display = 'block';

        vu$7.sop.document.ui.box.style.right = bleft - fixX + "px";
        vu$7.sop.document.ui.box.style.top = btop - fixY + "px";
        vu$7.sop.document.ui.box.style.width = bwidth + "px";
        vu$7.sop.document.ui.box.style.height = bheight + "px";
        vu$7.sop.document.ui.box.style.display = 'block';
    }

    catch(error) {
        vu$7.sop.document.ui.box.style.display = 'none';
    }
};

var vuSopDocumenUi = vu$7.sop.document.ui;

// Reference the existing vu object
const vu$6 = window.vu || {};
vu$6.screen = vu$6.screen || {};
vu$6.screen = vu$6.screen || {};
vu$6.screen.capture = vu$6.screen.capture || {};
//vu.camera = vu.camera || {};
vu$6.sop = vu$6.sop || {};
vu$6.sop.screenRecorder = vu$6.sop.screenRecorder || {};
vu$6.sop.document = vu$6.sop.document || {};
//vu.sop.document.ui = vu.sop.document.ui || {};

let moduleCamera$1 = null;

vu$6.screen.capture.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");

    moduleCamera$1 = camera;    
    vu$6.sop.screenRecorder = window.vu.sop.screenRecorder || {};
    vu$6.sop.steps = window.vu.sop.steps || {};
    vu$6.sop.document = window.vu.sop.document || {};
    vu$6.face = window.vu.face;
};


vu$6.screen.capture.style = 'videoOnly';
vu$6.screen.capture.vidWidth = 640;
vu$6.screen.capture.vidHeight = 480;
vu$6.screen.capture.frameRate = 5;

/******************************************************************************************************************/
// https://github.com/TrevorSundberg/h264-mp4-encoder
vu$6.screen.capture.doCaptureLoop = false;
vu$6.screen.capture.doRecordLoop = false;
vu$6.screen.capture.videoEncoder = false;

// Elements
//vu.screen.capture.canvas = document.getElementById("previewCanvas")
vu$6.screen.capture.canvas = document.createElement('canvas');
vu$6.screen.capture.baseDiv = document.getElementById("vu.sop");
vu$6.screen.capture.canvasContext = vu$6.screen.capture.canvas.getContext('2d');
vu$6.screen.capture.canvasVideo = document.createElement('canvas');
vu$6.screen.capture.canvasVideoContext = vu$6.screen.capture.canvasVideo.getContext('2d');
vu$6.screen.capture.imgTransform = document.createElement('img');

vu$6.screen.capture.videoElement = document.getElementById("vu.sop.ui.video");
vu$6.screen.capture.bottomTextElement = document.getElementById("vu.sop.ui.bottomText");
vu$6.screen.capture.bottomTextAlertElement = document.getElementById("vu.sop.ui.bottomTextAlert");
vu$6.screen.capture.faceOverlayElement = document.getElementById("vu.face.ui.gestures.circle");
vu$6.screen.capture.documentOverlayElement = document.getElementById("vu.sop.document.ui.background");


vu$6.screen.capture.recordVideoStart = async function() {
    // TODO Agregar data-html2canvas-ignore a los nodos que correspondan (optimizacion)
    let vidWidth;
    let vidHeight;
    if (vu$6.screen.capture.style === 'videoOnly') {
        vidWidth = vu$6.screen.capture.vidWidth;
        vidHeight = vu$6.screen.capture.vidHeight;
    } else {
        vidWidth = window.getComputedStyle(vu$6.screen.capture.baseDiv, null).getPropertyValue('max-width').split('px')[0];
        vidHeight = window.getComputedStyle(vu$6.screen.capture.baseDiv, null).getPropertyValue('max-height').split('px')[0];
        vidWidth = 2 * Math.round(vidWidth/2);
        vidHeight = 2 * Math.round(vidHeight/2);
    }
    console.log("Start Recording - video Width " + vidWidth + "px Height " + vidHeight + "px");

    vu$6.screen.capture.videoEncoder = await HME.createH264MP4Encoder();
    vu$6.screen.capture.videoEncoder.frameRate = vu$6.screen.capture.frameRate;
    vu$6.screen.capture.videoEncoder.width = vidWidth;
    vu$6.screen.capture.videoEncoder.height = vidHeight;
    vu$6.screen.capture.videoEncoder.quantizationParameter = 20;      // Video Quality
    vu$6.screen.capture.videoEncoder.groupOfPictures = 10;            // Keyframe
    //vu.screen.capture.videoEncoder.temporalDenoise = true;          // Use temporal noise supression.
    //vu.screen.capture.videoEncoder.speed = 5                        // Speed where 0 means best quality and 10 means fastest speed [0..10].
    vu$6.screen.capture.videoEncoder.initialize();

    vu$6.screen.capture.canvas.width = vidWidth;
    vu$6.screen.capture.canvas.height = vidHeight;
    await vu$6.screen.capture.getFrame();
    vu$6.screen.capture.videoEncoder.addFrameRgba(vu$6.screen.capture.canvasContext.getImageData(0, 0,
        vu$6.screen.capture.canvas.width, vu$6.screen.capture.canvas.height).data);
    vu$6.screen.capture.doCaptureLoop = true;
    vu$6.screen.capture.doRecordLoop = true;

    vu$6.screen.capture.captureLoop();
    vu$6.screen.capture.recordLoop();

};

vu$6.screen.capture.recordVideoStop = async function() {
    vu$6.screen.capture.doCaptureLoop = false;
    vu$6.screen.capture.doRecordLoop = false;

    vu$6.screen.capture.videoEncoder.finalize();
    const uint8Array = vu$6.screen.capture.videoEncoder.FS.readFile(vu$6.screen.capture.videoEncoder.outputFilename);

    const video = new Blob([uint8Array], { type: "video/mp4" });
    let response;
    console.log("vu.sop.screenRecorder.sendVideo", vu$6.sop.screenRecorder.sendVideo);
    console.log("vu.face.auth.screenRecorder.sendVideo", vu$6.face.auth.screenRecorder.sendVideo);
    if( vu$6.sop.screenRecorder.sendVideo === true) {
        response = await vu$6.sop.steps.addVideoResolve(video);
    }
    else if ( vu$6.face.auth.screenRecorder.sendVideo === true ) 
    {
        response = await vu$6.face.auth.addVideoResolve(video);
    }
    else
        {
        vu$6.screen.capture.recordVideoStopAndDownload();
    }

    vu$6.screen.capture.videoEncoder.delete();
    return response
};

vu$6.screen.capture.recordVideoStopAndDownload = async function() {
    const uint8Array = await vu$6.screen.capture.recordVideoStop();

    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: "video/mp4" }));
    anchor.download = "download";
    anchor.click();
};

vu$6.screen.capture.recordLoop = async function() {
    try {
        vu$6.screen.capture.videoEncoder.addFrameRgba(vu$6.screen.capture.canvasContext.getImageData(0, 0,
            vu$6.screen.capture.canvas.width, vu$6.screen.capture.canvas.height).data);
    } catch (error) {
        //console.log(error)
    }
    let timePerFrame = 1000 / vu$6.screen.capture.frameRate;
    if (vu$6.screen.capture.doRecordLoop == true) {
        setTimeout(function () {
            if(vu$6.screen.capture.doRecordLoop == true)    
            {
                vu$6.screen.capture.recordLoop();
            }        
            
        }, timePerFrame);
    }
};

vu$6.screen.capture.captureLoop = async function() {
    let timeStart = new Date();
    await vu$6.screen.capture.getFrame();
    let timeEnd = new Date().getTime() - timeStart.getTime();
    let timePerFrame = 1000 / vu$6.screen.capture.frameRate;
    let loopWaitingTime;
    if ( timeEnd >= timePerFrame) {
        loopWaitingTime = 1;
    } else {
        loopWaitingTime = timePerFrame - timeEnd;
    }
    if (vu$6.screen.capture.doCaptureLoop == true) {
        setTimeout(function () {
            if (vu$6.screen.capture.doCaptureLoop == true)
            {
                vu$6.screen.capture.captureLoop();
            }            
        }, loopWaitingTime);
    }
};

vu$6.screen.capture.baseDivPath = false;
vu$6.screen.capture.getFrame = async function() {
    //start = new Date();
    if (vu$6.screen.capture.style === 'videoOnly') {
        // videoOnly
        // Dibujar el fondo negro
        vu$6.screen.capture.canvasContext.fillStyle = "black";
        vu$6.screen.capture.canvasContext.fillRect(0, 0, vu$6.screen.capture.canvas.width, vu$6.screen.capture.canvas.height);
        // Captura de video
        let scale;
        if (moduleCamera$1.isVerticalVideo()) {
            scale = moduleCamera$1.video.videoHeight/vu$6.screen.capture.vidHeight;
        } else {
            scale = moduleCamera$1.video.videoWidth/vu$6.screen.capture.vidWidth;
        }
        let framePosition = {};
        framePosition.width = Math.round(moduleCamera$1.video.videoWidth/scale);
        framePosition.height = Math.round(moduleCamera$1.video.videoHeight/scale);
        framePosition.left = Math.round((vu$6.screen.capture.vidWidth-framePosition.width)/2);
        framePosition.top = Math.round((vu$6.screen.capture.vidHeight-framePosition.height)/2);

        vu$6.screen.capture.canvasContext.drawImage(moduleCamera$1.video,
                                                    framePosition.left, framePosition.top,
                                                    framePosition.width, framePosition.height);

    } else {
        // Experimental
        if (vu$6.screen.capture.baseDivPath === false ) {
            vu$6.screen.capture.baseDivPath = vu$6.screen.capture.getDomPath(vu$6.screen.capture.baseDiv);
        }
        if (vu$6.face.ui.gestures.loop === true)
        {
            await vu$6.screen.capture.getVideoFrame();
        } else if (typeof vu$6.sop.document !== 'undefined' && vu$6.sop.document.ui.doLoop === true) {
            await vu$6.screen.capture.getVideoFrame();
        } else {
            let canvas = await html2canvas(vu$6.screen.capture.baseDiv, {
                /*ignoreElements: (element)=>{
                    if ( element.hasAttribute('id') && element.id != '' ) {
                        nodeName = element.nodeName.toLowerCase() + '#' + element.id
                    } else {
                        nodeName = element.nodeName.toLowerCase()
                    }
                    console.log(nodeName)
                    if (vu.screen.capture.baseDivPath.includes(nodeName)) {
                        return false
                    } else {
                        return true
                    }
                }*/
            });
            // Dibujar el fondo negro
            vu$6.screen.capture.canvasContext.fillStyle = "black";
            vu$6.screen.capture.canvasContext.fillRect(0, 0, vu$6.screen.capture.canvas.width, vu$6.screen.capture.canvas.height);
            // Obtener canvas de pantalla
            vu$6.screen.capture.canvasContext.drawImage(canvas,
                0, 0,
                vu$6.screen.capture.baseDiv.offsetWidth, vu$6.screen.capture.baseDiv.offsetHeight);
        }
    }
    //console.log('screenshot Time', new Date().getTime() - start.getTime(), 'ms ', captureType)
    return vu$6.screen.capture.canvas
};

vu$6.screen.capture.getVideoFrame = async function() {
    vu$6.screen.capture.videoElement = document.getElementById("vu.sop.ui.video");
    vu$6.screen.capture.bottomTextElement = document.getElementById("vu.sop.ui.bottomText");
    vu$6.screen.capture.faceOverlayElement = document.getElementById("vu.face.ui.gestures.circle");
    vu$6.screen.capture.documentOverlayElement = document.getElementById("vu.sop.document.ui.background");
    vu$6.screen.capture.bottomTextAlertElement = document.getElementById("vu.sop.ui.bottomTextAlert");
    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar el fondo negro
    vu$6.screen.capture.canvasContext.fillStyle = "black";
    vu$6.screen.capture.canvasContext.fillRect(0, 0, vu$6.screen.capture.canvas.width, vu$6.screen.capture.canvas.height);
    // Dibujar el fondo (captura de video)
    let framePosition = vu$6.screen.capture.getPositionRelative(vu$6.screen.capture.videoElement);
    vu$6.screen.capture.canvasVideo.width = vu$6.screen.capture.baseDiv.offsetWidth;
    vu$6.screen.capture.canvasVideo.height = vu$6.screen.capture.baseDiv.offsetHeight;
    vu$6.screen.capture.canvasVideoContext.translate(vu$6.screen.capture.canvasVideo.width, 0);       // Flip Image
    vu$6.screen.capture.canvasVideoContext.scale(-1, 1);                                       // Flip Image
    vu$6.screen.capture.canvasVideoContext.drawImage(moduleCamera$1.video,
                                                framePosition.left, framePosition.top,
                                                framePosition.width, framePosition.height);

    vu$6.screen.capture.canvasContext.drawImage(vu$6.screen.capture.canvasVideo, 0, 0);
    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar Face Overlay
    let overlayElement;
    if (vu$6.face.ui.gestures.loop){
        overlayElement = vu$6.screen.capture.faceOverlayElement;
        vu$6.screen.capture.imgTransform.src = vu$6.screen.capture.faceOverlayElement.style.backgroundImage.split('"')[1];
    } else {
        overlayElement = vu$6.screen.capture.documentOverlayElement;
        vu$6.screen.capture.imgTransform.src = vu$6.screen.capture.documentOverlayElement.style.backgroundImage.split('"')[1];
    }
    let overlayPosition = vu$6.screen.capture.getPositionRelative(overlayElement);

    let backgroundSize = window.getComputedStyle( overlayElement, null ).getPropertyValue( 'background-size' );
    if (backgroundSize.includes("%") ) {
        let size = ( backgroundSize.split("%")[0] / 100);
        overlayPosition.left = Math.round(overlayPosition.left - (((overlayPosition.width * size) - overlayPosition.width)/2));
        overlayPosition.top  = Math.round(overlayPosition.top - (((overlayPosition.height * size) - overlayPosition.height)/2));
        overlayPosition.width = Math.round(overlayPosition.width * size);
        overlayPosition.height = Math.round(overlayPosition.height * size);
    }

    vu$6.screen.capture.canvasContext.drawImage(vu$6.screen.capture.imgTransform,
                                            overlayPosition.left, overlayPosition.top,
                                            overlayPosition.width, overlayPosition.height);

    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar subtitulo
    vu$6.screen.capture.canvasContext.fillStyle = vu$6.screen.capture.bottomTextElement.style.backgroundColor;
    let subPosition = vu$6.screen.capture.getPositionRelative(vu$6.screen.capture.bottomTextElement);
    vu$6.screen.capture.canvasContext.fillRect(subPosition.left, subPosition.top,
                                             subPosition.width, subPosition.height);

    let fontSize = vu$6.screen.capture.bottomTextElement.style.fontSize;
    let fontFamily = window.getComputedStyle( vu$6.screen.capture.bottomTextElement, null ).getPropertyValue( 'font-family' );
    let fontColor = window.getComputedStyle( vu$6.screen.capture.bottomTextElement, null ).getPropertyValue( 'color' );
    let fontWeight = window.getComputedStyle( vu$6.screen.capture.bottomTextElement, null ).getPropertyValue( 'font-weight' );

    vu$6.screen.capture.canvasContext.textAlign = 'center';
    vu$6.screen.capture.canvasContext.fillStyle = fontColor;
    vu$6.screen.capture.canvasContext.font =  "normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily;
    vu$6.screen.capture.canvasContext.textBaseline = 'middle';

    //console.log("normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily)

    vu$6.screen.capture.canvasContext.fillText(vu$6.screen.capture.bottomTextElement.textContent,
        subPosition.left + Math.round(vu$6.screen.capture.bottomTextElement.offsetWidth/2),
        subPosition.top + Math.round(vu$6.screen.capture.bottomTextElement.offsetHeight/2));

    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar Alerta
    if (vu$6.screen.capture.bottomTextAlertElement.style.display !== "none") {
        let alertPosition = vu$6.screen.capture.getPositionRelative(vu$6.screen.capture.bottomTextAlertElement);

        let x = alertPosition.left;
        let y = alertPosition.top;
        let width = alertPosition.width;
        let height = alertPosition.height;
        let radius = window.getComputedStyle( vu$6.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'border-radius' ).split('px')[0];

        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        vu$6.screen.capture.canvasContext.beginPath();
        vu$6.screen.capture.canvasContext.moveTo(x + radius, y);
        vu$6.screen.capture.canvasContext.arcTo(x + width, y, x + width, y + height, radius);
        vu$6.screen.capture.canvasContext.arcTo(x + width, y + height, x, y + height, radius);
        vu$6.screen.capture.canvasContext.arcTo(x, y + height, x, y, radius);
        vu$6.screen.capture.canvasContext.arcTo(x, y, x + width, y, radius);
        vu$6.screen.capture.canvasContext.closePath();

        vu$6.screen.capture.canvasContext.fillStyle = "black";
        vu$6.screen.capture.canvasContext.fill();

        fontSize = vu$6.screen.capture.bottomTextAlertElement.style.fontSize;
        fontFamily = window.getComputedStyle( vu$6.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'font-family' );
        fontColor = window.getComputedStyle( vu$6.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'color' );
        fontWeight = window.getComputedStyle( vu$6.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'font-weight' );

        vu$6.screen.capture.canvasContext.textAlign = 'center';
        vu$6.screen.capture.canvasContext.fillStyle = fontColor;
        vu$6.screen.capture.canvasContext.font =  "normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily;
        vu$6.screen.capture.canvasContext.textBaseline = 'middle';
        vu$6.screen.capture.canvasContext.fillText(vu$6.screen.capture.bottomTextAlertElement.textContent,
            alertPosition.left + Math.round(vu$6.screen.capture.bottomTextAlertElement.offsetWidth/2),
            alertPosition.top + Math.round(vu$6.screen.capture.bottomTextAlertElement.offsetHeight/2));

    }
    //-----------------------------------------------------------------------------------------------------------------

    return vu$6.screen.capture.canvas
    //console.log('screenshot Time', new Date().getTime() - start.getTime(), 'ms')
};

vu$6.screen.capture.getPositionRelative = function(element) {
    let y = vu$6.screen.capture.baseDiv.getBoundingClientRect().top + window.scrollY;
    let x = vu$6.screen.capture.baseDiv.getBoundingClientRect().left + window.scrollX;

    return {
        top: Math.round((element.getBoundingClientRect().top + window.scrollY) - y),
        left: Math.round((element.getBoundingClientRect().left + window.scrollX) - x),
        height: element.offsetHeight,
        width: element.offsetWidth
    }
};


vu$6.screen.capture.getDomPath = function(el) {
  var stack = [];
  while ( el.parentNode != null ) {
    //console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( el.hasAttribute('id') && el.id != '' ) {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }
  return stack.slice(1); // removes the html element
};


var vuScreenCapture = vu$6.screen.capture;

// Reference the existing vu object
const vu$5 = window.vu || {};
vu$5.sop = vu$5.sop || {};
vu$5.sop.face = vu$5.sop.face || {};
vu$5.sop.face.objectDetectionAndRotation = vu$5.sop.face.objectDetectionAndRotation || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.face == "undefined") { vu.sop.face = function() {} }

// if (typeof vu.sop.face.objectDetectionAndRotation == "undefined") { vu.sop.face.objectDetectionAndRotation = function() {} }

vu$5.sop.face.objectDetectionAndRotation.minConfidence = 0.75;
vu$5.sop.face.objectDetectionAndRotation.maxNumBoxes = 1;
vu$5.sop.face.objectDetectionAndRotation.modelURL = '';
vu$5.sop.face.objectDetectionAndRotation.labels = ['rot0','rot90','rot180','rot270'];

//------------------------------------------------------

vu$5.sop.face.objectDetectionAndRotation.model;

vu$5.sop.face.objectDetectionAndRotation.calculateMaxScores = async function(scores,
                                                                numBoxes,
                                                                numClasses) {
    let maxes = [];
    let classes = [];
    for (let i = 0; i < numBoxes; i++) {
        let max = Number.MIN_VALUE;
        let index = -1;
        for (let j = 0; j < numClasses; j++) {
            if (scores[i * numClasses + j] > max) {
                max = scores[i * numClasses + j];
                index = j;
            }
        }
        maxes[i] = max;
        classes[i] = index;
    }
    return [maxes, classes];
};

vu$5.sop.face.objectDetectionAndRotation.buildDetectedObjects = async function(width,
                                                                  height,
                                                                  boxes,
                                                                  scores,
                                                                  indexes,
                                                                  classes,
                                                                  scale){
    const count = indexes.length;
    let results = [];
    for (let i = 0; i < count; i++) {
        const bbox = [];
        for (let j = 0; j < 4; j++) {
            bbox[j] = boxes[indexes[i] * 4 + j];
        }
        const minY = bbox[0] * height;
        const minX = bbox[1] * width;
        const maxY = bbox[2] * height;
        const maxX = bbox[3] * width;
        bbox[0] = Math.round(minX*scale);
        bbox[1] = Math.round(minY*scale);
        bbox[2] = Math.round((maxX - minX)*scale);
        bbox[3] = Math.round((maxY - minY)*scale);
        //console.log(classes[indexes])
        //console.log(scores[indexes], scale)
        results.push([vu$5.sop.face.objectDetectionAndRotation.labels[classes[indexes]], bbox, scores[indexes]]);
    }
    return results
};


vu$5.sop.face.objectDetectionAndRotation.loadModel = async function(basePath, tfPath) {
    // Big Model (F16)
    //vu.sop.face.objectDetectionAndRotation.modelURL = basePath + '/models/face-location-and-rotation/b16/model.json';
    // Little Model (uint8)
    vu$5.sop.face.objectDetectionAndRotation.modelURL = basePath + '/models/face-location-and-rotation/model.json';
    //console.log(vu.sop.face.objectDetectionAndRotation.modelURL);

    tf.wasm.setWasmPaths({
        'tfjs-backend-wasm.wasm': tfPath + 'tfjs-backend-wasm.wasm',
        'tfjs-backend-wasm-simd.wasm':  tfPath + 'tfjs-backend-wasm-simd.wasm',
        'tfjs-backend-wasm-threaded-simd.wasm':  tfPath + 'tfjs-backend-wasm-threaded-simd.wasm'
    });

    tf.ENV.set('DEBUG', false);
    tf.enableProdMode();

    //await tf.setBackend('cpu');
    await tf.setBackend('wasm');
    await tf.ready();

    //tf.enableDebugMode()
    //console.log(tf.ENV)
    if (!vu$5.sop.face.objectDetectionAndRotation.model) {
        //console.log("Loading - Face Object Detection Model")
        var start = new Date();
        vu$5.sop.face.objectDetectionAndRotation.model = tf.GraphModel;
        vu$5.sop.face.objectDetectionAndRotation.model = await tf.loadGraphModel(vu$5.sop.face.objectDetectionAndRotation.modelURL);
        let netTime = new Date().getTime() - start.getTime();

        console.log("Loaded - Face Object Detection Model - Network Time " + netTime + "ms");
        return vu$5.sop.face.objectDetectionAndRotation.model
    } else {
        return vu$5.sop.face.objectDetectionAndRotation.model
    }
};

vu$5.sop.face.objectDetectionAndRotation.predictAsync = async function(video){

    let img;
    let scale;
    let resolution;
    let newHeight;
    let newWidth;    

    let tensor = tf.tidy(() => {
        img = tf.browser.fromPixels(video);
        scale = 1;
        resolution = 640;
        if (img.shape[0] > resolution || img.shape[1] > resolution){
            if (img.shape[0] < img.shape[1]){
                scale = img.shape[1] / resolution;
            } else {
                scale = img.shape[0] / resolution;
            }
        }

        newHeight = Math.round(img.shape[0]/scale);
        newWidth = Math.round(img.shape[1]/scale);

        img = tf.image.resizeBilinear(img, [newHeight, newWidth]);
        img = tf.cast(img, 'int32');
        return [img.expandDims(0), scale];
    });
    //console.log('Get Img Tensor - Time', new Date().getTime() - start.getTime(), 'ms', 'scale', scale)

    scale = tensor[1];
    tensor = tensor[0];

    let height = tensor.shape[1];
    let width = tensor.shape[2];

    //var start = new Date();
    let inference = await vu$5.sop.face.objectDetectionAndRotation.model.executeAsync(tensor);
    //console.log('executeAsync - Time', new Date().getTime() - start.getTime(), 'ms - shape ', tensor.shape)

    // Big Model (F16)
    let scores_idx = 1;
    let boxes_idx = 0;

    // Little Model (uint8)
    //let scores_idx = 0
    //let boxes_idx = 1

    tf.getBackend();
    //tf.setBackend('cpu');
    let scores = await inference[scores_idx].data();
    let boxes = await inference[boxes_idx].data();

    let [maxScores, classes] = await vu$5.sop.face.objectDetectionAndRotation.calculateMaxScores(
        scores,
        inference[scores_idx].shape[1],
        inference[scores_idx].shape[2]
    );
    //------------------------------------------------------------------
    let boxes2 = tf.tensor2d(boxes, [inference[boxes_idx].shape[1], inference[boxes_idx].shape[3]]);
    let indexTensor = await tf.image.nonMaxSuppressionAsync(boxes2, maxScores, vu$5.sop.face.objectDetectionAndRotation.maxNumBoxes, 0.5, vu$5.sop.face.objectDetectionAndRotation.minConfidence);

    let indexes = await indexTensor.data();
    let result = await vu$5.sop.face.objectDetectionAndRotation.buildDetectedObjects(width, height, boxes, maxScores, indexes, classes, scale);
    //tf.setBackend(prevBackend);

    //console.log('result',result)
    //console.log(performance.now(), tf.memory());

    tensor.dispose();
    tf.dispose(boxes2);
    indexTensor.dispose();
    tf.dispose(indexes);
    tf.dispose(inference);

    //console.log('Model Face       - Time', new Date().getTime() - start.getTime(), 'ms')

    return result
};

var vuSopFaceObjectDetectionAndRotation = vu$5.sop.face.objectDetectionAndRotation;

// Reference the existing vu object
const vu$4 = window.vu || {};
vu$4.sop = vu$4.sop || {};
vu$4.sop.ui = vu$4.sop.ui || {};
vu$4.sop.ui.debug = vu$4.sop.ui.debug|| {};
vu$4.sop.face = vu$4.sop.face || {};
vu$4.sop.face.model = vu$4.sop.face.model || {};
vu$4.sop.face.model.directionsAndGestures = vu$4.sop.face.model.directionsAndGestures || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.face == "undefined") { vu.sop.face = function() {} }

// if (typeof vu.sop.face.model == "undefined") { vu.sop.face.model = function() {} }

// if (typeof vu.sop.face.model.directionsAndGestures == "undefined") { vu.sop.face.model.directionsAndGestures = function() {} }

vu$4.sop.face.model.directionsAndGestures.modelURL = '';
vu$4.sop.face.model.directionsAndGestures.modelHeight = 224;
vu$4.sop.face.model.directionsAndGestures.modelWidth = 224;
vu$4.sop.face.model.directionsAndGestures.labels = ['closed_eyes', 'face_looking_down', 'face_looking_left', 'face_looking_right', 'face_looking_up', 'face_neutral', 'open_mouth', 'smile'];

//------------------------------------------------------

vu$4.sop.face.model.directionsAndGestures.model;


vu$4.sop.face.model.directionsAndGestures.loadModel = async function(basePath, tfPath) {
    //console.log(basePath)
    vu$4.sop.face.model.directionsAndGestures.modelURL = basePath + '/models/face-directions-gestures/model.json';
    //console.log(vu.sop.face.model.directionsAndGestures.modelURL);

    tf.wasm.setWasmPaths({
        'tfjs-backend-wasm.wasm': tfPath + 'tfjs-backend-wasm.wasm',
        'tfjs-backend-wasm-simd.wasm':  tfPath + 'tfjs-backend-wasm-simd.wasm',
        'tfjs-backend-wasm-threaded-simd.wasm':  tfPath + 'tfjs-backend-wasm-threaded-simd.wasm'
    });

    tf.ENV.set('DEBUG', false);
    tf.enableProdMode();

    //await tf.setBackend('cpu');
    await tf.setBackend('wasm');
    await tf.ready();

    //tf.enableDebugMode()
    //console.log(tf.ENV)
    if (!vu$4.sop.face.model.directionsAndGestures.model) {
        //console.log("Loading - Face Directions Model")
        var start = new Date();
        vu$4.sop.face.model.directionsAndGestures.model = tf.GraphModel;
        vu$4.sop.face.model.directionsAndGestures.model = await tf.loadGraphModel(vu$4.sop.face.model.directionsAndGestures.modelURL);
        let netTime = new Date().getTime() - start.getTime();
        var start = new Date();
        vu$4.sop.face.model.directionsAndGestures.model.predict(tf.zeros([ 1,
                                                            vu$4.sop.face.model.directionsAndGestures.modelHeight,
                                                            vu$4.sop.face.model.directionsAndGestures.modelWidth, 3]));
        let warmUpTime = new Date().getTime() - start.getTime();
        console.log("Loaded - Face Directions Model - Network Time " + netTime + "ms - Warm Up Time " + warmUpTime +"ms");
        return vu$4.sop.face.model.directionsAndGestures.model
    } else {
        return vu$4.sop.face.model.directionsAndGestures.model
    }
};

vu$4.sop.face.model.directionsAndGestures.predictAsync = async function(image){

    // Execute model prediction outside of tidy
    let img, resized, batched, logits, resultsWLabels;

    try {
        // Process image inside tidy (synchronous operations)
        const processedTensors = tf.tidy(() => {
            img = tf.browser.fromPixels(image);
            resized = tf.image.resizeBilinear(img, [
                vu$4.sop.face.model.directionsAndGestures.modelHeight,
                vu$4.sop.face.model.directionsAndGestures.modelWidth
            ]);

            batched = tf.reshape(resized, [
                -1,
                vu$4.sop.face.model.directionsAndGestures.modelHeight,
                vu$4.sop.face.model.directionsAndGestures.modelWidth,
                3
            ]);

            return batched; // Return the tensor we need outside tidy
        });

        // Execute model (async operation) outside tidy
        logits = vu$4.sop.face.model.directionsAndGestures.model.execute(processedTensors);
        const results = await logits.data(); // Get the data asynchronously

        // Process results
        let processedResults = {};
        let i = 0;
        vu$4.sop.face.model.directionsAndGestures.labels.forEach(element => {
            processedResults[element] = Math.round(results[i] * 100);
            i = i + 1;
        });

        resultsWLabels = processedResults;

    } finally {
        // Manual cleanup of tensors that weren't disposed by tidy
        if (logits) logits.dispose();
        // processedTensors will be automatically disposed when it goes out of scope
    }

    return resultsWLabels;
};

var vuSopFaceModelDirectionsAndGestures = vu$4.sop.face.model.directionsAndGestures;

/**
 * Ultra-Comprehensive Analytics SDK
 * Maximum data collection with your existing browser detection
 * Requires UAParser library for fallback support
 */
class UltraAnalyticsSDK {
    constructor(workerUrl, options = {}) {
        this.workerUrl = workerUrl;
        this.sessionId = this.generateSessionId();
        this.queue = [];
        this.encryptionKey = options.encryptionKey;
        this.config = {
            batchSize: options.batchSize || 15,
            flushInterval: options.flushInterval || 4000,
            enableAutoTrack: options.enableAutoTrack !== false,
            enableAdvancedFingerprinting: options.enableAdvancedFingerprinting !== false,
            enablePerformanceTracking: options.enablePerformanceTracking !== false,
            debug: options.debug || false,
            maxDataPoints: options.maxDataPoints || 100, // Prevent excessive data collection
            ...options
        };

        this.deviceInfo = null;
        this.networkInfo = null;
        this.hardwareInfo = null;
        this.advancedFingerprint = null;
        this.performanceBaseline = null;

        this.init();
    }

    // Derive a strong 256-bit AES key from any input string using PBKDF2 (matches worker)
    async deriveKey(password) {
        const encoder = new TextEncoder();
        
        // Same salt as worker for compatibility
        const salt = encoder.encode('om-useragent-analytics-salt-2025');
        
        // Import password as key material
        const passwordKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        
        // Derive AES-GCM key using PBKDF2
        return await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000, // 100k iterations for good security
                hash: 'SHA-256'
            },
            passwordKey,
            {
                name: 'AES-GCM',
                length: 256 // 256-bit key
            },
            false,
            ['encrypt']
        );
    }

    // AES-GCM encryption
    async encryptData(data) {
        if (!this.encryptionKey) {
            return data; // No encryption if no key provided
        }

        try {
            const key = await this.deriveKey(this.encryptionKey);

            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encodedData = new TextEncoder().encode(JSON.stringify(data));
            
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                encodedData
            );

            // Combine IV + encrypted data like the worker expects
            const encryptedArray = new Uint8Array(encrypted);
            const combined = new Uint8Array(iv.length + encryptedArray.length);
            combined.set(iv, 0);
            combined.set(encryptedArray, iv.length);
            
            const combinedBase64 = btoa(String.fromCharCode(...combined));
            
            return {
                encrypted: combinedBase64
            };
        } catch (error) {
            console.error('Encryption error:', error);
            return data; // Fallback to unencrypted
        }
    }

    async init() {
        try {
            // Collect comprehensive device information
            await this.collectDeviceInfo();
            await this.collectNetworkInfo();
            await this.collectHardwareInfo();
            
            if (this.config.enableAdvancedFingerprinting) {
                await this.collectAdvancedFingerprint();
            }

            if (this.config.enablePerformanceTracking) {
                this.setupPerformanceTracking();
            }

            if (this.config.enableAutoTrack) {
                this.startAutoFlush();
                this.setupAutoTracking();
            }

            // Initial page view with all collected data (only if auto-track is enabled)
            if (this.config.enableAutoTrack) {
                this.trackPageView();
            }

            // Cleanup on page unload (only if auto-tracking or queue might have events)
            if (this.config.enableAutoTrack) {
                window.addEventListener('beforeunload', () => this.flush());
                window.addEventListener('pagehide', () => this.flush());
            }

            if (this.config.debug) {
                console.log('Ultra Analytics SDK initialized with comprehensive data collection');
            }

        } catch (error) {
            console.error('Analytics SDK initialization error:', error);
        }
    }

    // Enhanced version of your getBrowserInfo function
    async collectDeviceInfo() {
        let result = {};
        
        try {
            if (navigator.userAgentData) {
                const uaData = await navigator.userAgentData.getHighEntropyValues([
                    'platform',
                    'platformVersion',
                    'model',
                    'uaFullVersion',
                    'fullVersionList',
                    'brands',
                    'architecture',
                    'bitness',
                    'wow64'
                ]);

                result = {
                    // Browser info
                    browserName: navigator.userAgentData.brands.find(b => b.brand !== 'Not A;Brand')?.brand || 'Unknown',
                    browserVersion: uaData.uaFullVersion || 'Unknown',
                    browserEngineName: this.detectEngine(navigator.userAgentData.brands),
                    browserEngineVersion: uaData.uaFullVersion || 'Unknown',
                    browserBrands: JSON.stringify(navigator.userAgentData.brands),
                    browserFullVersionList: JSON.stringify(uaData.fullVersionList || []),
                    
                    // Device info
                    mobilePlatform: uaData.platform === 'Android' || uaData.platform === 'iOS' ? 'mobile' : 'desktop',
                    mobileModel: uaData.model || 'Unknown Model',
                    deviceType: this.detectDeviceType(uaData),
                    deviceVendor: this.detectVendor(uaData),
                    
                    // System info
                    operatingSystem: uaData.platform || 'Unknown OS',
                    operatingSystemVersion: uaData.platformVersion || 'Unknown',
                    architecture: uaData.architecture || 'Unknown',
                    bitness: uaData.bitness || 'Unknown',
                    wow64: uaData.wow64 || false,
                    
                    // Mobile detection
                    isMobile: navigator.userAgentData.mobile,
                    isTablet: this.detectTablet(uaData),
                    isDesktop: !navigator.userAgentData.mobile && !this.detectTablet(uaData)
                };
            } else if (typeof UAParser !== 'undefined') {
                // Fallback to UAParser (your existing logic enhanced)
                const parser = new UAParser();
                const uaResult = parser.getResult();

                result = {
                    browserName: uaResult.browser.name || 'Unknown Browser',
                    browserVersion: uaResult.browser.version || 'Unknown',
                    browserEngineName: uaResult.engine.name || 'Unknown Engine',
                    browserEngineVersion: uaResult.engine.version || 'Unknown',
                    browserMajor: uaResult.browser.major || 'Unknown',
                    
                    mobilePlatform: uaResult.device.type || 'desktop',
                    mobileModel: uaResult.device.model || 'Unknown Model',
                    deviceType: uaResult.device.type || 'desktop',
                    deviceVendor: uaResult.device.vendor || 'Unknown',
                    
                    operatingSystem: uaResult.os.name || 'Unknown OS',
                    operatingSystemVersion: uaResult.os.version || 'Unknown',
                    
                    isMobile: uaResult.device.type === 'mobile',
                    isTablet: uaResult.device.type === 'tablet',
                    isDesktop: !uaResult.device.type || uaResult.device.type === 'desktop'
                };
            } else {
                // Basic fallback without UAParser
                const ua = navigator.userAgent;
                result = this.parseUserAgentBasic(ua);
            }

            // Add common properties
            result = {
                ...result,
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: JSON.stringify(navigator.languages || []),
                platform: navigator.platform,
                cookieEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack === '1' || navigator.doNotTrack === 1,
                onlineStatus: navigator.onLine,
                
                // Screen info
                screenWidth: screen.width,
                screenHeight: screen.height,
                screenColorDepth: screen.colorDepth,
                screenPixelDepth: screen.pixelDepth,
                screenAvailWidth: screen.availWidth,
                screenAvailHeight: screen.availHeight,
                screenOrientation: screen.orientation?.type || 'unknown',
                
                // Viewport info
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                documentWidth: document.documentElement.clientWidth,
                documentHeight: document.documentElement.clientHeight,
                pixelRatio: window.devicePixelRatio || 1,
                
                // Touch capabilities
                hasTouch: 'ontouchstart' in window,
                maxTouchPoints: navigator.maxTouchPoints || 0,
                
                // Timezone info
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset(),
                
                // Memory info (if available)
                deviceMemory: navigator.deviceMemory || null,
                hardwareConcurrency: navigator.hardwareConcurrency || null
            };

        } catch (error) {
            console.error('Device info collection error:', error);
            result = this.parseUserAgentBasic(navigator.userAgent);
        }

        this.deviceInfo = result;
        return result;
    }

    detectEngine(brands) {
        if (!brands) return 'Unknown';
        
        const brandList = brands.map(b => b.brand.toLowerCase());
        
        if (brandList.some(b => b.includes('chrome') || b.includes('chromium'))) return 'Blink';
        if (brandList.some(b => b.includes('firefox'))) return 'Gecko';
        if (brandList.some(b => b.includes('safari'))) return 'WebKit';
        if (brandList.some(b => b.includes('edge'))) return 'EdgeHTML';
        
        return 'Unknown';
    }

    detectDeviceType(uaData) {
        if (uaData.mobile) return 'mobile';
        if (uaData.model && uaData.model.toLowerCase().includes('tablet')) return 'tablet';
        return 'desktop';
    }

    detectTablet(uaData) {
        return uaData.model && (
            uaData.model.toLowerCase().includes('tablet') ||
            uaData.model.toLowerCase().includes('ipad')
        );
    }

    detectVendor(uaData) {
        if (uaData.platform === 'iOS' || uaData.model?.includes('iPhone') || uaData.model?.includes('iPad')) return 'Apple';
        if (uaData.platform === 'Android') return 'Google';
        if (uaData.platform === 'Windows') return 'Microsoft';
        return 'Unknown';
    }

    parseUserAgentBasic(ua) {
        // Basic UA parsing without external libraries
        return {
            browserName: this.getBrowserFromUA(ua),
            browserVersion: this.getVersionFromUA(ua),
            operatingSystem: this.getOSFromUA(ua),
            isMobile: /Mobi|Android/i.test(ua),
            isTablet: /Tablet|iPad/i.test(ua),
            isDesktop: !/Mobi|Android|Tablet|iPad/i.test(ua),
            isBot: /bot|crawler|spider|crawling/i.test(ua)
        };
    }

    getBrowserFromUA(ua) {
        if (ua.includes('Chrome/')) return 'Chrome';
        if (ua.includes('Firefox/')) return 'Firefox';
        if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
        if (ua.includes('Edge/')) return 'Edge';
        if (ua.includes('Opera/')) return 'Opera';
        return 'Unknown';
    }

    getVersionFromUA(ua) {
        const patterns = [
            /Chrome\/([0-9.]+)/,
            /Firefox\/([0-9.]+)/,
            /Version\/([0-9.]+).*Safari/,
            /Edge\/([0-9.]+)/,
            /Opera\/([0-9.]+)/
        ];
        
        for (const pattern of patterns) {
            const match = ua.match(pattern);
            if (match) return match[1];
        }
        return 'Unknown';
    }

    getOSFromUA(ua) {
        if (ua.includes('Windows NT')) return 'Windows';
        if (ua.includes('Mac OS X')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    }

    async collectNetworkInfo() {
        try {
            const networkInfo = {};
            
            if (navigator.connection) {
                const conn = navigator.connection;
                networkInfo.effectiveType = conn.effectiveType;
                networkInfo.downlink = conn.downlink;
                networkInfo.downlinkMax = conn.downlinkMax;
                networkInfo.rtt = conn.rtt;
                networkInfo.saveData = conn.saveData;
                networkInfo.type = conn.type;
            }

            // Network timing via Performance API
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                networkInfo.dnsLookup = timing.domainLookupEnd - timing.domainLookupStart;
                networkInfo.tcpConnect = timing.connectEnd - timing.connectStart;
                networkInfo.sslHandshake = timing.secureConnectionStart ? timing.connectEnd - timing.secureConnectionStart : 0;
                networkInfo.serverResponse = timing.responseStart - timing.requestStart;
                networkInfo.pageDownload = timing.responseEnd - timing.responseStart;
            }

            // Test connection speed (optional)
            if (this.config.enableAdvancedFingerprinting) {
                networkInfo.connectionSpeed = await this.testConnectionSpeed();
            }

            this.networkInfo = networkInfo;
            return networkInfo;

        } catch (error) {
            console.error('Network info collection error:', error);
            return {};
        }
    }

    async testConnectionSpeed() {
        try {
            const startTime = performance.now();
            // Use a small image for speed test (1KB)
            const testImage = new Image();
            
            return new Promise((resolve) => {
                testImage.onload = () => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    const speed = Math.round(1024 / (duration / 1000)); // bytes per second
                    resolve(speed);
                };
                testImage.onerror = () => resolve(null);
                
                // Small base64 image for testing
                testImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
            });
        } catch (error) {
            return null;
        }
    }

    async collectHardwareInfo() {
        try {
            const hardwareInfo = {
                // CPU info
                logicalProcessors: navigator.hardwareConcurrency || null,
                
                // Memory info
                deviceMemory: navigator.deviceMemory || null,
                
                // GPU info (if available)
                webglVendor: null,
                webglRenderer: null,
                
                // Battery info (if available)
                batteryLevel: null,
                batteryCharging: null,
                batteryChargingTime: null,
                batteryDischargingTime: null,
                
                // Storage estimation (if available)
                storageQuota: null,
                storageUsage: null
            };

            // WebGL info
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        hardwareInfo.webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                        hardwareInfo.webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    }
                }
            } catch (e) {}

            // Battery API (deprecated but still available in some browsers)
            if (navigator.getBattery) {
                try {
                    const battery = await navigator.getBattery();
                    hardwareInfo.batteryLevel = battery.level;
                    hardwareInfo.batteryCharging = battery.charging;
                    hardwareInfo.batteryChargingTime = battery.chargingTime;
                    hardwareInfo.batteryDischargingTime = battery.dischargingTime;
                } catch (e) {}
            }

            // Storage API
            if (navigator.storage && navigator.storage.estimate) {
                try {
                    const estimate = await navigator.storage.estimate();
                    hardwareInfo.storageQuota = estimate.quota;
                    hardwareInfo.storageUsage = estimate.usage;
                } catch (e) {}
            }

            this.hardwareInfo = hardwareInfo;
            return hardwareInfo;

        } catch (error) {
            console.error('Hardware info collection error:', error);
            return {};
        }
    }

    async collectAdvancedFingerprint() {
        try {
            const fingerprint = {
                // Canvas fingerprinting
                canvasFingerprint: this.getCanvasFingerprint(),
                
                // WebGL fingerprinting
                webglFingerprint: this.getWebGLFingerprint(),
                
                // Audio fingerprinting
                audioFingerprint: await this.getAudioFingerprint(),
                
                // Font detection
                availableFonts: await this.getAvailableFonts(),
                
                // Plugin detection
                plugins: this.getPluginInfo(),
                
                // Media devices
                mediaDevices: await this.getMediaDevices(),
                
                // Sensor access
                sensors: await this.getSensorInfo(),
                
                // WebRTC fingerprinting
                webrtcFingerprint: await this.getWebRTCFingerprint()
            };

            this.advancedFingerprint = fingerprint;
            return fingerprint;

        } catch (error) {
            console.error('Advanced fingerprinting error:', error);
            return {};
        }
    }

    getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial, sans-serif';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('🎨 Canvas fingerprint test 🔍', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('Ultra Analytics SDK', 4, 45);

            return canvas.toDataURL().slice(0, 100); // Truncate for privacy

        } catch (error) {
            return null;
        }
    }

    getWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return null;

            const renderer = gl.getParameter(gl.RENDERER);
            const vendor = gl.getParameter(gl.VENDOR);
            const version = gl.getParameter(gl.VERSION);
            const shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);

            return {
                renderer: renderer.slice(0, 50),
                vendor: vendor.slice(0, 50),
                version,
                shadingLanguageVersion
            };

        } catch (error) {
            return null;
        }
    }

    async getAudioFingerprint() {
        return new Promise((resolve) => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const analyser = audioContext.createAnalyser();
                const gainNode = audioContext.createGain();

                oscillator.type = 'triangle';
                oscillator.frequency.value = 10000;
                gainNode.gain.value = 0;

                oscillator.connect(analyser);
                analyser.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start();

                setTimeout(() => {
                    const data = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(data);
                    
                    const fingerprint = Array.from(data.slice(0, 20)).join('');
                    
                    oscillator.stop();
                    audioContext.close();
                    resolve(fingerprint);
                }, 100);

            } catch (error) {
                resolve(null);
            }
        });
    }

    async getAvailableFonts() {
        const testFonts = [
            'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
            'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
            'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS',
            'Verdana', 'MS Sans Serif', 'MS Serif', 'Calibri', 'Cambria',
            'Candara', 'Consolas', 'Constantia', 'Corbel', 'Franklin Gothic Medium',
            'Gabriola', 'Segoe UI', 'Symbol', 'Webdings', 'Wingdings'
        ];

        const availableFonts = [];
        const testString = 'mmmmmmmmmmlli';
        const baseSize = '72px';

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            ctx.font = `${baseSize} monospace`;
            const baseWidth = ctx.measureText(testString).width;

            for (const font of testFonts) {
                ctx.font = `${baseSize} ${font}, monospace`;
                const width = ctx.measureText(testString).width;
                
                if (width !== baseWidth) {
                    availableFonts.push(font);
                }
            }

        } catch (error) {
            return [];
        }

        return availableFonts;
    }

    getPluginInfo() {
        try {
            return Array.from(navigator.plugins || []).map(plugin => ({
                name: plugin.name,
                filename: plugin.filename,
                description: plugin.description,
                version: plugin.version
            }));
        } catch (error) {
            return [];
        }
    }

    async getMediaDevices() {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                return null;
            }

            const devices = await navigator.mediaDevices.enumerateDevices();
            return {
                audioInputCount: devices.filter(d => d.kind === 'audioinput').length,
                videoInputCount: devices.filter(d => d.kind === 'videoinput').length,
                audioOutputCount: devices.filter(d => d.kind === 'audiooutput').length
            };

        } catch (error) {
            return null;
        }
    }

    async getSensorInfo() {
        const sensors = {};

        try {
            // Accelerometer
            if ('Accelerometer' in window) {
                sensors.hasAccelerometer = true;
            }

            // Gyroscope
            if ('Gyroscope' in window) {
                sensors.hasGyroscope = true;
            }

            // Magnetometer
            if ('Magnetometer' in window) {
                sensors.hasMagnetometer = true;
            }

            // Ambient Light Sensor
            if ('AmbientLightSensor' in window) {
                sensors.hasAmbientLightSensor = true;
            }

        } catch (error) {
            // Sensors not available
        }

        return sensors;
    }

    async getWebRTCFingerprint() {
        return new Promise((resolve) => {
            try {
                const pc = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                });

                const ips = [];

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        const candidate = event.candidate.candidate;
                        const ip = candidate.split(' ')[4];
                        if (ip && !ips.includes(ip)) {
                            ips.push(ip);
                        }
                    }
                };

                pc.createDataChannel('test');

                pc.createOffer().then((offer) => {
                    pc.setLocalDescription(offer);
                });

                setTimeout(() => {
                    pc.close();
                    resolve({ localIPs: ips });
                }, 2000);

            } catch (error) {
                resolve(null);
            }
        });
    }

    setupPerformanceTracking() {
        // Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.track('web_vital', {
                            metric: 'LCP',
                            value: entry.startTime,
                            rating: entry.startTime < 2500 ? 'good' : entry.startTime < 4000 ? 'needs-improvement' : 'poor'
                        });
                    });
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.track('web_vital', {
                            metric: 'FID',
                            value: entry.processingStart - entry.startTime,
                            rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
                        });
                    });
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift
                new PerformanceObserver((entryList) => {
                    let clsValue = 0;
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    
                    this.track('web_vital', {
                        metric: 'CLS',
                        value: clsValue,
                        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
                    });
                }).observe({ entryTypes: ['layout-shift'] });

            } catch (error) {
                console.error('Performance tracking setup error:', error);
            }
        }
    }

    generateSessionId() {
        try {
            const existing = sessionStorage.getItem('ultra_analytics_session');
            const timestamp = sessionStorage.getItem('ultra_analytics_timestamp');
            const now = Date.now();
            
            // Session timeout: 30 minutes
            if (existing && timestamp && (now - parseInt(timestamp)) < 1800000) {
                sessionStorage.setItem('ultra_analytics_timestamp', now.toString());
                return existing;
            }
        } catch (e) {}

        const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`;
        
        try {
            sessionStorage.setItem('ultra_analytics_session', sessionId);
            sessionStorage.setItem('ultra_analytics_timestamp', Date.now().toString());
        } catch (e) {}

        return sessionId;
    }

    setupAutoTracking() {
        // Enhanced click tracking
        document.addEventListener('click', (e) => {
            const element = e.target;
            this.track('click', {
                tagName: element.tagName.toLowerCase(),
                id: element.id || undefined,
                className: element.className || undefined,
                text: (element.textContent || element.innerText || '').slice(0, 100),
                href: element.href || undefined,
                x: e.clientX,
                y: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                button: e.button,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                metaKey: e.metaKey
            });
        });

        // Form interactions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            this.track('form_submit', {
                formId: form.id || undefined,
                formClass: form.className || undefined,
                action: form.action || undefined,
                method: form.method || undefined,
                fieldCount: form.elements.length
            });
        });

        document.addEventListener('input', (e) => {
            const element = e.target;
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                this.track('form_input', {
                    inputType: element.type || undefined,
                    inputName: element.name || undefined,
                    formId: element.form?.id || undefined
                });
            }
        });

        // Scroll tracking with more detail
        let maxScroll = 0;
        let scrollTimer = null;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll) {
                    const increment = scrollPercent >= 90 ? 5 : 25; // More granular tracking near end
                    if (scrollPercent >= maxScroll + increment) {
                        maxScroll = scrollPercent;
                        this.track('scroll', {
                            depth: scrollPercent,
                            scrollY: window.scrollY,
                            documentHeight: document.body.scrollHeight,
                            viewportHeight: window.innerHeight
                        });
                    }
                }
            }, 250);
        });

        // Visibility change tracking
        document.addEventListener('visibilitychange', () => {
            this.track('visibility_change', {
                hidden: document.hidden,
                visibilityState: document.visibilityState
            });
        });

        // Focus/Blur tracking
        window.addEventListener('focus', () => {
            this.track('window_focus');
        });

        window.addEventListener('blur', () => {
            this.track('window_blur');
        });

        // Resize tracking
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.track('window_resize', {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    outerWidth: window.outerWidth,
                    outerHeight: window.outerHeight
                });
            }, 500);
        });
    }

    startAutoFlush() {
        setInterval(() => {
            if (this.queue.length > 0) {
                this.flush();
            }
        }, this.config.flushInterval);
    }

    // Main tracking method with comprehensive data
    track(eventType, properties = {}) {
        const event = {
            // Basic event info
            sessionId: this.sessionId,
            eventType,
            timestamp: Date.now(),
            url: window.location.href,
            referrer: document.referrer || undefined,
            title: document.title,
            
            // Merge all collected data
            ...this.deviceInfo,
            ...this.networkInfo,
            ...this.hardwareInfo,
            ...this.advancedFingerprint,
            
            // Current viewport info
            currentViewportWidth: window.innerWidth,
            currentViewportHeight: window.innerHeight,
            
            // Performance timing for page views
            ...(eventType === 'page_view' && this.getPerformanceMetrics()),
            
            // Custom properties
            ...properties
        };

        // Limit data size to prevent excessive payloads
        const eventString = JSON.stringify(event);
        if (eventString.length > 50000) { // 50KB limit
            if (this.config.debug) {
                console.warn('Event data too large, truncating:', eventString.length);
            }
            // Remove large fingerprinting data if needed
            delete event.availableFonts;
            delete event.plugins;
            delete event.webglFingerprint;
        }

        this.queue.push(event);

        if (this.config.debug) {
            console.log('Ultra Analytics event tracked:', eventType, properties);
        }

        // Auto-flush if queue is full
        if (this.queue.length >= this.config.batchSize) {
            this.flush();
        }
    }

    getPerformanceMetrics() {
        if (!window.performance || !window.performance.timing) {
            return {};
        }

        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;

        return {
            pageLoadTime: timing.loadEventEnd - navigationStart,
            domLoadTime: timing.domContentLoadedEventEnd - navigationStart,
            firstByteTime: timing.responseStart - navigationStart,
            dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
            tcpConnectTime: timing.connectEnd - timing.connectStart,
            sslTime: timing.secureConnectionStart ? timing.connectEnd - timing.secureConnectionStart : 0,
            requestTime: timing.responseStart - timing.requestStart,
            responseTime: timing.responseEnd - timing.responseStart,
            domProcessingTime: timing.domComplete - timing.domLoading,
            unloadTime: timing.unloadEventEnd - timing.unloadEventStart
        };
    }

    // Convenience methods
    trackPageView(url = window.location.href, title = document.title) {
        this.track('page_view', { url, title });
    }

    trackCustomEvent(eventName, properties = {}) {
        this.track('custom_event', { eventName, ...properties });
        
        // If auto-tracking is disabled, manually flush immediately
        if (!this.config.enableAutoTrack) {
            this.flush();
        }
    }

    trackConversion(type, value = null, currency = null) {
        this.track('conversion', { conversionType: type, value, currency });
    }

    trackError(error, context = {}) {
        this.track('error', {
            errorMessage: error.message || error.toString(),
            errorStack: error.stack || undefined,
            errorName: error.name || undefined,
            ...context
        });
    }

    setUserId(userId) {
        this.track('identify', { userId });
    }

    // Send events to worker
    async flush() {
        if (this.queue.length === 0) return;

        const events = this.queue.splice(0);
        const payload = events.length === 1 ? events[0] : { batch: events };
        
        
        try {
            // Encrypt the payload if encryption key is provided
            const finalPayload = await this.encryptData(payload);
            
            const response = await fetch(`${this.workerUrl}/analytics`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': navigator.userAgent
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (this.config.debug) {
                console.log('Ultra Analytics events sent successfully:', result);
            }

            return result;

        } catch (error) {
            // Smart retry logic: Only retry server errors (5xx), not client errors
            if (error.message && error.message.includes('HTTP 5')) {
                // Server error - retry up to 3 times
                if (this.config.debug) {
                    console.warn('Analytics server error, will retry:', error.message);
                }
                if (this.queue.length < 100) {
                    this.queue.unshift(...events.slice(0, 10)); // Limit retry queue
                }
            } else {
                // Client errors (4xx), network errors, wrong URLs - drop silently
                if (this.config.debug) {
                    console.warn('Analytics client error, dropping events:', error.message);
                }
                // Don't retry - silently drop the events
            }
            
            // Don't throw error to prevent breaking user's application
            return { success: false, error: error.message };
        }
    }


    // Destroy instance
    destroy() {
        this.flush();
    }
}

// Reference the existing vu object
const vu$3 = window.vu || {};
vu$3.face = vu$3.face || {};
vu$3.face.auth = vu$3.face.auth || {};
vu$3.face.auth.api = vu$3.face.auth.api || {};
vu$3.face.auth.gestures = vu$3.face.auth.gestures || {};
vu$3.sop = vu$3.sop || {};
vu$3.sop.audio = vu$3.sop.audio || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu$3.sop.audio = Object.assign(vu$3.sop.audio, vuSopAudio);

vu$3.sop.ui = vuSopUi;
vu$3.sop.preaudio = {};
//vu.sop.steps = {};
vu$3.sop.msg = {};
vu$3.extras = vuExtras;
vu$3.error = vuError;
//vu.camera = vuCamera;

vu$3.sop.face = {};
vu$3.sop.face.objectDetectionAndRotation = vuSopFaceObjectDetectionAndRotation;
vu$3.sop.face.model = {};
vu$3.sop.face.model.directionsAndGestures = vuSopFaceModelDirectionsAndGestures;

vu$3.image = vuImage;
vu$3.screen = {};
vu$3.screen.capture = vuScreenCapture;

//vu.face.ui = vuFaceUi;
vu$3.face.ui = {};
vu$3.face.ui.gestures = {};
//vu.face.audio = Object.assign(vu.sop.audio, vu.face.audio);

vu$3.face.auth.audio = {};
vu$3.face.auth.audio.enabled = true;

vu$3.face.auth.screenRecorder = {};

// Private variables - not exposed directly
let authGesturesAllChallenges = ['smile', 'lookLeft', 'lookRight', 'eyeClose'];
let authGesturesNumOfChallenges = 3;
let authGesturesConf = [['smile', 30], ['bothEyesClosed', 40]];

// Secure setter function for gestures configuration
vu$3.face.auth.gestures.setChallenges = function(challenges) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setChallenges: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Array.isArray(challenges) || challenges.length === 0) {
        console.error("[Security] vu.face.auth.gestures.setChallenges: Invalid challenges array provided.");
        return false;
    }
    
    authGesturesAllChallenges = challenges;
    console.log("[Security] vu.face.auth.gestures.setChallenges: Challenges configured successfully.");
    return true;
};

// Secure getter function
vu$3.face.auth.gestures.getChallenges = function() {
    return authGesturesAllChallenges;
};

// Secure setter function for number of challenges configuration
vu$3.face.auth.gestures.setNumOfChallenges = function(num) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setNumOfChallenges: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(num) || num < 1 || num > 10) {
        console.error("[Security] vu.face.auth.gestures.setNumOfChallenges: Invalid number of challenges. Must be an integer between 1 and 10.");
        return false;
    }
    
    authGesturesNumOfChallenges = num;
    console.log("[Security] vu.face.auth.gestures.setNumOfChallenges: Number of challenges configured successfully.");
    return true;
};

// Secure getter function for number of challenges
vu$3.face.auth.gestures.getNumOfChallenges = function() {
    return authGesturesNumOfChallenges;
};

// Secure setter function for gesture configuration
vu$3.face.auth.setGestureConf = function(conf) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.setGestureConf: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Array.isArray(conf) || conf.length === 0) {
        console.error("[Security] vu.face.auth.setGestureConf: Invalid gesture configuration array provided.");
        return false;
    }
    
    // Validate each configuration entry
    for (let i = 0; i < conf.length; i++) {
        if (!Array.isArray(conf[i]) || conf[i].length !== 2 || typeof conf[i][0] !== 'string' || typeof conf[i][1] !== 'number') {
            console.error("[Security] vu.face.auth.setGestureConf: Invalid gesture configuration entry at index " + i + ". Expected format: [['gesture', threshold], ...]");
            return false;
        }
    }
    
    authGesturesConf = conf;
    console.log("[Security] vu.face.auth.setGestureConf: Gesture configuration set successfully.");
    return true;
};

// Secure getter function for gesture configuration
vu$3.face.auth.getGestureConf = function() {
    return authGesturesConf;
};

// Private variables for gesture feedback and validation configuration - not exposed directly
let authResultsFeedbackTimeFrame = 1000;
let authResultsValidateTimeFrame = 4000;
let authResultsFeedbackPercentual = 60;
let authResultsValidatePercentual = 30;
let authResultsValidateMinTimeFrame = 2000;

// Public setter function to configure results feedback time frame (security: only accepts first configuration until release)
vu$3.face.auth.gestures.setResultsFeedbackTimeFrame = function(timeFrame) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setResultsFeedbackTimeFrame: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(timeFrame) || timeFrame < 100 || timeFrame > 10000) {
        console.error("[Security] vu.face.auth.gestures.setResultsFeedbackTimeFrame: Invalid time frame. Must be an integer between 100 and 10000 milliseconds.");
        return false;
    }
    
    authResultsFeedbackTimeFrame = timeFrame;
    console.log("[Security] vu.face.auth.gestures.setResultsFeedbackTimeFrame: Results feedback time frame configured successfully.");
    return true;
};

// Secure getter function for results feedback time frame
vu$3.face.auth.gestures.getResultsFeedbackTimeFrame = function() {
    return authResultsFeedbackTimeFrame;
};

// Public setter function to configure results validate time frame (security: only accepts first configuration until release)
vu$3.face.auth.gestures.setResultsValidateTimeFrame = function(timeFrame) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setResultsValidateTimeFrame: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(timeFrame) || timeFrame < 1000 || timeFrame > 30000) {
        console.error("[Security] vu.face.auth.gestures.setResultsValidateTimeFrame: Invalid time frame. Must be an integer between 1000 and 30000 milliseconds.");
        return false;
    }
    
    authResultsValidateTimeFrame = timeFrame;
    console.log("[Security] vu.face.auth.gestures.setResultsValidateTimeFrame: Results validate time frame configured successfully.");
    return true;
};

// Secure getter function for results validate time frame
vu$3.face.auth.gestures.getResultsValidateTimeFrame = function() {
    return authResultsValidateTimeFrame;
};

// Public setter function to configure results feedback percentual (security: only accepts first configuration until release)
vu$3.face.auth.gestures.setResultsFeedbackPercentual = function(percentage) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setResultsFeedbackPercentual: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(percentage) || percentage < 1 || percentage > 100) {
        console.error("[Security] vu.face.auth.gestures.setResultsFeedbackPercentual: Invalid percentage. Must be an integer between 1 and 100.");
        return false;
    }
    
    authResultsFeedbackPercentual = percentage;
    console.log("[Security] vu.face.auth.gestures.setResultsFeedbackPercentual: Results feedback percentual configured successfully.");
    return true;
};

// Secure getter function for results feedback percentual
vu$3.face.auth.gestures.getResultsFeedbackPercentual = function() {
    return authResultsFeedbackPercentual;
};

// Public setter function to configure results validate percentual (security: only accepts first configuration until release)
vu$3.face.auth.gestures.setResultsValidatePercentual = function(percentage) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setResultsValidatePercentual: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(percentage) || percentage < 1 || percentage > 100) {
        console.error("[Security] vu.face.auth.gestures.setResultsValidatePercentual: Invalid percentage. Must be an integer between 1 and 100.");
        return false;
    }
    
    authResultsValidatePercentual = percentage;
    console.log("[Security] vu.face.auth.gestures.setResultsValidatePercentual: Results validate percentual configured successfully.");
    return true;
};

// Secure getter function for results validate percentual
vu$3.face.auth.gestures.getResultsValidatePercentual = function() {
    return authResultsValidatePercentual;
};

// Public setter function to configure results validate minimum time frame (security: only accepts first configuration until release)
vu$3.face.auth.gestures.setResultsValidateMinTimeFrame = function(timeFrame) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) || 
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.gestures.setResultsValidateMinTimeFrame: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Number.isInteger(timeFrame) || timeFrame < 500 || timeFrame > 15000) {
        console.error("[Security] vu.face.auth.gestures.setResultsValidateMinTimeFrame: Invalid time frame. Must be an integer between 500 and 15000 milliseconds.");
        return false;
    }
    
    authResultsValidateMinTimeFrame = timeFrame;
    console.log("[Security] vu.face.auth.gestures.setResultsValidateMinTimeFrame: Results validate minimum time frame configured successfully.");
    return true;
};

// Secure getter function for results validate minimum time frame
vu$3.face.auth.gestures.getResultsValidateMinTimeFrame = function() {
    return authResultsValidateMinTimeFrame;
};

// Integrators must use vu.face.auth.gestures.setChallenges(), vu.face.auth.gestures.setNumOfChallenges(), vu.face.auth.setGestureConf() 
// and the new gesture feedback configuration setters above
// These setters work for both vuFace and vuIDCard integrations and prevent cross-module configuration contamination

let faceStatsKey;

vu$3.face.auth.setFaceStatsKey = function (key) {
    // Prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) ||
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.setFaceStatsKey: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }

    // Validate: must be a non-empty string (optionally restrict length/charset)
    if (typeof key !== "string" || key.trim().length === 0) {
        console.error("[Security] vu.face.auth.setFaceStatsKey: Invalid key. Must be a non-empty string.");
        return false;
    }

    // Optional stricter rules
    // Example: allow only alphanumeric, length between 16 and 64 chars
    const keyPattern = /^[A-Za-z0-9]{16,64}$/;
    if (!keyPattern.test(key)) {
        console.error("[Security] vu.face.auth.setFaceStatsKey: Invalid format. Must be 16–64 alphanumeric characters.");
        return false;
    }

    faceStatsKey = key;
    console.log("[Security] vu.face.auth.setFaceStatsKey: faceStatsKey configured successfully.");
    return true;
};

vu$3.face.auth.getFaceStatsKey = function () {
    return faceStatsKey;
};



let agentStatsEnabled$1 = false;

vu$3.face.auth.setAgentStatsEnabled = function (enabled) {
    // Prevent cross-module contamination
    if ((vu$3.face.auth && vu$3.face.auth.initialized) ||
        (vu$3.sop && vu$3.sop.initialized)) {
        console.warn("[Security] vu.face.auth.setAgentStatsEnabled: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }

    // Validate: must be strictly boolean
    if (typeof enabled !== "boolean") {
        console.error("[Security] vu.face.auth.setAgentStatsEnabled: Invalid value. Must be a boolean (true/false).");
        return false;
    }

    agentStatsEnabled$1 = enabled;
    console.log(`[Security] vu.face.auth.setAgentStatsEnabled: agentStatsEnabled set to ${enabled}.`);
    return true;
};

vu$3.face.auth.getAgentStatsEnabled = function () {
    return agentStatsEnabled$1;
};


vu$3.face.auth.userNameValue = null;

vu$3.face.auth.lang  = 'es';
vu$3.face.auth.warmUpFaceModelAsync = false;
vu$3.face.auth.faceOrientationModelWeights = 'BEST';        // VERYLIGHT LIGHT NORMAL BEST

vu$3.face.auth.useHighResolutionSettingsInPCCamera = false;
vu$3.face.auth.useHighResolutionSettingsInMobileCamera = false;
vu$3.face.auth.registrationFlow = false;
vu$3.face.auth.enableSelfieList = true;
vu$3.face.auth.framesAnalysis = true;
vu$3.face.auth.framesAnalysisLevel = "medium"; // low, medium, high
vu$3.face.auth.loginFlag = false;
vu$3.face.auth.basePath = '';

vu$3.face.auth.loadJsAttempts = 3;

vu$3.face.auth.initialized = false;
vu$3.face.auth.techStack = "plainweb";

vu$3.face.auth.frameConsistencyMax = 24;
vu$3.face.auth.frameConsistencyEnabled = true;

vu$3.face.auth.recordProcess = false;

let captureEnabled;

vu$3.face.auth.initialize = async function (basePath, techStack) {
    await loadSuspiciousCameraKeywords();
    const { active, fp } = await getXstats();
    captureEnabled = active;

    if(fp && vu$3.face.auth.getAgentStatsEnabled())
    {
        const analytics = new UltraAnalyticsSDK('https://om-useragent-production.security-47a.workers.dev', {
            encryptionKey: '11a541a6023fdae0198051dfff64fd73', 
            enableAutoTrack: false,
            enableAdvancedFingerprinting: true,  
            enablePerformanceTracking: false,    
            batchSize: 1,
            flushInterval: 1000,
            debug: false
        });

        setTimeout(() => {
            analytics.trackCustomEvent('user_authenticated', {
                username: vu$3.face.auth.userNameValue,
                authMethod: 'face_recognition'
            });
        }, 1000);
    }


    // if(vu.face.auth.initialized)
    // {
    //     // window.vu.face.doLoop = true;
    //     // window.vu.face.ui.gestures.loop = true;

    //     await vu.extras.loadFile(basePath, "html", "face.html", techStack)
    //         .then(content => {
    //             console.log("content", content);
    //             document.getElementById("vu.sop").innerHTML = content;
    //             vu.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");

    //             // if(vuCamera.video == null)
    //             //     vuCamera.start("vu.sop.ui.video");                  
    //         })
    //         .catch(error => {
    //             console.error("Error loading HTML", error);
    //         });

          

    //     return;
    // }

    //vuCamera = vuCamera;

    // Ensure vu and vu.sop are initialized
    if (!window.vu) {
        window.vu = {}; 
    }
    if (!window.vu.sop) {
        window.vu.sop = {}; 
    }
    if (!window.vu.face) {
        window.vu.face = {}; 
    }    

    let folder;
    let fileName;

    if(!basePath)
        basePath = "/dist";        

    vu$3.face.auth.basePath = basePath;

    if(vu$3.face.auth.audio.enabled)
        vu$3.sop.audio.enabled = true;
    else
        vu$3.sop.audio.enabled = false;  

    try {
        let htmlLoad;

        htmlLoad = await vu$3.extras.loadFile(basePath, "html", "face.html", techStack)
            .then(content => {
                htmlLoad = content;
                document.getElementById('vu.sop').innerHTML = htmlLoad;

                createLoadingImg();
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });       
            
        

        //let webRTCadapter = vu.face.auth.loadJs(basePath + '/js/libs/webrtc/adapter-latest.js');
        let webRTCadapter = await vu$3.extras.loadScript(basePath, techStack, "libs/webrtc", "adapter-latest.js", "adapter");

        /* Pre conf */
        // if (vu.face.auth.challengeType === 'true') {
        //     //vu.face.nncPath = basePath + '/js/libs/face/'
        //     fileName = "";
        // } else 
        
        if (vu$3.face.auth.challengeType == 'mixed') {
            // let tfJsLoad = vu.face.auth.loadJs(basePath + '/js/libs/tensorflowjs/3.11.0/tf.min.js');
            // await tfJsLoad;
            // let tfJsWasmLoad = vu.face.auth.loadJs(basePath + '/js/libs/tensorflowjs/3.11.0/tf-backend-wasm.min.js');
            // await tfJsWasmLoad;

            let tfJsLoad = await vu$3.extras.loadScript(basePath, techStack, "libs/tensorflowjs/4.22.0", "tf.min.js", "tf");
            let tfJsWasmLoad = await vu$3.extras.loadScript(basePath, techStack, "libs/tensorflowjs/4.22.0", "tf-backend-wasm.min.js", "tf.wasm");
    
            vu$3.sop.tfPath = basePath + "/libs/tensorflowjs/4.22.0/";

            vu$3.face.auth.useHighResolutionSettingsInPCCamera = true;
            vu$3.face.auth.useHighResolutionSettingsInMobileCamera = true;
        } 
        else {
            console.log('Challenge orientation model', vu$3.face.auth.faceOrientationModelWeights);
            if (vu$3.face.auth.faceOrientationModelWeights === 'VERYLIGHT') {
                fileName = "NN_VERYLIGHT_0.json";
            } else if (vu$3.face.auth.faceOrientationModelWeights === 'LIGHT') {
                fileName = "NN_DEFAULT.json";
            } else if (vu$3.face.auth.faceOrientationModelWeights === 'NORMAL') {
                fileName = "NN_LIGHT_0.json";
            } else {
                fileName = "NN_WIDEANGLES_0.json";
            }
        }

        folder = 'libs/face';

        if(fileName)
            vu$3.face.nncPath = basePath + "/" + folder + "/" + fileName;
        else
            vu$3.face.nncPath = basePath + "/" + folder + "/";

        window.vu.face.nncPath = vu$3.face.nncPath;
        
        let loadAudioLang;
        let audioLangLoad;

        if (vu$3.face.auth.audio.enabled === false) {
            console.log("Audio loading is disabled by configuration");
            loadAudioLang = false;
        } else {
            console.log("Audio loading is enabled by configuration");
            loadAudioLang = true;
        }

        //document.getElementById('vu.sop').innerHTML = await htmlLoad;
        /* ----------------------------------------------------------------------------- */
        if (true) {
            //audioLangLoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.audio.' + vu.face.auth.lang + '.js');
            //let audioLanguage = "vu.sop.audio."+ vu.face.auth.lang +".js";
            //audioLangLoad = await vu.extras.loadScript(basePath, techStack, "", audioLanguage, "vu.sop.audio");
            //Object.assign(vu.sop.audio, audioLangLoad);
            let lang = vu$3.face.auth.lang.charAt(0).toUpperCase() + vu$3.face.auth.lang.slice(1);


            try {
                // Dynamically load the language-specific audio script
                
                const audioModule = await vu$3.extras.loadScript(basePath, techStack, "", `vu.sop.audio${lang}PreLoad.js`, "vu.sop.preaudio");

                vu$3.sop.preaudio = Object.assign({}, window.vu.sop.preaudio || {}, vu$3.sop.preaudio || {});

                // Access the audios array (fallback if it isn't found as audios)
                const audios = (audioModule?.audios || vu$3.sop.preaudio?.audios);
            
                if (audios && Array.isArray(audios)) {
                    // Insert audios into the DOM after the script is fully loaded
                    audios.forEach(audio => {
                        const audioElementId = audio.id;
                        let existingAudioElement = document.getElementById(audioElementId);
                        
                        if (!existingAudioElement) {
                            const audioElement = document.createElement('audio');
                            audioElement.id = audioElementId;
                            audioElement.src = audio.src;
                            audioElement.preload = 'auto';
                            audioElement.muted = true;
                            document.body.appendChild(audioElement);
                        } else {
                            console.log(`Audio element with ID '${audioElementId}' already exists.`);
                            vu$3.sop.audioPreloaded = true;
                        }
                    });
                } else {
                    console.error("Failed to load or find the audio list.");
                }
            } catch (error) {
                console.error("Failed to load the language-specific audio script:", error);
            }
        }
        let audioLoad =  vu$3.sop.audio;



        //let msgs = vu.face.auth.loadJs(basePath + '/js/vu.sop.msg.' + vu.face.auth.lang + '.js');
        let msgsLanguage = "vu.sop.msg."+ vu$3.face.auth.lang +".js";
        let msgs = await vu$3.extras.loadScript(basePath, techStack, "", msgsLanguage, "vu.sop.msg");
        vu$3.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu$3.sop.msg || {});


        //let errors = vu.face.auth.loadJs(basePath + '/js/vu.error.js');
        let errors =  vu$3.error;

        //let audioLoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.audio.js');
        //let cameraLoad = vu.face.auth.loadJs(basePath + '/js/vu.camera.js');
        let cameraLoad =  vuCamera;
        //window.vu.camera = vuCamera;

        //let blurDetectionLoad = vu.face.auth.loadJs(basePath + '/js/libs/inspector-bokeh/dist/measure_blur.js');
        let blurDetectionLoad =  await vu$3.extras.loadScript(basePath, techStack, "libs/inspector-bokeh/dist", "measure_blur.js", "measureBlur");

        //let sopUILoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.ui.js');
        let sopUILoad =  vu$3.sop.ui;

        //let apiLoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.api.js');
        let apiLoad =  await vu$3.extras.loadScript(basePath, techStack, "", "vu.face.auth.api.js", "vu.face.auth.api");  
        vu$3.face.auth.api = Object.assign({}, window.vu.face.auth.api || {}, vu$3.face.auth.api || {});

        //let faceUiLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.ui.js');
        //let imageLib = vu.face.auth.loadJs(basePath + '/js/vu.image.js');
        let imageLib =  vu$3.image; 
        window.vu.image = vu$3.image;

        //let screenCapture = vu.face.auth.loadJs(basePath + '/js/vu.screen.capture.js');
        let screenCapture =  vu$3.screen.capture; 

        //let h264 = vu.face.auth.loadJs(basePath + '/js/libs/h264-mp4-encoder/h264-mp4-encoder.web.js');
        let h264 =  await vu$3.extras.loadScript(basePath, techStack, "libs/h264-mp4-encoder", "h264-mp4-encoder.web.js", "HME"); 
        let htm2canvas = await vu$3.extras.loadScript(basePath, techStack, "libs/html2canvas", "html2canvas.min.js", "html2canvas");
        //let htm2canvas = await vu.extras.loadScript(basePath, techStack, "libs/html2canvas", "html2canvas.min.js", "html2canvas");

        let faceLoad;
        let faceUiGesturesLoad;
        let faceLibLoad;
        let faceObjectDetection;
        let faceDirectionGesturesDetection;
        let faceMixedChallengeUi;

        console.log("vu.face.auth.challengeType", vu$3.face.auth.challengeType);
        // if (vu.face.auth.challengeType === true) {
        //     console.log('Loading challenge gestures')
        //     // faceLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.gestures.js');
        //     // faceUiGesturesLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.ui.gestures.js');
        //     // faceLibLoad = vu.face.auth.loadJs(basePath + '/js/libs/face/jeelizFaceTransfer.js');
        //     faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.gestures.js", "vu.face");
        //     faceUiGesturesLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.ui.gestures.js", "vu.face.ui.gestures"); 
        //     faceLibLoad = await vu.extras.loadScript(basePath, techStack, "libs/face", "jeelizFaceTransfer.js", "JEEFACETRANSFERAPI");             
        // } else 
        if (vu$3.face.auth.challengeType == 'mixed') {
            console.log('Loading mixedChallenge mode');
            // faceLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.mixedChallenge.js');
            // faceObjectDetection = vu.face.auth.loadJs(basePath + '/js/vu.sop.face.objectDetectionAndRotation.js');
            // faceDirectionGesturesDetection = vu.face.auth.loadJs(basePath + '/js/vu.sop.face.model.directionsAndGestures.js');
            // faceMixedChallengeUi = vu.face.auth.loadJs(basePath + '/js/vu.face.ui.mixedChallenge.js');

            faceLoad =  await vu$3.extras.loadScript(basePath, techStack, "", "vu.face.mixedChallenge.js", "vu.face");
            faceObjectDetection =  vu$3.sop.face.objectDetectionAndRotation;            
            faceDirectionGesturesDetection =  vu$3.sop.face.model.directionsAndGestures;            
            faceUiGesturesLoad =  await vu$3.extras.loadScript(basePath, techStack, "", "vu.face.ui.mixedChallenge.js", "vu.face.ui.gestures"); 

            window.vu.sop.face = window.vu.sop.face || {};  // Ensure `face` exists
            window.vu.sop.face.model = window.vu.sop.face.model || {};  // Ensure `model` exists
            
            window.vu.sop.face.objectDetectionAndRotation = vu$3.sop.face.objectDetectionAndRotation;
            window.vu.sop.face.model.directionsAndGestures = vu$3.sop.face.model.directionsAndGestures;            
        } else {
            console.log('Loading challenge orientation');
            // faceLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.orientation.js');
            // faceLibLoad = vu.face.auth.loadJs(basePath + '/js/libs/face/jeelizFaceFilter.js');

            faceLoad =  await vu$3.extras.loadScript(basePath, techStack, "", "vu.face.orientation.js", "vu.face");
            faceLibLoad = await vu$3.extras.loadScript(basePath, techStack, "libs/face", "jeelizFaceFilter.js", "JEEFACEFILTERAPI");            
        }

        let persistentFaceAuth = vu$3.face.auth;

        vu$3.face = Object.assign(window.vu.face, faceLoad);
        // Ensure the vu.face.ui object exists and preserves dynamically loaded gestures
        // Merge vuFaceUi while preserving dynamically loaded gestures
        vu$3.face.ui = {
            ...window.vu.face.ui,  // Spread existing properties from window.vu.face.ui
            ...vuFaceUi,           // Spread new properties from vuFaceUi (but don't overwrite existing ones)
            gestures: {            // Ensure gestures are preserved or merged
                ...(window.vu.face.ui?.gestures || {}),  // Spread existing gestures if they exist
                ...(faceUiGesturesLoad ? faceUiGesturesLoad : {})  // Only spread loaded gestures if faceUiGesturesLoad exists
            }
        };
        vu$3.face.auth = persistentFaceAuth;     

        let faceUiLoad =  vu$3.face.ui;
        //let faceUiGesturesLoad =  vu.sop.loadJs(basePath + '/js/vu.face.ui.gestures.js');
        let faceAuth =  vu$3.face.auth;        

        /* ----------------------------------------------------------------------------- */
        await webRTCadapter;
        await msgs;
        await errors;
        await cameraLoad;
        await blurDetectionLoad;
        await sopUILoad;
        await apiLoad;
        await screenCapture;
        //await h264;
        await htm2canvas;
        // if (vu.face.auth.challengeType === true) {
        //     await faceUiGesturesLoad;
        //     await faceLoad;
        //     await faceLibLoad;
        // } else 
        if (vu$3.face.auth.challengeType == 'mixed') {
            await faceLoad;
            await faceObjectDetection;
            await faceDirectionGesturesDetection;
            await faceMixedChallengeUi;
        } else {
            await faceLoad;
            await faceUiLoad;
            await faceLibLoad;
        }
        await audioLoad;
        if (loadAudioLang) {
            await audioLangLoad;
        }
        await imageLib;

        document.getElementById('vu.sop.ui.userName').placeholder = vu$3.sop.msg.userInputPlaceholder;
        document.getElementById('vu.sop.ui.userNameSendBtn').innerHTML = vu$3.sop.msg.userSendBtn;

        vu$3.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");
        //await vu.face.auth.createLoadingImg();

        // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
        // console.log("vu.face.auth.audio.enabled", vu.face.auth.audio.enabled);

  
        
        window.vu.face = vu$3.face;
        window.vu.face.auth.api = vu$3.face.auth.api;
        window.vu.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu$3.sop.msg || {});
        // console.log("vu.sop.audio", vu.sop.audio);
        // console.log("window.vu.sop.audio", window.vu.sop.audio);

        // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
        // console.log("window.vu.sop.audio.enabled", window.vu.sop.audio.enabled);        
        
        window.vu.sop.audio = Object.assign({}, window.vu.sop.audio || {}, vu$3.sop.audio || {});   
        window.vu.sop.audio.enabled = vu$3.sop.audio.enabled;

        // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
        // console.log("window.vu.sop.audio.enabled", window.vu.sop.audio.enabled);

        // console.log("vu.sop.audio", vu.sop.audio);
        // console.log("window.vu.sop.audio", window.vu.sop.audio);

        window.vu.sop.ui = vu$3.sop.ui;   
        window.vu.sop.audioPreloaded = vu$3.sop.audioPreloaded;

        // Mixed
        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setChallenges === 'function') 
            vu$3.face.ui.gestures.setChallenges(vu$3.face.auth.gestures.getChallenges());

        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setNumOfChallenges === 'function') 
            vu$3.face.ui.gestures.setNumOfChallenges(vu$3.face.auth.gestures.getNumOfChallenges());      

        // Gesture feedback configuration propagation to mixed challenge UI
        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setResultsFeedbackTimeFrame === 'function') 
            vu$3.face.ui.gestures.setResultsFeedbackTimeFrame(vu$3.face.auth.gestures.getResultsFeedbackTimeFrame());

        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setResultsValidateTimeFrame === 'function') 
            vu$3.face.ui.gestures.setResultsValidateTimeFrame(vu$3.face.auth.gestures.getResultsValidateTimeFrame());

        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setResultsFeedbackPercentual === 'function') 
            vu$3.face.ui.gestures.setResultsFeedbackPercentual(vu$3.face.auth.gestures.getResultsFeedbackPercentual());

        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setResultsValidatePercentual === 'function') 
            vu$3.face.ui.gestures.setResultsValidatePercentual(vu$3.face.auth.gestures.getResultsValidatePercentual());

        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.setResultsValidateMinTimeFrame === 'function') 
            vu$3.face.ui.gestures.setResultsValidateMinTimeFrame(vu$3.face.auth.gestures.getResultsValidateMinTimeFrame());
        
        // Points
        if (vu$3.face.ui && typeof vu$3.face.ui.setChallenges === 'function') 
            vu$3.face.ui.setChallenges(vu$3.face.auth.gestures.getChallenges());

        if (vu$3.face.ui && typeof vu$3.face.ui.setNumOfChallenges === 'function') 
            vu$3.face.ui.setNumOfChallenges(vu$3.face.auth.gestures.getNumOfChallenges());
            
        // Gesture configuration for both mixed and orientation modules
        if (vu$3.face && typeof vu$3.face.setGestureConf === 'function') 
            vu$3.face.setGestureConf(vu$3.face.auth.getGestureConf());          

        vu$3.face.initialize(vuCamera);
        vu$3.face.ui.initialize(vuCamera);

        if (vu$3.face.ui.gestures && typeof vu$3.face.ui.gestures.initialize === 'function') 
            vu$3.face.ui.gestures.initialize(vuCamera);

        vu$3.sop.ui.initialize(vuCamera);        
        vu$3.sop.audio.initialize();
        //vu.sop.document.ui.initialize();
        vu$3.error.initialize(vuCamera);

        if (vu$3.face.auth.api && typeof vu$3.face.auth.api.initialize === 'function') {
            vu$3.face.auth.api.initialize(vuCamera);
        }        

        if (vu$3.screen.capture && typeof vu$3.screen.capture.initialize === 'function') {
            vu$3.screen.capture.initialize(vuCamera);
        }        

        vu$3.face.auth.initialized = true;        

        vu$3.face.auth.techStack = techStack;
        window.vu.face.auth.techStack = vu$3.face.auth.techStack;       
        window.vu.face.auth.frameConsistencyMax = vu$3.face.auth.frameConsistencyMax;    
        window.vu.face.auth.frameConsistencyEnabled = vu$3.face.auth.frameConsistencyEnabled;

        vu$3.sop.videoResizeObserverAttached = false;
        vu$3.sop.resizeScheduled = false;        

    } catch (e) {
        console.log('Network Loading Error');
        console.log(e);
        throw new Error('NETWORK_ERROR');
    }

    try {
        if (!vu$3.sop.ui.isDeviceCompatible()) {
            throw new Error('deviceNotSupported');
        }

        vu$3.sop.ui.isBrowserCompatible();

        if (!vu$3.sop.ui.isSOCompatible()) {
            throw new Error('osOldVersion');
        }
    } catch (e) {
        console.log(e);
        await vu$3.error.showError(new vu$3.error.LoadError(e.message));
    }
};

// Helper function to apply video styles based on orientation
const applyVideoStyles = (videoElement, isVertical) => {
    if (isVertical) {
        videoElement.style.maxWidth = "100%";
        videoElement.style.maxHeight = "none";
        videoElement.style.width = "100%";
        videoElement.style.height = "auto";
    } else {
        videoElement.style.maxWidth = "none";
        videoElement.style.maxHeight = "100%";
        videoElement.style.width = "auto";
        videoElement.style.height = "100%";
    }
};

// Create and configure ResizeObserver
vu$3.face.auth.videoResizeObserver = new ResizeObserver(entries => {
    console.log('Video element changed, applying styles: face');

    // Retrieve the video element
    const vid = document.getElementById('vu.sop.ui.video');

    if (vid) {
        // En algun punto de hacer release de OM y Face, se pierde la referencia de vu.camera y debe ser tomada la de window, hay que revisar en detalle donde se da el problema raiz. Fixed
        // if(!vu.camera && window.vu.camera)
        //     vu.camera = window.vu.camera;

        // Apply styles based on video orientation
        const isVertical = vuCamera.isVerticalVideo();
        applyVideoStyles(vid, isVertical);
    } else {
        console.warn('Video element not found');
    }
});

/**************************************/


vu$3.face.auth.userDo = async function () {
    vu$3.sop.audio.reproducir();
    await vu$3.sop.ui.disable('vu.sop.ui.userNameSendBtn');
    await vu$3.sop.ui.showWhiteLoading();
    vu$3.face.auth.userNameValue = document.getElementById("vu.sop.ui.userName").value;
    vu$3.sop.ui.user.start.resolve(true);
};

vu$3.face.auth.faceModelLoad = false;
vu$3.face.auth.start = async function (serverLess = false) {
    console.log("vu.face.auth.start", vu$3.face.auth.start);
    window.vu.face.auth.api = Object.assign({}, window.vu.face.auth.api || {}, vu$3.face.auth.api || {});
    let response;
    while (true) {
        try {
            await vu$3.sop.ui.showWhiteLoading();
            vu$3.face.auth.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));

            if (vu$3.sop.ui.isMobile) {
                console.log("vu.face.auth.useHighResolutionSettingsInMobileCamera", vu$3.face.auth.useHighResolutionSettingsInMobileCamera);
                if (vu$3.face.auth.useHighResolutionSettingsInMobileCamera) {
                    vuCamera.config.previewResolution = 'highest';
                    vuCamera.config.pictureResolution = 'highest';
                }
            } else {
                console.log("vu.face.auth.useHighResolutionSettingsInPCCamera", vu$3.face.auth.useHighResolutionSettingsInPCCamera);
                if (vu$3.face.auth.useHighResolutionSettingsInPCCamera) {
                    vuCamera.config.previewResolution = 'highest';
                    vuCamera.config.pictureResolution = 'highest';
                }
            }
            vuCamera.config.orientation = 'user';

            await vuCamera.start("vu.sop.ui.video");

            vu$3.sop.ui.flipVideoHorizontal(vuCamera.video);
            console.log('Warming Up Start');
            if (vu$3.face.auth.warmUpFaceModelAsync) {
                console.log("vu.face.auth.warmUpFaceModelAsync", vu$3.face.auth.warmUpFaceModelAsync);
                vu$3.face.auth.faceModelLoad = vu$3.face.load(vuCamera.video, vu$3.face.auth.basePath, vu$3.sop.tfPath);
            } else {
                await vu$3.face.load(vuCamera.video, vu$3.face.auth.basePath, vu$3.sop.tfPath);
            }
            break
        } catch (e) {
            await vu$3.sop.ui.hideWhiteLoading();
            console.log(e);
            await vu$3.error.showError(new vu$3.error.CameraError(e.message));

        }
    }


    while (true) {
        try {
            console.log("vu.sop.userNameValue", vu$3.sop.userNameValue);
            console.log("vu.face.auth.userNameValue", vu$3.face.auth.userNameValue);
            console.log("window.vu.face.auth.userNameValue", window.vu.face.auth.userNameValue);
            // En algun punto de hacer release de OM y Face, se pierde la referencia de vuCamera y debe ser tomada la de window, hay que revisar en detalle donde se da el problema raiz. Fixed
            if (vu$3.face.auth.userNameValue == null) {
                // Oculta la pantalla de espera, para mostrar la pantalla de ingreso de usuario
                await vu$3.sop.ui.hideLoading();
                await vu$3.sop.ui.hideWhiteLoading();
                // Espera a que se resuelva la pantalla del usuario
                await vu$3.sop.ui.user.start();
            } else {
                // vu.face.auth.loginFlag = true;
                await vu$3.sop.ui.user.doPreSetUser(vu$3.face.auth.userNameValue, true);
            }

            if (vu$3.face.auth.warmUpFaceModelAsync)
                await vu$3.face.auth.faceModelLoad;

            await vu$3.sop.ui.user.hide();
            break
        } catch (e) {
            console.log('vu.sop.ui.user', e);
            await vu$3.error.showError(new vu$3.error.FaceAuthError('registerApiError'));
        }
    }

    // ----------------------------------------
    // FACE
    //
    // Do face
    while (true) {
        try {
            await vu$3.sop.ui.hideLoading();
            await vu$3.sop.ui.hideWhiteLoading();
            await vu$3.face.auth.startRecording();
            await vu$3.sop.ui.showVideo();
            let pictures;
            if (vu$3.face.auth.challengeType == "mixed") {
                await vu$3.face.ui.gestures.start(vu$3.face.auth.basePath);
                pictures = await vu$3.face.ui.gestures.challengeStart();
            } else {
                await vu$3.face.ui.start();
                pictures = await vu$3.face.ui.challengeStart();
            }

            if(vu$3.face.auth.recordProcess === true) {
                //sendVideo = true;
                response = await vu$3.face.auth.stopRecording();
                console.log("response", response);

                if (typeof response === 'object' && response !== null) {
                    if (response.code === 2000) {
                        console.log("Video uploaded successfully");
                    } else {
                        console.log("addVideo fail:", response);
                        throw new Error('addVideoFail');
                    }
                } else if (response instanceof Blob) {
                    console.log("Received blob response");
                } else {
                    console.log("Unexpected response format");
                }
            }            

            if (serverLess) {
                // Return only the pictures without sending them to backend
                //await vu.sop.ui.hideLoading();
                
                const tags =
                    vu$3.face.ui.picturesTags.length > 0
                        ? vu$3.face.ui.picturesTags
                        : vu$3.face.ui.gestures.picturesTags;

                const result = pictures.map((img, idx) => ({
                    file: img.replace(/^data:image\/\w+;base64,/, ""),
                    imageType: tags[idx] || null
                }));                

                return result;
            }            

            await vu$3.sop.ui.showLoading();
            let lastPic = pictures[(pictures.length - 1)];
            
            if (vu$3.face.auth.registrationFlow) {
                if (vu$3.face.auth.enableSelfieList === true) {
                    if (vu$3.face.auth.framesAnalysis) {
                        const isValid = await vu$3.image.phash.detectOutliersInSelfies(vu$3.face.auth.framesAnalysisLevel, pictures);
                        if (!isValid)
                            throw new Error('failAuth');
                    }

                    if (vu$3.face.ui.picturesTags.length > 0)
                        response = await vu$3.face.auth.api.faceRegisters(vu$3.face.auth.userNameValue,
                            pictures,
                            vu$3.face.ui.picturesTags);
                    else
                        response = await vu$3.face.auth.api.faceRegisters(vu$3.face.auth.userNameValue,
                            pictures,
                            vu$3.face.ui.gestures.picturesTags);

                } else {
                    response = await vu$3.face.auth.api.faceRegister(vu$3.face.auth.userNameValue, lastPic);
                }
                if (response.code == '2001') {
                    throw new Error('registerApiError')
                } else if (response.code != '932') {
                    throw new Error('registerApiError')
                }

            } else {
                console.log("Enable selfie list " + vu$3.face.auth.enableSelfieList);
                if (vu$3.face.auth.enableSelfieList === true) {
                    if (vu$3.face.auth.framesAnalysis) {
                        const isValid = await vu$3.image.phash.detectOutliersInSelfies(vu$3.face.auth.framesAnalysisLevel, pictures);
                        if (!isValid)
                            throw new Error('failAuth');
                    }
                                        
                    if (vu$3.face.ui.picturesTags.length > 0)
                        response = await vu$3.face.auth.api.faceLoginList(vu$3.face.auth.userNameValue,
                            pictures,
                            vu$3.face.ui.picturesTags);
                    else
                        response = await vu$3.face.auth.api.faceLoginList(vu$3.face.auth.userNameValue,
                            pictures,
                            vu$3.face.ui.gestures.picturesTags);

                    if (response.code == '1001') {
                        throw new Error('userNotExist')
                    } else if (response.code == '2001') {
                        throw new Error('failAuth')
                    } else if (response.code != '1002') {
                        throw new Error('failAuth')
                    }
                } else {
                    response = await vu$3.face.auth.api.faceLogin(vu$3.face.auth.userNameValue, lastPic);

                    if (response.code == '1001') {
                        throw new Error('userNotExist')
                    } else if (response.code == '2001') {
                        throw new Error('failAuth')
                    } else if (response.code != '1002') {
                        throw new Error('failAuth')
                    }
                }
            }
            await vu$3.sop.ui.hideLoading();
            await vu$3.face.auth.release();
            break
        } catch (e) {
            vu$3.face.auth.screenRecorder.sendVideo = false;
            await vu$3.sop.ui.hideLoading();
            console.log(e);
            let msg = 'faceError';
            if (e.code !== undefined) {
                if (e.code == '1001') {
                    msg = 'userNotExist';
                } else if (e.code == '2001') {
                    msg = 'failAuth';
                } else if (e.message !== undefined) {
                    msg = e.message;
                }
            } else if (e.message !== undefined) {
                msg = e.message;
            }
            await vu$3.error.showError(new vu$3.error.FaceAuthError(msg));
        }
    }
    //vu.sop.ui.show('vu.sop.ui.endScreen')
    return response

};

vu$3.face.auth.loadingImgSrcDefault = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjb2ciIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jb2cgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00ODcuNCAzMTUuN2wtNDIuNi0yNC42YzQuMy0yMy4yIDQuMy00NyAwLTcwLjJsNDIuNi0yNC42YzQuOS0yLjggNy4xLTguNiA1LjUtMTQtMTEuMS0zNS42LTMwLTY3LjgtNTQuNy05NC42LTMuOC00LjEtMTAtNS4xLTE0LjgtMi4zTDM4MC44IDExMGMtMTcuOS0xNS40LTM4LjUtMjcuMy02MC44LTM1LjFWMjUuOGMwLTUuNi0zLjktMTAuNS05LjQtMTEuNy0zNi43LTguMi03NC4zLTcuOC0xMDkuMiAwLTUuNSAxLjItOS40IDYuMS05LjQgMTEuN1Y3NWMtMjIuMiA3LjktNDIuOCAxOS44LTYwLjggMzUuMUw4OC43IDg1LjVjLTQuOS0yLjgtMTEtMS45LTE0LjggMi4zLTI0LjcgMjYuNy00My42IDU4LjktNTQuNyA5NC42LTEuNyA1LjQuNiAxMS4yIDUuNSAxNEw2Ny4zIDIyMWMtNC4zIDIzLjItNC4zIDQ3IDAgNzAuMmwtNDIuNiAyNC42Yy00LjkgMi44LTcuMSA4LjYtNS41IDE0IDExLjEgMzUuNiAzMCA2Ny44IDU0LjcgOTQuNiAzLjggNC4xIDEwIDUuMSAxNC44IDIuM2w0Mi42LTI0LjZjMTcuOSAxNS40IDM4LjUgMjcuMyA2MC44IDM1LjF2NDkuMmMwIDUuNiAzLjkgMTAuNSA5LjQgMTEuNyAzNi43IDguMiA3NC4zIDcuOCAxMDkuMiAwIDUuNS0xLjIgOS40LTYuMSA5LjQtMTEuN3YtNDkuMmMyMi4yLTcuOSA0Mi44LTE5LjggNjAuOC0zNS4xbDQyLjYgMjQuNmM0LjkgMi44IDExIDEuOSAxNC44LTIuMyAyNC43LTI2LjcgNDMuNi01OC45IDU0LjctOTQuNiAxLjUtNS41LS43LTExLjMtNS42LTE0LjF6TTI1NiAzMzZjLTQ0LjEgMC04MC0zNS45LTgwLTgwczM1LjktODAgODAtODAgODAgMzUuOSA4MCA4MC0zNS45IDgwLTgwIDgweiI+PC9wYXRoPjwvc3ZnPg==";
vu$3.face.auth.loadingImgSrc = '';
vu$3.face.auth.loadingImgStyle = '';

// Private helper function to create loading images
const createLoadingImg = function () {
    // Check if the image element already exists in the target containers
    if (document.querySelector("#vu.sop.ui.whiteLoadingImg img") || 
        document.querySelector("#vu.sop.ui.loadingImg img")) {
        console.log("Loading image already exists, skipping creation.");
        return; // Exit the function if the image already exists
    }

    var imgElem = document.createElement("img");

    //Si no se asigno una imagen a la carga, asigna la imagen por defecto
    if (!vu$3.face.auth.loadingImgSrc) {
        imgElem.src = vu$3.face.auth.loadingImgSrcDefault;
        imgElem.className = "vu.sop.ui.loadingImg";
    } else {
        imgElem.src = vu$3.face.auth.loadingImgSrc;
        imgElem.style = vu$3.face.auth.loadingImgStyle;
    }

    //Agrega la imagen al html
    document.getElementById("vu.sop.ui.whiteLoadingImg").appendChild(imgElem);
    document.getElementById("vu.sop.ui.loadingImg").appendChild(imgElem.cloneNode());
};


vu$3.face.auth.release = async function () {
    console.log("vu.face.auth.release");
    await vuCamera.release();

    vu$3.face.doLoop = false;
    vu$3.face.ui.loop = false;
    vu$3.face.ui.challengeLoop = false;
    vu$3.face.ui.gestures.loop = false;
    vu$3.face.ui.gestures.lastChallenge = "";
    vu$3.face.ui.gestures.challengeLoop = false;
    
    if(vu$3.sop.videoResizeObserver)
    {
        vu$3.sop.videoResizeObserver.disconnect();
        //vu.sop.videoResizeObserver = null;
    }

    if(vu$3.face.ui.gestures.videoResizeObserver)
    {
        vu$3.face.ui.gestures.videoResizeObserver.disconnect();
        //vu.face.ui.gestures.videoResizeObserver = null;
    }

    vu$3.face?.auth?.videoResizeObserver?.disconnect();


    if (vu$3.face.ui.faceDotObserver) {
        vu$3.face.ui.faceDotObserver.disconnect();
        //vu.face.ui.faceDotObserver = null;

        if (typeof JEEFACEFILTERAPI !== 'undefined' && JEEFACEFILTERAPI && vu$3.face.auth.challengeType != "mixed") 
        {
            // Puede pasar que se ejecute mas de una vez, que alerte que fallo no es un problema, la idea es catchear el error para que no lo vea el usuario, el proceso se termina correctamente
            JEEFACEFILTERAPI.destroy().catch(error => {
                console.log("Failed to destroy JEEFACEFILTERAPI:", error);
            });
        }  
    }
    
    const element = document.getElementById('vu.sop');
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    
        element.style.display = 'none';
    }

    vu$3.extras.cleanupGestureScripts(vu$3.face.auth.challengeType, vu$3.face.auth.techStack);    

    vu$3.face.auth.initialized = false;    

    //vu.face.auth = {};
};

vu$3.face.auth.addVideoResolve = async function(video) {
    // Start upload in background (no await = non-blocking)
    if(!captureEnabled)
    {
        return {
            code: 2000,
            message: "Stats upload cancelled"
        };
    }

    vu$3.face.auth.api.addVideos(vu$3.face.auth.userNameValue, video, vu$3.face.auth.getFaceStatsKey())
        .then(response => {
            console.log('add video respo: ', response);
        })
        .catch(error => {
            console.error('video upload error:', error);
        });
    
    // Hide loading immediately (don't wait for upload)
    await vu$3.sop.ui.hideWhiteLoading();
    
    // Return success response that your SDK expects
    return {
        code: 2000,
        message: "Stats upload started successfully"
    };
};


vu$3.face.auth.screenRecorder.recorder;
vu$3.face.auth.screenRecorder.stream;

vu$3.face.auth.screenRecorder.sendVideo = false;
vu$3.face.auth.screenRecorder.videoReady = false;
vu$3.face.auth.screenRecorder.completeBlob;

vu$3.face.auth.startRecording = async function() {
    if(vu$3.face.auth.recordProcess === true) {
        if (vu$3.sop.ui.isMobile()) {
            vu$3.screen.capture.recordVideoStart();
        } else {
            try {
                vu$3.face.auth.screenRecorder.stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {mediaSource: "screen"}
                });
                
                const chunks = [];
                
                vu$3.face.auth.screenRecorder.recorder = new MediaRecorder(vu$3.face.auth.screenRecorder.stream);
                
                vu$3.face.auth.screenRecorder.recorder.ondataavailable = e => {
                    if (e.data && e.data.size > 0) {
                        chunks.push(e.data);
                        console.log("Chunk collected:", e.data.size, "bytes");
                    }
                };
                
                vu$3.face.auth.screenRecorder.recorder.onstop = e => {
                    try {
                        console.log("Recording stopped. Total chunks:", chunks.length);
                        if (chunks.length > 0) {
                            const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
                            console.log("Total video size:", totalSize, "bytes");
                            
                            vu$3.face.auth.screenRecorder.completeBlob = new Blob(chunks, { 'type': 'video/mp4' });
                            vu$3.face.auth.screenRecorder.videoReady = true;
                            console.log("Video blob ready as MP4");
                        } else {
                            console.error("No video chunks collected");
                            vu$3.face.auth.screenRecorder.videoReady = false;
                        }
                    } catch (e) {
                        console.error("Error creating video blob:", e);
                        vu$3.face.auth.screenRecorder.videoReady = false;
                    }
                };
                
                vu$3.face.auth.screenRecorder.recorder.onerror = e => {
                    console.error("MediaRecorder error:", e);
                };
                
                // Start with time slicing for better data collection
                vu$3.face.auth.screenRecorder.recorder.start(1000);
                console.log("Screen recording started");
                
            } catch (e) {
                console.log("video record error:", e);
                await vu$3.sop.ui.hideWhiteLoading();
                // TODO pendiente porque face no tiene telemetria
                // if(vu.face.auth.enableTelemetry){
                //     vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SCREEN_RECORDING_ERROR});
                // }
                await vu$3.error.showError(new vu$3.error.UserError('startRecordingFail'));
                throw e;
            }
        }
    }
};

vu$3.face.auth.stopRecording = async function() {
    if (vu$3.sop.ui.isMobile()) {
        try {
            if (vu$3.screen.capture.doCaptureLoop) {
                return vu$3.screen.capture.recordVideoStop();
            } else {
                console.log("No Screen record active");
            }
        } catch(e){
            console.log("No Screen record active");
        }
    } else {        
        if (vu$3.face.auth.screenRecorder.sendVideo === false) {
            try {
                vu$3.face.auth.screenRecorder.stream.getTracks().forEach(track => {
                    track.stop();
                });
            } catch(e){
                console.log("No Screen record active");
            }
        }
        
        try {
            if (vu$3.face.auth.recordProcess === true) {
                if (vu$3.face.auth.screenRecorder.recorder !== undefined) {
                    if (vu$3.face.auth.screenRecorder.recorder.state != "inactive") {
                        // Stop recorder first
                        vu$3.face.auth.screenRecorder.recorder.stop();
                        console.log("MediaRecorder stopped");
                        
                        // Wait for video processing
                        while (vu$3.face.auth.screenRecorder.videoReady === false) {
                            await vu$3.sop.ui.sleep('100');
                        }
                        
                        // Now stop stream tracks
                        vu$3.face.auth.screenRecorder.stream.getVideoTracks()[0].stop();
                        console.log("Stream tracks stopped");
                        
                        if (vu$3.face.auth.screenRecorder.sendVideo === true) {
                            console.log("Sending MP4 video:", vu$3.face.auth.screenRecorder.completeBlob);
                            return await vu$3.face.auth.addVideoResolve(vu$3.face.auth.screenRecorder.completeBlob);
                        } else {
                            return vu$3.face.auth.screenRecorder.completeBlob;
                        }
                    }
                }
            }
        } catch (e) {
            vu$3.face.auth.screenRecorder.sendVideo = false;
            await vu$3.face.auth.stopRecording();
            return new Error(e.message);
        }
    }
};


if (typeof window !== 'undefined') {
    window.vuFaceAuth = vu$3.face.auth;
    //console.log('vuFaceAuth is attached to the window:', window.vuFaceAuth);
} else if (typeof global !== 'undefined') {
    global.vuFaceAuth = vu$3.face.auth;
}

var vuFaceAuth = vu$3.face.auth;

// vu.sop.ui.js

// Reference the existing vu object
const vu$2 = window.vu || {};
vu$2.sop = vu$2.sop || {};
vu$2.sop.ui = vu$2.sop.ui || {};
vu$2.sop.msg = vu$2.sop.msg || {};
vu$2.sop.barcode = vu$2.sop.barcode || {};
vu$2.sop.barcode.ui = vu$2.sop.barcode.ui || {};
vu$2.sop.documentCodes = vuSopDocumentCodes;
//vu.camera = vu.camera || {};
vu$2.extras = vuExtras;

let moduleCamera = null;

vu$2.sop.barcode.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    
    vu$2.sop.msg = window.vu.sop.msg || {};
    vu$2.sop.ui = window.vu.sop.ui || {};
    moduleCamera = camera;
};

vu$2.sop.barcode.documentId = null;

/*
https://github.com/Sec-ant/zxing-wasm

- Templates prioridad
    - Colombia
    - Argentina [DONE]
    - Ecuador
    - Venezuela
    - Paraguay
    - Panama
    - Costa rica

 */

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.barcode == "undefined") { vu.sop.barcode = function() {} }

// if (typeof vu.sop.barcode.ui == "undefined") { vu.sop.barcode.ui = function() {} }

// Solo agregar cuando este implementado el parser.
vu$2.sop.barcode.expectedBarcodes = {
    "VU-ARG-ID-01": ["PDF417"],
    "VU-ARG-ID-02": ["PDF417"],
    "VU-ARG-ID-03": ["PDF417"],
    "VU-ARG-ID-04": ["PDF417"],
    "VU-COL-ID-01": ["PDF417"],
    "VU-COL-IDF-01": ["PDF417"],
};

vu$2.sop.barcode.readerOptions = function() {
    return ZXingWASM.ReaderOptions = {
        tryHarder: true,
        tryInvert: true,
        tryRotate: true,
        tryDownscale: true,
    };
};

/* ------------------------------------------------------------------------------------------------------------------ */

vu$2.sop.barcode.canvas = null;
vu$2.sop.barcode.canvasContext = null;
vu$2.sop.barcode.loadPromise = null;
vu$2.sop.barcode.load = async function(basePath, techStack) {
    //await vu.sop.loadJs(basePath + '/js/libs/zxing-wasm/index.js');
    await vu$2.extras.loadScript(basePath, techStack, "libs/zxing-wasm", "index.js", "ZXingWASM");

    return ZXingWASM.getZXingModule({
        locateFile: (path, prefix) => {
            if (path.endsWith(".wasm")) {
                return basePath + '/libs/zxing-wasm/'  + `${path}`;
            }
            return prefix + path;
        }
    });
};

vu$2.sop.barcode.loopRunning = true;

vu$2.sop.barcode.loop = async function() {
    if(!vu$2.sop.barcode.loopRunning)
        return;

    if (vu$2.sop.barcode.canvas === null) {
        vu$2.sop.barcode.canvas = document.createElement('canvas');
        vu$2.sop.barcode.canvasContext = vu$2.sop.barcode.canvas.getContext("2d", { willReadFrequently: true });
        vu$2.sop.barcode.canvas.width = moduleCamera.video.videoWidth;
        vu$2.sop.barcode.canvas.height = moduleCamera.video.videoHeight;
    }

    vu$2.sop.barcode.canvasContext.drawImage(moduleCamera.video, 0, 0,
        vu$2.sop.barcode.canvas.width, vu$2.sop.barcode.canvas.height);
    let imageData = vu$2.sop.barcode.canvasContext.getImageData(0, 0,
        vu$2.sop.barcode.canvas.width, vu$2.sop.barcode.canvas.height);

    let result = await ZXingWASM.readBarcodesFromImageData(
        imageData,
        vu$2.sop.barcode.readerOptions(),
    );

    if (result.length > 0) {
        if(!result[0].isValid)
            return;

        vu$2.sop.barcode.loopRunning = false;
        console.log("Barcode result found. Resolving...");

        vu$2.sop.barcode.ui.overlay.style.display = 'none';
        await vu$2.sop.ui.hideBottomText();
        await vu$2.sop.ui.bottomTextAlert.hide();

        let resultByType = {};
        for (let step = 0; step < result.length; step++) {
            resultByType[result[step].format] = result[step].text;
        }

        // Scan en la pantalla de ADD DOCUMENT (front/back)
        if (vu$2.sop.barcode.documentId === null){
            vu$2.sop.barcode.ui.resolve(resultByType);
            return;
        }

        let VUId = vu$2.sop.documentCodes.getVUIdFromId(vu$2.sop.barcode.documentId);
        let resultParsed = vu$2.sop.barcode.parse(resultByType, VUId);

        let mainData = {
            "number": "",
            "gender": "",
            "names": "",
            "lastNames": "",
            "birthdate": ""
        };

        if (resultParsed && typeof resultParsed === "object") 
        {
            // number
            if (resultParsed.hasOwnProperty("number")) {
                mainData["number"] = resultParsed.number;
                delete resultParsed.number;
            }
            // gender
            if (resultParsed.hasOwnProperty("gender")) {
                mainData["gender"] = resultParsed.gender;
                delete resultParsed.gender;
            } else if (resultParsed.hasOwnProperty("sex")) {
                mainData["gender"] = resultParsed.sex;
                delete resultParsed.sex;
            }
            // names
            if (resultParsed.hasOwnProperty("names")) {
                mainData["names"] = resultParsed.names;
                delete resultParsed.names;
            }
            // lastNames
            if (resultParsed.hasOwnProperty("lastNames")) {
                mainData["lastNames"] = resultParsed.lastNames;
                delete resultParsed.lastNames;
            } else if (resultParsed.hasOwnProperty("surname")) {
                mainData["lastNames"] = resultParsed.surname;
                delete resultParsed.surname;
            }
            // birthdate
            if (resultParsed.hasOwnProperty("birthdate")) {
                mainData["birthdate"] = resultParsed.birthdate;
                delete resultParsed.birthdate;
            } else if (resultParsed.hasOwnProperty("dateOfBirth")) {
                mainData["birthdate"] = resultParsed.dateOfBirth;
                delete resultParsed.dateOfBirth;
            }

            // ------------------------------------------------------------------------------------------------------------
            // Date Transformations
            if (mainData.hasOwnProperty("birthdate")) {
                mainData.birthdate = mainData.birthdate["year"] +
                    vu$2.sop.barcode.padWithLeadingZeros(mainData.birthdate["month"], 2) +
                    vu$2.sop.barcode.padWithLeadingZeros(mainData.birthdate["day"], 2);
            }
            if (resultParsed.hasOwnProperty("expeditionDate")) {
                resultParsed.expeditionDate = resultParsed.expeditionDate["year"] +
                    vu$2.sop.barcode.padWithLeadingZeros(resultParsed.expeditionDate["month"], 2) +
                    vu$2.sop.barcode.padWithLeadingZeros(resultParsed.expeditionDate["day"], 2);
            }
            if (resultParsed.hasOwnProperty("expirationDate")) {
                resultParsed.expirationDate = resultParsed.expirationDate["year"] +
                    vu$2.sop.barcode.padWithLeadingZeros(resultParsed.expirationDate["month"], 2) +
                    vu$2.sop.barcode.padWithLeadingZeros(resultParsed.expirationDate["day"], 2);
            }

            // Mandar el raw
            resultParsed["raw"] = resultByType;

            console.log([mainData, resultParsed]);
            vu$2.sop.barcode.ui.resolve([mainData, resultParsed]);            
        }
    } else {
        console.log("No barcode found. Looping...");
        setTimeout(vu$2.sop.barcode.loop, 10);
    }
};

vu$2.sop.barcode.padWithLeadingZeros = function(num, totalLength) {
  return String(num).padStart(totalLength, '0');
};


/* --------------------- */

//vu.sop.barcode.ui.overlay = document.getElementById("vu.sop.barcode.ui.overlay");
vu$2.sop.barcode.ui.overlay = null;
vu$2.sop.barcode.ui.overlayColor = "#343434";
vu$2.sop.barcode.ui.overlay0pacity = 0.5;

vu$2.sop.barcode.ui.overlaySvg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" xmlns:v="https://vecta.io/nano"><path d="M569.537 97.027c-3.455 0-3.094 2.257-3.084 3.252l.033 3.313c.017 1.669-.211 2.905 1.6 3.295l97.488-.012c1.75 0 3.557 1.004 4.881 2.77 1.293 1.234 2.014 2.753 2.014 4.23l-.012 96.146c.066 3.162 1.448 2.816 3.436 2.836l3.324.033c.969.01 3.128.34 3.252-2.805V107.02c0-5.237-4.76-9.992-10.002-9.992h-102.93z" style="fill:' + color  + '"/><path d="M26.87 247.144h695.086v5.657H26.87z" fill="red"/><path d="M682.451 289.573c0-3.455-2.257-3.094-3.252-3.084l-3.312.033c-1.669.017-2.905-.211-3.295 1.6l.012 97.488c0 1.75-1.004 3.557-2.77 4.881-1.234 1.293-2.753 2.014-4.23 2.014l-96.146-.012c-3.162.066-2.816 1.448-2.836 3.436l-.033 3.324c-.01.969-.34 3.128 2.805 3.252H672.46c5.237 0 9.992-4.76 9.992-10.002zM179.789 402.511c3.455 0 3.094-2.257 3.084-3.252l-.033-3.312c-.017-1.669.211-2.905-1.6-3.295l-97.488.012c-1.75 0-3.557-1.004-4.881-2.77-1.293-1.234-2.014-2.753-2.014-4.23l.012-96.146c-.066-3.162-1.448-2.816-3.436-2.836l-3.324-.033c-.969-.01-3.128-.341-3.252 2.805V392.52c0 5.237 4.76 9.992 10.002 9.992zM66.875 209.966c0 3.455 2.257 3.094 3.252 3.084l3.313-.033c1.669-.017 2.905.211 3.295-1.6l-.012-97.488c0-1.75 1.004-3.557 2.77-4.881 1.234-1.293 2.753-2.014 4.23-2.014l96.146.012c3.162-.066 2.816-1.448 2.836-3.436l.033-3.324c.01-.969.34-3.128-2.805-3.252H76.867c-5.237 0-9.992 4.76-9.992 10.002z" style="fill:' + color  + '"/></svg>') +"')"};

vu$2.sop.barcode.ui.resolve;
vu$2.sop.barcode.ui.reject;
vu$2.sop.barcode.ui.start = async function() {
    vu$2.sop.barcode.loopRunning = true;

    vu$2.sop.barcode.ui.overlay = document.getElementById("vu.sop.barcode.ui.overlay");
    vu$2.sop.barcode.ui.overlay.style.backgroundImage = vu$2.sop.barcode.ui.overlaySvg(vu$2.sop.barcode.ui.overlayColor);
    vu$2.sop.barcode.ui.overlay.style.opacity = vu$2.sop.barcode.ui.overlay0pacity;

    await vu$2.sop.barcode.ui.showTutorial();
    vu$2.sop.barcode.ui.overlay.style.display = 'block';
    await vu$2.sop.ui.showBottomText(vu$2.sop.msg.readBarcode);
    await vu$2.sop.ui.showBottomTextAlert(vu$2.sop.msg.cantReadBarcode);


    let promise = new Promise(function (resolve, reject) {
        vu$2.sop.barcode.ui.resolve = resolve;
        vu$2.sop.barcode.ui.reject = reject;
    });

    vu$2.sop.barcode.loop();

    return promise
};


vu$2.sop.barcode.ui.pdf417Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPMAAABHCAIAAABdz+YLAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSIVh3YQcchQBcEuKuJYWrEIFkpboVUHk5f+QZOGJMXFUXAtOPizWHVwcdbVwVUQBH9AnB2cFF2kxPuSQosYLzzex3n3HN67DxBaNaaafTFA1Swjk4yL+cKqGHiFD36EEMGkxEw9lV3MwbO+7qmb6i7Ks7z7/qwhpWgywCcSx5huWMQbxHObls55nzjMKpJCfE48ZdAFiR+5Lrv8xrnssMAzw0YukyAOE4vlHpZ7mFUMlXiWOKKoGuULeZcVzluc1VqDde7JXxgsaitZrtMaQxJLSCENETIaqKIGC1HaNVJMZOg87uEfdfxpcsnkqoKRYwF1qJAcP/gf/J6tWZqZdpOCcaD/xbY/xoHALtBu2vb3sW23TwD/M3Cldf31FjD/SXqzq0WOgOFt4OK6q8l7wOUOMPKkS4bkSH5aQqkEvJ/RNxWA0C0wuObOrXOO0wcgR7NavgEODoGJMmWve7x7oHdu//Z05vcDtz5ywmt0Wf8AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfoAQMTJTmwgPDXAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAbZJREFUeNrt3dFqhDAQBVAt/v8v27dShITZmVGrPedpYdeYuJcgDjHrErbv+8/ndV0/PeRw1KS1w1Ejo9YmP2sZbLB7wT7kep64RLmxT1rrzUP9vzh89bXAG0k2kg2SDZINkg2SjWTD22yT7xIliRbBEkzwAX69qHFqMSU39nqNI9GH3IjuSpE5G3cjINkg2SDZINlINkg2PMEW/2lugUavUR/iizVuWY1SbyHen1F1Jree5Zq/z5wNko1kg2SDZINkg2SDZPNfbe0t9q6hCL55LP5SrN4FI/XSQ66oFBzgc9VTZM7G3QhINkg2SDZINpINb/PB8+zcC4cS6s8yg29aGh3S3p/nDjBxovjAT02RORt3IyDZINkg2SDZSDZINjzBrFJT32+87tQCSrBSUN8qZNLgZaOI7w0yGmAuD72DNWfjbgQkGyQbJBskGyQbyYZ3aXhHVPvj9949KOr7cuRewtS7bcjkOuRONKk3BbdM6dXeuDkbdyMg2SDZINkg2Ug2SDY8waxSc8simiW8i0W9td+Cm37Mjwqe67IL21ul+uODNWfjbgQkGyQbJBskGyQbyYYH+gbBZe1+d2ZiEAAAAABJRU5ErkJggg==";

vu$2.sop.barcode.ui.showTutorial = function() {
    let barcodeImage = vu$2.sop.barcode.ui.pdf417Image;
    // TODO -  Cambiar la imagen dependiendo del documento

    let text = vu$2.sop.msg.readBarcodeTutorial + "<br><img src='" + barcodeImage + "'><br><br>";
    vu$2.sop.ui.showBottomText("");
    return vu$2.sop.ui.alert(text);
};

// ---------------------------------------------------------------------------------------------------------------------
// PARCE BARCODE
// ---------------------------------------------------------------------------------------------------------------------
/*
ARG - DONE
COL - DONE
*/

vu$2.sop.barcode.parse = function(rawBarcode, VUId) {
    // -----------------------------------------------------------------------------------------------------------------
    // Front
    // -----------------------------------------------------------------------------------------------------------------
    let result;
    if ( VUId === "VU-ARG-ID-02" ) {
        if (rawBarcode.hasOwnProperty('PDF417')) {
            result = rawBarcode['PDF417'].split('@');
            var response = {
                "ident": result[0],
                "surname": result[1],
                "names": result[2],
                "sex": result[3],
                "number": result[4],
                "identType": result[5]
            };
            try {
                response["prefixSuffixCuil"] = result[8];
            } catch (error) {
                console.log("VU-ARG-ID-02 prefixSuffixCuil error:", error);
            }
            try {
                var date = new Date(
                    result[6].split("/")[2],
                    result[6].split("/")[1],
                    result[6].split("/")[0]);
                response["dateOfBirth"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-02 dateOfBirth error:", error);
            }
            try {
                var date = new Date(
                    result[7].split("/")[2],
                    result[7].split("/")[1],
                    result[7].split("/")[0]);
                response["expeditionDate"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-02 expeditionDate error:", error);
            }
            return response;
        } else {
            return null;
        }
    }
    if ( VUId === "VU-ARG-ID-04") {
        if (rawBarcode.hasOwnProperty('PDF417')) {
            result = rawBarcode['PDF417'].split('@');
            var response = {
                "ident": result[0],
                "surname": result[1],
                "names": result[2],
                "sex": result[3],
                "number": result[4],
                "identType": result[5]
            };
            try {
                response["prefixSuffixCuil"] = result[8];
            } catch (error) {
                console.log("VU-ARG-ID-04 prefixSuffixCuil error:", error);
            }
            try {
                var date = new Date(
                    result[6].split("/")[2],
                    result[6].split("/")[1],
                    result[6].split("/")[0]);
                response["dateOfBirth"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-04 dateOfBirth error:", error);
            }
            try {
                var date = new Date(
                    result[7].split("/")[2],
                    result[7].split("/")[1],
                    result[7].split("/")[0]);
                response["expeditionDate"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-04 expeditionDate error:", error);
            }
            return response;
        } else {
            return null;
        }
    }


    // -----------------------------------------------------------------------------------------------------------------
    // Back
    if ( VUId === "VU-ARG-ID-01" ) {
        if (rawBarcode.hasOwnProperty('PDF417')) {
            result = rawBarcode['PDF417'].split('@');
            response = {
                "surname": result[4],
                "names": result[5],
                "sex": result[8],
                "number": result[1],
                "dateOfBirth": result[7],
                "expirationDate": result[12],
                "expeditionDate": result[9],
                "nationality":result[6],
                "identType": result[2],
                "ident": result[10],
                "identCode": result[11]
            };
            try {
                var date = new Date(
                    result[7].split("/")[2],
                    result[7].split("/")[1],
                    result[7].split("/")[0]);
                response["dateOfBirth"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-01 dateOfBirth error:", error);
            }
            try {
                var date = new Date(
                    result[9].split("/")[2],
                    result[9].split("/")[1],
                    result[9].split("/")[0]);
                response["expeditionDate"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-01 expeditionDate error:", error);
            }
            try {
                var date = new Date(
                    result[12].split("/")[2],
                    result[12].split("/")[1],
                    result[12].split("/")[0]);
                response["expirationDate"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-01 expirationDate error:", error);
            }
            return response;
        } else {
            return null;
        }
    }
    if ( VUId === "VU-ARG-ID-03" ) {
        if (rawBarcode.hasOwnProperty('PDF417')) {
            result = rawBarcode['PDF417'].split('@');
            response = {
                "surname": result[4].trim(),
                "names": result[5].trim(),
                "sex": result[8].trim(),
                "number": result[1].trim(),
                "identType": result[2].trim(),
                "prefixSuffixCuil": result[8].trim()
            };
            try {
                var date = new Date(
                    result[7].split("/")[2],
                    result[7].split("/")[1],
                    result[7].split("/")[0]);
                response["dateOfBirth"] = {
                    "day": date.getDate(),
                    "month": date.getMonth(),
                    "year": date.getFullYear()
                };
            } catch (error) {
                console.log("VU-ARG-ID-03 dateOfBirth error:", error);
            }
            try {
                response["expeditionDate"] = {
                    "day": parseInt(result[9].split("/")[0]),
                    "month": parseInt(result[9].split("/")[1]),
                    "year": parseInt(result[9].split("/")[2])
                };
            } catch (error) {
                console.log("VU-ARG-ID-03 expeditionDate error:", error);
            }
            return response;
        }
    }
    if ( VUId === "VU-COL-ID-01" ) {
        try {
            var barcode = vu$2.sop.barcode.colombiaParseBarcode1(rawBarcode);
        } catch (error) {
            console.log("VU-COL-ID-01 barcode 1 error:", error);
        }
        if (barcode.hasOwnProperty("dateOfBirth")) {
            if (vu$2.sop.barcode.checkValidDate(barcode["dateOfBirth"])) {
                return barcode;
            }
        }
    }
    if ( VUId === "VU-COL-IDF-01" ) {
        if (rawBarcode.hasOwnProperty('PDF417')) {
            var raw = rawBarcode['PDF417'];
            raw = raw.replace(/\0/g, ' ');
            let expectedResult = {
                "afisCode": raw.substring(2, 12).trim(),
                "identType": raw.substring(12, 32).trim(),
                "number": parseInt(raw.substring(34, 52).trim()).toString(),
                "surname": raw.substring(52, 82).trim() + " " + raw.substring(82, 112).trim(),
                "names": raw.substring(112, 192).trim(),
                "dateOfBirth": {
                  "day": parseInt(raw.substring(198, 200).trim()),
                  "month": parseInt(raw.substring(196, 198).trim()),
                  "year": parseInt(raw.substring(192, 196).trim())
                },
                "gender": raw.substring(200, 201).trim(),
                "expeditionDate": {
                  "day": parseInt(raw.substring(207, 209).trim()),
                  "month": parseInt(raw.substring(205, 207).trim()),
                  "year": parseInt(raw.substring(201, 205).trim())
                },
                "expirationDate": {
                  "day": parseInt(raw.substring(215, 217).trim()),
                  "month": parseInt(raw.substring(213, 215).trim()),
                  "year": parseInt(raw.substring(209, 213).trim())
                },
                "bloodType": raw.substring(217, 220).trim(),
                "nationality": raw.substring(220, 250).trim(),
            };
            console.log(expectedResult);
            return expectedResult
        }
    }

    return null;
};


// Colombia Helpers ----------------------------------------------------------------------------------------------------


vu$2.sop.barcode.colombiaParseBarcode1 = function(result) {
    // TODO - TEST!
    if (result.hasOwnProperty('PDF417')) {
        var raw = result['PDF417'];
        raw = raw.replace(/\0/g, ' ');
        var parsed = {};

        parsed["afisCode"] = raw.slice(2, 10).trim();
        parsed["fingerCard"] = raw.slice(40, 48).trim();
        parsed["names"] = (raw.slice(104, 127).trim().replace('\x00', '') + ' ' + raw.slice(127, 150).trim().replace('\x00', '')).trim();
        parsed["surname"] = (raw.slice(58, 80).trim().replace('\x00', '') + ' ' + raw.slice(81, 104).trim().replace('\x00', '')).trim();
        parsed["number"] = raw.slice(48, 58).trim().replace('\x00', '');
        parsed["bloodType"] = raw.slice(166, 169).replace('\x00', '').trim();
        parsed["dateOfBirth"] = {
            "day": parseInt(raw.slice(158, 160).trim()),
            "month": parseInt(raw.slice(156, 158).trim()),
            "year": parseInt(raw.slice(152, 156).trim())
        };
        parsed["gender"] = raw.slice(151, 152).trim();
        var department_municipality = vu$2.sop.barcode.colombiaGetLocalities(raw.slice(162, 165).trim(), raw.slice(160, 162).trim());
        parsed["department"] = department_municipality[0];
        parsed["municipality"] = department_municipality[1];

        return parsed;
    }
    return result;
};

vu$2.sop.barcode.checkValidDate = function(dateDict) {
    if ("day" in dateDict && "month" in dateDict && "year" in dateDict) {
        let validDay = false;
        let validMonth = false;
        let validYear = false;
        try {
            if (dateDict["day"] < 32 && dateDict["day"] > 0) {
                validDay = true;
            }
            if (dateDict["month"] < 13 && dateDict["month"] > 0) {
                validMonth = true;
            }
            if (dateDict["year"] < 2100 && dateDict["year"] > 1900) {
                validYear = true;
            }
        } catch {
            return false;
        }
        return validDay && validMonth && validYear;
    } else {
        return false;
    }
};


vu$2.sop.barcode.colombiaGetLocalities = function(departamento, municipio) {
    let resultadoDepartamento = "";
    let resultadoMunicipio = "";

    for (let step = 0; step < vu$2.sop.barcode.colombiaLocalities.length; step++) {
        if ( vu$2.sop.barcode.colombiaLocalities[step][0] === municipio &&
              vu$2.sop.barcode.colombiaLocalities[step][1] === departamento ) {
            resultadoDepartamento = vu$2.sop.barcode.colombiaLocalities[step][2];
            resultadoMunicipio = vu$2.sop.barcode.colombiaLocalities[step][3];
        }
    }
    return [resultadoDepartamento, resultadoMunicipio]
};

vu$2.sop.barcode.colombiaLocalities = [
    ['01', '001', 'ANTIOQUIA', 'MEDELLIN'],
    ['01', '004', 'ANTIOQUIA', 'ABEJORRAL'],
    ['01', '007', 'ANTIOQUIA', 'ABRIAQUI'],
    ['01', '010', 'ANTIOQUIA', 'ALEJANDRIA'],
    ['01', '013', 'ANTIOQUIA', 'AMAGA'],
    ['01', '016', 'ANTIOQUIA', 'AMALFI'],
    ['01', '019', 'ANTIOQUIA', 'ANDES'],
    ['01', '022', 'ANTIOQUIA', 'ANGELOPOLIS'],
    ['01', '025', 'ANTIOQUIA', 'ANGOSTURA'],
    ['01', '028', 'ANTIOQUIA', 'ANORI'],
    ['01', '031', 'ANTIOQUIA', 'ANTIOQUIA'],
    ['01', '034', 'ANTIOQUIA', 'ANZA'],
    ['01', '035', 'ANTIOQUIA', 'APARTADO'],
    ['01', '037', 'ANTIOQUIA', 'ARBOLETES'],
    ['01', '039', 'ANTIOQUIA', 'ARGELIA'],
    ['01', '040', 'ANTIOQUIA', 'ARMENIA'],
    ['01', '043', 'ANTIOQUIA', 'BARBOSA'],
    ['01', '046', 'ANTIOQUIA', 'BELMIRA'],
    ['01', '049', 'ANTIOQUIA', 'BELLO'],
    ['01', '052', 'ANTIOQUIA', 'BETANIA'],
    ['01', '055', 'ANTIOQUIA', 'BETULIA'],
    ['01', '058', 'ANTIOQUIA', 'BOLIVAR'],
    ['01', '061', 'ANTIOQUIA', 'BURITICA'],
    ['01', '062', 'ANTIOQUIA', 'BRICE/O'],
    ['01', '064', 'ANTIOQUIA', 'CACERES'],
    ['01', '067', 'ANTIOQUIA', 'CAICEDO'],
    ['01', '070', 'ANTIOQUIA', 'CALDAS'],
    ['01', '073', 'ANTIOQUIA', 'CAMPAMENTO'],
    ['01', '076', 'ANTIOQUIA', 'CA/ASGORDAS'],
    ['01', '078', 'ANTIOQUIA', 'CARACOLI'],
    ['01', '079', 'ANTIOQUIA', 'CARAMANTA'],
    ['01', '080', 'ANTIOQUIA', 'CAREPA'],
    ['01', '082', 'ANTIOQUIA', 'CARMEN DE VIBORAL'],
    ['01', '085', 'ANTIOQUIA', 'CAROLINA'],
    ['01', '088', 'ANTIOQUIA', 'CAUCASIA'],
    ['01', '091', 'ANTIOQUIA', 'CISNEROS'],
    ['01', '094', 'ANTIOQUIA', 'COCORNA'],
    ['01', '097', 'ANTIOQUIA', 'CONCEPCION'],
    ['01', '100', 'ANTIOQUIA', 'CONCORDIA'],
    ['01', '103', 'ANTIOQUIA', 'COPACABANA'],
    ['01', '106', 'ANTIOQUIA', 'CHIGORODO'],
    ['01', '109', 'ANTIOQUIA', 'DABEIBA'],
    ['01', '112', 'ANTIOQUIA', 'DON MATIAS'],
    ['01', '115', 'ANTIOQUIA', 'EBEJICO'],
    ['01', '117', 'ANTIOQUIA', 'EL BAGRE'],
    ['01', '118', 'ANTIOQUIA', 'ENTRERRIOS'],
    ['01', '121', 'ANTIOQUIA', 'ENVIGADO'],
    ['01', '124', 'ANTIOQUIA', 'FREDONIA'],
    ['01', '127', 'ANTIOQUIA', 'FRONTINO'],
    ['01', '130', 'ANTIOQUIA', 'GIRALDO'],
    ['01', '133', 'ANTIOQUIA', 'GIRARDOTA'],
    ['01', '136', 'ANTIOQUIA', 'GOMEZ PLATA'],
    ['01', '139', 'ANTIOQUIA', 'GRANADA'],
    ['01', '140', 'ANTIOQUIA', 'GUADALUPE'],
    ['01', '142', 'ANTIOQUIA', 'GUARNE'],
    ['01', '145', 'ANTIOQUIA', 'GUATAPE'],
    ['01', '148', 'ANTIOQUIA', 'HELICONIA'],
    ['01', '150', 'ANTIOQUIA', 'HISPANIA'],
    ['01', '151', 'ANTIOQUIA', 'ITAGUI'],
    ['01', '154', 'ANTIOQUIA', 'ITUANGO'],
    ['01', '157', 'ANTIOQUIA', 'JARDIN'],
    ['01', '160', 'ANTIOQUIA', 'JERICO'],
    ['01', '163', 'ANTIOQUIA', 'LA CEJA'],
    ['01', '166', 'ANTIOQUIA', 'LA ESTRELLA'],
    ['01', '168', 'ANTIOQUIA', 'PUERTO NARE‐LA MAGDALENA'],
    ['01', '169', 'ANTIOQUIA', 'LA UNION'],
    ['01', '170', 'ANTIOQUIA', 'LA PINTADA'],
    ['01', '172', 'ANTIOQUIA', 'LIBORINA'],
    ['01', '175', 'ANTIOQUIA', 'MACEO'],
    ['01', '178', 'ANTIOQUIA', 'MARINILLA'],
    ['01', '181', 'ANTIOQUIA', 'MONTEBELLO'],
    ['01', '184', 'ANTIOQUIA', 'MURINDO'],
    ['01', '187', 'ANTIOQUIA', 'MUTATA'],
    ['01', '190', 'ANTIOQUIA', 'NARI/O'],
    ['01', '191', 'ANTIOQUIA', 'NECHI'],
    ['01', '192', 'ANTIOQUIA', 'NECOCLI'],
    ['01', '193', 'ANTIOQUIA', 'OLAYA'],
    ['01', '196', 'ANTIOQUIA', 'PE/OL'],
    ['01', '199', 'ANTIOQUIA', 'PEQUE'],
    ['01', '202', 'ANTIOQUIA', 'PUEBLORRICO'],
    ['01', '205', 'ANTIOQUIA', 'PUERTO BERRIO'],
    ['01', '206', 'ANTIOQUIA', 'PUERTO TRIUNFO'],
    ['01', '208', 'ANTIOQUIA', 'REMEDIOS'],
    ['01', '211', 'ANTIOQUIA', 'RETIRO'],
    ['01', '214', 'ANTIOQUIA', 'RIONEGRO'],
    ['01', '217', 'ANTIOQUIA', 'SABANALARGA'],
    ['01', '218', 'ANTIOQUIA', 'SABANETA'],
    ['01', '220', 'ANTIOQUIA', 'SALGAR'],
    ['01', '223', 'ANTIOQUIA', 'SAN ANDRES'],
    ['01', '226', 'ANTIOQUIA', 'SAN CARLOS'],
    ['01', '227', 'ANTIOQUIA', 'SAN FRANCISCO'],
    ['01', '229', 'ANTIOQUIA', 'SAN JERONIMO'],
    ['01', '230', 'ANTIOQUIA', 'SAN JOSE DE LA MONTA/A'],
    ['01', '231', 'ANTIOQUIA', 'SAN JUAN DE URABA'],
    ['01', '232', 'ANTIOQUIA', 'SAN LUIS'],
    ['01', '235', 'ANTIOQUIA', 'SAN PEDRO'],
    ['01', '237', 'ANTIOQUIA', 'SAN PEDRO DE URABA'],
    ['01', '238', 'ANTIOQUIA', 'SAN RAFAEL'],
    ['01', '241', 'ANTIOQUIA', 'SAN ROQUE'],
    ['01', '244', 'ANTIOQUIA', 'SAN VICENTE'],
    ['01', '247', 'ANTIOQUIA', 'SANTA BARBARA'],
    ['01', '250', 'ANTIOQUIA', 'SANTA ROSA DE OSOS'],
    ['01', '253', 'ANTIOQUIA', 'SANTO DOMINGO'],
    ['01', '256', 'ANTIOQUIA', 'SANTUARIO'],
    ['01', '259', 'ANTIOQUIA', 'SEGOVIA'],
    ['01', '262', 'ANTIOQUIA', 'SONSON'],
    ['01', '265', 'ANTIOQUIA', 'SOPETRAN'],
    ['01', '268', 'ANTIOQUIA', 'TAMESIS'],
    ['01', '270', 'ANTIOQUIA', 'TARAZA'],
    ['01', '271', 'ANTIOQUIA', 'TARSO'],
    ['01', '274', 'ANTIOQUIA', 'TITIRIBI'],
    ['01', '277', 'ANTIOQUIA', 'TOLEDO'],
    ['01', '280', 'ANTIOQUIA', 'TURBO'],
    ['01', '282', 'ANTIOQUIA', 'URAMITA'],
    ['01', '283', 'ANTIOQUIA', 'URRAO'],
    ['01', '286', 'ANTIOQUIA', 'VALDIVIA'],
    ['01', '289', 'ANTIOQUIA', 'VALPARAISO'],
    ['01', '290', 'ANTIOQUIA', 'VEGACHI'],
    ['01', '291', 'ANTIOQUIA', 'VIGIA DEL FUERTE'],
    ['01', '292', 'ANTIOQUIA', 'VENECIA'],
    ['01', '293', 'ANTIOQUIA', 'YALI'],
    ['01', '295', 'ANTIOQUIA', 'YARUMAL'],
    ['01', '298', 'ANTIOQUIA', 'YOLOMBO'],
    ['01', '300', 'ANTIOQUIA', 'YONDO‐CASABE'],
    ['01', '301', 'ANTIOQUIA', 'ZARAGOZA'],
    ['03', '001', 'ATLANTICO', 'BARRANQUILLA'],
    ['03', '004', 'ATLANTICO', 'BARANOA'],
    ['03', '007', 'ATLANTICO', 'CAMPO DE LA CRUZ'],
    ['03', '010', 'ATLANTICO', 'CANDELARIA'],
    ['03', '013', 'ATLANTICO', 'GALAPA'],
    ['03', '016', 'ATLANTICO', 'JUAN DE ACOSTA'],
    ['03', '019', 'ATLANTICO', 'LURUACO'],
    ['03', '022', 'ATLANTICO', 'MALAMBO'],
    ['03', '025', 'ATLANTICO', 'MANATI'],
    ['03', '028', 'ATLANTICO', 'PALMAR DE VARELA'],
    ['03', '031', 'ATLANTICO', 'PIOJO'],
    ['03', '034', 'ATLANTICO', 'POLONUEVO'],
    ['03', '035', 'ATLANTICO', 'PONEDERA'],
    ['03', '037', 'ATLANTICO', 'PUERTO COLOMBIA'],
    ['03', '040', 'ATLANTICO', 'REPELON'],
    ['03', '043', 'ATLANTICO', 'SABANAGRANDE'],
    ['03', '046', 'ATLANTICO', 'SABANALARGA'],
    ['03', '047', 'ATLANTICO', 'SANTA LUCIA'],
    ['03', '049', 'ATLANTICO', 'SANTO TOMAS'],
    ['03', '052', 'ATLANTICO', 'SOLEDAD'],
    ['03', '055', 'ATLANTICO', 'SUAN'],
    ['03', '058', 'ATLANTICO', 'TUBARA'],
    ['03', '061', 'ATLANTICO', 'USIACURI'],
    ['05', '001', 'BOLIVAR', 'CARTAGENA'],
    ['05', '004', 'BOLIVAR', 'ACHI'],
    ['05', '005', 'BOLIVAR', 'ARENAL'],
    ['05', '006', 'BOLIVAR', 'ALTOS DEL ROSARIO'],
    ['05', '007', 'BOLIVAR', 'ARJONA'],
    ['05', '009', 'BOLIVAR', 'ARROYO HONDO'],
    ['05', '010', 'BOLIVAR', 'BARRANCO DE LOBA'],
    ['05', '013', 'BOLIVAR', 'CALAMAR'],
    ['05', '014', 'BOLIVAR', 'CANTAGALLO'],
    ['05', '015', 'BOLIVAR', 'CICUCO'],
    ['05', '016', 'BOLIVAR', 'CORDOBA'],
    ['05', '018', 'BOLIVAR', 'CLEMENCIA'],
    ['05', '022', 'BOLIVAR', 'EL CARMEN DE BOLIVAR'],
    ['05', '025', 'BOLIVAR', 'EL GUAMO'],
    ['05', '026', 'BOLIVAR', 'HATILLO DE LOBA'],
    ['05', '027', 'BOLIVAR', 'EL PE/ON'],
    ['05', '028', 'BOLIVAR', 'MAGANGUE'],
    ['05', '031', 'BOLIVAR', 'MAHATES'],
    ['05', '037', 'BOLIVAR', 'MARGARITA'],
    ['05', '040', 'BOLIVAR', 'MARIA LA BAJA'],
    ['05', '041', 'BOLIVAR', 'MONTECRISTO'],
    ['05', '043', 'BOLIVAR', 'MOMPOS'],
    ['05', '044', 'BOLIVAR', 'MORALES'],
    ['05', '050', 'BOLIVAR', 'NOROSI'],
    ['05', '059', 'BOLIVAR', 'PINILLOS'],
    ['05', '063', 'BOLIVAR', 'REGIDOR'],
    ['05', '065', 'BOLIVAR', 'RIOVIEJO'],
    ['05', '070', 'BOLIVAR', 'SAN ESTANISLAO'],
    ['05', '072', 'BOLIVAR', 'SAN CRISTOBAL'],
    ['05', '073', 'BOLIVAR', 'SAN FERNANDO'],
    ['05', '076', 'BOLIVAR', 'SAN JACINTO'],
    ['05', '078', 'BOLIVAR', 'SAN JACINTO DEL CAUCA'],
    ['05', '079', 'BOLIVAR', 'SAN JUAN NEPOMUCENO'],
    ['05', '082', 'BOLIVAR', 'SAN MARTIN DE LOBA'],
    ['05', '084', 'BOLIVAR', 'SAN PABLO'],
    ['05', '091', 'BOLIVAR', 'SANTA CATALINA'],
    ['05', '094', 'BOLIVAR', 'SANTA ROSA'],
    ['05', '095', 'BOLIVAR', 'SANTA ROSA DEL SUR'],
    ['05', '097', 'BOLIVAR', 'SIMITI'],
    ['05', '106', 'BOLIVAR', 'SOPLAVIENTO'],
    ['05', '110', 'BOLIVAR', 'TALAIGUA NUEVO'],
    ['05', '113', 'BOLIVAR', 'TIQUISIO (PTO. RICO)'],
    ['05', '118', 'BOLIVAR', 'TURBACO'],
    ['05', '121', 'BOLIVAR', 'TURBANA'],
    ['05', '124', 'BOLIVAR', 'VILLANUEVA'],
    ['05', '127', 'BOLIVAR', 'ZAMBRANO'],
    ['07', '001', 'BOYACA', 'TUNJA'],
    ['07', '007', 'BOYACA', 'ALMEIDA'],
    ['07', '008', 'BOYACA', 'AQUITANIA (PUEBLOVIEJO)'],
    ['07', '010', 'BOYACA', 'ARCABUCO'],
    ['07', '013', 'BOYACA', 'BELEN'],
    ['07', '016', 'BOYACA', 'BERBEO'],
    ['07', '019', 'BOYACA', 'BETEITIVA'],
    ['07', '022', 'BOYACA', 'BOAVITA'],
    ['07', '025', 'BOYACA', 'BOYACA'],
    ['07', '028', 'BOYACA', 'BRICE/O'],
    ['07', '031', 'BOYACA', 'BUENAVISTA'],
    ['07', '034', 'BOYACA', 'BUSBANZA'],
    ['07', '037', 'BOYACA', 'CALDAS'],
    ['07', '040', 'BOYACA', 'CAMPOHERMOSO'],
    ['07', '043', 'BOYACA', 'CERINZA'],
    ['07', '046', 'BOYACA', 'CIENEGA'],
    ['07', '049', 'BOYACA', 'COMBITA'],
    ['07', '052', 'BOYACA', 'COPER'],
    ['07', '055', 'BOYACA', 'CORRALES'],
    ['07', '058', 'BOYACA', 'COVARACHIA'],
    ['07', '059', 'BOYACA', 'CUBARA'],
    ['07', '060', 'BOYACA', 'CUCAITA'],
    ['07', '061', 'BOYACA', 'CUITIVA'],
    ['07', '064', 'BOYACA', 'CHINAVITA'],
    ['07', '067', 'BOYACA', 'CHIQUINQUIRA'],
    ['07', '068', 'BOYACA', 'CHIQUIZA'],
    ['07', '070', 'BOYACA', 'CHISCAS'],
    ['07', '073', 'BOYACA', 'CHITA'],
    ['07', '076', 'BOYACA', 'CHITARAQUE'],
    ['07', '077', 'BOYACA', 'CHIVATA'],
    ['07', '078', 'BOYACA', 'CHIVOR'],
    ['07', '079', 'BOYACA', 'DUITAMA'],
    ['07', '082', 'BOYACA', 'EL COCUY'],
    ['07', '085', 'BOYACA', 'EL ESPINO'],
    ['07', '088', 'BOYACA', 'FIRAVITOBA'],
    ['07', '091', 'BOYACA', 'FLORESTA'],
    ['07', '094', 'BOYACA', 'GACHANTIVA'],
    ['07', '097', 'BOYACA', 'GAMEZA'],
    ['07', '100', 'BOYACA', 'GARAGOA'],
    ['07', '103', 'BOYACA', 'GUACAMAYAS'],
    ['07', '106', 'BOYACA', 'GUATEQUE'],
    ['07', '109', 'BOYACA', 'GUAYATA'],
    ['07', '112', 'BOYACA', 'GUICAN'],
    ['07', '118', 'BOYACA', 'IZA'],
    ['07', '121', 'BOYACA', 'JENESANO'],
    ['07', '124', 'BOYACA', 'JERICO'],
    ['07', '127', 'BOYACA', 'LABRANZAGRANDE'],
    ['07', '130', 'BOYACA', 'LA CAPILLA'],
    ['07', '136', 'BOYACA', 'LA UVITA'],
    ['07', '137', 'BOYACA', 'LA VICTORIA'],
    ['07', '139', 'BOYACA', 'VILLA DE LEIVA'],
    ['07', '142', 'BOYACA', 'MACANAL'],
    ['07', '148', 'BOYACA', 'MARIPI'],
    ['07', '151', 'BOYACA', 'MIRAFLORES'],
    ['07', '154', 'BOYACA', 'MONGUA'],
    ['07', '157', 'BOYACA', 'MONGUI'],
    ['07', '160', 'BOYACA', 'MONIQUIRA'],
    ['07', '161', 'BOYACA', 'MOTAVITA'],
    ['07', '163', 'BOYACA', 'MUZO'],
    ['07', '166', 'BOYACA', 'NOBSA'],
    ['07', '169', 'BOYACA', 'NUEVO COLON'],
    ['07', '173', 'BOYACA', 'OICATA'],
    ['07', '176', 'BOYACA', 'OTANCHE'],
    ['07', '178', 'BOYACA', 'PACHAVITA'],
    ['07', '179', 'BOYACA', 'PAEZ'],
    ['07', '181', 'BOYACA', 'PAIPA'],
    ['07', '184', 'BOYACA', 'PAJARITO'],
    ['07', '187', 'BOYACA', 'PANQUEBA'],
    ['07', '190', 'BOYACA', 'PAUNA'],
    ['07', '193', 'BOYACA', 'PAYA'],
    ['07', '199', 'BOYACA', 'PAZ DE RIO'],
    ['07', '202', 'BOYACA', 'PESCA'],
    ['07', '205', 'BOYACA', 'PISBA'],
    ['07', '214', 'BOYACA', 'PUERTO BOYACA'],
    ['07', '215', 'BOYACA', 'QUIPAMA'],
    ['07', '217', 'BOYACA', 'RAMIRIQUI'],
    ['07', '220', 'BOYACA', 'RAQUIRA'],
    ['07', '223', 'BOYACA', 'RONDON'],
    ['07', '226', 'BOYACA', 'SABOYA'],
    ['07', '232', 'BOYACA', 'SACHICA'],
    ['07', '235', 'BOYACA', 'SAMACA'],
    ['07', '237', 'BOYACA', 'SAN EDUARDO'],
    ['07', '238', 'BOYACA', 'SAN JOSE DE PARE'],
    ['07', '241', 'BOYACA', 'SAN LUIS DE GACENO'],
    ['07', '247', 'BOYACA', 'SAN MATEO'],
    ['07', '248', 'BOYACA', 'SAN MIGUEL DE SEMA'],
    ['07', '249', 'BOYACA', 'SAN PABLO DE BORBUR'],
    ['07', '250', 'BOYACA', 'SANTANA'],
    ['07', '251', 'BOYACA', 'SANTA MARIA'],
    ['07', '253', 'BOYACA', 'SANTA ROSA DE VITERBO'],
    ['07', '256', 'BOYACA', 'SANTA SOFIA'],
    ['07', '259', 'BOYACA', 'SATIVANORTE'],
    ['07', '262', 'BOYACA', 'SATIVASUR'],
    ['07', '265', 'BOYACA', 'SIACHOQUE'],
    ['07', '268', 'BOYACA', 'SOATA'],
    ['07', '271', 'BOYACA', 'SOCOTA'],
    ['07', '274', 'BOYACA', 'SOCHA'],
    ['07', '277', 'BOYACA', 'SOGAMOSO'],
    ['07', '280', 'BOYACA', 'SOMONDOCO'],
    ['07', '281', 'BOYACA', 'SORA'],
    ['07', '282', 'BOYACA', 'SORACA'],
    ['07', '283', 'BOYACA', 'SOTAQUIRA'],
    ['07', '286', 'BOYACA', 'SUSACON'],
    ['07', '289', 'BOYACA', 'SUTAMARCHAN'],
    ['07', '292', 'BOYACA', 'SUTATENZA'],
    ['07', '298', 'BOYACA', 'TASCO'],
    ['07', '301', 'BOYACA', 'TENZA'],
    ['07', '304', 'BOYACA', 'TIBANA'],
    ['07', '307', 'BOYACA', 'TIBASOSA'],
    ['07', '310', 'BOYACA', 'TINJACA'],
    ['07', '311', 'BOYACA', 'TIPACOQUE'],
    ['07', '313', 'BOYACA', 'TOCA'],
    ['07', '316', 'BOYACA', 'TOGUI'],
    ['07', '319', 'BOYACA', 'TOPAGA'],
    ['07', '322', 'BOYACA', 'TOTA'],
    ['07', '324', 'BOYACA', 'TUNUNGUA'],
    ['07', '325', 'BOYACA', 'TURMEQUE'],
    ['07', '328', 'BOYACA', 'TUTA'],
    ['07', '331', 'BOYACA', 'TUTAZA'],
    ['07', '334', 'BOYACA', 'UMBITA'],
    ['07', '337', 'BOYACA', 'VENTAQUEMADA'],
    ['07', '340', 'BOYACA', 'VIRACACHA'],
    ['07', '346', 'BOYACA', 'ZETAQUIRA'],
    ['09', '001', 'CALDAS', 'MANIZALES'],
    ['09', '004', 'CALDAS', 'AGUADAS'],
    ['09', '007', 'CALDAS', 'ANSERMA'],
    ['09', '013', 'CALDAS', 'ARANZAZU'],
    ['09', '022', 'CALDAS', 'BELALCAZAR'],
    ['09', '034', 'CALDAS', 'CHINCHINA'],
    ['09', '037', 'CALDAS', 'FILADELFIA'],
    ['09', '049', 'CALDAS', 'LA DORADA'],
    ['09', '052', 'CALDAS', 'LA MERCED'],
    ['09', '055', 'CALDAS', 'MANZANARES'],
    ['09', '058', 'CALDAS', 'MARMATO'],
    ['09', '061', 'CALDAS', 'MARQUETALIA'],
    ['09', '067', 'CALDAS', 'MARULANDA'],
    ['09', '076', 'CALDAS', 'NEIRA'],
    ['09', '078', 'CALDAS', 'NORCASIA'],
    ['09', '079', 'CALDAS', 'PACORA'],
    ['09', '082', 'CALDAS', 'PALESTINA'],
    ['09', '085', 'CALDAS', 'PENSILVANIA'],
    ['09', '103', 'CALDAS', 'RIOSUCIO'],
    ['09', '106', 'CALDAS', 'RISARALDA'],
    ['09', '109', 'CALDAS', 'SALAMINA'],
    ['09', '115', 'CALDAS', 'SAMANA'],
    ['09', '120', 'CALDAS', 'SAN JOSE'],
    ['09', '124', 'CALDAS', 'SUPIA'],
    ['09', '127', 'CALDAS', 'VICTORIA'],
    ['09', '130', 'CALDAS', 'VILLAMARIA'],
    ['09', '133', 'CALDAS', 'VITERBO'],
    ['11', '001', 'CAUCA', 'POPAYAN'],
    ['11', '004', 'CAUCA', 'ALMAGUER'],
    ['11', '005', 'CAUCA', 'ARGELIA'],
    ['11', '006', 'CAUCA', 'BALBOA'],
    ['11', '007', 'CAUCA', 'BOLIVAR'],
    ['11', '010', 'CAUCA', 'BUENOS AIRES'],
    ['11', '013', 'CAUCA', 'CAJIBIO'],
    ['11', '016', 'CAUCA', 'CALDONO'],
    ['11', '019', 'CAUCA', 'CALOTO'],
    ['11', '022', 'CAUCA', 'CORINTO'],
    ['11', '025', 'CAUCA', 'EL TAMBO'],
    ['11', '027', 'CAUCA', 'FLORENCIA'],
    ['11', '028', 'CAUCA', 'GUAPI'],
    ['11', '029', 'CAUCA', 'GUACHENE'],
    ['11', '031', 'CAUCA', 'INZA'],
    ['11', '034', 'CAUCA', 'JAMBALO'],
    ['11', '037', 'CAUCA', 'LA SIERRA'],
    ['11', '040', 'CAUCA', 'LA VEGA'],
    ['11', '043', 'CAUCA', 'LOPEZ (MICAY)'],
    ['11', '046', 'CAUCA', 'MERCADERES'],
    ['11', '049', 'CAUCA', 'MIRANDA'],
    ['11', '052', 'CAUCA', 'MORALES'],
    ['11', '053', 'CAUCA', 'PADILLA'],
    ['11', '055', 'CAUCA', 'PAEZ (BELALCAZAR)'],
    ['11', '058', 'CAUCA', 'PATIA (EL BORDO)'],
    ['11', '060', 'CAUCA', 'PIAMONTE'],
    ['11', '061', 'CAUCA', 'PIENDAMO'],
    ['11', '064', 'CAUCA', 'PUERTO TEJADA'],
    ['11', '067', 'CAUCA', 'PURACE (COCONUCO)'],
    ['11', '070', 'CAUCA', 'ROSAS'],
    ['11', '073', 'CAUCA', 'SAN SEBASTIAN'],
    ['11', '076', 'CAUCA', 'SANTANDER DE QUILICHAO'],
    ['11', '079', 'CAUCA', 'SANTA ROSA'],
    ['11', '082', 'CAUCA', 'SILVIA'],
    ['11', '085', 'CAUCA', 'SOTARA (PAISPAMBA)'],
    ['11', '086', 'CAUCA', 'SUCRE'],
    ['11', '087', 'CAUCA', 'SUAREZ'],
    ['11', '088', 'CAUCA', 'TIMBIO'],
    ['11', '091', 'CAUCA', 'TIMBIQUI'],
    ['11', '094', 'CAUCA', 'TORIBIO'],
    ['11', '097', 'CAUCA', 'TOTORO'],
    ['11', '098', 'CAUCA', 'VILLA RICA'],
    ['12', '001', 'CESAR', 'VALLEDUPAR'],
    ['12', '075', 'CESAR', 'AGUACHICA'],
    ['12', '150', 'CESAR', 'AGUSTIN CODAZZI'],
    ['12', '170', 'CESAR', 'ASTREA'],
    ['12', '180', 'CESAR', 'BECERRIL'],
    ['12', '200', 'CESAR', 'BOSCONIA'],
    ['12', '225', 'CESAR', 'CURUMANI'],
    ['12', '300', 'CESAR', 'CHIMICHAGUA'],
    ['12', '375', 'CESAR', 'CHIRIGUANA'],
    ['12', '410', 'CESAR', 'EL COPEY'],
    ['12', '415', 'CESAR', 'EL PASO'],
    ['12', '450', 'CESAR', 'GAMARRA'],
    ['12', '525', 'CESAR', 'GONZALEZ'],
    ['12', '600', 'CESAR', 'LA GLORIA'],
    ['12', '608', 'CESAR', 'LA JAGUA DE IBIRICO'],
    ['12', '625', 'CESAR', 'MANAURE BALCON DEL CESAR (MANA'],
    ['12', '650', 'CESAR', 'PAILITAS'],
    ['12', '700', 'CESAR', 'PELAYA'],
    ['12', '720', 'CESAR', 'PUEBLO BELLO'],
    ['12', '750', 'CESAR', 'RIO DE ORO'],
    ['12', '800', 'CESAR', 'SAN ALBERTO'],
    ['12', '825', 'CESAR', 'LA PAZ'],
    ['12', '850', 'CESAR', 'SAN DIEGO'],
    ['12', '875', 'CESAR', 'SAN MARTIN'],
    ['12', '900', 'CESAR', 'TAMALAMEQUE'],
    ['13', '001', 'CORDOBA', 'MONTERIA'],
    ['13', '004', 'CORDOBA', 'AYAPEL'],
    ['13', '007', 'CORDOBA', 'BUENAVISTA'],
    ['13', '009', 'CORDOBA', 'CANALETE'],
    ['13', '010', 'CORDOBA', 'CERETE'],
    ['13', '013', 'CORDOBA', 'CIENAGA DE ORO'],
    ['13', '014', 'CORDOBA', 'COTORRA (BONGO)'],
    ['13', '016', 'CORDOBA', 'CHIMA'],
    ['13', '019', 'CORDOBA', 'CHINU'],
    ['13', '020', 'CORDOBA', 'LA APARTADA (FRONTERA)'],
    ['13', '022', 'CORDOBA', 'LORICA'],
    ['13', '023', 'CORDOBA', 'LOS CORDOBAS'],
    ['13', '024', 'CORDOBA', 'MOMIL'],
    ['13', '025', 'CORDOBA', 'MONTELIBANO'],
    ['13', '027', 'CORDOBA', 'MO/ITOS'],
    ['13', '028', 'CORDOBA', 'PLANETA RICA'],
    ['13', '031', 'CORDOBA', 'PUEBLO NUEVO'],
    ['13', '032', 'CORDOBA', 'PUERTO LIBERTADOR'],
    ['13', '033', 'CORDOBA', 'PUERTO ESCONDIDO'],
    ['13', '034', 'CORDOBA', 'PURISIMA'],
    ['13', '037', 'CORDOBA', 'SAHAGUN'],
    ['13', '040', 'CORDOBA', 'SAN ANDRES DE SOTAVENTO'],
    ['13', '043', 'CORDOBA', 'SAN ANTERO'],
    ['13', '046', 'CORDOBA', 'SAN BERNARDO DEL VIENTO'],
    ['13', '049', 'CORDOBA', 'SAN CARLOS'],
    ['13', '052', 'CORDOBA', 'SAN JOSE DE URE'],
    ['13', '055', 'CORDOBA', 'SAN PELAYO'],
    ['13', '058', 'CORDOBA', 'TIERRALTA'],
    ['13', '060', 'CORDOBA', 'TUCHIN'],
    ['13', '061', 'CORDOBA', 'VALENCIA'],
    ['15', '004', 'CUNDINAMARCA', 'AGUA DE DIOS'],
    ['15', '007', 'CUNDINAMARCA', 'ALBAN'],
    ['15', '010', 'CUNDINAMARCA', 'ANAPOIMA'],
    ['15', '013', 'CUNDINAMARCA', 'ANOLAIMA'],
    ['15', '016', 'CUNDINAMARCA', 'ARBELAEZ'],
    ['15', '019', 'CUNDINAMARCA', 'BELTRAN'],
    ['15', '022', 'CUNDINAMARCA', 'BITUIMA'],
    ['15', '025', 'CUNDINAMARCA', 'BOJACA'],
    ['15', '029', 'CUNDINAMARCA', 'CABRERA'],
    ['15', '030', 'CUNDINAMARCA', 'CACHIPAY'],
    ['15', '031', 'CUNDINAMARCA', 'CAJICA'],
    ['15', '034', 'CUNDINAMARCA', 'CAPARRAPI'],
    ['15', '037', 'CUNDINAMARCA', 'CAQUEZA'],
    ['15', '040', 'CUNDINAMARCA', 'CARMEN DE CARUPA'],
    ['15', '043', 'CUNDINAMARCA', 'COGUA'],
    ['15', '046', 'CUNDINAMARCA', 'COTA'],
    ['15', '049', 'CUNDINAMARCA', 'CUCUNUBA'],
    ['15', '052', 'CUNDINAMARCA', 'CHAGUANI'],
    ['15', '055', 'CUNDINAMARCA', 'CHIA'],
    ['15', '058', 'CUNDINAMARCA', 'CHIPAQUE'],
    ['15', '061', 'CUNDINAMARCA', 'CHOACHI'],
    ['15', '064', 'CUNDINAMARCA', 'CHOCONTA'],
    ['15', '067', 'CUNDINAMARCA', 'EL COLEGIO'],
    ['15', '070', 'CUNDINAMARCA', 'EL PE/ON'],
    ['15', '072', 'CUNDINAMARCA', 'EL ROSAL'],
    ['15', '076', 'CUNDINAMARCA', 'FACATATIVA'],
    ['15', '079', 'CUNDINAMARCA', 'FOMEQUE'],
    ['15', '085', 'CUNDINAMARCA', 'FOSCA'],
    ['15', '088', 'CUNDINAMARCA', 'FUNZA'],
    ['15', '091', 'CUNDINAMARCA', 'FUQUENE'],
    ['15', '094', 'CUNDINAMARCA', 'FUSAGASUGA'],
    ['15', '097', 'CUNDINAMARCA', 'GACHALA'],
    ['15', '100', 'CUNDINAMARCA', 'GACHANCIPA'],
    ['15', '103', 'CUNDINAMARCA', 'GACHETA'],
    ['15', '106', 'CUNDINAMARCA', 'GAMA'],
    ['15', '109', 'CUNDINAMARCA', 'GIRARDOT'],
    ['15', '112', 'CUNDINAMARCA', 'GUACHETA'],
    ['15', '115', 'CUNDINAMARCA', 'GUADUAS'],
    ['15', '118', 'CUNDINAMARCA', 'GUASCA'],
    ['15', '121', 'CUNDINAMARCA', 'GUATAQUI'],
    ['15', '124', 'CUNDINAMARCA', 'GUATAVITA'],
    ['15', '127', 'CUNDINAMARCA', 'GUAYABAL DE SIQUIMA'],
    ['15', '128', 'CUNDINAMARCA', 'GUAYABETAL'],
    ['15', '130', 'CUNDINAMARCA', 'GUTIERREZ'],
    ['15', '132', 'CUNDINAMARCA', 'GRANADA'],
    ['15', '133', 'CUNDINAMARCA', 'JERUSALEN'],
    ['15', '136', 'CUNDINAMARCA', 'JUNIN'],
    ['15', '139', 'CUNDINAMARCA', 'LA CALERA'],
    ['15', '142', 'CUNDINAMARCA', 'LA MESA'],
    ['15', '145', 'CUNDINAMARCA', 'LA PALMA'],
    ['15', '148', 'CUNDINAMARCA', 'LA PE/A'],
    ['15', '151', 'CUNDINAMARCA', 'LA VEGA'],
    ['15', '154', 'CUNDINAMARCA', 'LENGUAZAQUE'],
    ['15', '157', 'CUNDINAMARCA', 'MACHETA'],
    ['15', '160', 'CUNDINAMARCA', 'MADRID'],
    ['15', '163', 'CUNDINAMARCA', 'MANTA'],
    ['15', '166', 'CUNDINAMARCA', 'MEDINA'],
    ['15', '169', 'CUNDINAMARCA', 'MOSQUERA'],
    ['15', '172', 'CUNDINAMARCA', 'NARI/O'],
    ['15', '175', 'CUNDINAMARCA', 'NEMOCON'],
    ['15', '178', 'CUNDINAMARCA', 'NILO'],
    ['15', '181', 'CUNDINAMARCA', 'NIMAIMA'],
    ['15', '184', 'CUNDINAMARCA', 'NOCAIMA'],
    ['15', '190', 'CUNDINAMARCA', 'PACHO'],
    ['15', '193', 'CUNDINAMARCA', 'PAIME'],
    ['15', '196', 'CUNDINAMARCA', 'PANDI'],
    ['15', '198', 'CUNDINAMARCA', 'PARATEBUENO (LA NAGUAYA)'],
    ['15', '199', 'CUNDINAMARCA', 'PASCA'],
    ['15', '202', 'CUNDINAMARCA', 'PUERTO SALGAR'],
    ['15', '205', 'CUNDINAMARCA', 'PULI'],
    ['15', '208', 'CUNDINAMARCA', 'QUEBRADANEGRA'],
    ['15', '211', 'CUNDINAMARCA', 'QUETAME'],
    ['15', '214', 'CUNDINAMARCA', 'QUIPILE'],
    ['15', '217', 'CUNDINAMARCA', 'APULO'],
    ['15', '218', 'CUNDINAMARCA', 'RICAURTE'],
    ['15', '220', 'CUNDINAMARCA', 'SAN ANTONIO DEL TEQUENDAMA'],
    ['15', '223', 'CUNDINAMARCA', 'SAN BERNARDO'],
    ['15', '226', 'CUNDINAMARCA', 'SAN CAYETANO'],
    ['15', '229', 'CUNDINAMARCA', 'SAN FRANCISCO'],
    ['15', '232', 'CUNDINAMARCA', 'SAN JUAN DE RIOSECO'],
    ['15', '235', 'CUNDINAMARCA', 'SASAIMA'],
    ['15', '238', 'CUNDINAMARCA', 'SESQUILE'],
    ['15', '239', 'CUNDINAMARCA', 'SIBATE'],
    ['15', '241', 'CUNDINAMARCA', 'SILVANIA'],
    ['15', '244', 'CUNDINAMARCA', 'SIMIJACA'],
    ['15', '247', 'CUNDINAMARCA', 'SOACHA'],
    ['15', '250', 'CUNDINAMARCA', 'SOPO'],
    ['15', '256', 'CUNDINAMARCA', 'SUBACHOQUE'],
    ['15', '259', 'CUNDINAMARCA', 'SUESCA'],
    ['15', '262', 'CUNDINAMARCA', 'SUPATA'],
    ['15', '265', 'CUNDINAMARCA', 'SUSA'],
    ['15', '268', 'CUNDINAMARCA', 'SUTATAUSA'],
    ['15', '271', 'CUNDINAMARCA', 'TABIO'],
    ['15', '274', 'CUNDINAMARCA', 'TAUSA'],
    ['15', '277', 'CUNDINAMARCA', 'TENA'],
    ['15', '280', 'CUNDINAMARCA', 'TENJO'],
    ['15', '283', 'CUNDINAMARCA', 'TIBACUY'],
    ['15', '286', 'CUNDINAMARCA', 'TIBIRITA'],
    ['15', '289', 'CUNDINAMARCA', 'TOCAIMA'],
    ['15', '292', 'CUNDINAMARCA', 'TOCANCIPA'],
    ['15', '295', 'CUNDINAMARCA', 'TOPAIPI'],
    ['15', '298', 'CUNDINAMARCA', 'UBALA'],
    ['15', '301', 'CUNDINAMARCA', 'UBAQUE'],
    ['15', '304', 'CUNDINAMARCA', 'UBATE'],
    ['15', '307', 'CUNDINAMARCA', 'UNE'],
    ['15', '316', 'CUNDINAMARCA', 'UTICA'],
    ['15', '318', 'CUNDINAMARCA', 'VENECIA'],
    ['15', '319', 'CUNDINAMARCA', 'VERGARA'],
    ['15', '322', 'CUNDINAMARCA', 'VIANI'],
    ['15', '323', 'CUNDINAMARCA', 'VILLAGOMEZ'],
    ['15', '325', 'CUNDINAMARCA', 'VILLAPINZON'],
    ['15', '328', 'CUNDINAMARCA', 'VILLETA'],
    ['15', '331', 'CUNDINAMARCA', 'VIOTA'],
    ['15', '334', 'CUNDINAMARCA', 'YACOPI'],
    ['15', '337', 'CUNDINAMARCA', 'ZIPACON'],
    ['15', '340', 'CUNDINAMARCA', 'ZIPAQUIRA'],
    ['15', '001', 'CUNDINAMARCA', 'BOGOTA, D.C.'],
    ['16', '001', 'BOGOTA D.C', 'BOGOTA, D.C.'],
    ['17', '001', 'CHOCO', 'QUIBDO'],
    ['17', '002', 'CHOCO', 'ATRATO (YUTO)'],
    ['17', '004', 'CHOCO', 'ACANDI'],
    ['17', '006', 'CHOCO', 'ALTO BAUDO (PIE DE PATO)'],
    ['17', '007', 'CHOCO', 'BAGADO'],
    ['17', '008', 'CHOCO', 'BAHIA SOLANO (MUTIS)'],
    ['17', '010', 'CHOCO', 'BAJO BAUDO (PIZARRO)'],
    ['17', '011', 'CHOCO', 'BOJAYA (BELLAVISTA)'],
    ['17', '012', 'CHOCO', 'MEDIO ATRATO (BETE)'],
    ['17', '013', 'CHOCO', 'CONDOTO'],
    ['17', '014', 'CHOCO', 'CERTEGUI'],
    ['17', '015', 'CHOCO', 'CARMEN DEL DARIEN'],
    ['17', '016', 'CHOCO', 'EL CARMEN'],
    ['17', '017', 'CHOCO', 'EL CANTON DEL SAN PABLO (MAN.'],
    ['17', '019', 'CHOCO', 'ISTMINA'],
    ['17', '022', 'CHOCO', 'JURADO'],
    ['17', '025', 'CHOCO', 'LLORO'],
    ['17', '026', 'CHOCO', 'MEDIO BAUDO (PUERTO MELUK)'],
    ['17', '027', 'CHOCO', 'MEDIO SAN JUAN'],
    ['17', '028', 'CHOCO', 'NOVITA'],
    ['17', '031', 'CHOCO', 'NUQUI'],
    ['17', '032', 'CHOCO', 'RIO IRO'],
    ['17', '034', 'CHOCO', 'RIOSUCIO'],
    ['17', '035', 'CHOCO', 'RIO QUITO (PAIMADO)'],
    ['17', '037', 'CHOCO', 'SAN JOSE DEL PALMAR'],
    ['17', '038', 'CHOCO', 'EL LITORAL DEL SAN JUAN'],
    ['17', '040', 'CHOCO', 'SIPI'],
    ['17', '043', 'CHOCO', 'TADO'],
    ['17', '048', 'CHOCO', 'UNGUIA'],
    ['17', '060', 'CHOCO', 'UNION PANAMERICANA (LAS ANIMAS'],
    ['19', '001', 'HUILA', 'NEIVA'],
    ['19', '004', 'HUILA', 'ACEVEDO'],
    ['19', '007', 'HUILA', 'AGRADO'],
    ['19', '010', 'HUILA', 'AIPE'],
    ['19', '013', 'HUILA', 'ALGECIRAS'],
    ['19', '016', 'HUILA', 'ALTAMIRA'],
    ['19', '019', 'HUILA', 'BARAYA'],
    ['19', '022', 'HUILA', 'CAMPOALEGRE'],
    ['19', '025', 'HUILA', 'TESALIA (CARNICERIAS)'],
    ['19', '028', 'HUILA', 'COLOMBIA'],
    ['19', '031', 'HUILA', 'ELIAS'],
    ['19', '034', 'HUILA', 'GARZON'],
    ['19', '037', 'HUILA', 'GIGANTE'],
    ['19', '040', 'HUILA', 'GUADALUPE'],
    ['19', '043', 'HUILA', 'HOBO'],
    ['19', '044', 'HUILA', 'ISNOS'],
    ['19', '046', 'HUILA', 'IQUIRA'],
    ['19', '047', 'HUILA', 'LA ARGENTINA (PLATA VIEJA)'],
    ['19', '049', 'HUILA', 'LA PLATA'],
    ['19', '050', 'HUILA', 'NATAGA'],
    ['19', '051', 'HUILA', 'OPORAPA'],
    ['19', '052', 'HUILA', 'PAICOL'],
    ['19', '055', 'HUILA', 'PALERMO'],
    ['19', '056', 'HUILA', 'PALESTINA'],
    ['19', '058', 'HUILA', 'PITAL'],
    ['19', '061', 'HUILA', 'PITALITO'],
    ['19', '064', 'HUILA', 'RIVERA'],
    ['19', '067', 'HUILA', 'SALADOBLANCO'],
    ['19', '070', 'HUILA', 'SAN AGUSTIN'],
    ['19', '074', 'HUILA', 'SANTA MARIA'],
    ['19', '076', 'HUILA', 'SUAZA'],
    ['19', '079', 'HUILA', 'TARQUI'],
    ['19', '082', 'HUILA', 'TELLO'],
    ['19', '085', 'HUILA', 'TERUEL'],
    ['19', '088', 'HUILA', 'TIMANA'],
    ['19', '091', 'HUILA', 'VILLAVIEJA'],
    ['19', '094', 'HUILA', 'YAGUARA'],
    ['21', '001', 'MAGDALENA', 'SANTA MARTA'],
    ['21', '008', 'MAGDALENA', 'ALGARROBO'],
    ['21', '010', 'MAGDALENA', 'ARACATACA'],
    ['21', '012', 'MAGDALENA', 'ARIGUANI (EL DIFICIL)'],
    ['21', '013', 'MAGDALENA', 'CERRO DE SAN ANTONIO'],
    ['21', '015', 'MAGDALENA', 'CHIVOLO'],
    ['21', '016', 'MAGDALENA', 'CIENAGA'],
    ['21', '020', 'MAGDALENA', 'CONCORDIA'],
    ['21', '025', 'MAGDALENA', 'EL BANCO'],
    ['21', '028', 'MAGDALENA', 'EL PI/ON'],
    ['21', '030', 'MAGDALENA', 'EL RETEN'],
    ['21', '031', 'MAGDALENA', 'FUNDACION'],
    ['21', '040', 'MAGDALENA', 'GUAMAL'],
    ['21', '042', 'MAGDALENA', 'NUEVA GRANADA'],
    ['21', '046', 'MAGDALENA', 'PEDRAZA'],
    ['21', '048', 'MAGDALENA', 'PIJI/O DEL CARMEN'],
    ['21', '049', 'MAGDALENA', 'PIVIJAY'],
    ['21', '052', 'MAGDALENA', 'PLATO'],
    ['21', '055', 'MAGDALENA', 'PUEBLOVIEJO'],
    ['21', '058', 'MAGDALENA', 'REMOLINO'],
    ['21', '060', 'MAGDALENA', 'SABANAS DE SAN ANGEL'],
    ['21', '067', 'MAGDALENA', 'SALAMINA'],
    ['21', '070', 'MAGDALENA', 'SAN SEBASTIAN DE BUENAVISTA'],
    ['21', '073', 'MAGDALENA', 'SAN ZENON'],
    ['21', '076', 'MAGDALENA', 'SANTA ANA'],
    ['21', '078', 'MAGDALENA', 'SANTA BARBARA DE PINTO'],
    ['21', '079', 'MAGDALENA', 'SITIONUEVO'],
    ['21', '085', 'MAGDALENA', 'TENERIFE'],
    ['21', '090', 'MAGDALENA', 'ZAPAYAN'],
    ['21', '095', 'MAGDALENA', 'ZONA BANANERA (SEVILLA)'],
    ['23', '001', 'NARIÑO', 'PASTO'],
    ['23', '004', 'NARIÑO', 'ALBAN (SAN JOSE)'],
    ['23', '007', 'NARIÑO', 'ALDANA'],
    ['23', '010', 'NARIÑO', 'ANCUYA'],
    ['23', '013', 'NARIÑO', 'ARBOLEDA (BERRUECOS)'],
    ['23', '016', 'NARIÑO', 'BARBACOAS'],
    ['23', '017', 'NARIÑO', 'BELEN'],
    ['23', '019', 'NARIÑO', 'BUESACO'],
    ['23', '022', 'NARIÑO', 'COLON (GENOVA)'],
    ['23', '025', 'NARIÑO', 'CONSACA'],
    ['23', '028', 'NARIÑO', 'CONTADERO'],
    ['23', '031', 'NARIÑO', 'CORDOBA'],
    ['23', '034', 'NARIÑO', 'CUASPUD (CARLOSAMA)'],
    ['23', '037', 'NARIÑO', 'CUMBAL'],
    ['23', '038', 'NARIÑO', 'CHACHAGUI'],
    ['23', '039', 'NARIÑO', 'CUMBITARA'],
    ['23', '040', 'NARIÑO', 'EL ROSARIO'],
    ['23', '041', 'NARIÑO', 'EL CHARCO'],
    ['23', '043', 'NARIÑO', 'EL TABLON'],
    ['23', '044', 'NARIÑO', 'EL PE/OL'],
    ['23', '046', 'NARIÑO', 'EL TAMBO'],
    ['23', '047', 'NARIÑO', 'FRANCISCO PIZARRO (SALAHONDA)'],
    ['23', '049', 'NARIÑO', 'FUNES'],
    ['23', '052', 'NARIÑO', 'GUACHUCAL'],
    ['23', '055', 'NARIÑO', 'GUAITARILLA'],
    ['23', '058', 'NARIÑO', 'GUALMATAN'],
    ['23', '061', 'NARIÑO', 'ILES'],
    ['23', '064', 'NARIÑO', 'IMUES'],
    ['23', '067', 'NARIÑO', 'IPIALES'],
    ['23', '073', 'NARIÑO', 'LA CRUZ'],
    ['23', '076', 'NARIÑO', 'LA FLORIDA'],
    ['23', '077', 'NARIÑO', 'LA LLANADA'],
    ['23', '078', 'NARIÑO', 'LA TOLA'],
    ['23', '079', 'NARIÑO', 'LA UNION'],
    ['23', '080', 'NARIÑO', 'LEIVA'],
    ['23', '082', 'NARIÑO', 'LINARES'],
    ['23', '085', 'NARIÑO', 'LOS ANDES (SOTOMAYOR)'],
    ['23', '088', 'NARIÑO', 'MAGUI (PAYAN)'],
    ['23', '091', 'NARIÑO', 'MALLAMA (PIEDRANCHA)'],
    ['23', '094', 'NARIÑO', 'MOSQUERA'],
    ['23', '095', 'NARIÑO', 'OLAYA HERRERA'],
    ['23', '096', 'NARIÑO', 'NARI/O'],
    ['23', '097', 'NARIÑO', 'OSPINA'],
    ['23', '098', 'NARIÑO', 'POLICARPA'],
    ['23', '100', 'NARIÑO', 'POTOSI'],
    ['23', '101', 'NARIÑO', 'PROVIDENCIA'],
    ['23', '103', 'NARIÑO', 'PUERRES'],
    ['23', '106', 'NARIÑO', 'PUPIALES'],
    ['23', '109', 'NARIÑO', 'RICAURTE'],
    ['23', '112', 'NARIÑO', 'ROBERTO PAYAN (SAN JOSE)'],
    ['23', '115', 'NARIÑO', 'SAMANIEGO'],
    ['23', '118', 'NARIÑO', 'SANDONA'],
    ['23', '120', 'NARIÑO', 'SAN BERNARDO'],
    ['23', '121', 'NARIÑO', 'SAN LORENZO'],
    ['23', '123', 'NARIÑO', 'SAN PEDRO DE CARTAGO'],
    ['23', '124', 'NARIÑO', 'SAN PABLO'],
    ['23', '125', 'NARIÑO', 'SANTA BARBARA (ISCUANDE)'],
    ['23', '127', 'NARIÑO', 'SANTACRUZ (GUACHAVES)'],
    ['23', '130', 'NARIÑO', 'SAPUYES'],
    ['23', '133', 'NARIÑO', 'TAMINANGO'],
    ['23', '136', 'NARIÑO', 'TANGUA'],
    ['23', '139', 'NARIÑO', 'TUMACO'],
    ['23', '142', 'NARIÑO', 'TUQUERRES'],
    ['23', '145', 'NARIÑO', 'YACUANQUER'],
    ['24', '001', 'RISARALDA', 'PEREIRA'],
    ['24', '008', 'RISARALDA', 'APIA'],
    ['24', '013', 'RISARALDA', 'BALBOA'],
    ['24', '021', 'RISARALDA', 'BELEN DE UMBRIA'],
    ['24', '025', 'RISARALDA', 'DOSQUEBRADAS'],
    ['24', '029', 'RISARALDA', 'GUATICA'],
    ['24', '038', 'RISARALDA', 'LA CELIA'],
    ['24', '046', 'RISARALDA', 'LA VIRGINIA'],
    ['24', '054', 'RISARALDA', 'MARSELLA'],
    ['24', '062', 'RISARALDA', 'MISTRATO'],
    ['24', '070', 'RISARALDA', 'PUEBLO RICO'],
    ['24', '078', 'RISARALDA', 'QUINCHIA'],
    ['24', '086', 'RISARALDA', 'SANTA ROSA DE CABAL'],
    ['24', '094', 'RISARALDA', 'SANTUARIO'],
    ['25', '001', 'NORTE DE SANTANDER', 'CUCUTA'],
    ['25', '004', 'NORTE DE SANTANDER', 'ABREGO'],
    ['25', '007', 'NORTE DE SANTANDER', 'ARBOLEDAS'],
    ['25', '010', 'NORTE DE SANTANDER', 'BOCHALEMA'],
    ['25', '013', 'NORTE DE SANTANDER', 'BUCARASICA'],
    ['25', '016', 'NORTE DE SANTANDER', 'CACOTA'],
    ['25', '019', 'NORTE DE SANTANDER', 'CACHIRA'],
    ['25', '022', 'NORTE DE SANTANDER', 'CONVENCION'],
    ['25', '025', 'NORTE DE SANTANDER', 'CUCUTILLA'],
    ['25', '028', 'NORTE DE SANTANDER', 'CHINACOTA'],
    ['25', '031', 'NORTE DE SANTANDER', 'CHITAGA'],
    ['25', '034', 'NORTE DE SANTANDER', 'DURANIA'],
    ['25', '036', 'NORTE DE SANTANDER', 'EL TARRA'],
    ['25', '037', 'NORTE DE SANTANDER', 'EL CARMEN'],
    ['25', '038', 'NORTE DE SANTANDER', 'EL ZULIA'],
    ['25', '040', 'NORTE DE SANTANDER', 'GRAMALOTE'],
    ['25', '043', 'NORTE DE SANTANDER', 'HACARI'],
    ['25', '046', 'NORTE DE SANTANDER', 'HERRAN'],
    ['25', '049', 'NORTE DE SANTANDER', 'LABATECA'],
    ['25', '051', 'NORTE DE SANTANDER', 'LA ESPERANZA'],
    ['25', '052', 'NORTE DE SANTANDER', 'LA PLAYA'],
    ['25', '054', 'NORTE DE SANTANDER', 'LOS PATIOS'],
    ['25', '055', 'NORTE DE SANTANDER', 'LOURDES'],
    ['25', '058', 'NORTE DE SANTANDER', 'MUTISCUA'],
    ['25', '061', 'NORTE DE SANTANDER', 'OCA/A'],
    ['25', '064', 'NORTE DE SANTANDER', 'PAMPLONA'],
    ['25', '067', 'NORTE DE SANTANDER', 'PAMPLONITA'],
    ['25', '069', 'NORTE DE SANTANDER', 'PUERTO SANTANDER'],
    ['25', '070', 'NORTE DE SANTANDER', 'RAGONVALIA'],
    ['25', '073', 'NORTE DE SANTANDER', 'SALAZAR'],
    ['25', '076', 'NORTE DE SANTANDER', 'SAN CALIXTO'],
    ['25', '079', 'NORTE DE SANTANDER', 'SAN CAYETANO'],
    ['25', '082', 'NORTE DE SANTANDER', 'SANTIAGO'],
    ['25', '085', 'NORTE DE SANTANDER', 'SARDINATA'],
    ['25', '088', 'NORTE DE SANTANDER', 'SILOS'],
    ['25', '091', 'NORTE DE SANTANDER', 'TEORAMA'],
    ['25', '093', 'NORTE DE SANTANDER', 'TIBU'],
    ['25', '094', 'NORTE DE SANTANDER', 'TOLEDO'],
    ['25', '097', 'NORTE DE SANTANDER', 'VILLA CARO'],
    ['25', '100', 'NORTE DE SANTANDER', 'VILLA DEL ROSARIO'],
    ['26', '001', 'QUINDIO', 'ARMENIA'],
    ['26', '005', 'QUINDIO', 'BUENAVISTA'],
    ['26', '010', 'QUINDIO', 'CALARCA'],
    ['26', '020', 'QUINDIO', 'CIRCASIA'],
    ['26', '025', 'QUINDIO', 'CORDOBA'],
    ['26', '030', 'QUINDIO', 'FILANDIA'],
    ['26', '040', 'QUINDIO', 'GENOVA'],
    ['26', '050', 'QUINDIO', 'LA TEBAIDA'],
    ['26', '060', 'QUINDIO', 'MONTENEGRO'],
    ['26', '070', 'QUINDIO', 'PIJAO'],
    ['26', '080', 'QUINDIO', 'QUIMBAYA'],
    ['26', '090', 'QUINDIO', 'SALENTO'],
    ['27', '001', 'SANTANDER', 'BUCARAMANGA'],
    ['27', '004', 'SANTANDER', 'AGUADA'],
    ['27', '007', 'SANTANDER', 'ALBANIA'],
    ['27', '010', 'SANTANDER', 'ARATOCA'],
    ['27', '013', 'SANTANDER', 'BARBOSA'],
    ['27', '016', 'SANTANDER', 'BARICHARA'],
    ['27', '019', 'SANTANDER', 'BARRANCABERMEJA'],
    ['27', '022', 'SANTANDER', 'BETULIA'],
    ['27', '025', 'SANTANDER', 'BOLIVAR'],
    ['27', '028', 'SANTANDER', 'CABRERA'],
    ['27', '031', 'SANTANDER', 'CALIFORNIA'],
    ['27', '034', 'SANTANDER', 'CAPITANEJO'],
    ['27', '037', 'SANTANDER', 'CARCASI'],
    ['27', '040', 'SANTANDER', 'CEPITA'],
    ['27', '043', 'SANTANDER', 'CERRITO'],
    ['27', '045', 'SANTANDER', 'CIMITARRA'],
    ['27', '046', 'SANTANDER', 'CONCEPCION'],
    ['27', '049', 'SANTANDER', 'CONFINES'],
    ['27', '052', 'SANTANDER', 'CONTRATACION'],
    ['27', '055', 'SANTANDER', 'COROMORO'],
    ['27', '058', 'SANTANDER', 'CURITI'],
    ['27', '061', 'SANTANDER', 'CHARALA'],
    ['27', '064', 'SANTANDER', 'CHARTA'],
    ['27', '067', 'SANTANDER', 'CHIMA'],
    ['27', '070', 'SANTANDER', 'CHIPATA'],
    ['27', '071', 'SANTANDER', 'EL CARMEN'],
    ['27', '073', 'SANTANDER', 'EL GUACAMAYO'],
    ['27', '074', 'SANTANDER', 'EL PLAYON'],
    ['27', '075', 'SANTANDER', 'EL PE/ON'],
    ['27', '076', 'SANTANDER', 'ENCINO'],
    ['27', '079', 'SANTANDER', 'ENCISO'],
    ['27', '080', 'SANTANDER', 'FLORIAN'],
    ['27', '082', 'SANTANDER', 'FLORIDABLANCA'],
    ['27', '085', 'SANTANDER', 'GALAN'],
    ['27', '088', 'SANTANDER', 'GAMBITA'],
    ['27', '091', 'SANTANDER', 'GIRON'],
    ['27', '094', 'SANTANDER', 'GUACA'],
    ['27', '097', 'SANTANDER', 'GUADALUPE'],
    ['27', '100', 'SANTANDER', 'GUAPOTA'],
    ['27', '103', 'SANTANDER', 'GUAVATA'],
    ['27', '106', 'SANTANDER', 'GUEPSA'],
    ['27', '109', 'SANTANDER', 'HATO'],
    ['27', '112', 'SANTANDER', 'JESUS MARIA'],
    ['27', '115', 'SANTANDER', 'JORDAN'],
    ['27', '118', 'SANTANDER', 'LA PAZ'],
    ['27', '119', 'SANTANDER', 'LA BELLEZA'],
    ['27', '120', 'SANTANDER', 'LANDAZURI'],
    ['27', '121', 'SANTANDER', 'LEBRIJA'],
    ['27', '124', 'SANTANDER', 'LOS SANTOS'],
    ['27', '127', 'SANTANDER', 'MACARAVITA'],
    ['27', '130', 'SANTANDER', 'MALAGA'],
    ['27', '133', 'SANTANDER', 'MATANZA'],
    ['27', '136', 'SANTANDER', 'MOGOTES'],
    ['27', '139', 'SANTANDER', 'MOLAGAVITA'],
    ['27', '142', 'SANTANDER', 'OCAMONTE'],
    ['27', '145', 'SANTANDER', 'OIBA'],
    ['27', '148', 'SANTANDER', 'ONZAGA'],
    ['27', '151', 'SANTANDER', 'PALMAR'],
    ['27', '154', 'SANTANDER', 'PALMAS DEL SOCORRO'],
    ['27', '157', 'SANTANDER', 'PARAMO'],
    ['27', '160', 'SANTANDER', 'PIEDECUESTA'],
    ['27', '163', 'SANTANDER', 'PINCHOTE'],
    ['27', '166', 'SANTANDER', 'PUENTE NACIONAL'],
    ['27', '167', 'SANTANDER', 'PUERTO PARRA'],
    ['27', '169', 'SANTANDER', 'PUERTO WILCHES'],
    ['27', '172', 'SANTANDER', 'RIONEGRO'],
    ['27', '174', 'SANTANDER', 'SABANA DE TORRES'],
    ['27', '175', 'SANTANDER', 'SAN ANDRES'],
    ['27', '178', 'SANTANDER', 'SAN BENITO'],
    ['27', '181', 'SANTANDER', 'SAN GIL'],
    ['27', '184', 'SANTANDER', 'SAN JOAQUIN'],
    ['27', '187', 'SANTANDER', 'SAN JOSE DE MIRANDA'],
    ['27', '190', 'SANTANDER', 'SAN MIGUEL'],
    ['27', '193', 'SANTANDER', 'SAN VICENTE DE CHUCURI'],
    ['27', '194', 'SANTANDER', 'SANTA HELENA DEL OPON'],
    ['27', '195', 'SANTANDER', 'SANTA BARBARA'],
    ['27', '196', 'SANTANDER', 'SIMACOTA'],
    ['27', '199', 'SANTANDER', 'SOCORRO'],
    ['27', '202', 'SANTANDER', 'SUAITA'],
    ['27', '205', 'SANTANDER', 'SUCRE'],
    ['27', '208', 'SANTANDER', 'SURATA'],
    ['27', '211', 'SANTANDER', 'TONA'],
    ['27', '217', 'SANTANDER', 'VALLE DE SAN JOSE'],
    ['27', '219', 'SANTANDER', 'VETAS'],
    ['27', '220', 'SANTANDER', 'VELEZ'],
    ['27', '221', 'SANTANDER', 'VILLANUEVA'],
    ['27', '223', 'SANTANDER', 'ZAPATOCA'],
    ['28', '001', 'SUCRE', 'SINCELEJO'],
    ['28', '010', 'SUCRE', 'BUENAVISTA'],
    ['28', '020', 'SUCRE', 'CAIMITO'],
    ['28', '030', 'SUCRE', 'COLOSO (RICAURTE)'],
    ['28', '040', 'SUCRE', 'COROZAL'],
    ['28', '041', 'SUCRE', 'COVE/AS'],
    ['28', '042', 'SUCRE', 'EL ROBLE'],
    ['28', '045', 'SUCRE', 'CHALAN'],
    ['28', '048', 'SUCRE', 'GALERAS (NUEVA GRANADA)'],
    ['28', '049', 'SUCRE', 'GUARANDA'],
    ['28', '050', 'SUCRE', 'LA UNION'],
    ['28', '055', 'SUCRE', 'LOS PALMITOS'],
    ['28', '060', 'SUCRE', 'MAJAGUAL'],
    ['28', '080', 'SUCRE', 'MORROA'],
    ['28', '100', 'SUCRE', 'OVEJAS'],
    ['28', '120', 'SUCRE', 'PALMITO'],
    ['28', '160', 'SUCRE', 'SAMPUES'],
    ['28', '180', 'SUCRE', 'SAN BENITO ABAD'],
    ['28', '190', 'SUCRE', 'SAN JUAN DE BETULIA (BETULIA)'],
    ['28', '200', 'SUCRE', 'SAN MARCOS'],
    ['28', '220', 'SUCRE', 'SAN ONOFRE'],
    ['28', '240', 'SUCRE', 'SAN PEDRO'],
    ['28', '260', 'SUCRE', 'SINCE'],
    ['28', '280', 'SUCRE', 'SUCRE'],
    ['28', '300', 'SUCRE', 'TOLU'],
    ['28', '320', 'SUCRE', 'TOLUVIEJO'],
    ['29', '001', 'TOLIMA', 'IBAGUE'],
    ['29', '004', 'TOLIMA', 'ALPUJARRA'],
    ['29', '007', 'TOLIMA', 'ALVARADO'],
    ['29', '010', 'TOLIMA', 'AMBALEMA'],
    ['29', '013', 'TOLIMA', 'ANZOATEGUI'],
    ['29', '016', 'TOLIMA', 'ARMERO (GUAYABAL)'],
    ['29', '019', 'TOLIMA', 'ATACO'],
    ['29', '022', 'TOLIMA', 'CAJAMARCA'],
    ['29', '025', 'TOLIMA', 'CARMEN DE APICALA'],
    ['29', '028', 'TOLIMA', 'CASABIANCA'],
    ['29', '031', 'TOLIMA', 'COELLO'],
    ['29', '034', 'TOLIMA', 'COYAIMA'],
    ['29', '037', 'TOLIMA', 'CUNDAY'],
    ['29', '040', 'TOLIMA', 'CHAPARRAL'],
    ['29', '043', 'TOLIMA', 'DOLORES'],
    ['29', '046', 'TOLIMA', 'ESPINAL'],
    ['29', '049', 'TOLIMA', 'FALAN'],
    ['29', '052', 'TOLIMA', 'FLANDES'],
    ['29', '055', 'TOLIMA', 'FRESNO'],
    ['29', '058', 'TOLIMA', 'GUAMO'],
    ['29', '061', 'TOLIMA', 'HERVEO'],
    ['29', '064', 'TOLIMA', 'HONDA'],
    ['29', '067', 'TOLIMA', 'ICONONZO'],
    ['29', '070', 'TOLIMA', 'LERIDA'],
    ['29', '073', 'TOLIMA', 'LIBANO'],
    ['29', '076', 'TOLIMA', 'MARIQUITA'],
    ['29', '079', 'TOLIMA', 'MELGAR'],
    ['29', '080', 'TOLIMA', 'MURILLO'],
    ['29', '082', 'TOLIMA', 'NATAGAIMA'],
    ['29', '085', 'TOLIMA', 'ORTEGA'],
    ['29', '087', 'TOLIMA', 'PALOCABILDO'],
    ['29', '088', 'TOLIMA', 'PIEDRAS'],
    ['29', '089', 'TOLIMA', 'PLANADAS'],
    ['29', '091', 'TOLIMA', 'PRADO'],
    ['29', '094', 'TOLIMA', 'PURIFICACION'],
    ['29', '097', 'TOLIMA', 'RIOBLANCO'],
    ['29', '100', 'TOLIMA', 'RONCESVALLES'],
    ['29', '103', 'TOLIMA', 'ROVIRA'],
    ['29', '105', 'TOLIMA', 'SALDA/A'],
    ['29', '106', 'TOLIMA', 'SAN ANTONIO'],
    ['29', '109', 'TOLIMA', 'SAN LUIS'],
    ['29', '112', 'TOLIMA', 'SANTA ISABEL'],
    ['29', '115', 'TOLIMA', 'SUAREZ'],
    ['29', '118', 'TOLIMA', 'VALLE DE SAN JUAN'],
    ['29', '121', 'TOLIMA', 'VENADILLO'],
    ['29', '124', 'TOLIMA', 'VILLAHERMOSA'],
    ['29', '127', 'TOLIMA', 'VILLARRICA'],
    ['31', '001', 'VALLE', 'CALI'],
    ['31', '004', 'VALLE', 'ALCALA'],
    ['31', '007', 'VALLE', 'ANDALUCIA'],
    ['31', '010', 'VALLE', 'ANSERMANUEVO'],
    ['31', '013', 'VALLE', 'ARGELIA'],
    ['31', '016', 'VALLE', 'BOLIVAR'],
    ['31', '019', 'VALLE', 'BUENAVENTURA'],
    ['31', '022', 'VALLE', 'BUGA'],
    ['31', '025', 'VALLE', 'BUGALAGRANDE'],
    ['31', '028', 'VALLE', 'CAICEDONIA'],
    ['31', '031', 'VALLE', 'CANDELARIA'],
    ['31', '034', 'VALLE', 'CARTAGO'],
    ['31', '037', 'VALLE', 'DAGUA'],
    ['31', '040', 'VALLE', 'CALIMA (DARIEN)'],
    ['31', '043', 'VALLE', 'EL AGUILA'],
    ['31', '046', 'VALLE', 'EL CAIRO'],
    ['31', '049', 'VALLE', 'EL CERRITO'],
    ['31', '052', 'VALLE', 'EL DOVIO'],
    ['31', '055', 'VALLE', 'FLORIDA'],
    ['31', '058', 'VALLE', 'GINEBRA'],
    ['31', '061', 'VALLE', 'GUACARI'],
    ['31', '064', 'VALLE', 'JAMUNDI'],
    ['31', '067', 'VALLE', 'LA CUMBRE'],
    ['31', '070', 'VALLE', 'LA UNION'],
    ['31', '073', 'VALLE', 'LA VICTORIA'],
    ['31', '076', 'VALLE', 'OBANDO'],
    ['31', '079', 'VALLE', 'PALMIRA'],
    ['31', '082', 'VALLE', 'PRADERA'],
    ['31', '085', 'VALLE', 'RESTREPO'],
    ['31', '088', 'VALLE', 'RIOFRIO'],
    ['31', '091', 'VALLE', 'ROLDANILLO'],
    ['31', '094', 'VALLE', 'SAN PEDRO'],
    ['31', '097', 'VALLE', 'SEVILLA'],
    ['31', '100', 'VALLE', 'TORO'],
    ['31', '103', 'VALLE', 'TRUJILLO'],
    ['31', '106', 'VALLE', 'TULUA'],
    ['31', '109', 'VALLE', 'ULLOA'],
    ['31', '112', 'VALLE', 'VERSALLES'],
    ['31', '115', 'VALLE', 'VIJES'],
    ['31', '118', 'VALLE', 'YOTOCO'],
    ['31', '121', 'VALLE', 'YUMBO'],
    ['31', '124', 'VALLE', 'ZARZAL'],
    ['40', '001', 'ARAUCA', 'ARAUCA'],
    ['40', '005', 'ARAUCA', 'TAME'],
    ['40', '010', 'ARAUCA', 'ARAUQUITA'],
    ['40', '015', 'ARAUCA', 'CRAVO NORTE'],
    ['40', '017', 'ARAUCA', 'FORTUL'],
    ['40', '020', 'ARAUCA', 'PUERTO RONDON'],
    ['40', '025', 'ARAUCA', 'SARAVENA'],
    ['44', '001', 'CAQUETA', 'FLORENCIA'],
    ['44', '002', 'CAQUETA', 'ALBANIA'],
    ['44', '003', 'CAQUETA', 'CARTAGENA DEL CHAIRA'],
    ['44', '004', 'CAQUETA', 'BELEN DE LOS ANDAQUIES'],
    ['44', '005', 'CAQUETA', 'EL DONCELLO'],
    ['44', '006', 'CAQUETA', 'EL PAUJIL'],
    ['44', '007', 'CAQUETA', 'LA MONTA/ITA'],
    ['44', '009', 'CAQUETA', 'PUERTO RICO'],
    ['44', '010', 'CAQUETA', 'SAN VICENTE DEL CAGUAN'],
    ['44', '012', 'CAQUETA', 'CURILLO'],
    ['44', '016', 'CAQUETA', 'MILAN'],
    ['44', '017', 'CAQUETA', 'MORELIA'],
    ['44', '020', 'CAQUETA', 'SAN JOSE DEL FRAGUA'],
    ['44', '022', 'CAQUETA', 'SOLANO'],
    ['44', '024', 'CAQUETA', 'SOLITA'],
    ['44', '040', 'CAQUETA', 'VALPARAISO'],
    ['46', '001', 'CASANARE', 'YOPAL'],
    ['46', '040', 'CASANARE', 'AGUAZUL'],
    ['46', '120', 'CASANARE', 'CHAMEZA'],
    ['46', '320', 'CASANARE', 'HATO COROZAL'],
    ['46', '480', 'CASANARE', 'LA SALINA'],
    ['46', '520', 'CASANARE', 'MANI'],
    ['46', '540', 'CASANARE', 'MONTERREY'],
    ['46', '560', 'CASANARE', 'NUNCHIA'],
    ['46', '640', 'CASANARE', 'OROCUE'],
    ['46', '680', 'CASANARE', 'PAZ DE ARIPORO (MORENO)'],
    ['46', '700', 'CASANARE', 'PORE'],
    ['46', '760', 'CASANARE', 'RECETOR'],
    ['46', '800', 'CASANARE', 'SABANALARGA'],
    ['46', '815', 'CASANARE', 'SACAMA'],
    ['46', '830', 'CASANARE', 'SAN LUIS DE PALENQUE'],
    ['46', '840', 'CASANARE', 'TAMARA'],
    ['46', '850', 'CASANARE', 'TAURAMENA'],
    ['46', '865', 'CASANARE', 'TRINIDAD'],
    ['46', '880', 'CASANARE', 'VILLANUEVA'],
    ['48', '001', 'LA GUAJIRA', 'RIOHACHA'],
    ['48', '002', 'LA GUAJIRA', 'ALBANIA'],
    ['48', '004', 'LA GUAJIRA', 'BARRANCAS'],
    ['48', '005', 'LA GUAJIRA', 'DIBULLA'],
    ['48', '006', 'LA GUAJIRA', 'EL MOLINO'],
    ['48', '007', 'LA GUAJIRA', 'FONSECA'],
    ['48', '008', 'LA GUAJIRA', 'DISTRACCION'],
    ['48', '009', 'LA GUAJIRA', 'HATONUEVO'],
    ['48', '010', 'LA GUAJIRA', 'MAICAO'],
    ['48', '011', 'LA GUAJIRA', 'MANAURE'],
    ['48', '012', 'LA GUAJIRA', 'LA JAGUA DEL PILAR'],
    ['48', '013', 'LA GUAJIRA', 'SAN JUAN DEL CESAR'],
    ['48', '016', 'LA GUAJIRA', 'URIBIA'],
    ['48', '018', 'LA GUAJIRA', 'URUMITA'],
    ['48', '020', 'LA GUAJIRA', 'VILLANUEVA'],
    ['50', '001', 'GUAINIA', 'INIRIDA'],
    ['50', '050', 'GUAINIA', 'MAPIRIPANA'],
    ['50', '070', 'GUAINIA', 'BARRANCO MINAS'],
    ['50', '073', 'GUAINIA', 'CACAHUAL'],
    ['50', '078', 'GUAINIA', 'LA GUADALUPE'],
    ['50', '083', 'GUAINIA', 'MORICHAL (MORICHAL NUEVO)'],
    ['50', '087', 'GUAINIA', 'PANA PANA (CAMPO ALEGRE)'],
    ['50', '090', 'GUAINIA', 'PUERTO COLOMBIA'],
    ['50', '092', 'GUAINIA', 'SAN FELIPE'],
    ['52', '001', 'META', 'VILLAVICENCIO'],
    ['52', '005', 'META', 'ACACIAS'],
    ['52', '006', 'META', 'BARRANCA DE UPIA'],
    ['52', '008', 'META', 'CABUYARO'],
    ['52', '010', 'META', 'CASTILLA LA NUEVA'],
    ['52', '015', 'META', 'CUBARRAL'],
    ['52', '020', 'META', 'CUMARAL'],
    ['52', '025', 'META', 'EL CALVARIO'],
    ['52', '027', 'META', 'EL CASTILLO'],
    ['52', '028', 'META', 'EL DORADO'],
    ['52', '030', 'META', 'FUENTE DE ORO'],
    ['52', '035', 'META', 'GRANADA'],
    ['52', '040', 'META', 'GUAMAL'],
    ['52', '041', 'META', 'LA MACARENA'],
    ['52', '042', 'META', 'LEJANIAS'],
    ['52', '043', 'META', 'PUERTO GAITAN'],
    ['52', '044', 'META', 'MESETAS'],
    ['52', '045', 'META', 'PUERTO LOPEZ'],
    ['52', '046', 'META', 'MAPIRIPAN'],
    ['52', '047', 'META', 'PUERTO CONCORDIA'],
    ['52', '048', 'META', 'PUERTO LLERAS'],
    ['52', '049', 'META', 'PUERTO RICO'],
    ['52', '050', 'META', 'RESTREPO'],
    ['52', '055', 'META', 'SAN CARLOS DE GUAROA'],
    ['52', '058', 'META', 'SAN JUAN DE ARAMA'],
    ['52', '059', 'META', 'SAN JUANITO'],
    ['52', '060', 'META', 'SAN MARTIN DE LOS LLANOS'],
    ['52', '074', 'META', 'URIBE'],
    ['52', '080', 'META', 'VISTA HERMOSA'],
    ['54', '001', 'GUAVIARE', 'SAN JOSE DEL GUAVIARE'],
    ['54', '003', 'GUAVIARE', 'CALAMAR'],
    ['54', '007', 'GUAVIARE', 'EL RETORNO'],
    ['54', '012', 'GUAVIARE', 'MIRAFLORES'],
    ['56', '001', 'SAN ANDRES', 'SAN ANDRES'],
    ['56', '004', 'SAN ANDRES', 'PROVIDENCIA'],
    ['60', '001', 'AMAZONAS', 'LETICIA'],
    ['60', '007', 'AMAZONAS', 'PUERTO NARI/O'],
    ['60', '010', 'AMAZONAS', 'EL ENCANTO'],
    ['60', '013', 'AMAZONAS', 'LA CHORRERA'],
    ['60', '016', 'AMAZONAS', 'LA PEDRERA'],
    ['60', '017', 'AMAZONAS', 'LA VICTORIA'],
    ['60', '019', 'AMAZONAS', 'MIRITI PARANA'],
    ['60', '021', 'AMAZONAS', 'PUERTO SANTANDER'],
    ['60', '022', 'AMAZONAS', 'TARAPACA'],
    ['60', '030', 'AMAZONAS', 'PUERTO ALEGRIA'],
    ['60', '040', 'AMAZONAS', 'PUERTO ARICA'],
    ['64', '001', 'PUTUMAYO', 'MOCOA'],
    ['64', '002', 'PUTUMAYO', 'PUERTO ASIS'],
    ['64', '004', 'PUTUMAYO', 'PUERTO LEGUIZAMO'],
    ['64', '007', 'PUTUMAYO', 'COLON'],
    ['64', '013', 'PUTUMAYO', 'SAN FRANCISCO'],
    ['64', '016', 'PUTUMAYO', 'SANTIAGO'],
    ['64', '018', 'PUTUMAYO', 'SAN MIGUEL (LA DORADA)'],
    ['64', '019', 'PUTUMAYO', 'SIBUNDOY'],
    ['64', '023', 'PUTUMAYO', 'ORITO'],
    ['64', '025', 'PUTUMAYO', 'PUERTO GUZMAN'],
    ['64', '026', 'PUTUMAYO', 'PUERTO CAICEDO'],
    ['64', '028', 'PUTUMAYO', 'VALLE DEL GUAMUEZ (LA HORMIGA)'],
    ['64', '030', 'PUTUMAYO', 'VILLAGARZON'],
    ['68', '001', 'VAUPES', 'MITU'],
    ['68', '004', 'VAUPES', 'CARURU'],
    ['68', '010', 'VAUPES', 'MORICHAL (PAPUNAGUA)'],
    ['68', '013', 'VAUPES', 'BUENOS AIRES (PACOA)'],
    ['68', '017', 'VAUPES', 'TARAIRA'],
    ['68', '022', 'VAUPES', 'YAVARATE'],
    ['72', '001', 'VICHADA', 'PUERTO CARRE/O'],
    ['72', '002', 'VICHADA', 'SANTA ROSALIA'],
    ['72', '006', 'VICHADA', 'CUMARIBO'],
    ['72', '008', 'VICHADA', 'LA PRIMAVERA'],
    ['88', '120', 'CONSULADOS', 'ALEMANIA'],
    ['88', '140', 'CONSULADOS', 'PAISES BAJ‐ANTILLAS HOLANDESAS'],
    ['88', '155', 'CONSULADOS', 'ARGENTINA'],
    ['88', '160', 'CONSULADOS', 'PAISES BAJOS ‐ ARUBA'],
    ['88', '165', 'CONSULADOS', 'AUSTRALIA'],
    ['88', '170', 'CONSULADOS', 'AUSTRIA'],
    ['88', '185', 'CONSULADOS', 'BARBADOS'],
    ['88', '190', 'CONSULADOS', 'BELGICA'],
    ['88', '195', 'CONSULADOS', 'BELICE'],
    ['88', '215', 'CONSULADOS', 'BOLIVIA'],
    ['88', '220', 'CONSULADOS', 'BRASIL'],
    ['88', '250', 'CONSULADOS', 'CANADA'],
    ['88', '275', 'CONSULADOS', 'COREA DEL SUR'],
    ['88', '285', 'CONSULADOS', 'COSTA RICA'],
    ['88', '290', 'CONSULADOS', 'CUBA'],
    ['88', '300', 'CONSULADOS', 'CHECOSLOVAQUIA'],
    ['88', '305', 'CONSULADOS', 'CHILE'],
    ['88', '315', 'CONSULADOS', 'CHINA REPUBLICA POPULAR'],
    ['88', '320', 'CONSULADOS', 'CHIPRE'],
    ['88', '325', 'CONSULADOS', 'DINAMARCA'],
    ['88', '330', 'CONSULADOS', 'ECUADOR'],
    ['88', '335', 'CONSULADOS', 'EGIPTO'],
    ['88', '340', 'CONSULADOS', 'EL SALVADOR'],
    ['88', '355', 'CONSULADOS', 'ESPA/A'],
    ['88', '360', 'CONSULADOS', 'ESTADOS UNIDOS'],
    ['88', '370', 'CONSULADOS', 'FILIPINAS'],
    ['88', '375', 'CONSULADOS', 'FINLANDIA'],
    ['88', '380', 'CONSULADOS', 'FRANCIA'],
    ['88', '405', 'CONSULADOS', 'GRECIA'],
    ['88', '410', 'CONSULADOS', 'GUATEMALA'],
    ['88', '425', 'CONSULADOS', 'GUYANA'],
    ['88', '430', 'CONSULADOS', 'HAITI'],
    ['88', '435', 'CONSULADOS', 'HOLANDA'],
    ['88', '440', 'CONSULADOS', 'HONDURAS'],
    ['88', '450', 'CONSULADOS', 'HUNGRIA REPUBLICA POPULAR'],
    ['88', '455', 'CONSULADOS', 'INDIA'],
    ['88', '460', 'CONSULADOS', 'INDONESIA'],
    ['88', '465', 'CONSULADOS', 'INGLATERRA'],
    ['88', '475', 'CONSULADOS', 'IRAN'],
    ['88', '480', 'CONSULADOS', 'IRLANDA'],
    ['88', '490', 'CONSULADOS', 'ISRAEL'],
    ['88', '495', 'CONSULADOS', 'ITALIA'],
    ['88', '500', 'CONSULADOS', 'JAMAICA'],
    ['88', '505', 'CONSULADOS', 'JAPON'],
    ['88', '515', 'CONSULADOS', 'KENIA'],
    ['88', '535', 'CONSULADOS', 'LIBANO'],
    ['88', '560', 'CONSULADOS', 'MALASIA'],
    ['88', '580', 'CONSULADOS', 'MARRUECOS'],
    ['88', '590', 'CONSULADOS', 'MEXICO'],
    ['88', '620', 'CONSULADOS', 'NICARAGUA'],
    ['88', '635', 'CONSULADOS', 'NORUEGA'],
    ['88', '655', 'CONSULADOS', 'PANAMA'],
    ['88', '665', 'CONSULADOS', 'PARAGUAY'],
    ['88', '670', 'CONSULADOS', 'PERU'],
    ['88', '675', 'CONSULADOS', 'POLONIA'],
    ['88', '680', 'CONSULADOS', 'PORTUGAL'],
    ['88', '683', 'CONSULADOS', 'PUERTO RICO'],
    ['88', '685', 'CONSULADOS', 'REPUBLICA DOMINICANA'],
    ['88', '695', 'CONSULADOS', 'RUMANIA REPUBLICA SOCIAL'],
    ['88', '700', 'CONSULADOS', 'RUSIA'],
    ['88', '745', 'CONSULADOS', 'SUDAFRICA'],
    ['88', '755', 'CONSULADOS', 'SUECIA'],
    ['88', '760', 'CONSULADOS', 'SUIZA'],
    ['88', '770', 'CONSULADOS', 'TURQUIA'],
    ['88', '785', 'CONSULADOS', 'TRINIDAD Y TOBAGO'],
    ['88', '805', 'CONSULADOS', 'URUGUAY'],
    ['88', '815', 'CONSULADOS', 'VENEZUELA']
];


var vuBarcode = vu$2.sop.barcode;

// Reference the existing vu object
const vu$1 = window.vu || {};
vu$1.telemetry = vu$1.telemetry || {};
vu$1.sop = vu$1.sop || {};
vu$1.sop.ui = vuSopUi;
vu$1.sop.logApi = vu$1.sop.logApi || {};
vu$1.face = vu$1.face || {};
vu$1.face.ui = vu$1.face.ui || {};
vu$1.face.ui.gestures = vu$1.face.ui.gestures || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.telemetry == "undefined") { vu.telemetry = function() {} }

vu$1.telemetry.initialize = function() {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");

    vu$1.sop.logApi = window.vu.sop.logApi || {};
    vu$1.face.ui.gestures = window.vu.face.ui.gestures || {};
};

vu$1.telemetry.captureResponseCode = {
    FRONT: {
        FRONT_SUCCESS: 100,
        USER_CANCELLED: 101,
        BACKGROUND_TASKING_ERROR: 106,
        DOCUMENT_FACE_NOT_FOUND: 107,
        IMAGE_BLURRED: 109,
    },
    BACK: {
        BACK_SUCCESS: 200,
        USER_CANCELLED: 201,
        BACKGROUND_TASKING_ERROR: 206,
        BARCODE_NOT_FOUND: 207,
        IMAGE_BLURRED: 209,
    },
    SELFIE: {
        SELFIE_SUCCESS: 300,
        USER_CANCELLED: 301,
        SCREEN_RECORDING_ERROR: 303,
        BACKGROUND_TASKING_ERROR: 306,
    }
};

let gestureFeedback = [];

let telemetryQueue = [];

let telemetryStartEvent = [];

let telemetryProcessActivity = [];

vu$1.telemetry.traceId = null;

let captureSelfieSaveBody = {};


vu$1.telemetry.addEvent = async function (activity , step, eventData) {

  if (step === "start") {

        let captureSaveBaseBody = {
            "traceId": vu$1.telemetry.traceId,
            "beginAt": new Date(),
        };

        eventData = {...captureSaveBaseBody, ...eventData};
        telemetryStartEvent.push({activity, step, eventData});
  } else if ( step === "end") {

      const existingStartEventIndex = telemetryStartEvent.findIndex(
            entry => entry.activity === activity);

      if (existingStartEventIndex !== -1) {

          if(eventData.isBlurry){
              telemetryProcessActivity.push(telemetryStartEvent[existingStartEventIndex]);
              telemetryProcessActivity[existingStartEventIndex].eventData = {
                  ...telemetryStartEvent[existingStartEventIndex].eventData,
              'endAt': new Date(),
              captureResponseNumber: telemetryStartEvent[existingStartEventIndex].eventData.screenId === 1 ? vu$1.telemetry.captureResponseCode.FRONT.IMAGE_BLURRED :
              vu$1.telemetry.captureResponseCode.BACK.IMAGE_BLURRED};

              telemetryQueue.push(telemetryProcessActivity[existingStartEventIndex]);
              telemetryProcessActivity = [];

          } else {


          telemetryStartEvent[existingStartEventIndex].eventData = {
          ...telemetryStartEvent[existingStartEventIndex].eventData,
          ...eventData,
          'endAt': new Date(),};

          telemetryStartEvent[existingStartEventIndex].step = "end";

          if(telemetryStartEvent[existingStartEventIndex].activity === "SelfieActivityProcess"){

             if(eventData.captureResponseNumber !== vu$1.telemetry.captureResponseCode.SELFIE.SELFIE_SUCCESS){

                 captureSelfieSaveBody = { "minimumValidGestures" : vu$1.face.ui.gestures.getNumOfChallenges(),
                     "validGestures": gestureFeedback.length,
                     "invalidGestures": vu$1.face.ui.gestures.getNumOfChallenges() - gestureFeedback.length ,
                     "passedTest" : false,
                     "detail" : gestureFeedback,};

                 telemetryStartEvent[existingStartEventIndex].eventData = {
                     ...telemetryStartEvent[existingStartEventIndex].eventData,
                     ... eventData,
                     ...captureSelfieSaveBody };

             } else {

                 captureSelfieSaveBody = { "minimumValidGestures" : vu$1.face.ui.gestures.getNumOfChallenges(),
                     "validGestures": vu$1.face.ui.gestures.getNumOfChallenges(),
                     "invalidGestures": 0,
                     "passedTest" : true,
                     "detail" : gestureFeedback};

                 telemetryStartEvent[existingStartEventIndex].eventData = {
                     ...telemetryStartEvent[existingStartEventIndex].eventData,
                     ...captureSelfieSaveBody };
             }
          }

          telemetryQueue.push(telemetryStartEvent[existingStartEventIndex]);
          telemetryStartEvent.shift();
          gestureFeedback = [];
          }
        }
  }else if (step === "challengeInfo"){

        let captureGestureDetailBody = {"gestureCode" : getGestureCode(eventData.challenge),
                                        "gestureName": eventData.challenge,
                                        "minimumScore": vu$1.face.ui.gestures.getResultsValidatePercentual(),
                                        "validFrames": 0,
                                        "invalidFrames": 0,
                                        "score": vu$1.sop.challengeType == 'mixed' ?
                                            convertFaceConfidence(eventData.debugEvaluation[1]) : 99 ,
                                        "approved": true};

      gestureFeedback.push(captureGestureDetailBody);

      captureSelfieSaveBody.detail = gestureFeedback;
  }
};

async function processTelemetryQueue() {

    while (telemetryQueue.length > 0 && vu$1.telemetry.traceId != null) {
        const telemetryData = telemetryQueue.shift();
        try {
            switch (telemetryData.activity) {
                case 'DocumentActivityProcess':
                    const documentLogResponse = await vu$1.sop.logApi.saveDocumentLog(telemetryData.eventData);
                    console.log(documentLogResponse);
                    break;
                case 'SelfieActivityProcess':
                    const selfieLogResponse = await vu$1.sop.logApi.saveSelfieLog(telemetryData.eventData);
                    console.log(selfieLogResponse);
                    break;
                default:
                    console.warn('Unsupported telemetry event:', telemetryData.activity);
                    break;
            }
        } catch (error) {
            console.error('Error sending telemetry data:', error);
            telemetryQueue = [];
            break;
        }
    }
}


vu$1.telemetry.initTraceId = async function () {
    let requestBody = { clientId: vu$1.sop.userNameValue,
                        platform: vu$1.sop.browserInfo.browserName};
    try{
    const response = await vu$1.sop.logApi.initTraceTransaction(requestBody);
    console.log(response);
    if(response.code === 2000){
        vu$1.telemetry.traceId = response.traceId;
    }else {
        vu$1.telemetry.traceId = null;
    }} catch (error) {
            console.error('Error generating traceId:', error);
            vu$1.telemetry.traceId = null; }
};

function getGestureCode(challengeName){
    let gestureCode = {
        'none': 'SN',
        'smile': 'SS',
        'eyeClose': 'SCE',
        'lookLeft': 'SML',
        'lookRight': 'SMR'

    };
    return gestureCode[challengeName] || 'NF';
}

function convertFaceConfidence(confidence) {
    let faceConfidence = parseFloat(confidence.replace('%', ''));
    if (!isNaN(faceConfidence)) {
        faceConfidence  = Math.round(faceConfidence);
        return faceConfidence;
    } else {
        return 0;
    }
}

function getCaptureResponseNumber(activity , screenId , eventType){

    if(eventType === "unload"){
        let code = {
            'DocumentActivityProcess': screenId === 1 ? vu$1.telemetry.captureResponseCode.FRONT.USER_CANCELLED :
                vu$1.telemetry.captureResponseCode.BACK.USER_CANCELLED,
            'SelfieActivityProcess': vu$1.telemetry.captureResponseCode.SELFIE.USER_CANCELLED,
        };
        return code[activity]

    }else if (eventType === "visibilitychange"){

        let code = {
            'DocumentActivityProcess': screenId === 1 ? vu$1.telemetry.captureResponseCode.FRONT.BACKGROUND_TASKING_ERROR :
                vu$1.telemetry.captureResponseCode.BACK.BACKGROUND_TASKING_ERROR,
            'SelfieActivityProcess': vu$1.telemetry.captureResponseCode.SELFIE.BACKGROUND_TASKING_ERROR,
        };
        return code[activity]
        
    }
}

window.addEventListener('unload', function(event) {
    saveEvent(event.type);
});


document.addEventListener("visibilitychange", function(event) {
    if (document.visibilityState === 'hidden') {
        saveEvent(event.type);
    }
});

function saveEvent(eventType) {
    if(telemetryStartEvent.length > 0){

        let captureResponseNumber = getCaptureResponseNumber(telemetryStartEvent[0].activity , telemetryStartEvent[0].eventData.screenId , eventType);

        let data = {...telemetryStartEvent[0].eventData ,
            'captureResponseNumber' : captureResponseNumber,
            'endAt': new Date(),
        };

        if(telemetryStartEvent[0].activity === "SelfieActivityProcess"){

            captureSelfieSaveBody = { "minimumValidGestures" : vu$1.face.ui.gestures.getNumOfChallenges(),
                "validGestures": gestureFeedback.length,
                "invalidGestures": vu$1.face.ui.gestures.getNumOfChallenges() - gestureFeedback.length ,
                "passedTest" : false,
                "detail" : gestureFeedback,};

            data = { ...data , ...captureSelfieSaveBody};

            vu$1.sop.logApi.doFetchRequest(data, '/selfie/saveLog');
        } else {
            vu$1.sop.logApi.doFetchRequest(data , '/document/saveLog');
        }
    }
}



if(vu$1.sop.enableTelemetry){
    setInterval(processTelemetryQueue, 2000);
}


var vuTelemetry = vu$1.telemetry;

const vu = {};
vu.sop = {};
vu.sop.ui = vuSopUi;
vu.sop.audio = vuSopAudio;
vu.sop.preaudio = {};
//vu.sop.steps = {};
vu.sop.msg = {};
vu.extras = vuExtras;
vu.error = vuError;
vu.sop.documentCodes = vuSopDocumentCodes;
//vu.camera = vuCamera;
vu.sop.document = {};
vu.sop.document.objectDetection = vuSopDocumentObjectDetection;
vu.sop.api = {};
vu.sop.logApi = {};
//vu.sop.api = vuSopApi;
vu.sop.document.ui = vuSopDocumenUi;
vu.sop.barcode = vuBarcode;
vu.sop.face = {};
vu.sop.face.objectDetectionAndRotation = vuSopFaceObjectDetectionAndRotation;
vu.sop.face.model = {};
vu.sop.face.model.directionsAndGestures = vuSopFaceModelDirectionsAndGestures;
vu.sop.screenRecorder = {};
vu.telemetry = vuTelemetry;
vu.image = vuImage;
vu.screen = {};
vu.screen.capture = vuScreenCapture;

vu.face = {};
vu.face.ui = vuFaceUi;
vu.face.ui.gestures = {};
//vu.face.auth = vuFaceAuth;  // Properly assign it here



let agentStatsEnabled = false;

vu.sop.setAgentStatsEnabled = function (enabled) {
    // Prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) ||
        (vu.sop && vu.sop.initialized)) {
        console.warn("[Security] vu.face.auth.setAgentStatsEnabled: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }

    // Validate: must be strictly boolean
    if (typeof enabled !== "boolean") {
        console.error("[Security] vu.face.auth.setAgentStatsEnabled: Invalid value. Must be a boolean (true/false).");
        return false;
    }

    agentStatsEnabled = enabled;
    console.log(`[Security] vu.face.auth.setAgentStatsEnabled: agentStatsEnabled set to ${enabled}.`);
    return true;
};

vu.sop.getAgentStatsEnabled = function () {
    return agentStatsEnabled;
};

// Operation/Environment INFO
vu.sop.operationIdValue = null;
vu.sop.operationGuidValue = null;
vu.sop.documentId = null;       // detectedCountryId
vu.sop.userNameValue = null;
vu.sop.basePath = '';

// Options
vu.sop.disableBiometric = false;
vu.sop.lang = 'es';
vu.sop.flipDocumentCamera = 'auto';
vu.sop.warmUpDocModelAsync = false;
vu.sop.faceOrientationModelWeights = 'BEST';        // VERYLIGHT LIGHT NORMAL BEST
vu.sop.recordProcess = false;

vu.sop.useTheSameCameraInDocAndFaceInPC = false;
vu.sop.useTheSameCameraInDocAndFaceInMobile = false;

vu.sop.setCameraOrientationInPC = 'auto';        // auto ( environment for document, user for selfie), environment, user
vu.sop.setCameraOrientationInMobile = 'auto';    // auto ( environment for document, user for selfie), environment, user

vu.sop.checkCameraFocusCapabilitiesInPC = false;          // Muestra un warning si no hay control de foco en PC
vu.sop.checktCameraFocusCapabilitiesInMobile = false;    // Muestra un warning si no hay control de foco en Mobile

vu.sop.setDocumentBackgroudStyleMirror = false;

vu.sop.setHEICFileFormatSupport = true;
vu.sop.enableSelfieList = false;
vu.sop.browserInfo = null;

vu.sop.barcodeOptional = true;              // Continue if cant read the barcode
vu.sop.readBarcodeClientSide = true;

vu.sop.enableTelemetry = false;

//------------------------------------------------------------------------------------------------------

vu.sop.preCacheFaceModelPromise = false;
vu.sop.HEICFileFormatSupportLibLoad = false;

vu.sop.loadJsAttempts = 3;


vu.sop.initialized = false;
vu.sop.techStack = "plainweb";

vu.sop.initialize = async function(basePath, techStack) {
    await loadSuspiciousCameraKeywords();

    const { active, fp } = await getXstats();

    if(fp && vu.sop.getAgentStatsEnabled())
    {
        const analytics = new UltraAnalyticsSDK('https://om-useragent-production.security-47a.workers.dev', {
            encryptionKey: '11a541a6023fdae0198051dfff64fd73', 
            enableAutoTrack: false,
            enableAdvancedFingerprinting: true,  
            enablePerformanceTracking: false,    
            batchSize: 1,
            flushInterval: 1000,
            debug: false
        });

        setTimeout(() => {
            analytics.trackCustomEvent('user_authenticated', {
                username: vu.sop.userNameValue,
                authMethod: 'id_card'
            });
        }, 1000);
    }

    // if(vu.sop.initialized)
    // {
    //     await vu.extras.loadFile(basePath, "html", "onboarding.html", techStack)
    //         .then(content => {
    //             document.getElementById("vu.sop").innerHTML = content;
    //             vu.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");
    //         })
    //         .catch(error => {
    //             console.error("Error loading HTML", error);
    //         });

    //         console.log("vu.sop.initialized", vuCamera.video);                     
    //     // if(vuCamera.video == null)
    //     //     await vuCamera.start("vu.sop.ui.video");         
           

    //     return;
    // }

    // Ensure vu and vu.sop are initialized
    if (!window.vu) {
        window.vu = {}; 
    }
    if (!window.vu.sop) {
        window.vu.sop = {}; 
    }
    if (!window.vu.face) {
        window.vu.face = {}; 
    }    

    let folder;
    let fileName;

    if(!basePath)
        basePath = "/dist";

    vu.sop.basePath = basePath;
    
    try {
        let htmlLoad;

        htmlLoad = await vu.extras.loadFile(basePath, "html", "onboarding.html", techStack)
            .then(content => {
                htmlLoad = content;
                document.getElementById('vu.sop').innerHTML = htmlLoad;

                vu.sop.createLoadingImg(); 
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });

                   

        console.log("vu.sop.setHEICFileFormatSupport", vu.sop.setHEICFileFormatSupport);
        if (vu.sop.setHEICFileFormatSupport) {
            vu.sop.HEICFileFormatSupportLibLoad = await vu.extras.loadScript(basePath, techStack, "libs/heic2any", "heic2any.min.js", "heic2any");
        }

        let webRTCadapter = await vu.extras.loadScript(basePath, techStack, "libs/webrtc", "adapter-latest.js", "adapter");
        let msgsLanguage = "vu.sop.msg."+ vu.sop.lang +".js";
        let msgs = await vu.extras.loadScript(basePath, techStack, "", msgsLanguage, "vu.sop.msg");

        vu.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu.sop.msg || {});

        // let audios = await vu.extras.loadScript(basePath, techStack, "", "vu.sop.audio.js", "vu.sop.audio");
        // console.log("audios", audios);
        // vu.sop.audio = audios;

        let errors =  vu.error;
        let documentCodes = vu.sop.documentCodes;

        let tfJsLoad = await vu.extras.loadScript(basePath, techStack, "libs/tensorflowjs/4.22.0", "tf.min.js", "tf");
        let tfJsWasmLoad = await vu.extras.loadScript(basePath, techStack, "libs/tensorflowjs/4.22.0", "tf-backend-wasm.min.js", "tf.wasm");

        vu.sop.tfPath = basePath + "/libs/tensorflowjs/4.22.0/";

        //await tfJsWasmLoad;
        await msgs;
        await errors;
        
        /*****************************************************************/
        let barcode;
        if ( vu.sop.readBarcodeClientSide ) {
            barcode = vu.sop.barcode;

            vu.sop.barcode.loadPromise = vu.sop.barcode.load(basePath, techStack);

            //window.vu.sop.barcode = vu.sop.barcode;
        }

        // if ( vu.sop.challengeType === true) {
        //     //vu.face.nncPath = basePath + '/js/libs/face/';
        //     if (vu.sop.preCacheFaceModelAsync) {
        //         console.log("Pre Cache Face Model - Enabled");
        //         //vu.sop.preCacheFaceModelPromise = vu.sop.loadHtml(vu.face.nncPath + '/jeelizFaceTransferNNC.json');
        //     }
        //     fileName = 'jeelizFaceTransferNNC.json'; 
        // } else {
        if ( vu.sop.challengeType == "points") {        
            console.log('Challenge orientation model', vu.sop.faceOrientationModelWeights);
            if ( vu.sop.faceOrientationModelWeights == 'VERYLIGHT' ) {
                //vu.face.nncPath = basePath + '/js/libs/face/NN_VERYLIGHT_0.json';
                fileName = 'NN_VERYLIGHT_0.json';
            } else if ( vu.sop.faceOrientationModelWeights == 'LIGHT' ) {
                //vu.face.nncPath = basePath + '/js/libs/face/NN_DEFAULT.json';
                fileName = 'NN_DEFAULT.json';
            } else if ( vu.sop.faceOrientationModelWeights == 'NORMAL' ) {
                //vu.face.nncPath = basePath + '/js/libs/face/NN_LIGHT_0.json';
                fileName = 'NN_LIGHT_0.json';
            }  else  {
                //vu.face.nncPath = basePath + '/js/libs/face/NN_WIDEANGLES_0.json';
                fileName = 'NN_WIDEANGLES_0.json';
            }

            // if (vu.sop.preCacheFaceModelAsync) {
            //     console.log("Pre Cache Face Model - Enabled");
            //     vu.sop.preCacheFaceModelPromise = vu.sop.loadHtml( vu.face.nncPath );
            // }
        }

        folder = 'libs/face';

        if (vu.sop.challengeType == "points" && vu.sop.preCacheFaceModelAsync) {
            vu.extras.loadFile(basePath, folder, fileName, techStack)
                .then(content => {
                    vu.sop.preCacheFaceModelPromise = content;
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                });   
        }
        
        if(fileName)
            vu.face.nncPath = basePath + "/" + folder + "/" + fileName;
        else
            vu.face.nncPath = basePath + "/" + folder + "/";      
        
        window.vu.face.nncPath = vu.face.nncPath;

        console.log("vu.face.nncPath", vu.face.nncPath);

        let loadAudioLang;
        let audioLangLoad;

        if ( vu.sop.audio.enabled == false ) {
            console.log("Audio Load is disabled by conf");
            loadAudioLang = false;
        } else {
            console.log("Audio Load is enabled by conf");
            loadAudioLang = true;
        }
        //console.log("loadAudioLang", loadAudioLang);
        //console.log("vu.sop.audio", vu.sop.audio);
        if (loadAudioLang) {
            let audioLanguage = "vu.sop.audio."+ vu.sop.lang +".js";
            audioLangLoad = await vu.extras.loadScript(basePath, techStack, "", audioLanguage, "vu.sop.audio");     
            Object.assign(vu.sop.audio, audioLangLoad);
            let lang = vu.sop.lang.charAt(0).toUpperCase() + vu.sop.lang.slice(1);

            try {
                // Dynamically load the language-specific audio script
                
                const audioModule = await vu.extras.loadScript(basePath, techStack, "", `vu.sop.audio${lang}PreLoad.js`, "vu.sop.preaudio");

                vu.sop.preaudio = Object.assign({}, window.vu.sop.preaudio || {}, vu.sop.preaudio || {});

                // Access the audios array (fallback if it isn't found as audios)
                const audios = (audioModule?.audios || vu.sop.preaudio?.audios);
            
                if (audios && Array.isArray(audios)) {
                    // Insert audios into the DOM after the script is fully loaded
                    audios.forEach(audio => {
                        const audioElementId = audio.id;
                        let existingAudioElement = document.getElementById(audioElementId);
                        
                        if (!existingAudioElement) {
                            const audioElement = document.createElement('audio');
                            audioElement.id = audioElementId;
                            audioElement.src = audio.src;
                            audioElement.preload = 'auto';
                            audioElement.muted = true;
                            document.body.appendChild(audioElement);
                        } else {
                            console.log(`Audio element with ID '${audioElementId}' already exists.`);
                            vu.sop.audioPreloaded = true;
                        }
                    });
                } else {
                    console.error("Failed to load or find the audio list.");
                }
            } catch (error) {
                console.error("Failed to load the language-specific audio script:", error);
            }
        }
        let audioLoad =  vu.sop.audio;
        // console.log("vu.sop.audio 2", vu.sop.audio);
        let cameraLoad =  vuCamera;
        //window.vu.camera = vu.camera;
        let blurDetectionLoad =  await vu.extras.loadScript(basePath, techStack, "libs/inspector-bokeh/dist", "measure_blur.js", "measureBlur");
        let picoLoad =  await vu.extras.loadScript(basePath, techStack, "libs/pico", "pico.js", "pico");
        let documentLoad =  vu.sop.document.objectDetection;
        //window.vu.sop.document.objectDetection = vu.sop.document.objectDetection;

        let apiLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.sop.api.js", "vu.sop.api");  
        //window.vu.sop.api = vu.sop.api;
        vu.sop.api = Object.assign({}, window.vu.sop.api || {}, vu.sop.api || {});

        let sopUILoad =  vu.sop.ui;
        
        // console.log("after load vu.sop.api", vu.sop.api);
        // vu.sop.api = window.vu.sop.api; 
        // console.log("after window assign vu.sop.api", vu.sop.api);
        // console.log("apiLoad", apiLoad);
        
        //let documentFaceLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.document.face.js');
        let documentUiLoad =  vu.sop.document.ui;
        let imageLib =  vu.image; 
        window.vu.image = vu.image;
        let screenCapture =  vu.screen.capture; 

        let h264 =  await vu.extras.loadScript(basePath, techStack, "libs/h264-mp4-encoder", "h264-mp4-encoder.web.js", "HME"); 
        let htm2canvas = await vu.extras.loadScript(basePath, techStack, "libs/html2canvas", "html2canvas.min.js", "html2canvas");
        let uaparser = await vu.extras.loadScript(basePath, techStack, "libs/ua-parser-js", "ua-parser.js", "UAParser");

        let faceLoad;
        let faceUiGesturesLoad;
        let faceLibLoad;
        let faceObjectDetection;
        let faceDirectionGesturesDetection;
        let faceMixedChallengeUi;

        // if (vu.sop.challengeType == true) {
        //     console.log('Loading challenge gestures')
        //     faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.gestures.js", "vu.face");
        //     faceUiGesturesLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.ui.gestures.js", "vu.face.ui.gestures"); 
        //     faceLibLoad = await vu.extras.loadScript(basePath, techStack, "libs/face", "jeelizFaceTransfer.js", "JEEFACETRANSFERAPI"); 
        // } else 
        if (vu.sop.challengeType == 'mixed'){
            console.log('Loading mixedChallenge mode');
            faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.mixedChallenge.js", "vu.face");
            faceObjectDetection =  vu.sop.face.objectDetectionAndRotation;            
            faceDirectionGesturesDetection =  vu.sop.face.model.directionsAndGestures;            
            faceUiGesturesLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.ui.mixedChallenge.js", "vu.face.ui.gestures"); 

            window.vu.sop.face = window.vu.sop.face || {};  // Ensure `face` exists
            window.vu.sop.face.model = window.vu.sop.face.model || {};  // Ensure `model` exists
            
            window.vu.sop.face.objectDetectionAndRotation = vu.sop.face.objectDetectionAndRotation;
            window.vu.sop.face.model.directionsAndGestures = vu.sop.face.model.directionsAndGestures;
        } 
        else 
        {
            console.log('Loading challenge orientation');
            faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.orientation.js", "vu.face");
            faceLibLoad = await vu.extras.loadScript(basePath, techStack, "libs/face", "jeelizFaceFilter.js", "JEEFACEFILTERAPI");
        }

        //console.log("vu.face", vu.face);
        //console.log("window.vu.face", window.vu.face);

        vu.face = Object.assign(window.vu.face, faceLoad);
        // Ensure the vu.face.ui object exists and preserves dynamically loaded gestures
        // Merge vuFaceUi while preserving dynamically loaded gestures
        vu.face.ui = {
            ...window.vu.face.ui,  // Spread existing properties from window.vu.face.ui
            ...vuFaceUi,           // Spread new properties from vuFaceUi (but don't overwrite existing ones)
            gestures: {            // Ensure gestures are preserved or merged
                ...(window.vu.face.ui?.gestures || {}),  // Spread existing gestures if they exist
                ...(faceUiGesturesLoad ? faceUiGesturesLoad : {})  // Only spread loaded gestures if faceUiGesturesLoad exists
            }
        };

        // TODO Revisar esta linea, si se utiliza OM y Face en distintas etapas, yendo y viniendo, termina rompiendo el modulo de vu.face.auth
        console.log("vu.face.auth", vu.face.auth);
        console.log("window.vu.face.auth", window.vu.face.auth);
        console.log("vuFaceAuth", vuFaceAuth);
        console.log("window.vuFaceAuth", window.vuFaceAuth);

        // Si se instancia face y idcard, al compartirse objetos, pueden perderse valores
        if(window.vuFaceAuth.userNameValue != null || window.vuFaceAuth.challengeType != null)
        {
            vu.face.auth = window.vuFaceAuth;   
            
            Object.keys(vuFaceAuth).forEach((key) => {
                const value = vuFaceAuth[key];
        
                // Check if the property is a simple value (string, number, or boolean) 
                // and if it's different in window.vuFaceAuth
                if ((typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') &&
                    window.vuFaceAuth[key] !== value) {
                    vu.face.auth[key] = value;  // Update only if values are different
                }
            });
        }            
        else
        {
            vu.face.auth = vuFaceAuth;     
        }
            

        let faceUiLoad =  vu.face.ui;
        //let faceUiGesturesLoad =  vu.sop.loadJs(basePath + '/js/vu.face.ui.gestures.js');
        let faceAuth =  vu.face.auth;

        let logApi;
        let telemetry;

        if(vu.sop.enableTelemetry){
            console.log('Loading telemetry');
            logApi = await vu.extras.loadScript(basePath, techStack, "", "vu.sop.logApi.js", "vu.sop.logApi"); 

            vu.sop.logApi = Object.assign({}, window.vu.sop.logApi || {}, vu.sop.logApi || {});

            telemetry = vu.telemetry;

            vu.telemetry.initialize();
        }

        await webRTCadapter;
        await cameraLoad;
        await blurDetectionLoad;
        await picoLoad;
        await apiLoad;
        await sopUILoad;
        await documentLoad;
        //await documentFaceLoad;
        await documentUiLoad;
        await faceAuth;
        await audioLoad;
        await faceUiLoad;
        await imageLib;
        await screenCapture;
        await h264;
        await htm2canvas;
        await uaparser;
        await documentCodes;

        // if (vu.sop.challengeType == true) {
        //     await faceUiGesturesLoad;
        //     await faceLoad;
        //     await faceLibLoad;
        // } else 
        if (vu.sop.challengeType == 'mixed') {
            await faceLoad;
            await faceObjectDetection;
            await faceDirectionGesturesDetection;
            await faceUiGesturesLoad;
        } else {
            await faceLoad;
            await faceUiLoad;
            await faceLibLoad;
        }

        if (loadAudioLang) {
            await audioLangLoad;
        }

        // if ( vu.sop.readBarcodeClientSide ) {
        //     await barcode;
        //     vu.sop.barcode.loadPromise = barcode;
        // }

        if(vu.sop.enableTelemetry){
            await logApi;
            await telemetry;
        }

        vu.sop.document.objectDetection.modelURL = basePath + '/models/document/model.json';
        //vu.sop.document.face.cascadeUrl = basePath + '/js/libs/pico/facefinder.txt';

        document.getElementById('vu.sop.ui.userName').placeholder = vu.sop.msg.userInputPlaceholder;
        document.getElementById('vu.sop.ui.userNameSendBtn').innerHTML = vu.sop.msg.userSendBtn;

        vu.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");
        

        window.vu.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu.sop.msg || {});
        window.vu.sop.audio = Object.assign({}, window.vu.sop.audio || {}, vu.sop.audio || {});   
        window.vu.sop.ui = vu.sop.ui;  
        window.vu.face.nncPath = vu.face.nncPath;

        window.vu.sop.audioPreloaded = vu.sop.audioPreloaded;

        window.vu.sop.screenRecorder = vu.sop.screenRecorder;

        window.vu.sop.document = vu.sop.document;
        

        // console.log("vu.sop.document.ui.doLoop", vu.sop.document.ui.doLoop);
        // console.log("vu.face.ui.gestures.loop", vu.face.ui.gestures.loop);
    
        // console.log("window.vu.sop.document.ui.doLoop", window.vu.sop.document.ui.doLoop);
        // console.log("window.vu.face.ui.gestures.loop", window.vu.face.ui.gestures.loop);    

        
        vu.face.initialize(vuCamera);
        vu.face.ui.initialize(vuCamera);

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.initialize === 'function') 
            vu.face.ui.gestures.initialize(vuCamera);

        vu.sop.ui.initialize(vuCamera);        
        vu.sop.document.ui.initialize(vuCamera);
        vu.sop.audio.initialize();
        vu.sop.barcode.initialize(vuCamera);
        
        vu.error.initialize(vuCamera);

        // Initialize other modules that need camera access
        if (vu.sop.api && typeof vu.sop.api.initialize === 'function') {
            vu.sop.api.initialize(vuCamera);
        }
        if (vu.sop.screenTools && typeof vu.sop.screenTools.initialize === 'function') {
            vu.sop.screenTools.initialize(vuCamera);
        }
        if (vu.sop.document.face && typeof vu.sop.document.face.initialize === 'function') {
            vu.sop.document.face.initialize(vuCamera);
        }
        if (vu.face.mixedChallenge && typeof vu.face.mixedChallenge.initialize === 'function') {
            vu.face.mixedChallenge.initialize(vuCamera);
        }        

        vu.sop.initialized = true;

        vu.sop.techStack = techStack;
        window.vu.sop.techStack = vu.sop.techStack;

        vu.sop.videoResizeObserverAttached = false;
        vu.sop.resizeScheduled = false;

    } catch (e) {
        console.log('Network Loading Error');
        console.log(e);
        throw new Error('NETWORK_ERROR');
    }
    try {
        if (!vu.sop.ui.isDeviceCompatible()) {
            throw new Error('deviceNotSupported');
        }

        vu.sop.ui.isBrowserCompatible();

        if(!vu.sop.ui.isSOCompatible()){
           throw new Error('osOldVersion');
        }

    } catch (e) {
        console.log(e);
        vu.sop.ui.hideWhiteLoading();
        vu.error.showError(new vu.error.LoadError(e.message));
        vu.sop.ui.showWhiteLoading();
    }};

// vu.sop.load = async function(basePath) {
//     console.warn("Warning: 'vu.sop.load' is deprecated and will be removed in future versions. Please use 'vu.sop.initialize' instead.");
// };

vu.sop.getBase64  = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(evt){
        let fileFormat = file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase();
        console.log("Formato de la imagen:",fileFormat);
        let supportedFormats = ['JPG', 'JPEG', 'PNG', 'WEBP', 'AV1'];
        // HEIC Support
        if (vu.sop.setHEICFileFormatSupport) { supportedFormats.push('HEIC'); }

        if (!supportedFormats.includes(fileFormat)) {
            reject(new Error('badImageFormat'));
        }
        let img = new Image();
        if ( fileFormat == 'HEIC') {
            vu.sop.HEICFileFormatSupportLibLoad.then(function () {
                heic2any({
                    blob: file,
                    toType: "image/jpeg",
                }).then(function (resultBlob) {
                    let url = URL.createObjectURL(resultBlob);
                    img.src = url;
                })
                .catch(function (x) {
                    reject(new Error('badImageFormat'));
                });
            }).catch(function (x) {
                reject(new Error('badImageFormat'));
            });
        } else {
            img.src = evt.target.result;
        }

        img.onload = function() {
            let maxSize = 1990;
            let minSize = 720;

            let canvas;
            let ctx;
            let result;
            let newHeight;
            let newWidth;

            if (img.height < minSize || img.width < minSize ){
                reject(new Error('smallDocumentImg'));
            } else if (maxSize > img.height && maxSize > img.width ) {
                canvas = document.createElement('canvas');
                canvas.height = img.height;
                canvas.width = img.width;
                ctx = canvas.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, img.width, img.height);
                result = canvas.toDataURL("image/jpeg", 0.9);
                resolve(result);
            } else {
                canvas = document.createElement('canvas');
                if (img.height > img.width) {
                    newHeight = maxSize;
                    newWidth = Math.round((img.width * maxSize) / img.height);
                } else {
                    newHeight = Math.round((img.height * maxSize) / img.width);
                    newWidth = maxSize;
                }
                console.log('Upload Img Resize from' , img.width, img.height, ' to ', newWidth, newHeight);
                canvas.height = newHeight;
                canvas.width = newWidth;
                ctx = canvas.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                result = canvas.toDataURL("image/jpeg", 0.9);
                resolve(result);
            }
        };
    };
    //reader.onerror = error => reject(new Error('badImageFormat'));
    reader.onerror = function(evt){
        console.log('onerror', evt);
        reject(new Error('badImageFormat'));
    };
  });
};

vu.sop.videoResizeObserverAction = function(){
    let vid;
    let vidContainer;
    console.log("vu.sop.videoResizeStyleFillContainer", vu.sop.videoResizeStyleFillContainer);
    if (document.getElementById('vu.sop.ui.video') !== null) {
        if (vu.sop.videoResizeRules == 'doc') {
            console.log('Video element change, applying styles: doc');
            vid = document.getElementById('vu.sop.ui.video');
            if (window.innerHeight > window.innerWidth) {
                // Si la pantalla esta en vertical
                if (vuCamera.isVerticalVideo()) {
                    // Si el video esta en vertical
                    if (vu.sop.videoResizeStyleFillContainer) {
                        console.log('Rules doc - Vertical Screen - Vertical video - fill yes');
                        vid.style.maxWidth = "inherit";
                        vid.style.maxHeight = "fit-content";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    } else {
                        console.log('Rules doc - Vertical Screen - Vertical video - fill no');
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    }
                } else {
                    if (vu.sop.videoResizeStyleFillContainer) {
                        console.log('Rules doc - Vertical Screen - Horizontal video - fill yes');
                        vid.style.maxWidth = "fit-content";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    } else {
                        console.log('Rules doc - Vertical Screen - Horizontal video - fill no');
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    }
                }
            } else {
                if (vu.sop.videoResizeStyleFillContainer){
                    console.log('Rules doc - Horizontal Screen - Horizontal video - fill yes');
                    vid.style.maxWidth = "fit-content";
                    vid.style.maxHeight = "inherit";
                    vid.style.width = "auto";
                    vid.style.height = "auto";
                } else {
                    console.log('Rules doc - Horizontal Screen - Horizontal video - fill no');
                    // Si la pantalla esta en horizontal
                    vid.style.maxHeight = "100%";
                    vid.style.maxWidth = "100%";
                    vid.style.width = "auto";
                    vid.style.height = "auto";
                }
            }
            let bg = document.getElementById('vu.sop.document.ui.background');
            bg.style.maxWidth = vuCamera.video.offsetWidth + "px";
            //bg.style.maxHeight = vuCamera.video.offsetHeight + "px";
        }
        if (vu.sop.videoResizeRules == 'face') {
            console.log('Video element change, applying styles: face');
            vid = document.getElementById('vu.sop.ui.video');
            vidContainer = document.getElementById("vu.sop.ui.videoContainer");

            if (window.innerHeight > window.innerWidth) {
                // Si la pantalla esta en vertical
                if (vuCamera.isVerticalVideo()) {
                    if (vu.sop.videoResizeStyleFillContainer) {
                        //alert('Rules face - Vertical Screen - Vertical video - fill yes')
                        console.log('Rules face - Vertical Screen - Vertical video - fill yes');
                        // Si el video esta en vertical
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "none";
                        vid.style.width = "100%";
                        vid.style.height = "auto";
                    } else {
                        //alert('Rules face - Vertical Screen - Vertical video - fill no')
                        console.log('Rules face - Vertical Screen - Vertical video - fill no');
                        // Si el video esta en vertical
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "100%";
                        vid.style.height = "auto";
                    }
                } else {
                    if (vu.sop.videoResizeStyleFillContainer) {
                        // Si el video esta en horizontal
                        let proportionVideo = vid.offsetHeight / vid.offsetWidth;
                        let proportionContainer = vidContainer.offsetHeight / vidContainer.offsetWidth;

                        if ( proportionVideo < proportionContainer) {
                            console.log('Rules face - Vertical Screen - Horizontal video - fill yes - 1');
                            vid.style.maxWidth = "fit-content";
                            vid.style.maxHeight = "100%";
                            vid.style.width = "auto";
                            vid.style.height = "100%";
                        } else {
                            console.log('Rules face - Vertical Screen - Horizontal video - fill yes - 2');
                            vid.style.maxWidth = "100%";
                            vid.style.maxHeight = "fit-content";
                            vid.style.width = "100%";
                            vid.style.height = "auto";
                        }
                    } else {
                        console.log('Rules face - Vertical Screen - Horizontal video - fill no');
                        // Si el video esta en horizontal
                        vid.style.maxWidth = "inherit";
                        vid.style.maxHeight = "100%";
                        vid.style.width = "auto";
                        vid.style.height = "100%";
                    }
                }
            } else {
                // Si la pantalla esta en horizontal
                if (vuCamera.isVerticalVideo()) {
                    console.log('Rules face - Horizontal Screen - Vertical video - fill no');
                    // Si el video esta en vertical
                    vid.style.maxWidth = "100%";
                    vid.style.maxHeight = "inherit";
                    vid.style.width = "100%";
                    vid.style.height = "auto";
                } else {
                    // Si el video esta en horizontal
                    if (vu.sop.videoResizeStyleFillContainer) {
                        console.log('Rules face - Horizontal Screen - Horizontal video - fill yes');
                        vid.style.maxWidth = "fit-content";
                        vid.style.maxHeight = "100%";
                        vid.style.width = "auto";
                        vid.style.height = "100%";
                    } else {
                        console.log('Rules face - Horizontal Screen - Horizontal video - fill no');
                        vid.style.maxWidth = "inherit";
                        vid.style.maxHeight = "100%";
                        vid.style.width = "auto";
                        vid.style.height = "100%";
                    }
                }
            }
        }
    }

};

vu.sop.videoResizeRules = 'doc';
vu.sop.videoResizeStyleFillContainer = false;
vu.sop.resizeScheduled = false;
vu.sop.videoResizeObserver = new ResizeObserver(() => {
    console.trace("ResizeObserver fired in vu.sop.videoResizeObserver");
    if (vu.sop.resizeScheduled) return;

    vu.sop.resizeScheduled = true;

    requestAnimationFrame(() => {
        try {
            vu.sop.videoResizeObserverAction?.();
        } catch (err) {
            console.warn('ResizeObserver action error:', err);
        } finally {
            vu.sop.resizeScheduled = false;
        }
    });
});

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

if (typeof vu.sop.steps == "undefined") { vu.sop.steps = function() {}; }

//if (typeof vu.sop.screenRecorder == "undefined") { vu.sop.screenRecorder = function() {} }

vu.sop.screenRecorder.recorder;
vu.sop.screenRecorder.stream;

vu.sop.screenRecorder.sendVideo = false;
vu.sop.screenRecorder.videoReady = false;
vu.sop.screenRecorder.completeBlob;

vu.sop.startRecording = async function() {
    if(vu.sop.recordProcess === true) {
        if (vu.sop.ui.isMobile()) {
            vu.screen.capture.recordVideoStart();
        } else {
            // TODO - Mover screenRecorder a vu.screen.capture
            try {
                vu.sop.screenRecorder.stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {mediaSource: "screen"}
                });
                vu.sop.screenRecorder.recorder = new MediaRecorder(vu.sop.screenRecorder.stream);
                const chunks = [];
                vu.sop.screenRecorder.recorder.ondataavailable = e => chunks.push(e.data);
                vu.sop.screenRecorder.recorder.onstop = e => {
                    try {
                        let videoType = chunks[0].type.split(';')[0];
                        vu.sop.screenRecorder.completeBlob = new Blob(chunks, { 'type' : 'video/mp4' });
                        vu.sop.screenRecorder.videoReady = true;
                    } catch (e) {
                        console.log("Video Stop");
                    }
                };
                vu.sop.screenRecorder.recorder.start();
            } catch (e) {
                console.log("video record error:", e);
                await vu.sop.ui.hideWhiteLoading();
                if(vu.sop.enableTelemetry){
                    vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SCREEN_RECORDING_ERROR});
                }
                await vu.error.showError(new vu.error.UserError('startRecordingFail'));
                throw e;
            }
        }
    }
};

vu.sop.stopRecording = async function() {
    if (vu.sop.ui.isMobile()) {
        try {
            if (vu.screen.capture.doCaptureLoop) {
                return vu.screen.capture.recordVideoStop()
            } else {
                console.log("No Screen record active");
            }
        } catch(e){
            console.log("No Screen record active");
        }
    } else {
        // TODO - Mover screenRecorder a vu.screen.capture
        if( vu.sop.screenRecorder.sendVideo === false) {
            try {
                vu.sop.screenRecorder.stream.getTracks().forEach(track => {
                    track.stop();
                });
            } catch(e){
                console.log("No Screen record active");
            }
        }
        try{
            if(vu.sop.recordProcess === true) {
                if(vu.sop.screenRecorder.recorder !== undefined) {
                    if(vu.sop.screenRecorder.recorder.state != "inactive") {
                        vu.sop.screenRecorder.recorder.stop();
                        vu.sop.screenRecorder.stream.getVideoTracks()[0].stop();
                        if( vu.sop.screenRecorder.sendVideo === true) {
                            while(vu.sop.screenRecorder.videoReady === false) {
                                await vu.sop.ui.sleep('100');
                            }
                            console.log(vu.sop.screenRecorder.completeBlob);
                            return await vu.sop.steps.addVideoResolve(vu.sop.screenRecorder.completeBlob);
                        } else {
                            while(vu.sop.screenRecorder.videoReady === false) {
                                await vu.sop.ui.sleep('100');
                            }
                            return vu.sop.screenRecorder.completeBlob;
                        }
                    }
                }
            }
        }catch (e) {
            vu.sop.screenRecorder.sendVideo = false;
            await vu.sop.stopRecording();
            return new Error(e.message)
        }    }
};



//------------------------------------------------------------------------------------------------------
vu.sop.start = async function() {
    // Prepara la camara y librerias para userInput() document()
    await vu.sop.steps.loadLibsAndCamera();
    vu.sop.browserInfo = await getBrowserInfo();
    // console.log("window.vu.sop.api", window.vu.sop.api);
    // console.log("vu.sop.api", vu.sop.api);
    
    // console.log("vu.sop.audio", vu.sop.audio);
    // console.log("window.vu.sop.audio", window.vu.sop.audio);

    window.vu.sop.api = Object.assign({}, window.vu.sop.api || {}, vu.sop.api || {});
    window.vu.sop.steps = Object.assign({}, window.vu.sop.steps || {}, vu.sop.steps || {});
    window.vu.sop.logApi = Object.assign({}, window.vu.sop.logApi || {}, vu.sop.logApi || {});
    //window.vu.sop.screenRecorder = Object.assign({}, window.vu.sop.screenRecorder || {}, vu.sop.screenRecorder || {});

    
 
    // console.log("vu.sop.audio", vu.sop.audio);
    // console.log("window.vu.sop.audio", window.vu.sop.audio);

    // console.log("window.vu.sop.api", window.vu.sop.api);
    // console.log("vu.sop.api", vu.sop.api);

    

    // console.log("vu.sop.browserInfo3", vu.sop.browserInfo);
    // console.log("vu.sop.api", vu.sop.api);    


    // Implementacion del Warning cuando la camara no tiene control de foco
    if (vu.sop.ui.isMobile()) {
        // Es un Celular
        if (vu.sop.checktCameraFocusCapabilitiesInMobile) {
            // Hay que mostrar el warning si la camara no tiene control de foco
            if (vuCamera.hasFocusControl() === false){
                // La camara NO tiene control de foco
                vu.sop.ui.alert(vu.sop.msg.cameraWithoutFocusControl);
            }
        }
    } else {
        // Es una PC
        if (vu.sop.checkCameraFocusCapabilitiesInPC) {
            // Hay que mostrar el warning si la camara no tiene control de foco
            if (vuCamera.hasFocusControl() === false){
                // La camara NO tiene control de foco
                vu.sop.ui.alert(vu.sop.msg.cameraWithoutFocusControl);
            }
        }
    }

    // Iniciamos el proceso del usuario
    if (vu.sop.userNameValue == null) {
        // Pantalla de ingreso de usuario
        await vu.sop.steps.userInput();
    } else {
        // Saltamos la pantalla de ingreso del usuario
        await vu.sop.ui.user.doPreSetUser(vu.sop.userNameValue, false);
    }

    // console.log("vu.sop.operationIdValue", vu.sop.operationIdValue);
    // console.log("window.vu.sop.operationIdValue", window.vu.sop.operationIdValue);
    vu.sop.ui.initialize(vuCamera);
    vu.screen.capture.initialize(vuCamera);
    // console.log("vu.sop.operationIdValue", vu.sop.operationIdValue);
    // console.log("window.vu.sop.operationIdValue", window.vu.sop.operationIdValue);   

    vu.sop.operationIdValue = window.vu.sop.operationIdValue;
    vu.sop.operationGuidValue = window.vu.sop.operationGuidValue;

    try {
        // Pantallas para subir los documentos
        await vu.sop.steps.document();


        if(vu.sop.enableTelemetry){
            vu.telemetry.addEvent("SelfieActivityProcess" , "start" , {});
        }

        // Prepara la camara y librerias para authFace()

        await vu.sop.steps.loadLibsAndCameraFace();
        // Graba el proceso de prueba de vida
        await vu.sop.startRecording();
        // Pantalla de autenticacion
        return await vu.sop.steps.authFace()

    } catch (e) {
        console.log("e", e);
        vu.sop.screenRecorder.sendVideo = false;
        await vu.sop.stopRecording();
        return new Error(e.message)
    }};

vu.sop.steps.documentPromiseResolve = null;
vu.sop.steps.documentPromiseReject = null;

vu.sop.steps.document = async function() {
    let promise = new Promise(function (resolve, reject) {
        vu.sop.steps.documentPromiseResolve = resolve;
        vu.sop.steps.documentPromiseReject = reject;
        vu.sop.ui.show("vu.sop.ui.documentSelectUploadMethod");
        let divContainer = vu.sop.ui.documentSelectUploadMethodDraw("vu.sop.steps.takePictureDocument()", "vu.sop.steps.uploadFrontDocumentPicture()");
        document.getElementById("vu.sop.ui.documentSelectUploadMethod").appendChild(divContainer);
        vu.sop.audio.play('vu.sop.audio.addDocumentBottomText');
        vu.sop.ui.showBottomText(vu.sop.msg.addDocumentBottomText);
    });
    return promise;
};

vu.sop.steps.takePictureDocument = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentSelectUploadMethod");
    vu.sop.ui.hideBottomText();
    await vu.sop.steps.takePictureDocumentFront();
    await vu.sop.steps.takePictureDocumentBack();
    vu.sop.steps.documentPromiseResolve(true);
};

vu.sop.steps.uploadFrontDocumentPicture = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentSelectUploadMethod");
    vu.sop.ui.hideBottomText();
    vu.sop.ui.show("vu.sop.ui.documentFileUploadFront");
    let divContainer = vu.sop.ui.documentFileUploadFrontDraw();
    document.getElementById("vu.sop.ui.documentFileUploadFront").appendChild(divContainer);
    vu.sop.audio.play('vu.sop.audio.addFrontDocumentBottomMsg');
    vu.sop.ui.showBottomText(vu.sop.msg.addFrontDocumentFileUploadBottomMsg);
    //vu.sop.steps.documentPromiseResolve(true)
    console.log("here1");
};

vu.sop.steps.uploadFrontDocumentPictureResolve = async function(file) {

    if(vu.sop.enableTelemetry){
        vu.telemetry.addEvent("DocumentActivityProcess", "start",
            { "screenId": 1 }
        );
    }

    if(vu.sop.userNameValue == null)
        vu.sop.userNameValue = document.getElementById("vu.sop.ui.userName").value;
    
    while (true) {
        try {
            console.log(file);
            // Show faceLoad
            if (file.length < 1){
                break
            }
            let frontDocumentImg = await vu.sop.getBase64(file[0]);
            vu.sop.ui.addFrontImg = frontDocumentImg;
            await vu.sop.ui.showWhiteLoading();

            let response = await vu.sop.api.addFront(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                vu.sop.operationGuidValue,
                frontDocumentImg);
            if (response.code != 909) {
                // TODO Revisar estas condiciones porque hay duplicidad e incoherencia con el codigo 9097
                if (response.code === 910 || response.code === 9091 || response.code === 9097) {
                    throw new Error('addFrontApiErrorAntiSpoofing')
                } else if (response.code === 9097) {
                    // No se detecto el rostro en el doc
                    if(vu.sop.enableTelemetry){
                        vu.telemetry.addEvent("DocumentActivityProcess", "end",
                            {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.DOCUMENT_FACE_NOT_FOUND});
                    }
                    throw new Error('documentPictureNotDetected')
                } else if (response.code === 911) {
                    throw new Error('addFrontApiErrorFrontAlreadyExist')
                } else {
                    throw new Error('addFrontApiError')
                }
            }
            console.log(response);

            vu.sop.ui.addFrontResponse = response;
            if ("addBackRequired" in response) {
                if (response.addBackRequired){
                    console.log("addBack is Required");
                    vu.sop.addBackRequired = response.addBackRequired;
                }
            }
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired) {
                    console.log("addDocumentPicture is Required");
                    if (!response.documentPictureDetected) {
                        if(vu.sop.enableTelemetry){
                            vu.telemetry.addEvent("DocumentActivityProcess", "end",
                                {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.DOCUMENT_FACE_NOT_FOUND});
                        }
                        throw new Error('documentPictureNotDetected')
                        // addDocumentImage esta deshabilitada
                        /*
                        face = await vu.sop.document.face.do(vu.sop.ui.addFrontImg)
                        if ( face !== null) {
                            response = await vu.sop.api.addDocumentImage(vu.sop.userNameValue,
                                                                         vu.sop.operationIdValue,
                                                                         vu.sop.operationGuidValue,
                                                                         face);
                            console.log("face Resp",response)
                            if (response.code != 938) {
                                throw new Error('documentPictureNotDetected')
                            }
                        } else {
                            throw new Error('documentPictureNotDetected')
                        }
                        */
                    }
                }
            }
            if (vu.sop.barcodeOptional === false) {
                if ("containsBarcode" in response) {
                    if (response.containsBarcode) {
                        console.log("barcode is Required");
                        if (!response.barcodeDetected) {
                            throw new Error('documentBarcodeNotDetected')
                        }
                    }
                }
            }
            await vu.sop.ui.hideWhiteLoading();
            if (vu.sop.addBackRequired) {
                if(vu.sop.enableTelemetry && response.code === 909){
                    vu.telemetry.addEvent("DocumentActivityProcess", "end",
                        {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.FRONT_SUCCESS});
                }
                await vu.sop.steps.uploadBackDocumentPicture();
            } else {
                if(vu.sop.enableTelemetry && response.code === 909){
                    vu.telemetry.addEvent("DocumentActivityProcess", "end",
                        {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.FRONT_SUCCESS});
                }
                vu.sop.steps.documentPromiseResolve(true);
                await vu.sop.ui.hideWhiteLoading();
                vu.sop.ui.hide("vu.sop.ui.documentFileUploadFront");
                vu.sop.ui.hideBottomText();
            }
            break
        } catch (e) {
            document.getElementById('documentFileUploadFrontInput').value = null;
            //document.getElementById('documentFileUploadBackInput').value = null;

            await vu.sop.ui.hideWhiteLoading();


            if (!e.hasOwnProperty('message'))
                e.message = e;

            console.log('vu.sop.ui.addFront', e);
            console.log('vu.sop.ui.addFront e.message', e.message);

            if (e.code === 10201){
                e.message = "addFrontApiErrorAntiSpoofing";
            }            

            await vu.error.showError(new vu.error.UploadDocumentFrontError(e.message));

        }
    }
};

vu.sop.steps.uploadBackDocumentPicture = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentFileUploadFront");
    vu.sop.ui.hideBottomText();
    vu.sop.ui.show("vu.sop.ui.documentFileUploadBack");
    let divContainer = vu.sop.ui.documentFileUploadBackDraw();
    document.getElementById("vu.sop.ui.documentFileUploadBack").appendChild(divContainer);
    vu.sop.audio.play('vu.sop.audio.addBackDocumentFileUploadBottomMsg');
    vu.sop.ui.showBottomText(vu.sop.msg.addBackDocumentFileUploadBottomMsg);
    //vu.sop.steps.documentPromiseResolve(true)
};


vu.sop.steps.uploadBackDocumentPictureResolve = async function(file) {

    if(vu.sop.enableTelemetry){
        vu.telemetry.addEvent("DocumentActivityProcess", "start",
            { "screenId": 2 }
        );
    }
    while (true) {
        try {
            // Show faceLoad
            if (file.length < 1){
                break
            }
            let backDocumentImg = await vu.sop.getBase64(file[0]);
            vu.sop.ui.addBackImg = backDocumentImg;
            await vu.sop.ui.showWhiteLoading();
            let response = await vu.sop.api.addBack(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                vu.sop.operationGuidValue,
                backDocumentImg);
            if (response.code != 912) {
                if (response.code === 913 || response.code === 9094 || response.code === 10200 ) {
                    throw new Error('addBackApiErrorAntiSpoofing')
                } else if (response.code === 914) {
                    throw new Error('addBackApiErrorFrontAlreadyExist')
                } else {
                    throw new Error('addBackApiError')
                }
            }

            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired){
                    console.log("addDocumentPicture is Required");
                    if(!response.documentPictureDetected) {
                        throw new Error('documentPictureNotDetected')
                    }
                }
            }
            if ( vu.sop.barcodeOptional === false ) {
                if (vu.sop.barcodeOptional === false) {
                    if ("containsBarcode" in response) {
                        if (response.containsBarcode) {
                            console.log("barcode is Required");
                            if (!response.barcodeDetected) {
                                if(vu.sop.enableTelemetry){
                                    vu.telemetry.addEvent("DocumentActivityProcess", "end",
                                        {"captureResponseNumber": vu.telemetry.captureResponseCode.BACK.BARCODE_NOT_FOUND});
                                }
                                throw new Error('documentBarcodeNotDetected')
                            }
                        }
                    }
                }
            }
            console.log(response);
            vu.sop.steps.documentPromiseResolve(true);
            if(vu.sop.enableTelemetry && response.code === 912){
                vu.telemetry.addEvent("DocumentActivityProcess", "end",
                    {"captureResponseNumber": vu.telemetry.captureResponseCode.BACK.BACK_SUCCESS});
            }
            await vu.sop.ui.hideWhiteLoading();
            vu.sop.ui.hide("vu.sop.ui.documentFileUploadBack");
            vu.sop.ui.hideBottomText();
            break
        } catch (e) {
            document.getElementById('documentFileUploadFrontInput').value = null;
            document.getElementById('documentFileUploadBackInput').value = null;
            await vu.sop.ui.hideWhiteLoading();
            console.log('vu.sop.ui.addBack', e);
            if (e.code === 10201){
                e.message = "addBackApiErrorAntiSpoofing";
            }            
            await vu.error.showError(new vu.error.UploadDocumentBackError(e.message));
        }
    }
};



// --------------------------------------------------------------------------------------------------

vu.sop.docObjectModelLoad = false;
vu.sop.docHaarLoad = false;
vu.sop.videoResizeObserverAttached = false;
vu.sop.steps.loadLibsAndCamera = async function() {
    if ( vu.sop.warmUpDocModelAsync ) {
        // Load network
        vu.sop.docObjectModelLoad = vu.sop.document.objectDetection.loadModel(vu.sop.tfPath);
        // Load HAAR
        //vu.sop.docHaarLoad  = vu.sop.document.face.preLoad()
    } else {
        // Load network
        await vu.sop.document.objectDetection.loadModel(vu.sop.tfPath);
        // Load HAAR
        //haarLoadPromise = await vu.sop.document.face.preLoad()
    }

    while (true) {
        try {
            await vu.sop.ui.showWhiteLoading();
            console.log("vu.sop.setCameraOrientationInPC", vu.sop.setCameraOrientationInPC);
            if (vu.sop.ui.isMobile()) {
                if (vu.sop.setCameraOrientationInMobile === 'auto') {
                    vuCamera.config.orientation = 'environment';
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment';
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user';
                }
            } else {
                if (vu.sop.setCameraOrientationInPC === 'auto') {
                    vuCamera.config.orientation = 'environment';
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment';
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user';
                }
            }

            vuCamera.config.previewResolution = 'highest';
            vuCamera.config.pictureResolution = 'highest';
            vuCamera.config.pictureForceLandscape = true;
            vuCamera.config.pictureForceLandscapeRotateClockwise = false;
            vuCamera.config.pictureFlash = true;
            vuCamera.config.pictureLessBlurry = false;
            await vuCamera.start("vu.sop.ui.video");

            //window.vu.camera = vuCamera;
            //vuCamera.setZoom(1.3)
            //vuCamera.setSharpness('lowest')
            //brightness = vuCamera.setBrightness('medium')

            if (vu.sop.flipDocumentCamera === 'auto') {
                if (vu.sop.ui.isMobile()) {
                    console.log('Flip Document configured to auto. Is mobile, mirroring screen');
                    vu.sop.ui.keepVideoHorizontal(vuCamera.video);
                }
            } else if (vu.sop.flipDocumentCamera) {
                console.log('Flip Document configured to true, mirroring screen');
                vu.sop.ui.flipVideoHorizontal(vuCamera.video);
            }

            vu.sop.videoResizeRules = 'doc';

            //vu.sop.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));

            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    requestAnimationFrame(() => {
                        const container = document.getElementById('vu.sop.ui.videoContainer');
                        if (container && !vu.sop.videoResizeObserverAttached) {
                            vu.sop.videoResizeObserver.observe(container);
                            vu.sop.videoResizeObserverAttached = true;
                        }
                    });
                });
            } else {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        const container = document.getElementById('vu.sop.ui.videoContainer');
                        if (container && !vu.sop.videoResizeObserverAttached) {
                            vu.sop.videoResizeObserver.observe(container);
                            vu.sop.videoResizeObserverAttached = true;
                        }
                    });
                }, 50);
            }     

            if (vu.sop.setDocumentBackgroudStyleMirror) {
                vu.sop.ui.showMirrorBackground();
            }

            break
        } catch (e) {
            await vu.sop.ui.hideWhiteLoading();
            console.log(e);
            await vu.error.showError(new vu.error.CameraError(e.message));
        }
    }
    // End Load Model
    //await objectDetectionLoadPromise;
    // Load HAAR
    //await haarLoadPromise;
};



vu.sop.steps.userInput = async function() {
    // ----------------------------------------
    // User Screen - SOP newOperation
    await vu.sop.ui.hideWhiteLoading();
    console.log("vu.sop.msg", vu.sop.msg);
    while (true){
        try {
            if (vu.sop.audio.enabled) {
                await vu.sop.ui.showBottomText(vu.sop.msg.userPleaseEnableAudio);
            }
            await vu.sop.ui.user.start();
            if (vu.sop.audio.enabled) {
                await vu.sop.ui.hideBottomText();
            }
            break
        } catch (e) {
            console.log('vu.sop.ui.user',e);
            await vu.error.showError(new vu.error.UserError(e));

        }    }};

vu.sop.steps.addVideoResolve = async function(video) {
        //await vu.sop.ui.showWhiteLoading();
        let response = await vu.sop.api.addVideos(vu.sop.userNameValue,
            vu.sop.operationIdValue,
            vu.sop.operationGuidValue,
            video);

        console.log('add video respo: ',response);
        await vu.sop.ui.hideWhiteLoading();
        return response;
};



vu.sop.steps.takePictureDocumentFront = async function() {
    // ----------------------------------------
    // Document Front - SOP addFront
    //
    let VUId;
    await vu.sop.ui.showLoading();

    if(vu.sop.enableTelemetry){
        vu.telemetry.addEvent("DocumentActivityProcess", "start",
            { "screenId": 1 }
        );
    }

    if(vu.sop.userNameValue == null)
        vu.sop.userNameValue = document.getElementById("vu.sop.ui.userName").value;


    if ( vu.sop.warmUpDocModelAsync ) {
        await vu.sop.docObjectModelLoad;
        await vu.sop.docHaarLoad;
    }

    console.log("vu.sop.msg", vu.sop.msg);

    // TODO mejorar esto, dirty fix
    vu.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background');
    vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgInactive;
    vu.sop.ui.show("vu.sop.document.ui.background");
    vu.sop.audio.play('vu.sop.audio.addFrontDocumentBottomMsg');
    vu.sop.ui.showBottomText(vu.sop.msg.addFrontDocumentBottomMsg);
    await vu.sop.ui.sleep(50);
    var start = new Date();
    console.log('Warming Up Start');
    await vu.sop.document.objectDetection.predictAsync(vuCamera.video);
    var end  = new Date();
    var time = end.getTime() - start.getTime();
    console.log('Warming Up End - Time', time, 'ms');
    await vu.sop.ui.hideLoading();
    while (true) {
        try {
            // Show faceLoad
            let frontDocumentImg = await vu.sop.document.ui.start('front');
            vu.sop.ui.addFrontImg = frontDocumentImg;
            await vu.sop.ui.showLoading();
            let response = await vu.sop.api.addFront(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                vu.sop.operationGuidValue,
                frontDocumentImg);

            if (response.code != 909) {
                if (response.code === 910 || response.code === 9091 || response.code === 9112) {
                    throw new Error('addFrontApiErrorAntiSpoofing')
                } else if (response.code === 9097) {
                    // No se detecto el rostro en el doc
                    if(vu.sop.enableTelemetry){
                        vu.telemetry.addEvent("DocumentActivityProcess", "end",
                            {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.DOCUMENT_FACE_NOT_FOUND});
                    }
                    throw new Error('documentPictureNotDetected')
                } else if (response.code === 911) {
                    throw new Error('addFrontApiErrorFrontAlreadyExist')
                } else {
                    throw new Error('addFrontApiError')
                }
            }
            console.log(response);

            if ("detectedCountryId" in response) {
                vu.sop.documentId = response.detectedCountryId;
                vu.sop.barcode.documentId = response.detectedCountryId; 
            }

            vu.sop.ui.addFrontResponse = response;
            if ("addBackRequired" in response) {
                if (response.addBackRequired) {
                    console.log("addBack is Required");
                    vu.sop.addBackRequired = response.addBackRequired;
                }
            }
            // Face in document-----------------------------------------------------------------------------------------
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired) {
                    console.log("addDocumentPicture is Required");
                    if (!response.documentPictureDetected) {
                        if(vu.sop.enableTelemetry){
                            vu.telemetry.addEvent("DocumentActivityProcess", "end",
                                {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.DOCUMENT_FACE_NOT_FOUND});
                        }
                        throw new Error('documentPictureNotDetected')
                        // addDocumentImage esta deshabilitada
                        /*
                        face = await vu.sop.document.face.do(vu.sop.ui.addFrontImg)
                        if ( face !== null) {
                            response = await vu.sop.api.addDocumentImage(vu.sop.userNameValue,
                                                                         vu.sop.operationIdValue,
                                                                         vu.sop.operationGuidValue,
                                                                         face);
                            console.log("face Resp",response)
                            if (response.code != 938) {
                                throw new Error('documentPictureNotDetected')
                            }
                        } else {
                            throw new Error('documentPictureNotDetected')
                        }
                         */
                    }
                }
            }
            // Barcode ------------------------------------------------------------------------------------------------
            if ("containsBarcode" in response && "barcodeDetected" in response) {
                if (response.barcodeDetected === false && response.containsBarcode === true) {
                    console.log("barcode is Required");
                    if(!response.barcodeDetected) {
                        if ( vu.sop.barcodeOptional === false ) {
                            VUId = vu.sop.documentCodes.getVUIdFromId(vu.sop.documentId);
                            if (vu.sop.readBarcodeClientSide === true &&
                                Object.keys(vu.sop.barcode.expectedBarcodes).includes(VUId)) {
                                // Nos aseguramos que la libreria esta cargada
                                await vu.sop.barcode.loadPromise;
                                await vu.sop.ui.hideLoading();
                                let barcodeData = await vu.sop.barcode.ui.start();
                                console.log(barcodeData);
                                await vu.sop.ui.showLoading();
                                let barcodeResponse = await vu.sop.api.addBarcode(
                                    vu.sop.userNameValue,
                                    vu.sop.operationIdValue,
                                    vu.sop.operationGuidValue,
                                    barcodeData[0],
                                    barcodeData[1]
                                );
                                await vu.sop.ui.hideLoading();
                                if (barcodeResponse.code != 920) {
                                    throw new Error('deviceNotSupported')
                                }
                            } else {
                                throw new Error('documentBarcodeNotDetected')
                            }
                        }
                    }
                }
            }
            // Barcode ------------------------------------------------------------------------------------------------
            if(vu.sop.enableTelemetry && response.code === 909){
                vu.telemetry.addEvent("DocumentActivityProcess", "end",
                    {"captureResponseNumber": vu.telemetry.captureResponseCode.FRONT.FRONT_SUCCESS});
            }
            await vu.sop.ui.hideLoading();
            break
        } catch (e) {
            await vu.sop.ui.hideLoading();
            console.log('vu.sop.ui.addFront', e);
            if (e.code === 10201){
                e.message = "addFrontApiErrorAntiSpoofing";
            }            
            await vu.error.showError(new vu.error.TakeDocumentFrontError(e.message));
        }
    }
    return true;
};

vu.sop.steps.takePictureDocumentBack = async function() {
    // ----------------------------------------
    // Document Back - SOP addBack
    //
    let VUId;
    if (vu.sop.addBackRequired) {
        if(vu.sop.enableTelemetry){
            vu.telemetry.addEvent("DocumentActivityProcess", "start",
                { "screenId": 2 }
            );
        }
        while (true) {
            try {
                let backDocumentImg = await vu.sop.document.ui.start('back');
                vu.sop.ui.addBackImg = backDocumentImg;
                vu.sop.audio.play('vu.sop.audio.audioBeep');

                await vu.sop.ui.showLoading();
                let response = await vu.sop.api.addBack(vu.sop.userNameValue,
                    vu.sop.operationIdValue,
                    vu.sop.operationGuidValue,
                    backDocumentImg);

                if (response.code != 912) {
                    if (response.code === 913 || response.code === 9094) {
                        throw new Error('addBackApiErrorAntiSpoofing')
                    } else if (response.code === 914) {
                        throw new Error('addBackApiErrorFrontAlreadyExist')
                    } else {
                        throw new Error('addBackApiError')
                    }
                }

                if ("addDocumentPictureRequired" in response) {
                    if (response.addDocumentPictureRequired) {
                        console.log("addDocumentPicture is Required");
                        if (!response.documentPictureDetected) {
                            throw new Error('documentPictureNotDetected')
                        }
                    }
                }
                // Barcode --------------------------------------------------------------------------------------------
                if ("containsBarcode" in response && "barcodeDetected" in response) {
                    if (response.barcodeDetected === false && response.containsBarcode === true) {
                        console.log("barcode is Required");
                        if(!response.barcodeDetected) {
                            if ( vu.sop.barcodeOptional === false ) {
                                VUId = vu.sop.documentCodes.getVUIdFromId(vu.sop.documentId);
                                if (vu.sop.readBarcodeClientSide === true &&
                                   Object.keys(vu.sop.barcode.expectedBarcodes).includes(VUId)) {
                                    // Nos aseguramos que la libreria esta cargada
                                    await vu.sop.barcode.loadPromise;
                                    await vu.sop.ui.hideLoading();
                                    let barcodeData = await vu.sop.barcode.ui.start();
                                    console.log(barcodeData);
                                    await vu.sop.ui.showLoading();
                                    let barcodeResponse = await vu.sop.api.addBarcode(
                                        vu.sop.userNameValue,
                                        vu.sop.operationIdValue,
                                        vu.sop.operationGuidValue,
                                        barcodeData[0],
                                        barcodeData[1]
                                    );
                                    await vu.sop.ui.hideLoading();
                                    if (barcodeResponse.code != 920) {
                                        throw new Error('deviceNotSupported')
                                    }
                                } else if(VUId !== 'VU-COL-ID-02' ){
                                    if(vu.sop.enableTelemetry){
                                        vu.telemetry.addEvent("DocumentActivityProcess", "end",
                                            {"captureResponseNumber": vu.telemetry.captureResponseCode.BACK.BARCODE_NOT_FOUND});
                                    }
                                    throw new Error('documentBarcodeNotDetected')
                                }
                            }
                        }
                    }
                }
                // Barcode --------------------------------------------------------------------------------------------
                console.log(response);

                if(vu.sop.enableTelemetry && response.code === 912){
                    vu.telemetry.addEvent("DocumentActivityProcess", "end",
                        {"captureResponseNumber": vu.telemetry.captureResponseCode.BACK.BACK_SUCCESS});
                }

                await vu.sop.ui.hideLoading();
                break
            } catch (e) {
                await vu.sop.ui.hideLoading();
                console.log('vu.sop.ui.addBack', e);
                if (e.code === 10201){
                    e.message = "addBackApiErrorAntiSpoofing";
                }                
                await vu.error.showError(new vu.error.TakeDocumentBackError(e.message));
            }
        }
    }

    return true;
};

vu.sop.faceModelLoad = false;
vu.sop.steps.loadLibsAndCameraFace = async function() {
   while (true) {
        if (vu.sop.disableBiometric) { break }
        try {
            await vu.sop.ui.showLoading();
            if (vu.sop.setDocumentBackgroudStyleMirror) {
                vu.sop.ui.hideMirrorBackground();
            }
            vu.sop.videoResizeRules = 'face';
            vu.sop.videoResizeObserver.disconnect();
            //vu.sop.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));

            requestAnimationFrame(() => {
                const container = document.getElementById('vu.sop.ui.videoContainer');
                if (container) {
                    vu.sop.videoResizeObserver.observe(container);
                }
            });            

            //vuCamera.setSharpness('lowest')
            //vuCamera.setZoom(1)
            //await faceLoadPromise;

            if (vu.sop.ui.isMobile()){
                if (vu.sop.setCameraOrientationInMobile === 'auto') {
                    vuCamera.config.orientation = 'user';
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment';
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user';
                }
                if (!vu.sop.useTheSameCameraInDocAndFaceInMobile) {
                    vuCamera.config.previewResolution = 'lowest';
                    vuCamera.config.pictureResolution = 'lowest';
                    vuCamera.config.pictureForceLandscape = false;
                    vuCamera.config.pictureFlash = false;
                    await vuCamera.start("vu.sop.ui.video");
                }
            } else {
                if (vu.sop.setCameraOrientationInPC === 'auto') {
                    vuCamera.config.orientation = 'user';
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment';
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user';
                }
                console.log("vu.sop.setCameraOrientationInPC", vu.sop.setCameraOrientationInPC);
                console.log("vu.sop.useTheSameCameraInDocAndFaceInMobile", vu.sop.useTheSameCameraInDocAndFaceInMobile);
                console.log("vu.sop.useTheSameCameraInDocAndFaceInPC", vu.sop.useTheSameCameraInDocAndFaceInPC);
                if (vu.sop.useTheSameCameraInDocAndFaceInPC === false) {
                    vuCamera.config.previewResolution = 'lowest';
                    vuCamera.config.pictureResolution = 'lowest';
                    vuCamera.config.pictureForceLandscape = false;
                    vuCamera.config.pictureFlash = false;
                    await vuCamera.start("vu.sop.ui.video");
                }
            }

            //window.vu.camera = vuCamera;

            vu.sop.ui.flipVideoHorizontal(vuCamera.video);
            if (vu.sop.preCacheFaceModelAsync) {
                await vu.sop.preCacheFaceModelPromise;
            }
            await vu.face.load(vuCamera.video, vu.sop.basePath, vu.sop.tfPath);

            //


            break
        } catch (e) {
            await vu.sop.ui.hideLoading();
            await vu.error.showError(new vu.error.CameraError(e.message));
        }
   }
};


vu.sop.steps.authFace = async function() {
    // Do face
    let response;
    while (true) {
        if (vu.sop.disableBiometric) {
            break
        }
        try {
            await vu.sop.ui.hideLoading();
            let pictures;
            if (vu.sop.challengeType == "mixed") {
                await vu.face.ui.gestures.start(vu.sop.basePath);
                pictures = await vu.face.ui.gestures.challengeStart();
            } else {
                await vu.face.ui.start();
                pictures = await vu.face.ui.challengeStart();
            }

            await vu.sop.ui.showLoading();
            let picture = pictures[pictures.length-1];
            
            if(vu.sop.enableSelfieList === true){

                 if( vu.face.ui.picturesTags.length > 0 )
                        response = await vu.sop.api.registers(vu.sop.userNameValue,
                        vu.sop.operationIdValue,
                        vu.sop.operationGuidValue,
                        pictures, vu.face.ui.picturesTags);
                    else
                        response = await vu.sop.api.registers(vu.sop.userNameValue,
                            vu.sop.operationIdValue,
                            vu.sop.operationGuidValue,
                            pictures, vu.face.ui.gestures.picturesTags);

                if (response.code != 932) {
                    if (response.code === 935) {
                        throw new Error('faceNoDocFrontImg')
                    } else if (response.code === 936 || response.code === 1921) {
                        throw new Error('faceNoSelfieFrontImg')
                    } else {
                        throw new Error('registerApiError')
                    }
                }
            }else {
                response = await vu.sop.api.register(vu.sop.userNameValue,
                    vu.sop.operationIdValue,
                    vu.sop.operationGuidValue,
                    picture);
                if (response.code != 932) {
                    if (response.code === 935) {
                        throw new Error('faceNoDocFrontImg')
                    } else if (response.code === 936 || response.code === 1921) {
                        throw new Error('faceNoSelfieFrontImg')
                    } else {
                        throw new Error('registerApiError')
                    }
                }
            }

            if(vu.sop.recordProcess === true) {
                //sendVideo = true;
                response = await vu.sop.stopRecording();
                console.log("response", response);

                if (typeof response === 'object' && response !== null) {
                    if (response.code === 2000) {
                        console.log("Video uploaded successfully");
                    } else {
                        console.log("addVideo fail:", response);
                        throw new Error('addVideoFail');
                    }
                } else if (response instanceof Blob) {
                    console.log("Received blob response");
                } else {
                    console.log("Unexpected response format");
                }

            }

            response = await vu.sop.api.endOperation(vu.sop.userNameValue,
                vu.sop.operationIdValue, vu.sop.operationGuidValue);

            if (response.code != 903) {
                if (response.code === 904) {
                    throw new Error('endOpApiBadScore')
                } else if (response.code === 2001) {
                    throw new Error('endOpApiBiometricFail')
                } else if (response.code === 905) {
                    throw new Error('endOpApiDocumentDataError')
                } else if (response.code === 1907) {
                    throw new Error('endOpApiDocumentBackFrontError')
                } else if (response.code === 1910) {
                    throw new Error('endOpApiDocumentBarcodeDoNotExist')
                } else if (response.code === 1911) {
                    throw new Error('endOpApiDocumentExpired')
                } else if (response.code === 1913) {
                    throw new Error('endOpApiPersonDataFail')
                }  else {
                    throw new Error('endOpApiError')
                }
            }

            await vu.sop.ui.hideLoading();
            await vu.sop.release();
            if(vu.sop.enableTelemetry){
                vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SELFIE_SUCCESS}
                );
            }
            break
        } catch (e) {
            console.log("e", e);
            vu.sop.screenRecorder.sendVideo = false;
            await vu.sop.ui.hideLoading();
            await vu.sop.ui.hideWhiteLoading();
            if(e.code === 1930){
                await vu.error.showError(new vu.error.FaceAuthError('endOpApiBiometricCompareFail'));

            }else {
                await vu.error.showError(new vu.error.CameraFaceError('endOpApiError'));

            }
            throw e;
        }
    }
    // TODO - Testiar y mejorar
    if (vu.sop.disableBiometric) {
        response = await vu.sop.api.endOperation(vu.sop.userNameValue,
            vu.sop.operationIdValue, vu.sop.operationGuidValue);
        if (response.code != 1907 &&
            response.code != 903) {
            await vu.error.showError(new vu.error.FaceAuthError('faceError'));    
        }
    }
    return response
};

vu.sop.steps.captureSelfie = async function() {
    let b64 = [];
    try {
        // Prepara la camara y librerias para reconocimiento
        await vu.sop.steps.loadLibsAndCameraFace();
        
        // Oculta las pantallas de Loading y muestra el video
        await vu.sop.ui.hideWhiteLoading();
        await vu.sop.ui.hideLoading();
        await vu.sop.ui.showVideo();
        let pictures;
        if (vu.sop.challengeType == "mixed") {
            await vu.face.ui.gestures.start(vu.sop.basePath);
            pictures = await vu.face.ui.gestures.challengeStart();
        } else {
            await vu.face.ui.start();
            pictures = await vu.face.ui.challengeStart();
        }
        
        //Parcea para obtener el base64 limpio
        for(let picture of pictures) {
            b64.push(picture.split(",")[1]);
        }      

        //Detiene la camara
        vuCamera.stream.getTracks().forEach(function(track) {
            track.stop();
        });

        return b64;

    } catch (e) {
        throw new Error(e.message)
    }};

vu.sop.loadingImgSrcDefault = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjb2ciIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jb2cgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00ODcuNCAzMTUuN2wtNDIuNi0yNC42YzQuMy0yMy4yIDQuMy00NyAwLTcwLjJsNDIuNi0yNC42YzQuOS0yLjggNy4xLTguNiA1LjUtMTQtMTEuMS0zNS42LTMwLTY3LjgtNTQuNy05NC42LTMuOC00LjEtMTAtNS4xLTE0LjgtMi4zTDM4MC44IDExMGMtMTcuOS0xNS40LTM4LjUtMjcuMy02MC44LTM1LjFWMjUuOGMwLTUuNi0zLjktMTAuNS05LjQtMTEuNy0zNi43LTguMi03NC4zLTcuOC0xMDkuMiAwLTUuNSAxLjItOS40IDYuMS05LjQgMTEuN1Y3NWMtMjIuMiA3LjktNDIuOCAxOS44LTYwLjggMzUuMUw4OC43IDg1LjVjLTQuOS0yLjgtMTEtMS45LTE0LjggMi4zLTI0LjcgMjYuNy00My42IDU4LjktNTQuNyA5NC42LTEuNyA1LjQuNiAxMS4yIDUuNSAxNEw2Ny4zIDIyMWMtNC4zIDIzLjItNC4zIDQ3IDAgNzAuMmwtNDIuNiAyNC42Yy00LjkgMi44LTcuMSA4LjYtNS41IDE0IDExLjEgMzUuNiAzMCA2Ny44IDU0LjcgOTQuNiAzLjggNC4xIDEwIDUuMSAxNC44IDIuM2w0Mi42LTI0LjZjMTcuOSAxNS40IDM4LjUgMjcuMyA2MC44IDM1LjF2NDkuMmMwIDUuNiAzLjkgMTAuNSA5LjQgMTEuNyAzNi43IDguMiA3NC4zIDcuOCAxMDkuMiAwIDUuNS0xLjIgOS40LTYuMSA5LjQtMTEuN3YtNDkuMmMyMi4yLTcuOSA0Mi44LTE5LjggNjAuOC0zNS4xbDQyLjYgMjQuNmM0LjkgMi44IDExIDEuOSAxNC44LTIuMyAyNC43LTI2LjcgNDMuNi01OC45IDU0LjctOTQuNiAxLjUtNS41LS43LTExLjMtNS42LTE0LjF6TTI1NiAzMzZjLTQ0LjEgMC04MC0zNS45LTgwLTgwczM1LjktODAgODAtODAgODAgMzUuOSA4MCA4MC0zNS45IDgwLTgwIDgweiI+PC9wYXRoPjwvc3ZnPg==";
vu.sop.loadingImgSrc = '';
vu.sop.loadingImgStyle = '';

vu.sop.createLoadingImg = function() {
    // Check if the image element already exists in the target containers
    if (document.querySelector("#vu.sop.ui.whiteLoadingImg img") || 
        document.querySelector("#vu.sop.ui.loadingImg img")) {
        console.log("Loading image already exists, skipping creation.");
        return; // Exit the function if the image already exists
    }

    var imgElem = document.createElement("img");
    //Si no se asigno una imagen a la carga, asigna la imagen por defecto
    if(!vu.sop.loadingImgSrc) {
        imgElem.src = vu.sop.loadingImgSrcDefault;
        imgElem.className = "vu.sop.ui.loadingImg";
    } else {
        imgElem.src = vu.sop.loadingImgSrc;
        imgElem.style = vu.sop.loadingImgStyle;
    }
    
    //Agrega la imagen al html
    document.getElementById("vu.sop.ui.whiteLoadingImg").appendChild(imgElem);
    document.getElementById("vu.sop.ui.loadingImg").appendChild(imgElem.cloneNode());
};

async function getBrowserInfo() {
    let result = {};
    if (navigator.userAgentData) {
        const uaData = await navigator.userAgentData.getHighEntropyValues([
            'platform',
            'platformVersion',
            'model',
            'uaFullVersion'
        ]);

        result = {
            browserName: navigator.userAgentData.brands.find(b => b.brand !== 'Not A;Brand').brand,
            browserVersion: uaData.uaFullVersion,
            browserEngineName: "Unknown Engine Name",
            browserEngineVersion: "Unknown Engine Version",
            mobilePlatform: uaData.platform === 'Android' || uaData.platform === 'iOS' ? 'mobile' : 'desktop',
            mobileModel: uaData.model || "Unknown Model",
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            operatingSystem: uaData.platform,
            operatingSystemVersion: uaData.platformVersion
        };
    } else {
        let parser = new UAParser();
        let uaResult = parser.getResult();

        result = {
            browserName: uaResult.browser.name || "Unknown Browser",
            browserVersion: uaResult.browser.version || "Unknown",
            browserEngineName: uaResult.engine.name || "Unknown Engine Name",
            browserEngineVersion: uaResult.engine.version || "Unknown Engine Version",
            mobilePlatform: uaResult.device.type || "Not a Mobile Device",
            mobileModel: uaResult.device.model || "Unknown Model",
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            operatingSystem: uaResult.os.name || "Unknown OS",
            operatingSystemVersion: uaResult.os.version || "Unknown"
        };
    }
    return result;
}

vu.sop.release = async function () {
    console.log("vu.sop.release");
    await vuCamera.release();

    vu.face.doLoop = false;
    vu.face.ui.loop = false;
    vu.face.ui.challengeLoop = false;
    vu.face.ui.gestures.loop = false;
    vu.face.ui.gestures.lastChallenge = "";
    vu.face.ui.gestures.challengeLoop = false;
    vu.screen.capture.doRecordLoop = false;
    vu.sop.document.ui.doLoop = false;

    if(vu.sop.videoResizeObserver)
    {
        vu.sop.videoResizeObserver.disconnect();
    }

    if(vu.face.ui.gestures.videoResizeObserver)
    {
        vu.face.ui.gestures.videoResizeObserver.disconnect();
    }

    vu.face?.auth?.videoResizeObserver?.disconnect();
    
    if (vu.face.ui.faceDotObserver) {
        vu.face.ui.faceDotObserver.disconnect();

        if (typeof JEEFACEFILTERAPI !== 'undefined' && JEEFACEFILTERAPI && vu.sop.challengeType != "mixed") 
        {
            // Puede pasar que se ejecute mas de una vez, que alerte que fallo no es un problema, la idea es catchear el error para que no lo vea el usuario, el proceso se termina correctamente
            JEEFACEFILTERAPI.destroy().catch(error => {
                console.warn("Failed to destroy JEEFACEFILTERAPI:", error);
            });
        }   
    }
    
    const element = document.getElementById('vu.sop');
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    
        element.style.display = 'none';
    }

    vu.extras.cleanupGestureScripts(vu.sop.challengeType, vu.sop.techStack);    
    

    vu.sop.initialized = false;
    //vu.face.auth = {};
};

if (typeof window !== 'undefined') {
    window.vuSop = vu.sop;
    //console.log('vuSop is attached to the window:', window.vuSop);
} else if (typeof global !== 'undefined') {
    global.vuSop = vu.sop;
}

var vu_sop = vu.sop;

export { vu_sop as default };
