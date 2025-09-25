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
        root.vu.sop = root.vu.sop || {};
        root.vu.sop.msg = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    // The actual message object, similar to your previous one
    const msg = {};

    msg.blurryImage = "Blurry Image"
    msg.darkImage = "Not enough light"
    msg.blurryFace = "Face too Blurry"
    msg.darkFace = "Not enough light"
    msg.faceAway = "Please, get your face closer to the camera"
    msg.faceClose = "Please move your face slightly away from the camera"
    msg.faceNotDetected = "Please, center your face"
    
    msg.documentNotCentered = "Please, center your document"
    msg.blurryDocument = "Document too Blurry"
    msg.darkDocument = "Not enough light"
    msg.documentAway = "Please, get your document closer to the camera"
    msg.documentClose = "Please move your document slightly away from the camera"
    msg.rotateScreen = "Please rotate the smartphone screen to capture the ID"
    msg.documentHasABrightSpot = "Glare detected on ID card"
    
    
    msg.deviceNotSupported = "This device is not supported"
    msg.browserOldVersion = "Please upgrade your browser for full support"
    msg.browserUnsupported = "Please use Chrome, Safari or Edge"
    msg.osOldVersion = "Please upgrade your OS for full support"
    
    msg.userInputPlaceholder = "User E-Mail"
    msg.userSendBtn = "Start"
    
    msg.cameraDenied = "Must allow the browser to use the camera to continue";
    msg.cameraAutoplayProtection = "Anti-Autoplay Video Anti-Autoplay prevents access to camera, please disable it and try again";
    msg.cameraLowResolution = "Camera resolution is too low. Please, try on a different device";
    msg.cameraError = "A undefined error occurred when accessing the camera, contact the administrator";
    
    msg.userError = "An error occurred at the beginning of the registration, please try again";
    msg.userComunicationError = "Communication with the server couldn't be established, please try again";
    msg.userPleaseEnableAudio = "Please turn the sound off";
    
    msg.addDocumentCameraIconMsg = "Camera";
    msg.addDocumentFileIconMsg = "Upload files";
    msg.addDocumentBottomText = "We require photos of your ID";
    
    msg.addFrontDocumentFileUploadBottomMsg  = "ID Front";
    msg.addFrontDocumentBottomMsg = "ID Front";
    msg.addFrontDocumentComunicationError = "An error occurred while communicating with the API, please try again";
    msg.addFrontDocumentPictureNotDetected = "Face within the ID wasn't detected, please try again";
    msg.addFrontDocumentBarcodeNotDetected = "Barcode wasn't read, please try again";
    msg.addFrontDocumentError = "An error occurred with the front image, please try again";
    msg.addFrontApiErrorAntiSpoofing = "We couldn't authenticate the ID, please try again";
    msg.addFrontApiErrorFrontAlreadyExist = "An error occurred with the image, please try again";
    
    msg.addBackDocumentFileUploadBottomMsg  = "ID Back";
    msg.addBackDocumentBottomMsg = "ID Back";
    msg.addBackDocumentComunicationError = "An error occurred while communicating with the API, please try again";
    msg.addBackDocumentPictureNotDetected = "Face within the ID wasn't detected, please try again";
    msg.addBackDocumentBarcodeNotDetected = "Barcode wasn't read, please try again";
    msg.addBackDocumentError = "An error occurred with the back image, please try again";
    msg.addBackApiErrorAntiSpoofing = "We couldn't authenticate the document, please try again";
    msg.addBackApiErrorFrontAlreadyExist = "An error occurred with the image, please try again";
    msg.smallDocumentImg = "Image too small, please try with other image";
    msg.badImageFormat = "Image format not supported, please use PNG or JPG";
    
    msg.facePoint = "Follow the point";
    msg.faceComunicationErrorRegister = "An error occurred while communicating with the API, please try again";
    msg.faceComunicationErrorEndOperation = "An error occurred while communicating with the API, please try again"
    msg.faceError = "A undefined error occurred, please contact the administrator";
    msg.faceErrorUserNotExist = "User doesn't exist";
    msg.faceErrorFailAuth = "Authentication failure, please try again";
    
    msg.faceNoDocFrontImg = "The ID doesn't have the face image, please try again";
    msg.faceNoSelfieFrontImg = "Error in the face image, please try again";
    msg.faceBiometricCompareError = "Biometric comparison failed, please try again";
    
    msg.faceGesturesSmile = "Smile showing teeth until the circle is green";
    msg.faceGesturesEyeClose = "Close your eyes until you hear the signal";
    msg.faceGesturesEyeRightClose = "Close your right eye until the circle is green";
    msg.faceGesturesEyeLeftClose = "Close your left eye until the circle is green";
    msg.faceGesturesLookLeft = "Look slightly to the right until the circle is green";
    msg.faceGesturesLookRight = "Look slightly to the left until the circle is green";
    msg.faceGesturesLookUp = "Look slightly up until the circle is green";
    msg.faceGesturesLookDown = "Look slightly down until the circle is green";
    msg.faceGesturesNone = "Look to the front with a neutral face until the circle is green";
    
    msg.endOpApiBadScore = "Didn't pass the identity validations, please try again";
    msg.endOpApiDocumentDataError = "Wrong document information, please try again";
    msg.endOpApiDocumentBackFrontError = "The information of front and back of the ID doesn't match, please try again";
    msg.endOpApiDocumentBarcodeDoNotExist = "Barcode wasn't read, please again";
    msg.endOpApiDocumentExpired = "Expired document, please try again";
    msg.endOpApiPersonDataFail = "Person's identity wasn't analyzed, please try again";
    
    msg.readBarcode = "Locate the barcode in the central area";
    msg.cantReadBarcode = "If you can't read it, try another device";
    msg.readBarcodeTutorial = "On the next screen you will be asked to read the barcode of your document";
    msg.cameraWithoutFocusControl = "The camera in this device doesn't allow focus control. We suggest using a different device.";
    msg.close = "Close";

    msg.selectOne = "Select one Camera to continue";
    msg.noCameras = "No cameras detected";
    msg.unnamedCamera = "Unnamed camera";
    msg.continue = "Continue";
    msg.retry = "Retry";

    
    // Returning the msg object
    return msg;
}));
