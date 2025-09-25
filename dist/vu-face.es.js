// Reference the existing vu object
const vu$c = window.vu || {};
vu$c.sop = vu$c.sop || {};
vu$c.sop.audio = vu$c.sop.audio || {};
vu$c.face = vu$c.face || {};
vu$c.face.auth = vu$c.face.auth || {};
vu$c.face.auth.audio = vu$c.face.auth.audio || {};

vu$c.sop.audio.enabled = false;
vu$c.sop.audio.audioQueue = [];

vu$c.sop.audio.initialize = function () {
    if (window.vu.sop.audio.enabled != vu$c.sop.audio.enabled)
        vu$c.sop.audio.enabled = window.vu.sop.audio.enabled;

    if (window.vu.sop.audioPreloaded != vu$c.sop.audioPreloaded)
        vu$c.sop.audioPreloaded = window.vu.sop.audioPreloaded;
};

// if (typeof vu.sop.audio == "undefined") {
//     vu.sop.audio.enabled = true
//     vu.sop.audio.audioQueue = [];
// }

// if (typeof vu.sop.audio.audioQueue == "undefined") {
//     vu.sop.audio.audioQueue = [];
// }

// vu.sop.audio.snd = new Audio("data:audio/mp3;base64,"+vu.sop.audio.userError);

vu$c.sop.audio.play = function (audioId) {
    if (!vu$c.sop.audio.enabled)
        return;

    // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
    // console.log("vu.face.auth.audio.enabled", vu.face.auth.audio.enabled);

    // const stack = new Error().stack.split('\n');
    // const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    // console.log(`Caller: ${callerInfo}`);

    if (vu$c.sop.audio.enabled) {
        const audio = document.getElementById(audioId);

        if (!audio) {
            console.error(`Audio element with ID "${audioId}" not found.`);
            return;
        }

        audio.addEventListener('canplaythrough', () => {
            console.debug(`Audio "${audioId}" is ready.`);
        });

        audio.muted = false; // asegura que el audio no esté en silencio
        vu$c.sop.audio.audioQueue.push(audio);

        if (vu$c.sop.audio.audioQueue.length > 1) {
            const previousAudio = vu$c.sop.audio.audioQueue[vu$c.sop.audio.audioQueue.length - 2];
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
            vu$c.sop.audio.audioQueue = vu$c.sop.audio.audioQueue.filter(a => a.id !== audioId);
            console.debug(`Audio "${audioId}" has finished playing.`);
        };

        audio.addEventListener('pause', handleAudioEvent);
        audio.addEventListener('ended', handleAudioEvent);
    }
};

vu$c.sop.audioPreloaded = false;

vu$c.sop.audio.reproducir = function () {
    // console.log("window.vu.sop.audio.reproducir", window.vu.sop.audio.enabled);
    // console.log("vu.sop.audio.reproducir", vu.sop.audio.enabled);
    if (!vu$c.sop.audio.enabled)
        return;

    if (!vu$c.sop.audioPreloaded) {
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

    vu$c.sop.audioPreloaded = true;
};

var vuSopAudio = vu$c.sop.audio;

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
const vu$b = window.vu || {};
vu$b.sop = vu$b.sop || {};
vu$b.sop.steps = vu$b.sop.steps || {};
vu$b.sop.ui = vu$b.sop.ui || {};
vu$b.sop.ui.debug = vu$b.sop.ui.debug || {};
vu$b.sop.ui.user = vu$b.sop.ui.user || {};
vu$b.sop.msg = vu$b.sop.msg || {};
vu$b.sop.audio = vu$b.sop.audio || {};
vu$b.sop.api = vu$b.sop.api || {};

// vu.sop.steps = vu.sop.steps || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu$b.sop.audio = Object.assign(vu$b.sop.audio, vuSopAudio);
vu$b.face = vu$b.face || {};
vu$b.face.auth = vu$b.face.auth || {};
let moduleCamera$4 = null;

vu$b.sop.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    // Proceed to use vu.sop safely
    // Merge vu.sop.msg and window.vu.sop.msg
    vu$b.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu$b.sop.msg || {});

    // Merge vu.sop.audio and window.vu.sop.audio
    vu$b.sop.audio = Object.assign({}, window.vu.sop.audio || {}, vu$b.sop.audio || {});

    // // Merge vu.sop.api and window.vu.sop.api
    vu$b.sop.api = Object.assign({}, window.vu.sop.api || {}, vu$b.sop.api || {});

    vu$b.sop.steps = Object.assign({}, window.vu.sop.steps || {}, vu$b.sop.steps || {});

    vu$b.face.auth = Object.assign({}, window.vu.face.auth || {}, vu$b.face.auth || {});

    vu$b.sop.ui.bottomTextResizeScheduled = false;

    moduleCamera$4 = camera;
};

vu$b.sop.ui.user.initialize = function(sopApi)
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

vu$b.sop.ui.cameraBackGroundOverlayTopBGColor = "rgba(0, 0, 0, 1)";
vu$b.sop.ui.cameraBackGroundOverlayBottomBGColor = "rgba(0, 0, 0, 1)";

//---------------------------------------------------
// Subtitles
//---------------------------------------------------

vu$b.sop.ui.isEven  = function(x) { return !( x & 1 ); };
vu$b.sop.ui.isOdd = function(x) { return x & 1; };


vu$b.sop.ui.bottomTextNoOverlay = function(){
    let baseDiv = document.getElementById('vu.sop');
    let mainDiv = document.getElementById('vu.sop.ui');
    let bottomText = document.getElementById('vu.sop.ui.bottomText');
    let videoContainer = document.getElementById('vu.sop.ui.videoContainer');
    console.log("vu.sop.videoResizeStyleFillContainer", vu$b.sop.videoResizeStyleFillContainer);
    if (bottomText !== null) {
        if (vu$b.sop.videoResizeStyleFillContainer){
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
            if (vu$b.sop.ui.isOdd(dtop)) { dtop = dtop - 1; }
            if (vu$b.sop.ui.isOdd(dheight)) { dheight = dheight + 3; }
            videoContainer.style.height = (dheight+2) + "px";
            videoContainer.style.top = dtop + "px";
        } else {
            let divheight = mainDiv.offsetHeight - bottomText.offsetHeight;
            let dheight = divheight;
            let dtop = (divheight/2);
            if (vu$b.sop.ui.isOdd(dtop)) { dtop = dtop - 1; }
            if (vu$b.sop.ui.isOdd(dheight)) { dheight = dheight + 3; }
            videoContainer.style.height = (dheight+2) + "px";
            videoContainer.style.top = dtop + "px";
        }
    }
};
vu$b.sop.ui.bottomTextResizeScheduled = false;

vu$b.sop.ui.bottomTextObserver = new ResizeObserver(entries => {
    if (vu$b.sop.ui.bottomTextResizeScheduled) return;

    vu$b.sop.ui.bottomTextResizeScheduled = true;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            vu$b.sop.ui.bottomTextResizeScheduled = false;
            console.trace("ResizeObserver fired in vu.sop.ui.bottomTextObserver");
            vu$b.sop.ui.bottomTextNoOverlay();            
        });
    });
});
//vu.sop.ui.bottomTextObserver.observe(document.getElementById('vu.sop.ui.bottomText'));


//---------------------------------------------------
// Generic
//---------------------------------------------------

vu$b.sop.ui.alertDraw = function(msg, closeMethod, e) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";

    let divAlertText = document.createElement("div");
    divAlertText.innerHTML = msg;

    let buttonClose = document.createElement("button");
    buttonClose.className = "vu.sop.btn vu.sop.btn-outline-secondary";
    buttonClose.id = "vu.sop.ui.alertButton";
    buttonClose.innerHTML = vu$b.sop.msg.close;
    buttonClose.onclick = closeMethod;
    
    divContainer.appendChild(divAlertText);
    divContainer.appendChild(buttonClose);
    return divContainer;
};

vu$b.sop.ui.alertDraw2 = function(msg, closeMethod) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";

    let divAlertText = document.createElement("div");
    divAlertText.innerHTML = msg;

    divContainer.appendChild(divAlertText);
    return divContainer;
};

vu$b.sop.ui.documentFileUploadFrontDraw = function() {
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
    console.log("vu.sop.steps", vu$b.sop.steps);
    inputFile.onchange = function() {vu$b.sop.steps.uploadFrontDocumentPictureResolve(this.files);};
    divContainer.appendChild(label);
    divContainer.appendChild(inputFile);

    return divContainer;
};

vu$b.sop.ui.documentFileUploadBackDraw = function() {
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
    inputFile.onchange = function() {vu$b.sop.steps.uploadBackDocumentPictureResolve(this.files);};
    divContainer.appendChild(label);
    divContainer.appendChild(inputFile);

    return divContainer;
};
vu$b.sop.ui.documentSelectUploadMethodDraw = function(takePictureMethod, uploadFileMethod) {
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
    pTakePicture.innerHTML = vu$b.sop.msg.addDocumentCameraIconMsg;

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
    pUploadFile.innerHTML = vu$b.sop.msg.addDocumentFileIconMsg;

    linkUploadFile.appendChild(imgUploadFile);
    linkUploadFile.appendChild(pUploadFile);

    divTakePicture.appendChild(linkTakePicture);
    divUploadFile.appendChild(linkUploadFile);
    divContainer.appendChild(divTakePicture);
    divContainer.appendChild(divUploadFile);
    return divContainer;
};

vu$b.sop.ui.alertResolve = null;
vu$b.sop.ui.alert = async function(msg, e) {
    let promise = new Promise(function(resolve, reject) {
        vu$b.sop.ui.show('vu.sop.ui.alert');
        vu$b.sop.ui.alertResolve = resolve;
        let divContainer = vu$b.sop.ui.alertDraw(msg, vu$b.sop.ui.alertClose, e);        

        const el = document.getElementById("vu.sop.ui.alert");
        if (!el) {
            console.warn("[vu.sop.ui.showBottomText] Element 'vu.sop.ui.bottomText' not found.");
            return;
        }     
        
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu$b.sop.ui.alertAndRefreshResolve = null;
vu$b.sop.ui.alertAndRefresh = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu$b.sop.ui.show('vu.sop.ui.alert');
        vu$b.sop.ui.alertAndRefreshResolve = resolve;
        let divContainer = vu$b.sop.ui.alertDraw(msg, vu$b.sop.ui.alertCloseAndRefresh);
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu$b.sop.ui.alertNoButton = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu$b.sop.ui.show('vu.sop.ui.alert');
        vu$b.sop.ui.alertResolve = resolve;
        let divContainer = vu$b.sop.ui.alertDraw2(msg, vu$b.sop.ui.alertClose);
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu$b.sop.ui.alertClose = function() {
    vu$b.sop.ui.hide('vu.sop.ui.alert');
    document.getElementById("vu.sop.ui.alert").innerHTML = "";
    vu$b.sop.ui.alertResolve(true);
};

vu$b.sop.ui.alertCloseAndRefresh = function() {
    window.location.reload(false);
};

vu$b.sop.ui.disable = function(id) {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
};

vu$b.sop.ui.enable = function(id) {
    const el = document.getElementById(id);
    if (el) el.disabled = false;
};

vu$b.sop.ui.hide = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
};

vu$b.sop.ui.show = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
};

vu$b.sop.ui.showWhiteLoading = async function() {
    return await vu$b.sop.ui.show('vu.sop.ui.whiteLoading');
};

vu$b.sop.ui.hideWhiteLoading = async function() {
    return await vu$b.sop.ui.hide('vu.sop.ui.whiteLoading');
};

vu$b.sop.ui.showLoading = async function() {
    return await vu$b.sop.ui.show("vu.sop.ui.loading");
};

vu$b.sop.ui.hideLoading = async function() {
    return await vu$b.sop.ui.hide("vu.sop.ui.loading");
};

vu$b.sop.ui.showVideo = async function() {
    return await vu$b.sop.ui.show("vu.sop.ui.videoContainer");
};

vu$b.sop.ui.showBottomText = async function(text) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (!el) {
        console.warn("[vu.sop.ui.showBottomText] Element 'vu.sop.ui.bottomText' not found.");
        return;
    }
    el.innerHTML = text;
    
    await vu$b.sop.ui.show("vu.sop.ui.bottomText");
};

vu$b.sop.ui.hideBottomText = async function() {
    return await vu$b.sop.ui.hide("vu.sop.ui.bottomText");
};

/*****************************************************************/

vu$b.sop.ui.showTopText = async function(text) {
    document.getElementById("vu.sop.ui.topText").innerHTML = text;
    await vu$b.sop.ui.show("vu.sop.ui.topText");
};

vu$b.sop.ui.hideTopText = async function() {
    return await vu$b.sop.ui.hide("vu.sop.ui.topText");
};

vu$b.sop.ui.showTopTextAutoHide = async function(text, time = 4000) {
    vu$b.sop.ui.showTopText(text);
    setTimeout(function() {
        vu$b.sop.ui.hideTopText();
    }, time);
};
/*****************************************************************/

vu$b.sop.ui.showBottomTextAlertTime = false;               // Variable para guardar el ultimo tiempo
vu$b.sop.ui.showBottomTextAlertMinTime = 2000;

vu$b.sop.ui.showBottomTextAlert = async function(text) {
    if (vu$b.sop.ui.showBottomTextAlertTime === false) { vu$b.sop.ui.showBottomTextAlertTime = new Date(); }
    if ((new Date().getTime() - vu$b.sop.ui.showBottomTextAlertTime.getTime()) > vu$b.sop.ui.showBottomTextAlertMinTime ) {
        //document.getElementById("vu.sop.ui.bottomTextAlert").innerHTML = text;
        vu$b.sop.ui.bottomTextAlert.text(text);
        //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "inline";
        vu$b.sop.ui.bottomTextAlert.show();
        vu$b.sop.ui.showBottomTextAlertTime = false;
    }
};

vu$b.sop.ui.hideBottomTextAlert = async function() {
    if (vu$b.sop.ui.showBottomTextAlertTime === false) { vu$b.sop.ui.showBottomTextAlertTime = new Date(); }
    if ((new Date().getTime() - vu$b.sop.ui.showBottomTextAlertTime.getTime()) > vu$b.sop.ui.showBottomTextAlertMinTime ) {
        //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "none";
        vu$b.sop.ui.bottomTextAlert.hide();
    }
};

vu$b.sop.ui.cleanAndHideBottomTextAlert = async function() {
    //document.getElementById("vu.sop.ui.bottomTextAlert").innerHTML = '';
    vu$b.sop.ui.bottomTextAlert.text('');
    //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "none";
    vu$b.sop.ui.bottomTextAlert.hide();
};

/* ----- */
if (typeof vu$b.sop.ui.bottomTextAlert == "undefined") { vu$b.sop.ui.bottomTextAlert = function() {}; }

vu$b.sop.ui.bottomTextAlert.text = function(text) {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.innerHTML = text);
};

vu$b.sop.ui.bottomTextAlert.show = function() {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.style.display = "inline");    
};

vu$b.sop.ui.bottomTextAlert.hide = function() {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.style.display = "none");    
};

/*****************************************************************/

vu$b.sop.ui.bottomTextBackGroundColor = function(color) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.backgroundColor = color;
};

vu$b.sop.ui.bottomTextFontFamily = function(fontFamily) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontFamily = fontFamily;
};

vu$b.sop.ui.bottomTextFontSize = function(fontSize) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontSize = fontSize;
};

vu$b.sop.ui.bottomTextFontWeight = function(fontWeight) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontWeight = fontWeight;
};

vu$b.sop.ui.bottomTextFontStyle = function(fontStyle) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontStyle = fontStyle;
};

vu$b.sop.ui.bottomTextColor = function(color) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.color = color;
};

vu$b.sop.ui.flash = async function () {
    const flashElement = document.getElementById('vu.sop.ui.flash');
    if (!flashElement) {
        console.warn("vu.sop.ui.flash element not found in DOM");
        return false;
    }

    try {
        flashElement.style.display = "block";
        await vu$b.sop.ui.sleep(100);
        flashElement.style.display = "none";
        return true;
    } catch (error) {
        console.error("Error in vu.sop.ui.flash:", error);
        return false;
    }
};

vu$b.sop.ui.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu$b.sop.ui.flipVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(180deg) ";
};

vu$b.sop.ui.keepVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(0deg)";
};

vu$b.sop.ui.isMobile = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true
    } else {
        // false for not mobile device
        return false
    }
};


vu$b.sop.ui.isDeviceCompatible = function() {
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

vu$b.sop.ui.isBrowserCompatible = function() {
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

vu$b.sop.ui.isSOCompatible = function() {
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

vu$b.sop.ui.showMirrorBackground  = function() {
    document.getElementById("vu.sop.ui.videoBg").style.display = "block";
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.display = "block";
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.display = "block";

    document.getElementById("vu.sop.ui.videoBg").srcObject = moduleCamera$4.stream;
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.backgroundColor = vu$b.sop.ui.cameraBackGroundOverlayTopBGColor;
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.backgroundColor = vu$b.sop.cameraBackGroundOverlayBottomBGColor;
};

vu$b.sop.ui.hideMirrorBackground  = function() {
    document.getElementById("vu.sop.ui.videoBg").style.display = "none";
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.display = "none";
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.display = "none";
};


//---------------------------------------------------
// Username
//---------------------------------------------------

//if (typeof vu.sop.ui.user == "undefined") { vu.sop.ui.user = function() {} }

vu$b.sop.ui.user.start = async function() {
    await vu$b.sop.ui.show("vu.sop.ui.userContainer");
    let promise = new Promise(function(resolve, reject) {
        vu$b.sop.ui.user.start.resolve = resolve;
        vu$b.sop.ui.user.start.reject = reject;
    });
    return promise;
};

vu$b.sop.ui.user.start.resolve = null;
vu$b.sop.ui.user.start.reject = null;

vu$b.sop.ui.user.hide = async function() {
    return await vu$b.sop.ui.hide("vu.sop.ui.userContainer");
};

vu$b.sop.ui.user.do  = async function() {
    vu$b.sop.audio.reproducir();
    await vu$b.sop.ui.disable('vu.sop.ui.userNameSendBtn');
    await vu$b.sop.ui.showWhiteLoading();
    let userName = document.getElementById("vu.sop.ui.userName").value;
    vu$b.sop.userNameValue = userName;

    if(vu$b.sop.operationIdValue) {
        await start();
    } else {
        await callNewOperation(userName);
    }
};


vu$b.sop.ui.user.doPreSetUser  = async function(userNameValue, loginFlag) {

    const stack = new Error().stack.split('\n');
    const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    console.log(`Caller: ${callerInfo}`);

    new Promise(function(resolve, reject) {
        vu$b.sop.ui.user.start.resolve = resolve;
        vu$b.sop.ui.user.start.reject = reject;
    });

    vu$b.sop.audio.reproducir();

    if(!loginFlag){
        if (vu$b.sop.operationIdValue) {
            await start();
        } else {
            await callNewOperationWithPresetUser(userNameValue);
        }
    } else {
        await vu$b.sop.ui.user.hide();
        await vu$b.sop.ui.showVideo();
        vu$b.sop.ui.user.start.resolve(true);
    }
};

async function callNewOperation(userName){
    await vu$b.sop.ui.showWhiteLoading();
    let response;
    
    try {

        if(vu$b.sop.enableTelemetry){
            await vu$b.telemetry.initTraceId();
        }

        response = await vu$b.sop.api.newOperation(userName, vu$b.sop.browserInfo);
    } catch (error) {
        response = {code: 0, message: vu$b.sop.msg.userComunicationError};
    }
    await vu$b.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        vu$b.sop.operationIdValue = response.operationId;
        vu$b.sop.operationGuidValue = response.operationGuid;
        window.vu.sop.operationIdValue = vu$b.sop.operationIdValue;
        window.vu.sop.operationGuidValue = vu$b.sop.operationGuidValue;
        await start();
    } else {
        console.log('newOperation', 'error', response);
        await vu$b.sop.ui.enable('vu.sop.ui.userNameSendBtn');
        vu$b.sop.ui.user.start.reject('error');
    }
}
async function callNewOperationWithPresetUser(userName){
    await vu$b.sop.ui.showWhiteLoading();
    let response;

    try {
        if(vu$b.sop.enableTelemetry){
            await vu$b.telemetry.initTraceId();
        }

        console.log("userName", userName);
        console.log("vu.sop.browserInfo", vu$b.sop.browserInfo);
        response = await vu$b.sop.api.newOperation(userName, vu$b.sop.browserInfo);
        console.log("response", response);            
    } catch (error) {
        response = {code: 0, message: vu$b.sop.msg.userComunicationError};
        console.log("error", error);
    }

    await vu$b.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        
        vu$b.sop.operationIdValue = response.operationId;
        vu$b.sop.operationGuidValue = response.operationGuid;
        window.vu.sop.operationIdValue = vu$b.sop.operationIdValue;
        window.vu.sop.operationGuidValue = vu$b.sop.operationGuidValue;
        
        start();
    } else {
        console.log('newOperation', 'error', response);
        let alertElement = document.getElementById("vu.sop.ui.alert");
        if (alertElement) {
            alertElement.innerHTML = "";
        }
        alert =  vu$b.sop.ui.alertAndRefresh(vu$b.sop.msg.addBackDocumentComunicationError);
        //vu.sop.ui.hide("vu.sop.ui.alertButton")
        await alert;
    }
}
async function start(){
    await vu$b.sop.ui.hideWhiteLoading();
    await vu$b.sop.ui.enable('vu.sop.ui.userNameSendBtn');
    await vu$b.sop.ui.user.hide();
    await vu$b.sop.ui.showVideo();
    vu$b.sop.ui.user.start.resolve(true);
}


//---------------------------------------------------
// Debug
//---------------------------------------------------

//if (typeof vu.sop.ui.debug == "undefined") { vu.sop.ui.debug = function() {} }

vu$b.sop.ui.debug.initialize = function() {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop || !window.vu.sop.ui ) {
        console.error("vu.sop is not defined");
        return;
    }
    vu$b.sop.ui.debug.debugInfoDiv = document.getElementById("vu.sop.ui.debugInfo.content");
    vu$b.sop.ui.debug.debugEvalDiv = document.getElementById("vu.sop.ui.debugEval.content");
    vu$b.sop.ui.debug.debugPerfDiv = document.getElementById("vu.sop.ui.debugPerf.content");
    vu$b.sop.ui.debug.debugVideoCenter = document.getElementById("vu.sop.ui.debugVideoCenter");
    vu$b.sop.ui.debug.enable = true;
};

vu$b.sop.ui.debug.enable = false;
vu$b.sop.ui.debug.hangDocumentScreen = false;
vu$b.sop.ui.debug.hangProofOfLife = false;
vu$b.sop.ui.debug.debugElementCenter = false;

vu$b.sop.ui.debug.timeLine = { 'frameConsistency': [] };
vu$b.sop.ui.debug.info = [];
vu$b.sop.ui.debug.perf = [];
vu$b.sop.ui.debug.eval = [];
vu$b.sop.ui.debug.finalEval = [];
vu$b.sop.ui.debug.faceBox = [];
vu$b.sop.ui.debug.faceGestures = [];

