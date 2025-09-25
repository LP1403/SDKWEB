import vuSopUi from 'vu.sop.ui'; //
import vuExtras from 'vu.extras'; //
import vuError from 'vu.error'; //
import vuSopDocumentCodes from 'vu.sop.documentCodes'; //
import vuSopAudio from 'vu.sop.audio'; //
import vuCamera from 'vu.camera'; //
import vuSopDocumentObjectDetection from 'vu.sop.document.objectDetection'; //
//import vuSopApi from 'vu.sop.api';
import vuSopDocumenUi from 'vu.sop.document.ui'; //
import vuImage from 'vu.image'; //
import vuScreenCapture from 'vu.screen.capture'; //
import vuFaceUi from 'vu.face.ui'; //
import vuFaceAuth from 'vu.face.auth'; //
import vuBarcode from 'vu.sop.barcode'; //
//import vuFaceGesture from 'vu.face.gestures';
import vuTelemetry from 'vu.telemetry'; //
import vuSopFaceObjectDetectionAndRotation from 'vu.sop.face.objectDetectionAndRotation'; //
import vuSopFaceModelDirectionsAndGestures from 'vu.sop.face.model.directionsAndGestures'; //
import { loadSuspiciousCameraKeywords, getXstats } from './vu.camera.utils.js';
import { UltraAnalyticsSDK } from 'vu.stats';

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

vu.sop.useTheSameCameraInDocAndFaceInPC = false
vu.sop.useTheSameCameraInDocAndFaceInMobile = false

vu.sop.setCameraOrientationInPC = 'auto'        // auto ( environment for document, user for selfie), environment, user
vu.sop.setCameraOrientationInMobile = 'auto'    // auto ( environment for document, user for selfie), environment, user

vu.sop.checkCameraFocusCapabilitiesInPC = false          // Muestra un warning si no hay control de foco en PC
vu.sop.checktCameraFocusCapabilitiesInMobile = false    // Muestra un warning si no hay control de foco en Mobile

vu.sop.setDocumentBackgroudStyleMirror = false

vu.sop.setHEICFileFormatSupport = true
vu.sop.enableSelfieList = false
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
    await loadSuspiciousCameraKeywords(basePath, techStack);

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
            console.log('Challenge orientation model', vu.sop.faceOrientationModelWeights)
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
            loadAudioLang = false
        } else {
            console.log("Audio Load is enabled by conf");
            loadAudioLang = true
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
            console.log('Loading mixedChallenge mode')
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
            console.log('Loading challenge orientation')
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
        console.log('Network Loading Error')
        console.log(e)
        throw new Error('NETWORK_ERROR');
    };

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
        vu.sop.ui.showWhiteLoading()
    };
};

// vu.sop.load = async function(basePath) {
//     console.warn("Warning: 'vu.sop.load' is deprecated and will be removed in future versions. Please use 'vu.sop.initialize' instead.");
// };

vu.sop.getBase64  = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(evt){
        let fileFormat = file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase()
        console.log("Formato de la imagen:",fileFormat)
        let supportedFormats = ['JPG', 'JPEG', 'PNG', 'WEBP', 'AV1']
        // HEIC Support
        if (vu.sop.setHEICFileFormatSupport) { supportedFormats.push('HEIC') }

        if (!supportedFormats.includes(fileFormat)) {
            reject(new Error('badImageFormat'))
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
                    reject(new Error('badImageFormat'))
                });
            }).catch(function (x) {
                reject(new Error('badImageFormat'))
            });
        } else {
            img.src = evt.target.result;
        }

        img.onload = function() {
            let maxSize = 1990
            let minSize = 720

            let canvas;
            let ctx;
            let result;
            let newHeight;
            let newWidth;

            if (img.height < minSize || img.width < minSize ){
                reject(new Error('smallDocumentImg'))
            } else if (maxSize > img.height && maxSize > img.width ) {
                canvas = document.createElement('canvas');
                canvas.height = img.height;
                canvas.width = img.width;
                ctx = canvas.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, img.width, img.height);
                result = canvas.toDataURL("image/jpeg", 0.9);
                resolve(result)
            } else {
                canvas = document.createElement('canvas');
                if (img.height > img.width) {
                    newHeight = maxSize
                    newWidth = Math.round((img.width * maxSize) / img.height)
                } else {
                    newHeight = Math.round((img.height * maxSize) / img.width)
                    newWidth = maxSize
                }
                console.log('Upload Img Resize from' , img.width, img.height, ' to ', newWidth, newHeight)
                canvas.height = newHeight;
                canvas.width = newWidth;
                ctx = canvas.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                result = canvas.toDataURL("image/jpeg", 0.9);
                resolve(result)
            }
        }
    }
    //reader.onerror = error => reject(new Error('badImageFormat'));
    reader.onerror = function(evt){
        console.log('onerror', evt)
        reject(new Error('badImageFormat'));
    }
  });
};

