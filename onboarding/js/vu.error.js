import vuSopAudio from 'vu.sop.audio';
import vuSopUi from 'vu.sop.ui'; 
//import vuCamera from 'vu.camera'; //

// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.ui = vuSopUi;
vu.sop.audio = vu.sop.audio || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu.sop.audio = Object.assign(vu.sop.audio, vuSopAudio);
vu.sop.msg = vu.sop.msg || {};
//vu.camera = vuCamera;

vu.error = vu.error || {};

vu.error.LOAD_ERROR = 'LoadError';
vu.error.USER_ERROR = 'UserError';
vu.error.TAKE_DOCUMENT_FRONT_ERROR = 'TakeDocumentFrontError';
vu.error.TAKE_DOCUMENT_BACK_ERROR = 'TakeDocumentBackError';
vu.error.UPLOAD_DOCUMENT_FRONT_ERROR = 'UploadDocumentFrontError';
vu.error.UPLOAD_DOCUMENT_BACK_ERROR = 'UploadDocumentBackError';
vu.error.CAMERA_ERROR = 'CameraError';
vu.error.CAMERA_FACE_ERROR = 'CameraFaceError';
vu.error.FACE_AUTH_ERROR = 'FaceAuthError';

let moduleCamera = null;
vu.error.initialize = function(camera) {
    if(window.vu.sop.msg != vu.sop.msg)
        vu.sop.msg = window.vu.sop.msg;

    moduleCamera = camera;
}

vu.error.LoadError = function(message) {
    this.name = vu.error.LOAD_ERROR;
    this.message = message;
}
vu.error.LoadError.prototype = Error.prototype;

vu.error.UserError = function(message) {
    this.name = vu.error.USER_ERROR;
    this.message = message;
}
vu.error.UserError.prototype = Error.prototype;

vu.error.TakeDocumentFrontError = function(message) {
    this.name = vu.error.TAKE_DOCUMENT_FRONT_ERROR;
    this.message = message;
}
vu.error.TakeDocumentFrontError.prototype = Error.prototype;

vu.error.TakeDocumentBackError = function(message) {
    this.name = vu.error.TAKE_DOCUMENT_BACK_ERROR;
    this.message = message;
}
vu.error.TakeDocumentBackError.prototype = Error.prototype;

vu.error.UploadDocumentFrontError = function(message) {
    this.name = vu.error.UPLOAD_DOCUMENT_FRONT_ERROR;
    this.message = message;
}
vu.error.UploadDocumentFrontError.prototype = Error.prototype;

vu.error.UploadDocumentBackError = function(message) {
    this.name = vu.error.UPLOAD_DOCUMENT_BACK_ERROR;
    this.message = message;
}
vu.error.UploadDocumentBackError.prototype = Error.prototype;

vu.error.CameraError = function(message) {
    this.name = vu.error.CAMERA_ERROR;
    this.message = message;
}
vu.error.CameraError.prototype = Error.prototype;

vu.error.CameraFaceError = function(message) {
    this.name = vu.error.CAMERA_FACE_ERROR;
    this.message = message;
}
vu.error.CameraFaceError.prototype = Error.prototype;

vu.error.FaceAuthError = function(message) {
    this.name = vu.error.FACE_AUTH_ERROR;
    this.message = message;
}
vu.error.FaceAuthError.prototype = Error.prototype;

