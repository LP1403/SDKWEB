import vuSopAudio from 'vu.sop.audio';

import {
  listVideoInputs,
  isSuspiciousCameraLabel,
  cameraAnomalyDevice
} from './vu.camera.utils.js';

// vu.sop.ui.js

// Reference the existing vu object
const vu = window.vu || {};
vu.sop = vu.sop || {};
vu.sop.steps = vu.sop.steps || {};
vu.sop.ui = vu.sop.ui || {};
vu.sop.ui.debug = vu.sop.ui.debug || {};
vu.sop.ui.user = vu.sop.ui.user || {};
vu.sop.msg = vu.sop.msg || {};
vu.sop.audio = vu.sop.audio || {};
vu.sop.api = vu.sop.api || {};

// vu.sop.steps = vu.sop.steps || {};
// Merge the existing vu.sop.audio with the imported vuSopAudio
vu.sop.audio = Object.assign(vu.sop.audio, vuSopAudio);
vu.face = vu.face || {};
vu.face.auth = vu.face.auth || {};
let moduleCamera = null;

vu.sop.ui.initialize = function(camera) {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    console.log("initialized");
    // Proceed to use vu.sop safely
    // Merge vu.sop.msg and window.vu.sop.msg
    vu.sop.msg = Object.assign({}, window.vu.sop.msg || {}, vu.sop.msg || {});

    // Merge vu.sop.audio and window.vu.sop.audio
    vu.sop.audio = Object.assign({}, window.vu.sop.audio || {}, vu.sop.audio || {});

    // // Merge vu.sop.api and window.vu.sop.api
    vu.sop.api = Object.assign({}, window.vu.sop.api || {}, vu.sop.api || {});

    vu.sop.steps = Object.assign({}, window.vu.sop.steps || {}, vu.sop.steps || {});

    vu.face.auth = Object.assign({}, window.vu.face.auth || {}, vu.face.auth || {});

    vu.sop.ui.bottomTextResizeScheduled = false;

    moduleCamera = camera;
}

vu.sop.ui.user.initialize = function(sopApi)
{
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop) {
        console.error("vu.sop is not defined");
        return;
    }

    // // Merge vu.sop.api and window.vu.sop.api
    //vu.sop.api = Object.assign({}, window.vu.sop.api || {}, sopApi || {});    

    // vu.sop.steps = Object.assign({}, window.vu.sop.steps || {}, vu.sop.steps || {});
}


// vu.sop.ui.assignApi = function(api, msg) {
//     vu.sop.api = Object.assign(vu.sop.api, api);
//     vu.sop.msg = Object.assign(vu.sop.msg, msg);
// };

vu.sop.ui.cameraBackGroundOverlayTopBGColor = "rgba(0, 0, 0, 1)"
vu.sop.ui.cameraBackGroundOverlayBottomBGColor = "rgba(0, 0, 0, 1)"

//---------------------------------------------------
// Subtitles
//---------------------------------------------------

vu.sop.ui.isEven  = function(x) { return !( x & 1 ); };
vu.sop.ui.isOdd = function(x) { return x & 1; };


vu.sop.ui.bottomTextNoOverlay = function(){
    let baseDiv = document.getElementById('vu.sop')
    let mainDiv = document.getElementById('vu.sop.ui')
    let bottomText = document.getElementById('vu.sop.ui.bottomText')
    let videoContainer = document.getElementById('vu.sop.ui.videoContainer')
    console.log("vu.sop.videoResizeStyleFillContainer", vu.sop.videoResizeStyleFillContainer);
    if (bottomText !== null) {
        if (vu.sop.videoResizeStyleFillContainer){
            let proportion = Math.round((videoContainer.offsetWidth / videoContainer.offsetHeight)*10)

            let videoContainerHeight = mainDiv.offsetHeight - bottomText.offsetHeight
            let videoContainerWidth = mainDiv.offsetWidth
            // Mejora en la proporcion
            //if (true){
            if(window.innerHeight > window.innerWidth){
                baseDiv.style.height = Math.round((videoContainerWidth * 800) / 690) + "px"
            } else {
                baseDiv.style.height = Math.round((videoContainerWidth * 495) / 690) + "px"
            }


            let divheight = mainDiv.offsetHeight - bottomText.offsetHeight
            let dheight = divheight
            let dtop = (divheight/2)
            if (vu.sop.ui.isOdd(dtop)) { dtop = dtop - 1 }
            if (vu.sop.ui.isOdd(dheight)) { dheight = dheight + 3 }
            videoContainer.style.height = (dheight+2) + "px"
            videoContainer.style.top = dtop + "px"
        } else {
            let divheight = mainDiv.offsetHeight - bottomText.offsetHeight
            let dheight = divheight
            let dtop = (divheight/2)
            if (vu.sop.ui.isOdd(dtop)) { dtop = dtop - 1 }
            if (vu.sop.ui.isOdd(dheight)) { dheight = dheight + 3 }
            videoContainer.style.height = (dheight+2) + "px"
            videoContainer.style.top = dtop + "px"
        }
    }
}
vu.sop.ui.bottomTextResizeScheduled = false;

