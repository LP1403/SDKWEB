// Reference the existing vu object
const vu = window.vu || {};
vu.image = vu.image || {};

// ------------------------------------------------------------------------------------------------------------ //

vu.image.lab2rgb = function(lab){
  var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.2040 + z *  1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

  return [Math.max(0, Math.min(1, r)) * 255,
          Math.max(0, Math.min(1, g)) * 255,
          Math.max(0, Math.min(1, b)) * 255]
}


vu.image.rgb2lab = function(rgb){
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

vu.image.getDataUrlFromArr = function (arr, w, h) {
  if(typeof w === 'undefined' || typeof h === 'undefined') {
    w = h = Math.sqrt(arr.length / 4);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = h;

  const imgData = ctx.createImageData(w, h);
  imgData.data.set(arr);
  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL();
}

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu.image.brigthSpotDetector == "undefined") { vu.image.brigthSpotDetector = function() {} }

vu.image.brigthSpotDetector.borderDecimal = 0.15
vu.image.brigthSpotDetector.minResult = 98


vu.image.brigthSpotDetector.canvas = document.createElement("canvas");
vu.image.brigthSpotDetector.canvasContext = vu.image.brigthSpotDetector.canvas.getContext("2d", { willReadFrequently: true });
vu.image.brigthSpotDetector.canvasResize = document.createElement("canvas");
vu.image.brigthSpotDetector.canvasResizeContext = vu.image.brigthSpotDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu.image.brigthSpotDetector.hasABrightSpot = function(img) {
    let startTime = new Date();
    let resize = 10;
    let scale;
    let height;
    let width;

    if (img.width > img.height) {
        scale = img.width / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    } else {
        scale = img.height / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    }

    vu.image.brigthSpotDetector.canvas.width = width
    vu.image.brigthSpotDetector.canvas.height = height
    vu.image.brigthSpotDetector.canvasContext.drawImage(img,0,0, width, height)
    let imageData = vu.image.brigthSpotDetector.canvasContext.getImageData(0, 0, width, height);
    let data = imageData.data;
    var r,g,b,avg;
    var brightSportCount = 0;
    let lab;
    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        lab = vu.image.rgb2lab([r,g,b])
        avg = Math.floor(lab[0]);
        //console.log(lab[0])
        if ( lab[0] > vu.image.brigthSpotDetector.minResult )
        {
            brightSportCount = brightSportCount + 1
        }
    }
    let maxBrightSpots = (width * height) * 0.07
    if (maxBrightSpots < brightSportCount) {
        return [true, brightSportCount];
    } else {
        return [false, brightSportCount];
    }
}

vu.image.brigthSpotDetector.hasABrightSpotAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.brigthSpotDetector.hasABrightSpot(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

vu.image.brigthSpotDetector.thisAreaHasABrightSpot = function(img, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    let borderHorizontal = Math.round(box[2] * vu.image.brigthSpotDetector.borderDecimal)
    let borderVertical =  Math.round(box[3] * vu.image.brigthSpotDetector.borderDecimal)

    vu.image.brigthSpotDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu.image.brigthSpotDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu.image.brigthSpotDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu.image.brigthSpotDetector.hasABrightSpot(vu.image.brigthSpotDetector.canvasResize);
}

vu.image.brigthSpotDetector.thisAreaHasABrightSpotAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.brigthSpotDetector.thisAreaHasABrightSpot(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu.image.brightnessDetector == "undefined") { vu.image.brightnessDetector = function() {} }

vu.image.brightnessDetector.minResult = 30
vu.image.brightnessDetector.borderDecimal = 0.15

vu.image.brightnessDetector.canvas = document.createElement("canvas");
vu.image.brightnessDetector.canvasContext = vu.image.brightnessDetector.canvas.getContext("2d", { willReadFrequently: true });
vu.image.brightnessDetector.canvasResize = document.createElement("canvas");
vu.image.brightnessDetector.canvasResizeContext = vu.image.brightnessDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu.image.brightnessDetector.isBright = function(img) {
    let startTime = new Date();
    vu.image.brightnessDetector.canvas.width = 10;
    vu.image.brightnessDetector.canvas.height = 10;
    vu.image.brightnessDetector.canvasContext.drawImage(img,0,0, 10, 10);

    let imageData = vu.image.brightnessDetector.canvasContext.getImageData(0,0,10,10);
    let data = imageData.data;
    var r,g,b,avg;
    var colorSum = 0;
    let lab;
    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];
        lab = vu.image.rgb2lab([r,g,b])
        //avg = Math.floor((r+g+b)/3);
        avg = Math.floor(lab[0]);
        colorSum += avg;
    }

    let result = Math.floor(colorSum / (10*10))
    //console.log('isBright score', result, '- time:', new Date().getTime() - startTime.getTime())
    if (vu.image.brightnessDetector.minResult > result) {
        return [false, result];
    } else {
        return [true, result];
    }
}

