import vuFaceUi from 'vu.face.ui'; 
//import vuFaceAuth from 'vu.face.auth';
import vuExtras from 'vu.extras'; //
import {
  isSuspiciousCameraLabel,
  cameraAnomalyDevice
} from './vu.camera.utils.js';

// Reference the existing vu object
// const vu = vu || {};
// vu.sop = vu.sop || {};
// vu.camera = vu.camera || {};
// vu.face = vu.face || {};
// vu.face.ui = vuFaceUi;
// vu.face.auth = vuFaceAuth;
// vu.extras = vuExtras;


const vu = {
  sop: {},
  camera: {},
  face: {
    ui: vuFaceUi,
    auth: {}
  },
  extras: vuExtras
};

vu.camera.video;                        // Video Element
vu.camera.stream;                       // Video Stream
vu.camera.track;                        // Video track
vu.camera.devices = null;
vu.camera.videoinput = [];
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
vu.camera.config = {
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
vu.camera.cssValues = {
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

vu.camera.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu.camera.isVerticalVideo = function() {
    if ( vu.camera.video.videoWidth < vu.camera.video.videoHeight) {
        return true
    } else {
        return false
    }
};

vu.camera.hasFocusControl = function() {
    if ("focusDistance" in vu.camera.stream.getVideoTracks()[0].getCapabilities()) {
        // console.log("Focus Control")
        return true
    } else {
        // console.log("NO Focus Control")
        return false
    }
}

/**
 * Return a array of values (example, min = 1, max = 5, returns = [1,2,3,4,5])
 *
 * @param min min value of range
 * @param max max value of range
 * @returns {Array} array range
 */
vu.camera.getRange = function (min, max) {
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
vu.camera.getHighValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.75) - 1];
};

/**
 * Example range = [1,2,3,4,5], returns 3
 *
 * @param range
 * @returns {*}
 */
vu.camera.getMediumValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.5) - 1];
};

/**
 * Example range = [1,2,3,4,5], returns 2
 *
 * @param range
 * @returns {*}
 */
vu.camera.getLowValueOfRange = function (range) {
    return range[Math.round((range.length) * 0.25) - 1];
};

/**
 * Set the video Stream and set the max resolution available
 *
 * @returns {true or Error}
 *      Error('denied') No camera or camera access denied
 */