vu.sop.ui.bottomTextObserver = new ResizeObserver(entries => {
    if (vu.sop.ui.bottomTextResizeScheduled) return;

    vu.sop.ui.bottomTextResizeScheduled = true;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            vu.sop.ui.bottomTextResizeScheduled = false;
            console.trace("ResizeObserver fired in vu.sop.ui.bottomTextObserver");
            vu.sop.ui.bottomTextNoOverlay();            
        });
    });
});
//vu.sop.ui.bottomTextObserver.observe(document.getElementById('vu.sop.ui.bottomText'));


//---------------------------------------------------
// Generic
//---------------------------------------------------

vu.sop.ui.alertDraw = function(msg, closeMethod, e) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";

    let divAlertText = document.createElement("div");
    divAlertText.innerHTML = msg;

    let buttonClose = document.createElement("button");
    buttonClose.className = "vu.sop.btn vu.sop.btn-outline-secondary";
    buttonClose.id = "vu.sop.ui.alertButton";
    buttonClose.innerHTML = vu.sop.msg.close;
    buttonClose.onclick = closeMethod;
    
    divContainer.appendChild(divAlertText);
    divContainer.appendChild(buttonClose);
    return divContainer;
}

vu.sop.ui.alertDraw2 = function(msg, closeMethod) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";

    let divAlertText = document.createElement("div");
    divAlertText.innerHTML = msg;

    divContainer.appendChild(divAlertText);
    return divContainer;
}

vu.sop.ui.documentFileUploadFrontDraw = function() {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";
    divContainer.style = "margin-top: -2em;";

    let label = document.createElement("label");
    label.htmlFor = "documentFileUploadFrontInput";
    label.style = "display: inline-block; padding: 6px 12px; cursor: pointer; transform: translate(0px, -50%);";

    let imgUpload = document.createElement("img");
    imgUpload.style = "width: 100%";
    imgUpload.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJhcnJvdy1jaXJjbGUtdXAiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1jaXJjbGUtdXAgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik04IDI1NkM4IDExOSAxMTkgOCAyNTYgOHMyNDggMTExIDI0OCAyNDgtMTExIDI0OC0yNDggMjQ4UzggMzkzIDggMjU2em0xNDMuNiAyOC45bDcyLjQtNzUuNVYzOTJjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMTZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMjA5LjRsNzIuNCA3NS41YzkuMyA5LjcgMjQuOCA5LjkgMzQuMy40bDEwLjktMTFjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlMMjczIDEwNy43Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMEwxMDYuMyAyNDAuNGMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlsMTAuOSAxMWM5LjYgOS41IDI1LjEgOS4zIDM0LjQtLjR6Ij48L3BhdGg+PC9zdmc+";

    label.appendChild(imgUpload);

    let inputFile = document.createElement("input");
    inputFile.id = "documentFileUploadFrontInput";
    inputFile.type ="file";
    inputFile.style="display: none;";
    console.log("vu.sop.steps", vu.sop.steps);
    inputFile.onchange = function() {vu.sop.steps.uploadFrontDocumentPictureResolve(this.files)};
    divContainer.appendChild(label);
    divContainer.appendChild(inputFile);

    return divContainer;
}

