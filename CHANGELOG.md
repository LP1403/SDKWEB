## [2.4.0] - 2025-09-10
- Se actualiza a la ultima version de uaparser.js
- En caso de detectar que la imagen es capturada con tonos azules se invierte


## [2.3.0] - 2025-07-23
* Modulos ES/UMD 
- Ofuscados

* vu.camera.js
- Se valida en todas las llamadas a takePicture el bloqueo de camaras vrituales
- Ocultada la camara del ámbito global para evitar manipulaciones 

* vu.face.ui.js
- Ocultado doLoop() del ámbito global - función interna de bucle de UI
- Ocultado showFaceDot() del ámbito global - función para mostrar punto de seguimiento facial
- Ocultado hideFaceDot() del ámbito global - función para ocultar punto de seguimiento facial
- Ocultado moveDot() del ámbito global - función para mover posición del punto de seguimiento
- Ocultado genChallenge() y genChallenges() del ámbito global
- Ocultado challengeDoLoop() del ámbito global

* vu.face.ui.mixedChallenge.js
- Ocultado doLoop() del ámbito global - función interna de bucle de procesamiento de gestos
- Ocultado gestureMach() del ámbito global - lógica de coincidencia de gestos
- Ocultado drawBox() del ámbito global - función para dibujar caja de detección facial
- Ocultado genChallenge() y genChallenges() del ámbito global
- Ocultado challengeDoLoop() del ámbito global
- Ocultado challengeReset() del ámbito global

- Ocultado vu.face.ui.gestures.allChallenges del ambito global, ahora se configura con vuFace.gestures.setChallenges(['eyeClose']);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

- Ocultado vu.face.ui.gestures.numOfChallenges del ambito global, ahora se configura con vuFace.gestures.setNumOfChallenges(2);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

- Ocultado vu.face.gesturesConf del ambito global, ahora se configura con vuFace.setGestureConf([['smile', 50], ['bothEyesClosed', 60]]);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

- Ocultado vu.face.ui.gestures.resultsFeedbackTimeFrame del ambito global, ahora se configura con vuFace.gestures.setResultsFeedbackTimeFrame(1000);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

- Ocultado vu.face.ui.gestures.resultsValidateTimeFrame del ambito global, ahora se configura con vuFace.gestures.setResultsValidateTimeFrame(4000);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

- Ocultado vu.face.ui.gestures.resultsFeedbackPercentual del ambito global, ahora se configura con vuFace.gestures.setResultsFeedbackPercentual(60);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release();   

- Ocultado vu.face.ui.gestures.resultsValidatePercentual del ambito global, ahora se configura con vuFace.gestures.setResultsValidatePercentual(60);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

- Ocultado vu.face.ui.gestures.resultsValidateMinTimeFrame del ambito global, ahora se configura con vuFace.gestures.setResultsValidateMinTimeFrame(2000);
  - Se puede configurar previo a la inicializacion
  - Solo se puede configurar de nuevo una vez hasta que se llama al metodo vuFace.release(); o vuIDCard.release(); 

## [2.2.4] - 2025-07-07
* Se cambian los audios en español por tono neutro.
* Corrección general de mensajes con errores ortográficos, tildes y otros detalles tipográficos.
* Refuerzo en la protección de datos sensibles: ahora los valores relacionados con detección de cámaras virtuales se manejan exclusivamente en formato cifrado.

## [2.2.3] - 2025-07-03
* Arreglo para mantener referencia de vu.camera en casos que no se llame a los metodos .start de vuFace y/o vuIDCard

## [2.2.0] - 2025-06-01
* Analisis de frames (continuo)

## [2.1.0] - 2025-04-16
* Analisis de frames (simple)

## [2.0.0] - 2025-07-01
* Se lanza la nueva version del SDK v2.0.0, la misma como dependencia de NPM (publicada en git.clients)
* https://wiki.corp.vusecurity.com/es/digital-identity/onboarding-management/sdk-web/integration-manual/v2