vu.camera.setMaxResolution = async function () {
    if (vu.camera.stream) {
        vu.camera.stream.getTracks().forEach(track => track.stop());
    }

    vu.camera.stream = null;
    vu.camera.videoinput = [];

    for (let i = 0; i < vu.camera.config.resolutionConstraints.length; i++) {
        let constraints = vu.camera.config.resolutionConstraints[i];

        constraints.video.resizeMode = { exact: 'none' };

        if (vu.camera.selectedDeviceId) {
            constraints.video.deviceId = { exact: vu.camera.selectedDeviceId };
        } else {
            if (vu.camera.config.orientation !== 'user') {
                vu.camera.devices = await navigator.mediaDevices.enumerateDevices();
                vu.camera.devices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        vu.camera.videoinput.push(mediaDevice);
                    }
                });

                if (vu.camera.videoinput.length <= 2 || vu.camera.devices.length <= 2) {
                    constraints.video.facingMode = vu.camera.config.orientation;
                } else {
                    for (let i = 0; i < vu.camera.videoinput.length; i++) {
                        if (vu.camera.videoinput[i].label.includes('0, facing back')) {
                            constraints.video.deviceId = { exact: vu.camera.videoinput[i].deviceId };
                            break;
                        }
                    }
                }
            } else {
                constraints.video.facingMode = vu.camera.config.orientation;
            }
        }

        try {
            vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);");
            vu.camera.config.maxResolutionConstrains = constraints;
            console.log(constraints);
            console.log("Camera Orientation max reso", vu.camera.config.orientation, i, " || Max Resolution", constraints);            
            

            const actualTrack = vu.camera.stream?.getVideoTracks?.()[0];
            const currentDeviceId = actualTrack?.getSettings?.().deviceId;
            const actualLabel = actualTrack?.label || '';

            console.log('[Camera] Initial stream label:', actualLabel);
            console.log("Device ID:", currentDeviceId);                        

            if (isSuspiciousCameraLabel(actualLabel)) {
                console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
                vu.camera.stream.getTracks().forEach(t => t.stop());
                vu.camera.stream = null;
                throw new Error('cameraSelectionError');
            }            

            vu.camera.selectedDeviceId = currentDeviceId;

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
            if (vu.camera.stream != null) break;
        }
    }

    if (vu.camera.stream == null) {
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
vu.camera.setMinResolution = async function () {
    if (vu.camera.stream) {
        vu.camera.stream.getTracks().forEach(track => track.stop());
    }

    vu.camera.stream = null;
    vu.camera.videoinput = [];

    const reversedConstraints = vu.camera.config.resolutionConstraints.slice().reverse();

    for (let i = 0; i < reversedConstraints.length; i++) {
        let constraints = reversedConstraints[i];

        constraints.video.resizeMode = { exact: 'none' };

        if (vu.camera.selectedDeviceId) {
            constraints.video.deviceId = { exact: vu.camera.selectedDeviceId };
        } else {
            if (vu.camera.config.orientation !== 'user') {
                vu.camera.devices = await navigator.mediaDevices.enumerateDevices();
                vu.camera.devices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        vu.camera.videoinput.push(mediaDevice);
                    }
                });

                if (vu.camera.videoinput.length <= 2 || vu.camera.devices.length <= 2) {
                    constraints.video.facingMode = vu.camera.config.orientation;
                } else {
                    for (let i = 0; i < vu.camera.videoinput.length; i++) {
                        if (vu.camera.videoinput[i].label.includes('0, facing back')) {
                            constraints.video.deviceId = { exact: vu.camera.videoinput[i].deviceId };
                            break;
                        }
                    }
                }
            } else {
                constraints.video.facingMode = vu.camera.config.orientation;
            }
        }

        try {
            vu.camera.config.minResolutionConstrains = constraints;
            vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(constraints);
            console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(constraints);");
            console.log("Camera Orientation min reso", vu.camera.config.orientation, " || Min Resolution", constraints);

            const actualTrack = vu.camera.stream?.getVideoTracks?.()[0];
            const currentDeviceId = actualTrack?.getSettings?.().deviceId;
            const actualLabel = actualTrack?.label || '';

            console.log('[Camera] Initial stream label:', actualLabel);
            console.log("Device ID:", currentDeviceId);                        

            if (isSuspiciousCameraLabel(actualLabel)) {
                console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
                vu.camera.stream.getTracks().forEach(t => t.stop());
                vu.camera.stream = null;
                throw new Error('cameraSelectionError');
            }            

            vu.camera.selectedDeviceId = currentDeviceId;            

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
            if (vu.camera.stream != null) break;
        }        
    }

    if (vu.camera.stream == null) {
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
vu.camera.start = async function(videoId) {
    if (typeof videoId === "string") {
        vu.camera.video = document.getElementById(videoId);
    } else {
        vu.camera.video = videoId;
    }

    if (vu.camera.selectedDeviceId) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const selected = devices.find(d =>
            d.kind === 'videoinput' &&
            d.deviceId === vu.camera.selectedDeviceId &&
            !isSuspiciousCameraLabel(d.label)
        );

        if (selected) {
            // continue with binding below using selectedDeviceId
            console.log('[Camera] Using previously device:', selected.label);
        } else {
            // fallback to fresh anomaly check if invalid
            vu.camera.selectedDeviceId = null;
        }
    }

    if (!vu.camera.selectedDeviceId) {
        const flagged = await cameraAnomalyDevice();
        if (flagged) {
            //await initCameraPicker(videoId);
            throw Error('cameraSelectionError');
        }
    }

    try {
        await vu.camera.setMaxResolution(vu.camera.config.orientation);
        console.log("previewResolution", vu.camera.config.previewResolution)
        console.log("vu.camera.video", vu.camera.video);

        const actualTrack = vu.camera.stream?.getVideoTracks()[0];
        const actualLabel = actualTrack?.label || '';

        console.debug('[Camera] Initial stream label:', actualLabel);

        // If no selectedDeviceId and camera looks suspicious (first-time permission case)
        if (!vu.camera.selectedDeviceId && isSuspiciousCameraLabel(actualLabel)) {
            console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
            vu.camera.stream.getTracks().forEach(t => t.stop());
            vu.camera.stream = null;
            throw new Error('cameraSelectionError');
        }

        if (vu.camera.config.previewResolution == 'highest'){
            vu.camera.track = vu.camera.stream.getVideoTracks()[0];
        } else {
            await vu.camera.setMinResolution(vu.camera.config.orientation);
            vu.camera.track = vu.camera.stream.getVideoTracks()[0];
        }

        if (vu.camera.config.contrast !== 'default') {
            vu.camera.setContrast(vu.camera.config.contrast);
        }
        if (vu.camera.config.brightness !== 'default') {
            vu.camera.setBrightness(vu.camera.config.brightness);
        }
        if (vu.camera.config.sharpness !== 'default') {
            vu.camera.setSharpness(vu.camera.config.sharpness);
        }
        if (vu.camera.config.saturation !== 'default') {
            vu.camera.setSaturation(vu.camera.config.saturation);
        }

        if (vu.camera.config.iso !== 'default') {
            vu.camera.setIso(vu.camera.config.iso);
        }
        if (vu.camera.config.zoom !== 'default') {
            //vu.camera.setZoom(vu.camera.config.zoom);
        }

        vu.camera.video.srcObject = vu.camera.stream;

    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
    try {
        let focusModes = vu.camera.stream.getVideoTracks()[0].getCapabilities().focusMode
        if (focusModes.includes("continuous")) {
            vu.camera.stream.getVideoTracks()[0].applyConstraints({advanced: [{focusMode: "continuous"}]});
        } else if (focusModes.includes("auto")) {
            vu.camera.stream.getVideoTracks()[0].applyConstraints({advanced: [{focusMode: "auto"}]});
        }
    } catch (e) {
        console.log('Camera: set focus mode not supported')
    }

    let playPromise = vu.camera.video.play();
    if (playPromise !== undefined) {
        try {
            await playPromise;
        } catch (e) {
            console.log('Video anti-autoplay stop video stream', e);
            throw new Error('autoplay');
        }

        if (vu.camera.config.previewResolution == 'highest'){
            vu.camera.config.minimumResolution = vu.camera.config.minimumResolutionInHighestPreviewResolution;
        } else {
            vu.camera.config.minimumResolution = vu.camera.config.minimumResolutionInLowestPreviewResolution;;
        }

        if (vu.camera.video.videoHeight < vu.camera.config.minimumResolution ||
            vu.camera.video.videoWidth < vu.camera.config.minimumResolution){
            console.log('Camera too low resolution', vu.camera.video.videoHeight, vu.camera.video.videoWidth);
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
vu.camera.takePicture = async function() {
    if (vu.camera.config.pictureFlashEffect) {
        document.getElementById(vu.camera.config.pictureFlashDivId).style.display = "block";
    }

    // 🔒 Check for unexpected camera device change
    const actualTrack = vu.camera.stream?.getVideoTracks?.()[0];
    const currentDeviceId = actualTrack?.getSettings?.().deviceId;
    const actualLabel = actualTrack?.label || '';

    if (vu.camera.selectedDeviceId && currentDeviceId && currentDeviceId !== vu.camera.selectedDeviceId) {
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly',  vu.camera.selectedDeviceId);
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly', currentDeviceId);
        console.warn('[vu.camera] 🚨 Camera device changed unexpectedly');
        vu.camera.stream.getTracks().forEach(t => t.stop());
        vu.camera.stream = null;
        // no exponer error informativo
        throw new Error('undefined');        
    }

    if (isSuspiciousCameraLabel(actualLabel)) {
        console.warn('[Camera] First-time permission fallback to virtual camera:', actualLabel);
        vu.camera.stream.getTracks().forEach(t => t.stop());
        vu.camera.stream = null;
        // no exponer error informativo
        throw new Error('undefined');  
    }

    let resConstrain = false
    // Si la camara no tiene el preview en maxima resolucion y se solicita la foto en maxima resolucion,
    // se cambia la camara a maxima resolucion antes de sacar la foto.
    if ( vu.camera.config.pictureResolution === 'highest' &&
         vu.camera.config.previewResolution !== 'highest') {

        resConstrain = vu.camera.config.previewResolution;
        vu.camera.config.previewResolution = 'highest';

        vu.camera.stream.getTracks().forEach(track => {
            track.stop();
        });
        vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.maxResolutionConstrains);
        console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.maxResolutionConstrains);");
        vu.camera.video.srcObject = vu.camera.stream;
        await vu.camera.video.play();
    }

    // Se prepara el canvas y se pone en consola la informacion de la foto y la camara
    let burstCanvas = []
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
    canvas.width = vu.camera.video.videoWidth;
    canvas.height = vu.camera.video.videoHeight;

    console.log("Camera resolution", canvas.width, canvas.height);
    console.log("Camera config", vu.camera.config);

    if (vu.camera.config.takePictureLessBlurry === false) {
        // Si es una sola foto, se toma y la misma y se deja en el canvas.
        canvasContext.drawImage(vu.camera.video, 0, 0, canvas.width, canvas.height);
    } else {
        // Crear Canvas
        for ( var i = 0; i < vu.camera.config.pictureLessBlurryBurst; i++) {
            let canvasTemp = document.createElement('canvas');
            canvasTemp.width = vu.camera.video.videoWidth;
            canvasTemp.height = vu.camera.video.videoHeight;
            burstCanvas.push(canvasTemp)
            //console.log("canvas", i)
        }
        // Sacar fotos
        for ( var i = 0; i < vu.camera.config.pictureLessBlurryBurst; i++) {
            burstCanvas[i].getContext('2d').drawImage(vu.camera.video,0, 0,
                burstCanvas[i].width, burstCanvas[i].height);
            //console.log("picture", i);
            //console.log(burstCanvas[i].toDataURL('image/jpeg', vu.camera.config.jpegCompression))
        }
    }

    // Se restaura la camara al modo que estaba si se cambio la resolucion para tomar la foto.
    if (resConstrain !== false) {
        vu.camera.config.previewResolution = resConstrain;
        vu.camera.stream.getTracks().forEach(track => {
            track.stop();
        });
        vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.minResolutionConstrains);
        console.log("vu.camera.stream = await navigator.mediaDevices.getUserMedia(vu.camera.config.minResolutionConstrains);");
        vu.camera.video.srcObject = vu.camera.stream;
        await vu.camera.video.play();
    }

    if (vu.camera.config.pictureFlashEffect) {
        document.getElementById(vu.camera.config.pictureFlashDivId).style.display = "none";
    }

    // Filtrar para obtener la foto menos borrosa
    if (vu.camera.config.takePictureLessBlurry !== false) {
        let blurValue = 1000;
        // Get Best Picture
        for (var i = 0; i < vu.camera.config.pictureLessBlurryBurst; i++) {
            let newBlurValue = measureBlur(burstCanvas[i].getContext('2d').getImageData(0, 0,
                burstCanvas[i].width, burstCanvas[i].height)).avg_edge_width_perc
            //console.log("picture "+i+" blur value:", newBlurValue)

            if (newBlurValue < blurValue){
                blurValue = newBlurValue;
                canvasContext.drawImage(burstCanvas[i], 0, 0, burstCanvas[i].width, burstCanvas[i].height);
            }
        }
    }

    if (vu.camera.config.pictureForceLandscape) {
        // validar si es portrait o landscape
        if (canvas.width < canvas.height) {
            // Es portrait, rotar 90 clockwise

            let canvas2 = document.createElement('canvas');
            canvas2.width = canvas.height;
            canvas2.height = canvas.width;

            let ctx2 = canvas2.getContext('2d');


            if (vu.camera.config.pictureForceLandscapeRotateClockwise) {
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
    if (vu.camera.isVerticalVideo()) {
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

                console.log('takePicture: Picture is horizontal and video is vertical - Image rotated 90r')

             } else { console.log('takePicture: Picture is horizontal - No action taken') }
        } else { console.log('takePicture: Screen not vertical - No action taken') }
    } else { console.log('takePicture: Video is not vertical - No action taken') }
    /***********************************************************************/
    // Conversion del canvas a B64, dataUrl o se entrega el canvas limpio
    let dataUrl;
    if (vu.camera.config.responseType === 'dataUrl' || vu.camera.config.responseType === 'base64') {
        if (vu.camera.config.pictureFormat === 'jpg' || vu.camera.config.pictureFormat === 'jpeg') {
            dataUrl = canvas.toDataURL('image/jpeg', vu.camera.config.jpegCompression);
        } else {
            dataUrl = canvas.toDataURL('image/png');
        }
        if (dataUrl.length < 6) {
            console.log('browser or some adBlock extension blocks taking a picture');
            throw new Error('crossSiteBlock')
        } else {
            if (vu.camera.config.responseType === 'base64') {
                return dataUrl.split(",")[1]
            } else {
                return dataUrl
            }
        }
    }
    if (vu.camera.config.responseType === 'canvas') {
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
vu.camera.verifyBeforeForceResolution = function (idealResolution) {
    if(vu.camera.isVerticalVideo()){
        return vu.camera.video.videoHeight > idealResolution;
    }else   {
        return vu.camera.video.videoWidth > idealResolution;
    }
}

vu.camera.resizeDataURL = function(dataUrl, resizeBy = "width", size = 1280, jpgQuality = 0.95) {
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
            console.error('No se pudo cargar la imagen.')
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
vu.camera.getCapabilities = function() {
    if (typeof vu.camera.track.getCapabilities != "undefined") {
        return vu.camera.track.getCapabilities()
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
vu.camera.setCapabilities = function(value, attr) {
    if (vu.camera.getCapabilities() !== false) {
        let capabilities = vu.camera.getCapabilities();
        if (typeof capabilities[attr] != "undefined") {
            let highest = capabilities[attr].max;
            let lowest = capabilities[attr].min;
            let range = vu.camera.getRange(lowest, highest);
            if (value === 'highest') {
                vu.camera.track.applyConstraints({advanced: [{[attr]: highest}]});
                return true;
            } else if (value === 'high') {
                vu.camera.track.applyConstraints({advanced: [{[attr]: vu.camera.getHighValueOfRange(range)}]});
                return true;
            } else if (value === 'medium') {
                vu.camera.track.applyConstraints({advanced: [{[attr]: vu.camera.getMediumValueOfRange(range)}]});
                return true;
            } else if (value === 'low') {
                vu.camera.track.applyConstraints({advanced: [{[attr]: vu.camera.getLowValueOfRange(range)}]});
                return true;
            } else if (value === 'lowest') {
                vu.camera.track.applyConstraints({advanced: [{[attr]: lowest}]});
                return true;
            } else if (typeof value == 'number') {
                vu.camera.track.applyConstraints({advanced: [{[attr]: value}]});
                return true;
            } else {
                return false;
            }
        } else {
            return vu.camera.setCSSCapabilities(value, attr)
        }
    } else {
        return vu.camera.setCSSCapabilities(value, attr);
    }
};

vu.camera.setCSSCapabilities = function(value, attr) {
    if ( attr == 'contrast' || attr == 'brightness' || attr == 'saturation' || attr == 'zoom') {
        let highest = vu.camera.cssValues[attr].max;
        let lowest = vu.camera.cssValues[attr].min;
        let range = vu.camera.getRange(lowest, highest);
        if (value === 'highest') {
            value = highest;
        } else if (value === 'high') {
            value = vu.camera.getHighValueOfRange(range);
        } else if (value === 'medium') {
            value = vu.camera.getMediumValueOfRange(range);
        } else if (value === 'low') {
            value = vu.camera.getLowValueOfRange(range);
        } else if (value === 'lowest') {
            value = lowest;
        }
        vu.camera.cssValues[attr].val = value;
        vu.camera.video.style.filter = "contrast("+vu.camera.cssValues['contrast'].val+"%)" +
            "brightness("+vu.camera.cssValues['brightness'].val+"%)" +
            "saturate("+vu.camera.cssValues['saturation'].val+"%)";

        let newHeight = Math.round(100 * vu.camera.cssValues['zoom'].val);
        let newWidth = Math.round(100 * vu.camera.cssValues['zoom'].val);

        vu.camera.video.style.width =  newWidth + "%" ;
        vu.camera.video.style.height =  newHeight + "%";
        let top = -Math.abs(Math.round((newHeight - 100) / 2)) ;
        let left =  -Math.abs(Math.round((newWidth - 100) / 2));
        vu.camera.video.style.top = top  + "%";
        vu.camera.video.style.left = left  + "%";

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
vu.camera.setSharpness = function(value) {
    return vu.camera.setCapabilities(value, 'sharpness')
};

/**
 * Set camera brightness
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu.camera.setBrightness = function(value) {
    let status = vu.camera.setCapabilities(value, 'brightness');
    return status;
};

/**
 * Set camera saturation
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu.camera.setSaturation = function(value) {
    let status = vu.camera.setCapabilities(value, 'saturation');
    return status;
};

/**
 * Set camera contrast
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu.camera.setContrast = function(value) {
    let status = vu.camera.setCapabilities(value, 'contrast');
    return status;
};

/**
 * Set camera iso
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false}
 */
vu.camera.setIso = function(value) {
    return vu.camera.setCapabilities(value, 'iso')
};

/**
 * Set camera zoom
 *
 * @param value highest high medium low lowest or integrer
 * @returns {true, false or 'webgl'}
 */
vu.camera.setZoom = function(value) {
    let status = vu.camera.setCapabilities(value, 'zoom');
    return status;
};

vu.camera.release = async function () {
    if (vu.camera.stream) {
        vu.camera.stream.getTracks().forEach(function (track) {
            track.stop();
        });

        vu.camera.stream = null;
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


export default vu.camera;