vu.sop.ui.documentFileUploadBackDraw = function() {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";
    divContainer.style = "margin-top: -2em;";

    let label = document.createElement("label");
    label.htmlFor = "documentFileUploadBackInput";
    label.style = "display: inline-block; padding: 6px 12px; cursor: pointer; transform: translate(0px, -50%);";

    let imgUpload = document.createElement("img");
    imgUpload.style = "width: 100%";
    imgUpload.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJhcnJvdy1jaXJjbGUtdXAiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1jaXJjbGUtdXAgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik04IDI1NkM4IDExOSAxMTkgOCAyNTYgOHMyNDggMTExIDI0OCAyNDgtMTExIDI0OC0yNDggMjQ4UzggMzkzIDggMjU2em0xNDMuNiAyOC45bDcyLjQtNzUuNVYzOTJjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMTZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMjA5LjRsNzIuNCA3NS41YzkuMyA5LjcgMjQuOCA5LjkgMzQuMy40bDEwLjktMTFjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlMMjczIDEwNy43Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMEwxMDYuMyAyNDAuNGMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlsMTAuOSAxMWM5LjYgOS41IDI1LjEgOS4zIDM0LjQtLjR6Ij48L3BhdGg+PC9zdmc+";

    label.appendChild(imgUpload);

    let inputFile = document.createElement("input");
    inputFile.id = "documentFileUploadBackInput";
    inputFile.type ="file";
    inputFile.style="display: none;";
    inputFile.onchange = function() {vu.sop.steps.uploadBackDocumentPictureResolve(this.files)};
    divContainer.appendChild(label);
    divContainer.appendChild(inputFile);

    return divContainer;
}
vu.sop.ui.documentSelectUploadMethodDraw = function(takePictureMethod, uploadFileMethod) {
    let divContainer = document.createElement("div");
    divContainer.className = "vu.sop.ui.innerVerticalAlign";
    divContainer.style = "margin-top: -2em;";
    
    let divTakePicture = document.createElement("div");
    divTakePicture.style = "width: 50%; float: left;";

    let linkTakePicture = document.createElement("A");
    linkTakePicture.href = "javascript:"+ takePictureMethod;
    linkTakePicture.className = "vu.sop.ui.aPlainLink";

    let imgTakePicture = document.createElement("img");
    imgTakePicture.style = "width: 30%";
    imgTakePicture.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjYW1lcmEtcmV0cm8iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jYW1lcmEtcmV0cm8gZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00OCAzMkMyMS41IDMyIDAgNTMuNSAwIDgwdjM1MmMwIDI2LjUgMjEuNSA0OCA0OCA0OGg0MTZjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWODBjMC0yNi41LTIxLjUtNDgtNDgtNDhINDh6bTAgMzJoMTA2YzMuMyAwIDYgMi43IDYgNnYyMGMwIDMuMy0yLjcgNi02IDZIMzhjLTMuMyAwLTYtMi43LTYtNlY4MGMwLTguOCA3LjItMTYgMTYtMTZ6bTQyNiA5NkgzOGMtMy4zIDAtNi0yLjctNi02di0zNmMwLTMuMyAyLjctNiA2LTZoMTM4bDMwLjItNDUuM2MxLjEtMS43IDMtMi43IDUtMi43SDQ2NGM4LjggMCAxNiA3LjIgMTYgMTZ2NzRjMCAzLjMtMi43IDYtNiA2ek0yNTYgNDI0Yy02Ni4yIDAtMTIwLTUzLjgtMTIwLTEyMHM1My44LTEyMCAxMjAtMTIwIDEyMCA1My44IDEyMCAxMjAtNTMuOCAxMjAtMTIwIDEyMHptMC0yMDhjLTQ4LjUgMC04OCAzOS41LTg4IDg4czM5LjUgODggODggODggODgtMzkuNSA4OC04OC0zOS41LTg4LTg4LTg4em0tNDggMTA0Yy04LjggMC0xNi03LjItMTYtMTYgMC0zNS4zIDI4LjctNjQgNjQtNjQgOC44IDAgMTYgNy4yIDE2IDE2cy03LjIgMTYtMTYgMTZjLTE3LjYgMC0zMiAxNC40LTMyIDMyIDAgOC44LTcuMiAxNi0xNiAxNnoiPjwvcGF0aD48L3N2Zz4=";
    
    let pTakePicture = document.createElement("p");
    pTakePicture.innerHTML = vu.sop.msg.addDocumentCameraIconMsg;

    linkTakePicture.appendChild(imgTakePicture);
    linkTakePicture.appendChild(pTakePicture);

    let divUploadFile = document.createElement("div");
    divUploadFile.style = "width: 49%; float: left; height: 33%";

    let linkUploadFile = document.createElement("A");
    linkUploadFile.href = "javascript:"+ uploadFileMethod;
    linkUploadFile.className = "vu.sop.ui.aPlainLink";

    let imgUploadFile = document.createElement("img");
    imgUploadFile.style = "width: 22%; margin-bottom: 5px;";
    imgUploadFile.src = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLXVwbG9hZCIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtdXBsb2FkIGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em02NS4xOCAyMTYuMDFIMjI0djgwYzAgOC44NC03LjE2IDE2LTE2IDE2aC0zMmMtOC44NCAwLTE2LTcuMTYtMTYtMTZ2LTgwSDk0LjgyYy0xNC4yOCAwLTIxLjQxLTE3LjI5LTExLjI3LTI3LjM2bDk2LjQyLTk1LjdjNi42NS02LjYxIDE3LjM5LTYuNjEgMjQuMDQgMGw5Ni40MiA5NS43YzEwLjE1IDEwLjA3IDMuMDMgMjcuMzYtMTEuMjUgMjcuMzZ6TTM3NyAxMDVMMjc5LjEgN2MtNC41LTQuNS0xMC42LTctMTctN0gyNTZ2MTI4aDEyOHYtNi4xYzAtNi4zLTIuNS0xMi40LTctMTYuOXoiPjwvcGF0aD48L3N2Zz4=";
    
    let pUploadFile = document.createElement("p");
    pUploadFile.innerHTML = vu.sop.msg.addDocumentFileIconMsg;

    linkUploadFile.appendChild(imgUploadFile);
    linkUploadFile.appendChild(pUploadFile);

    divTakePicture.appendChild(linkTakePicture);
    divUploadFile.appendChild(linkUploadFile);
    divContainer.appendChild(divTakePicture);
    divContainer.appendChild(divUploadFile);
    return divContainer;
}