## [1.0.43] - 2025-05-14
### Added
* Se agrega nueva variable vu.face.ui.useNewTags para el envío de tags nuevos correspondientes al desafío de seguimiento de puntos. Por defecto se establece en "false", para no romper retrocompatibilidad, en ese caso se siguen mandando tags aleatorios en las selfies.
* Nuevos tags: SCU (SELFIE CENTER UP), SUR (SELFIE UP RIGHT), SCR (SELFIE CENTER RIGHT), SDR (SELFIE DOWN RIGHT), SCD (SELFIE CENTER DOWN), SDL (SELFIE DOWN LEFT), SCL (SELFIE CENTER LEFT), SUL (SELFIE UP LEFT) 


## [1.0.42] - 2025-03-12
### Fix
* Se aplican condiciones en la generacion de desafios en la prueba de vida con seguimiento por puntos, de modo que el desafio de mirar hacia el centro solo se genere al final para evitar tags duplicados de "SN".

## [1.0.41] - 2025-02-20
### Added
* Se agregan archivos para idioma portugues
  - vu.sop.audio.pt.js
  - vu.sop.audioPtPreLoad.js
  - vu.sop.msg.pt.js

## [1.0.40] - 2024-12-17
### Added
* Captura de codigo de respuesta 10201 (ML_DOCUMENT_ANTISPOOFING_NO_INFORMATION) en addBack
### Changed
* Se remplaza $.ajax de jQuery por fetch en solicitud HTTP vu.sop.api.addVideo y vu.sop.api.addVideos

## [1.0.39] - 2024-11-01
### Added
* Captura de codigo de respuesta 10201 (ML_DOCUMENT_ANTISPOOFING_NO_INFORMATION) en addFront
* Implementacion de navigator.userAgentData en getBrowserInfo para navegadores basados en Chromium

## [1.0.38] - 2024-08-09
### Fix
- fix vu.face.auth.videoResizeObserver 
- fix code smells 
- parameterize vu.face.auth.loadJs.attempts and vu.sop.loadJs.attempts 
- delete const sonidos. not used 
- hidden vu.sop.ui.isSOCompatible logs 
- change vu.sop.audio.play() 
- delete vu.sop.audio.snd not used 
- add willReadFrequently in 2d getContext 
- initialize vu.face.ui.gestures.circle.style.backgroundImage 
- delete vu.face.ui.gestures.beep not used. 
- 
## [1.0.37] - 2024-06-27
### Fix
* Feedback de calidad de imagen en la pantalla de rostros (mixedChallenge)
* Se sacan console.logs del manejo de rostros que estaban de mas.
* Se corrige el error de que no se mostraba el feedback cuando la calidad del rostro no coincidia.

### Changed
* Se cambia el modelo de deteccion de rostros
* Se cambia vu.face.ui.gestures.resultsValidatePercentual de 30 a 50
* Cambio en modo de insercion audios en el dom, flag para vu.sop.auido.reproducir, evita audios sobrepuestos

## [1.0.36] - 2024-05-10
### Added
* Captura de codigo de respuesta 1930 (END_OPERATION_BIOMETRICS_COMPARE_FAIL) en endOperation
* Implementacion de force resolution (ideal:1280) en vu.sop.api.js para imagenes de biometria

### Fix
* Ajuste en regex pattern de userName input
* Se agrega audioEsPreload en onboarding test
* Fix del audio en ingles de userError
* Validacion en new operation para que captureLogTraceId no sea null
  * Actualizacion de dockerfile

## [1.0.35.1] - 2024-04-29
### Fix
* Fix Telemetria desactivada por defecto. Se saca el AWAIT del addEvent
* Fix content type duplicado en vu.sop.logApi
* Ajuste en validacion antes de guardar eventos front success y back success.
* Fix se bloquea la pantalla cuando usamos telemetria

## [1.0.35] - 2024-03-07
### Added
* Envio del raw en addBarcode

### Fix
* Se evita la peticion de barcode para VU-COL-ID 02
* Se corrige el estilo de 'height' en las consultas @media del elemento #vu\.sop.
* Se agrego el condicional de telemetria habilitada en archivos que invocaban a la funcion vu.telemetry.addEvent.
* Correccion para traslapación de audios. 
* Ajuste en vista de error cuando falla el flujo doPreSetUser en el step new operation.