vu.image.brightnessDetector.isBrightAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.brightnessDetector.isBright(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

vu.image.brightnessDetector.thisAreaIsBright = function(img, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    let borderHorizontal = Math.round(box[2] * vu.image.brightnessDetector.borderDecimal)
    let borderVertical =  Math.round(box[3] * vu.image.brightnessDetector.borderDecimal)

    vu.image.brightnessDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu.image.brightnessDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu.image.brightnessDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu.image.brightnessDetector.isBright(vu.image.brightnessDetector.canvasResize);
}

vu.image.brightnessDetector.thisAreaIsBrightAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.brightnessDetector.thisAreaIsBright(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

// ------------------------------------------------------------------------------------------------------------ //

if (typeof vu.image.blurDetector == "undefined") { vu.image.blurDetector = function() {} }

vu.image.blurDetector.minResult = 0.65  // More is more blur
vu.image.blurDetector.borderDecimal = 0.15
vu.image.blurDetector.resize = 128

vu.image.blurDetector.canvas = document.createElement("canvas");
vu.image.blurDetector.canvasContext = vu.image.blurDetector.canvas.getContext("2d", { willReadFrequently: true });
vu.image.blurDetector.canvasResize = document.createElement("canvas");
vu.image.blurDetector.canvasResizeContext = vu.image.blurDetector.canvasResize.getContext("2d", { willReadFrequently: true });

vu.image.blurDetector.isBlurry = function(img) {
    let startTime = new Date();
    let resize = vu.image.blurDetector.resize;
    let scale;
    let height;
    let width;

    if (img.width > img.height) {
        scale = img.width / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    } else {
        scale = img.height / resize;
        height = Math.round(img.height/scale);
        width = Math.round(img.width/scale);
    }

    vu.image.blurDetector.canvas.width = width;
    vu.image.blurDetector.canvas.height = height;
    vu.image.blurDetector.canvasContext.drawImage(img, 0,0,width,height);

    let blurValue = measureBlur(vu.image.blurDetector.canvas.getContext('2d').getImageData(0, 0, width, height)).avg_edge_width_perc
    //console.log('isBlurry score', blurValue, '- time:', new Date().getTime() - startTime.getTime())
    if (vu.image.blurDetector.minResult > blurValue) {
        return [false, blurValue]
    } else {
        return [true, blurValue]
    }
}

vu.image.blurDetector.isBlurryAsync = function(img) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.blurDetector.isBlurry(img) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

vu.image.blurDetector.thisAreaIsBlurry = function(img, box) {
    let borderHorizontal = Math.round(box[2] * vu.image.blurDetector.borderDecimal)
    let borderVertical =  Math.round(box[3] * vu.image.blurDetector.borderDecimal)

    vu.image.blurDetector.canvasResize.width = box[2] - (borderHorizontal*2);
    vu.image.blurDetector.canvasResize.height = box[3] - (borderVertical*2);
    vu.image.blurDetector.canvasResizeContext.drawImage(img, -(box[0]+borderHorizontal), -(box[1]+borderVertical));
    return vu.image.blurDetector.isBlurry(vu.image.blurDetector.canvasResize);
}

vu.image.blurDetector.thisAreaIsBlurryAsync = function(img, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.blurDetector.thisAreaIsBlurry(img, box) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

// ------------------------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------------------------ //
// https://github.com/timhuff/canvas-phash/blob/master/index.js

if (typeof vu.image.phash == "undefined") { vu.image.phash = function() {} }

vu.image.phash.canvas = document.createElement("canvas");
vu.image.phash.canvasContext = vu.image.phash.canvas.getContext("2d", { willReadFrequently: true });
//document.getElementById('debug').appendChild(vu.image.phash.canvas);

vu.image.phash.getHammingDistance = function (buffer1, buffer2) {
    let hammingDistance = 0;
    for (let n = 0; n < 128; n++) {
        const x = buffer1.readUInt8(n);
        const y = buffer2.readUInt8(n);
        hammingDistance += vu.image.phash.bitCount(x ^ y);
    }
    return hammingDistance;
}

vu.image.phash.bitCount = function (n) {
    let count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
};


// Función auxiliar para convertir un hash binario a hexadecimal
vu.image.phash.binaryToHex =  function(binary) {
    let hex = '';
    for (let i = 0; i < binary.length; i += 4) {
        const chunk = binary.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
}

// Función auxiliar para convertir un hash hexadecimal a binario
vu.image.phash.hexToBinary = function(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        // Convertir cada carácter hexadecimal a 4 bits binarios
        const chunk = parseInt(hex[i], 16).toString(2).padStart(4, '0');
        binary += chunk;
    }
    return binary;
}

vu.image.phash.calculate = function(canvas) {
    const ctx = vu.image.phash.canvasContext

    // Paso 1: Reducir la imagen a 8x8 píxeles
    const size = 16;
    const resizedCanvas = vu.image.phash.canvas;
    resizedCanvas.width = size;
    resizedCanvas.height = size;
    const resizedCtx = resizedCanvas.getContext('2d');
    resizedCtx.drawImage(canvas, 0, 0, size, size);

    // Paso 2: Convertir la imagen a escala de grises
    const imageData = resizedCtx.getImageData(0, 0, size, size);
    const grayscalePixels = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        // Fórmula para convertir a escala de grises (luminosidad)
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        grayscalePixels.push(gray);
    }

    // Paso 3: Calcular el valor promedio de los píxeles
    const average = grayscalePixels.reduce((sum, val) => sum + val, 0) / grayscalePixels.length;

    // Paso 4: Generar el hash binario
    let hash = '';
    for (let i = 0; i < grayscalePixels.length; i++) {
        hash += grayscalePixels[i] > average ? '1' : '0';
    }

    // Paso 5: Convertir el hash binario a hexadecimal (opcional)
    const hexHash = vu.image.phash.binaryToHex(hash);

    return hexHash;
}

vu.image.phash.calculateAsync = function(canvas) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.phash.calculate(canvas) )
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

// --------------------------------------------
// Area
vu.image.phash.canvasResize = document.createElement("canvas");
vu.image.phash.canvasResizeContext = vu.image.phash.canvasResize.getContext("2d", { willReadFrequently: true });

vu.image.phash.calculateThisArea = function(canvas, box) {
    // box example: [66, 6, 374, 250] | x y, x2 y2
    vu.image.phash.canvasResize.width = box[2];
    vu.image.phash.canvasResize.height = box[3];
    vu.image.phash.canvasResizeContext.drawImage(canvas, -(box[0]), -(box[1]));
    return vu.image.phash.calculate(vu.image.phash.canvasResize);
}

vu.image.phash.calculateThisAreaAsync = function(canvas, box) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.phash.calculateThisArea(canvas, box))
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