vu.sop.ui.alertResolve = null
vu.sop.ui.alert = async function(msg, e) {
    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.show('vu.sop.ui.alert')
        vu.sop.ui.alertResolve = resolve
        let divContainer = vu.sop.ui.alertDraw(msg, vu.sop.ui.alertClose, e);        

        const el = document.getElementById("vu.sop.ui.alert");
        if (!el) {
            console.warn("[vu.sop.ui.showBottomText] Element 'vu.sop.ui.bottomText' not found.");
            return;
        }     
        
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu.sop.ui.alertAndRefreshResolve = null
vu.sop.ui.alertAndRefresh = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.show('vu.sop.ui.alert')
        vu.sop.ui.alertAndRefreshResolve = resolve
        let divContainer = vu.sop.ui.alertDraw(msg, vu.sop.ui.alertCloseAndRefresh);
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu.sop.ui.alertNoButton = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.show('vu.sop.ui.alert')
        vu.sop.ui.alertResolve = resolve
        let divContainer = vu.sop.ui.alertDraw2(msg, vu.sop.ui.alertClose);
        document.getElementById("vu.sop.ui.alert").appendChild(divContainer);
    });
    return promise
};

vu.sop.ui.alertClose = function() {
    vu.sop.ui.hide('vu.sop.ui.alert')
    document.getElementById("vu.sop.ui.alert").innerHTML = "";
    vu.sop.ui.alertResolve(true)
}

vu.sop.ui.alertCloseAndRefresh = function() {
    window.location.reload(false);
}

vu.sop.ui.disable = function(id) {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
};

vu.sop.ui.enable = function(id) {
    const el = document.getElementById(id);
    if (el) el.disabled = false;
};

vu.sop.ui.hide = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
};

vu.sop.ui.show = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
};

vu.sop.ui.showWhiteLoading = async function() {
    return await vu.sop.ui.show('vu.sop.ui.whiteLoading');
};

vu.sop.ui.hideWhiteLoading = async function() {
    return await vu.sop.ui.hide('vu.sop.ui.whiteLoading');
};

vu.sop.ui.showLoading = async function() {
    return await vu.sop.ui.show("vu.sop.ui.loading");
};

vu.sop.ui.hideLoading = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.loading");
};

vu.sop.ui.showVideo = async function() {
    return await vu.sop.ui.show("vu.sop.ui.videoContainer");
};

vu.sop.ui.showBottomText = async function(text) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (!el) {
        console.warn("[vu.sop.ui.showBottomText] Element 'vu.sop.ui.bottomText' not found.");
        return;
    }
    el.innerHTML = text;
    
    await vu.sop.ui.show("vu.sop.ui.bottomText");
};

vu.sop.ui.hideBottomText = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.bottomText");
};

/*****************************************************************/

vu.sop.ui.showTopText = async function(text) {
    document.getElementById("vu.sop.ui.topText").innerHTML = text;
    await vu.sop.ui.show("vu.sop.ui.topText");
};

vu.sop.ui.hideTopText = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.topText");
};

vu.sop.ui.showTopTextAutoHide = async function(text, time = 4000) {
    vu.sop.ui.showTopText(text);
    setTimeout(function() {
        vu.sop.ui.hideTopText();
    }, time);
}
/*****************************************************************/

vu.sop.ui.showBottomTextAlertTime = false               // Variable para guardar el ultimo tiempo
vu.sop.ui.showBottomTextAlertMinTime = 2000

vu.sop.ui.showBottomTextAlert = async function(text) {
    if (vu.sop.ui.showBottomTextAlertTime === false) { vu.sop.ui.showBottomTextAlertTime = new Date(); }
    if ((new Date().getTime() - vu.sop.ui.showBottomTextAlertTime.getTime()) > vu.sop.ui.showBottomTextAlertMinTime ) {
        //document.getElementById("vu.sop.ui.bottomTextAlert").innerHTML = text;
        vu.sop.ui.bottomTextAlert.text(text)
        //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "inline";
        vu.sop.ui.bottomTextAlert.show()
        vu.sop.ui.showBottomTextAlertTime = false
    }
};

vu.sop.ui.hideBottomTextAlert = async function() {
    if (vu.sop.ui.showBottomTextAlertTime === false) { vu.sop.ui.showBottomTextAlertTime = new Date(); }
    if ((new Date().getTime() - vu.sop.ui.showBottomTextAlertTime.getTime()) > vu.sop.ui.showBottomTextAlertMinTime ) {
        //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "none";
        vu.sop.ui.bottomTextAlert.hide();
    }
};

vu.sop.ui.cleanAndHideBottomTextAlert = async function() {
    //document.getElementById("vu.sop.ui.bottomTextAlert").innerHTML = '';
    vu.sop.ui.bottomTextAlert.text('');
    //document.getElementById("vu.sop.ui.bottomTextAlert").style.display = "none";
    vu.sop.ui.bottomTextAlert.hide();
};