## [1.0.34] - 2024-01-23
### Added
* Principios del protocolo de calidad
* Implementacion de lectura de barcodes del lado del cliente.
* Warning cuando la camara no tiene control de foco
* Error cuando no se encuentra un rostro en el documento
* Integración con api de event capture para : inició de trace, guardado de eventos de captura de documento y selfies)

## [1.0.33] - 2023-11-29
### Added
* Librería UA-parser para detectar el navegador, el motor, el sistema operativo, la CPU y el tipo/modelo de dispositivo del usuario. Se ejecuta en el navegador (del lado del cliente) 
* Body Integrity Check, para su uso es necesario configurar el salt en el header de la misma forma que se hace con el apikey

### Fix
* Validación de permisos de cámara en el flujo de face

## [1.0.32] - 2023-09-28
### Added
*Se adiciona el gesto ojos cerrados al modo Mixed Challenge
*Adición de tiempo para la captura del gesto selfie neutral para el modo Mixed Challenge

## [1.0.31.1] - 2023-07-27
### Fix
* Se condiciona la generación de new operation desde FaceLogin cuando se deshabilita mostrar el campo de usuario
* Se extiende el uso de rutas relativas en vu.sop.face.model.derectionsAndGestures.modelURL y vu.sop.face.objectDetectionAndRotation.modelURL
* Se actualizan mensajes y audios que tenían letras truncadas (inglés)
### Added
* En vu.sop.js y vu.face.auth.js encabeza en comentario la versión del producto

## [1.0.31] - 2022-12-23
### Fix
*Corrección ortografía en los mensajes y notificaciones versión español
*Se actualiza la extensión de 3 audios a mp3 su anterior extensión era wav

### Added
*Códigos de respuesta del API para el manejo de errores, de forma que se enrutan por mensajes ya manejados por el SDK web

## [1.0.30.1] - 2022-09-21
### Fix
*Corrección flujo de identificación de cámara para proceso de captura de documentos 

## [1.0.30] - 2022-09-13
### Added
* Integracion sin input de usuario

### Fix
*Se establece cámara no gran angular para la toma de documentos en dispositivos que cuentan con más de dos cámaras

## [1.0.29] - 2022-07-27
### Fix
*Corrección de expresiones regulares que tomaban alto tiempo en procesarse
*Captura de video de prueba de vida y envío al API 

## [1.0.28.1] - 2022-07-08
### Fix
*Se corrige la no reproducción de audios en ios, para ello es necesario hacer una pre carga de todos los audios a través de los js vu.sop.audioEsPreLoad.js
para español y vu.sop.audioEnPreLoad.js para inglés; cargarlo previamente como en este ejemplo <script src="onboarding/js/vu.sop.audioEsPreLoad.js" type="text/javascript"></script>

## [1.0.28] - 2022-04-26
### Fix
* Fallo de autenticaion en el segundo gesto: Configura la resolucion de la camara al maximo cuando se usa vu.face.useGestures == 'mixedChallenge'
            vu.face.auth.useHighResolutionSettingsInPCCamera = true
            vu.face.auth.useHighResolutionSettingsInMobileCamera = true

### Added
* Se agrega la función vu.sop.api.registers que permite el envío de las selfies capturadas en la prueba de vida para el proceso de onboarding
* Se agrega la función vu.sop.api.faceLoginList que permite el envío de las selfies capturadas en la prueba de vida para el proceso de face login
* Se agrega la función vu.sop.api.faceRegisters que permite el envío de las selfies capturadas en la prueba de vida para el proceso de face register
* Para el flujo de face se agrega vu.face.auth.enableSelfieList = false que mantiene el flujo con sólo la selfie neutral, su valor en true permite el envío de las selfies capturadas en las pruebas gestuales
* Para el flujo de onboarding se agrega vu.sop.enableSelfieList = false que mantiene el flujo con sólo la selfie neutral, su valor en true permite el envío de las selfies capturadas en las pruebas gestuales

