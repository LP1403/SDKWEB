(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Global (browser)
        root.vu = root.vu || {};
        root.vu.face = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
/*

Descripcion: Esta libreria se encarga de detectar los gestos y la orientacion del mismo


Referencias:
https://github.com/jeeliz/jeelizWeboji
https://github.com/jeeliz/jeelizFaceFilter
https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf


 */



// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.face = vu.face || {};
vu.image = vu.image || {};
vu.sop.ui = vu.sop.ui || {};
vu.sop.face = vu.sop.face || {};

let moduleCamera = null;

vu.face.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    // Proceed to use vu.sop safely
    //vu.sop.msg = window.vu.sop.msg || {};
    //vu.sop.audio = window.vu.sop.audio || {};
    //vu.sop.steps = window.vu.sop.steps || {};
    vu.image = window.vu.image || {};
    vu.sop.ui = window.vu.sop.ui || {};
    console.log("vu.sop.face.objectDetectionAndRotation", vu.sop.face.objectDetectionAndRotation);
    console.log("window.vu.sop.face.objectDetectionAndRotation", window.vu.sop.face.objectDetectionAndRotation);

    vu.sop.face.objectDetectionAndRotation = window.vu.sop.face.objectDetectionAndRotation || {};

    moduleCamera = camera;
}


// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.face == "undefined") { vu.face = function() {} }

vu.face.loadStatus = 'no'; // no - wip - ok
vu.face.canvasId = 'vu.sop.ui.faceTransferCanvas';
vu.face.invertXAxis = true;

vu.face.doLoop = false;
vu.face.canvas = false;
vu.face.canvasContext = false;
vu.face.canvasInference = false;
vu.face.canvasInferenceContext = false;
vu.face.checkPictureQuality = true;
vu.face.faceSizeMin = 0.4;
vu.face.faceSizeMax = 0.75;
vu.face.frameConsistency = [];
vu.face.frameConsistencyLastPhash = false;

// Private variable for gesture configuration - not exposed directly
let gesturesConf = [['smile', 30], ['bothEyesClosed', 40]];

// Secure setter function for gesture configuration (security: only accepts first configuration until release)
vu.face.setGestureConf = function(conf) {
    // Check if EITHER vuFace or vuIDCard is initialized to prevent cross-module contamination
    if ((vu.face.auth && vu.face.auth.initialized) || 
        (vu.sop && vu.sop.initialized)) {
        console.warn("[Security] vu.face.setGestureConf: Configuration already set. Call vu.face.auth.release() or vu.sop.release() first to reconfigure.");
        return false;
    }
    
    if (!Array.isArray(conf) || conf.length === 0) {
        console.error("[Security] vu.face.setGestureConf: Invalid gesture configuration array provided.");
        return false;
    }
    
    // Validate each configuration entry
    for (let i = 0; i < conf.length; i++) {
        if (!Array.isArray(conf[i]) || conf[i].length !== 2 || typeof conf[i][0] !== 'string' || typeof conf[i][1] !== 'number') {
            console.error("[Security] vu.face.setGestureConf: Invalid gesture configuration entry at index " + i + ". Expected format: [['gesture', threshold], ...]");
            return false;
        }
    }
    
    gesturesConf = conf;
    console.log("[Security] vu.face.setGestureConf: Gesture configuration set successfully.");
    return true;
};

// Secure getter function for gesture configuration
vu.face.getGestureConf = function() {
    return gesturesConf;
};

vu.face.rotationConf = [['up', 40],
                            ['down', 40],
                            ['left', 50],
                            ['right', 50]];

vu.face.start = function() {
    vu.face.doLoop = true;
}
vu.face.stop = function() {
    vu.face.doLoop = false;
}

vu.face.load = async function(videoElement, basePath, tfPath) {
    //console.log("basePath", basePath);
    const faceDetection = vu.sop.face.objectDetectionAndRotation.loadModel(basePath, tfPath);
    const directionAndGesture = vu.sop.face.model.directionsAndGestures.loadModel(basePath, tfPath);
    vu.face.canvas = document.createElement('canvas');
    vu.face.canvasContext = vu.face.canvas.getContext("2d", { willReadFrequently: true });
    vu.face.canvasInference = document.createElement('canvas');
    vu.face.canvasInferenceContext = vu.face.canvasInference.getContext("2d", { willReadFrequently: true });
    await faceDetection;
    await directionAndGesture;
    // console.log("faceDetection", faceDetection);
    // console.log("directionAndGesture", directionAndGesture);
    return true;
};