/* ----- */
if (typeof vu.sop.ui.bottomTextAlert == "undefined") { vu.sop.ui.bottomTextAlert = function() {} }

vu.sop.ui.bottomTextAlert.text = function(text) {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.innerHTML = text);
}

vu.sop.ui.bottomTextAlert.show = function() {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.style.display = "inline");    
}

vu.sop.ui.bottomTextAlert.hide = function() {
    const el = document.getElementById("vu.sop.ui.bottomTextAlert");
    el && (el.style.display = "none");    
}

/*****************************************************************/

vu.sop.ui.bottomTextBackGroundColor = function(color) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.backgroundColor = color;
};

vu.sop.ui.bottomTextFontFamily = function(fontFamily) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontFamily = fontFamily;
};

vu.sop.ui.bottomTextFontSize = function(fontSize) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontSize = fontSize;
};

vu.sop.ui.bottomTextFontWeight = function(fontWeight) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontWeight = fontWeight;
};

vu.sop.ui.bottomTextFontStyle = function(fontStyle) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.fontStyle = fontStyle;
};

vu.sop.ui.bottomTextColor = function(color) {
    const el = document.getElementById("vu.sop.ui.bottomText");
    if (el) el.style.color = color;
};

vu.sop.ui.flash = async function () {
    const flashElement = document.getElementById('vu.sop.ui.flash');
    if (!flashElement) {
        console.warn("vu.sop.ui.flash element not found in DOM");
        return false;
    }

    try {
        flashElement.style.display = "block";
        await vu.sop.ui.sleep(100);
        flashElement.style.display = "none";
        return true;
    } catch (error) {
        console.error("Error in vu.sop.ui.flash:", error);
        return false;
    }
};

vu.sop.ui.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu.sop.ui.flipVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(180deg) ";
};

vu.sop.ui.keepVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(0deg)";
};

vu.sop.ui.isMobile = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true
    } else {
        // false for not mobile device
        return false
    }
}


vu.sop.ui.isDeviceCompatible = function() {
    const gl2 = document.createElement('canvas').getContext('webgl2');
    if (gl2) {
        console.log('webgl2 works!');
        return true
    }
    const gl1 = document.createElement('canvas').getContext('webgl');
    if (gl1) {
        let floatExt = gl1.getExtension("OES_TEXTURE_FLOAT");
        if (floatExt) {
            console.log('webgl1 and support OES_TEXTURE_FLOAT!');
            return true
        }
        let halfFloatExt = gl1.getExtension("OES_TEXTURE_HALF_FLOAT");
        if (halfFloatExt) {
            console.log('webgl1 and support OES_TEXTURE_HALF_FLOAT!');
            return true
        }
    }
    return false
}

vu.sop.ui.isBrowserCompatible = function() {
    const { userAgent } = navigator
    // console.log("UserAgent", userAgent);
    if(userAgent.includes('Chrome/')) {
        var raw = userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        var chromeVersion =  raw ? parseInt(raw[2], 10) : false;
        console.log('Browser is Chrome', chromeVersion)
        if (chromeVersion < 87) {
            throw new Error('browserOldVersion')
        }
    } else if(userAgent.includes('AppleWebKit/')) {
        var appleWebKitVersion = parseInt(userAgent.split('AppleWebKit/')[1])
        console.log('Browser is Safari', appleWebKitVersion)
        if (appleWebKitVersion < 604) {
            throw new Error('browserOldVersion')
        }
    } else if(userAgent.includes('Safari/')) {
        var safariVersion = parseInt(userAgent.split('Safari/')[1])
        console.log('Browser is Safari', safariVersion)
        if (safariVersion < 604) {
            throw new Error('browserOldVersion')
        }
    }else if(userAgent.includes('Firefox/')){
        var firefoxVersion = parseInt(userAgent.split('Firefox/')[1])
        console.log('Browser is Firefox', firefoxVersion)
        if (firefoxVersion < 84) {
            throw new Error('browserOldVersion')
        }
    } else if (userAgent.includes('Edg/')) {
        var edgeVersion = parseInt(userAgent.split('Edg/')[1])
        console.log('Browser is Microsoft Edge', edgeVersion)
        if (edgeVersion < 87) {
            throw new Error('browserOldVersion')
        }
    } else {
        throw new Error('browserUnsupported')
    }
}

