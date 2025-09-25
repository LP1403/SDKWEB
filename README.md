# Web Onboarding Management

## ¿Qué es Web Onboarding Management?
- Es una interfaz de la solución de Onboarding Management para sitios web
- Se distribuye como dependencia de NPM para instalacion e integracion en sitios web (via https://git.clients.vusecurity.com)
    - Planos (sin framework, spa, etc)
    - React
    - Angular
    - Vue
    - Svelte

## Informacion tecnica
- El SDK tiene 2 puntos de entrada (entry points)
    - vuIDCard (vu-idcard.umd.js/vu-idcard.es.js)
    - vuFace (vu-face.umd.js/vu-face.es.js)
- Para el proceso de Onboarding Management (documento frente y dorso + selfies), se debe utilizar el objeto vuIDCard    
- Para el proceso de Face Recognition (selfies), se debe utilizar el objeto vuFace
- La idea del SDK es contar con los recursos minimos para ser inicializado, luego segun la configuracion realizada por el integrador, el SDK ira bajando de forma dinamica archivos y asi evitar que el usuario final perciba lentidud ya sea por gasto de ancho de banda, por tiempo de espera, etc. (1)
- Se empaqueta utilizando rollup [https://rollupjs.org/](https://rollupjs.org/)
- Se valida utilizando eslint [https://eslint.org/](https://eslint.org/)
- Se distribuye como artifact usando NPM local hacia git.clients.vusecurity.com **(ningun recurso del SDK es publico)**

## Prerequisitos
- Node v20+
- NPM v10+
- Python v3.11+

## Instalacion dependencias
```
npm install --ignore-scripts
npm install --save-dev rollup
npm install --save-dev cross-env
npm install --save-dev @rollup/plugin-replace
npm install --save-dev @rollup/plugin-terser
npm install --save-dev rollup-plugin-obfuscator
```

## Compilación y Empaquetado
- Se empaqueta utilizando rollup, la configuracion se encuentra en el archivo `rollup.config.mjs`
- Al compilar y empaquetar, se ejecuta un análisis sobre los *bundles* generados, lo que permite observar el resultado y las dependencias incluidas en cada *bundle*:
    - `bundle-analysis-vu-idcard.html`
    - `bundle-analysis-vu-face.html`
- Durante la compilación, también se ejecutan validaciones *lint*, que pueden ser modificadas en el archivo `eslint.config.mjs`
- Esto generará la carpeta "dist", que incluye la dependencia lista para ser utilizada en sitios web planos
- Esto generará un archivo ".tgz" (por ejemplo, `vu-om-websdk-1.0.0.tgz`), el cual ya puede ser distribuido a git.clients.vusecurity.com    

### Produccion
```
cd service\static
npm run build && npm pack
```

### Desarrollo/Debug
```
cd service\static
npm run build:dev && npm pack
```

## Integracion parametros
- Hay parametros del SDK que deben ser configurados siempre previo a llamar al metodo initialize
- Hay otros parametros del SDK que deben ser configurados siempre post llamada al metodo initialize
- Esto se debe a la carga dinamica de recursos segun la configuracion del SDK al momento de inicializar
    - Chequear esta informacion y mas en [Wiki VU Security](https://wiki.corp.vusecurity.com/es/digital-identity/onboarding-management/sdk-web/integration-manual/v2)
- Si necesitas usar parámetros que están fuera de los dos objetos principales vuIDCard y vuFace, ten en cuenta lo siguiente:
    - **vuIDCard** está al mismo nivel que **vu.sop**
    - **vuFace** está al mismo nivel que **vu.face.auth**
    - Ninguno de los dos puede apuntar hacia atrás, ejemplos erroneos:
        - vuFace.face.api.host: el objeto ya apunta a vu.face.auth, es decir, vuFace. No se puede ir hacia atras
        - vuFace.face.gestures.backGroundColor: el objeto ya apunta a vu.face.auth, es decir, vuFace. No se puede ir hacia atras
    - Si es necesario, los parámetros a utilizar deben referirse al objeto creado después de inicializar el SDK. Usando los mismos ejemplos anteriores, quedarían así:
        - vu.face.api.host
        - vu.face.gestures.backGroundColor


## vuIDCard
### Parametros pre inicializacion (antes de inicializar SDK)
    - vuIDCard.lang
    - vuIDCard.challengeType
    - vuIDCard.useTheSameCameraInDocAndFaceInPC
    - vuIDCard.useTheSameCameraInDocAndFaceInMobile
    - vuIDCard.setCameraOrientationInPC
    - vuIDCard.userNameValue
    - vuIDCard.enableSelfieList
    - vuIDCard.audio.enabled
    - vuIDCard.recordProcess
    - vuIDCard.screenRecorder.sendVideo
    - vuIDCard.barcodeOptional
    - vuIDCard.readBarcodeClientSide
    - vuIDCard.enableTelemetry 
    - vuIDCard.setHEICFileFormatSupport
    - vuIDCard.videoResizeStyleFillContainer
    - vuIDCard.preCacheFaceModelAsync
    - vuIDCard.warmUpDocModelAsync

### Parametros post inicializacion (dentro del callback de inicializacion SDK)

    - vuIDCard.api.headers
    - vuIDCard.api.host
    - vuIDCard.logApi.host (necesita enableTelemtry = true)

### Funciones post inicializacion (dentro del callback de inicializacion SDK)
    - vu.sop.ui.bottomTextFontSize("18px");
    - vu.sop.ui.alert("test test test")
    - vu.sop.ui.bottomTextAlert.text = function(text) { document.getElementById("inner").innerHTML = text; }
    - vu.sop.ui.bottomTextAlert.show = function() { document.getElementById("inner").style.display = "inline"; }
    - vu.sop.ui.bottomTextAlert.hide = function() { document.getElementById("inner").style.display = "none"; }
    - vu.sop.ui.bottomTextBackGroundColor("rgba(0, 43, 69, 1)");
    - vu.sop.ui.bottomTextFontFamily("MARK OT BOLD, sans-serif");
    - vu.sop.document.ui.setBgStyle2('#1DC600', '#3B83C6', '#212529', '#002B45', '0.5');

## vuFace
### Parametros pre inicializacion (antes de inicializar SDK)
    - vuFace.lang
    - vuFace.challengeType
    - vuFace.userNameValue
    - vuFace.enableSelfieList
    - vuFace.audio.enabled
    - vuFace.useHighResolutionSettingsInPCCamera
    - vuFace.useHighResolutionSettingsInMobileCamera
    - vuFace.gestures.allChallenges
    - vuFace.framesAnalysis
    - vuFace.framesAnalysisLevel

### Parametros post inicializacion (dentro del callback de inicializacion SDK)
    - vuFace.api.headers
    - vuFace.api.host
    - vu.face.ui.useNewTags

### Parametros por tipo de desafio de rostro post inicializacion (dentro del callback de inicializacion SDK)
    - challengeType = mixed:
        - vu.face.gestures.backGroundOpacity
        - vu.face.gestures.backgroundSize
        - vu.face.ui.gestures.numOfChallenges
        - vu.face.gestures.permisiveNeutralChallenge
        - vu.face.gestures.method
        - vu.face.gestures.backGroundColor
        - vu.face.gestures.circleActiveColor 
        - vu.face.gestures.lineWidth
        - vu.face.faceSizeMin 
        - vu.face.faceSizeMax 
        - vu.face.checkPictureQuality         

### Funciones post inicializacion (dentro del callback de inicializacion SDK)
    - vu.sop.ui.bottomTextFontSize("18px"); 
    - vu.sop.ui.bottomTextBackGroundColor("rgba(0, 43, 69, 1)");

## Mockup API OM para pruebas
- Incluye /onbarding, newOperation, addFront, addBack, addBarcode, register, endOperation, addVideos
- Incluye /face, register, login
- Se pueden modificar los distintos codigos de respuesta
- Los procesos e imagenes se descartan siempre
- Los videos se graban en el disco donde corre el mockup para validar calidad segun tipo de dispositivo
- No valida apikey, se puede enviar cualquier dato, en caso de duda revisar el archivo main.py    

```
cd service\static
uvicorn main:app --reload --port 8080
```

## Tamaño de descarga

Esta tabla muestra los tamaños de descarga para los dos componentes principales del SDK, `vuIDCard` y `vuFace`, y los tamaños adicionales de archivos cargados dinámicamente según los diferentes modos.

| Component | Default Size | Front/Back | Mixed Challenge | Points |
|-----------|--------------|------------|-----------------|--------|
| vuIDCard  | 509 KB       | 8.2 MB     | 5.4 MB          | 1.7 MB |
| vuFace    | 400 KB       | -          | 9.1 MB          | 5.8 MB |

### Explicación
- **Tamaño Predeterminado**: Tamaño base de los puntos de entrada principales (`vuIDCard` para la captura de ID y `vuFace` para la captura facial).
- **Frente/Anverso**: Archivos adicionales cargados para capturar el frente y anverso de una tarjeta de identificación (solo en `vuIDCard`).
- **Mixed Challenge**: Archivos adicionales cargados para captura facial basada en gestos mixtos (`vuIDCard` y `vuFace`).
- **Points**: Archivos adicionales cargados para captura facial basada en seguimiento de puntos (`vuIDCard` y `vuFace`).

## Archivos del SDK y su descripcion
- Los 2 archivos importantes del SDK son
    - vu.sop.js
    - vu.face.auth.js
    - Ambos manejan el flujo de OM o de Face segun sea necesario
- De manera dinamica se cargan varias partes del SDK (1)
    - Se carga la modalidad de face donde vu.face.mixedChallenge.js oficia de "clase" que realiza distintas validaciones sobre el rostro 
    - Se cargan distintos componentes del SDK 
        - audios
        - mensajes
        - integracion api
        - telemetria
    - Se cargan las librerias a utilizar desde el frontend (cliente) 
        - heic2any
        - tensorflow
        - inspector-bokeh
        - pico
        - h264-mp4-encoder
        - html2canvas
        - ua-parser
        - jeelizFaceTransfer
        - jeelizFaceFilter


| FileName                                | Description           | Dynamic Loaded?           |
|-----------------------------------------|-----------------------|-----------------------|
| vu.camera.js                            | Manejo de camara                  | <span style="color: red;">❌</span>
| vu.camera.utils.js                      | Utilidades para deteccion de camaras virtuales                  | <span style="color: red;">❌</span>
| vu.error.js                             | Manejo de errores                  |<span style="color: red;">❌</span>
| vu.extras.js                            | Utilidades para realizar requests                  |<span style="color: red;">❌</span>
| vu.face.auth.api.js                     | Integracion API para Face                  |<span style="color: green;">✔️</span>
| vu.face.auth.js                         | Modulo de face                  |<span style="color: red;">❌</span>
| vu.face.mixedChallenge.js               | Modalidad de face mixedChallenge (challengeType = "mixed")                  |<span style="color: green;">✔️</span>
| vu.face.orientation.js                  | Modalidad de face por orientacion (challengeType = "points")                  |<span style="color: green;">✔️</span>
| vu.face.ui.js                           | UI de face general                 |<span style="color: red;">❌</span>
| vu.face.ui.mixedChallenge.js            | UI de face mixedChallenge (challengeType = "mixed")                |<span style="color: green;">✔️</span>
| vu.image.js                             | Validacion de imagenes (blur, flashlight, etc)                  |<span style="color: red;">❌</span>
| vu.screen.capture.js                    | Utilidades para grabacion de pantalla (videos para auditoria)                  |<span style="color: red;">❌</span>
| vu.sop.api.js                           | Integracion API para OM                   |<span style="color: green;">✔️</span>
| vu.sop.audio.en.js                      | Audios en ingles (base64)                  |<span style="color: green;">✔️</span>
| vu.sop.audio.es.js                      | Audios en castellano (base64)                |<span style="color: green;">✔️</span>
| vu.sop.audio.pt.js                      | Audios en portugues (base64)                |<span style="color: green;">✔️</span>
| vu.sop.audio.js                         | Utilidades para reproduccion de audios                  |<span style="color: red;">❌</span>
| vu.sop.audio.rework.js                  | No se utiliza                  | N/A
| vu.sop.audioEnPreLoad.js                | Audios en ingles para preload                  |<span style="color: green;">✔️</span>
| vu.sop.audioEsPreLoad.js                | Audios en castellano para preload                  |<span style="color: green;">✔️</span>
| vu.sop.audioPtPreLoad.js                | Audios en portugues para preload                  |<span style="color: green;">✔️</span>
| vu.sop.barcode.js                       | Utilidades para captura/lectura de barcode                  |<span style="color: red;">❌</span>
| vu.sop.d.ts                             | Definicion basica en TypeScript de vu.sop.js                  | N/A
| vu.sop.document.face.js                 | Utilidades para deteccion/captura de rostro en documentos                  |<span style="color: red;">❌</span>
| vu.sop.document.objectDetection.js      | Utilidades para deteccion/captura de documentos                   |<span style="color: red;">❌</span>
| vu.sop.document.ui.js                   | UI de documentos para OM                  |<span style="color: red;">❌</span>
| vu.sop.documentCodes.js                 | Codigos de templates catalogados en formato VU                  |<span style="color: red;">❌</span>
| vu.sop.face.model.directionsAndGestures.js | Utilidades para deteccion/captura de rostros basado en gestos y movimiento lateral               |<span style="color: red;">❌</span>
| vu.sop.face.objectDetectionAndRotation.js | Utilidades para deteccion/captura de rostros basado rotacion (angulo)               |<span style="color: red;">❌</span>
| vu.sop.js                               | Modulo de OM                  |<span style="color: red;">❌</span>
| vu.sop.logApi.js                        | Integracion API para Telemetria                  |<span style="color: green;">✔️</span>
| vu.sop.msg.en.js                        | Mensajes en ingles                  |<span style="color: green;">✔️</span>
| vu.sop.msg.es.js                        | Mensajes en castellano                  |<span style="color: green;">✔️</span>
| vu.sop.msg.pt.js                        | Mensajes en castellano                  |<span style="color: green;">✔️</span>
| vu.sop.screenTools.js                   | Utilidades para manejo de pantalla                  |<span style="color: red;">❌</span>
| vu.sop.ui.js                            | UI de OM                   |<span style="color: red;">❌</span>
| vu.telemetry.js                         | Utilidades para Telemetria                  |<span style="color: green;">✔️</span>

### Tested modes and used devices 

| SDK Mode | Browser | Cellphone Model | OS Version | Works? | Details |
| ----- | ----- | ----- | ----- | ---- | ----- |
| ID Card | Safari | iPhone XS | 17.5.1 | <span style="color: green;">✔️</span> |
| ID Card | Chrome | Pixel 7 Pro | 14 | <span style="color: green;">✔️</span> |
| ID Card | Firefox | Moto G3 | 6.0 | <span style="color: red;">❌</span> | Memory issues, Crash using Tensorflow, Switching cameras (back/front) issues. 
| ID Card | Chrome | HUAWEI P40 Pro | 10 | <span style="color: green;">✔️</span> |
| ID Card | Chrome | Galaxy S8 | 9.0 | <span style="color: green;">✔️</span> |
| ID Card | Brave | Pixel 3 XL | 12 | <span style="color: green;">✔️</span> |


| SDK Mode | Browser | Cellphone Model | OS Version | Works? | Details |
| ----- | ----- | ----- | ----- | ---- | ----- |
| Face | Safari | iPhone XS | 17.5.1 | <span style="color: green;">✔️</span> |
| Face | Chrome | Pixel 7 Pro | 14 | <span style="color: green;">✔️</span> |
| Face | Firefox | Moto G3 | 6.0 | <span style="color: green;">✔️</span> | Only works challengeType = "points". Mixed challenge fails (Memory issues, Crash using Tensorflow).
| Face | Chrome | HUAWEI P40 Pro | 10 | <span style="color: green;">✔️</span> |
| Face | Chrome | Galaxy S8 | 9.0 | <span style="color: green;">✔️</span> |
| Face | Brave | Pixel 3 XL | 12 | <span style="color: green;">✔️</span> |


### 🎥 Validación de cámaras virtuales (detección silenciosa)

El SDK incluye un sistema inteligente de **detección de cámaras virtuales** para prevenir intentos de suplantación mediante OBS, SnapCam, DroidCam, etc.

---

#### ⚙️ Modos de compilación

El comportamiento cambia según el entorno de compilación:

| Modo         | Comando                    | Cámaras virtuales | Uso típico                |
|--------------|----------------------------|-------------------|---------------------------|
| **Producción** | `npm run build`            | ❌ Bloqueadas      | Entornos reales, usuarios |
| **Debug/Dev** | `npm run build:dev`         | ✅ Permitidas      | Pruebas internas y QA     |

En modo **producción**, la validación está activa y **las cámaras virtuales no pueden ser seleccionadas**.

En modo **desarrollo**, se permite usar cámaras virtuales para facilitar pruebas con herramientas como OBS, SnapCam o emuladores.

### Troubleshooting:
- [React] Recuerda deshabilitar el "StrictMode" en React para evitar invocaciones dobles (es una característica de desarrollo, no se usa en producción). Si necesitas mantenerlo habilitado, ten en cuenta que algunos errores pueden ocurrir como resultado.
- [React] Si tienes instalada la extensión de React DevTools en tu navegador, el SDK podría detectar erróneamente el sitio como si estuviera hecho en React cuando no es así. En caso de que sea necesario, desinstala la extensión para evitar conflictos.
- [React/Vue] Cuando se instala la dependencia, los archivos públicos se copiarán en "/public/static/vu-om-websdk". Por favor, evita modificar estos archivos para evitar posibles problemas.
    - En caso de actualizar a una nueva version de la dependencia, esta carpeta será recreada.
- [Angular] Cuando se instala la dependencia, los archivos públicos se copiarán en "/src/assets/vu-om-websdk". Por favor, evita modificar estos archivos para evitar posibles problemas. [TODO]
    - En caso de actualizar a una nueva version de la dependencia, esta carpeta será recreada.

## Mas informacion

- Spanish: https://wiki.corp.vusecurity.com/es/digital-identity/onboarding-management/sdk-web/integration-manual/v2

- English: https://wiki.corp.vusecurity.com/en/digital-identity/onboarding-management/sdk-web/integration-manual/v2

- Portugues: https://wiki.corp.vusecurity.com/pt-br/digital-identity/onboarding-management/sdk-web/integration-manual/v2
  
## Autor

VU Inc. (soporte@vusecurity.com)

# Licencia

This project is licensed under a commercial license by VU Inc. All rights reserved. Unauthorized copying, distribution, modification, or use of this software is strictly prohibited. For licensing inquiries, please contact VU Inc.