vu.face.getRotationAndGestures = async function(canvas) {
    let data = await vu.sop.face.model.directionsAndGestures.predictAsync(canvas);

    let x = 'center';
    if ( data['face_looking_left'] > data['face_looking_right'] &&
        data['face_looking_left'] > vu.face.rotationConf[2][1]
    ) {
        if (vu.face.invertXAxis) {
            x = 'right';
        } else {
            x = 'left';
        }
    } else {
        if (data['face_looking_right'] > vu.face.rotationConf[3][1]) {
            if (vu.face.invertXAxis) {
                x = 'left';
            } else {
                x = 'right';
            }
        }
    }

    let y = 'center';
    if ( data['face_looking_up'] > data['face_looking_down'] &&
        data['face_looking_up'] > vu.face.rotationConf[0][1]
    ) {
        y = 'up';
    } else {
        if (data['face_looking_down'] > vu.face.rotationConf[1][1]) {
            y = 'down';
        }
    }

    //console.log('smile:', gestures['smile'], 'eyes:', gestures['bothEyesClosed'])
    let result = [];
    if (data['smile'] > gesturesConf[0][1]) {
        result.push('smileRight');
        result.push('smileLeft');
    }
    if (data['closed_eyes'] > gesturesConf[1][1]) {
        result.push('eyeRightClose');
        result.push('eyeLeftClose');
    }
    return [[x, y], result];
};


vu.face.frameData = {};
vu.face.frameData.FPSLimit = 5;             // Limitar los cuadros procesados a un maximo de X por segundo
vu.face.frameData.frames = [];              // La informacion de los cuadros
vu.face.frameData.processingFrame = false;  // Estamos en el medio de procesamiento de cuadros ?

/*
{
-    'image': HTMLCanvasElement,                                     // El canvas con la imagen del cuadro
-    'startTime': Date,                                              // Timestamp de inicio del analisis del cuadro
-    'endTime': Date                                                 // Timestamp de finalización del cuadro
-    'latency': int                                                  //
-    'isBright': bool,                                               // Esperado "true" (la imagen tiene luz suficiente)
-    'isBrightVal': float,                                           // Valor interno del detector de brillo
-    'isBrightMin': vu.image.brightnessDetector.minResult,           // Valor minimo de brillo esperado
-    'brightSpot': bool,                                             // Esperado "false" (imagen sin punto de brillo)
-    'brightSpotVal': float,                                         // Valor interno del detector de punto de brillo
-    'brightSpotMax': float,                                         // Valor maximo del detector de punto de brillo
-    'phash': string,                                                // Valor interno del detector de similitud de imagen
-    'face': {
-        'box': [ x1, y1, x2, y2],                                   // Coordenada X del centro de la cara
-        'confidence': float,                                        // Confianza de la detección de la cara
-        'sizeRelative': string,                                     // ok, small, big
-        'sizeRelativeVal': int,                                     // Tamaño de la cara en relación al tamaño del video (porcentaje)
-        'sizeRelativeMax': int,                                     // Tamaño máximo de la cara en relación al tamaño del video (porcentaje)
-        'sizeRelativeMin': int,                                     // Tamaño mínimo de la cara en relación al tamaño del video (porcentaje)
-        'faceCenter': bool,                                         // El rostro esta centrado OK (true) o no (false)
-        'faceCenterYDistance': int,                                 // Distancia en píxeles del centro del rostro al centro del video (eje Y)
-        'faceCenterXDistance': int,                                 // Distancia en píxeles del centro del rostro al centro del video (eje X)
-        'isBright': bool,                                           // Esperado "true" (el rostro tiene luz suficiente)
-        'isBrightVal': float,                                       // Valor interno del detector de brillo
-        'isBrightMin': vu.image.brightnessDetector.minResult,       // Valor minimo de brillo esperado
-        'isBlurry': bool,                                           // La imagen esta borrosa (true) o no (false)
-        'isBlurryVal': float,                                       // Valor interno del detector de borrosidad, mayor es mas borroso
-        'isBlurryMaxLimit': vu.image.blurDetector.minResult,        // Valor máximo del detector de borrosidad
-        'gestures': string                                          // Gesto detectado ['closed_eyes', 'face_looking_down',
-                                                                    // 'face_looking_left', 'face_looking_right',
-                                                                    // 'face_looking_up', 'face_neutral', 'open_mouth', 'smile']
    }
}
*/
vu.face.currentFaceSize;

