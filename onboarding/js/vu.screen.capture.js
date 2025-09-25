import vuSopDocumenUi from 'vu.sop.document.ui'; //

// Reference the existing vu object
const vu = window.vu || {};
vu.screen = vu.screen || {};
vu.screen = vu.screen || {};
vu.screen.capture = vu.screen.capture || {};
//vu.camera = vu.camera || {};
vu.sop = vu.sop || {};
vu.sop.screenRecorder = vu.sop.screenRecorder || {};
vu.sop.document = vu.sop.document || {};
//vu.sop.document.ui = vu.sop.document.ui || {};

let moduleCamera = null;

vu.screen.capture.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");

    moduleCamera = camera;    
    vu.sop.screenRecorder = window.vu.sop.screenRecorder || {};
    vu.sop.steps = window.vu.sop.steps || {};
    vu.sop.document = window.vu.sop.document || {};
    vu.face = window.vu.face;
}


vu.screen.capture.style = 'videoOnly'
vu.screen.capture.vidWidth = 640
vu.screen.capture.vidHeight = 480
vu.screen.capture.frameRate = 5

/******************************************************************************************************************/
// https://github.com/TrevorSundberg/h264-mp4-encoder
vu.screen.capture.doCaptureLoop = false
vu.screen.capture.doRecordLoop = false
vu.screen.capture.videoEncoder = false

// Elements
//vu.screen.capture.canvas = document.getElementById("previewCanvas")
vu.screen.capture.canvas = document.createElement('canvas');
vu.screen.capture.baseDiv = document.getElementById("vu.sop")
vu.screen.capture.canvasContext = vu.screen.capture.canvas.getContext('2d');
vu.screen.capture.canvasVideo = document.createElement('canvas');
vu.screen.capture.canvasVideoContext = vu.screen.capture.canvasVideo.getContext('2d');
vu.screen.capture.imgTransform = document.createElement('img');

vu.screen.capture.videoElement = document.getElementById("vu.sop.ui.video")
vu.screen.capture.bottomTextElement = document.getElementById("vu.sop.ui.bottomText")
vu.screen.capture.bottomTextAlertElement = document.getElementById("vu.sop.ui.bottomTextAlert")
vu.screen.capture.faceOverlayElement = document.getElementById("vu.face.ui.gestures.circle")
vu.screen.capture.documentOverlayElement = document.getElementById("vu.sop.document.ui.background")


vu.screen.capture.recordVideoStart = async function() {
    // TODO Agregar data-html2canvas-ignore a los nodos que correspondan (optimizacion)
    let vidWidth;
    let vidHeight;
    if (vu.screen.capture.style === 'videoOnly') {
        vidWidth = vu.screen.capture.vidWidth
        vidHeight = vu.screen.capture.vidHeight
    } else {
        vidWidth = window.getComputedStyle(vu.screen.capture.baseDiv, null).getPropertyValue('max-width').split('px')[0];
        vidHeight = window.getComputedStyle(vu.screen.capture.baseDiv, null).getPropertyValue('max-height').split('px')[0];
        vidWidth = 2 * Math.round(vidWidth/2);
        vidHeight = 2 * Math.round(vidHeight/2);
    }
    console.log("Start Recording - video Width " + vidWidth + "px Height " + vidHeight + "px")

    vu.screen.capture.videoEncoder = await HME.createH264MP4Encoder()
    vu.screen.capture.videoEncoder.frameRate = vu.screen.capture.frameRate
    vu.screen.capture.videoEncoder.width = vidWidth;
    vu.screen.capture.videoEncoder.height = vidHeight;
    vu.screen.capture.videoEncoder.quantizationParameter = 20;      // Video Quality
    vu.screen.capture.videoEncoder.groupOfPictures = 10;            // Keyframe
    //vu.screen.capture.videoEncoder.temporalDenoise = true;          // Use temporal noise supression.
    //vu.screen.capture.videoEncoder.speed = 5                        // Speed where 0 means best quality and 10 means fastest speed [0..10].
    vu.screen.capture.videoEncoder.initialize();

    vu.screen.capture.canvas.width = vidWidth
    vu.screen.capture.canvas.height = vidHeight
    let canvas = await vu.screen.capture.getFrame();
    vu.screen.capture.videoEncoder.addFrameRgba(vu.screen.capture.canvasContext.getImageData(0, 0,
        vu.screen.capture.canvas.width, vu.screen.capture.canvas.height).data);
    vu.screen.capture.doCaptureLoop = true;
    vu.screen.capture.doRecordLoop = true;

    vu.screen.capture.captureLoop();
    vu.screen.capture.recordLoop();

}