// --------------------------------------------
// Center

vu.image.phash.canvasPreprocess = document.createElement("canvas");
vu.image.phash.canvasPreprocessContext = vu.image.phash.canvasPreprocess.getContext("2d", { willReadFrequently: true });
//document.getElementById('debug').appendChild(vu.image.phash.canvasPreprocess);

/*
Una funcion en javascript que resiba como input un canvas y un float de 0 a 1 llamado borde.
La funcion transforma una imagen rectangular en un cuadrado centrado, luego del cuadrado recorta un margen porcentual basado en el float de borde.
retorna un canvas que contiene la imagen recortada. la funcion en ingles.
*/
vu.image.phash.preprocessCenter = function (canvas, border = 0.1) {
  // Get canvas dimensions
  let width = 0;
  let height = 0;
  if ( canvas instanceof HTMLVideoElement ) {
    width = canvas.videoWidth;
    height = canvas.videoHeight;
  } else if ( canvas instanceof HTMLCanvasElement) {
      width = canvas.videoWidth;
      height = canvas.videoHeight;
  }
  if (width <= 0 || height <= 0) {
    throw new Error("Invalid video/canvas dimensions");
  }

  // Determine the size of the square (minimum of width and height)
  const squareSize = Math.min(width, height);

  // Calculate the starting coordinates to center the square
  const startX = Math.floor((width - squareSize) / 2);
  const startY = Math.floor((height - squareSize) / 2);

  // Calculate the border offset based on the border percentage
  const borderOffset = Math.floor(squareSize * border);

  // Calculate the final size after applying the border
  const finalSize = squareSize - (2 * borderOffset);

  // Create a new canvas for the result
  vu.image.phash.canvasPreprocess.width = finalSize;
  vu.image.phash.canvasPreprocess.height = finalSize;

  // Draw the centered and cropped image onto the result canvas
  vu.image.phash.canvasPreprocessContext.drawImage(
    canvas,
    startX + borderOffset,  // Source X (start from center square + border)
    startY + borderOffset,  // Source Y (start from center square + border)
    finalSize,              // Source width (square size minus borders)
    finalSize,              // Source height (square size minus borders)
    0,                      // Destination X
    0,                      // Destination Y
    finalSize,              // Destination width
    finalSize               // Destination height
  );

  return vu.image.phash.canvasPreprocess;
}