vu.face.getData = async function() {
    // Subimos la informacion del video al debug
    if (vu.face.doLoop) {
        vu.sop.ui.debug.info.push(['Video width', moduleCamera.video.videoWidth + 'px']);
        vu.sop.ui.debug.info.push(['Video height', moduleCamera.video.videoHeight + 'px']);
        vu.sop.ui.debug.info.push(['Video offsetWidth', moduleCamera.video.offsetWidth + 'px']);
        vu.sop.ui.debug.info.push(['Video offsetHeight', moduleCamera.video.offsetHeight + 'px']);
        vu.sop.ui.debug.info.push(['Video Center', '<span style="font-weight: bolder; color: darkblue;">POINT</span>']);
        vu.sop.ui.debug.info.push(['Face Center', '<span style="font-weight: bolder; color: #1DC600;">POINT</span>']);
    };
    if (vu.face.doLoop) {
        let color;
        // Generamos la informacion del cuadro de video
        let frameData = false;
        while (frameData === false) {
          frameData = await vu.face.frameDataLoop();
          if (frameData === false) {
            await new Promise(res => setTimeout(res, 10)); // Espera 10ms antes de volver a intentar
          }
        }
        // -------------------------------------------------------------------------------------------------------------
        //console.log("vu.face.auth.frameConsistencyEnabled", vu.face.auth.frameConsistencyEnabled);
        //console.log("vu.face.auth.frameConsistencyMax", vu.face.auth.frameConsistencyMax);
        if (vu.face.frameData.frames.length > 2 && vu.face.auth.frameConsistencyEnabled) {
            const secondLastFramePhash = vu.face.frameData.frames[vu.face.frameData.frames.length - 2].phash;
            const lastFramePhash = vu.face.frameData.frames[vu.face.frameData.frames.length - 1].phash;
            const frameConsistency = vu.image.phash.compare(lastFramePhash, secondLastFramePhash);

            if (frameConsistency >= vu.face.auth.frameConsistencyMax ) { color = 'red'} else { color = '#1DC600'}
            vu.sop.ui.debug.info.push(['Frame Consistency', '<span style="font-weight: bolder; color: ' + color + ';">' + frameConsistency + '</span>'])
            //vu.face.frameConsistency.push([frameConsistency, 1]); // No tiene porque ingresar el tiempo
            if (vu.sop.ui.debug.enable) {
                vu.sop.ui.debug.timeLine.frameConsistency = vu.face.frameConsistency;
            }
        }

        if (vu?.sop?.ui?.debug?.perf && typeof frameData?.latency === 'number') {
            vu.sop.ui.debug.perf.push(['loop', `${frameData.latency}ms`]);
        }

        // Procesamos los datos del cuadro
        if (frameData?.hasOwnProperty('face')) {
            // Debug y telemetría
            if (vu.sop.ui.debug.enable || vu.sop.enableTelemetry) {
                vu.sop.ui.debug.eval.push(['Face confidence', frameData.face.confidence + "%", 'white']);

                if (frameData.face.sizeRelative === "big" || frameData.face.sizeRelative === "small") { color = 'red';} else { color = '#1DC600';}
                vu.sop.ui.debug.eval.push(['Face size', frameData.face.sizeRelative, color]);
                vu.sop.ui.debug.eval.push(['Face size', Math.round(frameData.face.sizeRelativeVal) + "%", color]);
                vu.sop.ui.debug.eval.push(['Face min size', Math.round(frameData.face.sizeRelativeMin) + '%', 'white']);
                vu.sop.ui.debug.eval.push(['Face max size', Math.round(frameData.face.sizeRelativeMax) + '%', 'white']);

                if (!frameData.face.faceCenter) { color = 'red'; } else { color = '#1DC600'; };
                vu.sop.ui.debug.eval.push(['Face center', frameData.face.sizeRelativeVal, color]);
                vu.sop.ui.debug.eval.push(['Face X Distance', Math.round(frameData.face.faceCenterXDistance) + 'px', color]);
                vu.sop.ui.debug.eval.push(['Face Y Distance', Math.round(frameData.face.faceCenterYDistance) + 'px', color]);

                if (frameData.face.isBright) { color = '#1DC600'; } else { color = 'red'; };
                vu.sop.ui.debug.eval.push(['Face is bright', frameData.face.isBright, color]);
                vu.sop.ui.debug.eval.push(['Face is bright val', frameData.face.isBrightVal, color]);
                vu.sop.ui.debug.eval.push(['Face is bright min', frameData.face.isBrightMin, 'white']);

                if (frameData.face.isBlurry) { color = 'red'; } else { color = '#1DC600'; };
                vu.sop.ui.debug.eval.push(['Face blurry', frameData.face.isBlurry, color]);
                vu.sop.ui.debug.eval.push(['Face blurry val', frameData.face.isBlurryVal, color]);
                vu.sop.ui.debug.eval.push(['Face blurry max', frameData.face.isBlurryMaxLimit, 'white']);

                let orientation = "";
                frameData.face.gestures[0].forEach(function(orient) { orientation += " " + orient; });
                vu.sop.ui.debug.eval.push(['Face Orient', orientation, '#1DC600']);

                let gestures = "";
                frameData.face.gestures[1].forEach(function(gesture) { gestures += " " + gesture; });
                vu.sop.ui.debug.eval.push(['Face gesture', gestures, '#1DC600']);
            };

            if (vu.sop.ui.debug.enable) {
                vu.sop.ui.debugDraw();
                vu.sop.ui.drawVideoCenter();
                vu.face.ui.gestures.drawBox(frameData.face.box);
            } else {
                vu.sop.ui.cleanResults();
            }

            vu.face.currentFaceSize = frameData.face.sizeRelative;
            return [true,
                frameData.face.gestures[0],
                frameData.face.gestures[1],
                frameData.face.isBright[0],
                frameData.face.isBlurry[0],
                frameData.face.sizeRelative];
        } else {
            // Si no hay datos de rostro, retornamos un objeto con valores por defecto
            return [false, ['center', 'center'], [], true, false];
        }
    }
};

