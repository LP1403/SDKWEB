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

	msg.blurryImage = "Imagem borrada"
	msg.darkImage = "Não há iluminação suficiente"
	msg.blurryFace = "Rosto muito borrado"
	msg.darkFace = "Não há iluminação suficiente"
	 
	msg.faceAway = "Aproxime o rosto da câmera"
	msg.faceClose = "Afaste o rosto da câmera"
	msg.faceNotDetected = "Centralize seu rosto"
	 
	msg.documentNotCentered = "Por favor, centralize seu documento"
	msg.blurryDocument = "Documento muito borrado"
	msg.darkDocument = "Não há iluminação suficiente"
	msg.documentAway = "Aproxime o documento da câmera"
	msg.documentClose = "Afaste o documento da câmera"
	msg.rotateScreen = "Gire a tela do celular para capturar o documento"
	msg.documentHasABrightSpot = "Muito brilho no documento"
	 
	msg.deviceNotSupported = "Este dispositivo não é suportado"
	msg.browserOldVersion = "Por favor, atualize seu navegador"
	msg.browserUnsupported = "Por favor, use Chrome, Safari ou Edge"
	msg.osOldVersion = "Por favor, atualize seu sistema operacional"
	 
	msg.userInputPlaceholder = "E-mail do usuário"
	msg.userSendBtn = "Iniciar"
	 
	msg.cameraDenied = "Você deve aceitar as permissões da câmera do navegador para continuar";
	msg.cameraAutoplayProtection = "O bloqueio de reprodução automática impediu o acesso à câmera. Por favor, desative e tente novamente";
	msg.cameraLowResolution = "A resolução da câmera não é suficiente. Por favor, tente com outro dispositivo";
	msg.cameraError = "Ocorreu um erro não identificado ao acessar a câmera. Entre em contato com o administrador";
	 
	msg.userError = "Ocorreu um erro ao iniciar o registro. Por favor, tente novamente";
	msg.userComunicationError = "Não foi possível se comunicar com o servidor. Por favor, tente novamente";
	msg.userPleaseEnableAudio = "Por favor, habilite o som";
	 
	msg.addDocumentCameraIconMsg = "Câmera";
	msg.addDocumentFileIconMsg = "Enviar arquivos";
	msg.addDocumentBottomText = "Precisamos de fotos do seu documento";
	 
	msg.addFrontDocumentFileUploadBottomMsg  = "Frente do documento";
	msg.addFrontDocumentBottomMsg = "Frente do documento";
	msg.addFrontDocumentComunicationError = "Ocorreu um erro ao se comunicar com a API. Por favor, tente novamente";
	msg.addFrontDocumentPictureNotDetected = "Não foi possível detectar o rosto no documento. Por favor, tente novamente";
	msg.addFrontDocumentBarcodeNotDetected = "Não foi possível ler o código de barras. Por favor, tente novamente";
	msg.addFrontDocumentError = "Ocorreu um erro na imagem da frente. Por favor, tente novamente";
	msg.addFrontApiErrorAntiSpoofing = "Não podemos autenticar o documento. Por favor, tente novamente";
	msg.addFrontApiErrorFrontAlreadyExist = "Ocorreu um erro com a imagem. Por favor, tente novamente";
	 
	msg.addBackDocumentFileUploadBottomMsg  = "Verso do documento";
	msg.addBackDocumentBottomMsg = "Verso do documento";
	msg.addBackDocumentComunicationError = "Ocorreu um erro ao se comunicar com a API. Por favor, tente novamente";
	msg.addBackDocumentPictureNotDetected = "Não foi possível detectar o rosto no documento. Por favor, tente novamente";
	msg.addBackDocumentBarcodeNotDetected = "Não foi possível ler o código de barras. Por favor, tente novamente";
	msg.addBackDocumentError = "Ocorreu um erro na imagem do verso. Por favor, tente novamente";
	msg.addBackApiErrorAntiSpoofing = "Não podemos autenticar o documento. Por favor, tente novamente";
	msg.addBackApiErrorFrontAlreadyExist = "Ocorreu um erro com a imagem. Por favor, tente novamente";
	msg.smallDocumentImg = "Imagem com resolução muito baixa. Tente outra imagem"
	msg.badImageFormat = "Formato de imagem não suportado. Por favor, use PNG ou JPG"
	 
	msg.facePoint = "Siga o ponto com a cabeça";
	msg.faceComunicationErrorRegister = "Erro ao se comunicar com a API. Por favor, tente novamente";
	msg.faceComunicationErrorEndOperation = "Erro ao se comunicar com a API. Por favor, tente novamente"
	msg.faceError = "Ocorreu um erro não identificado. Entre em contato com o administrador";
	msg.faceErrorUserNotExist = "Usuário não existe";
	msg.faceErrorFailAuth = "Falha na autenticação. Por favor, tente novamente";
	 
	msg.faceNoDocFrontImg = "O documento não tem a imagem do rosto. Por favor, tente novamente";
	msg.faceNoSelfieFrontImg = "Erro na imagem do rosto. Por favor, tente novamente";
	msg.faceBiometricCompareError = "A comparação biométrica não foi bem-sucedida. Por favor, tente novamente";
	 
	msg.faceGesturesSmile = "Sorria mostrando os dentes até que o círculo fique verde";
	msg.faceGesturesEyeClose = "Feche os olhos até ouvir o bip";
	msg.faceGesturesEyeRightClose = "Feche o olho direito até que o círculo fique verde";
	msg.faceGesturesEyeLeftClose = "Feche o olho esquerdo até que o círculo fique verde";
	msg.faceGesturesLookLeft = "Olhe ligeiramente para a direita até que o círculo fique verde";
	msg.faceGesturesLookRight = "Olhe ligeiramente para a esquerda até que o círculo fique verde";
	msg.faceGesturesLookUp = "Olhe ligeiramente para cima até que o círculo fique verde";
	msg.faceGesturesLookDown = "Olhe ligeiramente para baixo até que o círculo fique verde";
	msg.faceGesturesNone = "Olhe para frente com um gesto neutro até que o círculo fique verde";
	 
	msg.endOpApiBadScore = "Você não passou nas validações de identidade. Por favor, tente novamente";
	msg.endOpApiDocumentDataError = "Informação do documento incorreta. Por favor, tente novamente";
	msg.endOpApiDocumentBackFrontError = "As informações da frente e do verso do documento não coincidem. Por favor, tente novamente";
	msg.endOpApiDocumentBarcodeDoNotExist = "Não foi possível ler o código de barras. Por favor, tente novamente";
	msg.endOpApiDocumentExpired = "Documento expirado. Por favor, tente novamente";
	msg.endOpApiPersonDataFail = "Não foi possível analisar as informações da pessoa. Por favor, tente novamente";
	 
	msg.readBarcode = "Posicione o código de barras na área central";
	msg.cantReadBarcode = "Se não conseguir ler, tente com outro dispositivo";
	msg.readBarcodeTutorial = "Na próxima tela, será solicitado que você leia o código de barras do seu documento";
	msg.cameraWithoutFocusControl = "A câmera deste dispositivo não permite o controle de foco. Recomendamos tentar com outro dispositivo.";
	msg.close = "Fechar";
    
	msg.selectOne = "Selecione uma câmera para continuar";
	msg.noCameras = "Nenhuma câmera detectada";
	msg.unnamedCamera = "Câmera sem nome";
	msg.continue = "Continuar";
	msg.retry = "Tentar novamente";

    // Returning the msg object
    return msg;
}));