vu.image.phash.preprocessCenterObfuscated = function (canvas, border = [0.1, 0.1]) {
  // Get canvas dimensions
  let width = 0;
  let height = 0;
  if ( canvas instanceof HTMLVideoElement ) {
    width = canvas.videoWidth;
    height = canvas.videoHeight;
  } else if ( canvas instanceof HTMLCanvasElement) {
      width = canvas.videoWidth;
      height = canvas.videoHeight;
  }
  if (width <= 0 || height <= 0) {
    throw new Error("Invalid video/canvas dimensions");
  }

  vu.image.phash.canvasPreprocess.width = width;
  vu.image.phash.canvasPreprocess.height = height;
  vu.image.phash.canvasPreprocessContext.drawImage(canvas, 0, 0, width, height)  // Source dimensions

  //------------------
  // Create a temporary canvas with the original image and black rectangle
  // Calculate rectangle dimensions based on size
  const rectWidth = Math.floor(width * border[0]);
  const rectHeight = Math.floor(height * border[1]);

  // Calculate position to center the rectangle
  const x = Math.floor((width - rectWidth) / 2);
  const y = Math.floor((height - rectHeight) / 2);
  //------------------

  // Draw the black rectangle in the center
  vu.image.phash.canvasPreprocessContext.fillStyle = 'black';
  vu.image.phash.canvasPreprocessContext.fillRect(x, y, rectWidth, rectHeight);

  return vu.image.phash.canvasPreprocess;
}

vu.image.phash.calculatePreprocessed = function(canvas, preprocessed, border) {
    if (preprocessed === 'center') {
        vu.image.phash.preprocessCenter(canvas, border)
    } else if (preprocessed === 'centerObfuscated') {
        vu.image.phash.preprocessCenterObfuscated(canvas, border)
    }
    return vu.image.phash.calculate(vu.image.phash.canvasPreprocess);
}

vu.image.phash.calculatePreprocessedAsync = function(canvas, preprocess = 'center', border = 0.1) {
    return new Promise(function (fulfilled, rejected) {
        try {
            return fulfilled( vu.image.phash.calculatePreprocessed(canvas, preprocess, border))
        } catch (e) {
            return rejected( new Error(e) )
        }
    })
}

