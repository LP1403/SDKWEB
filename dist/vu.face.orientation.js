
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

 */
// Reference the existing vu object
const vu = window.vu || {};
vu.face = vu.face || {};

let moduleCamera = null;

vu.face.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    // Proceed to use vu.sop safely
    vu.sop.msg = window.vu.sop.msg || {};
    vu.sop.audio = window.vu.sop.audio || {};
    vu.sop.steps = window.vu.sop.steps || {};
    vu.image = window.vu.image || {};

    if(window.vu.face.nncPath != vu.face.nncPath)
        vu.face.nncPath = window.vu.face.nncPath;  
    
    moduleCamera = camera;
}


// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.face == "undefined") { vu.face = function() {} }

vu.face.loadStatus = 'no' // no - wip - ok
vu.face.canvasId = 'vu.sop.ui.faceTransferCanvas'
vu.face.invertXAxis = true

/*          */
vu.face.detected = true
vu.face.rotation = [0.5, 0.5]


// Private variable for gesture configuration - not exposed directly
let gesturesConf = [['smileRight',0.3],
                    ['smileLeft',0.3],
                    ['eyeBrowLeftDown',0.3],
                    ['eyeBrowRightDown',0.3],
                            ['eyeBrowLeftUp',0.5],
                            ['eyeBrowRightUp',0.5],
                            ['mouthOpen',0.5],
                            ['mouthRound',1],
                            ['eyeRightClose',0.2],
                            ['eyeLeftClose',0.2],
                            ['mouthNasty',0.5]];

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

vu.face.rotationConf = [['up', -0.2],
                            ['down', 0.2],
                            ['left', 0.3],
                            ['right',-0.3]]

vu.face.start = function() {
    JEEFACEFILTERAPI.toggle_pause(false)
}
vu.face.stop = function() {
    JEEFACEFILTERAPI.toggle_pause(true)
}

vu.face.load = async function(videoElement) {
    // console.log("vu.face.nncPath", vu.face.nncPath);
    let promise = new Promise(function (resolve, reject) {
        vu.face.loadStatus = 'wip'
        //JEEFACEFILTERAPI.switch_displayVideo(false)
        //JEEFACETRANSFERAPI.switch_sleep(true)
        JEEFACEFILTERAPI.init({
            canvasId: vu.face.canvasId,
            NNCPath: vu.face.nncPath,
            videoSettings: {
                videoElement: videoElement
            },
            callbackReady: function (errCode) {
                if (errCode && errCode !== "ALREADY_INITIALIZED") {
                    console.log('ERROR - CANNOT INITIALIZE FACEAPI : errCode =', errCode);
                    return;
                }
                console.log('INFO : FACEAPI is ready !!!');
                setTimeout(function () {
                    JEEFACEFILTERAPI.toggle_pause(true)
                    vu.face.loadStatus = 'ok'
                    resolve(true)
                }, 1000)
            },
            callbackTrack: function(detectState){
                // console.log("detectState.detected", detectState.detected);
                if (detectState.detected > 0.3) {
                    vu.face.detected = true
                    vu.face.rotation = [detectState.rx, detectState.ry]
                    //console.log(vu.face.rotation)
                } else {
                    vu.face.detected = false
                }
            } //end callbackTrack()
        });
    })
    return promise;
}

vu.face.getRotation = function() {
    //rotation = JEEFACETRANSFERAPI.get_rotation()
    //rotation = JEEFACEFILTERAPI.get_rotationStabilized()
    // console.log("vu.face.rotation", vu.face.rotation);
    // console.log("window.vu.face.rotation", window.vu.face.rotation);
    let rotation = vu.face.rotation

    let x = 'center'
    if (rotation[1] < vu.face.rotationConf[3][1]) {
        if (vu.face.invertXAxis) {
            x = 'right'
        } else {
            x = 'left'
        }
    }
    if (rotation[1] > vu.face.rotationConf[2][1]) {
        if (vu.face.invertXAxis) {
            x = 'left'
        } else {
            x = 'right'
        }
    }
    let y = 'center'
    if (rotation[0] < vu.face.rotationConf[0][1]) {
        y = 'up'
    }
    if (rotation[0] > vu.face.rotationConf[1][1]) {
        y = 'down'
    }
    return [x, y]
}

vu.face.getGestures = function() {
    //gestures = JEEFACEFILTERAPI.get_morphTargetInfluencesStabilized();
    let result = []
    /*for (i = 0; i < gestures.length; i++) {
        if ( gestures[i] >  gesturesConf[i][1]) {
            result.push(gesturesConf[i][0])
            //console.log(gesturesConf[i][0], gestures[i])
        }
    }*/
    return result
}

vu.face.getData = function(){
    return [vu.face.detected, vu.face.getRotation(), vu.face.getGestures()]
}

    // Return the API object for UMD
    return vu.face;
}));