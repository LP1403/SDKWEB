// Reference the existing vu object
const vu = window.vu || {};
vu.extras = vu.extras || {};

vu.extras.detectEnvironment = function() {
    if (isReact()) {
        return 'react';
    } else if (isAngular()) {
        return 'angular';
    } else if (isVue()) {
        return 'vue';
    } else {
        return 'plain Web';
    }
};

const environmentMap = {
    react: 'React',
    angular: 'Angular',
    vue: 'Vue',
    plainweb: 'Plain Web'
};

vu.extras.loadedScripts = vu.extras.loadedScripts || {};

vu.extras.loadScript = async (rootPath, techStack, folder, scriptFileName, globalObjectName) => {
    // If the script is already loaded or loading, return the cached promise
    
    if (vu.extras.loadedScripts[globalObjectName]) {
        console.log("globalObjectName", globalObjectName);
        return vu.extras.loadedScripts[globalObjectName];
    }

    if (typeof window[globalObjectName] === 'undefined') {
        const environment = environmentMap[techStack?.toLowerCase()] || 'Plain Web';
        let scriptPath;

        switch (environment) {
            case 'React':
            case 'Angular':
            case 'Vue':
                //console.debug(`${environment} environment detected`);
                scriptPath = `/static/vu-om-websdk/${folder}/${scriptFileName}`;

                if (folder === "") {
                    scriptPath = `/static/vu-om-websdk/${scriptFileName}`;
                }

                // Cache the promise of the script load to prevent multiple loads
                vu.extras.loadedScripts[globalObjectName] = new Promise((resolve, reject) => {
                    const scriptAlreadyLoaded = Array.from(document.scripts).some(script => script.src.includes(scriptPath));

                    if (!scriptAlreadyLoaded) {
                        const script = document.createElement('script');
                        script.src = scriptPath;
                        script.type = 'text/javascript';
                        script.async = true;

                        // This function will check for the global object in a loop until it's available
                        // This function will check for the global object in a loop until it's available
                        const checkGlobalObject = () => {
                            console.log("checkGlobalObject");
                            console.log("globalObjectName ", globalObjectName);

                            // Split the globalObjectName string (e.g., 'vu.sop.msg') to resolve nested properties
                            const parts = globalObjectName.split('.');
                            let obj = window;

                            // Traverse the window object to reach the desired nested property (vu.sop.msg)
                            for (const part of parts) {
                                if (obj[part]) {
                                    obj = obj[part];
                                } else {
                                    obj = undefined;
                                    break;
                                }
                            }

                            console.log("Resolved object: ", obj);

                            // If the object is found, resolve the promise
                            if (obj) {
                                resolve(obj);
                                console.log("resolved ", obj);
                            } else {
                                // Keep retrying until the global object is attached
                                requestAnimationFrame(checkGlobalObject);
                            }
                        };

                        script.onload = () => {
                            console.log(`${globalObjectName} loaded successfully in ${environment} environment.`);
                            checkGlobalObject(); // Start checking for the global object
                        };

                        script.onerror = (event) => {
                            let errorDetails = {
                                message: `Failed to load ${scriptFileName} in ${environment}.`,
                                scriptPath: script.src,
                                errorEvent: event,
                                possibleCauses: [
                                    "Script file is missing or not found at the specified path.",
                                    "Network issues (e.g., server not responding).",
                                    "Cross-origin resource sharing (CORS) issues."
                                ]
                            };
                            console.error(`Error loading script:`, errorDetails);
                            reject(new Error(`Failed to load ${scriptFileName} in ${environment}. See console for more details.`));
                        };

                        document.head.appendChild(script);
                    } else {
                        console.log(`${globalObjectName} already loaded.`);
                        resolve(window[globalObjectName]);
                    }
                });

                return vu.extras.loadedScripts[globalObjectName];

            case 'Plain Web':
            default:
                //console.debug("Plain web environment detected");
                //scriptPath = `./${rootPath}/${folder}/${scriptFileName}`;

                if (folder === "") {
                    scriptPath = `${rootPath}/${scriptFileName}`;
                } else {
                    scriptPath = `${rootPath}/${folder}/${scriptFileName}`;
                }                

                // try {
                //     let module;
                //     if (folder === "") {
                //         module = await import(new URL(`./${rootPath}/${scriptFileName}`, import.meta.url).href);
                //     } else {
                //         module = await import(new URL(`./${rootPath}/${folder}/${scriptFileName}`, import.meta.url).href);
                //     }

                //     if (!window[globalObjectName] && module) {
                //         window[globalObjectName] = module.default || module;
                //     }

                //     // Cache the loaded script result
                //     vu.extras.loadedScripts[globalObjectName] = Promise.resolve(window[globalObjectName]);

                //     return window[globalObjectName];
                // } catch (error) {
                //     console.error(`Failed to dynamically import ${scriptFileName}:`, error);
                //     return null;
                // }

                // Cache the promise of the script load to prevent multiple loads
                vu.extras.loadedScripts[globalObjectName] = new Promise((resolve, reject) => {
                    const scriptAlreadyLoaded = Array.from(document.scripts).some(script => script.src.includes(scriptPath));

                    if (!scriptAlreadyLoaded) {
                        const script = document.createElement('script');
                        script.src = scriptPath;
                        script.type = 'text/javascript';
                        script.async = true;

                        // This function will check for the global object in a loop until it's available
                        // This function will check for the global object in a loop until it's available
                        const checkGlobalObject = () => {
                            console.log("checkGlobalObject");
                            console.log("globalObjectName ", globalObjectName);

                            // Split the globalObjectName string (e.g., 'vu.sop.msg') to resolve nested properties
                            const parts = globalObjectName.split('.');
                            let obj = window;

                            // Traverse the window object to reach the desired nested property (vu.sop.msg)
                            for (const part of parts) {
                                if (obj[part]) {
                                    obj = obj[part];
                                } else {
                                    obj = undefined;
                                    break;
                                }
                            }

                            console.log("Resolved object: ", obj);

                            // If the object is found, resolve the promise
                            if (obj) {
                                resolve(obj);
                                console.log("resolved ", obj);
                            } else {
                                // Keep retrying until the global object is attached
                                requestAnimationFrame(checkGlobalObject);
                            }
                        };

                        script.onload = () => {
                            console.log(`${globalObjectName} loaded successfully in ${environment} environment.`);
                            checkGlobalObject(); // Start checking for the global object
                        };

                        script.onerror = (event) => {
                            let errorDetails = {
                                message: `Failed to load ${scriptFileName} in ${environment}.`,
                                scriptPath: script.src,
                                errorEvent: event,
                                possibleCauses: [
                                    "Script file is missing or not found at the specified path.",
                                    "Network issues (e.g., server not responding).",
                                    "Cross-origin resource sharing (CORS) issues."
                                ]
                            };
                            console.error(`Error loading script:`, errorDetails);
                            reject(new Error(`Failed to load ${scriptFileName} in ${environment}. See console for more details.`));
                        };

                        document.head.appendChild(script);
                    } else {
                        console.log(`${globalObjectName} already loaded.`);
                        resolve(window[globalObjectName]);
                    }
                });

                return vu.extras.loadedScripts[globalObjectName];                
        }
    }

    // Return the global object if already loaded
    return window[globalObjectName];
};