vu.sop.ui.isSOCompatible = function() {
    const { userAgent } = navigator
     if(userAgent.includes('AppleWebKit/')) {
        var appleWebKitVersion = parseInt(userAgent.split('AppleWebKit/')[1])
        // console.log('Browser is Safari', appleWebKitVersion)
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS ([0-9]+)_([0-9]+)/);
            var iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10)];
            console.log('SO Version', iosVersion)
            if (iosVersion[0] < 14) {
                return false;
            }
            if (iosVersion[0] === 14) {
                if (iosVersion[1] < 3) {
                    return false;
                }
            }
        }
    }else if(userAgent.includes('Safari/')) {
        var safariVersion = parseInt(userAgent.split('Safari/')[1])
        // console.log('Browser is Safari', safariVersion)
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)/);
            var iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10)];
            console.log('SO Version', iosVersion)
            if (iosVersion[0] < 14) {
                return false;
            }
            if (iosVersion[0] === 14) {
                if (iosVersion[1] < 3) {
                    return false;
                }
            }
        }
        if (safariVersion < 604) {
            return false;
        }
    }
    return true;
}

vu.sop.ui.showMirrorBackground  = function() {
    document.getElementById("vu.sop.ui.videoBg").style.display = "block";
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.display = "block";
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.display = "block";

    document.getElementById("vu.sop.ui.videoBg").srcObject = moduleCamera.stream;
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.backgroundColor = vu.sop.ui.cameraBackGroundOverlayTopBGColor;
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.backgroundColor = vu.sop.cameraBackGroundOverlayBottomBGColor;
}

vu.sop.ui.hideMirrorBackground  = function() {
    document.getElementById("vu.sop.ui.videoBg").style.display = "none";
    document.getElementById("vu.sop.ui.videoBgOverlayTop").style.display = "none";
    document.getElementById("vu.sop.ui.videoBgOverlayBottom").style.display = "none";
}


//---------------------------------------------------
// Username
//---------------------------------------------------

//if (typeof vu.sop.ui.user == "undefined") { vu.sop.ui.user = function() {} }

vu.sop.ui.user.start = async function() {
    await vu.sop.ui.show("vu.sop.ui.userContainer");
    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.user.start.resolve = resolve
        vu.sop.ui.user.start.reject = reject
    });
    return promise;
};

vu.sop.ui.user.start.resolve = null;
vu.sop.ui.user.start.reject = null;

vu.sop.ui.user.hide = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.userContainer");
};

vu.sop.ui.user.do  = async function() {
    vu.sop.audio.reproducir();
    await vu.sop.ui.disable('vu.sop.ui.userNameSendBtn');
    await vu.sop.ui.showWhiteLoading();
    let userName = document.getElementById("vu.sop.ui.userName").value;
    vu.sop.userNameValue = userName;

    if(vu.sop.operationIdValue) {
        await start();
    } else {
        await callNewOperation(userName);
    }
};


vu.sop.ui.user.doPreSetUser  = async function(userNameValue, loginFlag) {

    const stack = new Error().stack.split('\n');
    const callerInfo = stack[2] ? stack[2].trim() : 'Unknown caller';

    console.log(`Caller: ${callerInfo}`);

    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.user.start.resolve = resolve
        vu.sop.ui.user.start.reject = reject
    });

    vu.sop.audio.reproducir();

    if(!loginFlag){
        if (vu.sop.operationIdValue) {
            await start();
        } else {
            await callNewOperationWithPresetUser(userNameValue);
        }
    } else {
        await vu.sop.ui.user.hide();
        await vu.sop.ui.showVideo();
        vu.sop.ui.user.start.resolve(true)
    }
};

async function callNewOperation(userName){
    await vu.sop.ui.showWhiteLoading();
    let response;
    
    try {

        if(vu.sop.enableTelemetry){
            await vu.telemetry.initTraceId();
        }

        response = await vu.sop.api.newOperation(userName, vu.sop.browserInfo);
    } catch (error) {
        response = {code: 0, message: vu.sop.msg.userComunicationError}
    }
    await vu.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        vu.sop.operationIdValue = response.operationId;
        vu.sop.operationGuidValue = response.operationGuid;
        window.vu.sop.operationIdValue = vu.sop.operationIdValue;
        window.vu.sop.operationGuidValue = vu.sop.operationGuidValue;
        await start();
    } else {
        console.log('newOperation', 'error', response);
        await vu.sop.ui.enable('vu.sop.ui.userNameSendBtn')
        vu.sop.ui.user.start.reject('error')
    }
};

async function callNewOperationWithPresetUser(userName){
    await vu.sop.ui.showWhiteLoading();
    let response;

    try {
        if(vu.sop.enableTelemetry){
            await vu.telemetry.initTraceId();
        }

        console.log("userName", userName);
        console.log("vu.sop.browserInfo", vu.sop.browserInfo);
        response = await vu.sop.api.newOperation(userName, vu.sop.browserInfo);
        console.log("response", response);            
    } catch (error) {
        response = {code: 0, message: vu.sop.msg.userComunicationError}
        console.log("error", error);
    }

    await vu.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        
        vu.sop.operationIdValue = response.operationId;
        vu.sop.operationGuidValue = response.operationGuid;
        window.vu.sop.operationIdValue = vu.sop.operationIdValue;
        window.vu.sop.operationGuidValue = vu.sop.operationGuidValue;
        
        start();
    } else {
        console.log('newOperation', 'error', response);
        let alertElement = document.getElementById("vu.sop.ui.alert");
        if (alertElement) {
            alertElement.innerHTML = "";
        }
        alert =  vu.sop.ui.alertAndRefresh(vu.sop.msg.addBackDocumentComunicationError);
        //vu.sop.ui.hide("vu.sop.ui.alertButton")
        await alert
    }
};