### Changed 
* El arreglo para mixedChallenge se limitó a los siguientes gestos 'smile', 'lookLeft', 'lookRight'

## [1.0.27] - 2022-03-16
### Change 
* Se expone el parámetro de proporción facial
* Los mensajes relacionados al distancia de rostro se lanzan primero que el de rostro borroso

## [1.0.26] - 2022-03-10
### Change 
* Se cambia la cantidad de JPEG de 85 a 95 compresión
* Se amplia en encuadre para captura de documentos en vertical

## [1.0.25] - 2022-02-25
### Change
* Se da tiempo de espera para reajuste de componentes en el giro de pantalla, presentaba fallos para iOS

## [1.0.24] - 2022-01-14
### Added
* Ejemplos de Alertas personalizadas
* Alerta en la subida de imagen cuando la imagen es muy chica
* Alerta en la subida de imagen cuando no es un formato soportado
* Mejoras para el soporte PNG/WebP/AVI/HEIF en la subida de archivo

### Changed
* Mejor proporcion del video vertical


## [1.0.23] - 2021-12-07
### Added
* DOC: Detector de destello en el documento
* FACE: Variacion del estilo de elpise, con mejor soporte para zoom (vu.face.ui.gestures.elipseSvg2)
* FACE: Parametro para ajustar el zoom del fondo
* DOC & FACE: Opcion para desacoplar las alertas de calidad de imagen

### Changed
* Actualización Tensorflow 3.9.0

## [1.0.22] - 2021-10-29

### Changed
* Actualización Tensorflow 3.9.0
* Nuevo modelo de detección de documento, mas liviano y menos sensible al angulo
* Mejoras para detección del loop de documento

# Fix
* vu.sop.useTheSameCameraInDocAndFaceInPC fallando por la clasificación incorrecta de dispocitivo mobile
* Fix "fill content" en el redimencionamiento de pantalla 
* Fix redimencionamiento de imagenes antes de la subida como archivo

## [1.0.21] - 2021-9-7
### Added
* Grabación de vídeo compatible con celulares

### Changed
* Actualización Tensorflow 3.8.0
* Soporte 640x360
* Nuevo modelo para detección de orientación y gestos ( modo vu.face.useGestures = 'mixedChallenge')

## [1.0.20] - 2021-08-2
### Added
* Nuevo modo de deteccion de rostro, gestos y orientacion de rostro
* Validaciones de calidad de prueba de vida
    * Imagen borrosa 
    * Rostro muy oscura
    * Rostro Centrado
    * Distancia del rostro de la camara
* Validaciones de calidad de captura de documentos
    * Imagen borrosa 
    * Documento muy oscuro
    * Documento Centrado
    * Distancia del Documento repecto a la camara
* Hash de integridad de los mensajes como header 
    * Se suma un HASH del mensaje REST, este HASH puede utilizarse para validar la integridad del mensaje REST. 
* Validación de resolución de la cámara en SOP, si la resolucion es inferior a 720p, te muestra un error.
   
### Changed
* Actualizacion Tensorflow 3.8.0 (Mejora minima de performance)
* Mejora de deteccion de camaras de baja resolucion 
* Se cambia la extensión del HAAR cascade de rostro para facilitar la integración con IIS

 
## [1.0.19] - 2021-06-09
### Added
* Opción de gesto neutral permisivo
### Fixed
* Fix Responsive en estilos
* Mejoras en el re-dimensionamiento del video

 
## [1.0.18] - 2021-06-07
### Added
* Nuevo modelo de detección de documento
* Nueva opción para ampliar el video
* Opción para eliminar el overlay del subtitulo
### Fixed
* Error en la detección de la version de IOS/Safari
* Fix problemas en la pantalla de prueba de vida, en el estilo ovalado
* Fix problemas de carga de la librería de detección de rostro