const scriptGlobalObjectMapping = {
    "vu.face.orientation.js": "vu.face",
    // "jeelizFaceFilter.js": "JEEFACEFILTERAPI",
    "vu.face.mixedChallenge.js": "vu.face",
    "vu.face.ui.mixedChallenge.js": "vu.face.ui.gestures"        
};

vu.extras.cleanupGestureScripts = (gestureConfig, techStack) => {
    // Mapping of file names to their respective global object names
    const gestureScripts = ["vu.face.orientation.js"];
    const mixedChallengeScripts = ["vu.face.mixedChallenge.js", "vu.face.ui.mixedChallenge.js"];

    const removeScripts = (scripts) => {
        const environment = environmentMap[techStack?.toLowerCase()] || 'Plain Web';

        scripts.forEach((scriptName) => {
            const globalObjectName = scriptGlobalObjectMapping[scriptName];
            console.log("globalObjectName", globalObjectName);
            if (!globalObjectName) return;  // Skip if mapping not found

            // Remove from vu.extras.loadedScripts cache
            if (vu.extras.loadedScripts[globalObjectName]) {
                delete vu.extras.loadedScripts[globalObjectName];
                console.log(`Removed from loadedScripts cache: ${globalObjectName}`);
            }

            if (environment === "Plain Web") {
                // For Plain Web, delete the global object associated with the script
                if (window[globalObjectName]) {
                    delete window[globalObjectName];
                    console.log(`Removed module from window: ${globalObjectName}`);
                }

                const existingScript = Array.from(document.getElementsByTagName('script')).find(
                    (script) => script.src.includes(scriptName)
                );
                if (existingScript) {
                    console.log(`Removing script tag: ${scriptName}`);
                    existingScript.remove();
                }                
            } else {
                // For React/Angular/Vue, remove <script> tags if they exist
                const existingScript = Array.from(document.getElementsByTagName('script')).find(
                    (script) => script.src.includes(scriptName)
                );
                if (existingScript) {
                    console.log(`Removing script tag: ${scriptName}`);
                    existingScript.remove();
                }
            }
        });
    };

    if (gestureConfig == "points") {
        removeScripts(gestureScripts);
    } else {
        removeScripts(mixedChallengeScripts);
    }
};


vu.extras.loadFile = async (rootPath, folder, fileName, techStack) => {
    const environment = environmentMap[techStack?.toLowerCase()] || 'Plain Web';
    let path;

    switch (environment) {
        case 'React':
        case 'Angular':
        case 'Vue':
            console.debug(`${environment} environment detected`);
            path = `/static/vu-om-websdk/${folder}/${fileName}`;
            break;

        case 'Plain Web':
        default:
            console.debug("Plain web environment detected");
            //path = new URL(`${rootPath}/${folder}/${fileName}`, import.meta.url).href; // Use the same URL constructor logic
            // Simple path building that works with obfuscation
            if (rootPath.startsWith('http://') || rootPath.startsWith('https://') || rootPath.startsWith('/')) {
                // Absolute path
                path = `${rootPath}/${folder}/${fileName}`;
            } else {
                // Relative path
                path = `./${rootPath}/${folder}/${fileName}`;
            }
            break;            
    }

    console.debug(`Attempting to load file from path: ${path}`); 

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${fileName}. Status: ${response.status}`);
        }
        const htmlContent = await response.text();
        console.debug(`${fileName} loaded successfully.`);
        return htmlContent;
    } catch (error) {
        console.error(`Error loading HTML:`, error);
        throw error;
    }
};

function isReact() {
    return typeof window.React !== 'undefined' || typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
}

function isAngular() {
    return typeof window.ng !== 'undefined';
}

function isVue() {
    return typeof window.Vue !== 'undefined';
}

export default vu.extras;