vu$b.sop.ui.boxCenterPoint = document.getElementById('vu.sop.ui.debugElementCenter');
vu$b.sop.ui.videoContainer = document.getElementById('vu.sop.ui.videoContainer');

vu$b.sop.ui.drawVideoCenter = function() {
    let videoContainer = document.getElementById('vu.sop.ui.videoContainer');
    let video = document.getElementById('vu.sop.ui.video');

    let fixX = Math.round((video.offsetWidth - videoContainer.offsetWidth)/2);
    let fixY = Math.round((video.offsetHeight - videoContainer.offsetHeight)/2);

    vu$b.sop.ui.debug.debugVideoCenter.style.left = Math.round((video.offsetWidth / 2) - fixX) - 5 + "px";
    vu$b.sop.ui.debug.debugVideoCenter.style.top = Math.round((video.offsetHeight / 2) - fixY) - 5 + "px";
    vu$b.sop.ui.debug.debugVideoCenter.style.display = 'block';
};

vu$b.sop.ui.cleanResults = function () {
    if(vu$b.sop.enableTelemetry){
        vu$b.sop.ui.debug.finalEval.push(vu$b.sop.ui.debug.eval[0]);
    }
    vu$b.sop.ui.debug.info = [];
    vu$b.sop.ui.debug.eval = [];
    vu$b.sop.ui.debug.perf = [];
};

vu$b.sop.ui.debugDraw = function () {
    vu$b.sop.ui.debug.initialize();

    vu$b.sop.ui.debug.debugInfoDiv.innerHTML = '';
    vu$b.sop.ui.debug.debugEvalDiv.innerHTML = '';
    vu$b.sop.ui.debug.debugPerfDiv.innerHTML = '';
    document.getElementById("vu.sop.ui.debugInfo").style.display = 'block';
    document.getElementById("vu.sop.ui.debugEval").style.display = 'block';
    document.getElementById("vu.sop.ui.debugTimeline").style.display = 'block';
    vu$b.sop.ui.debugDrawTimeLine(vu$b.sop.ui.debug.timeLine['frameConsistency'], 30);

    for (const value of vu$b.sop.ui.debug.info) {
        vu$b.sop.ui.debug.debugInfoDiv.innerHTML += value[0] + ': ' + '<span style="font-weight: bolder;">' + value[1] + '</span>';
        vu$b.sop.ui.debug.debugInfoDiv.innerHTML += '<br>';
    }
    for (const value of vu$b.sop.ui.debug.perf) {
        vu$b.sop.ui.debug.debugPerfDiv.innerHTML += value[0] + ': ' + '<span style="font-weight: bolder;">' + value[1] + '</span>';
        vu$b.sop.ui.debug.debugPerfDiv.innerHTML += '<br>';
    }
    for (const value of vu$b.sop.ui.debug.eval) {
        vu$b.sop.ui.debug.debugEvalDiv.innerHTML += value[0] + ': ' +
            '<span style="font-weight: bolder; color: ' + value[2] + '">' + value[1] + '</span>';
        vu$b.sop.ui.debug.debugEvalDiv.innerHTML += '<br>';
    }
    vu$b.sop.ui.cleanResults();
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
vu$b.sop.ui.debugDrawTimeLine = (function () {
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

vu$b.sop.ui.alertCameraSelection = async function (messageText) {
    return new Promise(async (resolve) => {
        vu$b.sop.ui.show('vu.sop.ui.alert');
        vu$b.sop.ui.alertResolve = resolve;

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
        const noCamText = vu$b.sop.msg.noCameras;

        if (physicalCameras.length > 0) {
            select = document.createElement('select');
            select.className = 'vu.sop.custom-select';
            select.style.margin = '0 auto';
            select.style.display = 'block';

            physicalCameras.forEach(cam => {
                const opt = document.createElement('option');
                opt.value = cam.deviceId;
                opt.text = cam.label || vu$b.sop.msg.unnamedCamera;
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
        button.innerText = physicalCameras.length > 0 ? vu$b.sop.msg.continue : vu$b.sop.msg.retry;

        button.onclick = () => {
            if (physicalCameras.length > 0) {
                const deviceId = select.value;
                resolve(deviceId);
                vu$b.sop.ui.alertClose();
            } else {
                location.reload(); // 🔁 Refresh on retry
            }
        };

        divContainer.appendChild(button);

        // ✅ Append inner container to root alert
        container.appendChild(divContainer);
    });
};




var vuSopUi = vu$b.sop.ui;

// Reference the existing vu object
const vu$a = window.vu || {};
vu$a.extras = vu$a.extras || {};

vu$a.extras.detectEnvironment = function() {
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

vu$a.extras.loadedScripts = vu$a.extras.loadedScripts || {};

vu$a.extras.loadScript = async (rootPath, techStack, folder, scriptFileName, globalObjectName) => {
    // If the script is already loaded or loading, return the cached promise
    
    if (vu$a.extras.loadedScripts[globalObjectName]) {
        console.log("globalObjectName", globalObjectName);
        return vu$a.extras.loadedScripts[globalObjectName];
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
                vu$a.extras.loadedScripts[globalObjectName] = new Promise((resolve, reject) => {
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

                return vu$a.extras.loadedScripts[globalObjectName];

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
                vu$a.extras.loadedScripts[globalObjectName] = new Promise((resolve, reject) => {
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

                return vu$a.extras.loadedScripts[globalObjectName];                
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

vu$a.extras.cleanupGestureScripts = (gestureConfig, techStack) => {
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
            if (vu$a.extras.loadedScripts[globalObjectName]) {
                delete vu$a.extras.loadedScripts[globalObjectName];
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


vu$a.extras.loadFile = async (rootPath, folder, fileName, techStack) => {
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

var vuExtras = vu$a.extras;

//import vuCamera from 'vu.camera'; //

// Reference the existing vu object
const vu$9 = window.vu || {};
vu$9.sop = vu$9.sop || {};
vu$9.sop.ui = vuSopUi;
vu$9.sop.audio = vu$9.sop.audio || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu$9.sop.audio = Object.assign(vu$9.sop.audio, vuSopAudio);
vu$9.sop.msg = vu$9.sop.msg || {};
//vu.camera = vuCamera;

vu$9.error = vu$9.error || {};

vu$9.error.LOAD_ERROR = 'LoadError';
vu$9.error.USER_ERROR = 'UserError';
vu$9.error.TAKE_DOCUMENT_FRONT_ERROR = 'TakeDocumentFrontError';
vu$9.error.TAKE_DOCUMENT_BACK_ERROR = 'TakeDocumentBackError';
vu$9.error.UPLOAD_DOCUMENT_FRONT_ERROR = 'UploadDocumentFrontError';
vu$9.error.UPLOAD_DOCUMENT_BACK_ERROR = 'UploadDocumentBackError';
vu$9.error.CAMERA_ERROR = 'CameraError';
vu$9.error.CAMERA_FACE_ERROR = 'CameraFaceError';
vu$9.error.FACE_AUTH_ERROR = 'FaceAuthError';

let moduleCamera$3 = null;
vu$9.error.initialize = function(camera) {
    if(window.vu.sop.msg != vu$9.sop.msg)
        vu$9.sop.msg = window.vu.sop.msg;

    moduleCamera$3 = camera;
};

vu$9.error.LoadError = function(message) {
    this.name = vu$9.error.LOAD_ERROR;
    this.message = message;
};
vu$9.error.LoadError.prototype = Error.prototype;

vu$9.error.UserError = function(message) {
    this.name = vu$9.error.USER_ERROR;
    this.message = message;
};
vu$9.error.UserError.prototype = Error.prototype;

vu$9.error.TakeDocumentFrontError = function(message) {
    this.name = vu$9.error.TAKE_DOCUMENT_FRONT_ERROR;
    this.message = message;
};
vu$9.error.TakeDocumentFrontError.prototype = Error.prototype;

vu$9.error.TakeDocumentBackError = function(message) {
    this.name = vu$9.error.TAKE_DOCUMENT_BACK_ERROR;
    this.message = message;
};
vu$9.error.TakeDocumentBackError.prototype = Error.prototype;

vu$9.error.UploadDocumentFrontError = function(message) {
    this.name = vu$9.error.UPLOAD_DOCUMENT_FRONT_ERROR;
    this.message = message;
};
vu$9.error.UploadDocumentFrontError.prototype = Error.prototype;

vu$9.error.UploadDocumentBackError = function(message) {
    this.name = vu$9.error.UPLOAD_DOCUMENT_BACK_ERROR;
    this.message = message;
};
vu$9.error.UploadDocumentBackError.prototype = Error.prototype;

vu$9.error.CameraError = function(message) {
    this.name = vu$9.error.CAMERA_ERROR;
    this.message = message;
};
vu$9.error.CameraError.prototype = Error.prototype;

vu$9.error.CameraFaceError = function(message) {
    this.name = vu$9.error.CAMERA_FACE_ERROR;
    this.message = message;
};
vu$9.error.CameraFaceError.prototype = Error.prototype;

vu$9.error.FaceAuthError = function(message) {
    this.name = vu$9.error.FACE_AUTH_ERROR;
    this.message = message;
};
vu$9.error.FaceAuthError.prototype = Error.prototype;

vu$9.error.showError = async function(e) {

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

    if(e.name === vu$9.error.LOAD_ERROR) {
        if (e.message === 'browserOldVersion') {
            vu$9.sop.audio.play('vu.sop.audio.browserOldVersion');
            await vu$9.sop.ui.alertNoButton(vu$9.sop.msg.browserOldVersion);
        } else if (e.message === 'browserUnsupported') {
            vu$9.sop.audio.play('vu.sop.audio.browserUnsupported');
            await vu$9.sop.ui.alertNoButton(vu$9.sop.msg.browserUnsupported);
        } else if (e.message === 'osOldVersion') {
            vu$9.sop.audio.play('vu.sop.audio.osOldVersion');
            await vu$9.sop.ui.alertNoButton(vu$9.sop.msg.osOldVersion);
        } else if(e.message === 'deviceNotSupported') {
            vu$9.sop.audio.play('vu.sop.audio.deviceNotSupported');
            await vu$9.sop.ui.alertNoButton(vu$9.sop.msg.deviceNotSupported);
        }
    } else if(e.name === vu$9.error.USER_ERROR) {
        vu$9.sop.audio.play('vu.sop.audio.userError');
    await vu$9.sop.ui.alert(vu$9.sop.msg.userError, e);
    } else if(e.name === vu$9.error.TAKE_DOCUMENT_FRONT_ERROR) {
        if (e.message === 'addFrontApiError') {
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentComunicationError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentPictureNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentBarcodeNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontApiErrorAntiSpoofing');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontApiErrorAntiSpoofing, e);
        } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontApiErrorFrontAlreadyExist');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontApiErrorFrontAlreadyExist, e);
        } else {
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentError, e);
        }
    } else if(e.name === vu$9.error.TAKE_DOCUMENT_BACK_ERROR) {
        if (e.message === 'addBackApiError') {
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentComunicationError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentPictureNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentBarcodeNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addBackApiErrorAntiSpoofing'){
            vu$9.sop.audio.play('vu.sop.audio.addBackApiErrorAntiSpoofing');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackApiErrorAntiSpoofing, e);
        } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
            vu$9.sop.audio.play('vu.sop.audio.addBackApiErrorFrontAlreadyExist');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackApiErrorFrontAlreadyExist, e);
        } else {
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentError, e);
        }
    } else if(e.name === vu$9.error.CAMERA_ERROR) {
        if (e.message === 'denied') {
            vu$9.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraDenied, e);
        } else if (e.message === 'autoplay') {
            vu$9.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'lowResolution') {
            vu$9.sop.audio.play('vu.sop.audio.cameraLowResolution');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraLowResolution, e);
        }  else if (e.message === 'cameraSelectionError') {
            vu$9.sop.audio.play('vu.sop.audio.cameraDenied'); // TODO Reemplazar con el audio cuando este generado
            const selectedDeviceId = await vu$9.sop.ui.alertCameraSelection(vu$9.sop.msg.selectOne);
            moduleCamera$3.selectedDeviceId = selectedDeviceId;
            await moduleCamera$3.start("vu.sop.ui.video");  

        }  else {
            vu$9.sop.audio.play('vu.sop.audio.cameraError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraError, e );
        }
    } else if(e.name === vu$9.error.CAMERA_FACE_ERROR) {
        if (e.message === 'denied') {
            vu$9.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraDenied, e );
        } else if (e.message === 'autoplay') {
            vu$9.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'registerApiError') {
            vu$9.sop.audio.play('vu.sop.audio.faceComunicationErrorRegister');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceComunicationErrorRegister, e);
        } else if (e.message === 'endOpApiError') {
            vu$9.sop.audio.play('vu.sop.audio.faceComunicationErrorEndOperation');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceComunicationErrorEndOperation, e);
        }  else {
            vu$9.sop.audio.play('vu.sop.audio.faceError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceError, e);
        }
    } else if(e.name === vu$9.error.FACE_AUTH_ERROR) {
        if (e.message === 'denied') {
            vu$9.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraDenied, e );
        } else if (e.message === 'autoplay') {
            vu$9.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu$9.sop.ui.alert(vu$9.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'faceNoDocFrontImg') {
            vu$9.sop.audio.play('vu.sop.audio.faceNoDocFrontImg');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceNoDocFrontImg, e);
        } else if (e.message === 'faceNoSelfieFrontImg') {
            vu$9.sop.audio.play('vu.sop.audio.faceNoSelfieFrontImg');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceNoSelfieFrontImg, e);
        } else if (e.message === 'registerApiError') {
            vu$9.sop.audio.play('vu.sop.audio.faceComunicationErrorRegister');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceComunicationErrorRegister, e);
        } else if (e.message === 'endOpApiBadScore') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiBadScore');
            await vu$9.sop.ui.alert(vu$9.sop.msg.endOpApiBadScore, e);
        } else if (e.message === 'endOpApiDocumentDataError') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiDocumentDataError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.endOpApiDocumentDataError, e);
        } else if (e.message === 'endOpApiDocumentBackFrontError') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiDocumentBackFrontError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.endOpApiDocumentBackFrontError, e);
        } else if (e.message === 'endOpApiDocumentBarcodeDoNotExist') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiDocumentBarcodeDoNotExist');
            await vu$9.sop.ui.alert(vu$9.sop.msg.endOpApiDocumentBarcodeDoNotExist, e);
        } else if (e.message === 'endOpApiDocumentExpired') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiDocumentExpired');
            await vu$9.sop.ui.alert(vu$9.sop.msg.endOpApiDocumentExpired, e);
        } else if (e.message === 'endOpApiPersonDataFail') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiPersonDataFail');
            await vu$9.sop.ui.alert(vu$9.sop.msg.endOpApiPersonDataFail, e);
        } else if (e.message === 'endOpApiError') {
            vu$9.sop.audio.play('vu.sop.audio.faceComunicationErrorEndOperation');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceComunicationErrorEndOperation, e );
        } else if (e.message === 'endOpApiBiometricFail') {
            vu$9.sop.audio.play('vu.sop.audio.faceNoSelfieFrontImg');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceNoSelfieFrontImg, e );
        } else if (e.message === 'userNotExist') {
            vu$9.sop.audio.play('vu.sop.audio.faceErrorUserNotExist');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceErrorUserNotExist, e);
        } else if (e.message === 'failAuth') {
            vu$9.sop.audio.play('vu.sop.audio.faceErrorFailAuth');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceErrorFailAuth, e);
        } else if (e.message === 'endOpApiBiometricCompareFail') {
            vu$9.sop.audio.play('vu.sop.audio.endOpApiBiometricCompareFail');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceBiometricCompareError, e);
        } else {
            vu$9.sop.audio.play('vu.sop.audio.faceError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.faceError, e );
        }
    } else if(e.name === vu$9.error.UPLOAD_DOCUMENT_FRONT_ERROR) {
        if (e.message === 'addFrontApiError') {
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentComunicationError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentPictureNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentBarcodeNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontApiErrorAntiSpoofing');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontApiErrorAntiSpoofing, e);
        } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
            vu$9.sop.audio.play('vu.sop.audio.addFrontApiErrorFrontAlreadyExist');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontApiErrorFrontAlreadyExist, e);
        } else if (e.message === 'smallDocumentImg'){
            vu$9.sop.audio.play('vu.sop.audio.smallDocumentImg');
            await vu$9.sop.ui.alert(vu$9.sop.msg.smallDocumentImg, e);
        } else if (e.message === 'badImageFormat'){
            vu$9.sop.audio.play('vu.sop.audio.badImageFormat');
            await vu$9.sop.ui.alert(vu$9.sop.msg.badImageFormat, e);
        } else {
            vu$9.sop.audio.play('vu.sop.audio.addFrontDocumentError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addFrontDocumentError, e);
        }
    } else if(e.name === vu$9.error.UPLOAD_DOCUMENT_BACK_ERROR) {
        if (e.message === 'addBackApiError') {
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentComunicationError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentComunicationError, e);
        } else if (e.message === 'documentPictureNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentPictureNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentPictureNotDetected, e);
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentBarcodeNotDetected');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentBarcodeNotDetected, e);
        } else if (e.message === 'addBackApiErrorAntiSpoofing'){
            vu$9.sop.audio.play('vu.sop.audio.addBackApiErrorAntiSpoofing');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackApiErrorAntiSpoofing, e);
        } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
            vu$9.sop.audio.play('vu.sop.audio.addBackApiErrorFrontAlreadyExist');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackApiErrorFrontAlreadyExist, e);
        } else if (e.message === 'smallDocumentImg'){
            vu$9.sop.audio.play('vu.sop.audio.smallDocumentImg');
            await vu$9.sop.ui.alert(vu$9.sop.msg.smallDocumentImg, e);
        } else if (e.message === 'badImageFormat'){
            vu$9.sop.audio.play('vu.sop.audio.badImageFormat');
            await vu$9.sop.ui.alert(vu$9.sop.msg.badImageFormat, e);
        } else {
            vu$9.sop.audio.play('vu.sop.audio.addBackDocumentError');
            await vu$9.sop.ui.alert(vu$9.sop.msg.addBackDocumentError, e);
        }
    } 
};

var vuError = vu$9.error;

// Reference the existing vu object
const vu$8 = window.vu || {};
vu$8.face = vu$8.face || {};
vu$8.face.ui = vu$8.face.ui || {};
vu$8.sop = vu$8.sop || {};
vu$8.sop.ui = vu$8.sop.ui || {};
//vu.camera = vu.camera || {};

let moduleCamera$2 = null;

vu$8.face.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    
    vu$8.face = window.vu.face || {};
    vu$8.sop.msg = window.vu.sop.msg || {};
    vu$8.sop.audio = window.vu.sop.audio || {};
    vu$8.sop.steps = window.vu.sop.steps || {};
    vu$8.image = window.vu.image || {};
    vu$8.sop.ui = window.vu.sop.ui || {};
    moduleCamera$2 = camera;
};

//---------------------------------------------------
// FACE
//---------------------------------------------------



vu$8.face.ui.loop = false;

vu$8.face.ui.starSvg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
'<style type="text/css">.st0{fill:'+color+';}</style><g id="Layer_1"><path class="st0"' +
' d="m 507.80497,263.6018 -52.5396,62.69019 c -3.63142,4.333 -11.50349,4.333 -15.09627,0 l -0.36941,-0.46593 c -3.52934,-4.45149 -1.73618,-11.21455 1.89523,-15.50145 l 45.98275,-54.51299 -45.5472,-54.94611 c -3.61146,-4.35669 -5.63142,-11.33955 -2,-15.62645 v 0 c 3.63141,-4.333 11.50348,-4.333 15.09627,0 l 52.53959,62.69019 c 3.67005,4.333 3.67005,11.33955 0.0386,15.67255 z"' +
'/></g></svg>') +"')"};

vu$8.face.ui.circleSvg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400" style="enable-background:new 0 0 400 400;" xml:space="preserve">' +
'<style type="text/css">.st0{fill:'+color+';}</style><g id="Layer_1"><path class="st0"' +
'   transform="rotate(-157.76036,198.89912,199.17002)"'+
'        d="M 48.29569,327.37072 C 20.683192,294.30809 3.6837793,255.79508 2.9763579,211.63205 c 0.245377,-8.41318 16.0066581,-6.42993 16.0162551,1.88523 1.827925,38.65477 15.395089,69.72809 40.511369,101.45314 8.569597,8.38801 -5.054379,19.56838 -11.208292,12.4003 z"'+
'/></g></svg>') +"')"};

vu$8.face.ui.circleActive = vu$8.face.ui.circleSvg('#1DC600');
vu$8.face.ui.circleDetected = vu$8.face.ui.circleSvg('#88898a');
vu$8.face.ui.circleInactive = vu$8.face.ui.circleSvg('#000000');

vu$8.face.ui.eLeft = document.getElementById("vu.sop.ui.faceCircleLeft");
vu$8.face.ui.eLeftTop = document.getElementById("vu.sop.ui.faceCircleLeftTop");
vu$8.face.ui.eTop = document.getElementById("vu.sop.ui.faceCircleTop");
vu$8.face.ui.eRightTop = document.getElementById("vu.sop.ui.faceCircleRightTop");
vu$8.face.ui.eRight = document.getElementById("vu.sop.ui.faceCircleRight");
vu$8.face.ui.eRightBottom = document.getElementById("vu.sop.ui.faceCircleRightBottom");
vu$8.face.ui.eBottom = document.getElementById("vu.sop.ui.faceCircleBottom");
vu$8.face.ui.eLeftBottom = document.getElementById("vu.sop.ui.faceCircleLeftBottom");
var gesturesType = [];
var directionTags = [];
vu$8.face.ui.picturesTags = [];
vu$8.face.ui.useNewTags = false;


vu$8.face.ui.start = function() {
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

    vu$8.face.ui.eLeft = document.getElementById("vu.sop.ui.faceCircleLeft");
    vu$8.face.ui.eLeftTop = document.getElementById("vu.sop.ui.faceCircleLeftTop");
    vu$8.face.ui.eTop = document.getElementById("vu.sop.ui.faceCircleTop");
    vu$8.face.ui.eRightTop = document.getElementById("vu.sop.ui.faceCircleRightTop");
    vu$8.face.ui.eRight = document.getElementById("vu.sop.ui.faceCircleRight");
    vu$8.face.ui.eRightBottom = document.getElementById("vu.sop.ui.faceCircleRightBottom");
    vu$8.face.ui.eBottom = document.getElementById("vu.sop.ui.faceCircleBottom");
    vu$8.face.ui.eLeftBottom = document.getElementById("vu.sop.ui.faceCircleLeftBottom");
    
    vu$8.sop.ui.show("vu.sop.ui.faceCircleLeft");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleLeftTop");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleTop");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleRightTop");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleRight");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleRightBottom");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleBottom");
    vu$8.sop.ui.show("vu.sop.ui.faceCircleLeftBottom");

    vu$8.face.ui.loop = true;
    vu$8.face.start();
    doLoop();
    return true
};