// ----------------------------------------------------------------------------------------------------------------- //
vu.image.phash.compare = function (hash1, hash2) {
    // Convertir los hashes hexadecimales a binario
    const binary1 = vu.image.phash.hexToBinary(hash1);
    const binary2 = vu.image.phash.hexToBinary(hash2);

    // Calcular la distancia de Hamming
    let distance = 0;
    for (let i = 0; i < binary1.length; i++) {
        if (binary1[i] !== binary2[i]) {
            distance++;
        }
    }

    // Devolver la distancia de Hamming
    return distance;
}


vu.image.phash.detectOutliersInSelfies = async function (configuredLevel, selfieList) {
    const level = (configuredLevel || 'medium').toLowerCase();
    console.log("[pHash] Configured Level:", level);
    console.log("[pHash] Selfie List Length:", selfieList.length);

    const thresholds = {
        low: 35,     // more tolerant
        medium: 30,  // balanced
        high: 24     // strict
    };

    const threshold = thresholds[level] ?? thresholds.medium;
    console.log("[pHash] Using threshold:", threshold);

    const hashes = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const images = await Promise.all(selfieList.map((base64, index) => {
        return new Promise((resolve, reject) => {
            if (!base64 || typeof base64 !== 'string') {
                console.error(`[pHash] Invalid base64 at index ${index}`);
                return reject(new Error(`Invalid base64 at index ${index}`));
            }
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                console.log(`[pHash] Image ${index} loaded: ${img.width}x${img.height}`);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`[pHash] Failed to load image at index ${index}`);
                reject(new Error(`Failed to load image at index ${index}`));
            };
        });
    }));

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const hash = vu.image.phash.calculate(canvas);
        hashes.push(hash);
        console.log(`[pHash] Hash ${i}:`, hash);
    }

    for (let i = 0; i < hashes.length; i++) {
        for (let j = i + 1; j < hashes.length; j++) {
            const distance = vu.image.phash.compare(hashes[i], hashes[j]);
            console.log(`[pHash] Distance between frame ${i} and ${j}:`, distance);

            if (distance >= threshold) {
                console.warn(`[pHash] Outlier detected: frame ${i} vs ${j} → distance = ${distance} (threshold = ${threshold})`);
                return false;
            }
        }
    }

    console.log("[pHash] All frames passed consistency check.");
    return true;
};


// ------------------------------------------------------------------------------------------------------------ //
// Detectar inversion de canales
vu.image.channelInversion = vu.image.channelInversion || {};

/**
 * Crops a uniform margin around an image canvas
 * @param {HTMLCanvasElement} canvas - Canvas containing the image
 * @param {number} marginPercentage - Percentage of the image size to crop as margin
 * @returns {ImageData} The cropped image data
 */
vu.image.channelInversion.cropMargin = function (canvas, marginPercentage) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Calculate margin size in pixels
    const marginX = Math.floor(width * (marginPercentage / 100));
    const marginY = Math.floor(height * (marginPercentage / 100));

    // Calculate coordinates for cropping
    const x1 = marginX;
    const y1 = marginY;
    const x2 = width - marginX;
    const y2 = height - marginY;

    // Get the cropped image data
    const croppedWidth = x2 - x1;
    const croppedHeight = y2 - y1;

    if (croppedWidth <= 0 || croppedHeight <= 0) {
        throw new Error('Margin too large, resulting in empty crop area');
    }

    return ctx.getImageData(x1, y1, croppedWidth, croppedHeight);
}

/**
 * Calculate if the image has a bad color space (RGB vs BGR)
 * @param {string} base64Image - Base64 encoded image string
 * @param {Object} options - Configuration options
 * @param {boolean} options.debug - Enable debug logging
 * @param {number} options.margin - Margin percentage to crop
 * @param {number} options.minConfidence - Minimum confidence threshold
 * @param {number} options.minDistance - Minimum distance between R and B channels
 * @returns {Promise<{isBad: boolean, confidence: number}>} Result object
 */
