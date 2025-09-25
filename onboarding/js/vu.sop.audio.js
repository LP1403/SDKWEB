// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.audio = vu.sop.audio || {};
vu.face = vu.face || {};
vu.face.auth = vu.face.auth || {};
vu.face.auth.audio = vu.face.auth.audio || {};

vu.sop.audio.enabled = false;
vu.sop.audio.audioQueue = [];

vu.sop.audio.initialize = function () {
    if (window.vu.sop.audio.enabled != vu.sop.audio.enabled)
        vu.sop.audio.enabled = window.vu.sop.audio.enabled;

    if (window.vu.sop.audioPreloaded != vu.sop.audioPreloaded)
        vu.sop.audioPreloaded = window.vu.sop.audioPreloaded;
};

// if (typeof vu.sop.audio == "undefined") {
//     vu.sop.audio.enabled = true
//     vu.sop.audio.audioQueue = [];
// }

// if (typeof vu.sop.audio.audioQueue == "undefined") {
//     vu.sop.audio.audioQueue = [];
// }

// vu.sop.audio.snd = new Audio("data:audio/mp3;base64,"+vu.sop.audio.userError);

vu.sop.audio.play = function (audioId) {
    if (!vu.sop.audio.enabled)
        return;

    // console.log("vu.sop.audio.enabled", vu.sop.audio.enabled);
    // console.log("vu.face.auth.audio.enabled", vu.face.auth.audio.enabled);

    // const stack = new Error().stack.split('\n');
    // const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    // console.log(`Caller: ${callerInfo}`);

    if (vu.sop.audio.enabled) {
        const audio = document.getElementById(audioId);

        if (!audio) {
            console.error(`Audio element with ID "${audioId}" not found.`);
            return;
        }

        audio.addEventListener('canplaythrough', () => {
            console.debug(`Audio "${audioId}" is ready.`);
        });

        audio.muted = false; // asegura que el audio no esté en silencio
        vu.sop.audio.audioQueue.push(audio);

        if (vu.sop.audio.audioQueue.length > 1) {
            const previousAudio = vu.sop.audio.audioQueue[vu.sop.audio.audioQueue.length - 2];
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
            vu.sop.audio.audioQueue = vu.sop.audio.audioQueue.filter(a => a.id !== audioId);
            console.debug(`Audio "${audioId}" has finished playing.`);
        }

        audio.addEventListener('pause', handleAudioEvent);
        audio.addEventListener('ended', handleAudioEvent);
    }
}

vu.sop.audioPreloaded = false;

vu.sop.audio.reproducir = function () {
    // console.log("window.vu.sop.audio.reproducir", window.vu.sop.audio.enabled);
    // console.log("vu.sop.audio.reproducir", vu.sop.audio.enabled);
    if (!vu.sop.audio.enabled)
        return;

    if (!vu.sop.audioPreloaded) {
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

    vu.sop.audioPreloaded = true;
}

export default vu.sop.audio;
