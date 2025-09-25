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
        root.vu.sop.api = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {





// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.api = vu.sop.api || {};

// Module-scoped camera reference (not exposed globally)
let moduleCamera = null;

// Initialize function to set camera reference
vu.sop.api.initialize = function(camera) {
    moduleCamera = camera;
};


vu.sop.api.host = 'https://host:port/vu-onboarding-rest'
vu.sop.api.headers = undefined;

vu.sop.api.forceResolution = true;

vu.sop.api.imgData2b64 = function(img){
    return img.split(",")[1]
}

vu.sop.api.faceImgData2b64 = async function(img){
    if(vu.sop.api.forceResolution && moduleCamera.verifyBeforeForceResolution(1280)){
        var resizeBy = moduleCamera.isVerticalVideo() ? 'height' : 'width';
        var resizedImg = await moduleCamera.resizeDataURL(img, resizeBy);

        var isBlue = await vu.image.channelInversion.detect(resizedImg, {
            debug: true,
            margin: 45,
            minConfidence: 5,
            minDistance: 16
        });
        console.log('Channel inversion:', isBlue.isBad);
        if (isBlue.isBad) {
            console.log('channelInversion:', isBlue);
            resizedImg = vu.image.channelInversion.bgrToRgb(resizedImg, 'base64');
        }

        return resizedImg.split(",")[1];
    } else {
        return img.split(",")[1];
    }
}
//------------------------------------------------------------------------------

vu.sop.api.toSelfieList = async function(selfieList, typeImageList){
    var selfieArray = [];
    for(var i in selfieList) {
       var item = selfieList[i];
       var typeItem = typeImageList[i];
       if(vu.sop.api.forceResolution && moduleCamera.verifyBeforeForceResolution(1280)){
            var resizeBy = moduleCamera.isVerticalVideo() ? 'height' : 'width';
            item = await moduleCamera.resizeDataURL(item, resizeBy);

            var isBlue = await vu.image.channelInversion.detect(item, {
                debug: true,
                margin: 45,
                minConfidence: 5,
                minDistance: 16
            });
            console.log('Channel inversion:', isBlue.isBad);
            if (isBlue.isBad) {
                console.log('channelInversion:', isBlue);
                item = vu.image.channelInversion.bgrToRgb(item, 'base64');
            }
       }
       selfieArray.push({
            "file" : item.split(",")[1],
            "imageType"  : typeItem
        });
    }
    console.log(selfieArray);
    return selfieArray;
}

//------------------------------------------------------------------------------

vu.sop.api.newOperation = function(userName, browserInfo){
    let url = vu.sop.api.host + '/onboarding/newOperation'
    let body = {
        "userName": userName,
    }
    console.log("browserInfo", browserInfo);
    if(browserInfo != undefined && browserInfo != null) {
        body.operationSystem = browserInfo.operatingSystem;
        body.operativeSystemVersion = browserInfo.operatingSystemVersion;
        body.deviceName = browserInfo.mobileModel;
        body.deviceManufacture = browserInfo.browserName + " - " + browserInfo.browserVersion;
    }

    if(vu.sop.enableTelemetry){
        if(vu.telemetry.traceId != null){
            body.captureLogTraceId = vu.telemetry.traceId;
        }
    }

    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.addFront = function(userName, operationId, operationGuid, image) {
    let url = vu.sop.api.host + '/onboarding/addFront'
    let body = {
        "operationId": operationId,
        "userName": userName,
        "analyzeOcr": "true",
        "analyzeAnomalies": "true",
        "file": vu.sop.api.imgData2b64(image)
    }
    if(operationGuid != undefined && operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.addBack = function(userName, operationId, operationGuid, image) {
    let url = vu.sop.api.host + '/onboarding/addBack'
    let body = {
        "operationId": operationId,
        "userName": userName,
        "analyzeOcr": "true",
        "analyzeAnomalies": "true",
        "file": vu.sop.api.imgData2b64(image)
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.addDocumentImage = function(userName, operationId, operationGuid, image) {
    let url = vu.sop.api.host + '/onboarding/addDocumentImage'
    let body = {
        "operationId": operationId,
        "userName": userName,
        "file": vu.sop.api.imgData2b64(image)
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------


// REquiere API PRIVADA
vu.sop.api.getDocumentInformation = function(userName, operationId, operationGuid) {
    let url = vu.sop.api.host + '/onboarding/getDocumentInformation'
    let body = {
        "operationId": operationId,
        "userName": userName,
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}


//------------------------------------------------------------------------------

vu.sop.api.addBarcode = function(userName, operationId, operationGuid, barcodeData, barcodeExtraData) {
    let url = vu.sop.api.host + '/onboarding/addBarcode'
    let body ={
        "operationId": operationId,
        "userName": userName,
        "document": barcodeData,
        "data": barcodeExtraData
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.register = async function(userName, operationId, operationGuid, image) {
    let url = vu.sop.api.host + '/onboarding/register'
    let body = {
        "operationId": operationId,
        "userName": userName,
        "selfieList": [{"file": await vu.sop.api.faceImgData2b64(image), "imageType": "SN"}]
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.registers = async function(userName, operationId, operationGuid, images, gestures) {
	vu.sop.api.toSelfieList(images,gestures);
	let url = vu.sop.api.host + '/onboarding/register'
    let body = {
        "operationId": operationId,
        "userName": userName,
        "selfieList": await vu.sop.api.toSelfieList(images,gestures)
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.endOperation = function(userName, operationId, operationGuid) {
    let url = vu.sop.api.host + '/onboarding/endOperation'
    let body = {
        "operationId": operationId,
        "userName": userName
    }
    if(operationGuid != null) {
        body.operationGuid = operationGuid;
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.faceLogin = async function(userName, image) {
    let url = vu.sop.api.host + '/face/login'
    let body = {
        "userName": userName,
        "selfieList": [{"file":  await vu.sop.api.faceImgData2b64(image), "imageType": "SN"}]
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.faceLoginList = async function(userName, images, gestures) {
    let url = vu.sop.api.host + '/face/login'
    let body = {
        "userName": userName,
        "selfieList": await vu.sop.api.toSelfieList(images,gestures)
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.faceRegister = async function(userName, image) {
    let url = vu.sop.api.host + '/face/register'
    let body = {
        "userName": userName,
        "selfieList": [{"file": await vu.sop.api.faceImgData2b64(image), "imageType": "SN"}]
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.faceRegisters = async function(userName, images, gestures) {
    let url = vu.sop.api.host + '/face/register'
    let body = {
        "userName": userName,
        "selfieList": await vu.sop.api.toSelfieList(images,gestures)
    }
    return vu.sop.api.doBodyIntegrity(url, JSON.stringify(body), "application/json", userName)
}

//------------------------------------------------------------------------------

vu.sop.api.addVideo = function(userName, operationId, operationGuid, video) {
    const url = `${vu.sop.api.host}/onboarding/addVideos`;
    const formData = new FormData();
    formData.append("operationId", operationId);
    formData.append("userName", userName);
    formData.append("VSS", video, "videoPruebaVida.mp4");

    if (operationGuid != null) {
        formData.append("operationGuid", operationGuid);
    }

    // Set headers for the request
    const headers = new Headers(vu.sop.api.headers);

    // Use fetch API for the AJAX call
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return response.json(); // Assuming the server returns JSON
    })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((error) => {
        console.error('Request error:', error.message);
        throw error; // Rethrow error for further handling if needed
    });
};


//------------------------------------------------------------------------------

vu.sop.api.addVideos = async function(userName, operationId, operationGuid, video) {
    let url = vu.sop.api.host + '/onboarding/addVideos'
    let answer;

        var formData = new FormData();
        formData.append("operationId", operationId);
        formData.append("userName", userName);
        formData.append("VSS", video, "videoPruebaVida.mp4");
        if(operationGuid != null) {
            formData.append("operationGuid",  operationGuid);
        }

    return vu.sop.api.doBodyIntegrityAddVideo(userName, operationId, operationGuid, formData, 'multipart/form-data', url);
}


//------------------------------------------------------------------------------

vu.sop.api.doAjaxRequest = function(url, body, contentType) {
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const resp = xhr.responseText;
                    try {
                        const respJson = JSON.parse(resp);
                        resolve(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                } else {
                    const resp = xhr.responseText;
                    try {
                        const respJson = JSON.parse(resp);
                        reject(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                }
            } else {
                //console.log("xhr processing going on");
            }
        };
        xhr.open("POST", url, true);


        Object.entries(vu.sop.api.headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });        
        if(contentType != null && contentType != "" ) {
            xhr.setRequestHeader("Content-type", contentType);
        }


        const encoder = new TextEncoder();
        const data = encoder.encode(body);
        crypto.subtle.digest('SHA-256', data).then(function (hashBuffer) {
            let hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
            let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
            xhr.setRequestHeader("Hash", hashHex);
            xhr.send(body);
        });
    })
    return promise;
};

//------------------------------------------------------------------------------

vu.sop.api.doBodyIntegrity = async function(url, body, contentType, username) {
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 30000;
        xhr.ontimeout = function (){
            reject(vu.sop.msg.userComunicationError);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const resp = xhr.responseText;
                    try {
                        const respJson = JSON.parse(resp);
                        resolve(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                } else {
                    const resp = xhr.responseText;
                    try {
                        const respJson = JSON.parse(resp);
                        reject(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                }
            } else {
                //console.log("xhr processing going on");
            }
        };
        xhr.open("POST", url, true);

        let salt = '';

         Object.entries(vu.sop.api.headers).forEach(([key, value]) => {
            if(key === 'salt'){
                salt = value;
            }else{
                xhr.setRequestHeader(key, value);
            }
         });


       const encoder = new TextEncoder();
       let secret = salt + username;
       const secretEncode = encoder.encode(secret);
       const bodyenc =  encoder.encode(body);

        crypto.subtle.importKey(
          "raw",
          secretEncode,
          { name: "HMAC", hash: { name: "SHA-512" } },
          false,
          ["sign"]
        )
        .then((importedKey) => {
          // Calcular el MAC
          crypto.subtle.sign("HMAC", importedKey, bodyenc)
          .then((mac) => {

            if(contentType != null && contentType != "" ) {
                xhr.setRequestHeader("Content-type", contentType);
            }
            let hashArray = Array.from(new Int8Array(mac));// convert buffer to byte array
            let hashHex = Array.from(hashArray , byte => (byte & 0xFF).toString(16).padStart(2, '0')).join('');// convert bytes to hex string

            if(hashHex != null && hashHex != "" ) {
                xhr.setRequestHeader("X-Signature", hashHex);
            }
            xhr.send(body);
          })
          .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    return promise;
};

//------------------------------------------------------------------------------

vu.sop.api.doBodyIntegrityAddVideo = function (userName, operationId, operationGuid, formData, contentType, url) {
    let salt = '';
    const auxHeader = {};

    Object.entries(vu.sop.api.headers).forEach(([key, value]) => {
        if (key === 'salt') {
            salt = value;
        } else {
            auxHeader[key] = value;
        }
    });

    return new Promise((resolve, reject) => {
        const plainFormDataWithoutFile = formDataToObjectExcludingField(formData, "VSS");
        const formDataJsonString = JSON.stringify(plainFormDataWithoutFile);
        const video = formData.get("VSS");

        let secret = salt + userName;

        calculateHMAC(secret, video)
            .then((hashHexFile) => {
                calculateHMAC(secret, formDataJsonString)
                    .then((hashHexJsonString) => {
                        const hashes = {
                            file: hashHexFile,
                            jsonString: hashHexJsonString,
                        };

                        auxHeader["X-Signature"] = Object.values(hashes).join('');

                        // Prepare the fetch request with necessary headers
                        fetch(url, {
                            method: "POST",
                            headers: auxHeader,
                            body: formData,
                        })
                        .then((response) => {
                            if (!response.ok) {
                                return response.text().then((text) => {
                                    throw new Error(text);
                                });
                            }
                            return response.json();
                        })
                        .then((data) => {
                            console.log(data);
                            resolve(data);
                        })
                        .catch((error) => {
                            console.error('Request error:', error.message);
                            reject(error);
                        });
                    })
                    .catch((error) => {
                        console.error('Error calculating HMAC from JSON:', error.message);
                    });
            })
            .catch((error) => {
                console.error('Error calculating the HMAC of the file:', error.message);
            });
    });
};


function formDataToObjectExcludingField(formData, fieldToExclude) {
    const entries = Array.from(formData.entries()).filter(([name]) => name !== fieldToExclude);
    return Object.fromEntries(entries);
}

function calculateHMAC(secret, dataToHash) {
    return new Promise((resolve, reject) => {
        const encoder = new TextEncoder();
        if (typeof dataToHash === 'string') {
            const dataToHashArray = encoder.encode(dataToHash);
            calculateHMACFromArrayBuffer(encoder.encode(secret), dataToHashArray)
                .then(resolve)
                .catch(reject);
        } else if (dataToHash instanceof File) {

            const reader = new FileReader();

            reader.onload = function (event) {
                const fileData = event.target.result;
                calculateHMACFromArrayBuffer(encoder.encode(secret), fileData)
                    .then(resolve)
                    .catch(reject);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsArrayBuffer(dataToHash);
        } else {
            reject(new Error('Unsupported data type'));
        }
    });
}

function calculateHMACFromArrayBuffer(secret, data) {
    return crypto.subtle.importKey(
        "raw",
        secret,
        { name: "HMAC", hash: { name: "SHA-512" } },
        false,
        ["sign"]
    )
        .then((importedKey) => {
            return crypto.subtle.sign("HMAC", importedKey, data)
                .then((mac) => {
                    const hashArray = Array.from(new Int8Array(mac));
                    const hashHex = Array.from(hashArray, byte => (byte & 0xFF).toString(16).padStart(2, '0')).join('');
                    return hashHex;
                });
        });
}

    // Return the API object for UMD
    return vu.sop.api;
}));