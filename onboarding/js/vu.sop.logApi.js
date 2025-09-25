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
        root.vu.sop.logApi = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.logApi = vu.sop.logApi || {};

// if (typeof vu == "undefined") { vu = function() {} }

// if (typeof vu.sop == "undefined") { vu.sop = function() {} }

// if (typeof vu.sop.logApi == "undefined") { vu.sop.logApi = function() {} }

vu.sop.logApi.host = "https://host:port/vu-capture-log-rest";
//vu.sop.api.headers = undefined;

//------------------------------------------------------------------------------

vu.sop.logApi.initTraceTransaction = function(logEntry){
    url = vu.sop.logApi.host + '/transaction/init'
    body = JSON.stringify(logEntry)

    return vu.sop.logApi.doAjaxRequest(url, body, "application/json");
}

//------------------------------------------------------------------------------

vu.sop.logApi.saveDocumentLog = function(logEntry){
    url = vu.sop.logApi.host + '/document/saveLog'
    body = JSON.stringify(logEntry)

    return vu.sop.logApi.doAjaxRequest(url, body, "application/json");
}

//------------------------------------------------------------------------------

vu.sop.logApi.saveSelfieLog = function(logEntry){
    url = vu.sop.logApi.host + '/selfie/saveLog'
    body = JSON.stringify(logEntry)

    return vu.sop.logApi.doAjaxRequest(url, body, "application/json");
}

//------------------------------------------------------------------------------

vu.sop.logApi.doAjaxRequest = function(url, body, contentType) {
    let timeout = new Promise((resolve, reject) => setTimeout(() => reject("promiseTimeout"), 5000));
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 10000;
        xhr.ontimeout = function () {
            reject("timeout");
        };
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
        xhr.send(body);
    })
    return Promise.race([promise, timeout]);;
};

vu.sop.logApi.doFetchRequest = function(data , path) {

    let fetchHeaders = {
        "Content-Type": "application/json"
    };
    Object.entries(vu.sop.api.headers).forEach(([key, value]) => {
        fetchHeaders[key] = value;
    });

    fetch(vu.sop.logApi.host + path, {
        method: "POST",
        keepalive: true,
        headers: fetchHeaders,
        body: JSON.stringify(data),
    });
}


    // Return the API object for UMD
    return vu.sop.logApi;
}));