vu.sop.videoResizeObserverAction = function(){
    let vid;
    let vidContainer;
    console.log("vu.sop.videoResizeStyleFillContainer", vu.sop.videoResizeStyleFillContainer);
    if (document.getElementById('vu.sop.ui.video') !== null) {
        if (vu.sop.videoResizeRules == 'doc') {
            console.log('Video element change, applying styles: doc')
            vid = document.getElementById('vu.sop.ui.video')
            if (window.innerHeight > window.innerWidth) {
                // Si la pantalla esta en vertical
                if (vuCamera.isVerticalVideo()) {
                    // Si el video esta en vertical
                    if (vu.sop.videoResizeStyleFillContainer) {
                        console.log('Rules doc - Vertical Screen - Vertical video - fill yes')
                        vid.style.maxWidth = "inherit";
                        vid.style.maxHeight = "fit-content";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    } else {
                        console.log('Rules doc - Vertical Screen - Vertical video - fill no')
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    }
                } else {
                    if (vu.sop.videoResizeStyleFillContainer) {
                        console.log('Rules doc - Vertical Screen - Horizontal video - fill yes')
                        vid.style.maxWidth = "fit-content";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    } else {
                        console.log('Rules doc - Vertical Screen - Horizontal video - fill no')
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "auto";
                        vid.style.height = "auto";
                    }
                }
            } else {
                if (vu.sop.videoResizeStyleFillContainer){
                    console.log('Rules doc - Horizontal Screen - Horizontal video - fill yes')
                    vid.style.maxWidth = "fit-content";
                    vid.style.maxHeight = "inherit";
                    vid.style.width = "auto";
                    vid.style.height = "auto";
                } else {
                    console.log('Rules doc - Horizontal Screen - Horizontal video - fill no')
                    // Si la pantalla esta en horizontal
                    vid.style.maxHeight = "100%";
                    vid.style.maxWidth = "100%";
                    vid.style.width = "auto";
                    vid.style.height = "auto";
                }
            }
            let bg = document.getElementById('vu.sop.document.ui.background')
            bg.style.maxWidth = vuCamera.video.offsetWidth + "px";
            //bg.style.maxHeight = vuCamera.video.offsetHeight + "px";
        }
        if (vu.sop.videoResizeRules == 'face') {
            console.log('Video element change, applying styles: face')
            vid = document.getElementById('vu.sop.ui.video')
            vidContainer = document.getElementById("vu.sop.ui.videoContainer")

            if (window.innerHeight > window.innerWidth) {
                // Si la pantalla esta en vertical
                if (vuCamera.isVerticalVideo()) {
                    if (vu.sop.videoResizeStyleFillContainer) {
                        //alert('Rules face - Vertical Screen - Vertical video - fill yes')
                        console.log('Rules face - Vertical Screen - Vertical video - fill yes')
                        // Si el video esta en vertical
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "none";
                        vid.style.width = "100%";
                        vid.style.height = "auto";
                    } else {
                        //alert('Rules face - Vertical Screen - Vertical video - fill no')
                        console.log('Rules face - Vertical Screen - Vertical video - fill no')
                        // Si el video esta en vertical
                        vid.style.maxWidth = "100%";
                        vid.style.maxHeight = "inherit";
                        vid.style.width = "100%";
                        vid.style.height = "auto";
                    }
                } else {
                    if (vu.sop.videoResizeStyleFillContainer) {
                        // Si el video esta en horizontal
                        let proportionVideo = vid.offsetHeight / vid.offsetWidth
                        let proportionContainer = vidContainer.offsetHeight / vidContainer.offsetWidth

                        if ( proportionVideo < proportionContainer) {
                            console.log('Rules face - Vertical Screen - Horizontal video - fill yes - 1')
                            vid.style.maxWidth = "fit-content";
                            vid.style.maxHeight = "100%";
                            vid.style.width = "auto";
                            vid.style.height = "100%";
                        } else {
                            console.log('Rules face - Vertical Screen - Horizontal video - fill yes - 2')
                            vid.style.maxWidth = "100%";
                            vid.style.maxHeight = "fit-content";
                            vid.style.width = "100%";
                            vid.style.height = "auto";
                        }
                    } else {
                        console.log('Rules face - Vertical Screen - Horizontal video - fill no')
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
                    console.log('Rules face - Horizontal Screen - Vertical video - fill no')
                    // Si el video esta en vertical
                    vid.style.maxWidth = "100%";
                    vid.style.maxHeight = "inherit";
                    vid.style.width = "100%";
                    vid.style.height = "auto";
                } else {
                    // Si el video esta en horizontal
                    if (vu.sop.videoResizeStyleFillContainer) {
                        console.log('Rules face - Horizontal Screen - Horizontal video - fill yes')
                        vid.style.maxWidth = "fit-content";
                        vid.style.maxHeight = "100%";
                        vid.style.width = "auto";
                        vid.style.height = "100%";
                    } else {
                        console.log('Rules face - Horizontal Screen - Horizontal video - fill no')
                        vid.style.maxWidth = "inherit";
                        vid.style.maxHeight = "100%";
                        vid.style.width = "auto";
                        vid.style.height = "100%";
                    }
                }
            }
        }
    }

}

vu.sop.videoResizeRules = 'doc'
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

if (typeof vu.sop.steps == "undefined") { vu.sop.steps = function() {} }

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
                console.log("video record error:", e)
                await vu.sop.ui.hideWhiteLoading()
                if(vu.sop.enableTelemetry){
                    vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SCREEN_RECORDING_ERROR});
                }
                await vu.error.showError(new vu.error.UserError('startRecordingFail'));
                throw e;
            }
        }
    }
}