async function start(){
    await vu.sop.ui.hideWhiteLoading();
    await vu.sop.ui.enable('vu.sop.ui.userNameSendBtn')
    await vu.sop.ui.user.hide();
    await vu.sop.ui.showVideo();
    vu.sop.ui.user.start.resolve(true)
}


//---------------------------------------------------
// Debug
//---------------------------------------------------

//if (typeof vu.sop.ui.debug == "undefined") { vu.sop.ui.debug = function() {} }

vu.sop.ui.debug.initialize = function() {
    // Ensure the vu and vu.sop objects exist before proceeding
    if (!window.vu || !window.vu.sop || !window.vu.sop.ui ) {
        console.error("vu.sop is not defined");
        return;
    }
    vu.sop.ui.debug.debugInfoDiv = document.getElementById("vu.sop.ui.debugInfo.content")
    vu.sop.ui.debug.debugEvalDiv = document.getElementById("vu.sop.ui.debugEval.content")
    vu.sop.ui.debug.debugPerfDiv = document.getElementById("vu.sop.ui.debugPerf.content")
    vu.sop.ui.debug.debugVideoCenter = document.getElementById("vu.sop.ui.debugVideoCenter")
    vu.sop.ui.debug.enable = true
}

vu.sop.ui.debug.enable = false
vu.sop.ui.debug.hangDocumentScreen = false
vu.sop.ui.debug.hangProofOfLife = false
vu.sop.ui.debug.debugElementCenter = false

vu.sop.ui.debug.timeLine = { 'frameConsistency': [] }
vu.sop.ui.debug.info = []
vu.sop.ui.debug.perf = []
vu.sop.ui.debug.eval = []
vu.sop.ui.debug.finalEval = []
vu.sop.ui.debug.faceBox = []
vu.sop.ui.debug.faceGestures = []

vu.sop.ui.boxCenterPoint = document.getElementById('vu.sop.ui.debugElementCenter')
vu.sop.ui.videoContainer = document.getElementById('vu.sop.ui.videoContainer')

vu.sop.ui.drawVideoCenter = function() {
    let videoContainer = document.getElementById('vu.sop.ui.videoContainer')
    let video = document.getElementById('vu.sop.ui.video')

    let fixX = Math.round((video.offsetWidth - videoContainer.offsetWidth)/2)
    let fixY = Math.round((video.offsetHeight - videoContainer.offsetHeight)/2)

    vu.sop.ui.debug.debugVideoCenter.style.left = Math.round((video.offsetWidth / 2) - fixX) - 5 + "px";
    vu.sop.ui.debug.debugVideoCenter.style.top = Math.round((video.offsetHeight / 2) - fixY) - 5 + "px";
    vu.sop.ui.debug.debugVideoCenter.style.display = 'block'
}

vu.sop.ui.cleanResults = function () {
    if(vu.sop.enableTelemetry){
        vu.sop.ui.debug.finalEval.push(vu.sop.ui.debug.eval[0]);
    }
    vu.sop.ui.debug.info = []
    vu.sop.ui.debug.eval = []
    vu.sop.ui.debug.perf = []
}

vu.sop.ui.debugDraw = function () {
    vu.sop.ui.debug.initialize();

    vu.sop.ui.debug.debugInfoDiv.innerHTML = ''
    vu.sop.ui.debug.debugEvalDiv.innerHTML = ''
    vu.sop.ui.debug.debugPerfDiv.innerHTML = ''
    document.getElementById("vu.sop.ui.debugInfo").style.display = 'block'
    document.getElementById("vu.sop.ui.debugEval").style.display = 'block'
    document.getElementById("vu.sop.ui.debugTimeline").style.display = 'block'
    vu.sop.ui.debugDrawTimeLine(vu.sop.ui.debug.timeLine['frameConsistency'], 30);

    for (const value of vu.sop.ui.debug.info) {
        vu.sop.ui.debug.debugInfoDiv.innerHTML += value[0] + ': ' + '<span style="font-weight: bolder;">' + value[1] + '</span>'
        vu.sop.ui.debug.debugInfoDiv.innerHTML += '<br>'
    }
    for (const value of vu.sop.ui.debug.perf) {
        vu.sop.ui.debug.debugPerfDiv.innerHTML += value[0] + ': ' + '<span style="font-weight: bolder;">' + value[1] + '</span>'
        vu.sop.ui.debug.debugPerfDiv.innerHTML += '<br>'
    }
    for (const value of vu.sop.ui.debug.eval) {
        vu.sop.ui.debug.debugEvalDiv.innerHTML += value[0] + ': ' +
            '<span style="font-weight: bolder; color: ' + value[2] + '">' + value[1] + '</span>'
        vu.sop.ui.debug.debugEvalDiv.innerHTML += '<br>'
    }
    vu.sop.ui.cleanResults()
}