vu.image.channelInversion.detect = async function (base64Image, options = {}) {
    const {
        debug = false,
        margin = 45,
        minConfidence = 5,
        minDistance = 16
    } = options;

    return new Promise((resolve, reject) => {
        // Create an image element
        const img = new Image();

        img.onload = function() {
            try {
                // Create canvas and draw the image
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Crop the image with margin
                const croppedImageData = vu.image.channelInversion.cropMargin(canvas, margin);
                const data = croppedImageData.data;

                // Calculate channel means (RGBA format)
                let rSum = 0, gSum = 0, bSum = 0;
                const pixelCount = croppedImageData.width * croppedImageData.height;

                for (let i = 0; i < data.length; i += 4) {
                    rSum += data[i];     // Red
                    gSum += data[i + 1]; // Green
                    bSum += data[i + 2]; // Blue
                    // Skip alpha channel (data[i + 3])
                }

                const rMean = rSum / pixelCount;
                const gMean = gSum / pixelCount;
                const bMean = bSum / pixelCount;

                // Calculate confidence - avoid division by zero
                const distance = Math.abs(rMean - bMean);
                const avgIntensity = (rMean + bMean + gMean) / 3;
                const confidence = (distance * 100) / Math.max(avgIntensity, 1e-6);

                if (debug) {
                    console.log(`Channel means - R: ${rMean.toFixed(2)}, G: ${gMean.toFixed(2)}, B: ${bMean.toFixed(2)}`);
                    console.log(`Distance: ${distance.toFixed(2)}, Confidence: ${confidence.toFixed(2)}`);
                }

                // Refined logic
                let isBad;
                if (distance < minDistance) {
                    // Channels too similar to determine
                    isBad = false;
                } else if (rMean > bMean) {
                    // Normal RGB - red typically > blue in natural images
                    isBad = false;
                } else {
                    // Blue > Red suggests color swap
                    isBad = confidence > minConfidence;
                }

                resolve({
                    isBad: isBad,
                    confidence: confidence
                });

            } catch (error) {
                reject(error);
            }
        };

        img.onerror = function() {
            reject(new Error('Failed to load image from base64 data'));
        };

        // Handle base64 with or without data URL prefix
        if (base64Image.startsWith('data:image/')) {
            img.src = base64Image;
        } else {
            img.src = `data:image/jpeg;base64,${base64Image}`;
        }
    });
}

/**
 * Converts BGR color channels to RGB by swapping Red and Blue channels
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} outputFormat - Output format: 'base64', 'canvas', or 'blob'
 * @returns {Promise<string|HTMLCanvasElement|Blob>} Converted image in specified format
 */
vu.image.channelInversion.bgrToRgb = async function (base64Image, outputFormat = 'base64') {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function() {
            try {
                // Create canvas and draw the image
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Get image data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Swap R and B channels (RGBA format: R, G, B, A)
                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i];     // Store original red value
                    data[i] = data[i + 2];   // Red = Blue
                    data[i + 2] = red;       // Blue = original Red
                    // Green (i + 1) and Alpha (i + 3) remain unchanged
                }

                // Put the modified data back to canvas
                ctx.putImageData(imageData, 0, 0);

                // Return in requested format
                switch (outputFormat.toLowerCase()) {
                    case 'canvas':
                        resolve(canvas);
                        break;

                    case 'blob':
                        canvas.toBlob(resolve, 'image/png');
                        break;

                    case 'base64':
                    default:
                        const base64Result = canvas.toDataURL('image/png');
                        resolve(base64Result);
                        break;
                }

            } catch (error) {
                reject(error);
            }
        };

        img.onerror = function() {
            reject(new Error('Failed to load image from base64 data'));
        };

        // Handle base64 with or without data URL prefix
        if (base64Image.startsWith('data:image/')) {
            img.src = base64Image;
        } else {
            img.src = `data:image/jpeg;base64,${base64Image}`;
        }
    });
}


/*
async function example() {
    try {
        const base64Image = "your_base64_image_string_here";

        const result = await vu.image.channelInversion.detect(base64Image, {
            debug: true,
            margin: 45,
            minConfidence: 5,
            minDistance: 16
        });

        console.log('Is bad color space:', result.isBad);
        console.log('Confidence:', result.confidence);
        if (result.isBad) {
            base64Image = vu.image.channelInversion.bgrToRgb(base64Image, 'base64')
            console.log('Converted image:', base64Image);
        }
    } catch (error) {
        console.error('Error analyzing image:', error);
    }
}
*/

// ------------------------------------------------------------------------------------------------------------ //
export default vu.image;