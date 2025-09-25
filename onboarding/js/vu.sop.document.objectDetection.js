/*
    TODO - Hay algo que bloquea el tread de UI, hay que encontrarlo y solucionarlo, se nota en celulares.

 */

// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.document = vu.sop.document || {};
vu.sop.document.objectDetection = vu.sop.document.objectDetection || {};

vu.sop.document.objectDetection.minConfidence = 0.75
vu.sop.document.objectDetection.maxNumBoxes = 1
vu.sop.document.objectDetection.modelURL = 'js/models/documents/model.json'
vu.sop.document.objectDetection.labels = ['document'];

//------------------------------------------------------

vu.sop.document.objectDetection.model;

vu.sop.document.objectDetection.calculateMaxScores = async function(scores,
                                                                numBoxes,
                                                                numClasses) {
    let maxes = [];
    let classes = [];
    for (let i = 0; i < numBoxes; i++) {
        let max = Number.MIN_VALUE;
        let index = -1;
        for (let j = 0; j < numClasses; j++) {
            if (scores[i * numClasses + j] > max) {
                max = scores[i * numClasses + j];
                index = j;
            }
        }
        maxes[i] = max;
        classes[i] = index;
    }
    return [maxes, classes];
}

vu.sop.document.objectDetection.buildDetectedObjects = async function(width,
                                                                  height,
                                                                  boxes,
                                                                  scores,
                                                                  indexes,
                                                                  classes,
                                                                  scale){
    const count = indexes.length;
    let results = []
    for (let i = 0; i < count; i++) {
        const bbox = [];
        for (let j = 0; j < 4; j++) {
            bbox[j] = boxes[indexes[i] * 4 + j];
        }
        const minY = bbox[0] * height;
        const minX = bbox[1] * width;
        const maxY = bbox[2] * height;
        const maxX = bbox[3] * width;
        bbox[0] = Math.round(minX*scale);
        bbox[1] = Math.round(minY*scale);
        bbox[2] = Math.round((maxX - minX)*scale);
        bbox[3] = Math.round((maxY - minY)*scale);
        //console.log(classes[indexes])
        //console.log(scores[indexes], scale)
        results.push([vu.sop.document.objectDetection.labels[classes[indexes]], bbox, scores[indexes]])
    }
    return results
}


vu.sop.document.objectDetection.loadModel = async function(tfPath) {
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
    if (!vu.sop.document.objectDetection.model) {
        console.log("Loading Model")
        vu.sop.document.objectDetection.model = tf.GraphModel;
        vu.sop.document.objectDetection.model = await tf.loadGraphModel(vu.sop.document.objectDetection.modelURL)
        console.log("Finished")
        return vu.sop.document.objectDetection.model
    } else {
        return vu.sop.document.objectDetection.model
    }
}

vu.sop.document.objectDetection.predictCanvas = document.createElement('canvas');
vu.sop.document.objectDetection.predictCanvasContext = vu.sop.document.objectDetection.predictCanvas.getContext('2d');


vu.sop.document.objectDetection.predictAsync = async function(video){
    //var start = new Date();
    let img;
    let scale;
    let newHeight;
    let newWidth;

    let tensor = tf.tidy(() => {
        img = tf.browser.fromPixels(video);
        scale = img.shape[1] / 640;
        newHeight = Math.round(img.shape[0]/scale);
        newWidth = Math.round(img.shape[1]/scale);

        img = tf.image.resizeBilinear(img, [newHeight, newWidth]);
        img = tf.cast(img, 'int32')
        return [img.expandDims(0), scale];
    });
    //console.log('Get Img Tensor - Time', new Date().getTime() - start.getTime(), 'ms')

    scale = tensor[1]
    tensor = tensor[0]

    let height = tensor.shape[1];
    let width = tensor.shape[2];

    //var start = new Date();
    let inference = await vu.sop.document.objectDetection.model.executeAsync(tensor);
    //console.log('executeAsync - Time', new Date().getTime() - start.getTime(), 'ms - shape ', tensor.shape)

    let prevBackend = tf.getBackend();
    tf.setBackend('cpu');
    let scores = await inference[0].data();
    let boxes = await inference[1].data();

    let [maxScores, classes] = await vu.sop.document.objectDetection.calculateMaxScores(scores, inference[0].shape[1], inference[0].shape[2]);
    //------------------------------------------------------------------
    let boxes2 = tf.tensor2d(boxes, [inference[1].shape[1], inference[1].shape[3]]);
    let indexTensor = await tf.image.nonMaxSuppressionAsync(boxes2, maxScores, vu.sop.document.objectDetection.maxNumBoxes, 0.5, vu.sop.document.objectDetection.minConfidence);

    let indexes = await indexTensor.data();
    let result = await vu.sop.document.objectDetection.buildDetectedObjects(width, height, boxes, maxScores, indexes, classes, scale);
    tf.setBackend(prevBackend);

    //console.log('result',result)
    //console.log(performance.now(), tf.memory());

    tensor.dispose()
    tf.dispose(boxes2);
    indexTensor.dispose()
    tf.dispose(indexes)
    tf.dispose(inference)

    //console.log('executeAsync - Time', new Date().getTime() - start.getTime(), 'ms - shape ', tensor.shape)
    return result
}

export default vu.sop.document.objectDetection;