/*
Generate a function called vu.sop.ui.debugDrawTimeLine.
This function should take an array as an argument and draw a timeline based on the data in the array.
The array will contain objects with the following structure: [value, time]
- Value is a number that will be used to draw the timeline.
- Time is a JavaScript Date() object

And a second optional argument called threshold, which will be used to determine the maximum value to draw in green,
over that value the color will be red.
This will be drawn in a div with the id vu.sop.ui.debugTimeLine, and will be responsive to the size of the div.
And will be called in a loop for each frame of the video.
*/
/**
 * Draws a responsive timeline of value-time data on a canvas.
 * @param {Array} data - Array of [value, Date] pairs.
 * @param {number} [threshold=Infinity] - Optional threshold for color-coding.
 */
vu.sop.ui.debugDrawTimeLine = (function () {
    let initialized = false;
    let canvas, ctx;

    function initCanvas() {
        const container = document.getElementById('vu.sop.ui.debugTimeline.content');
        if (!container) {
            console.warn('Container #vu.sop.ui.debugTimeLine.content not found.');
            return;
        }

        canvas = document.createElement('canvas');
        canvas.style.width = "100%";
        canvas.style.height = "50px";
        canvas.style.display = "block";
        container.innerHTML = ''; // Clear previous canvas
        container.appendChild(canvas);

        ctx = canvas.getContext('2d');
        initialized = true;

        // Handle high-DPI screens
        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function draw(data, threshold = 30) {
        if (!initialized) initCanvas();
        if (!ctx || !canvas) return;
        if (!Array.isArray(data) || data.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);

        // Normalize time range
        const times = data.map(d => d[1].getTime());
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const timeSpan = maxTime - minTime || 1;

        // Normalize value range
        const values = data.map(d => d[0]);
        const maxValue = Math.max(...values, threshold);

        for (let i = 0; i < data.length; i++) {
            const [value, time] = data[i];
            const x = ((time.getTime() - minTime) / timeSpan) * width;
            const y = height - (value / maxValue) * height;

            ctx.beginPath();
            ctx.moveTo(x, height);
            ctx.lineTo(x, y);
            ctx.strokeStyle = value <= threshold ? 'green' : 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    return draw;
})();

vu.sop.ui.alertCameraSelection = async function (messageText) {
    return new Promise(async (resolve) => {
        vu.sop.ui.show('vu.sop.ui.alert');
        vu.sop.ui.alertResolve = resolve;

        const container = document.getElementById('vu.sop.ui.alert');
        container.innerHTML = '';

        // ✅ Create inner vertical align container
        const divContainer = document.createElement("div");
        divContainer.className = "vu.sop.ui.innerVerticalAlign";

        const label = document.createElement('div');
        label.style.marginBottom = '12px';
        label.innerText = messageText;
        divContainer.appendChild(label);

        const allCameras = await listVideoInputs();
        const physicalCameras = allCameras.filter(cam => !isSuspiciousCameraLabel(cam.label));

        let select;
        const noCamText = vu.sop.msg.noCameras;

        if (physicalCameras.length > 0) {
            select = document.createElement('select');
            select.className = 'vu.sop.custom-select';
            select.style.margin = '0 auto';
            select.style.display = 'block';

            physicalCameras.forEach(cam => {
                const opt = document.createElement('option');
                opt.value = cam.deviceId;
                opt.text = cam.label || vu.sop.msg.unnamedCamera;
                select.appendChild(opt);
            });

            divContainer.appendChild(select);
        } else {
            const noCamMsg = document.createElement('div');
            noCamMsg.style.margin = '16px auto';
            noCamMsg.style.color = '#b00020';
            noCamMsg.style.fontSize = '16px';
            noCamMsg.style.fontWeight = 'bold';
            noCamMsg.innerText = noCamText;
            divContainer.appendChild(noCamMsg);
        }

        const button = document.createElement('button');
        button.className = "vu.sop.btn vu.sop.btn-outline-secondary";
        button.style.marginTop = '12px';
        button.style.border = '1px solid';
        button.innerText = physicalCameras.length > 0 ? vu.sop.msg.continue : vu.sop.msg.retry;

        button.onclick = () => {
            if (physicalCameras.length > 0) {
                const deviceId = select.value;
                resolve(deviceId);
                vu.sop.ui.alertClose();
            } else {
                location.reload(); // 🔁 Refresh on retry
            }
        };

        divContainer.appendChild(button);

        // ✅ Append inner container to root alert
        container.appendChild(divContainer);
    });
};




export default vu.sop.ui;