vu.face.frameDataLoop = async function() {
    // Validamos si hay que procesar el cuadro
    // Si ya estamos procesando un cuadro
    if (vu.face.frameData.processingFrame) {
        return false;
    }
    // Validamos si no tenemos que hacer obtener la informacion del cuadro o respetar el límite de fps.
    if (vu.face.frameData.frames.length > 0) {
        // Validamos que el tiempo entre este momento y el último cuadro procesado respete el limite de FPS
        if (new Date() - vu.face.frameData.frames[vu.face.frameData.frames.length - 1].startTime < (1000 / vu.face.frameData.FPSLimit)) {
            return false;
        };
    };
    vu.face.frameData.processingFrame = true;

    let frame = {};
    frame.startTime = new Date();

    // Obtememos el frame
    frame.image = document.createElement('canvas');
    const frameCanvasCtx = frame.image.getContext("2d", { willReadFrequently: true });
    frame.image.width = moduleCamera.video.videoWidth;
    frame.image.height = moduleCamera.video.videoHeight;

    // Defensive check to avoid drawing from a video with 0 dimensions
    if (frame.image.width === 0 || frame.image.height === 0) {
        console.warn('[vu.face.frameDataLoop] 🚫 Skipping frame — video stream not ready (0 dimensions)');
        vu.face.frameData.processingFrame = false;
        return null;
    }    

    frameCanvasCtx.drawImage(moduleCamera.video, 0, 0, frame.image.width, frame.image.height);

    // Solicitamos los datos
    let faceBox = await vu.sop.face.objectDetectionAndRotation.predictAsync(frame.image);

    // Set Preferences
    vu.image.brightnessDetector.minResult = 30;
    vu.image.blurDetector.resize = 224;
    vu.image.blurDetector.minResult = 1.3;

    let isBright = vu.image.brightnessDetector.isBrightAsync(frame.image);
    let brightSpot = vu.image.brigthSpotDetector.hasABrightSpotAsync(frame.image);
    let phash = vu.image.phash.calculate(frame.image);

    // -----------------------------------------------------------------------------------------------------------------
    if (faceBox.length > 0) {
        frame.face = {};
        frame.face.confidence = Math.round(faceBox[0][2]*100);
        frame.face.box = faceBox[0][1];

        // -------------------------------------------------------------------------------------------------------------
        // Set Preferences
        vu.image.brightnessDetector.minResult = 30;
        vu.image.blurDetector.resize = 224;
        vu.image.blurDetector.minResult = 1.3;
        let maxDistanceFromTheCenter = 0.25;

        // -------------------------------------------------------------------------------------------------------------
        // Obtenemos los datos del rostro
        vu.face.cutFace(faceBox, frame.image); // Cargamos el recorte del rostro en vu.face.canvas
        let faceRotationAndGestures = vu.face.getRotationAndGestures(vu.face.canvasInference);
        let faceIsBright = vu.image.brightnessDetector.isBrightAsync(vu.face.canvas);
        let faceIsBlurry = vu.image.blurDetector.isBlurryAsync(vu.face.canvas);

        // Calculamos el tamaño del rostro en relación con el video
        const faceCenterX = faceBox[0][1][0] + (faceBox[0][1][2]/2);
        const faceCenterY = faceBox[0][1][1] + (faceBox[0][1][3]/2);
        const videoCenterX = moduleCamera.video.videoWidth/2;
        const videoCenterY = moduleCamera.video.videoHeight/2;

        // Face Is Centered ?
        frame.face.faceCenter = true;
        if (Math.abs(faceCenterY - videoCenterY) > (videoCenterY * maxDistanceFromTheCenter)) {
            frame.face.faceCenter = false;
        }
        if (Math.abs(faceCenterX - videoCenterX) > (videoCenterX * maxDistanceFromTheCenter)) {
            frame.face.faceCenter = false;
        }
        frame.face.faceCenterYDistance = Math.round(faceCenterY - videoCenterY);
        frame.face.faceCenterXDistance = Math.round(faceCenterX - videoCenterX);

        // Is face size OK ?
        frame.face.sizeRelative = 'ok';
        if (moduleCamera.isVerticalVideo()) {
            size = (faceBox[0][1][2] / moduleCamera.video.videoWidth);
            if (size < vu.face.faceSizeMin) { frame.face.sizeRelative = 'small'; }
            if (size > vu.face.faceSizeMax) { frame.face.sizeRelative = 'big'; }
        } else {
            size = (faceBox[0][1][3] / moduleCamera.video.videoHeight);
            if (size < vu.face.faceSizeMin) { frame.face.sizeRelative = 'small'; }
            if (size > vu.face.faceSizeMax) { frame.face.sizeRelative = 'big'; }
        }
        frame.face.sizeRelativeVal = Math.round(size*100);
        frame.face.sizeRelativeMax = Math.round(vu.face.faceSizeMax * 100) ;
        frame.face.sizeRelativeMin = Math.round(vu.face.faceSizeMin * 100);

        // Is face Blurry
        faceIsBlurry = await faceIsBlurry;
        frame.face.isBlurry = faceIsBlurry[0];
        frame.face.isBlurryVal = parseFloat(faceIsBlurry[1].toFixed(2));
        frame.face.isBlurryMaxLimit = vu.image.blurDetector.minResult;

        // Is face Bright
        faceIsBright = await faceIsBright;
        frame.face.isBright = faceIsBright[0];
        frame.face.isBrightVal = parseFloat(faceIsBright[1].toFixed(2));
        frame.face.isBrightMin = vu.image.brightnessDetector.minResult;

        // Gestures and Rotation
        faceRotationAndGestures = await faceRotationAndGestures;
        frame.face.gestures = faceRotationAndGestures;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // Retornamos los valores
    isBright = await isBright;
    frame.isBright = isBright[0];
    frame.isBrightVal = isBright[1];
    frame.isBrightMin = vu.image.brightnessDetector.minResult;

    brightSpot = await brightSpot;
    frame.brightSpot = brightSpot[0];
    frame.brightSpotVal = brightSpot[1];
    frame.brightSpotMin = vu.image.brigthSpotDetector.minResult;

    frame.phash = await phash;

    // -----------------------------------------------------------------------------------------------------------------
    // Guardamos los resultados y limpiamos resultados viejos
    frame.endTime = new Date();
    frame.latency = (frame.endTime - frame.startTime).valueOf();
    vu.face.frameData.frames.push(frame);

    // CleanUP frames Data (No memory leaks)
    if (vu.face.frameData.frames.length > 100) {
        vu.face.frameData.frames.shift();
    }
    // CleanUP frames Images (No memory leaks)
    if (vu.face.frameData.frames.length >= 11) {
        delete vu.face.frameData.frames[0].image;
    }
    // Indicamos que dejamos de procesar el cuadro
    vu.face.frameData.processingFrame = false;

    return frame;
};

vu.face.cutFace = function(box, frameCanvas) {
    let borderDecimal = -0.2
    let borderHorizontal = Math.round(box[0][1][2] * borderDecimal)
    let borderVertical =  Math.round(box[0][1][3] * borderDecimal)
    vu.face.canvas.height = box[0][1][3] - (borderVertical*2);
    vu.face.canvas.width = vu.face.canvas.height;

    let horizontalCenterOffset = Math.round((vu.face.canvas.height - box[0][1][2])/4)
    //canvas.width = box[0][1][2] - (borderHorizontal*2);
    vu.face.canvasContext.drawImage(frameCanvas,
        -(box[0][1][0] + borderHorizontal - horizontalCenterOffset),
        -(box[0][1][1] + borderVertical)
    );
    /*--------------------------*/
    vu.face.canvasInference.height = box[0][1][3];
    vu.face.canvasInference.width = box[0][1][2];
    vu.face.canvasInference.style.width  = '400px';
    vu.face.canvasInference.style.height = '300px';

    vu.face.canvasInferenceContext.drawImage(moduleCamera.video,
        -box[0][1][0], -box[0][1][1]
    );
};

    // Return the API object for UMD
    return vu.face;
}));