vu$8.face.ui.stop = function() {
    vu$8.face.ui.loop = false;
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleLeft");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleLeftTop");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleTop");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleRightTop");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleRight");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleRightBottom");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleBottom");
    vu$8.sop.ui.hide("vu.sop.ui.faceCircleLeftBottom");
};

// Private function - not exposed to window scope
function doLoop() {
    // console.log("vu.face.ui.doLoop");
    let data = vu$8.face.getData();

    if (!data || data.length === 0 || data[0] == undefined ) {
        console.log("Data is unresolved or empty, skipping doLoop");
        return; // Exit function if data is not ready or is empty
    }    

    let eLeft = vu$8.face.ui.eLeft;
    let eLeftTop = vu$8.face.ui.eLeftTop;
    let eTop = vu$8.face.ui.eTop;
    let eRightTop = vu$8.face.ui.eRightTop;
    let eRight = vu$8.face.ui.eRight;
    let eRightBottom = vu$8.face.ui.eRightBottom;
    let eBottom = vu$8.face.ui.eBottom;
    let eLeftBottom = vu$8.face.ui.eLeftBottom;

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
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'left' && y === 'center') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleActive;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'left' && y === 'up') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleActive;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'center' && y === 'up') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleActive;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'right' && y === 'up') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleActive;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'right' && y === 'center') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleActive;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'right' && y === 'down') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleActive;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'center' && y === 'down') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleActive;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
        }
        if (x === 'left' && y === 'down') {
            eLeft.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eTop.style.backgroundImage =  vu$8.face.ui.circleDetected;
            eRightTop.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRight.style.backgroundImage = vu$8.face.ui.circleDetected;
            eRightBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eBottom.style.backgroundImage = vu$8.face.ui.circleDetected;
            eLeftBottom.style.backgroundImage = vu$8.face.ui.circleActive;
        }
    } else {
        eLeft.style.backgroundImage = vu$8.face.ui.circleInactive;
        eLeftTop.style.backgroundImage = vu$8.face.ui.circleInactive;
        eTop.style.backgroundImage =  vu$8.face.ui.circleInactive;
        eRightTop.style.backgroundImage = vu$8.face.ui.circleInactive;
        eRight.style.backgroundImage = vu$8.face.ui.circleInactive;
        eRightBottom.style.backgroundImage = vu$8.face.ui.circleInactive;
        eBottom.style.backgroundImage = vu$8.face.ui.circleInactive;
        eLeftBottom.style.backgroundImage = vu$8.face.ui.circleInactive;
    }

    if (vu$8.face.ui.loop == true) {
        setTimeout(function () {
            if(vu$8.face.ui.loop == true)
            {
                doLoop();
            }            
        }, 25);
    }
}

//---------------------------------------------------
// FACE - Gestures
//---------------------------------------------------


vu$8.face.ui.pointSvg = function(color) { return "url('data:image/svg+xml;base64," +
    btoa( '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="'+color+'" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>') +"')"};


vu$8.face.ui.arrowSvg = function(color, rotation) { return "url('data:image/svg+xml;base64," +
    btoa( '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="rotate('+rotation+' 256 256)" ><path fill="'+color+'" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"></path></g></svg>') +"')"};



vu$8.face.ui.faceDotColor = '#1DC600';


vu$8.face.ui.faceDotObserver = new ResizeObserver(entries => {
    console.trace("ResizeObserver fired in vu.face.ui.faceDotObserver");
    let height = vu$8.face.ui.faceDot.clientHeight;
    let vidWidth = document.getElementById('vu.sop.ui.videoContainer').clientWidth;
    vu$8.face.ui.faceDot.style.width = height + "px";
    vu$8.face.ui.faceDot.style.left = (vidWidth - height)/2 + "px";
});

// Private function - not exposed to window scope
function showFaceDot() {
    vu$8.face.ui.faceDot = document.getElementById("vu.sop.ui.faceDot");
    vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.pointSvg(vu$8.face.ui.faceDotColor);

    // TODO Center whit CSS (ugly fix)
    vu$8.sop.ui.show("vu.sop.ui.faceDot");
    /* height = vu.face.ui.faceDot.clientHeight
    vidWidth = document.getElementById('vu.sop.ui.videoContainer').clientWidth
    vu.face.ui.faceDot.style.width = height + "px"
    vu.face.ui.faceDot.style.left = (vidWidth - height)/2 + "px"*/
    vu$8.face.ui.faceDotObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));
}

// Private function - not exposed to window scope
function hideFaceDot() {
	vu$8.sop.ui.hide("vu.sop.ui.faceDot");
}

// Private function - not exposed to window scope
function moveDot(x, y) {
    console.log("vu.face.ui.moveDot", x, y);
    if (x == 'center' && y == 'center') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.pointSvg(vu$8.face.ui.faceDotColor);
        //vu.face.ui.faceDot.style.transform = 'rotate(0deg)';
        vu$8.face.ui.faceDot.style.backgroundPosition = '50% 50%';
    }
    if (x === 'left' && y === 'center') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 270);
        vu$8.face.ui.faceDot.style.backgroundPosition = '15% 50%'; // OK
    }
    if (x === 'left' && y === 'up') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 315);
        vu$8.face.ui.faceDot.style.backgroundPosition = '25% 25%'; //
    }
    if (x === 'center' && y === 'up') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 0);
        vu$8.face.ui.faceDot.style.backgroundPosition = '50% 15%'; // OK
    }
    if (x === 'right' && y === 'up') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 45);
        vu$8.face.ui.faceDot.style.backgroundPosition = '75% 25%'; //
    }
    if (x === 'right' && y === 'center') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 90);
        vu$8.face.ui.faceDot.style.backgroundPosition = '85% 50%'; // OK
    }
    if (x === 'right' && y === 'down') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 135);
        vu$8.face.ui.faceDot.style.backgroundPosition = '75% 75%'; //
    }
    if (x === 'center' && y === 'down') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 180);
        vu$8.face.ui.faceDot.style.backgroundPosition = '50% 85%'; // OK
    }
    if (x === 'left' && y === 'down') {
        vu$8.face.ui.faceDot.style.backgroundImage = vu$8.face.ui.arrowSvg(vu$8.face.ui.faceDotColor, 225);
        vu$8.face.ui.faceDot.style.backgroundPosition = '25% 75%'; //
    }
}

// Private variable for number of challenges - not exposed directly
let uiNumOfChallenges = 3;

// Public setter function to configure number of challenges (security: only accepts first configuration until release)
vu$8.face.ui.setNumOfChallenges = function(num) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu$8.face.auth && vu$8.face.auth.initialized) || 
        (vu$8.sop && vu$8.sop.initialized)) {
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
vu$8.face.ui.getNumOfChallenges = function() {
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

vu$8.face.ui.challenges = [];
vu$8.face.ui.challengeNum = 0;
vu$8.face.ui.challengeValidaXTimes = 4;
vu$8.face.ui.challengeLoopTime = 100;
vu$8.face.ui.challengeLoop = false;
vu$8.face.ui.pictures = [];

function genChallenges() {
    vu$8.face.ui.challenges = [];
    var i;
    let cha;
    
    do {
        cha = genChallenge();
    } while (cha[0] === "center" && cha[1] === "center");

    vu$8.face.ui.challenges.push(cha);
        
    for (i = 1; i < uiNumOfChallenges; i++) {
        cha = genChallenge();
        while (cha === vu$8.face.ui.challenges[i-1] || (cha[0] === "center" && cha[1] === "center")) {
            cha = genChallenge();
        }
        vu$8.face.ui.challenges.push(cha);
    }
    vu$8.face.ui.challenges.splice(-1,1);
    vu$8.face.ui.challenges.push(['center','center']);
    return vu$8.face.ui.challenges
}
vu$8.face.ui.challengeResolve = null;

vu$8.face.ui.challengeStart = function() {
    let promise = new Promise(function (resolve, reject) {
        genChallenges();
        vu$8.face.ui.challengeLoop = true;
        showFaceDot();
        vu$8.sop.audio.play('vu.sop.audio.facePoint');
        vu$8.sop.ui.showBottomText(vu$8.sop.msg.facePoint);
        moduleCamera$2.config.orientation = 'user';
        moduleCamera$2.config.previewResolution = 'lowest';
        moduleCamera$2.config.pictureResolution = 'lowest';
        moduleCamera$2.config.pictureLessBlurry = false;
        vu$8.face.ui.pictures = [];
        vu$8.face.ui.picturesTags = [];        
        challengeDoLoop();
        vu$8.face.ui.challengeResolve = resolve;
        vu$8.face.ui.challengeReject = reject;
    });
    return promise
};

vu$8.face.ui.challengeStop = function() {
    vu$8.sop.ui.hideBottomText();
    hideFaceDot();
    genChallenges();
    vu$8.face.ui.challengeLoop = false;
    vu$8.face.ui.challengeNum = 0;
};

vu$8.face.ui.challengeValidaXTimesCounter = 0;
vu$8.face.ui.lastChallengeNum = 9999;
// Private function - not exposed to window scope
async function challengeDoLoop() {
    // console.log("vu.face.ui.challengeDoLoop");
    let challenge = vu$8.face.ui.challenges[vu$8.face.ui.challengeNum];
    if ( vu$8.face.ui.lastChallengeNum !== vu$8.face.ui.challengeNum) {
        moveDot(challenge[0], challenge[1]);
        vu$8.face.ui.lastChallengeNum = vu$8.face.ui.challengeNum;
    }
    let data = vu$8.face.getData();

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
            vu$8.face.ui.challengeValidaXTimesCounter  = vu$8.face.ui.challengeValidaXTimesCounter + 1;
            if (vu$8.face.ui.challengeValidaXTimesCounter === vu$8.face.ui.challengeValidaXTimes ) {

                try {
                    vu$8.face.ui.pictures.push(await moduleCamera$2.takePicture());
                    console.log("vu.face.ui.pictures", vu$8.face.ui.pictures);
                    vu$8.face.ui.challengeNum = vu$8.face.ui.challengeNum + 1;
                    vu$8.face.ui.challengeValidaXTimesCounter = 0;

                    if (vu$8.face.ui.useNewTags) {
                        let gesture = directionTags.find(c => c.x === challenge[0] && c.y === challenge[1]);
                        vu$8.face.ui.picturesTags.push(gesture.tag);
                    } else {
                        if (challenge[0] === 'center' && challenge[1] === 'center') {
                            vu$8.face.ui.picturesTags.push("SN");
                        }
                        else {
                            let random = gesturesType[(Math.random() * gesturesType.length) | 0];
                            gesturesType = gesturesType.filter(item => item !== random);
                            vu$8.face.ui.picturesTags.push(random);
                        }
                    }

                } catch (err) {
                    vu$8.face.auth.release();
                    console.warn("[vu.camera] takePicture failed:", err.message);
                    vu$8.face.ui.challengeLoop = false;
                    vu$8.face.ui.loop = false;
                    vu$8.sop.ui.hideBottomText();
                    if (typeof vu$8.face.ui.challengeReject === 'function') {
                        vu$8.face.ui.challengeReject(err);
                    } else {
                        console.warn('[vu.camera] No rejection callback set for challenge UI.');
                    }

                    return; // stop the loop immediately
                }
            }
            //console.log("face.ui.challenge", vu.face.ui.challengeNum, vu.face.ui.challengeValidaXTimesCounter )
        } else {
            vu$8.face.ui.challengeValidaXTimesCounter = 0;
        }

        if (vu$8.face.ui.challengeNum == uiNumOfChallenges) {
            //console.log('stop', vu.face.ui.challengeNum)
            vu$8.face.ui.challengeStop();
            vu$8.face.ui.stop();
            vu$8.face.ui.challengeResolve(vu$8.face.ui.pictures);
        }
    }
    if (vu$8.face.ui.challengeLoop == true) {
        setTimeout(function () {
            if(vu$8.face.ui.challengeLoop == true)
            {
                challengeDoLoop();
            }
            
        }, vu$8.face.ui.challengeLoopTime);
    }
}
//---------------------------------------------------
// FACE - Progress Bar
//---------------------------------------------------

vu$8.face.ui.progress = function(color) { return "url('data:image/svg+xml;base64," +
    btoa( '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-minimize" class="svg-inline--fa fa-window-minimize fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m 237.42373,52.372881 -80,407.999999 c -5.09898,26.00481 21.5,48 48,48 h 32 c 26.5,0 42.90102,-21.99519 48,-48 l 80,-407.999999 c 5.09898,-26.004814 -21.5,-47.9999996 -48,-47.9999996 h -32 c -26.5,0 -42.90102,21.9951856 -48,47.9999996 z"></path></svg>') +"')"};


var vuFaceUi = vu$8.face.ui;

// Reference the existing vu object
// const vu = vu || {};
// vu.sop = vu.sop || {};
// vu.camera = vu.camera || {};
// vu.face = vu.face || {};
// vu.face.ui = vuFaceUi;
// vu.face.auth = vuFaceAuth;
// vu.extras = vuExtras;


const vu$7 = {
  sop: {},
  camera: {},
  face: {
    ui: vuFaceUi,
    auth: {}
  },
  extras: vuExtras
};

vu$7.camera.video;                        // Video Element
vu$7.camera.stream;                       // Video Stream
vu$7.camera.track;                        // Video track
vu$7.camera.devices = null;
vu$7.camera.videoinput = [];
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
vu$7.camera.config = {
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
vu$7.camera.cssValues = {
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

vu$7.camera.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu$7.camera.isVerticalVideo = function() {
    if ( vu$7.camera.video.videoWidth < vu$7.camera.video.videoHeight) {
        return true
    } else {
        return false
    }
};

vu$7.camera.hasFocusControl = function() {
    if ("focusDistance" in vu$7.camera.stream.getVideoTracks()[0].getCapabilities()) {
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
vu$7.camera.getRange = function (min, max) {
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
vu$7.camera.getHighValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.75) - 1];
};

/**
 * Example range = [1,2,3,4,5], returns 3
 *
 * @param range
 * @returns {*}
 */
vu$7.camera.getMediumValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.5) - 1];
};

/**
 * Example range = [1,2,3,4,5], returns 2
 *
 * @param range
 * @returns {*}
 */
vu$7.camera.getLowValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.25) - 1];
};

/**
 * Set the video Stream and set the max resolution available
 *
 * @returns {true or Error}
 *      Error('denied') No camera or camera access denied
 */