vu.screen.capture.recordVideoStop = async function() {
    vu.screen.capture.doCaptureLoop = false;
    vu.screen.capture.doRecordLoop = false;

    vu.screen.capture.videoEncoder.finalize();
    const uint8Array = vu.screen.capture.videoEncoder.FS.readFile(vu.screen.capture.videoEncoder.outputFilename);

    const video = new Blob([uint8Array], { type: "video/mp4" })
    let response;
    console.log("vu.sop.screenRecorder.sendVideo", vu.sop.screenRecorder.sendVideo);
    console.log("vu.face.auth.screenRecorder.sendVideo", vu.face.auth.screenRecorder.sendVideo);
    if( vu.sop.screenRecorder.sendVideo === true) {
        response = await vu.sop.steps.addVideoResolve(video);
    }
    else if ( vu.face.auth.screenRecorder.sendVideo === true ) 
    {
        response = await vu.face.auth.addVideoResolve(video);
    }
    else
        {
        vu.screen.capture.recordVideoStopAndDownload();
    }

    vu.screen.capture.videoEncoder.delete();
    return response
}

vu.screen.capture.recordVideoStopAndDownload = async function() {
    const uint8Array = await vu.screen.capture.recordVideoStop();

    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: "video/mp4" }));
    anchor.download = "download";
    anchor.click();
}

vu.screen.capture.recordLoop = async function() {
    try {
        vu.screen.capture.videoEncoder.addFrameRgba(vu.screen.capture.canvasContext.getImageData(0, 0,
            vu.screen.capture.canvas.width, vu.screen.capture.canvas.height).data);
    } catch (error) {
        //console.log(error)
    }
    let timePerFrame = 1000 / vu.screen.capture.frameRate
    if (vu.screen.capture.doRecordLoop == true) {
        setTimeout(function () {
            if(vu.screen.capture.doRecordLoop == true)    
            {
                let promise = vu.screen.capture.recordLoop()
            }        
            
        }, timePerFrame);
    }
}

vu.screen.capture.captureLoop = async function() {
    let timeStart = new Date();
    await vu.screen.capture.getFrame()
    let timeEnd = new Date().getTime() - timeStart.getTime()
    let timePerFrame = 1000 / vu.screen.capture.frameRate
    let loopWaitingTime;
    if ( timeEnd >= timePerFrame) {
        loopWaitingTime = 1
    } else {
        loopWaitingTime = timePerFrame - timeEnd
    }
    if (vu.screen.capture.doCaptureLoop == true) {
        setTimeout(function () {
            if (vu.screen.capture.doCaptureLoop == true)
            {
                let promise = vu.screen.capture.captureLoop()
            }            
        }, loopWaitingTime);
    }
}

vu.screen.capture.baseDivPath = false
vu.screen.capture.getFrame = async function() {
    //start = new Date();
    if (vu.screen.capture.style === 'videoOnly') {
        // videoOnly
        // Dibujar el fondo negro
        vu.screen.capture.canvasContext.fillStyle = "black";
        vu.screen.capture.canvasContext.fillRect(0, 0, vu.screen.capture.canvas.width, vu.screen.capture.canvas.height);
        // Captura de video
        let scale;
        if (moduleCamera.isVerticalVideo()) {
            scale = moduleCamera.video.videoHeight/vu.screen.capture.vidHeight
        } else {
            scale = moduleCamera.video.videoWidth/vu.screen.capture.vidWidth
        }
        let framePosition = {}
        framePosition.width = Math.round(moduleCamera.video.videoWidth/scale)
        framePosition.height = Math.round(moduleCamera.video.videoHeight/scale)
        framePosition.left = Math.round((vu.screen.capture.vidWidth-framePosition.width)/2)
        framePosition.top = Math.round((vu.screen.capture.vidHeight-framePosition.height)/2)

        vu.screen.capture.canvasContext.drawImage(moduleCamera.video,
                                                    framePosition.left, framePosition.top,
                                                    framePosition.width, framePosition.height);

    } else {
        // Experimental
        if (vu.screen.capture.baseDivPath === false ) {
            vu.screen.capture.baseDivPath = vu.screen.capture.getDomPath(vu.screen.capture.baseDiv)
        }
        let captureType;
        if (vu.face.ui.gestures.loop === true)
        {
            captureType = 'getVideoFrame Face'
            await vu.screen.capture.getVideoFrame();
        } else if (typeof vu.sop.document !== 'undefined' && vu.sop.document.ui.doLoop === true) {
            captureType = 'getVideoFrame Doc'
            await vu.screen.capture.getVideoFrame();
        } else {
            captureType = 'html2canvas'
            let canvas = await html2canvas(vu.screen.capture.baseDiv, {
                /*ignoreElements: (element)=>{
                    if ( element.hasAttribute('id') && element.id != '' ) {
                        nodeName = element.nodeName.toLowerCase() + '#' + element.id
                    } else {
                        nodeName = element.nodeName.toLowerCase()
                    }
                    console.log(nodeName)
                    if (vu.screen.capture.baseDivPath.includes(nodeName)) {
                        return false
                    } else {
                        return true
                    }
                }*/
            });
            // Dibujar el fondo negro
            vu.screen.capture.canvasContext.fillStyle = "black";
            vu.screen.capture.canvasContext.fillRect(0, 0, vu.screen.capture.canvas.width, vu.screen.capture.canvas.height);
            // Obtener canvas de pantalla
            vu.screen.capture.canvasContext.drawImage(canvas,
                0, 0,
                vu.screen.capture.baseDiv.offsetWidth, vu.screen.capture.baseDiv.offsetHeight);
        }
    }
    //console.log('screenshot Time', new Date().getTime() - start.getTime(), 'ms ', captureType)
    return vu.screen.capture.canvas
}

