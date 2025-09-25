import vuSopUi from 'vu.sop.ui'; //
import vuExtras from 'vu.extras'; //
import vuError from 'vu.error'; //
import vuSopAudio from 'vu.sop.audio'; //
import vuCamera from 'vu.camera'; //

import vuImage from 'vu.image'; //
import vuScreenCapture from 'vu.screen.capture'; //
import vuFaceUi from 'vu.face.ui'; //
//import vuFaceAuth from 'vu.face.auth'; //


import vuSopFaceObjectDetectionAndRotation from 'vu.sop.face.objectDetectionAndRotation'; //
import vuSopFaceModelDirectionsAndGestures from 'vu.sop.face.model.directionsAndGestures'; //
import { loadSuspiciousCameraKeywords, getXstats } from './vu.camera.utils.js';
import { UltraAnalyticsSDK } from 'vu.stats';

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
    await loadSuspiciousCameraKeywords(basePath, techStack);
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

            vu.face.auth.useHighResolutionSettingsInPCCamera = true
            vu.face.auth.useHighResolutionSettingsInMobileCamera = true
        } 
        else {
            console.log('Challenge orientation model', vu.face.auth.faceOrientationModelWeights)
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
            loadAudioLang = false
        } else {
            console.log("Audio loading is enabled by configuration");
            loadAudioLang = true
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
            console.log('Loading mixedChallenge mode')
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
            console.log('Loading challenge orientation')
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

        document.getElementById('vu.sop.ui.userName').placeholder = vu.sop.msg.userInputPlaceholder
        document.getElementById('vu.sop.ui.userNameSendBtn').innerHTML = vu.sop.msg.userSendBtn

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
        console.log('Network Loading Error')
        console.log(e)
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
        console.log(e)
        await vu.error.showError(new vu.error.LoadError(e.message));
    }
}

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
    vu.sop.ui.user.start.resolve(true)
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
                    vuCamera.config.previewResolution = 'highest'
                    vuCamera.config.pictureResolution = 'highest'
                }
            } else {
                console.log("vu.face.auth.useHighResolutionSettingsInPCCamera", vu.face.auth.useHighResolutionSettingsInPCCamera);
                if (vu.face.auth.useHighResolutionSettingsInPCCamera) {
                    vuCamera.config.previewResolution = 'highest'
                    vuCamera.config.pictureResolution = 'highest'
                }
            }
            vuCamera.config.orientation = 'user'

            await vuCamera.start("vu.sop.ui.video");

            vu.sop.ui.flipVideoHorizontal(vuCamera.video)
            console.log('Warming Up Start')
            if (vu.face.auth.warmUpFaceModelAsync) {
                console.log("vu.face.auth.warmUpFaceModelAsync", vu.face.auth.warmUpFaceModelAsync);
                vu.face.auth.faceModelLoad = vu.face.load(vuCamera.video, vu.face.auth.basePath, vu.sop.tfPath);
            } else {
                await vu.face.load(vuCamera.video, vu.face.auth.basePath, vu.sop.tfPath);
            }
            break
        } catch (e) {
            await vu.sop.ui.hideWhiteLoading();
            console.log(e)
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
                await vu.sop.ui.hideWhiteLoading()
                // Espera a que se resuelva la pantalla del usuario
                await vu.sop.ui.user.start()
            } else {
                // vu.face.auth.loginFlag = true;
                await vu.sop.ui.user.doPreSetUser(vu.face.auth.userNameValue, true);
            }

            if (vu.face.auth.warmUpFaceModelAsync)
                await vu.face.auth.faceModelLoad

            await vu.sop.ui.user.hide()
            break
        } catch (e) {
            console.log('vu.sop.ui.user', e)
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
            await vu.sop.ui.hideWhiteLoading()
            await vu.face.auth.startRecording();
            await vu.sop.ui.showVideo()
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
                response = await vu.face.auth.stopRecording()
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
                console.log("Enable selfie list " + vu.face.auth.enableSelfieList)
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
            await vu.sop.ui.hideLoading()
            await vu.face.auth.release();
            break
        } catch (e) {
            vu.face.auth.screenRecorder.sendVideo = false;
            await vu.sop.ui.hideLoading()
            console.log(e)
            let msg = 'faceError'
            if (e.code !== undefined) {
                if (e.code == '1001') {
                    msg = 'userNotExist'
                } else if (e.code == '2001') {
                    msg = 'failAuth'
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

}

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
                console.log("video record error:", e)
                await vu.sop.ui.hideWhiteLoading()
                // TODO pendiente porque face no tiene telemetria
                // if(vu.face.auth.enableTelemetry){
                //     vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SCREEN_RECORDING_ERROR});
                // }
                await vu.error.showError(new vu.error.UserError('startRecordingFail'));
                throw e;
            }
        }
    }
}

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
}


if (typeof window !== 'undefined') {
    window.vuFaceAuth = vu.face.auth;
    //console.log('vuFaceAuth is attached to the window:', window.vuFaceAuth);
} else if (typeof global !== 'undefined') {
    global.vuFaceAuth = vu.face.auth;
}

export default vu.face.auth;