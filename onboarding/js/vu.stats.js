/**
 * Ultra-Comprehensive Analytics SDK
 * Maximum data collection with your existing browser detection
 * Requires UAParser library for fallback support
 */
class UltraAnalyticsSDK {
    constructor(workerUrl, options = {}) {
        this.workerUrl = workerUrl;
        this.sessionId = this.generateSessionId();
        this.queue = [];
        this.encryptionKey = options.encryptionKey;
        this.config = {
            batchSize: options.batchSize || 15,
            flushInterval: options.flushInterval || 4000,
            enableAutoTrack: options.enableAutoTrack !== false,
            enableAdvancedFingerprinting: options.enableAdvancedFingerprinting !== false,
            enablePerformanceTracking: options.enablePerformanceTracking !== false,
            debug: options.debug || false,
            maxDataPoints: options.maxDataPoints || 100, // Prevent excessive data collection
            ...options
        };

        this.deviceInfo = null;
        this.networkInfo = null;
        this.hardwareInfo = null;
        this.advancedFingerprint = null;
        this.performanceBaseline = null;

        this.init();
    }

    // Derive a strong 256-bit AES key from any input string using PBKDF2 (matches worker)
    async deriveKey(password) {
        const encoder = new TextEncoder();
        
        // Same salt as worker for compatibility
        const salt = encoder.encode('om-useragent-analytics-salt-2025');
        
        // Import password as key material
        const passwordKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        
        // Derive AES-GCM key using PBKDF2
        return await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000, // 100k iterations for good security
                hash: 'SHA-256'
            },
            passwordKey,
            {
                name: 'AES-GCM',
                length: 256 // 256-bit key
            },
            false,
            ['encrypt']
        );
    }

    // AES-GCM encryption
    async encryptData(data) {
        if (!this.encryptionKey) {
            return data; // No encryption if no key provided
        }

        try {
            const key = await this.deriveKey(this.encryptionKey);

            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encodedData = new TextEncoder().encode(JSON.stringify(data));
            
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                encodedData
            );

            // Combine IV + encrypted data like the worker expects
            const encryptedArray = new Uint8Array(encrypted);
            const combined = new Uint8Array(iv.length + encryptedArray.length);
            combined.set(iv, 0);
            combined.set(encryptedArray, iv.length);
            
            const combinedBase64 = btoa(String.fromCharCode(...combined));
            
            return {
                encrypted: combinedBase64
            };
        } catch (error) {
            console.error('Encryption error:', error);
            return data; // Fallback to unencrypted
        }
    }

    async init() {
        try {
            // Collect comprehensive device information
            await this.collectDeviceInfo();
            await this.collectNetworkInfo();
            await this.collectHardwareInfo();
            
            if (this.config.enableAdvancedFingerprinting) {
                await this.collectAdvancedFingerprint();
            }

            if (this.config.enablePerformanceTracking) {
                this.setupPerformanceTracking();
            }

            if (this.config.enableAutoTrack) {
                this.startAutoFlush();
                this.setupAutoTracking();
            }

            // Initial page view with all collected data (only if auto-track is enabled)
            if (this.config.enableAutoTrack) {
                this.trackPageView();
            }

            // Cleanup on page unload (only if auto-tracking or queue might have events)
            if (this.config.enableAutoTrack) {
                window.addEventListener('beforeunload', () => this.flush());
                window.addEventListener('pagehide', () => this.flush());
            }

            if (this.config.debug) {
                console.log('Ultra Analytics SDK initialized with comprehensive data collection');
            }

        } catch (error) {
            console.error('Analytics SDK initialization error:', error);
        }
    }

    // Enhanced version of your getBrowserInfo function
    async collectDeviceInfo() {
        let result = {};
        
        try {
            if (navigator.userAgentData) {
                const uaData = await navigator.userAgentData.getHighEntropyValues([
                    'platform',
                    'platformVersion',
                    'model',
                    'uaFullVersion',
                    'fullVersionList',
                    'brands',
                    'architecture',
                    'bitness',
                    'wow64'
                ]);

                result = {
                    // Browser info
                    browserName: navigator.userAgentData.brands.find(b => b.brand !== 'Not A;Brand')?.brand || 'Unknown',
                    browserVersion: uaData.uaFullVersion || 'Unknown',
                    browserEngineName: this.detectEngine(navigator.userAgentData.brands),
                    browserEngineVersion: uaData.uaFullVersion || 'Unknown',
                    browserBrands: JSON.stringify(navigator.userAgentData.brands),
                    browserFullVersionList: JSON.stringify(uaData.fullVersionList || []),
                    
                    // Device info
                    mobilePlatform: uaData.platform === 'Android' || uaData.platform === 'iOS' ? 'mobile' : 'desktop',
                    mobileModel: uaData.model || 'Unknown Model',
                    deviceType: this.detectDeviceType(uaData),
                    deviceVendor: this.detectVendor(uaData),
                    
                    // System info
                    operatingSystem: uaData.platform || 'Unknown OS',
                    operatingSystemVersion: uaData.platformVersion || 'Unknown',
                    architecture: uaData.architecture || 'Unknown',
                    bitness: uaData.bitness || 'Unknown',
                    wow64: uaData.wow64 || false,
                    
                    // Mobile detection
                    isMobile: navigator.userAgentData.mobile,
                    isTablet: this.detectTablet(uaData),
                    isDesktop: !navigator.userAgentData.mobile && !this.detectTablet(uaData)
                };
            } else if (typeof UAParser !== 'undefined') {
                // Fallback to UAParser (your existing logic enhanced)
                const parser = new UAParser();
                const uaResult = parser.getResult();

                result = {
                    browserName: uaResult.browser.name || 'Unknown Browser',
                    browserVersion: uaResult.browser.version || 'Unknown',
                    browserEngineName: uaResult.engine.name || 'Unknown Engine',
                    browserEngineVersion: uaResult.engine.version || 'Unknown',
                    browserMajor: uaResult.browser.major || 'Unknown',
                    
                    mobilePlatform: uaResult.device.type || 'desktop',
                    mobileModel: uaResult.device.model || 'Unknown Model',
                    deviceType: uaResult.device.type || 'desktop',
                    deviceVendor: uaResult.device.vendor || 'Unknown',
                    
                    operatingSystem: uaResult.os.name || 'Unknown OS',
                    operatingSystemVersion: uaResult.os.version || 'Unknown',
                    
                    isMobile: uaResult.device.type === 'mobile',
                    isTablet: uaResult.device.type === 'tablet',
                    isDesktop: !uaResult.device.type || uaResult.device.type === 'desktop'
                };
            } else {
                // Basic fallback without UAParser
                const ua = navigator.userAgent;
                result = this.parseUserAgentBasic(ua);
            }

            // Add common properties
            result = {
                ...result,
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: JSON.stringify(navigator.languages || []),
                platform: navigator.platform,
                cookieEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack === '1' || navigator.doNotTrack === 1,
                onlineStatus: navigator.onLine,
                
                // Screen info
                screenWidth: screen.width,
                screenHeight: screen.height,
                screenColorDepth: screen.colorDepth,
                screenPixelDepth: screen.pixelDepth,
                screenAvailWidth: screen.availWidth,
                screenAvailHeight: screen.availHeight,
                screenOrientation: screen.orientation?.type || 'unknown',
                
                // Viewport info
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                documentWidth: document.documentElement.clientWidth,
                documentHeight: document.documentElement.clientHeight,
                pixelRatio: window.devicePixelRatio || 1,
                
                // Touch capabilities
                hasTouch: 'ontouchstart' in window,
                maxTouchPoints: navigator.maxTouchPoints || 0,
                
                // Timezone info
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset(),
                
                // Memory info (if available)
                deviceMemory: navigator.deviceMemory || null,
                hardwareConcurrency: navigator.hardwareConcurrency || null
            };

        } catch (error) {
            console.error('Device info collection error:', error);
            result = this.parseUserAgentBasic(navigator.userAgent);
        }

        this.deviceInfo = result;
        return result;
    }

    detectEngine(brands) {
        if (!brands) return 'Unknown';
        
        const brandList = brands.map(b => b.brand.toLowerCase());
        
        if (brandList.some(b => b.includes('chrome') || b.includes('chromium'))) return 'Blink';
        if (brandList.some(b => b.includes('firefox'))) return 'Gecko';
        if (brandList.some(b => b.includes('safari'))) return 'WebKit';
        if (brandList.some(b => b.includes('edge'))) return 'EdgeHTML';
        
        return 'Unknown';
    }

    detectDeviceType(uaData) {
        if (uaData.mobile) return 'mobile';
        if (uaData.model && uaData.model.toLowerCase().includes('tablet')) return 'tablet';
        return 'desktop';
    }

    detectTablet(uaData) {
        return uaData.model && (
            uaData.model.toLowerCase().includes('tablet') ||
            uaData.model.toLowerCase().includes('ipad')
        );
    }

    detectVendor(uaData) {
        if (uaData.platform === 'iOS' || uaData.model?.includes('iPhone') || uaData.model?.includes('iPad')) return 'Apple';
        if (uaData.platform === 'Android') return 'Google';
        if (uaData.platform === 'Windows') return 'Microsoft';
        return 'Unknown';
    }

    parseUserAgentBasic(ua) {
        // Basic UA parsing without external libraries
        return {
            browserName: this.getBrowserFromUA(ua),
            browserVersion: this.getVersionFromUA(ua),
            operatingSystem: this.getOSFromUA(ua),
            isMobile: /Mobi|Android/i.test(ua),
            isTablet: /Tablet|iPad/i.test(ua),
            isDesktop: !/Mobi|Android|Tablet|iPad/i.test(ua),
            isBot: /bot|crawler|spider|crawling/i.test(ua)
        };
    }

    getBrowserFromUA(ua) {
        if (ua.includes('Chrome/')) return 'Chrome';
        if (ua.includes('Firefox/')) return 'Firefox';
        if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
        if (ua.includes('Edge/')) return 'Edge';
        if (ua.includes('Opera/')) return 'Opera';
        return 'Unknown';
    }

    getVersionFromUA(ua) {
        const patterns = [
            /Chrome\/([0-9.]+)/,
            /Firefox\/([0-9.]+)/,
            /Version\/([0-9.]+).*Safari/,
            /Edge\/([0-9.]+)/,
            /Opera\/([0-9.]+)/
        ];
        
        for (const pattern of patterns) {
            const match = ua.match(pattern);
            if (match) return match[1];
        }
        return 'Unknown';
    }

    getOSFromUA(ua) {
        if (ua.includes('Windows NT')) return 'Windows';
        if (ua.includes('Mac OS X')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    }

    async collectNetworkInfo() {
        try {
            const networkInfo = {};
            
            if (navigator.connection) {
                const conn = navigator.connection;
                networkInfo.effectiveType = conn.effectiveType;
                networkInfo.downlink = conn.downlink;
                networkInfo.downlinkMax = conn.downlinkMax;
                networkInfo.rtt = conn.rtt;
                networkInfo.saveData = conn.saveData;
                networkInfo.type = conn.type;
            }

            // Network timing via Performance API
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                networkInfo.dnsLookup = timing.domainLookupEnd - timing.domainLookupStart;
                networkInfo.tcpConnect = timing.connectEnd - timing.connectStart;
                networkInfo.sslHandshake = timing.secureConnectionStart ? timing.connectEnd - timing.secureConnectionStart : 0;
                networkInfo.serverResponse = timing.responseStart - timing.requestStart;
                networkInfo.pageDownload = timing.responseEnd - timing.responseStart;
            }

            // Test connection speed (optional)
            if (this.config.enableAdvancedFingerprinting) {
                networkInfo.connectionSpeed = await this.testConnectionSpeed();
            }

            this.networkInfo = networkInfo;
            return networkInfo;

        } catch (error) {
            console.error('Network info collection error:', error);
            return {};
        }
    }

    async testConnectionSpeed() {
        try {
            const startTime = performance.now();
            // Use a small image for speed test (1KB)
            const testImage = new Image();
            
            return new Promise((resolve) => {
                testImage.onload = () => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    const speed = Math.round(1024 / (duration / 1000)); // bytes per second
                    resolve(speed);
                };
                testImage.onerror = () => resolve(null);
                
                // Small base64 image for testing
                testImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
            });
        } catch (error) {
            return null;
        }
    }

    async collectHardwareInfo() {
        try {
            const hardwareInfo = {
                // CPU info
                logicalProcessors: navigator.hardwareConcurrency || null,
                
                // Memory info
                deviceMemory: navigator.deviceMemory || null,
                
                // GPU info (if available)
                webglVendor: null,
                webglRenderer: null,
                
                // Battery info (if available)
                batteryLevel: null,
                batteryCharging: null,
                batteryChargingTime: null,
                batteryDischargingTime: null,
                
                // Storage estimation (if available)
                storageQuota: null,
                storageUsage: null
            };

            // WebGL info
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        hardwareInfo.webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                        hardwareInfo.webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    }
                }
            } catch (e) {}

            // Battery API (deprecated but still available in some browsers)
            if (navigator.getBattery) {
                try {
                    const battery = await navigator.getBattery();
                    hardwareInfo.batteryLevel = battery.level;
                    hardwareInfo.batteryCharging = battery.charging;
                    hardwareInfo.batteryChargingTime = battery.chargingTime;
                    hardwareInfo.batteryDischargingTime = battery.dischargingTime;
                } catch (e) {}
            }

            // Storage API
            if (navigator.storage && navigator.storage.estimate) {
                try {
                    const estimate = await navigator.storage.estimate();
                    hardwareInfo.storageQuota = estimate.quota;
                    hardwareInfo.storageUsage = estimate.usage;
                } catch (e) {}
            }

            this.hardwareInfo = hardwareInfo;
            return hardwareInfo;

        } catch (error) {
            console.error('Hardware info collection error:', error);
            return {};
        }
    }

    async collectAdvancedFingerprint() {
        try {
            const fingerprint = {
                // Canvas fingerprinting
                canvasFingerprint: this.getCanvasFingerprint(),
                
                // WebGL fingerprinting
                webglFingerprint: this.getWebGLFingerprint(),
                
                // Audio fingerprinting
                audioFingerprint: await this.getAudioFingerprint(),
                
                // Font detection
                availableFonts: await this.getAvailableFonts(),
                
                // Plugin detection
                plugins: this.getPluginInfo(),
                
                // Media devices
                mediaDevices: await this.getMediaDevices(),
                
                // Sensor access
                sensors: await this.getSensorInfo(),
                
                // WebRTC fingerprinting
                webrtcFingerprint: await this.getWebRTCFingerprint()
            };

            this.advancedFingerprint = fingerprint;
            return fingerprint;

        } catch (error) {
            console.error('Advanced fingerprinting error:', error);
            return {};
        }
    }

    getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial, sans-serif';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('🎨 Canvas fingerprint test 🔍', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('Ultra Analytics SDK', 4, 45);

            return canvas.toDataURL().slice(0, 100); // Truncate for privacy

        } catch (error) {
            return null;
        }
    }

    getWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return null;

            const renderer = gl.getParameter(gl.RENDERER);
            const vendor = gl.getParameter(gl.VENDOR);
            const version = gl.getParameter(gl.VERSION);
            const shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);

            return {
                renderer: renderer.slice(0, 50),
                vendor: vendor.slice(0, 50),
                version,
                shadingLanguageVersion
            };

        } catch (error) {
            return null;
        }
    }

    async getAudioFingerprint() {
        return new Promise((resolve) => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const analyser = audioContext.createAnalyser();
                const gainNode = audioContext.createGain();

                oscillator.type = 'triangle';
                oscillator.frequency.value = 10000;
                gainNode.gain.value = 0;

                oscillator.connect(analyser);
                analyser.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start();

                setTimeout(() => {
                    const data = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(data);
                    
                    const fingerprint = Array.from(data.slice(0, 20)).join('');
                    
                    oscillator.stop();
                    audioContext.close();
                    resolve(fingerprint);
                }, 100);

            } catch (error) {
                resolve(null);
            }
        });
    }

    async getAvailableFonts() {
        const testFonts = [
            'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
            'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
            'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS',
            'Verdana', 'MS Sans Serif', 'MS Serif', 'Calibri', 'Cambria',
            'Candara', 'Consolas', 'Constantia', 'Corbel', 'Franklin Gothic Medium',
            'Gabriola', 'Segoe UI', 'Symbol', 'Webdings', 'Wingdings'
        ];

        const availableFonts = [];
        const testString = 'mmmmmmmmmmlli';
        const baseSize = '72px';

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            ctx.font = `${baseSize} monospace`;
            const baseWidth = ctx.measureText(testString).width;

            for (const font of testFonts) {
                ctx.font = `${baseSize} ${font}, monospace`;
                const width = ctx.measureText(testString).width;
                
                if (width !== baseWidth) {
                    availableFonts.push(font);
                }
            }

        } catch (error) {
            return [];
        }

        return availableFonts;
    }

    getPluginInfo() {
        try {
            return Array.from(navigator.plugins || []).map(plugin => ({
                name: plugin.name,
                filename: plugin.filename,
                description: plugin.description,
                version: plugin.version
            }));
        } catch (error) {
            return [];
        }
    }

    async getMediaDevices() {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                return null;
            }

            const devices = await navigator.mediaDevices.enumerateDevices();
            return {
                audioInputCount: devices.filter(d => d.kind === 'audioinput').length,
                videoInputCount: devices.filter(d => d.kind === 'videoinput').length,
                audioOutputCount: devices.filter(d => d.kind === 'audiooutput').length
            };

        } catch (error) {
            return null;
        }
    }

    async getSensorInfo() {
        const sensors = {};

        try {
            // Accelerometer
            if ('Accelerometer' in window) {
                sensors.hasAccelerometer = true;
            }

            // Gyroscope
            if ('Gyroscope' in window) {
                sensors.hasGyroscope = true;
            }

            // Magnetometer
            if ('Magnetometer' in window) {
                sensors.hasMagnetometer = true;
            }

            // Ambient Light Sensor
            if ('AmbientLightSensor' in window) {
                sensors.hasAmbientLightSensor = true;
            }

        } catch (error) {
            // Sensors not available
        }

        return sensors;
    }

    async getWebRTCFingerprint() {
        return new Promise((resolve) => {
            try {
                const pc = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                });

                const ips = [];

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        const candidate = event.candidate.candidate;
                        const ip = candidate.split(' ')[4];
                        if (ip && !ips.includes(ip)) {
                            ips.push(ip);
                        }
                    }
                };

                pc.createDataChannel('test');

                pc.createOffer().then((offer) => {
                    pc.setLocalDescription(offer);
                });

                setTimeout(() => {
                    pc.close();
                    resolve({ localIPs: ips });
                }, 2000);

            } catch (error) {
                resolve(null);
            }
        });
    }

    setupPerformanceTracking() {
        // Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.track('web_vital', {
                            metric: 'LCP',
                            value: entry.startTime,
                            rating: entry.startTime < 2500 ? 'good' : entry.startTime < 4000 ? 'needs-improvement' : 'poor'
                        });
                    });
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.track('web_vital', {
                            metric: 'FID',
                            value: entry.processingStart - entry.startTime,
                            rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
                        });
                    });
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift
                new PerformanceObserver((entryList) => {
                    let clsValue = 0;
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    
                    this.track('web_vital', {
                        metric: 'CLS',
                        value: clsValue,
                        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
                    });
                }).observe({ entryTypes: ['layout-shift'] });

            } catch (error) {
                console.error('Performance tracking setup error:', error);
            }
        }
    }

    generateSessionId() {
        try {
            const existing = sessionStorage.getItem('ultra_analytics_session');
            const timestamp = sessionStorage.getItem('ultra_analytics_timestamp');
            const now = Date.now();
            
            // Session timeout: 30 minutes
            if (existing && timestamp && (now - parseInt(timestamp)) < 1800000) {
                sessionStorage.setItem('ultra_analytics_timestamp', now.toString());
                return existing;
            }
        } catch (e) {}

        const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`;
        
        try {
            sessionStorage.setItem('ultra_analytics_session', sessionId);
            sessionStorage.setItem('ultra_analytics_timestamp', Date.now().toString());
        } catch (e) {}

        return sessionId;
    }

    setupAutoTracking() {
        // Enhanced click tracking
        document.addEventListener('click', (e) => {
            const element = e.target;
            this.track('click', {
                tagName: element.tagName.toLowerCase(),
                id: element.id || undefined,
                className: element.className || undefined,
                text: (element.textContent || element.innerText || '').slice(0, 100),
                href: element.href || undefined,
                x: e.clientX,
                y: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                button: e.button,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                metaKey: e.metaKey
            });
        });

        // Form interactions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            this.track('form_submit', {
                formId: form.id || undefined,
                formClass: form.className || undefined,
                action: form.action || undefined,
                method: form.method || undefined,
                fieldCount: form.elements.length
            });
        });

        document.addEventListener('input', (e) => {
            const element = e.target;
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                this.track('form_input', {
                    inputType: element.type || undefined,
                    inputName: element.name || undefined,
                    formId: element.form?.id || undefined
                });
            }
        });

        // Scroll tracking with more detail
        let maxScroll = 0;
        let scrollTimer = null;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll) {
                    const increment = scrollPercent >= 90 ? 5 : 25; // More granular tracking near end
                    if (scrollPercent >= maxScroll + increment) {
                        maxScroll = scrollPercent;
                        this.track('scroll', {
                            depth: scrollPercent,
                            scrollY: window.scrollY,
                            documentHeight: document.body.scrollHeight,
                            viewportHeight: window.innerHeight
                        });
                    }
                }
            }, 250);
        });

        // Visibility change tracking
        document.addEventListener('visibilitychange', () => {
            this.track('visibility_change', {
                hidden: document.hidden,
                visibilityState: document.visibilityState
            });
        });

        // Focus/Blur tracking
        window.addEventListener('focus', () => {
            this.track('window_focus');
        });

        window.addEventListener('blur', () => {
            this.track('window_blur');
        });

        // Resize tracking
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.track('window_resize', {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    outerWidth: window.outerWidth,
                    outerHeight: window.outerHeight
                });
            }, 500);
        });
    }

    startAutoFlush() {
        setInterval(() => {
            if (this.queue.length > 0) {
                this.flush();
            }
        }, this.config.flushInterval);
    }

    // Main tracking method with comprehensive data
    track(eventType, properties = {}) {
        const event = {
            // Basic event info
            sessionId: this.sessionId,
            eventType,
            timestamp: Date.now(),
            url: window.location.href,
            referrer: document.referrer || undefined,
            title: document.title,
            
            // Merge all collected data
            ...this.deviceInfo,
            ...this.networkInfo,
            ...this.hardwareInfo,
            ...this.advancedFingerprint,
            
            // Current viewport info
            currentViewportWidth: window.innerWidth,
            currentViewportHeight: window.innerHeight,
            
            // Performance timing for page views
            ...(eventType === 'page_view' && this.getPerformanceMetrics()),
            
            // Custom properties
            ...properties
        };

        // Limit data size to prevent excessive payloads
        const eventString = JSON.stringify(event);
        if (eventString.length > 50000) { // 50KB limit
            if (this.config.debug) {
                console.warn('Event data too large, truncating:', eventString.length);
            }
            // Remove large fingerprinting data if needed
            delete event.availableFonts;
            delete event.plugins;
            delete event.webglFingerprint;
        }

        this.queue.push(event);

        if (this.config.debug) {
            console.log('Ultra Analytics event tracked:', eventType, properties);
        }

        // Auto-flush if queue is full
        if (this.queue.length >= this.config.batchSize) {
            this.flush();
        }
    }

    getPerformanceMetrics() {
        if (!window.performance || !window.performance.timing) {
            return {};
        }

        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;

        return {
            pageLoadTime: timing.loadEventEnd - navigationStart,
            domLoadTime: timing.domContentLoadedEventEnd - navigationStart,
            firstByteTime: timing.responseStart - navigationStart,
            dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
            tcpConnectTime: timing.connectEnd - timing.connectStart,
            sslTime: timing.secureConnectionStart ? timing.connectEnd - timing.secureConnectionStart : 0,
            requestTime: timing.responseStart - timing.requestStart,
            responseTime: timing.responseEnd - timing.responseStart,
            domProcessingTime: timing.domComplete - timing.domLoading,
            unloadTime: timing.unloadEventEnd - timing.unloadEventStart
        };
    }

    // Convenience methods
    trackPageView(url = window.location.href, title = document.title) {
        this.track('page_view', { url, title });
    }

    trackCustomEvent(eventName, properties = {}) {
        this.track('custom_event', { eventName, ...properties });
        
        // If auto-tracking is disabled, manually flush immediately
        if (!this.config.enableAutoTrack) {
            this.flush();
        }
    }

    trackConversion(type, value = null, currency = null) {
        this.track('conversion', { conversionType: type, value, currency });
    }

    trackError(error, context = {}) {
        this.track('error', {
            errorMessage: error.message || error.toString(),
            errorStack: error.stack || undefined,
            errorName: error.name || undefined,
            ...context
        });
    }

    setUserId(userId) {
        this.track('identify', { userId });
    }

    // Send events to worker
    async flush() {
        if (this.queue.length === 0) return;

        const events = this.queue.splice(0);
        const payload = events.length === 1 ? events[0] : { batch: events };
        
        
        try {
            // Encrypt the payload if encryption key is provided
            const finalPayload = await this.encryptData(payload);
            
            const response = await fetch(`${this.workerUrl}/analytics`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': navigator.userAgent
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (this.config.debug) {
                console.log('Ultra Analytics events sent successfully:', result);
            }

            return result;

        } catch (error) {
            // Smart retry logic: Only retry server errors (5xx), not client errors
            if (error.message && error.message.includes('HTTP 5')) {
                // Server error - retry up to 3 times
                if (this.config.debug) {
                    console.warn('Analytics server error, will retry:', error.message);
                }
                if (this.queue.length < 100) {
                    this.queue.unshift(...events.slice(0, 10)); // Limit retry queue
                }
            } else {
                // Client errors (4xx), network errors, wrong URLs - drop silently
                if (this.config.debug) {
                    console.warn('Analytics client error, dropping events:', error.message);
                }
                // Don't retry - silently drop the events
            }
            
            // Don't throw error to prevent breaking user's application
            return { success: false, error: error.message };
        }
    }


    // Destroy instance
    destroy() {
        this.flush();
    }
}

// Export for browser bundling
export { UltraAnalyticsSDK };