vu$7.camera.setMaxResolution = async function () {
    if (vu$7.camera.stream) {
        vu$7.camera.stream.getTracks().forEach(track => track.stop());
    }

    vu$7.camera.stream = null;
    vu$7.camera.videoinput = [];

    for (let i = 0; i < vu$7.camera.config.resolutionConstraints.length; i++) {
        let constraints = vu$7.camera.config.resolutionConstraints[i];

        constraints.video.resizeMode = { exact: 'none' };

        if (vu$7.camera.selectedDeviceId) {
            constraints.video.deviceId = { exact: vu$7.camera.selectedDeviceId };
        } else {
            if (vu$7.camera.config.orientation !== 'user') {
                vu$7.camera.devices = await navigator.mediaDevices.enumerateDevices();
                vu$7.camera.devices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        vu$7.camera.videoinput.push(mediaDevice);
                    }
                });

                if (vu$7.camera.videoinput.length <= 2 || vu$7.camera.devices.length <= 2) {
                    constraints.video.facingMode = vu$7.camera.config.orientation;
                } else {
                    for (let i = 0; i < vu$7.camera.videoinput.length; i++) {
                        if (vu$7.camera.videoinput[i].label.includes('0, facing back')) {
                            constraints.video.deviceId = { exact: vu$7.camera.videoinput[i].deviceId };
                            break;
                        }
                    }
                }
            } else {
                constraints.video.facingMode = vu$7.camera.config.orientation;
            }
        }

        try {
            vu$7.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);");
            vu$7.camera.config.maxResolutionConstrains = constraints;
            console.log(constraints);
            console.log("Camera Orientation max reso", vu$7.camera.config.orientation, i, " || Max Resolution", constraints);            
            

            const actualTrack = vu$7.camera.stream?.getVideoTracks?.()[0];
            const currentDeviceId = actualTrack?.getSettings?.().deviceId;
            const actualLabel = actualTrack?.label || '';

            console.log('[Camera] Initial stream label:', actualLabel);
            console.log("Device ID:", currentDeviceId);                        

            if (isSuspiciousCameraLabel(actualLabel)) {
                console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
                vu$7.camera.stream.getTracks().forEach(t => t.stop());
                vu$7.camera.stream = null;
                throw new Error('cameraSelectionError');
            }            

            vu$7.camera.selectedDeviceId = currentDeviceId;

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
            if (vu$7.camera.stream != null) break;
        }
    }

    if (vu$7.camera.stream == null) {
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
vu$7.camera.setMinResolution = async function () {
    if (vu$7.camera.stream) {
        vu$7.camera.stream.getTracks().forEach(track => track.stop());
    }

    vu$7.camera.stream = null;
    vu$7.camera.videoinput = [];

    const reversedConstraints = vu$7.camera.config.resolutionConstraints.slice().reverse();

    for (let i = 0; i < reversedConstraints.length; i++) {
        let constraints = reversedConstraints[i];

        constraints.video.resizeMode = { exact: 'none' };

        if (vu$7.camera.selectedDeviceId) {
            constraints.video.deviceId = { exact: vu$7.camera.selectedDeviceId };
        } else {
            if (vu$7.camera.config.orientation !== 'user') {
                vu$7.camera.devices = await navigator.mediaDevices.enumerateDevices();
                vu$7.camera.devices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        vu$7.camera.videoinput.push(mediaDevice);
                    }
                });

                if (vu$7.camera.videoinput.length <= 2 || vu$7.camera.devices.length <= 2) {
                    constraints.video.facingMode = vu$7.camera.config.orientation;
                } else {
                    for (let i = 0; i < vu$7.camera.videoinput.length; i++) {
                        if (vu$7.camera.videoinput[i].label.includes('0, facing back')) {
                            constraints.video.deviceId = { exact: vu$7.camera.videoinput[i].deviceId };
                            break;
                        }
                    }
                }
            } else {
                constraints.video.facingMode = vu$7.camera.config.orientation;
            }
        }

        try {
            vu$7.camera.config.minResolutionConstrains = constraints;
            vu$7.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(constraints);
            console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);");
            console.log("Camera Orientation min reso", vu$7.camera.config.orientation, " || Min Resolution", constraints);

            const actualTrack = vu$7.camera.stream?.getVideoTracks?.()[0];
            const currentDeviceId = actualTrack?.getSettings?.().deviceId;
            const actualLabel = actualTrack?.label || '';

            console.log('[Camera] Initial stream label:', actualLabel);
            console.log("Device ID:", currentDeviceId);                        

            if (isSuspiciousCameraLabel(actualLabel)) {
                console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
                vu$7.camera.stream.getTracks().forEach(t => t.stop());
                vu$7.camera.stream = null;
                throw new Error('cameraSelectionError');
            }            

            vu$7.camera.selectedDeviceId = currentDeviceId;            

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
            if (vu$7.camera.stream != null) break;
        }        
    }

    if (vu$7.camera.stream == null) {
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
vu$7.camera.start = async function(videoId) {
    if (typeof videoId === "string") {
        vu$7.camera.video = document.getElementById(videoId);
    } else {
        vu$7.camera.video = videoId;
    }

    if (vu$7.camera.selectedDeviceId) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const selected = devices.find(d =>
            d.kind === 'videoinput' &&
            d.deviceId === vu$7.camera.selectedDeviceId &&
            !isSuspiciousCameraLabel(d.label)
        );

        if (selected) {
            // continue with binding below using selectedDeviceId
            console.log('[Camera] Using previously device:', selected.label);
        } else {
            // fallback to fresh anomaly check if invalid
            vu$7.camera.selectedDeviceId = null;
        }
    }

    if (!vu$7.camera.selectedDeviceId) {
        const flagged = await cameraAnomalyDevice();
        if (flagged) {
            //await initCameraPicker(videoId);
            throw Error('cameraSelectionError');
        }
    }

    try {
        await vu$7.camera.setMaxResolution(vu$7.camera.config.orientation);
        console.log("previewResolution", vu$7.camera.config.previewResolution);
        console.log("vu.camera.video", vu$7.camera.video);

        const actualTrack = vu$7.camera.stream?.getVideoTracks()[0];
        const actualLabel = actualTrack?.label || '';

        console.debug('[Camera] Initial stream label:', actualLabel);

        // If no selectedDeviceId and camera looks suspicious (first-time permission case)
        if (!vu$7.camera.selectedDeviceId && isSuspiciousCameraLabel(actualLabel)) {
            console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
            vu$7.camera.stream.getTracks().forEach(t => t.stop());
            vu$7.camera.stream = null;
            throw new Error('cameraSelectionError');
        }

        if (vu$7.camera.config.previewResolution == 'highest'){
            vu$7.camera.track = vu$7.camera.stream.getVideoTracks()[0];
        } else {
            await vu$7.camera.setMinResolution(vu$7.camera.config.orientation);
            vu$7.camera.track = vu$7.camera.stream.getVideoTracks()[0];
        }

        if (vu$7.camera.config.contrast !== 'default') {
            vu$7.camera.setContrast(vu$7.camera.config.contrast);
        }
        if (vu$7.camera.config.brightness !== 'default') {
            vu$7.camera.setBrightness(vu$7.camera.config.brightness);
        }
        if (vu$7.camera.config.sharpness !== 'default') {
            vu$7.camera.setSharpness(vu$7.camera.config.sharpness);
        }
        if (vu$7.camera.config.saturation !== 'default') {
            vu$7.camera.setSaturation(vu$7.camera.config.saturation);
        }

        if (vu$7.camera.config.iso !== 'default') {
            vu$7.camera.setIso(vu$7.camera.config.iso);
        }
        if (vu$7.camera.config.zoom !== 'default') {
            //vu.camera.setZoom(vu.camera.config.zoom);
        }

        vu$7.camera.video.srcObject = vu$7.camera.stream;

    } catch (error) {
        console.log(error);
        throw Error(error.message)
    }
    try {
        let focusModes = vu$7.camera.stream.getVideoTracks()[0].getCapabilities().focusMode;
        if (focusModes.includes("continuous")) {
            vu$7.camera.stream.getVideoTracks()[0].applyConstraints({advanced: [{focusMode: "continuous"}]});
        } else if (focusModes.includes("auto")) {
            vu$7.camera.stream.getVideoTracks()[0].applyConstraints({advanced: [{focusMode: "auto"}]});
        }
    } catch (e) {
        console.log('Camera: set focus mode not supported');
    }

    let playPromise = vu$7.camera.video.play();
    if (playPromise !== undefined) {
        try {
            await playPromise;
        } catch (e) {
            console.log('Video anti-autoplay stop video stream', e);
            throw new Error('autoplay');
        }

        if (vu$7.camera.config.previewResolution == 'highest'){
            vu$7.camera.config.minimumResolution = vu$7.camera.config.minimumResolutionInHighestPreviewResolution;
        } else {
            vu$7.camera.config.minimumResolution = vu$7.camera.config.minimumResolutionInLowestPreviewResolution;        }

        if (vu$7.camera.video.videoHeight < vu$7.camera.config.minimumResolution ||
            vu$7.camera.video.videoWidth < vu$7.camera.config.minimumResolution){
            console.log('Camera too low resolution', vu$7.camera.video.videoHeight, vu$7.camera.video.videoWidth);
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
vu$7.camera.takePicture = async function() {
    if (vu$7.camera.config.pictureFlashEffect) {
        document.getElementById(vu$7.camera.config.pictureFlashDivId).style.display = "block";
    }

    // 🔒 Check for unexpected camera device change
    const actualTrack = vu$7.camera.stream?.getVideoTracks?.()[0];
    const currentDeviceId = actualTrack?.getSettings?.().deviceId;
    const actualLabel = actualTrack?.label || '';

    if (vu$7.camera.selectedDeviceId && currentDeviceId && currentDeviceId !== vu$7.camera.selectedDeviceId) {
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly',  vu$7.camera.selectedDeviceId);
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly', currentDeviceId);
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly');
        vu$7.camera.stream.getTracks().forEach(t => t.stop());
        vu$7.camera.stream = null;
        // no exponer error informativo
        throw new Error('undefined');        
    }

    if (isSuspiciousCameraLabel(actualLabel)) {
        console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
        vu$7.camera.stream.getTracks().forEach(t => t.stop());
        vu$7.camera.stream = null;
        // no exponer error informativo
        throw new Error('undefined');  
    }

    let resConstrain = false;
    // Si la camara no tiene el preview en maxima resolucion y se solicita la foto en maxima resolucion,
    // se cambia la camara a maxima resolucion antes de sacar la foto.
    if ( vu$7.camera.config.pictureResolution === 'highest' &&
         vu$7.camera.config.previewResolution !== 'highest') {

        resConstrain = vu$7.camera.config.previewResolution;
        vu$7.camera.config.previewResolution = 'highest';

        vu$7.camera.stream.getTracks().forEach(track => {
            track.stop();
        });
        vu$7.camera.stream = await navigator.mediaDevices.getUserMedia(vu$7.camera.config.maxResolutionConstrains);
        console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.maxResolutionConstrains);");
        vu$7.camera.video.srcObject = vu$7.camera.stream;
        await vu$7.camera.video.play();
    }

    // Se prepara el canvas y se pone en consola la informacion de la foto y la camara
    let burstCanvas = [];
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
    canvas.width = vu$7.camera.video.videoWidth;
    canvas.height = vu$7.camera.video.videoHeight;

    console.log("Camera resolution", canvas.width, canvas.height);
    console.log("Camera config", vu$7.camera.config);

    if (vu$7.camera.config.takePictureLessBlurry === false) {
        // Si es una sola foto, se toma y la misma y se deja en el canvas.
        canvasContext.drawImage(vu$7.camera.video, 0, 0, canvas.width, canvas.height);
    } else {
        // Crear Canvas
        for ( var i = 0; i < vu$7.camera.config.pictureLessBlurryBurst; i++) {
            let canvasTemp = document.createElement('canvas');
            canvasTemp.width = vu$7.camera.video.videoWidth;
            canvasTemp.height = vu$7.camera.video.videoHeight;
            burstCanvas.push(canvasTemp);
            //console.log("canvas", i)
        }
        // Sacar fotos
        for ( var i = 0; i < vu$7.camera.config.pictureLessBlurryBurst; i++) {
            burstCanvas[i].getContext('2d').drawImage(vu$7.camera.video,0, 0,
                burstCanvas[i].width, burstCanvas[i].height);
            //console.log("picture", i);
            //console.log(burstCanvas[i].toDataURL('image/jpeg', vu.camera.config.jpegCompression))
        }
    }

    // Se restaura la camara al modo que estaba si se cambio la resolucion para tomar la foto.
    if (resConstrain !== false) {
        vu$7.camera.config.previewResolution = resConstrain;
        vu$7.camera.stream.getTracks().forEach(track => {
            track.stop();
        });
        vu$7.camera.stream = await navigator.mediaDevices.getUserMedia(vu$7.camera.config.minResolutionConstrains);
        console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.minResolutionConstrains);");
        vu$7.camera.video.srcObject = vu$7.camera.stream;
        await vu$7.camera.video.play();
    }

    if (vu$7.camera.config.pictureFlashEffect) {
        document.getElementById(vu$7.camera.config.pictureFlashDivId).style.display = "none";
    }

    // Filtrar para obtener la foto menos borrosa
    if (vu$7.camera.config.takePictureLessBlurry !== false) {
        let blurValue = 1000;
        // Get Best Picture
        for (var i = 0; i < vu$7.camera.config.pictureLessBlurryBurst; i++) {
            let newBlurValue = measureBlur(burstCanvas[i].getContext('2d').getImageData(0, 0,
                burstCanvas[i].width, burstCanvas[i].height)).avg_edge_width_perc;
            //console.log("picture "+i+" blur value:", newBlurValue)

            if (newBlurValue < blurValue){
                blurValue = newBlurValue;
                canvasContext.drawImage(burstCanvas[i], 0, 0, burstCanvas[i].width, burstCanvas[i].height);
            }
        }
    }

    if (vu$7.camera.config.pictureForceLandscape) {
        // validar si es portrait o landscape
        if (canvas.width < canvas.height) {
            // Es portrait, rotar 90 clockwise

            let canvas2 = document.createElement('canvas');
            canvas2.width = canvas.height;
            canvas2.height = canvas.width;

            let ctx2 = canvas2.getContext('2d');


            if (vu$7.camera.config.pictureForceLandscapeRotateClockwise) {
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
    if (vu$7.camera.isVerticalVideo()) {
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
    if (vu$7.camera.config.responseType === 'dataUrl' || vu$7.camera.config.responseType === 'base64') {
        if (vu$7.camera.config.pictureFormat === 'jpg' || vu$7.camera.config.pictureFormat === 'jpeg') {
            dataUrl = canvas.toDataURL('image/jpeg', vu$7.camera.config.jpegCompression);
        } else {
            dataUrl = canvas.toDataURL('image/png');
        }
        if (dataUrl.length < 6) {
            console.log('browser or some adBlock extension blocks taking a picture');
            throw new Error('crossSiteBlock')
        } else {
            if (vu$7.camera.config.responseType === 'base64') {
                return dataUrl.split(",")[1]
            } else {
                return dataUrl
            }
        }
    }
    if (vu$7.camera.config.responseType === 'canvas') {
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
vu$7.camera.verifyBeforeForceResolution = function (idealResolution) {
    if(vu$7.camera.isVerticalVideo()){
        return vu$7.camera.video.videoHeight > idealResolution;
    }else   {
        return vu$7.camera.video.videoWidth > idealResolution;
    }
};

vu$7.camera.resizeDataURL = function(dataUrl, resizeBy = "width", size = 1280, jpgQuality = 0.95) {
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
vu$7.camera.getCapabilities = function() {
    if (typeof vu$7.camera.track.getCapabilities != "undefined") {
        return vu$7.camera.track.getCapabilities()
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
vu$7.camera.setCapabilities = function(value, attr) {
    if (vu$7.camera.getCapabilities() !== false) {
        let capabilities = vu$7.camera.getCapabilities();
        if (typeof capabilities[attr] != "undefined") {
            let highest = capabilities[attr].max;
            let lowest = capabilities[attr].min;
            let range = vu$7.camera.getRange(lowest, highest);
            if (value === 'highest') {
                vu$7.camera.track.applyConstraints({advanced: [{[attr]: highest}]});
                return true;
            } else if (value === 'high') {
                vu$7.camera.track.applyConstraints({advanced: [{[attr]: vu$7.camera.getHighValueOfRange(range)}]});
                return true;
            } else if (value === 'medium') {
                vu$7.camera.track.applyConstraints({advanced: [{[attr]: vu$7.camera.getMediumValueOfRange(range)}]});
                return true;
            } else if (value === 'low') {
                vu$7.camera.track.applyConstraints({advanced: [{[attr]: vu$7.camera.getLowValueOfRange(range)}]});
                return true;
            } else if (value === 'lowest') {
                vu$7.camera.track.applyConstraints({advanced: [{[attr]: lowest}]});
                return true;
            } else if (typeof value == 'number') {
                vu$7.camera.track.applyConstraints({advanced: [{[attr]: value}]});
                return true;
            } else {
                return false;
            }
        } else {
            return vu$7.camera.setCSSCapabilities(value, attr)
        }
    } else {
        return vu$7.camera.setCSSCapabilities(value, attr);
    }
};

vu$7.camera.setCSSCapabilities = function(value, attr) {
    if ( attr == 'contrast' || attr == 'brightness' || attr == 'saturation' || attr == 'zoom') {
        let highest = vu$7.camera.cssValues[attr].max;
        let lowest = vu$7.camera.cssValues[attr].min;
        let range = vu$7.camera.getRange(lowest, highest);
        if (value === 'highest') {
            value = highest;
        } else if (value === 'high') {
            value = vu$7.camera.getHighValueOfRange(range);
        } else if (value === 'medium') {
            value = vu$7.camera.getMediumValueOfRange(range);
        } else if (value === 'low') {
            value = vu$7.camera.getLowValueOfRange(range);
        } else if (value === 'lowest') {
            value = lowest;
        }
        vu$7.camera.cssValues[attr].val = value;
        vu$7.camera.video.style.filter = "contrast("+vu$7.camera.cssValues['contrast'].val+"%)" +
            "brightness("+vu$7.camera.cssValues['brightness'].val+"%)" +
            "saturate("+vu$7.camera.cssValues['saturation'].val+"%)";

        let newHeight = Math.round(100 * vu$7.camera.cssValues['zoom'].val);
        let newWidth = Math.round(100 * vu$7.camera.cssValues['zoom'].val);

        vu$7.camera.video.style.width =  newWidth + "%" ;
        vu$7.camera.video.style.height =  newHeight + "%";
        let top = -Math.abs(Math.round((newHeight - 100) / 2)) ;
        let left =  -Math.abs(Math.round((newWidth - 100) / 2));
        vu$7.camera.video.style.top = top  + "%";
        vu$7.camera.video.style.left = left  + "%";

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
vu$7.camera.setSharpness = function(value) {
    return vu$7.camera.setCapabilities(value, 'sharpness')
};

/**
 * Set camera brightness
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$7.camera.setBrightness = function(value) {
    let status = vu$7.camera.setCapabilities(value, 'brightness');
    return status;
};

/**
 * Set camera saturation
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$7.camera.setSaturation = function(value) {
    let status = vu$7.camera.setCapabilities(value, 'saturation');
    return status;
};

/**
 * Set camera contrast
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$7.camera.setContrast = function(value) {
    let status = vu$7.camera.setCapabilities(value, 'contrast');
    return status;
};

/**
 * Set camera iso
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false}
 */
vu$7.camera.setIso = function(value) {
    return vu$7.camera.setCapabilities(value, 'iso')
};

/**
 * Set camera zoom
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu$7.camera.setZoom = function(value) {
    let status = vu$7.camera.setCapabilities(value, 'zoom');
    return status;
};

vu$7.camera.release = async function () {
    if (vu$7.camera.stream) {
        vu$7.camera.stream.getTracks().forEach(function (track) {
            track.stop();
        });

        vu$7.camera.stream = null;
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


var vuCamera = vu$7.camera;

// Reference the existing vu object
const vu$6 = window.vu || {};
vu$6.image = vu$6.image || {};

// ------------------------------------------------------------------------------------------------------------ //

vu$6.image.lab2rgb = function(lab){
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


vu$6.image.rgb2lab = function(rgb){
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

vu$6.image.getDataUrlFromArr = function (arr, w, h) {
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

if (typeof vu$6.image.brigthSpotDetector == "undefined") { vu$6.image.brigthSpotDetector = function() {}; }

vu$6.image.brigthSpotDetector.borderDecimal = 0.15;
vu$6.image.brigthSpotDetector.minResult = 98;


vu$6.image.brigthSpotDetector.canvas = document.createElement("canvas");
vu$6.image.brigthSpotDetector.canvasContext = vu$6.image.brigthSpotDetector.canvas.getContext("2d", { willReadFrequently: true });
vu$6.image.brigthSpotDetector.canvasResize = document.createElement("canvas");
vu$6.image.brigthSpotDetector.canvasResizeContext = vu$6.image.brigthSpotDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu$6.image.brigthSpotDetector.hasABrightSpot = function(img) {
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

    vu$6.image.brigthSpotDetector.canvas.width = width;
    vu$6.image.brigthSpotDetector.canvas.height = height;
    vu$6.image.brigthSpotDetector.canvasContext.drawImage(img,0,0, width, height);
    let imageData = vu$6.image.brigthSpotDetector.canvasContext.getImageData(0, 0, width, height);
    let data = imageData.data;
    var r,g,b;
    var brightSportCount = 0;
    let lab;
    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        lab = vu$6.image.rgb2lab([r,g,b]);
        Math.floor(lab[0]);
        //console.log(lab[0])
        if ( lab[0] > vu$6.image.brigthSpotDetector.minResult )
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

vu$6.image.brigthSpotDetector.hasABrightSpotAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.brigthSpotDetector.hasABrightSpot(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

vu$6.image.brigthSpotDetector.thisAreaHasABrightSpot = function(img, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    let borderHorizontal = Math.round(box[2] * vu$6.image.brigthSpotDetector.borderDecimal);
    let borderVertical =  Math.round(box[3] * vu$6.image.brigthSpotDetector.borderDecimal);

    vu$6.image.brigthSpotDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu$6.image.brigthSpotDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu$6.image.brigthSpotDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu$6.image.brigthSpotDetector.hasABrightSpot(vu$6.image.brigthSpotDetector.canvasResize);
};

vu$6.image.brigthSpotDetector.thisAreaHasABrightSpotAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.brigthSpotDetector.thisAreaHasABrightSpot(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu$6.image.brightnessDetector == "undefined") { vu$6.image.brightnessDetector = function() {}; }

vu$6.image.brightnessDetector.minResult = 30;
vu$6.image.brightnessDetector.borderDecimal = 0.15;

vu$6.image.brightnessDetector.canvas = document.createElement("canvas");
vu$6.image.brightnessDetector.canvasContext = vu$6.image.brightnessDetector.canvas.getContext("2d", { willReadFrequently: true });
vu$6.image.brightnessDetector.canvasResize = document.createElement("canvas");
vu$6.image.brightnessDetector.canvasResizeContext = vu$6.image.brightnessDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu$6.image.brightnessDetector.isBright = function(img) {
    vu$6.image.brightnessDetector.canvas.width = 10;
    vu$6.image.brightnessDetector.canvas.height = 10;
    vu$6.image.brightnessDetector.canvasContext.drawImage(img,0,0, 10, 10);

    let imageData = vu$6.image.brightnessDetector.canvasContext.getImageData(0,0,10,10);
    let data = imageData.data;
    var r,g,b,avg;
    var colorSum = 0;
    let lab;
    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        lab = vu$6.image.rgb2lab([r,g,b]);
        //avg = Math.floor((r+g+b)/3);
        avg = Math.floor(lab[0]);
        colorSum += avg;
    }

    let result = Math.floor(colorSum / (10*10));
    //console.log('isBright score', result, '- time:', new Date().getTime() - startTime.getTime())
    if (vu$6.image.brightnessDetector.minResult > result) {
        return [false, result];
    } else {
        return [true, result];
    }
};

vu$6.image.brightnessDetector.isBrightAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.brightnessDetector.isBright(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

vu$6.image.brightnessDetector.thisAreaIsBright = function(img, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    let borderHorizontal = Math.round(box[2] * vu$6.image.brightnessDetector.borderDecimal);
    let borderVertical =  Math.round(box[3] * vu$6.image.brightnessDetector.borderDecimal);

    vu$6.image.brightnessDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu$6.image.brightnessDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu$6.image.brightnessDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu$6.image.brightnessDetector.isBright(vu$6.image.brightnessDetector.canvasResize);
};

vu$6.image.brightnessDetector.thisAreaIsBrightAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.brightnessDetector.thisAreaIsBright(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu$6.image.blurDetector == "undefined") { vu$6.image.blurDetector = function() {}; }

vu$6.image.blurDetector.minResult = 0.65;  // More is more blur
vu$6.image.blurDetector.borderDecimal = 0.15;
vu$6.image.blurDetector.resize = 128;

vu$6.image.blurDetector.canvas = document.createElement("canvas");
vu$6.image.blurDetector.canvasContext = vu$6.image.blurDetector.canvas.getContext("2d", { willReadFrequently: true });
vu$6.image.blurDetector.canvasResize = document.createElement("canvas");
vu$6.image.blurDetector.canvasResizeContext = vu$6.image.blurDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu$6.image.blurDetector.isBlurry = function(img) {
    let resize = vu$6.image.blurDetector.resize;
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

    vu$6.image.blurDetector.canvas.width = width;
    vu$6.image.blurDetector.canvas.height = height;
    vu$6.image.blurDetector.canvasContext.drawImage(img, 0,0,width,height);

    let blurValue = measureBlur(vu$6.image.blurDetector.canvas.getContext('2d').getImageData(0, 0, width, height)).avg_edge_width_perc;
    //console.log('isBlurry score', blurValue, '- time:', new Date().getTime() - startTime.getTime())
    if (vu$6.image.blurDetector.minResult > blurValue) {
        return [false, blurValue]
    } else {
        return [true, blurValue]
    }
};

vu$6.image.blurDetector.isBlurryAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.blurDetector.isBlurry(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

vu$6.image.blurDetector.thisAreaIsBlurry = function(img, box) {
    let borderHorizontal = Math.round(box[2] * vu$6.image.blurDetector.borderDecimal);
    let borderVertical =  Math.round(box[3] * vu$6.image.blurDetector.borderDecimal);

    vu$6.image.blurDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu$6.image.blurDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu$6.image.blurDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu$6.image.blurDetector.isBlurry(vu$6.image.blurDetector.canvasResize);
};

vu$6.image.blurDetector.thisAreaIsBlurryAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.blurDetector.thisAreaIsBlurry(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ------------------------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------------------------ //
// https://github.com/timhuff/canvas-phash/blob/master/index.js

if (typeof vu$6.image.phash == "undefined") { vu$6.image.phash = function() {}; }

vu$6.image.phash.canvas = document.createElement("canvas");
vu$6.image.phash.canvasContext = vu$6.image.phash.canvas.getContext("2d", { willReadFrequently: true });
//document.getElementById('debug').appendChild(vu.image.phash.canvas);

vu$6.image.phash.getHammingDistance = function (buffer1, buffer2) {
    let hammingDistance = 0;
    for (let n = 0; n < 128; n++) {
        const x = buffer1.readUInt8(n);
        const y = buffer2.readUInt8(n);
        hammingDistance += vu$6.image.phash.bitCount(x ^ y);
    }
    return hammingDistance;
};

vu$6.image.phash.bitCount = function (n) {
    let count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
};


// Función auxiliar para convertir un hash binario a hexadecimal
vu$6.image.phash.binaryToHex =  function(binary) {
    let hex = '';
    for (let i = 0; i < binary.length; i += 4) {
        const chunk = binary.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
};

// Función auxiliar para convertir un hash hexadecimal a binario
vu$6.image.phash.hexToBinary = function(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        // Convertir cada carácter hexadecimal a 4 bits binarios
        const chunk = parseInt(hex[i], 16).toString(2).padStart(4, '0');
        binary += chunk;
    }
    return binary;
};

vu$6.image.phash.calculate = function(canvas) {
    vu$6.image.phash.canvasContext;

    // Paso 1: Reducir la imagen a 8x8 píxeles
    const size = 16;
    const resizedCanvas = vu$6.image.phash.canvas;
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
    const hexHash = vu$6.image.phash.binaryToHex(hash);

    return hexHash;
};

vu$6.image.phash.calculateAsync = function(canvas) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.phash.calculate(canvas) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// --------------------------------------------
// Area
vu$6.image.phash.canvasResize = document.createElement("canvas");
vu$6.image.phash.canvasResizeContext = vu$6.image.phash.canvasResize.getContext("2d", { willReadFrequently: true });

vu$6.image.phash.calculateThisArea = function(canvas, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    vu$6.image.phash.canvasResize.width = box[2];
    vu$6.image.phash.canvasResize.height = box[3];
    vu$6.image.phash.canvasResizeContext.drawImage(canvas, -(box[0]), -(box[1]));
    return vu$6.image.phash.calculate(vu$6.image.phash.canvasResize);
};

vu$6.image.phash.calculateThisAreaAsync = function(canvas, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.phash.calculateThisArea(canvas, box))
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// --------------------------------------------
// Center

vu$6.image.phash.canvasPreprocess = document.createElement("canvas");
vu$6.image.phash.canvasPreprocessContext = vu$6.image.phash.canvasPreprocess.getContext("2d", { willReadFrequently: true });
//document.getElementById('debug').appendChild(vu.image.phash.canvasPreprocess);

/*
Una funcion en javascript que resiba como input un canvas y un float de 0 a 1 llamado borde.
La funcion transforma una imagen rectangular en un cuadrado centrado, luego del cuadrado recorta un margen porcentual basado en el float de borde.
retorna un canvas que contiene la imagen recortada. la funcion en ingles.
*/
vu$6.image.phash.preprocessCenter = function (canvas, border = 0.1) {
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
  vu$6.image.phash.canvasPreprocess.width = finalSize;
  vu$6.image.phash.canvasPreprocess.height = finalSize;

  // Draw the centered and cropped image onto the result canvas
  vu$6.image.phash.canvasPreprocessContext.drawImage(
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

  return vu$6.image.phash.canvasPreprocess;
};

vu$6.image.phash.preprocessCenterObfuscated = function (canvas, border = [0.1, 0.1]) {
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

  vu$6.image.phash.canvasPreprocess.width = width;
  vu$6.image.phash.canvasPreprocess.height = height;
  vu$6.image.phash.canvasPreprocessContext.drawImage(canvas, 0, 0, width, height);  // Source dimensions

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
  vu$6.image.phash.canvasPreprocessContext.fillStyle = 'black';
  vu$6.image.phash.canvasPreprocessContext.fillRect(x, y, rectWidth, rectHeight);

  return vu$6.image.phash.canvasPreprocess;
};

vu$6.image.phash.calculatePreprocessed = function(canvas, preprocessed, border) {
    if (preprocessed === 'center') {
        vu$6.image.phash.preprocessCenter(canvas, border);
    } else if (preprocessed === 'centerObfuscated') {
        vu$6.image.phash.preprocessCenterObfuscated(canvas, border);
    }
    return vu$6.image.phash.calculate(vu$6.image.phash.canvasPreprocess);
};

vu$6.image.phash.calculatePreprocessedAsync = function(canvas, preprocess = 'center', border = 0.1) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu$6.image.phash.calculatePreprocessed(canvas, preprocess, border))
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
};

// ----------------------------------------------------------------------------------------------------------------- //
vu$6.image.phash.compare = function (hash1, hash2) {
    // Convertir los hashes hexadecimales a binario
    const binary1 = vu$6.image.phash.hexToBinary(hash1);
    const binary2 = vu$6.image.phash.hexToBinary(hash2);

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


vu$6.image.phash.detectOutliersInSelfies = async function (configuredLevel, selfieList) {
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
        const hash = vu$6.image.phash.calculate(canvas);
        hashes.push(hash);
        console.log(`[pHash] Hash ${i}:`, hash);
    }

    for (let i = 0; i < hashes.length; i++) {
        for (let j = i + 1; j < hashes.length; j++) {
            const distance = vu$6.image.phash.compare(hashes[i], hashes[j]);
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
vu$6.image.channelInversion = vu$6.image.channelInversion || {};

/**
 * Crops a uniform margin around an image canvas
 * @param {HTMLCanvasElement} canvas - Canvas containing the image
 * @param {number} marginPercentage - Percentage of the image size to crop as margin
 * @returns {ImageData} The cropped image data
 */
vu$6.image.channelInversion.cropMargin = function (canvas, marginPercentage) {
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
vu$6.image.channelInversion.detect = async function (base64Image, options = {}) {
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
                const croppedImageData = vu$6.image.channelInversion.cropMargin(canvas, margin);
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
vu$6.image.channelInversion.bgrToRgb = async function (base64Image, outputFormat = 'base64') {
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
var vuImage = vu$6.image;

/*
    TODO - Hay algo que bloquea el tread de UI, hay que encontrarlo y solucionarlo, se nota en celulares.

 */

// Reference the existing vu object
const vu$5 = window.vu || {};
vu$5.sop = vu$5.sop || {};
vu$5.sop.document = vu$5.sop.document || {};
vu$5.sop.document.objectDetection = vu$5.sop.document.objectDetection || {};

vu$5.sop.document.objectDetection.minConfidence = 0.75;
vu$5.sop.document.objectDetection.maxNumBoxes = 1;
vu$5.sop.document.objectDetection.modelURL = 'js/models/documents/model.json';
vu$5.sop.document.objectDetection.labels = ['document'];

//------------------------------------------------------

vu$5.sop.document.objectDetection.model;

vu$5.sop.document.objectDetection.calculateMaxScores = async function(scores,
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

vu$5.sop.document.objectDetection.buildDetectedObjects = async function(width,
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
        results.push([vu$5.sop.document.objectDetection.labels[classes[indexes]], bbox, scores[indexes]]);
    }
    return results
};


vu$5.sop.document.objectDetection.loadModel = async function(tfPath) {
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
    if (!vu$5.sop.document.objectDetection.model) {
        console.log("Loading Model");
        vu$5.sop.document.objectDetection.model = tf.GraphModel;
        vu$5.sop.document.objectDetection.model = await tf.loadGraphModel(vu$5.sop.document.objectDetection.modelURL);
        console.log("Finished");
        return vu$5.sop.document.objectDetection.model
    } else {
        return vu$5.sop.document.objectDetection.model
    }
};

vu$5.sop.document.objectDetection.predictCanvas = document.createElement('canvas');
vu$5.sop.document.objectDetection.predictCanvasContext = vu$5.sop.document.objectDetection.predictCanvas.getContext('2d');


vu$5.sop.document.objectDetection.predictAsync = async function(video){
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
    let inference = await vu$5.sop.document.objectDetection.model.executeAsync(tensor);
    //console.log('executeAsync - Time', new Date().getTime() - start.getTime(), 'ms - shape ', tensor.shape)

    let prevBackend = tf.getBackend();
    tf.setBackend('cpu');
    let scores = await inference[0].data();
    let boxes = await inference[1].data();

    let [maxScores, classes] = await vu$5.sop.document.objectDetection.calculateMaxScores(scores, inference[0].shape[1], inference[0].shape[2]);
    //------------------------------------------------------------------
    let boxes2 = tf.tensor2d(boxes, [inference[1].shape[1], inference[1].shape[3]]);
    let indexTensor = await tf.image.nonMaxSuppressionAsync(boxes2, maxScores, vu$5.sop.document.objectDetection.maxNumBoxes, 0.5, vu$5.sop.document.objectDetection.minConfidence);

    let indexes = await indexTensor.data();
    let result = await vu$5.sop.document.objectDetection.buildDetectedObjects(width, height, boxes, maxScores, indexes, classes, scale);
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

var vuSopDocumentObjectDetection = vu$5.sop.document.objectDetection;

//import vuCamera from 'vu.camera'; //

// Reference the existing vu object
const vu$4 = window.vu || {};
vu$4.sop = vu$4.sop || {};
vu$4.sop.ui = vuSopUi;

vu$4.sop.document = vu$4.sop.document || {};
vu$4.sop.document.objectDetection = vuSopDocumentObjectDetection;
vu$4.sop.document.ui = vu$4.sop.document.ui || {};
vu$4.image = vuImage;
//vu.camera = vuCamera;
vu$4.sop.msg = vu$4.sop.msg || {};
vu$4.sop.audio = vu$4.sop.audio || {};

vu$4.sop.document.ui.sleepTime = 250;
vu$4.sop.document.ui.side = 'front';
//vu.sop.document.ui.feedbackTime = 100;
vu$4.sop.document.ui.photoTime = 3000;

vu$4.sop.document.ui.checkPictureQuality = true;

vu$4.sop.document.ui.previewBox = false; // WIP

vu$4.sop.document.ui.canvas = false;
vu$4.sop.document.ui.canvasContext = false;

/* ------------------------------------------------------ */

let moduleCamera$1 = null;
vu$4.sop.document.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");

    // Proceed to use vu.sop safely
    vu$4.sop.msg = window.vu.sop.msg || {};
    vu$4.sop.audio = window.vu.sop.audio || {};
    moduleCamera$1 = camera;
};

vu$4.sop.document.ui.setLimits = function() {
    if (moduleCamera$1.isVerticalVideo) {
        // Vertical Video
        vu$4.sop.document.ui.percentualLimitsActive = [[0,25],[0,100],[50,100],[0,100]];    // [left, top, width, height]
    } else {
        // Horizontal Video
        vu$4.sop.document.ui.percentualLimitsActive = [[0,35],[0,35],[65,100],[65,100]];    // [left, top, width, height]
    }
};


/* ------------------------------------------------------ */

vu$4.sop.document.ui.bg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?>'+
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 500" style="enable-background:new 0 0 750 500;" xml:space="preserve">' +
    '<style type="text/css">.st0{fill:'+color+';}</style>' +
    '<g id="Layer_1">' +
    '<path class="st0" ' +
    'd="M 20,172 V 44 C 20,30.7 30.7,20 44,20 h 128 c 6.6,0 8,1.4 8,8 v 8 c 0,6.6 -1.40149,7.859606 -8,8 H 44 v 128 c 0,6.6 -1.4,8 -8,8 h -8 c -6.6,0 -8,-1.4 -8,-8 z M 566,28 v 8 c 0,6.6 1.40149,7.859606 8,8 h 128 v 128 c 0,6.6 1.4,8 8,8 h 8 c 6.6,0 8,-1.4 8,-8 V 44 C 726,30.7 715.3,20 702,20 H 574 c -6.6,0 -8,1.4 -8,8 z m 152,290 h -8 c -6.6,0 -7.88622,1.40098 -8,8 V 454 H 574 c -6.6,0 -8,1.4 -8,8 v 8 c 0,6.6 1.4,8 8,8 h 128 c 13.3,0 24,-10.7 24,-24 V 326 c 0,-6.6 -1.4,-8 -8,-8 z M 180,470 v -8 c 0,-6.6 -1.40149,-7.85961 -8,-8 H 44 V 326 c 0,-6.6 -1.4,-8 -8,-8 h -8 c -6.6,0 -8,1.4 -8,8 v 128 c 0,13.3 10.7,24 24,24 h 128 c 6.6,0 8,-1.4 8,-8 z"' +
    '/></g>' +
    '</svg>') +"')"};

vu$4.sop.document.ui.bgStyle2 = function(color, bgcolor, bgopacity) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?>'+
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1500 1000" style="enable-background:new 0 0 1500 1000;" xml:space="preserve">' +
    '<style type="text/css">.st0{fill:'+color+';}</style>' +
    '<g id="Layer_1">' +
    '<path style="fill:'+bgcolor+';fill-opacity:'+bgopacity+';stroke-width:0.9443655;stroke:none" d="M -1.4140625 0.39453125 L -1.4140625 997.41406 L 1501.8945 997.41406 L 1501.8945 0.39453125 L -1.4140625 0.39453125 z M 380.31055 250.4043 L 1118.4434 250.4043 L 1118.4434 737.82812 L 380.31055 737.82812 L 380.31055 250.4043 z " id="rect15" />' +
    '<path id="path4-3-7" d="M 967.39775,244.00234 H 1102.348 c 13.3,0 22,8.7 22,22 v 135.46437 c 0,2.50362 -1.1556,2.53563 -2.1845,2.53563 h -5.4203 c -1.1442,0 -2.3952,-0.11832 -2.3952,-2.53562 V 268.23025 c 0,-6.75719 -4.8888,-14.22791 -14.1409,-14.22791 H 967.39775 c -3.42204,0 -3.02947,-1.40568 -3.04975,-3.43494 l -0.0331,-3.31268 c -0.01,-0.99461 -0.37229,-3.25238 3.08285,-3.25238 z" 	class="st0" />' +
    '<path id="path4-3" d="M 531.28045,744.1099 H 396.33021 c -13.3,0 -22,-8.70005 -22,-22.00005 V 586.64548 c 0,-2.50362 1.15559,-2.53563 2.18451,-2.53563 h 5.42031 c 1.14417,0 2.39518,0.11832 2.39518,2.53562 v 133.23647 c 0,8.56318 4.8888,14.22791 14.14087,14.22791 h 132.80937 c 3.42204,0 3.02947,1.40568 3.04975,3.43494 l 0.0331,3.31268 c 0.01,0.99461 0.37229,3.25243 -3.08285,3.25243 z" class="st0" />' +
    '<path id="path4-6" d="M 1124.2972,587.08425 V 722.0345 c 0,13.3 -8.7,22 -22,22 H 966.83283 c -2.50362,0 -2.53563,-1.15559 -2.53563,-2.1845 v -5.42032 c 0,-1.14417 0.11832,-2.39518 2.53562,-2.39518 h 133.23648 c 8.6133,0 14.2279,-4.8888 14.2279,-14.14086 V 587.08425 c 0,-3.42204 1.4057,-3.02947 3.4349,-3.04975 l 3.3127,-0.0331 c 0.9946,-0.01 3.2524,-0.37229 3.2524,3.08285 z" class="st0" />' +
    '<path id="path4" d="M 374.32294,400.94162 V 265.99137 c 0,-13.3 8.7,-22 22,-22 h 135.46437 c 2.50362,0 2.53563,1.15559 2.53563,2.18451 v 5.42031 c 0,1.14417 -0.11832,2.39518 -2.53562,2.39518 H 398.55085 c -7.72945,-0.0884 -14.22791,4.8888 -14.22791,14.14087 v 132.80938 c 0,3.42204 -1.40567,3.02947 -3.43494,3.04975 l -3.31267,0.0331 c -0.99461,0.01 -3.25239,0.37229 -3.25239,-3.08285 z" class="st0" />' +
    '</g></svg>') +"')"};

vu$4.sop.document.ui.bgActive = vu$4.sop.document.ui.bg('#1DC600');
vu$4.sop.document.ui.bgSmall = vu$4.sop.document.ui.bg('#3B83C6');
vu$4.sop.document.ui.bgInactive = vu$4.sop.document.ui.bg('#212529');

vu$4.sop.document.ui.setBgStyle2 = function(colorActive, colorSmall, colorInactive, bgColor, bgOpacity) {
    console.log("Document BackGround Style 2");
    vu$4.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background');

    vu$4.sop.document.ui.bgActive = vu$4.sop.document.ui.bgStyle2(colorActive, bgColor, bgOpacity);
    vu$4.sop.document.ui.bgSmall = vu$4.sop.document.ui.bgStyle2(colorSmall, bgColor, bgOpacity);
    vu$4.sop.document.ui.bgInactive = vu$4.sop.document.ui.bgStyle2(colorInactive, bgColor, bgOpacity);

    vu$4.sop.document.ui.bgElement.style.backgroundSize = '160%';
    vu$4.sop.document.ui.bgElement.style.backgroundPosition = '50% 49%';

    vu$4.sop.ui.bottomTextNoOverlay();
    vu$4.sop.ui.bottomTextObserver.observe(document.getElementById('vu.sop.ui.bottomText'));
};

/* ------------------------------------------------------ */

vu$4.sop.document.ui.resolve;
vu$4.sop.document.ui.reject;
vu$4.sop.document.ui.results = [];
vu$4.sop.document.ui.resultsTime = [];
vu$4.sop.document.ui.doLoop = false;

vu$4.sop.document.ui.start = async function(side) {
    vu$4.sop.document.ui.setLimits();
    vu$4.sop.document.ui.box = document.getElementById('vu.sop.document.ui.box');
    vu$4.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background');
    vu$4.sop.document.ui.bgElement.style.backgroundImage = vu$4.sop.document.ui.bgInactive;

    vu$4.sop.document.ui.canvas = document.createElement('canvas');
    vu$4.sop.document.ui.canvasContext = vu$4.sop.document.ui.canvas.getContext("2d", { willReadFrequently: true });

    await vu$4.sop.ui.show("vu.sop.document.ui.background");
    vu$4.sop.document.ui.side = side;
    if (side == "front"){
        //vu.sop.audio.play(vu.sop.audio.addFrontDocumentBottomMsg)
        vu$4.sop.ui.showBottomText(vu$4.sop.msg.addFrontDocumentBottomMsg);
    } else {
        vu$4.sop.audio.play('vu.sop.audio.addBackDocumentBottomMsg');
        vu$4.sop.ui.showBottomText(vu$4.sop.msg.addBackDocumentBottomMsg);
    }

    vu$4.sop.document.ui.results = [];
    vu$4.sop.document.ui.resultsTime = [];

    let promise = new Promise(function (resolve, reject) {
        vu$4.sop.document.ui.resolve = resolve;
        vu$4.sop.document.ui.reject = reject;
    });

    vu$4.sop.document.ui.loop(side);
    return promise
};

vu$4.sop.document.ui.loop = async function(promise) {
    // console.log("vu.sop.document.ui.loop", moduleCamera.video);         
    if(moduleCamera$1.video == null)
        return;
    
    vu$4.sop.document.ui.doLoop = true;

    let picture = null;
    let loopStartTime = new Date();
    let vWidth = moduleCamera$1.video.videoWidth;
    let vHeight = moduleCamera$1.video.videoHeight;
    let result;
    let box;
    vu$4.sop.ui.debug.info.push(['Video width', vWidth + 'px']);
    vu$4.sop.ui.debug.info.push(['Video height', vHeight + 'px']);
    vu$4.sop.ui.debug.info.push(['Video offsetWidth', moduleCamera$1.video.offsetWidth + 'px']);
    vu$4.sop.ui.debug.info.push(['Video offsetHeight', moduleCamera$1.video.offsetHeight + 'px']);
    vu$4.sop.ui.debug.info.push(['Video Center', '<span style="font-weight: bolder; color: darkblue;">POINT</span>']);
    vu$4.sop.ui.debug.info.push(['Document Center', '<span style="font-weight: bolder; color: #1DC600;">POINT</span>']);
    let boxConfidence;
    try {
        let boxStartTime = new Date();
        box = await vu$4.sop.document.objectDetection.predictAsync(moduleCamera$1.video);
        
        vu$4.sop.ui.debug.perf.push(['Doc Box', new Date().getTime() - boxStartTime.getTime() +'ms']);

        if (box && typeof box[0] !== 'undefined') {
            if (vu$4.sop.document.ui.previewBox) { vu$4.sop.document.ui.drawBox(box); }
            boxConfidence = Math.round(box[0][2]*100);
            result = vu$4.sop.document.ui.calculateResult(box[0][0], box[0][1], vWidth, vHeight);

            // Feedback
            if (result === "active") {
                vu$4.sop.document.ui.bgElement.style.backgroundImage = vu$4.sop.document.ui.bgActive;
            } else if (result === "small") {
                vu$4.sop.document.ui.bgElement.style.backgroundImage = vu$4.sop.document.ui.bgSmall;
            } else {
                vu$4.sop.document.ui.bgElement.style.backgroundImage = vu$4.sop.document.ui.bgInactive;
            }
            //
        } else {
            vu$4.sop.document.ui.bgElement.style.backgroundImage = vu$4.sop.document.ui.bgInactive;
            vu$4.sop.document.ui.box.style.display = 'none';
        }
    } catch (e) {
        console.log("e", e);
        result = 'inactive';
    }

    //console.log(result)

    let timeNow = Date.now();
    vu$4.sop.document.ui.results.push(result);
    vu$4.sop.document.ui.resultsTime.push(timeNow);

    // clean old results - TODO hacerlo por tiempo, no por contador.
    if (vu$4.sop.document.ui.results.length  >  200){
        vu$4.sop.document.ui.results.shift();
        vu$4.sop.document.ui.resultsTime.shift();
    }

    if (vu$4.sop.document.ui.results.length  >  3){
        let startPhotoIndex = false;
        for (let i = 0; i < vu$4.sop.document.ui.results.length; i++) {
            let time = vu$4.sop.document.ui.resultsTime[vu$4.sop.document.ui.results.length - i];
            if ( startPhotoIndex === false && timeNow >= ( time + vu$4.sop.document.ui.photoTime)) {
                startPhotoIndex = vu$4.sop.document.ui.results.length - i;
            }
        }
        // Feedback

        // Photo
        let takePhoto = true;
        for (let i = startPhotoIndex; i < vu$4.sop.document.ui.results.length; i++) {
            result = vu$4.sop.document.ui.results[i];
            if ( result !== "active" && takePhoto === true) {
                takePhoto = false;
            }
        }
        /* Picture Quality */
        let imageQualityIsOK = true;
        if (vu$4.sop.document.ui.checkPictureQuality) {
            if (box && typeof box[0] !== 'undefined') {
                let borderDecimal = 0.1;
                let borderHorizontal = Math.round(box[0][1][2] * borderDecimal);
                let borderVertical = Math.round(box[0][1][3] * borderDecimal);
                vu$4.sop.document.ui.height = box[0][1][3] - (borderVertical * 2);
                vu$4.sop.document.ui.width = box[0][1][2] - (borderHorizontal * 2);

                let horizontalCenterOffset = Math.round((vu$4.sop.document.ui.height - box[0][1][2]) / 4);
                let verticalCenterOffset = Math.round((vu$4.sop.document.ui.width - box[0][1][3]) / 4);
                vu$4.sop.document.ui.canvasContext.drawImage(moduleCamera$1.video,
                    -(box[0][1][0] + borderHorizontal - horizontalCenterOffset),
                    -(box[0][1][1] + borderVertical - verticalCenterOffset)
                );
                /* Blur y Brillo */
                vu$4.image.blurDetector.resize = 320;
                vu$4.image.blurDetector.minResult = 1.4;
                vu$4.image.brightnessDetector.minResult = 30;

                let isBrightStartTime = new Date();
                let isBright = vu$4.image.brightnessDetector.isBrightAsync(vu$4.sop.document.ui.canvas);
                let isBlurryStartTime = new Date();
                let isBlurry = vu$4.image.blurDetector.isBlurryAsync(vu$4.sop.document.ui.canvas);
                let hasABrightSpotStartTime = new Date();
                let hasABrightSpot = vu$4.image.brigthSpotDetector.hasABrightSpot(vu$4.sop.document.ui.canvas);


                isBright = await isBright;
                vu$4.sop.ui.debug.perf.push(['isBright', new Date().getTime() - isBrightStartTime.getTime() +'ms']);
                isBlurry = await isBlurry;
                vu$4.sop.ui.debug.perf.push(['isBlurry', new Date().getTime() - isBlurryStartTime.getTime() +'ms']);
                hasABrightSpot = await hasABrightSpot;
                vu$4.sop.ui.debug.perf.push(['hasABrightSpot', new Date().getTime() - hasABrightSpotStartTime.getTime() +'ms']);


                // Validacion de tamano del documento
                let documentSizeMin = 0.65;
                let documentSizeMax = 0.95;
                let documentSize = 'ok';
                let documentSizeAlert = false;
                if ((box[0][1][2] / moduleCamera$1.video.videoWidth) < documentSizeMin) {
                    documentSize = 'small';
                    documentSizeAlert = true;
                }
                if ((box[0][1][2] / moduleCamera$1.video.videoWidth) > documentSizeMax) {
                    documentSize = 'big';
                    documentSizeAlert = true;
                }
                // Validacion de rostro centrado
                let documentCenterX = box[0][1][0] + (box[0][1][2]/2);
                let documentCenterY = box[0][1][1] + (box[0][1][3]/2);
                let videoCenterX = moduleCamera$1.video.videoWidth/2;
                let videoCenterY = moduleCamera$1.video.videoHeight/2;
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
                if (vu$4.sop.ui.debug.enable) {
                    vu$4.sop.ui.debug.eval.push(['Doc confidence', boxConfidence +"%", 'white']);
                    if (isBright[0]) {color = '#1DC600';} else { color = 'red';}
                    vu$4.sop.ui.debug.eval.push(['Doc is bright', hasABrightSpot[0], color]);
                    vu$4.sop.ui.debug.eval.push(['Doc is bright val', hasABrightSpot[1], color]);
                    vu$4.sop.ui.debug.eval.push(['Doc is bright min', vu$4.image.brightnessDetector.minResult, 'white']);

                    if (!hasABrightSpot[0]) {color = '#1DC600';} else { color = 'red';}
                    vu$4.sop.ui.debug.eval.push(['Doc has bright spot', hasABrightSpot[0], color]);
                    vu$4.sop.ui.debug.eval.push(['Doc has bright spot val', hasABrightSpot[1], color]);

                    if (isBlurry[0]) {color = 'red';} else { color = '#1DC600';}
                    vu$4.sop.ui.debug.eval.push(['Doc blurry', isBlurry[0], color]);
                    vu$4.sop.ui.debug.eval.push(['Doc blurry val', isBlurry[1].toFixed(2), color]);
                    vu$4.sop.ui.debug.eval.push(['Doc blurry max', vu$4.image.blurDetector.minResult, 'white']);

                    if (documentSizeAlert) { color = 'red';} else { color = '#1DC600';}
                    vu$4.sop.ui.debug.eval.push(['Doc size', box[0][1][2] + "px", color]);
                    vu$4.sop.ui.debug.eval.push(['Doc size', Math.round((box[0][1][2] / moduleCamera$1.video.videoWidth)*100) + "%", color]);
                    vu$4.sop.ui.debug.eval.push(['Doc min size', Math.round(documentSizeMin*100) + '%', 'white']);
                    vu$4.sop.ui.debug.eval.push(['Doc max size', Math.round(documentSizeMax*100) + '%', 'white']);

                    if (documentCenterVerticalAlert) { color = 'red';} else { color = '#1DC600';}
                    vu$4.sop.ui.debug.eval.push(['Doc Y Distance', Math.round(Math.abs(documentCenterY - videoCenterY)) + 'px', color]);
                    vu$4.sop.ui.debug.eval.push(['Doc Y Max', Math.round((videoCenterY * maxDistanceFromTheCenter)) + 'px', 'white']);

                    if (documentCenterHorizontalAlert) { color = 'red';} else { color = '#1DC600';}
                    vu$4.sop.ui.debug.eval.push(['Doc X Distance', Math.round(Math.abs(documentCenterX - videoCenterX)) + 'px', color]);
                    vu$4.sop.ui.debug.eval.push(['Doc X Max', Math.round((videoCenterX * maxDistanceFromTheCenter)) + 'px', 'white']);

                    if (documentSize !== 'ok') { color = 'red';} else { color = '#1DC600';}
                    vu$4.sop.ui.debug.eval.push(['Doc Result  ', documentSize, color]);
                    vu$4.sop.document.ui.drawBox(box);

                }

                // Face Size (ok - big - small)
                if (moduleCamera$1.video.videoWidth < 1080 && window.innerHeight > window.innerWidth){
                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.rotateScreen);
                    imageQualityIsOK = false;
                }
                if (documentSize == 'big'){
                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.documentClose);
                    imageQualityIsOK = false;
                }
                if (documentSize == 'small'){
                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.documentAway);
                    imageQualityIsOK = false;
                }
                if (documentSize == 'notCentered'){
                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.documentNotCentered);
                    imageQualityIsOK = false;
                }
                // is Bright
                if (isBright[0] == false){
                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.darkDocument);
                    imageQualityIsOK = false;
                }
                // Is blurry
                if (isBlurry[0] == true){

                    if(vu$4.sop.enableTelemetry){
                        vu$4.telemetry.addEvent("DocumentActivityProcess", "end", {"isBlurry" : true} );
                    }

                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.blurryDocument);
                    imageQualityIsOK = false;
                }
                // Doc is bright spot
                if (hasABrightSpot[0] == true){
                    vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.documentHasABrightSpot);
                    imageQualityIsOK = false;
                }
            } else {
                vu$4.sop.ui.showBottomTextAlert(vu$4.sop.msg.documentNotCentered);
                imageQualityIsOK = false;
            }
        }
        if (imageQualityIsOK) {
            vu$4.sop.ui.hideBottomTextAlert();
        } else {
            takePhoto = false;
        }
        if (vu$4.sop.ui.debug.enable) {
            vu$4.sop.ui.debug.perf.push(['Loop', new Date().getTime() - loopStartTime.getTime() +'ms']);
            vu$4.sop.ui.debugDraw();
            vu$4.sop.ui.drawVideoCenter();
            if (vu$4.sop.ui.debug.hangDocumentScreen) {
                takePhoto = false;
            }
        } else {
            vu$4.sop.ui.cleanResults();
        }
        /* ------------------ */
        if (takePhoto) {
            vu$4.sop.audio.play('vu.sop.audio.audioBeep');
            vu$4.sop.document.ui.doLoop = false;

            vu$4.sop.ui.flash();
            picture = await moduleCamera$1.takePicture();

            // Clean and hide bottomTextAlert
            await vu$4.sop.ui.cleanAndHideBottomTextAlert();

            // Clean Up
            //vu.sop.ui.showBottomText('')
            await vu$4.sop.ui.hide("vu.sop.document.ui.background");

            // Resolve Promise
            vu$4.sop.document.ui.resolve(picture);
            return;
        }
    } else {
        vu$4.sop.ui.cleanResults();
    }

    // Continuar loopeando
    setTimeout(function () {
        if(vu$4.sop.document.ui.doLoop == true)
        {
            vu$4.sop.document.ui.loop(promise);
        }
        
    }, 10);
};


vu$4.sop.document.ui.calculateResult = function(label, box, videoWidth, videoHeight) {
    let boxPercentualLeft = Math.round((box[0]*100)/videoWidth);
    let boxPercentualTop = Math.round((box[1]*100)/videoHeight);
    let boxPercentualWidth = Math.round((box[2]*100)/videoWidth);
    let boxPercentualHeight = Math.round((box[3]*100)/videoHeight);

    //console.log(box)
    //console.log(boxPercentualLeft,boxPercentualTop,boxPercentualWidth,boxPercentualHeight)

    if ( boxPercentualLeft > vu$4.sop.document.ui.percentualLimitsActive[0][0] &&
         boxPercentualLeft < vu$4.sop.document.ui.percentualLimitsActive[0][1] &&
         boxPercentualTop > vu$4.sop.document.ui.percentualLimitsActive[1][0] &&
         boxPercentualTop < vu$4.sop.document.ui.percentualLimitsActive[1][1] &&
         boxPercentualWidth > vu$4.sop.document.ui.percentualLimitsActive[2][0] &&
         boxPercentualWidth < vu$4.sop.document.ui.percentualLimitsActive[2][1] &&
         boxPercentualHeight > vu$4.sop.document.ui.percentualLimitsActive[3][0] &&
         boxPercentualHeight < vu$4.sop.document.ui.percentualLimitsActive[3][1]
    ) {
        return 'active';
    }
    return 'inactive';
};

/* ------------------------------------------------------ */

vu$4.sop.document.ui.box = document.getElementById('vu.sop.document.ui.box');
vu$4.sop.document.ui.boxCenterPoint = document.getElementById('vu.sop.ui.debugElementCenter');
vu$4.sop.document.ui.videoContainer = document.getElementById('vu.sop.ui.videoContainer');

vu$4.sop.document.ui.drawBox = function(predictResults) {
    let scale = moduleCamera$1.video.offsetHeight / moduleCamera$1.video.videoHeight;
    try {
        let bbox = predictResults[0][1];
        if (bbox[0] < 1) {
            bbox[0] = 1;
        }
        if (bbox[1] < 1) {
            bbox[1] = 1;
        }
        if (bbox[2] > moduleCamera$1.video.videoWidth) {
            bbox[2] = moduleCamera$1.video.videoWidth;
        }
        if (bbox[3] > moduleCamera$1.video.videoHeight) {
            bbox[3] = moduleCamera$1.video.videoHeight;
        }
        let bleft = bbox[0] * scale;
        let btop = bbox[1] * scale;
        let bwidth = bbox[2] * scale;
        let bheight = bbox[3] * scale;

        let fixX = Math.round((moduleCamera$1.video.offsetWidth - vu$4.sop.document.ui.videoContainer.offsetWidth)/2);
        let fixY = Math.round((moduleCamera$1.video.offsetHeight - vu$4.sop.document.ui.videoContainer.offsetHeight)/2);

        vu$4.sop.document.ui.boxCenterPoint.style.right    = Math.round((bleft + (bwidth / 2)) - fixX) - 5 + "px";
        vu$4.sop.document.ui.boxCenterPoint.style.top = Math.round((btop + (bheight / 2)) - fixY) - 5 + "px";
        vu$4.sop.document.ui.boxCenterPoint.style.display = 'block';

        vu$4.sop.document.ui.box.style.right = bleft - fixX + "px";
        vu$4.sop.document.ui.box.style.top = btop - fixY + "px";
        vu$4.sop.document.ui.box.style.width = bwidth + "px";
        vu$4.sop.document.ui.box.style.height = bheight + "px";
        vu$4.sop.document.ui.box.style.display = 'block';
    }

    catch(error) {
        vu$4.sop.document.ui.box.style.display = 'none';
    }
};

vu$4.sop.document.ui;

// Reference the existing vu object
const vu$3 = window.vu || {};
vu$3.screen = vu$3.screen || {};
vu$3.screen = vu$3.screen || {};
vu$3.screen.capture = vu$3.screen.capture || {};
//vu.camera = vu.camera || {};
vu$3.sop = vu$3.sop || {};
vu$3.sop.screenRecorder = vu$3.sop.screenRecorder || {};
vu$3.sop.document = vu$3.sop.document || {};
//vu.sop.document.ui = vu.sop.document.ui || {};

let moduleCamera = null;

vu$3.screen.capture.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");

    moduleCamera = camera;    
    vu$3.sop.screenRecorder = window.vu.sop.screenRecorder || {};
    vu$3.sop.steps = window.vu.sop.steps || {};
    vu$3.sop.document = window.vu.sop.document || {};
    vu$3.face = window.vu.face;
};


vu$3.screen.capture.style = 'videoOnly';
vu$3.screen.capture.vidWidth = 640;
vu$3.screen.capture.vidHeight = 480;
vu$3.screen.capture.frameRate = 5;

/******************************************************************************************************************/
// https://github.com/TrevorSundberg/h264-mp4-encoder
vu$3.screen.capture.doCaptureLoop = false;
vu$3.screen.capture.doRecordLoop = false;
vu$3.screen.capture.videoEncoder = false;

// Elements
//vu.screen.capture.canvas = document.getElementById("previewCanvas")
vu$3.screen.capture.canvas = document.createElement('canvas');
vu$3.screen.capture.baseDiv = document.getElementById("vu.sop");
vu$3.screen.capture.canvasContext = vu$3.screen.capture.canvas.getContext('2d');
vu$3.screen.capture.canvasVideo = document.createElement('canvas');
vu$3.screen.capture.canvasVideoContext = vu$3.screen.capture.canvasVideo.getContext('2d');
vu$3.screen.capture.imgTransform = document.createElement('img');

vu$3.screen.capture.videoElement = document.getElementById("vu.sop.ui.video");
vu$3.screen.capture.bottomTextElement = document.getElementById("vu.sop.ui.bottomText");
vu$3.screen.capture.bottomTextAlertElement = document.getElementById("vu.sop.ui.bottomTextAlert");
vu$3.screen.capture.faceOverlayElement = document.getElementById("vu.face.ui.gestures.circle");
vu$3.screen.capture.documentOverlayElement = document.getElementById("vu.sop.document.ui.background");


vu$3.screen.capture.recordVideoStart = async function() {
    // TODO Agregar data-html2canvas-ignore a los nodos que correspondan (optimizacion)
    let vidWidth;
    let vidHeight;
    if (vu$3.screen.capture.style === 'videoOnly') {
        vidWidth = vu$3.screen.capture.vidWidth;
        vidHeight = vu$3.screen.capture.vidHeight;
    } else {
        vidWidth = window.getComputedStyle(vu$3.screen.capture.baseDiv, null).getPropertyValue('max-width').split('px')[0];
        vidHeight = window.getComputedStyle(vu$3.screen.capture.baseDiv, null).getPropertyValue('max-height').split('px')[0];
        vidWidth = 2 * Math.round(vidWidth/2);
        vidHeight = 2 * Math.round(vidHeight/2);
    }
    console.log("Start Recording - video Width " + vidWidth + "px Height " + vidHeight + "px");

    vu$3.screen.capture.videoEncoder = await HME.createH264MP4Encoder();
    vu$3.screen.capture.videoEncoder.frameRate = vu$3.screen.capture.frameRate;
    vu$3.screen.capture.videoEncoder.width = vidWidth;
    vu$3.screen.capture.videoEncoder.height = vidHeight;
    vu$3.screen.capture.videoEncoder.quantizationParameter = 20;      // Video Quality
    vu$3.screen.capture.videoEncoder.groupOfPictures = 10;            // Keyframe
    //vu.screen.capture.videoEncoder.temporalDenoise = true;          // Use temporal noise supression.
    //vu.screen.capture.videoEncoder.speed = 5                        // Speed where 0 means best quality and 10 means fastest speed [0..10].
    vu$3.screen.capture.videoEncoder.initialize();

    vu$3.screen.capture.canvas.width = vidWidth;
    vu$3.screen.capture.canvas.height = vidHeight;
    await vu$3.screen.capture.getFrame();
    vu$3.screen.capture.videoEncoder.addFrameRgba(vu$3.screen.capture.canvasContext.getImageData(0, 0,
        vu$3.screen.capture.canvas.width, vu$3.screen.capture.canvas.height).data);
    vu$3.screen.capture.doCaptureLoop = true;
    vu$3.screen.capture.doRecordLoop = true;

    vu$3.screen.capture.captureLoop();
    vu$3.screen.capture.recordLoop();

};

vu$3.screen.capture.recordVideoStop = async function() {
    vu$3.screen.capture.doCaptureLoop = false;
    vu$3.screen.capture.doRecordLoop = false;

    vu$3.screen.capture.videoEncoder.finalize();
    const uint8Array = vu$3.screen.capture.videoEncoder.FS.readFile(vu$3.screen.capture.videoEncoder.outputFilename);

    const video = new Blob([uint8Array], { type: "video/mp4" });
    let response;
    console.log("vu.sop.screenRecorder.sendVideo", vu$3.sop.screenRecorder.sendVideo);
    console.log("vu.face.auth.screenRecorder.sendVideo", vu$3.face.auth.screenRecorder.sendVideo);
    if( vu$3.sop.screenRecorder.sendVideo === true) {
        response = await vu$3.sop.steps.addVideoResolve(video);
    }
    else if ( vu$3.face.auth.screenRecorder.sendVideo === true ) 
    {
        response = await vu$3.face.auth.addVideoResolve(video);
    }
    else
        {
        vu$3.screen.capture.recordVideoStopAndDownload();
    }

    vu$3.screen.capture.videoEncoder.delete();
    return response
};

vu$3.screen.capture.recordVideoStopAndDownload = async function() {
    const uint8Array = await vu$3.screen.capture.recordVideoStop();

    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: "video/mp4" }));
    anchor.download = "download";
    anchor.click();
};

vu$3.screen.capture.recordLoop = async function() {
    try {
        vu$3.screen.capture.videoEncoder.addFrameRgba(vu$3.screen.capture.canvasContext.getImageData(0, 0,
            vu$3.screen.capture.canvas.width, vu$3.screen.capture.canvas.height).data);
    } catch (error) {
        //console.log(error)
    }
    let timePerFrame = 1000 / vu$3.screen.capture.frameRate;
    if (vu$3.screen.capture.doRecordLoop == true) {
        setTimeout(function () {
            if(vu$3.screen.capture.doRecordLoop == true)    
            {
                vu$3.screen.capture.recordLoop();
            }        
            
        }, timePerFrame);
    }
};

vu$3.screen.capture.captureLoop = async function() {
    let timeStart = new Date();
    await vu$3.screen.capture.getFrame();
    let timeEnd = new Date().getTime() - timeStart.getTime();
    let timePerFrame = 1000 / vu$3.screen.capture.frameRate;
    let loopWaitingTime;
    if ( timeEnd >= timePerFrame) {
        loopWaitingTime = 1;
    } else {
        loopWaitingTime = timePerFrame - timeEnd;
    }
    if (vu$3.screen.capture.doCaptureLoop == true) {
        setTimeout(function () {
            if (vu$3.screen.capture.doCaptureLoop == true)
            {
                vu$3.screen.capture.captureLoop();
            }            
        }, loopWaitingTime);
    }
};

vu$3.screen.capture.baseDivPath = false;
vu$3.screen.capture.getFrame = async function() {
    //start = new Date();
    if (vu$3.screen.capture.style === 'videoOnly') {
        // videoOnly
        // Dibujar el fondo negro
        vu$3.screen.capture.canvasContext.fillStyle = "black";
        vu$3.screen.capture.canvasContext.fillRect(0, 0, vu$3.screen.capture.canvas.width, vu$3.screen.capture.canvas.height);
        // Captura de video
        let scale;
        if (moduleCamera.isVerticalVideo()) {
            scale = moduleCamera.video.videoHeight/vu$3.screen.capture.vidHeight;
        } else {
            scale = moduleCamera.video.videoWidth/vu$3.screen.capture.vidWidth;
        }
        let framePosition = {};
        framePosition.width = Math.round(moduleCamera.video.videoWidth/scale);
        framePosition.height = Math.round(moduleCamera.video.videoHeight/scale);
        framePosition.left = Math.round((vu$3.screen.capture.vidWidth-framePosition.width)/2);
        framePosition.top = Math.round((vu$3.screen.capture.vidHeight-framePosition.height)/2);

        vu$3.screen.capture.canvasContext.drawImage(moduleCamera.video,
                                                    framePosition.left, framePosition.top,
                                                    framePosition.width, framePosition.height);

    } else {
        // Experimental
        if (vu$3.screen.capture.baseDivPath === false ) {
            vu$3.screen.capture.baseDivPath = vu$3.screen.capture.getDomPath(vu$3.screen.capture.baseDiv);
        }
        if (vu$3.face.ui.gestures.loop === true)
        {
            await vu$3.screen.capture.getVideoFrame();
        } else if (typeof vu$3.sop.document !== 'undefined' && vu$3.sop.document.ui.doLoop === true) {
            await vu$3.screen.capture.getVideoFrame();
        } else {
            let canvas = await html2canvas(vu$3.screen.capture.baseDiv, {
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
            vu$3.screen.capture.canvasContext.fillStyle = "black";
            vu$3.screen.capture.canvasContext.fillRect(0, 0, vu$3.screen.capture.canvas.width, vu$3.screen.capture.canvas.height);
            // Obtener canvas de pantalla
            vu$3.screen.capture.canvasContext.drawImage(canvas,
                0, 0,
                vu$3.screen.capture.baseDiv.offsetWidth, vu$3.screen.capture.baseDiv.offsetHeight);
        }
    }
    //console.log('screenshot Time', new Date().getTime() - start.getTime(), 'ms ', captureType)
    return vu$3.screen.capture.canvas
};

vu$3.screen.capture.getVideoFrame = async function() {
    vu$3.screen.capture.videoElement = document.getElementById("vu.sop.ui.video");
    vu$3.screen.capture.bottomTextElement = document.getElementById("vu.sop.ui.bottomText");
    vu$3.screen.capture.faceOverlayElement = document.getElementById("vu.face.ui.gestures.circle");
    vu$3.screen.capture.documentOverlayElement = document.getElementById("vu.sop.document.ui.background");
    vu$3.screen.capture.bottomTextAlertElement = document.getElementById("vu.sop.ui.bottomTextAlert");
    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar el fondo negro
    vu$3.screen.capture.canvasContext.fillStyle = "black";
    vu$3.screen.capture.canvasContext.fillRect(0, 0, vu$3.screen.capture.canvas.width, vu$3.screen.capture.canvas.height);
    // Dibujar el fondo (captura de video)
    let framePosition = vu$3.screen.capture.getPositionRelative(vu$3.screen.capture.videoElement);
    vu$3.screen.capture.canvasVideo.width = vu$3.screen.capture.baseDiv.offsetWidth;
    vu$3.screen.capture.canvasVideo.height = vu$3.screen.capture.baseDiv.offsetHeight;
    vu$3.screen.capture.canvasVideoContext.translate(vu$3.screen.capture.canvasVideo.width, 0);       // Flip Image
    vu$3.screen.capture.canvasVideoContext.scale(-1, 1);                                       // Flip Image
    vu$3.screen.capture.canvasVideoContext.drawImage(moduleCamera.video,
                                                framePosition.left, framePosition.top,
                                                framePosition.width, framePosition.height);

    vu$3.screen.capture.canvasContext.drawImage(vu$3.screen.capture.canvasVideo, 0, 0);
    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar Face Overlay
    let overlayElement;
    if (vu$3.face.ui.gestures.loop){
        overlayElement = vu$3.screen.capture.faceOverlayElement;
        vu$3.screen.capture.imgTransform.src = vu$3.screen.capture.faceOverlayElement.style.backgroundImage.split('"')[1];
    } else {
        overlayElement = vu$3.screen.capture.documentOverlayElement;
        vu$3.screen.capture.imgTransform.src = vu$3.screen.capture.documentOverlayElement.style.backgroundImage.split('"')[1];
    }
    let overlayPosition = vu$3.screen.capture.getPositionRelative(overlayElement);

    let backgroundSize = window.getComputedStyle( overlayElement, null ).getPropertyValue( 'background-size' );
    if (backgroundSize.includes("%") ) {
        let size = ( backgroundSize.split("%")[0] / 100);
        overlayPosition.left = Math.round(overlayPosition.left - (((overlayPosition.width * size) - overlayPosition.width)/2));
        overlayPosition.top  = Math.round(overlayPosition.top - (((overlayPosition.height * size) - overlayPosition.height)/2));
        overlayPosition.width = Math.round(overlayPosition.width * size);
        overlayPosition.height = Math.round(overlayPosition.height * size);
    }

    vu$3.screen.capture.canvasContext.drawImage(vu$3.screen.capture.imgTransform,
                                            overlayPosition.left, overlayPosition.top,
                                            overlayPosition.width, overlayPosition.height);

    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar subtitulo
    vu$3.screen.capture.canvasContext.fillStyle = vu$3.screen.capture.bottomTextElement.style.backgroundColor;
    let subPosition = vu$3.screen.capture.getPositionRelative(vu$3.screen.capture.bottomTextElement);
    vu$3.screen.capture.canvasContext.fillRect(subPosition.left, subPosition.top,
                                             subPosition.width, subPosition.height);

    let fontSize = vu$3.screen.capture.bottomTextElement.style.fontSize;
    let fontFamily = window.getComputedStyle( vu$3.screen.capture.bottomTextElement, null ).getPropertyValue( 'font-family' );
    let fontColor = window.getComputedStyle( vu$3.screen.capture.bottomTextElement, null ).getPropertyValue( 'color' );
    let fontWeight = window.getComputedStyle( vu$3.screen.capture.bottomTextElement, null ).getPropertyValue( 'font-weight' );

    vu$3.screen.capture.canvasContext.textAlign = 'center';
    vu$3.screen.capture.canvasContext.fillStyle = fontColor;
    vu$3.screen.capture.canvasContext.font =  "normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily;
    vu$3.screen.capture.canvasContext.textBaseline = 'middle';

    //console.log("normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily)

    vu$3.screen.capture.canvasContext.fillText(vu$3.screen.capture.bottomTextElement.textContent,
        subPosition.left + Math.round(vu$3.screen.capture.bottomTextElement.offsetWidth/2),
        subPosition.top + Math.round(vu$3.screen.capture.bottomTextElement.offsetHeight/2));

    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar Alerta
    if (vu$3.screen.capture.bottomTextAlertElement.style.display !== "none") {
        let alertPosition = vu$3.screen.capture.getPositionRelative(vu$3.screen.capture.bottomTextAlertElement);

        let x = alertPosition.left;
        let y = alertPosition.top;
        let width = alertPosition.width;
        let height = alertPosition.height;
        let radius = window.getComputedStyle( vu$3.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'border-radius' ).split('px')[0];

        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        vu$3.screen.capture.canvasContext.beginPath();
        vu$3.screen.capture.canvasContext.moveTo(x + radius, y);
        vu$3.screen.capture.canvasContext.arcTo(x + width, y, x + width, y + height, radius);
        vu$3.screen.capture.canvasContext.arcTo(x + width, y + height, x, y + height, radius);
        vu$3.screen.capture.canvasContext.arcTo(x, y + height, x, y, radius);
        vu$3.screen.capture.canvasContext.arcTo(x, y, x + width, y, radius);
        vu$3.screen.capture.canvasContext.closePath();

        vu$3.screen.capture.canvasContext.fillStyle = "black";
        vu$3.screen.capture.canvasContext.fill();

        fontSize = vu$3.screen.capture.bottomTextAlertElement.style.fontSize;
        fontFamily = window.getComputedStyle( vu$3.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'font-family' );
        fontColor = window.getComputedStyle( vu$3.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'color' );
        fontWeight = window.getComputedStyle( vu$3.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'font-weight' );

        vu$3.screen.capture.canvasContext.textAlign = 'center';
        vu$3.screen.capture.canvasContext.fillStyle = fontColor;
        vu$3.screen.capture.canvasContext.font =  "normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily;
        vu$3.screen.capture.canvasContext.textBaseline = 'middle';
        vu$3.screen.capture.canvasContext.fillText(vu$3.screen.capture.bottomTextAlertElement.textContent,
            alertPosition.left + Math.round(vu$3.screen.capture.bottomTextAlertElement.offsetWidth/2),
            alertPosition.top + Math.round(vu$3.screen.capture.bottomTextAlertElement.offsetHeight/2));

    }
    //-----------------------------------------------------------------------------------------------------------------

    return vu$3.screen.capture.canvas
    //console.log('screenshot Time', new Date().getTime() - start.getTime(), 'ms')
};

vu$3.screen.capture.getPositionRelative = function(element) {
    let y = vu$3.screen.capture.baseDiv.getBoundingClientRect().top + window.scrollY;
    let x = vu$3.screen.capture.baseDiv.getBoundingClientRect().left + window.scrollX;

    return {
        top: Math.round((element.getBoundingClientRect().top + window.scrollY) - y),
        left: Math.round((element.getBoundingClientRect().left + window.scrollX) - x),
        height: element.offsetHeight,
        width: element.offsetWidth
    }
};


vu$3.screen.capture.getDomPath = function(el) {
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


var vuScreenCapture = vu$3.screen.capture;

// Reference the existing vu object
const vu$2 = window.vu || {};
vu$2.sop = vu$2.sop || {};
vu$2.sop.face = vu$2.sop.face || {};
vu$2.sop.face.objectDetectionAndRotation = vu$2.sop.face.objectDetectionAndRotation || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.face == "undefined") { vu.sop.face = function() {} }

// if (typeof vu.sop.face.objectDetectionAndRotation == "undefined") { vu.sop.face.objectDetectionAndRotation = function() {} }

vu$2.sop.face.objectDetectionAndRotation.minConfidence = 0.75;
vu$2.sop.face.objectDetectionAndRotation.maxNumBoxes = 1;
vu$2.sop.face.objectDetectionAndRotation.modelURL = '';
vu$2.sop.face.objectDetectionAndRotation.labels = ['rot0','rot90','rot180','rot270'];

//------------------------------------------------------

vu$2.sop.face.objectDetectionAndRotation.model;

vu$2.sop.face.objectDetectionAndRotation.calculateMaxScores = async function(scores,
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

vu$2.sop.face.objectDetectionAndRotation.buildDetectedObjects = async function(width,
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
        results.push([vu$2.sop.face.objectDetectionAndRotation.labels[classes[indexes]], bbox, scores[indexes]]);
    }
    return results
};


vu$2.sop.face.objectDetectionAndRotation.loadModel = async function(basePath, tfPath) {
    // Big Model (F16)
    //vu.sop.face.objectDetectionAndRotation.modelURL = basePath + '/models/face-location-and-rotation/b16/model.json';
    // Little Model (uint8)
    vu$2.sop.face.objectDetectionAndRotation.modelURL = basePath + '/models/face-location-and-rotation/model.json';
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
    if (!vu$2.sop.face.objectDetectionAndRotation.model) {
        //console.log("Loading - Face Object Detection Model")
        var start = new Date();
        vu$2.sop.face.objectDetectionAndRotation.model = tf.GraphModel;
        vu$2.sop.face.objectDetectionAndRotation.model = await tf.loadGraphModel(vu$2.sop.face.objectDetectionAndRotation.modelURL);
        let netTime = new Date().getTime() - start.getTime();

        console.log("Loaded - Face Object Detection Model - Network Time " + netTime + "ms");
        return vu$2.sop.face.objectDetectionAndRotation.model
    } else {
        return vu$2.sop.face.objectDetectionAndRotation.model
    }
};

vu$2.sop.face.objectDetectionAndRotation.predictAsync = async function(video){

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
    let inference = await vu$2.sop.face.objectDetectionAndRotation.model.executeAsync(tensor);
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

    let [maxScores, classes] = await vu$2.sop.face.objectDetectionAndRotation.calculateMaxScores(
        scores,
        inference[scores_idx].shape[1],
        inference[scores_idx].shape[2]
    );
    //------------------------------------------------------------------
    let boxes2 = tf.tensor2d(boxes, [inference[boxes_idx].shape[1], inference[boxes_idx].shape[3]]);
    let indexTensor = await tf.image.nonMaxSuppressionAsync(boxes2, maxScores, vu$2.sop.face.objectDetectionAndRotation.maxNumBoxes, 0.5, vu$2.sop.face.objectDetectionAndRotation.minConfidence);

    let indexes = await indexTensor.data();
    let result = await vu$2.sop.face.objectDetectionAndRotation.buildDetectedObjects(width, height, boxes, maxScores, indexes, classes, scale);
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

var vuSopFaceObjectDetectionAndRotation = vu$2.sop.face.objectDetectionAndRotation;

// Reference the existing vu object
const vu$1 = window.vu || {};
vu$1.sop = vu$1.sop || {};
vu$1.sop.ui = vu$1.sop.ui || {};
vu$1.sop.ui.debug = vu$1.sop.ui.debug|| {};
vu$1.sop.face = vu$1.sop.face || {};
vu$1.sop.face.model = vu$1.sop.face.model || {};
vu$1.sop.face.model.directionsAndGestures = vu$1.sop.face.model.directionsAndGestures || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.face == "undefined") { vu.sop.face = function() {} }

// if (typeof vu.sop.face.model == "undefined") { vu.sop.face.model = function() {} }

// if (typeof vu.sop.face.model.directionsAndGestures == "undefined") { vu.sop.face.model.directionsAndGestures = function() {} }

vu$1.sop.face.model.directionsAndGestures.modelURL = '';
vu$1.sop.face.model.directionsAndGestures.modelHeight = 224;
vu$1.sop.face.model.directionsAndGestures.modelWidth = 224;
vu$1.sop.face.model.directionsAndGestures.labels = ['closed_eyes', 'face_looking_down', 'face_looking_left', 'face_looking_right', 'face_looking_up', 'face_neutral', 'open_mouth', 'smile'];

//------------------------------------------------------

vu$1.sop.face.model.directionsAndGestures.model;


vu$1.sop.face.model.directionsAndGestures.loadModel = async function(basePath, tfPath) {
    //console.log(basePath)
    vu$1.sop.face.model.directionsAndGestures.modelURL = basePath + '/models/face-directions-gestures/model.json';
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
    if (!vu$1.sop.face.model.directionsAndGestures.model) {
        //console.log("Loading - Face Directions Model")
        var start = new Date();
        vu$1.sop.face.model.directionsAndGestures.model = tf.GraphModel;
        vu$1.sop.face.model.directionsAndGestures.model = await tf.loadGraphModel(vu$1.sop.face.model.directionsAndGestures.modelURL);
        let netTime = new Date().getTime() - start.getTime();
        var start = new Date();
        vu$1.sop.face.model.directionsAndGestures.model.predict(tf.zeros([ 1,
                                                            vu$1.sop.face.model.directionsAndGestures.modelHeight,
                                                            vu$1.sop.face.model.directionsAndGestures.modelWidth, 3]));
        let warmUpTime = new Date().getTime() - start.getTime();
        console.log("Loaded - Face Directions Model - Network Time " + netTime + "ms - Warm Up Time " + warmUpTime +"ms");
        return vu$1.sop.face.model.directionsAndGestures.model
    } else {
        return vu$1.sop.face.model.directionsAndGestures.model
    }
};

vu$1.sop.face.model.directionsAndGestures.predictAsync = async function(image){

    // Execute model prediction outside of tidy
    let img, resized, batched, logits, resultsWLabels;

    try {
        // Process image inside tidy (synchronous operations)
        const processedTensors = tf.tidy(() => {
            img = tf.browser.fromPixels(image);
            resized = tf.image.resizeBilinear(img, [
                vu$1.sop.face.model.directionsAndGestures.modelHeight,
                vu$1.sop.face.model.directionsAndGestures.modelWidth
            ]);

            batched = tf.reshape(resized, [
                -1,
                vu$1.sop.face.model.directionsAndGestures.modelHeight,
                vu$1.sop.face.model.directionsAndGestures.modelWidth,
                3
            ]);

            return batched; // Return the tensor we need outside tidy
        });

        // Execute model (async operation) outside tidy
        logits = vu$1.sop.face.model.directionsAndGestures.model.execute(processedTensors);
        const results = await logits.data(); // Get the data asynchronously

        // Process results
        let processedResults = {};
        let i = 0;
        vu$1.sop.face.model.directionsAndGestures.labels.forEach(element => {
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

var vuSopFaceModelDirectionsAndGestures = vu$1.sop.face.model.directionsAndGestures;

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
const vu = window.vu || {};
vu.face = vu.face || {};
vu.face.auth = vu.face.auth || {};
vu.face.auth.api = vu.face.auth.api || {};
vu.face.auth.gestures = vu.face.auth.gestures || {};
vu.sop = vu.sop || {};
vu.sop.audio = vu.sop.audio || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu.sop.audio = Object.assign(vu.sop.audio, vuSopAudio);

vu.sop.ui = vuSopUi;
vu.sop.preaudio = {};
//vu.sop.steps = {};
vu.sop.msg = {};
vu.extras = vuExtras;
vu.error = vuError;
//vu.camera = vuCamera;

vu.sop.face = {};
vu.sop.face.objectDetectionAndRotation = vuSopFaceObjectDetectionAndRotation;
vu.sop.face.model = {};
vu.sop.face.model.directionsAndGestures = vuSopFaceModelDirectionsAndGestures;

vu.image = vuImage;
vu.screen = {};
vu.screen.capture = vuScreenCapture;

//vu.face.ui = vuFaceUi;
vu.face.ui = {};
vu.face.ui.gestures = {};
//vu.face.audio = Object.assign(vu.sop.audio, vu.face.audio);

vu.face.auth.audio = {};
vu.face.auth.audio.enabled = true;

vu.face.auth.screenRecorder = {};

// Private variables - not exposed directly
let authGesturesAllChallenges = ['smile', 'lookLeft', 'lookRight', 'eyeClose'];
let authGesturesNumOfChallenges = 3;
let authGesturesConf = [['smile', 30], ['bothEyesClosed', 40]];

// Secure setter function for gestures configuration
vu.face.auth.gestures.setChallenges = function(challenges) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getChallenges = function() {
    return authGesturesAllChallenges;
};

// Secure setter function for number of challenges configuration
vu.face.auth.gestures.setNumOfChallenges = function(num) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getNumOfChallenges = function() {
    return authGesturesNumOfChallenges;
};

// Secure setter function for gesture configuration
vu.face.auth.setGestureConf = function(conf) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.getGestureConf = function() {
    return authGesturesConf;
};

// Private variables for gesture feedback and validation configuration - not exposed directly
let authResultsFeedbackTimeFrame = 1000;
let authResultsValidateTimeFrame = 4000;
let authResultsFeedbackPercentual = 60;
let authResultsValidatePercentual = 30;
let authResultsValidateMinTimeFrame = 2000;

// Public setter function to configure results feedback time frame (security: only accepts first configuration until release)
vu.face.auth.gestures.setResultsFeedbackTimeFrame = function(timeFrame) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getResultsFeedbackTimeFrame = function() {
    return authResultsFeedbackTimeFrame;
};

// Public setter function to configure results validate time frame (security: only accepts first configuration until release)
vu.face.auth.gestures.setResultsValidateTimeFrame = function(timeFrame) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getResultsValidateTimeFrame = function() {
    return authResultsValidateTimeFrame;
};

// Public setter function to configure results feedback percentual (security: only accepts first configuration until release)
vu.face.auth.gestures.setResultsFeedbackPercentual = function(percentage) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getResultsFeedbackPercentual = function() {
    return authResultsFeedbackPercentual;
};

// Public setter function to configure results validate percentual (security: only accepts first configuration until release)
vu.face.auth.gestures.setResultsValidatePercentual = function(percentage) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getResultsValidatePercentual = function() {
    return authResultsValidatePercentual;
};

// Public setter function to configure results validate minimum time frame (security: only accepts first configuration until release)
vu.face.auth.gestures.setResultsValidateMinTimeFrame = function(timeFrame) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
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
vu.face.auth.gestures.getResultsValidateMinTimeFrame = function() {
    return authResultsValidateMinTimeFrame;
};

// Integrators must use vu.face.auth.gestures.setChallenges(), vu.face.auth.gestures.setNumOfChallenges(), vu.face.auth.setGestureConf() 
// and the new gesture feedback configuration setters above
// These setters work for both vuFace and vuIDCard integrations and prevent cross-module configuration contamination

let faceStatsKey;

vu.face.auth.setFaceStatsKey = function (key) {
    // Prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) ||
        (vu.sop && vu.sop.initialized)) {
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

vu.face.auth.getFaceStatsKey = function () {
    return faceStatsKey;
};



let agentStatsEnabled = false;

vu.face.auth.setAgentStatsEnabled = function (enabled) {
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

vu.face.auth.getAgentStatsEnabled = function () {
    return agentStatsEnabled;
};


vu.face.auth.userNameValue = null;

vu.face.auth.lang  = 'es';
vu.face.auth.warmUpFaceModelAsync = false;
vu.face.auth.faceOrientationModelWeights = 'BEST';        // VERYLIGHT LIGHT NORMAL BEST

vu.face.auth.useHighResolutionSettingsInPCCamera = false;
vu.face.auth.useHighResolutionSettingsInMobileCamera = false;
vu.face.auth.registrationFlow = false;
vu.face.auth.enableSelfieList = true;
vu.face.auth.framesAnalysis = true;
vu.face.auth.framesAnalysisLevel = "medium"; // low, medium, high
vu.face.auth.loginFlag = false;
vu.face.auth.basePath = '';

vu.face.auth.loadJsAttempts = 3;

vu.face.auth.initialized = false;
vu.face.auth.techStack = "plainweb";

vu.face.auth.frameConsistencyMax = 24;
vu.face.auth.frameConsistencyEnabled = true;

vu.face.auth.recordProcess = false;

let captureEnabled;

vu.face.auth.initialize = async function (basePath, techStack) {
    await loadSuspiciousCameraKeywords();
    const { active, fp } = await getXstats();
    captureEnabled = active;

    if(fp && vu.face.auth.getAgentStatsEnabled())
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
                username: vu.face.auth.userNameValue,
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

    vu.face.auth.basePath = basePath;

    if(vu.face.auth.audio.enabled)
        vu.sop.audio.enabled = true;
    else
        vu.sop.audio.enabled = false;  

    try {
        let htmlLoad;

        htmlLoad = await vu.extras.loadFile(basePath, "html", "face.html", techStack)
            .then(content => {
                htmlLoad = content;
                document.getElementById('vu.sop').innerHTML = htmlLoad;

                createLoadingImg();
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });       
            
        

        //let webRTCadapter = vu.face.auth.loadJs(basePath + '/js/libs/webrtc/adapter-latest.js');
        let webRTCadapter = await vu.extras.loadScript(basePath, techStack, "libs/webrtc", "adapter-latest.js", "adapter");

        /* Pre conf */
        // if (vu.face.auth.challengeType === 'true') {
        //     //vu.face.nncPath = basePath + '/js/libs/face/'
        //     fileName = "";
        // } else 
        
        if (vu.face.auth.challengeType == 'mixed') {
            // let tfJsLoad = vu.face.auth.loadJs(basePath + '/js/libs/tensorflowjs/3.11.0/tf.min.js');
            // await tfJsLoad;
            // let tfJsWasmLoad = vu.face.auth.loadJs(basePath + '/js/libs/tensorflowjs/3.11.0/tf-backend-wasm.min.js');
            // await tfJsWasmLoad;

            let tfJsLoad = await vu.extras.loadScript(basePath, techStack, "libs/tensorflowjs/4.22.0", "tf.min.js", "tf");
            let tfJsWasmLoad = await vu.extras.loadScript(basePath, techStack, "libs/tensorflowjs/4.22.0", "tf-backend-wasm.min.js", "tf.wasm");
    
            vu.sop.tfPath = basePath + "/libs/tensorflowjs/4.22.0/";

            vu.face.auth.useHighResolutionSettingsInPCCamera = true;
            vu.face.auth.useHighResolutionSettingsInMobileCamera = true;
        } 
        else {
            console.log('Challenge orientation model', vu.face.auth.faceOrientationModelWeights);
            if (vu.face.auth.faceOrientationModelWeights === 'VERYLIGHT') {
                fileName = "NN_VERYLIGHT_0.json";
            } else if (vu.face.auth.faceOrientationModelWeights === 'LIGHT') {
                fileName = "NN_DEFAULT.json";
            } else if (vu.face.auth.faceOrientationModelWeights === 'NORMAL') {
                fileName = "NN_LIGHT_0.json";
            } else {
                fileName = "NN_WIDEANGLES_0.json";
            }
        }

        folder = 'libs/face';

        if(fileName)
            vu.face.nncPath = basePath + "/" + folder + "/" + fileName;
        else
            vu.face.nncPath = basePath + "/" + folder + "/";

        window.vu.face.nncPath = vu.face.nncPath;
        
        let loadAudioLang;
        let audioLangLoad;

        if (vu.face.auth.audio.enabled === false) {
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
            let lang = vu.face.auth.lang.charAt(0).toUpperCase() + vu.face.auth.lang.slice(1);


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



        //let msgs = vu.face.auth.loadJs(basePath + '/js/vu.sop.msg.' + vu.face.auth.lang + '.js');
        let msgsLanguage = "vu.sop.msg."+ vu.face.auth.lang +".js";
        let msgs = await vu.extras.loadScript(basePath, techStack, "", msgsLanguage, "vu.sop.msg");
        vu.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu.sop.msg || {});


        //let errors = vu.face.auth.loadJs(basePath + '/js/vu.error.js');
        let errors =  vu.error;

        //let audioLoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.audio.js');
        //let cameraLoad = vu.face.auth.loadJs(basePath + '/js/vu.camera.js');
        let cameraLoad =  vuCamera;
        //window.vu.camera = vuCamera;

        //let blurDetectionLoad = vu.face.auth.loadJs(basePath + '/js/libs/inspector-bokeh/dist/measure_blur.js');
        let blurDetectionLoad =  await vu.extras.loadScript(basePath, techStack, "libs/inspector-bokeh/dist", "measure_blur.js", "measureBlur");

        //let sopUILoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.ui.js');
        let sopUILoad =  vu.sop.ui;

        //let apiLoad = vu.face.auth.loadJs(basePath + '/js/vu.sop.api.js');
        let apiLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.auth.api.js", "vu.face.auth.api");  
        vu.face.auth.api = Object.assign({}, window.vu.face.auth.api || {}, vu.face.auth.api || {});

        //let faceUiLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.ui.js');
        //let imageLib = vu.face.auth.loadJs(basePath + '/js/vu.image.js');
        let imageLib =  vu.image; 
        window.vu.image = vu.image;

        //let screenCapture = vu.face.auth.loadJs(basePath + '/js/vu.screen.capture.js');
        let screenCapture =  vu.screen.capture; 

        //let h264 = vu.face.auth.loadJs(basePath + '/js/libs/h264-mp4-encoder/h264-mp4-encoder.web.js');
        let h264 =  await vu.extras.loadScript(basePath, techStack, "libs/h264-mp4-encoder", "h264-mp4-encoder.web.js", "HME"); 
        let htm2canvas = await vu.extras.loadScript(basePath, techStack, "libs/html2canvas", "html2canvas.min.js", "html2canvas");
        //let htm2canvas = await vu.extras.loadScript(basePath, techStack, "libs/html2canvas", "html2canvas.min.js", "html2canvas");

        let faceLoad;
        let faceUiGesturesLoad;
        let faceLibLoad;
        let faceObjectDetection;
        let faceDirectionGesturesDetection;
        let faceMixedChallengeUi;

        console.log("vu.face.auth.challengeType", vu.face.auth.challengeType);
        // if (vu.face.auth.challengeType === true) {
        //     console.log('Loading challenge gestures')
        //     // faceLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.gestures.js');
        //     // faceUiGesturesLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.ui.gestures.js');
        //     // faceLibLoad = vu.face.auth.loadJs(basePath + '/js/libs/face/jeelizFaceTransfer.js');
        //     faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.gestures.js", "vu.face");
        //     faceUiGesturesLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.ui.gestures.js", "vu.face.ui.gestures"); 
        //     faceLibLoad = await vu.extras.loadScript(basePath, techStack, "libs/face", "jeelizFaceTransfer.js", "JEEFACETRANSFERAPI");             
        // } else 
        if (vu.face.auth.challengeType == 'mixed') {
            console.log('Loading mixedChallenge mode');
            // faceLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.mixedChallenge.js');
            // faceObjectDetection = vu.face.auth.loadJs(basePath + '/js/vu.sop.face.objectDetectionAndRotation.js');
            // faceDirectionGesturesDetection = vu.face.auth.loadJs(basePath + '/js/vu.sop.face.model.directionsAndGestures.js');
            // faceMixedChallengeUi = vu.face.auth.loadJs(basePath + '/js/vu.face.ui.mixedChallenge.js');

            faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.mixedChallenge.js", "vu.face");
            faceObjectDetection =  vu.sop.face.objectDetectionAndRotation;            
            faceDirectionGesturesDetection =  vu.sop.face.model.directionsAndGestures;            
            faceUiGesturesLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.ui.mixedChallenge.js", "vu.face.ui.gestures"); 

            window.vu.sop.face = window.vu.sop.face || {};  // Ensure `face` exists
            window.vu.sop.face.model = window.vu.sop.face.model || {};  // Ensure `model` exists
            
            window.vu.sop.face.objectDetectionAndRotation = vu.sop.face.objectDetectionAndRotation;
            window.vu.sop.face.model.directionsAndGestures = vu.sop.face.model.directionsAndGestures;            
        } else {
            console.log('Loading challenge orientation');
            // faceLoad = vu.face.auth.loadJs(basePath + '/js/vu.face.orientation.js');
            // faceLibLoad = vu.face.auth.loadJs(basePath + '/js/libs/face/jeelizFaceFilter.js');

            faceLoad =  await vu.extras.loadScript(basePath, techStack, "", "vu.face.orientation.js", "vu.face");
            faceLibLoad = await vu.extras.loadScript(basePath, techStack, "libs/face", "jeelizFaceFilter.js", "JEEFACEFILTERAPI");            
        }

        let persistentFaceAuth = vu.face.auth;

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
        vu.face.auth = persistentFaceAuth;     

        let faceUiLoad =  vu.face.ui;
        //let faceUiGesturesLoad =  vu.sop.loadJs(basePath + '/js/vu.face.ui.gestures.js');
        let faceAuth =  vu.face.auth;        

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
        if (vu.face.auth.challengeType == 'mixed') {
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

        document.getElementById('vu.sop.ui.userName').placeholder = vu.sop.msg.userInputPlaceholder;
        document.getElementById('vu.sop.ui.userNameSendBtn').innerHTML = vu.sop.msg.userSendBtn;

        vu.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");
        //await vu.face.auth.createLoadingImg();

        // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
        // console.log("vu.face.auth.audio.enabled", vu.face.auth.audio.enabled);

  
        
        window.vu.face = vu.face;
        window.vu.face.auth.api = vu.face.auth.api;
        window.vu.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu.sop.msg || {});
        // console.log("vu.sop.audio", vu.sop.audio);
        // console.log("window.vu.sop.audio", window.vu.sop.audio);

        // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
        // console.log("window.vu.sop.audio.enabled", window.vu.sop.audio.enabled);        
        
        window.vu.sop.audio = Object.assign({}, window.vu.sop.audio || {}, vu.sop.audio || {});   
        window.vu.sop.audio.enabled = vu.sop.audio.enabled;

        // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
        // console.log("window.vu.sop.audio.enabled", window.vu.sop.audio.enabled);

        // console.log("vu.sop.audio", vu.sop.audio);
        // console.log("window.vu.sop.audio", window.vu.sop.audio);

        window.vu.sop.ui = vu.sop.ui;   
        window.vu.sop.audioPreloaded = vu.sop.audioPreloaded;

        // Mixed
        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setChallenges === 'function') 
            vu.face.ui.gestures.setChallenges(vu.face.auth.gestures.getChallenges());

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setNumOfChallenges === 'function') 
            vu.face.ui.gestures.setNumOfChallenges(vu.face.auth.gestures.getNumOfChallenges());      

        // Gesture feedback configuration propagation to mixed challenge UI
        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setResultsFeedbackTimeFrame === 'function') 
            vu.face.ui.gestures.setResultsFeedbackTimeFrame(vu.face.auth.gestures.getResultsFeedbackTimeFrame());

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setResultsValidateTimeFrame === 'function') 
            vu.face.ui.gestures.setResultsValidateTimeFrame(vu.face.auth.gestures.getResultsValidateTimeFrame());

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setResultsFeedbackPercentual === 'function') 
            vu.face.ui.gestures.setResultsFeedbackPercentual(vu.face.auth.gestures.getResultsFeedbackPercentual());

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setResultsValidatePercentual === 'function') 
            vu.face.ui.gestures.setResultsValidatePercentual(vu.face.auth.gestures.getResultsValidatePercentual());

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.setResultsValidateMinTimeFrame === 'function') 
            vu.face.ui.gestures.setResultsValidateMinTimeFrame(vu.face.auth.gestures.getResultsValidateMinTimeFrame());
        
        // Points
        if (vu.face.ui && typeof vu.face.ui.setChallenges === 'function') 
            vu.face.ui.setChallenges(vu.face.auth.gestures.getChallenges());

        if (vu.face.ui && typeof vu.face.ui.setNumOfChallenges === 'function') 
            vu.face.ui.setNumOfChallenges(vu.face.auth.gestures.getNumOfChallenges());
            
        // Gesture configuration for both mixed and orientation modules
        if (vu.face && typeof vu.face.setGestureConf === 'function') 
            vu.face.setGestureConf(vu.face.auth.getGestureConf());          

        vu.face.initialize(vuCamera);
        vu.face.ui.initialize(vuCamera);

        if (vu.face.ui.gestures && typeof vu.face.ui.gestures.initialize === 'function') 
            vu.face.ui.gestures.initialize(vuCamera);

        vu.sop.ui.initialize(vuCamera);        
        vu.sop.audio.initialize();
        //vu.sop.document.ui.initialize();
        vu.error.initialize(vuCamera);

        if (vu.face.auth.api && typeof vu.face.auth.api.initialize === 'function') {
            vu.face.auth.api.initialize(vuCamera);
        }        

        if (vu.screen.capture && typeof vu.screen.capture.initialize === 'function') {
            vu.screen.capture.initialize(vuCamera);
        }        

        vu.face.auth.initialized = true;        

        vu.face.auth.techStack = techStack;
        window.vu.face.auth.techStack = vu.face.auth.techStack;       
        window.vu.face.auth.frameConsistencyMax = vu.face.auth.frameConsistencyMax;    
        window.vu.face.auth.frameConsistencyEnabled = vu.face.auth.frameConsistencyEnabled;

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

        if (!vu.sop.ui.isSOCompatible()) {
            throw new Error('osOldVersion');
        }
    } catch (e) {
        console.log(e);
        await vu.error.showError(new vu.error.LoadError(e.message));
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
vu.face.auth.videoResizeObserver = new ResizeObserver(entries => {
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


vu.face.auth.userDo = async function () {
    vu.sop.audio.reproducir();
    await vu.sop.ui.disable('vu.sop.ui.userNameSendBtn');
    await vu.sop.ui.showWhiteLoading();
    vu.face.auth.userNameValue = document.getElementById("vu.sop.ui.userName").value;
    vu.sop.ui.user.start.resolve(true);
};

vu.face.auth.faceModelLoad = false;
vu.face.auth.start = async function (serverLess = false) {
    console.log("vu.face.auth.start", vu.face.auth.start);
    window.vu.face.auth.api = Object.assign({}, window.vu.face.auth.api || {}, vu.face.auth.api || {});
    let response;
    while (true) {
        try {
            await vu.sop.ui.showWhiteLoading();
            vu.face.auth.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));

            if (vu.sop.ui.isMobile) {
                console.log("vu.face.auth.useHighResolutionSettingsInMobileCamera", vu.face.auth.useHighResolutionSettingsInMobileCamera);
                if (vu.face.auth.useHighResolutionSettingsInMobileCamera) {
                    vuCamera.config.previewResolution = 'highest';
                    vuCamera.config.pictureResolution = 'highest';
                }
            } else {
                console.log("vu.face.auth.useHighResolutionSettingsInPCCamera", vu.face.auth.useHighResolutionSettingsInPCCamera);
                if (vu.face.auth.useHighResolutionSettingsInPCCamera) {
                    vuCamera.config.previewResolution = 'highest';
                    vuCamera.config.pictureResolution = 'highest';
                }
            }
            vuCamera.config.orientation = 'user';

            await vuCamera.start("vu.sop.ui.video");

            vu.sop.ui.flipVideoHorizontal(vuCamera.video);
            console.log('Warming Up Start');
            if (vu.face.auth.warmUpFaceModelAsync) {
                console.log("vu.face.auth.warmUpFaceModelAsync", vu.face.auth.warmUpFaceModelAsync);
                vu.face.auth.faceModelLoad = vu.face.load(vuCamera.video, vu.face.auth.basePath, vu.sop.tfPath);
            } else {
                await vu.face.load(vuCamera.video, vu.face.auth.basePath, vu.sop.tfPath);
            }
            break
        } catch (e) {
            await vu.sop.ui.hideWhiteLoading();
            console.log(e);
            await vu.error.showError(new vu.error.CameraError(e.message));

        }
    }


    while (true) {
        try {
            console.log("vu.sop.userNameValue", vu.sop.userNameValue);
            console.log("vu.face.auth.userNameValue", vu.face.auth.userNameValue);
            console.log("window.vu.face.auth.userNameValue", window.vu.face.auth.userNameValue);
            // En algun punto de hacer release de OM y Face, se pierde la referencia de vuCamera y debe ser tomada la de window, hay que revisar en detalle donde se da el problema raiz. Fixed
            if (vu.face.auth.userNameValue == null) {
                // Oculta la pantalla de espera, para mostrar la pantalla de ingreso de usuario
                await vu.sop.ui.hideLoading();
                await vu.sop.ui.hideWhiteLoading();
                // Espera a que se resuelva la pantalla del usuario
                await vu.sop.ui.user.start();
            } else {
                // vu.face.auth.loginFlag = true;
                await vu.sop.ui.user.doPreSetUser(vu.face.auth.userNameValue, true);
            }

            if (vu.face.auth.warmUpFaceModelAsync)
                await vu.face.auth.faceModelLoad;

            await vu.sop.ui.user.hide();
            break
        } catch (e) {
            console.log('vu.sop.ui.user', e);
            await vu.error.showError(new vu.error.FaceAuthError('registerApiError'));
        }
    }

    // ----------------------------------------
    // FACE
    //
    // Do face
    while (true) {
        try {
            await vu.sop.ui.hideLoading();
            await vu.sop.ui.hideWhiteLoading();
            await vu.face.auth.startRecording();
            await vu.sop.ui.showVideo();
            let pictures;
            if (vu.face.auth.challengeType == "mixed") {
                await vu.face.ui.gestures.start(vu.face.auth.basePath);
                pictures = await vu.face.ui.gestures.challengeStart();
            } else {
                await vu.face.ui.start();
                pictures = await vu.face.ui.challengeStart();
            }

            if(vu.face.auth.recordProcess === true) {
                //sendVideo = true;
                response = await vu.face.auth.stopRecording();
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
                    vu.face.ui.picturesTags.length > 0
                        ? vu.face.ui.picturesTags
                        : vu.face.ui.gestures.picturesTags;

                const result = pictures.map((img, idx) => ({
                    file: img.replace(/^data:image\/\w+;base64,/, ""),
                    imageType: tags[idx] || null
                }));                

                return result;
            }            

            await vu.sop.ui.showLoading();
            let lastPic = pictures[(pictures.length - 1)];
            
            if (vu.face.auth.registrationFlow) {
                if (vu.face.auth.enableSelfieList === true) {
                    if (vu.face.auth.framesAnalysis) {
                        const isValid = await vu.image.phash.detectOutliersInSelfies(vu.face.auth.framesAnalysisLevel, pictures);
                        if (!isValid)
                            throw new Error('failAuth');
                    }

                    if (vu.face.ui.picturesTags.length > 0)
                        response = await vu.face.auth.api.faceRegisters(vu.face.auth.userNameValue,
                            pictures,
                            vu.face.ui.picturesTags);
                    else
                        response = await vu.face.auth.api.faceRegisters(vu.face.auth.userNameValue,
                            pictures,
                            vu.face.ui.gestures.picturesTags);

                } else {
                    response = await vu.face.auth.api.faceRegister(vu.face.auth.userNameValue, lastPic);
                }
                if (response.code == '2001') {
                    throw new Error('registerApiError')
                } else if (response.code != '932') {
                    throw new Error('registerApiError')
                }

            } else {
                console.log("Enable selfie list " + vu.face.auth.enableSelfieList);
                if (vu.face.auth.enableSelfieList === true) {
                    if (vu.face.auth.framesAnalysis) {
                        const isValid = await vu.image.phash.detectOutliersInSelfies(vu.face.auth.framesAnalysisLevel, pictures);
                        if (!isValid)
                            throw new Error('failAuth');
                    }
                                        
                    if (vu.face.ui.picturesTags.length > 0)
                        response = await vu.face.auth.api.faceLoginList(vu.face.auth.userNameValue,
                            pictures,
                            vu.face.ui.picturesTags);
                    else
                        response = await vu.face.auth.api.faceLoginList(vu.face.auth.userNameValue,
                            pictures,
                            vu.face.ui.gestures.picturesTags);

                    if (response.code == '1001') {
                        throw new Error('userNotExist')
                    } else if (response.code == '2001') {
                        throw new Error('failAuth')
                    } else if (response.code != '1002') {
                        throw new Error('failAuth')
                    }
                } else {
                    response = await vu.face.auth.api.faceLogin(vu.face.auth.userNameValue, lastPic);

                    if (response.code == '1001') {
                        throw new Error('userNotExist')
                    } else if (response.code == '2001') {
                        throw new Error('failAuth')
                    } else if (response.code != '1002') {
                        throw new Error('failAuth')
                    }
                }
            }
            await vu.sop.ui.hideLoading();
            await vu.face.auth.release();
            break
        } catch (e) {
            vu.face.auth.screenRecorder.sendVideo = false;
            await vu.sop.ui.hideLoading();
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
            await vu.error.showError(new vu.error.FaceAuthError(msg));
        }
    }
    //vu.sop.ui.show('vu.sop.ui.endScreen')
    return response

};

vu.face.auth.loadingImgSrcDefault = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjb2ciIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jb2cgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00ODcuNCAzMTUuN2wtNDIuNi0yNC42YzQuMy0yMy4yIDQuMy00NyAwLTcwLjJsNDIuNi0yNC42YzQuOS0yLjggNy4xLTguNiA1LjUtMTQtMTEuMS0zNS42LTMwLTY3LjgtNTQuNy05NC42LTMuOC00LjEtMTAtNS4xLTE0LjgtMi4zTDM4MC44IDExMGMtMTcuOS0xNS40LTM4LjUtMjcuMy02MC44LTM1LjFWMjUuOGMwLTUuNi0zLjktMTAuNS05LjQtMTEuNy0zNi43LTguMi03NC4zLTcuOC0xMDkuMiAwLTUuNSAxLjItOS40IDYuMS05LjQgMTEuN1Y3NWMtMjIuMiA3LjktNDIuOCAxOS44LTYwLjggMzUuMUw4OC43IDg1LjVjLTQuOS0yLjgtMTEtMS45LTE0LjggMi4zLTI0LjcgMjYuNy00My42IDU4LjktNTQuNyA5NC42LTEuNyA1LjQuNiAxMS4yIDUuNSAxNEw2Ny4zIDIyMWMtNC4zIDIzLjItNC4zIDQ3IDAgNzAuMmwtNDIuNiAyNC42Yy00LjkgMi44LTcuMSA4LjYtNS41IDE0IDExLjEgMzUuNiAzMCA2Ny44IDU0LjcgOTQuNiAzLjggNC4xIDEwIDUuMSAxNC44IDIuM2w0Mi42LTI0LjZjMTcuOSAxNS40IDM4LjUgMjcuMyA2MC44IDM1LjF2NDkuMmMwIDUuNiAzLjkgMTAuNSA5LjQgMTEuNyAzNi43IDguMiA3NC4zIDcuOCAxMDkuMiAwIDUuNS0xLjIgOS40LTYuMSA5LjQtMTEuN3YtNDkuMmMyMi4yLTcuOSA0Mi44LTE5LjggNjAuOC0zNS4xbDQyLjYgMjQuNmM0LjkgMi44IDExIDEuOSAxNC44LTIuMyAyNC43LTI2LjcgNDMuNi01OC45IDU0LjctOTQuNiAxLjUtNS41LS43LTExLjMtNS42LTE0LjF6TTI1NiAzMzZjLTQ0LjEgMC04MC0zNS45LTgwLTgwczM1LjktODAgODAtODAgODAgMzUuOSA4MCA4MC0zNS45IDgwLTgwIDgweiI+PC9wYXRoPjwvc3ZnPg==";
vu.face.auth.loadingImgSrc = '';
vu.face.auth.loadingImgStyle = '';

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
    if (!vu.face.auth.loadingImgSrc) {
        imgElem.src = vu.face.auth.loadingImgSrcDefault;
        imgElem.className = "vu.sop.ui.loadingImg";
    } else {
        imgElem.src = vu.face.auth.loadingImgSrc;
        imgElem.style = vu.face.auth.loadingImgStyle;
    }

    //Agrega la imagen al html
    document.getElementById("vu.sop.ui.whiteLoadingImg").appendChild(imgElem);
    document.getElementById("vu.sop.ui.loadingImg").appendChild(imgElem.cloneNode());
};


vu.face.auth.release = async function () {
    console.log("vu.face.auth.release");
    await vuCamera.release();

    vu.face.doLoop = false;
    vu.face.ui.loop = false;
    vu.face.ui.challengeLoop = false;
    vu.face.ui.gestures.loop = false;
    vu.face.ui.gestures.lastChallenge = "";
    vu.face.ui.gestures.challengeLoop = false;
    
    if(vu.sop.videoResizeObserver)
    {
        vu.sop.videoResizeObserver.disconnect();
        //vu.sop.videoResizeObserver = null;
    }

    if(vu.face.ui.gestures.videoResizeObserver)
    {
        vu.face.ui.gestures.videoResizeObserver.disconnect();
        //vu.face.ui.gestures.videoResizeObserver = null;
    }

    vu.face?.auth?.videoResizeObserver?.disconnect();


    if (vu.face.ui.faceDotObserver) {
        vu.face.ui.faceDotObserver.disconnect();
        //vu.face.ui.faceDotObserver = null;

        if (typeof JEEFACEFILTERAPI !== 'undefined' && JEEFACEFILTERAPI && vu.face.auth.challengeType != "mixed") 
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

    vu.extras.cleanupGestureScripts(vu.face.auth.challengeType, vu.face.auth.techStack);    

    vu.face.auth.initialized = false;    

    //vu.face.auth = {};
};

vu.face.auth.addVideoResolve = async function(video) {
    // Start upload in background (no await = non-blocking)
    if(!captureEnabled)
    {
        return {
            code: 2000,
            message: "Stats upload cancelled"
        };
    }

    vu.face.auth.api.addVideos(vu.face.auth.userNameValue, video, vu.face.auth.getFaceStatsKey())
        .then(response => {
            console.log('add video respo: ', response);
        })
        .catch(error => {
            console.error('video upload error:', error);
        });
    
    // Hide loading immediately (don't wait for upload)
    await vu.sop.ui.hideWhiteLoading();
    
    // Return success response that your SDK expects
    return {
        code: 2000,
        message: "Stats upload started successfully"
    };
};


vu.face.auth.screenRecorder.recorder;
vu.face.auth.screenRecorder.stream;

vu.face.auth.screenRecorder.sendVideo = false;
vu.face.auth.screenRecorder.videoReady = false;
vu.face.auth.screenRecorder.completeBlob;

vu.face.auth.startRecording = async function() {
    if(vu.face.auth.recordProcess === true) {
        if (vu.sop.ui.isMobile()) {
            vu.screen.capture.recordVideoStart();
        } else {
            try {
                vu.face.auth.screenRecorder.stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {mediaSource: "screen"}
                });
                
                const chunks = [];
                
                vu.face.auth.screenRecorder.recorder = new MediaRecorder(vu.face.auth.screenRecorder.stream);
                
                vu.face.auth.screenRecorder.recorder.ondataavailable = e => {
                    if (e.data && e.data.size > 0) {
                        chunks.push(e.data);
                        console.log("Chunk collected:", e.data.size, "bytes");
                    }
                };
                
                vu.face.auth.screenRecorder.recorder.onstop = e => {
                    try {
                        console.log("Recording stopped. Total chunks:", chunks.length);
                        if (chunks.length > 0) {
                            const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
                            console.log("Total video size:", totalSize, "bytes");
                            
                            vu.face.auth.screenRecorder.completeBlob = new Blob(chunks, { 'type': 'video/mp4' });
                            vu.face.auth.screenRecorder.videoReady = true;
                            console.log("Video blob ready as MP4");
                        } else {
                            console.error("No video chunks collected");
                            vu.face.auth.screenRecorder.videoReady = false;
                        }
                    } catch (e) {
                        console.error("Error creating video blob:", e);
                        vu.face.auth.screenRecorder.videoReady = false;
                    }
                };
                
                vu.face.auth.screenRecorder.recorder.onerror = e => {
                    console.error("MediaRecorder error:", e);
                };
                
                // Start with time slicing for better data collection
                vu.face.auth.screenRecorder.recorder.start(1000);
                console.log("Screen recording started");
                
            } catch (e) {
                console.log("video record error:", e);
                await vu.sop.ui.hideWhiteLoading();
                // TODO pendiente porque face no tiene telemetria
                // if(vu.face.auth.enableTelemetry){
                //     vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SCREEN_RECORDING_ERROR});
                // }
                await vu.error.showError(new vu.error.UserError('startRecordingFail'));
                throw e;
            }
        }
    }
};

vu.face.auth.stopRecording = async function() {
    if (vu.sop.ui.isMobile()) {
        try {
            if (vu.screen.capture.doCaptureLoop) {
                return vu.screen.capture.recordVideoStop();
            } else {
                console.log("No Screen record active");
            }
        } catch(e){
            console.log("No Screen record active");
        }
    } else {        
        if (vu.face.auth.screenRecorder.sendVideo === false) {
            try {
                vu.face.auth.screenRecorder.stream.getTracks().forEach(track => {
                    track.stop();
                });
            } catch(e){
                console.log("No Screen record active");
            }
        }
        
        try {
            if (vu.face.auth.recordProcess === true) {
                if (vu.face.auth.screenRecorder.recorder !== undefined) {
                    if (vu.face.auth.screenRecorder.recorder.state != "inactive") {
                        // Stop recorder first
                        vu.face.auth.screenRecorder.recorder.stop();
                        console.log("MediaRecorder stopped");
                        
                        // Wait for video processing
                        while (vu.face.auth.screenRecorder.videoReady === false) {
                            await vu.sop.ui.sleep('100');
                        }
                        
                        // Now stop stream tracks
                        vu.face.auth.screenRecorder.stream.getVideoTracks()[0].stop();
                        console.log("Stream tracks stopped");
                        
                        if (vu.face.auth.screenRecorder.sendVideo === true) {
                            console.log("Sending MP4 video:", vu.face.auth.screenRecorder.completeBlob);
                            return await vu.face.auth.addVideoResolve(vu.face.auth.screenRecorder.completeBlob);
                        } else {
                            return vu.face.auth.screenRecorder.completeBlob;
                        }
                    }
                }
            }
        } catch (e) {
            vu.face.auth.screenRecorder.sendVideo = false;
            await vu.face.auth.stopRecording();
            return new Error(e.message);
        }
    }
};


if (typeof window !== 'undefined') {
    window.vuFaceAuth = vu.face.auth;
    //console.log('vuFaceAuth is attached to the window:', window.vuFaceAuth);
} else if (typeof global !== 'undefined') {
    global.vuFaceAuth = vu.face.auth;
}

var vu_face_auth = vu.face.auth;

export { vu_face_auth as default };