vu.sop.stopRecording = async function() {
    if (vu.sop.ui.isMobile()) {
        try {
            if (vu.screen.capture.doCaptureLoop) {
                return vu.screen.capture.recordVideoStop()
            } else {
                console.log("No Screen record active")
            }
        } catch(e){
            console.log("No Screen record active")
        }
    } else {
        // TODO - Mover screenRecorder a vu.screen.capture
        if( vu.sop.screenRecorder.sendVideo === false) {
            try {
                vu.sop.screenRecorder.stream.getTracks().forEach(track => {
                    track.stop();
                });
            } catch(e){
                console.log("No Screen record active")
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
        };
    }
}



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
                vu.sop.ui.alert(vu.sop.msg.cameraWithoutFocusControl)
            }
        }
    } else {
        // Es una PC
        if (vu.sop.checkCameraFocusCapabilitiesInPC) {
            // Hay que mostrar el warning si la camara no tiene control de foco
            if (vuCamera.hasFocusControl() === false){
                // La camara NO tiene control de foco
                vu.sop.ui.alert(vu.sop.msg.cameraWithoutFocusControl)
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
    };
};

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
        vu.sop.ui.showBottomText(vu.sop.msg.addDocumentBottomText)
    });
    return promise;
}

vu.sop.steps.takePictureDocument = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentSelectUploadMethod");
    vu.sop.ui.hideBottomText();
    await vu.sop.steps.takePictureDocumentFront();
    await vu.sop.steps.takePictureDocumentBack();
    vu.sop.steps.documentPromiseResolve(true)
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
            console.log(response)

            vu.sop.ui.addFrontResponse = response
            if ("addBackRequired" in response) {
                if (response.addBackRequired){
                    console.log("addBack is Required")
                    vu.sop.addBackRequired = response.addBackRequired;
                }
            }
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired) {
                    console.log("addDocumentPicture is Required")
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
                        console.log("barcode is Required")
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
                await vu.sop.ui.hideWhiteLoading()
                vu.sop.ui.hide("vu.sop.ui.documentFileUploadFront");
                vu.sop.ui.hideBottomText();
            }
            break
        } catch (e) {
            document.getElementById('documentFileUploadFrontInput').value = null;
            //document.getElementById('documentFileUploadBackInput').value = null;

            await vu.sop.ui.hideWhiteLoading()


            if (!e.hasOwnProperty('message'))
                e.message = e;

            console.log('vu.sop.ui.addFront', e)
            console.log('vu.sop.ui.addFront e.message', e.message)

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
            await vu.sop.ui.showWhiteLoading()
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
                    console.log("addDocumentPicture is Required")
                    if(!response.documentPictureDetected) {
                        throw new Error('documentPictureNotDetected')
                    }
                }
            }
            if ( vu.sop.barcodeOptional === false ) {
                if (vu.sop.barcodeOptional === false) {
                    if ("containsBarcode" in response) {
                        if (response.containsBarcode) {
                            console.log("barcode is Required")
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
            console.log(response)
            vu.sop.steps.documentPromiseResolve(true);
            if(vu.sop.enableTelemetry && response.code === 912){
                vu.telemetry.addEvent("DocumentActivityProcess", "end",
                    {"captureResponseNumber": vu.telemetry.captureResponseCode.BACK.BACK_SUCCESS});
            }
            await vu.sop.ui.hideWhiteLoading()
            vu.sop.ui.hide("vu.sop.ui.documentFileUploadBack");
            vu.sop.ui.hideBottomText();
            break
        } catch (e) {
            document.getElementById('documentFileUploadFrontInput').value = null;
            document.getElementById('documentFileUploadBackInput').value = null;
            await vu.sop.ui.hideWhiteLoading()
            console.log('vu.sop.ui.addBack', e)
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
    let objectDetectionLoadPromise;
    if ( vu.sop.warmUpDocModelAsync ) {
        // Load network
        vu.sop.docObjectModelLoad = vu.sop.document.objectDetection.loadModel(vu.sop.tfPath);
        // Load HAAR
        //vu.sop.docHaarLoad  = vu.sop.document.face.preLoad()
    } else {
        // Load network
        objectDetectionLoadPromise = await vu.sop.document.objectDetection.loadModel(vu.sop.tfPath);
        // Load HAAR
        //haarLoadPromise = await vu.sop.document.face.preLoad()
    }

    while (true) {
        try {
            await vu.sop.ui.showWhiteLoading();
            console.log("vu.sop.setCameraOrientationInPC", vu.sop.setCameraOrientationInPC);
            if (vu.sop.ui.isMobile()) {
                if (vu.sop.setCameraOrientationInMobile === 'auto') {
                    vuCamera.config.orientation = 'environment'
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment'
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user'
                }
            } else {
                if (vu.sop.setCameraOrientationInPC === 'auto') {
                    vuCamera.config.orientation = 'environment'
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment'
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user'
                }
            }

            vuCamera.config.previewResolution = 'highest'
            vuCamera.config.pictureResolution = 'highest'
            vuCamera.config.pictureForceLandscape = true;
            vuCamera.config.pictureForceLandscapeRotateClockwise = false;
            vuCamera.config.pictureFlash = true;
            vuCamera.config.pictureLessBlurry = false
            await vuCamera.start("vu.sop.ui.video");

            //window.vu.camera = vuCamera;
            //vuCamera.setZoom(1.3)
            //vuCamera.setSharpness('lowest')
            //brightness = vuCamera.setBrightness('medium')

            if (vu.sop.flipDocumentCamera === 'auto') {
                if (vu.sop.ui.isMobile()) {
                    console.log('Flip Document configured to auto. Is mobile, mirroring screen')
                    vu.sop.ui.keepVideoHorizontal(vuCamera.video)
                }
            } else if (vu.sop.flipDocumentCamera) {
                console.log('Flip Document configured to true, mirroring screen')
                vu.sop.ui.flipVideoHorizontal(vuCamera.video)
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
                vu.sop.ui.showMirrorBackground()
            }

            break
        } catch (e) {
            await vu.sop.ui.hideWhiteLoading();
            console.log(e)
            await vu.error.showError(new vu.error.CameraError(e.message));
        }
    }
    // End Load Model
    //await objectDetectionLoadPromise;
    // Load HAAR
    //await haarLoadPromise;
}



vu.sop.steps.userInput = async function() {
    // ----------------------------------------
    // User Screen - SOP newOperation
    await vu.sop.ui.hideWhiteLoading()
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

        };
    };
};

vu.sop.steps.addVideoResolve = async function(video) {
        //await vu.sop.ui.showWhiteLoading();
        let response = await vu.sop.api.addVideos(vu.sop.userNameValue,
            vu.sop.operationIdValue,
            vu.sop.operationGuidValue,
            video);

        console.log('add video respo: ',response)
        await vu.sop.ui.hideWhiteLoading();
        return response;
};



vu.sop.steps.takePictureDocumentFront = async function() {
    // ----------------------------------------
    // Document Front - SOP addFront
    //
    let VUId;
    await vu.sop.ui.showLoading()

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
    vu.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background')
    vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgInactive;
    vu.sop.ui.show("vu.sop.document.ui.background");
    vu.sop.audio.play('vu.sop.audio.addFrontDocumentBottomMsg');
    vu.sop.ui.showBottomText(vu.sop.msg.addFrontDocumentBottomMsg)
    await vu.sop.ui.sleep(50)
    var start = new Date();
    console.log('Warming Up Start')
    await vu.sop.document.objectDetection.predictAsync(vuCamera.video)
    var end  = new Date();
    var time = end.getTime() - start.getTime();
    console.log('Warming Up End - Time', time, 'ms')
    await vu.sop.ui.hideLoading()
    while (true) {
        try {
            // Show faceLoad
            let frontDocumentImg = await vu.sop.document.ui.start('front');
            vu.sop.ui.addFrontImg = frontDocumentImg
            await vu.sop.ui.showLoading()
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
            console.log(response)

            if ("detectedCountryId" in response) {
                vu.sop.documentId = response.detectedCountryId;
                vu.sop.barcode.documentId = response.detectedCountryId; 
            }

            vu.sop.ui.addFrontResponse = response
            if ("addBackRequired" in response) {
                if (response.addBackRequired) {
                    console.log("addBack is Required")
                    vu.sop.addBackRequired = response.addBackRequired;
                }
            }
            // Face in document-----------------------------------------------------------------------------------------
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired) {
                    console.log("addDocumentPicture is Required")
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
                    console.log("barcode is Required")
                    if(!response.barcodeDetected) {
                        if ( vu.sop.barcodeOptional === false ) {
                            VUId = vu.sop.documentCodes.getVUIdFromId(vu.sop.documentId);
                            if (vu.sop.readBarcodeClientSide === true &&
                                Object.keys(vu.sop.barcode.expectedBarcodes).includes(VUId)) {
                                // Nos aseguramos que la libreria esta cargada
                                await vu.sop.barcode.loadPromise;
                                await vu.sop.ui.hideLoading()
                                let barcodeData = await vu.sop.barcode.ui.start();
                                console.log(barcodeData)
                                await vu.sop.ui.showLoading();
                                let barcodeResponse = await vu.sop.api.addBarcode(
                                    vu.sop.userNameValue,
                                    vu.sop.operationIdValue,
                                    vu.sop.operationGuidValue,
                                    barcodeData[0],
                                    barcodeData[1]
                                );
                                await vu.sop.ui.hideLoading()
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
            await vu.sop.ui.hideLoading()
            break
        } catch (e) {
            await vu.sop.ui.hideLoading()
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

                await vu.sop.ui.showLoading()
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
                        console.log("addDocumentPicture is Required")
                        if (!response.documentPictureDetected) {
                            throw new Error('documentPictureNotDetected')
                        }
                    }
                }
                // Barcode --------------------------------------------------------------------------------------------
                if ("containsBarcode" in response && "barcodeDetected" in response) {
                    if (response.barcodeDetected === false && response.containsBarcode === true) {
                        console.log("barcode is Required")
                        if(!response.barcodeDetected) {
                            if ( vu.sop.barcodeOptional === false ) {
                                VUId = vu.sop.documentCodes.getVUIdFromId(vu.sop.documentId);
                                if (vu.sop.readBarcodeClientSide === true &&
                                   Object.keys(vu.sop.barcode.expectedBarcodes).includes(VUId)) {
                                    // Nos aseguramos que la libreria esta cargada
                                    await vu.sop.barcode.loadPromise;
                                    await vu.sop.ui.hideLoading()
                                    let barcodeData = await vu.sop.barcode.ui.start();
                                    console.log(barcodeData)
                                    await vu.sop.ui.showLoading()
                                    let barcodeResponse = await vu.sop.api.addBarcode(
                                        vu.sop.userNameValue,
                                        vu.sop.operationIdValue,
                                        vu.sop.operationGuidValue,
                                        barcodeData[0],
                                        barcodeData[1]
                                    );
                                    await vu.sop.ui.hideLoading()
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
                console.log(response)

                if(vu.sop.enableTelemetry && response.code === 912){
                    vu.telemetry.addEvent("DocumentActivityProcess", "end",
                        {"captureResponseNumber": vu.telemetry.captureResponseCode.BACK.BACK_SUCCESS});
                }

                await vu.sop.ui.hideLoading()
                break
            } catch (e) {
                await vu.sop.ui.hideLoading()
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
                vu.sop.ui.hideMirrorBackground()
            }
            vu.sop.videoResizeRules = 'face'
            vu.sop.videoResizeObserver.disconnect()
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
                    vuCamera.config.orientation = 'user'
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment'
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user'
                }
                if (!vu.sop.useTheSameCameraInDocAndFaceInMobile) {
                    vuCamera.config.previewResolution = 'lowest'
                    vuCamera.config.pictureResolution = 'lowest'
                    vuCamera.config.pictureForceLandscape = false;
                    vuCamera.config.pictureFlash = false;
                    await vuCamera.start("vu.sop.ui.video");
                }
            } else {
                if (vu.sop.setCameraOrientationInPC === 'auto') {
                    vuCamera.config.orientation = 'user'
                } else if (vu.sop.setCameraOrientationInMobile === 'environment') {
                    vuCamera.config.orientation = 'environment'
                } else if (vu.sop.setCameraOrientationInMobile === 'user') {
                    vuCamera.config.orientation = 'user'
                }
                console.log("vu.sop.setCameraOrientationInPC", vu.sop.setCameraOrientationInPC);
                console.log("vu.sop.useTheSameCameraInDocAndFaceInMobile", vu.sop.useTheSameCameraInDocAndFaceInMobile);
                console.log("vu.sop.useTheSameCameraInDocAndFaceInPC", vu.sop.useTheSameCameraInDocAndFaceInPC);
                if (vu.sop.useTheSameCameraInDocAndFaceInPC === false) {
                    vuCamera.config.previewResolution = 'lowest'
                    vuCamera.config.pictureResolution = 'lowest'
                    vuCamera.config.pictureForceLandscape = false;
                    vuCamera.config.pictureFlash = false;
                    await vuCamera.start("vu.sop.ui.video");
                }
            }

            //window.vu.camera = vuCamera;

            vu.sop.ui.flipVideoHorizontal(vuCamera.video)
            if (vu.sop.preCacheFaceModelAsync) {
                await vu.sop.preCacheFaceModelPromise;
            }
            await vu.face.load(vuCamera.video, vu.sop.basePath, vu.sop.tfPath);

            //


            break
        } catch (e) {
            await vu.sop.ui.hideLoading()
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

            await vu.sop.ui.showLoading()
            let picture = pictures[pictures.length-1]
            
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
            }else{
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
                response = await vu.sop.stopRecording()
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
                vu.sop.operationIdValue, vu.sop.operationGuidValue)

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

            await vu.sop.ui.hideLoading()
            await vu.sop.release();
            if(vu.sop.enableTelemetry){
                vu.telemetry.addEvent("SelfieActivityProcess", "end", {"captureResponseNumber": vu.telemetry.captureResponseCode.SELFIE.SELFIE_SUCCESS}
                );
            }
            break
        } catch (e) {
            console.log("e", e);
            vu.sop.screenRecorder.sendVideo = false;
            await vu.sop.ui.hideLoading()
            await vu.sop.ui.hideWhiteLoading()
            if(e.code === 1930){
                await vu.error.showError(new vu.error.FaceAuthError('endOpApiBiometricCompareFail'));

            }else{
                await vu.error.showError(new vu.error.CameraFaceError('endOpApiError'));

            }
            throw e;
        }
    }
    // TODO - Testiar y mejorar
    if (vu.sop.disableBiometric) {
        response = await vu.sop.api.endOperation(vu.sop.userNameValue,
            vu.sop.operationIdValue, vu.sop.operationGuidValue)
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
            b64.push(picture.split(",")[1])
        }      

        //Detiene la camara
        vuCamera.stream.getTracks().forEach(function(track) {
            track.stop();
        });

        return b64;

    } catch (e) {
        throw new Error(e.message)
    };
};

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
}

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

export default vu.sop;