## [1.0.17] - 2021-05-14
### Added
* FACE: Opción para utilizar la cámara en alta resolución en la prueba de vida
* SOP: Utilizar la misma cámara en todo el proceso
* SOP: Estilo nuevo en la pantalla de foto de documentos
* FACE: Registración en lugar de auutenticación
* Ejemplo para generar un audio generate_speech_b64.py
### Changed
* Mejora en el seteo del foco de la cámara
* Actualización de la librería de detección de rostros
### Fixed
* Detección del documento

 
## [1.0.16] - 2021-04-26
### Added
* Nuevo estilo para la pantalla de captura de documento
### Changed
* Retorno del blob de video en la captura de pantalla
* Mejoras en la pantalla tipo ovalo de captura de rostro
* Actualización de la version de tensorflowJS de 2.7.0 a 3.5.0
* Subimos la resolución del análisis en la detección del documento
### Fixed
* Error de Observer cuando se retira el div de la pantalla
* Uso de variables globales sin prefijo en vu.errors y en la captura de pantalla

 
## [1.0.15] - 2021-03-31
### Changed
* Padding en el rectángulo que contiene los mensajes en el contenedor de la cámara.
* cambio solicitado en webkit-text-stroke-width de 1 a 0 px.
### Fixed
* Fix menor para solucionar problema de espacio en blanco en la parte derecha de la elipse en la toma de gestos.

 
## [1.0.14] - 2021-03-16
### Fixed
* Fix menor para solucionar problema con la toma de los gestos de gui�o.
 

## [1.0.13] - 2021-02-25
### Added
* Marco y fondo de prueba de vida configurables
### Changed
* Soporte para WebView en safari (AppleWebKit - Cordova)
* Se modifica ejemplo examples_captures.html para unificar nombres de botones y comportamiento con sdk mobile.
### Fixed
* Fix menor para solucionar error de carga el javascript antes de terminar el HTML (firefox)


## [1.0.12] - 2021-02-01
### Added
* Funcionalidad para la grabación del proceso de onboarding
* Funcionalidad para redefinir pantalla de método de carga de documentos

 
## [1.0.11] - 2021-01-15
### Changed
* Se agrega controla que no sonría para la toma del gesto neutral

 
## [1.0.10] - 2021-01-13
### Added
* Mensaje en consola para ver si se rota la imagen
* Se modifica manejo de errores para permitir customizar la pantalla
* Se permite redefinir la carga de documento frente y dorso
### Fixed
* Se corrige problema en re-definición de gestos

 
## [1.0.9] - 2020-12-28
### Fixed
* Fix para navegadores viejos

 
## [1.0.8] - 2020-12-28
### Fixed
* Fix en prueba de vida
* Mejoras en los estilos (sacamos algunos estilos inline)
* Actualización en las notas de remote debug de IOS.
* Fix SVG rotación en IOS
* Ajustes en el reconocimiento por gestos de acuerdo a ultima prueba
* Mejora en generador de audios
* Corrección de tab
### Added
* Se agrega posibilidad de configuración de texto para captura de documento. Color, fuente y tamaño
* Se agrega la posibilidad de cambiar imagen de loading
* Implementación de adapterjs
### Changed
* Modificaciones para IOS
* preCacheFaceModelAsync - Llevar al cache el modelo de face
* Ejemplo actualizado
* Rollback de la librería de detección de rostros.

 
## [1.0.7] - 2020-12-11
### Added
* Incorporación de modificaciones de develop a master
* Detector de cajas generico.
* Tensorflow 2.4 con WASM
* Audios y script para generarlos.
* Mejora en el tiempo de carga del modelo de detección de documentos
* Mejoras en la mensajería y respuestas
* Mejoras documentación
* Soporte para Docker
* Implementación de checklist de entregas
* Soporte para bromearía por gestos
* Proxy para intercesión de mensajería, debug y deploy por docker

 
## [1.0.3] - 2020-05-04
### Added
* Mejor manejo de headers para integraciones
* Mejoras documentación
* Ejemplo de llamar pantalla por pantalla
### Fixed
* Errores en la mensajería


## [1.0.0] - 2020-04-09
### Added
* Mejor manejo de headers para integraciones
* Mejoras en documentación

### Fixed
* Errores en la mensajería