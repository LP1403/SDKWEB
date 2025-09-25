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


msg.blurryImage = "Imagen Borrosa"
msg.darkImage = "No hay suficiente iluminación"
msg.blurryFace = "Rostro muy borroso"
msg.darkFace = "No hay suficiente iluminación"
msg.faceAway = "Acerque el rostro a la cámara"
msg.faceClose = "Aleje el rostro de la cámara"
msg.faceNotDetected = "Centre su rostro"

msg.documentNotCentered = "Por favor, centre su documento"
msg.blurryDocument = "Documento muy borroso"
msg.darkDocument = "No hay suficiente iluminación"
msg.documentAway = "Acerque el documento a la cámara"
msg.documentClose = "Aleje el documento de la cámara"
msg.rotateScreen = "Rotar la pantalla del celular para la captura del documento"
msg.documentHasABrightSpot = "Demasiado brillo en el documento"


msg.deviceNotSupported = "Este dispositivo no esta soportado"
msg.browserOldVersion = "Por favor actualice su navegador"
msg.browserUnsupported = "Por favor use Chrome, Safari o Edge"
msg.osOldVersion = "Por favor actualice su sistema operativo"

msg.userInputPlaceholder = "Correo de usuario"
msg.userSendBtn = "Iniciar"

msg.cameraDenied = "Debe aceptar los permisos de la camara del navegador para continuar";
msg.cameraAutoplayProtection = "Video Anti-Autoplay evito el acceso a la camara, por favor, deshabilitelo y reintente";
msg.cameraLowResolution = "La resolución de la cámara no es suficiente. Por favor, intente con otro dispositivo";
msg.cameraError = "Ocurrió un error no determinado accediendo a la camara, contacte al administrador";

msg.userError = "Ocurrió un error en el inicio de la registracion, por favor, reintente";
msg.userComunicationError = "No se pudo comunicar con el servidor, por favor, reintente";
msg.userPleaseEnableAudio = "Por favor, habilite el sonido";

msg.addDocumentCameraIconMsg = "Camara";
msg.addDocumentFileIconMsg = "Subir archivos";
msg.addDocumentBottomText = "Requerimos fotos de su documento";

msg.addFrontDocumentFileUploadBottomMsg  = "Frente del documento";
msg.addFrontDocumentBottomMsg = "Frente del documento";
msg.addFrontDocumentComunicationError = "Ocurrió un error comunicándose con la API, por favor, reintente";
msg.addFrontDocumentPictureNotDetected = "No se pudo detectar el rostro en el documento, por favor, reintente";
msg.addFrontDocumentBarcodeNotDetected = "No se pudo leer el codigo de barras, por favor, reintente";
msg.addFrontDocumentError = "Ocurrio un error en la imagen del frente, por favor, reintente";
msg.addFrontApiErrorAntiSpoofing = "No podemos autenticar el documento, por favor, reintente";
msg.addFrontApiErrorFrontAlreadyExist = "Ocurrió un error con la imagen, por favor, reintente";

msg.addBackDocumentFileUploadBottomMsg  = "Dorso del documento";
msg.addBackDocumentBottomMsg = "Dorso del documento";
msg.addBackDocumentComunicationError = "Ocurrió un error comunicándose con la API, por favor, reintente";
msg.addBackDocumentPictureNotDetected = "No se pudo detectar el rostro en el documento, por favor, reintente";
msg.addBackDocumentBarcodeNotDetected = "No se puedo leer el codigo de barras, por favor, reintente";
msg.addBackDocumentError = "Ocurrió un error en la imagen del dorso, por favor, reintente";
msg.addBackApiErrorAntiSpoofing = "No podemos autenticar el documento, por favor, reintente";
msg.addBackApiErrorFrontAlreadyExist = "Ocurrió un error con la imagen, por favor, reintente";
msg.smallDocumentImg = "Imagen con resolución muy chica, intente con otra imagen";
msg.badImageFormat = "Formato de imagen no soportado, por favor use PNG or JPG";


msg.facePoint = "Siga el punto con la cabeza";
msg.faceComunicationErrorRegister = "Error comunicándose con la API, por favor, reintente";
msg.faceComunicationErrorEndOperation = "Error comunicándose con la API, por favor, reintente";
msg.faceError = "Ocurrió un error no determinado, contacte al administrador";
msg.faceErrorUserNotExist = "Usuario no existe";
msg.faceErrorFailAuth = "Fallo de autenticación, por favor, reintente";

msg.faceNoDocFrontImg = "El documento no tiene la imagen del rostro, por favor, reintente";
msg.faceNoSelfieFrontImg = "Error en la imagen del rostro, por favor, reintente";
msg.faceBiometricCompareError = "La comparación biométrica no fue superada, por favor, reintente";

msg.faceGesturesSmile = "Sonría mostrando los dientes hasta que el circulo se ponga verde";
msg.faceGesturesEyeClose = "Cierre los ojos hasta escuchar el bip";
msg.faceGesturesEyeRightClose = "Cierre el ojo derecho hasta que el círculo se ponga verde";
msg.faceGesturesEyeLeftClose = "Cierre el ojo izquierdo hasta que el círculo se ponga verde";
msg.faceGesturesLookLeft = "Mire ligeramente a la derecha hasta que el círculo se ponga verde";
msg.faceGesturesLookRight = "Mire ligeramente a la izquierda hasta que el círculo se ponga verde";
msg.faceGesturesLookUp = "Mire ligeramente arriba hasta que el círculo se ponga verde";
msg.faceGesturesLookDown = "Mire ligeramente abajo hasta que el círculo se ponga verde";
msg.faceGesturesNone = "Mire hacia adelante con un gesto neutral hasta que el círculo se ponga verde";

msg.endOpApiBadScore = "No supero las validaciones de identidad, por favor, reintente";
msg.endOpApiDocumentDataError = "Información del documento erronea, por favor, reintente";
msg.endOpApiDocumentBackFrontError = "La información entre el frente y dorso del documento no coincide, por favor, reintente";
msg.endOpApiDocumentBarcodeDoNotExist = "No se pudo leer el código de barras, por favor, reintente";
msg.endOpApiDocumentExpired = "Documento expirado, por favor, reintente";
msg.endOpApiPersonDataFail = "No se pudo analizar la información de la persona, por favor, reintente";

msg.readBarcode = "Ubique el código de barreas en el área central";
msg.cantReadBarcode = "Si no lo puede leer, pruebe con otro dispositivo";
msg.readBarcodeTutorial = "En la proxima patalla se le pedira que lea el codigo de barras de su documento";
msg.cameraWithoutFocusControl = "La cámara de este dispositivo no permite el control del foco. Recomendamos intentar con un dispositivo distinto.";
msg.close = "Cerrar";

msg.selectOne = "Seleccione una camara para continuar";
msg.noCameras = "No se detectaron cámaras";
msg.unnamedCamera = "Cámara sin nombre";
msg.continue = "Continuar";
msg.retry = "Reintentar";

    // Returning the msg object
    return msg;
}));