vu.screen.capture.getVideoFrame = async function() {
    vu.screen.capture.videoElement = document.getElementById("vu.sop.ui.video")
    vu.screen.capture.bottomTextElement = document.getElementById("vu.sop.ui.bottomText")
    vu.screen.capture.faceOverlayElement = document.getElementById("vu.face.ui.gestures.circle")
    vu.screen.capture.documentOverlayElement = document.getElementById("vu.sop.document.ui.background")
    vu.screen.capture.bottomTextAlertElement = document.getElementById("vu.sop.ui.bottomTextAlert")


    let start = new Date();
    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar el fondo negro
    vu.screen.capture.canvasContext.fillStyle = "black";
    vu.screen.capture.canvasContext.fillRect(0, 0, vu.screen.capture.canvas.width, vu.screen.capture.canvas.height);
    // Dibujar el fondo (captura de video)
    let framePosition = vu.screen.capture.getPositionRelative(vu.screen.capture.videoElement)
    vu.screen.capture.canvasVideo.width = vu.screen.capture.baseDiv.offsetWidth;
    vu.screen.capture.canvasVideo.height = vu.screen.capture.baseDiv.offsetHeight;
    vu.screen.capture.canvasVideoContext.translate(vu.screen.capture.canvasVideo.width, 0);       // Flip Image
    vu.screen.capture.canvasVideoContext.scale(-1, 1);                                       // Flip Image
    vu.screen.capture.canvasVideoContext.drawImage(moduleCamera.video,
                                                framePosition.left, framePosition.top,
                                                framePosition.width, framePosition.height);

    vu.screen.capture.canvasContext.drawImage(vu.screen.capture.canvasVideo, 0, 0);
    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar Face Overlay
    let overlayElement;
    if (vu.face.ui.gestures.loop){
        overlayElement = vu.screen.capture.faceOverlayElement
        vu.screen.capture.imgTransform.src = vu.screen.capture.faceOverlayElement.style.backgroundImage.split('"')[1]
    } else {
        overlayElement = vu.screen.capture.documentOverlayElement
        vu.screen.capture.imgTransform.src = vu.screen.capture.documentOverlayElement.style.backgroundImage.split('"')[1]
    }
    let overlayPosition = vu.screen.capture.getPositionRelative(overlayElement)

    let backgroundSize = window.getComputedStyle( overlayElement, null ).getPropertyValue( 'background-size' );
    if (backgroundSize.includes("%") ) {
        let size = ( backgroundSize.split("%")[0] / 100)
        overlayPosition.left = Math.round(overlayPosition.left - (((overlayPosition.width * size) - overlayPosition.width)/2))
        overlayPosition.top  = Math.round(overlayPosition.top - (((overlayPosition.height * size) - overlayPosition.height)/2))
        overlayPosition.width = Math.round(overlayPosition.width * size)
        overlayPosition.height = Math.round(overlayPosition.height * size)
    }

    vu.screen.capture.canvasContext.drawImage(vu.screen.capture.imgTransform,
                                            overlayPosition.left, overlayPosition.top,
                                            overlayPosition.width, overlayPosition.height);

    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar subtitulo
    vu.screen.capture.canvasContext.fillStyle = vu.screen.capture.bottomTextElement.style.backgroundColor;
    let subPosition = vu.screen.capture.getPositionRelative(vu.screen.capture.bottomTextElement)
    vu.screen.capture.canvasContext.fillRect(subPosition.left, subPosition.top,
                                             subPosition.width, subPosition.height);

    let fontSize = vu.screen.capture.bottomTextElement.style.fontSize
    let fontFamily = window.getComputedStyle( vu.screen.capture.bottomTextElement, null ).getPropertyValue( 'font-family' );
    let fontColor = window.getComputedStyle( vu.screen.capture.bottomTextElement, null ).getPropertyValue( 'color' );
    let fontWeight = window.getComputedStyle( vu.screen.capture.bottomTextElement, null ).getPropertyValue( 'font-weight' );

    vu.screen.capture.canvasContext.textAlign = 'center';
    vu.screen.capture.canvasContext.fillStyle = fontColor;
    vu.screen.capture.canvasContext.font =  "normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily;
    vu.screen.capture.canvasContext.textBaseline = 'middle';

    //console.log("normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily)

    vu.screen.capture.canvasContext.fillText(vu.screen.capture.bottomTextElement.textContent,
        subPosition.left + Math.round(vu.screen.capture.bottomTextElement.offsetWidth/2),
        subPosition.top + Math.round(vu.screen.capture.bottomTextElement.offsetHeight/2));

    //-----------------------------------------------------------------------------------------------------------------
    // Dibujar Alerta
    if (vu.screen.capture.bottomTextAlertElement.style.display !== "none") {
        let alertPosition = vu.screen.capture.getPositionRelative(vu.screen.capture.bottomTextAlertElement)

        let x = alertPosition.left
        let y = alertPosition.top
        let width = alertPosition.width
        let height = alertPosition.height
        let radius = window.getComputedStyle( vu.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'border-radius' ).split('px')[0]

        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        vu.screen.capture.canvasContext.beginPath();
        vu.screen.capture.canvasContext.moveTo(x + radius, y);
        vu.screen.capture.canvasContext.arcTo(x + width, y, x + width, y + height, radius);
        vu.screen.capture.canvasContext.arcTo(x + width, y + height, x, y + height, radius);
        vu.screen.capture.canvasContext.arcTo(x, y + height, x, y, radius);
        vu.screen.capture.canvasContext.arcTo(x, y, x + width, y, radius);
        vu.screen.capture.canvasContext.closePath();

        vu.screen.capture.canvasContext.fillStyle = "black";
        vu.screen.capture.canvasContext.fill();

        fontSize = vu.screen.capture.bottomTextAlertElement.style.fontSize
        fontFamily = window.getComputedStyle( vu.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'font-family' );
        fontColor = window.getComputedStyle( vu.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'color' );
        fontWeight = window.getComputedStyle( vu.screen.capture.bottomTextAlertElement, null ).getPropertyValue( 'font-weight' );

        vu.screen.capture.canvasContext.textAlign = 'center';
        vu.screen.capture.canvasContext.fillStyle = fontColor;
        vu.screen.capture.canvasContext.font =  "normal " + fontWeight + " " + fontSize + " Unknown, " + fontFamily;
        vu.screen.capture.canvasContext.textBaseline = 'middle';
        vu.screen.capture.canvasContext.fillText(vu.screen.capture.bottomTextAlertElement.textContent,
            alertPosition.left + Math.round(vu.screen.capture.bottomTextAlertElement.offsetWidth/2),
            alertPosition.top + Math.round(vu.screen.capture.bottomTextAlertElement.offsetHeight/2));

    }
    //-----------------------------------------------------------------------------------------------------------------

    return vu.screen.capture.canvas
    //console.log('screenshot Time', new Date().getTime() - start.getTime(), 'ms')
}

vu.screen.capture.getPositionRelative = function(element) {
    let y = vu.screen.capture.baseDiv.getBoundingClientRect().top + window.scrollY
    let x = vu.screen.capture.baseDiv.getBoundingClientRect().left + window.scrollX

    return {
        top: Math.round((element.getBoundingClientRect().top + window.scrollY) - y),
        left: Math.round((element.getBoundingClientRect().left + window.scrollX) - x),
        height: element.offsetHeight,
        width: element.offsetWidth
    }
}


vu.screen.capture.getDomPath = function(el) {
  var stack = [];
  while ( el.parentNode != null ) {
    //console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( el.hasAttribute('id') && el.id != '' ) {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }
  return stack.slice(1); // removes the html element
}


export default vu.screen.capture;