vu.error.showError = async function(e) {

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

    if(e.name === vu.error.LOAD_ERROR) {
        if (e.message === 'browserOldVersion') {
            vu.sop.audio.play('vu.sop.audio.browserOldVersion');
            await vu.sop.ui.alertNoButton(vu.sop.msg.browserOldVersion)
        } else if (e.message === 'browserUnsupported') {
            vu.sop.audio.play('vu.sop.audio.browserUnsupported');
            await vu.sop.ui.alertNoButton(vu.sop.msg.browserUnsupported);
        } else if (e.message === 'osOldVersion') {
            vu.sop.audio.play('vu.sop.audio.osOldVersion');
            await vu.sop.ui.alertNoButton(vu.sop.msg.osOldVersion)
        } else if(e.message === 'deviceNotSupported') {
            vu.sop.audio.play('vu.sop.audio.deviceNotSupported');
            await vu.sop.ui.alertNoButton(vu.sop.msg.deviceNotSupported)
        }
    } else if(e.name === vu.error.USER_ERROR) {
        vu.sop.audio.play('vu.sop.audio.userError');
    await vu.sop.ui.alert(vu.sop.msg.userError, e)
    } else if(e.name === vu.error.TAKE_DOCUMENT_FRONT_ERROR) {
        if (e.message === 'addFrontApiError') {
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentComunicationError');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentComunicationError, e)
        } else if (e.message === 'documentPictureNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentPictureNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentPictureNotDetected, e)
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentBarcodeNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentBarcodeNotDetected, e)
        } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
            vu.sop.audio.play('vu.sop.audio.addFrontApiErrorAntiSpoofing');
            await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorAntiSpoofing, e)
        } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
            vu.sop.audio.play('vu.sop.audio.addFrontApiErrorFrontAlreadyExist');
            await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorFrontAlreadyExist, e)
        } else {
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentError');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentError, e)
        }
    } else if(e.name === vu.error.TAKE_DOCUMENT_BACK_ERROR) {
        if (e.message === 'addBackApiError') {
            vu.sop.audio.play('vu.sop.audio.addBackDocumentComunicationError');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentComunicationError, e)
        } else if (e.message === 'documentPictureNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addBackDocumentPictureNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentPictureNotDetected, e)
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addBackDocumentBarcodeNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentBarcodeNotDetected, e)
        } else if (e.message === 'addBackApiErrorAntiSpoofing'){
            vu.sop.audio.play('vu.sop.audio.addBackApiErrorAntiSpoofing');
            await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorAntiSpoofing, e)
        } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
            vu.sop.audio.play('vu.sop.audio.addBackApiErrorFrontAlreadyExist');
            await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorFrontAlreadyExist, e)
        } else {
            vu.sop.audio.play('vu.sop.audio.addBackDocumentError');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentError, e)
        }
    } else if(e.name === vu.error.CAMERA_ERROR) {
        if (e.message === 'denied') {
            vu.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu.sop.ui.alert(vu.sop.msg.cameraDenied, e)
        } else if (e.message === 'autoplay') {
            vu.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection, e)
        } else if (e.message === 'lowResolution') {
            vu.sop.audio.play('vu.sop.audio.cameraLowResolution');
            await vu.sop.ui.alert(vu.sop.msg.cameraLowResolution, e)
        }  else if (e.message === 'cameraSelectionError') {
            vu.sop.audio.play('vu.sop.audio.cameraDenied'); // TODO Reemplazar con el audio cuando este generado
            const selectedDeviceId = await vu.sop.ui.alertCameraSelection(vu.sop.msg.selectOne);
            moduleCamera.selectedDeviceId = selectedDeviceId;
            await moduleCamera.start("vu.sop.ui.video");  

        }  else {
            vu.sop.audio.play('vu.sop.audio.cameraError');
            await vu.sop.ui.alert(vu.sop.msg.cameraError, e )
        }
    } else if(e.name === vu.error.CAMERA_FACE_ERROR) {
        if (e.message === 'denied') {
            vu.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu.sop.ui.alert(vu.sop.msg.cameraDenied, e )
        } else if (e.message === 'autoplay') {
            vu.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection, e)
        } else if (e.message === 'registerApiError') {
            vu.sop.audio.play('vu.sop.audio.faceComunicationErrorRegister');
            await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorRegister, e)
        } else if (e.message === 'endOpApiError') {
            vu.sop.audio.play('vu.sop.audio.faceComunicationErrorEndOperation');
            await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorEndOperation, e)
        }  else {
            vu.sop.audio.play('vu.sop.audio.faceError');
            await vu.sop.ui.alert(vu.sop.msg.faceError, e)
        }
    } else if(e.name === vu.error.FACE_AUTH_ERROR) {
        if (e.message === 'denied') {
            vu.sop.audio.play('vu.sop.audio.cameraDenied');
            await vu.sop.ui.alert(vu.sop.msg.cameraDenied, e );
        } else if (e.message === 'autoplay') {
            vu.sop.audio.play('vu.sop.audio.cameraAutoplayProtection');
            await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection, e);
        } else if (e.message === 'faceNoDocFrontImg') {
            vu.sop.audio.play('vu.sop.audio.faceNoDocFrontImg');
            await vu.sop.ui.alert(vu.sop.msg.faceNoDocFrontImg, e);
        } else if (e.message === 'faceNoSelfieFrontImg') {
            vu.sop.audio.play('vu.sop.audio.faceNoSelfieFrontImg');
            await vu.sop.ui.alert(vu.sop.msg.faceNoSelfieFrontImg, e);
        } else if (e.message === 'registerApiError') {
            vu.sop.audio.play('vu.sop.audio.faceComunicationErrorRegister');
            await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorRegister, e);
        } else if (e.message === 'endOpApiBadScore') {
            vu.sop.audio.play('vu.sop.audio.endOpApiBadScore');
            await vu.sop.ui.alert(vu.sop.msg.endOpApiBadScore, e);
        } else if (e.message === 'endOpApiDocumentDataError') {
            vu.sop.audio.play('vu.sop.audio.endOpApiDocumentDataError');
            await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentDataError, e);
        } else if (e.message === 'endOpApiDocumentBackFrontError') {
            vu.sop.audio.play('vu.sop.audio.endOpApiDocumentBackFrontError');
            await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentBackFrontError, e);
        } else if (e.message === 'endOpApiDocumentBarcodeDoNotExist') {
            vu.sop.audio.play('vu.sop.audio.endOpApiDocumentBarcodeDoNotExist');
            await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentBarcodeDoNotExist, e);
        } else if (e.message === 'endOpApiDocumentExpired') {
            vu.sop.audio.play('vu.sop.audio.endOpApiDocumentExpired');
            await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentExpired, e);
        } else if (e.message === 'endOpApiPersonDataFail') {
            vu.sop.audio.play('vu.sop.audio.endOpApiPersonDataFail');
            await vu.sop.ui.alert(vu.sop.msg.endOpApiPersonDataFail, e);
        } else if (e.message === 'endOpApiError') {
            vu.sop.audio.play('vu.sop.audio.faceComunicationErrorEndOperation');
            await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorEndOperation, e );
        } else if (e.message === 'endOpApiBiometricFail') {
            vu.sop.audio.play('vu.sop.audio.faceNoSelfieFrontImg');
            await vu.sop.ui.alert(vu.sop.msg.faceNoSelfieFrontImg, e );
        } else if (e.message === 'userNotExist') {
            vu.sop.audio.play('vu.sop.audio.faceErrorUserNotExist');
            await vu.sop.ui.alert(vu.sop.msg.faceErrorUserNotExist, e)
        } else if (e.message === 'failAuth') {
            vu.sop.audio.play('vu.sop.audio.faceErrorFailAuth');
            await vu.sop.ui.alert(vu.sop.msg.faceErrorFailAuth, e)
        } else if (e.message === 'endOpApiBiometricCompareFail') {
            vu.sop.audio.play('vu.sop.audio.endOpApiBiometricCompareFail');
            await vu.sop.ui.alert(vu.sop.msg.faceBiometricCompareError, e)
        } else {
            vu.sop.audio.play('vu.sop.audio.faceError');
            await vu.sop.ui.alert(vu.sop.msg.faceError, e );
        }
    } else if(e.name === vu.error.UPLOAD_DOCUMENT_FRONT_ERROR) {
        if (e.message === 'addFrontApiError') {
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentComunicationError');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentComunicationError, e)
        } else if (e.message === 'documentPictureNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentPictureNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentPictureNotDetected, e)
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentBarcodeNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentBarcodeNotDetected, e)
        } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
            vu.sop.audio.play('vu.sop.audio.addFrontApiErrorAntiSpoofing');
            await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorAntiSpoofing, e)
        } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
            vu.sop.audio.play('vu.sop.audio.addFrontApiErrorFrontAlreadyExist');
            await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorFrontAlreadyExist, e)
        } else if (e.message === 'smallDocumentImg'){
            vu.sop.audio.play('vu.sop.audio.smallDocumentImg');
            await vu.sop.ui.alert(vu.sop.msg.smallDocumentImg, e)
        } else if (e.message === 'badImageFormat'){
            vu.sop.audio.play('vu.sop.audio.badImageFormat');
            await vu.sop.ui.alert(vu.sop.msg.badImageFormat, e)
        } else {
            vu.sop.audio.play('vu.sop.audio.addFrontDocumentError');
            await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentError, e)
        }
    } else if(e.name === vu.error.UPLOAD_DOCUMENT_BACK_ERROR) {
        if (e.message === 'addBackApiError') {
            vu.sop.audio.play('vu.sop.audio.addBackDocumentComunicationError');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentComunicationError, e)
        } else if (e.message === 'documentPictureNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addBackDocumentPictureNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentPictureNotDetected, e)
        } else if (e.message === 'documentBarcodeNotDetected'){
            vu.sop.audio.play('vu.sop.audio.addBackDocumentBarcodeNotDetected');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentBarcodeNotDetected, e)
        } else if (e.message === 'addBackApiErrorAntiSpoofing'){
            vu.sop.audio.play('vu.sop.audio.addBackApiErrorAntiSpoofing');
            await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorAntiSpoofing, e)
        } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
            vu.sop.audio.play('vu.sop.audio.addBackApiErrorFrontAlreadyExist');
            await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorFrontAlreadyExist, e)
        } else if (e.message === 'smallDocumentImg'){
            vu.sop.audio.play('vu.sop.audio.smallDocumentImg');
            await vu.sop.ui.alert(vu.sop.msg.smallDocumentImg, e)
        } else if (e.message === 'badImageFormat'){
            vu.sop.audio.play('vu.sop.audio.badImageFormat');
            await vu.sop.ui.alert(vu.sop.msg.badImageFormat, e)
        } else {
            vu.sop.audio.play('vu.sop.audio.addBackDocumentError');
            await vu.sop.ui.alert(vu.sop.msg.addBackDocumentError, e)
        }
    } 
}

export default vu.error;