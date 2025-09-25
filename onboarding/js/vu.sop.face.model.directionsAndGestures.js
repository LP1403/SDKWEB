// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.ui = vu.sop.ui || {};
vu.sop.ui.debug = vu.sop.ui.debug|| {};
vu.sop.face = vu.sop.face || {};
vu.sop.face.model = vu.sop.face.model || {};
vu.sop.face.model.directionsAndGestures = vu.sop.face.model.directionsAndGestures || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.face == "undefined") { vu.sop.face = function() {} }

// if (typeof vu.sop.face.model == "undefined") { vu.sop.face.model = function() {} }

// if (typeof vu.sop.face.model.directionsAndGestures == "undefined") { vu.sop.face.model.directionsAndGestures = function() {} }

vu.sop.face.model.directionsAndGestures.modelURL = ''
vu.sop.face.model.directionsAndGestures.modelHeight = 224
vu.sop.face.model.directionsAndGestures.modelWidth = 224
vu.sop.face.model.directionsAndGestures.labels = ['closed_eyes', 'face_looking_down', 'face_looking_left', 'face_looking_right', 'face_looking_up', 'face_neutral', 'open_mouth', 'smile']

//------------------------------------------------------

vu.sop.face.model.directionsAndGestures.model;


vu.sop.face.model.directionsAndGestures.loadModel = async function(basePath, tfPath) {
    //console.log(basePath)
    vu.sop.face.model.directionsAndGestures.modelURL = basePath + '/models/face-directions-gestures/model.json';
    //console.log(vu.sop.face.model.directionsAndGestures.modelURL);

    tf.wasm.setWasmPaths({
        'tfjs-backend-wasm.wasm': tfPath + 'tfjs-backend-wasm.wasm',
        'tfjs-backend-wasm-simd.wasm':  tfPath + 'tfjs-backend-wasm-simd.wasm',
        'tfjs-backend-wasm-threaded-simd.wasm':  tfPath + 'tfjs-backend-wasm-threaded-simd.wasm'
    });

    tf.ENV.set('DEBUG', false);
    tf.enableProdMode();

    //await tf.setBackend('cpu');
    await tf.setBackend('wasm');
    await tf.ready()

    //tf.enableDebugMode()
    //console.log(tf.ENV)
    if (!vu.sop.face.model.directionsAndGestures.model) {
        //console.log("Loading - Face Directions Model")
        var start = new Date();
        vu.sop.face.model.directionsAndGestures.model = tf.GraphModel;
        vu.sop.face.model.directionsAndGestures.model = await tf.loadGraphModel(vu.sop.face.model.directionsAndGestures.modelURL)
        let netTime = new Date().getTime() - start.getTime()
        var start = new Date();
        vu.sop.face.model.directionsAndGestures.model.predict(tf.zeros([ 1,
                                                            vu.sop.face.model.directionsAndGestures.modelHeight,
                                                            vu.sop.face.model.directionsAndGestures.modelWidth, 3]));
        let warmUpTime = new Date().getTime() - start.getTime()
        console.log("Loaded - Face Directions Model - Network Time " + netTime + "ms - Warm Up Time " + warmUpTime +"ms")
        return vu.sop.face.model.directionsAndGestures.model
    } else {
        return vu.sop.face.model.directionsAndGestures.model
    }
}

vu.sop.face.model.directionsAndGestures.predictAsync = async function(image){
    var start = new Date();

    // Execute model prediction outside of tidy
    let img, resized, batched, logits, resultsWLabels;

    try {
        // Process image inside tidy (synchronous operations)
        const processedTensors = tf.tidy(() => {
            img = tf.browser.fromPixels(image);
            resized = tf.image.resizeBilinear(img, [
                vu.sop.face.model.directionsAndGestures.modelHeight,
                vu.sop.face.model.directionsAndGestures.modelWidth
            ]);

            batched = tf.reshape(resized, [
                -1,
                vu.sop.face.model.directionsAndGestures.modelHeight,
                vu.sop.face.model.directionsAndGestures.modelWidth,
                3
            ]);

            return batched; // Return the tensor we need outside tidy
        });

        // Execute model (async operation) outside tidy
        logits = vu.sop.face.model.directionsAndGestures.model.execute(processedTensors);
        const results = await logits.data(); // Get the data asynchronously

        // Process results
        let processedResults = {};
        let i = 0;
        vu.sop.face.model.directionsAndGestures.labels.forEach(element => {
            processedResults[element] = Math.round(results[i] * 100);
            i = i + 1;
        });

        resultsWLabels = processedResults;

    } finally {
        // Manual cleanup of tensors that weren't disposed by tidy
        if (logits) logits.dispose();
        // processedTensors will be automatically disposed when it goes out of scope
    }

    return resultsWLabels;
}

export default vu.sop.face.model.directionsAndGestures;