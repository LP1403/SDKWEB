import path from 'path';
import { fileURLToPath } from 'url';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import alias from '@rollup/plugin-alias';
import eslint from '@rollup/plugin-eslint';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version, description } = require('./package.json');
import replace from '@rollup/plugin-replace';
import obfuscator from 'rollup-plugin-obfuscator';
import { readFileSync } from 'fs';
const reservedNames = JSON.parse(readFileSync('./rollup.reserved-names-breakdown.json', 'utf8'));

// Add this after your imports, before the bannerContent
function vuSecurityPlugin() {
  return {
    name: 'vu-security',
    transform(code, id) {
      // Only protect VU files in production
      if (!id.includes('vu.') || isDebug) {
        return null;
      }

      // Very minimal protection - just log tampering attempts
      const protection = `
// VU Security Monitor
(function() {
  if (typeof console !== 'undefined') {
    const originalLog = console.log;
    console.log = function(...args) {
      const msg = args.join(' ');
      if (msg.includes('selectedDeviceId') || msg.includes('vu.camera')) {
        console.warn('[VU Security] Camera access detected');
      }
      return originalLog.apply(console, args);
    };
  }
})();
      `;

      return { code: protection + code, map: null };
    }
  };
}

const bannerContent = `
/*!
 * vu-om-websdk - v${version}
 * ${description}
 * (c) ${new Date().getFullYear()} VU Inc.
 * This project is licensed under a commercial license by VU Inc. 
 * All rights reserved. Unauthorized copying, distribution, modification, or use of this software is strictly prohibited. 
 * For licensing inquiries, please contact VU Inc.
 * https://www.vusecurity.com
 */
`.trim();

const isDebug = process.env.DEBUG_ALLOW_VIRTUAL === 'true';

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customAliases = alias({
  entries: [
    { find: 'vu.camera', replacement: path.resolve(__dirname, 'onboarding/js/vu.camera.js') },
    { find: 'vu.error', replacement: path.resolve(__dirname, 'onboarding/js/vu.error.js') },
    { find: 'vu.extras', replacement: path.resolve(__dirname, 'onboarding/js/vu.extras.js') },
    { find: 'vu.face.auth', replacement: path.resolve(__dirname, 'onboarding/js/vu.face.auth.js') },
    { find: 'vu.face.ui', replacement: path.resolve(__dirname, 'onboarding/js/vu.face.ui.js') },
    { find: 'vu.image', replacement: path.resolve(__dirname, 'onboarding/js/vu.image.js') },
    { find: 'vu.screen.capture', replacement: path.resolve(__dirname, 'onboarding/js/vu.screen.capture.js') },
    { find: 'vu.sop.audio', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.audio.js') },
    { find: 'vu.sop.barcode', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.barcode.js') },
    { find: 'vu.sop.document.objectDetection', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.document.objectDetection.js') },
    { find: 'vu.sop.document.ui', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.document.ui.js') },
    { find: 'vu.sop.documentCodes', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.documentCodes.js') },
    { find: 'vu.sop.face.model.directionsAndGestures', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.face.model.directionsAndGestures.js') },
    { find: 'vu.sop.face.objectDetectionAndRotation', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.face.objectDetectionAndRotation.js') },
    { find: 'vu.sop.ui', replacement: path.resolve(__dirname, 'onboarding/js/vu.sop.ui.js') },
    { find: 'vu.telemetry', replacement: path.resolve(__dirname, 'onboarding/js/vu.telemetry.js') },
    { find: 'vu.stats', replacement: path.resolve(__dirname, 'onboarding/js/vu.stats.js') },
  ],
});

export default [
  // Configuration for vu.sop.js
  {
    input: path.resolve(__dirname, 'onboarding/js/vu.sop.js'),
    output: [
      {
        file: 'dist/vu-idcard.umd.js',
        format: 'umd',
        name: 'vuIDCard', // Global variable name for UMD
        globals: {
          vu: 'vu', // External global variables for UMD
        },
        sourcemap: false
      },
      {
        file: 'dist/vu-idcard.es.js',
        format: 'es', // ES module format
        sourcemap: false
      },
    ],
    external: [
      // External dependencies
      'onboarding/js/vu.sop.d.ts',
      // 'onboarding/js/vu.face.gestures.js',
      // 'onboarding/js/vu.face.ui.gestures.js',
      'onboarding/js/vu.face.mixedChallenge.js',
      'onboarding/js/vu.face.ui.mixedChallenge.js',
      'onboarding/js/vu.face.orientation.js',
      'onboarding/js/vu.face.ui.js',
      'onboarding/js/vu.sop.api.js',
      'onboarding/js/vu.sop.logApi.js',
      'onboarding/js/vu.sop.msg.es.js',
      'onboarding/js/vu.sop.msg.en.js',
      'onboarding/js/vu.sop.msg.pt.js',
      'onboarding/js/vu.sop.audio.es.js',
      'onboarding/js/vu.sop.audioEsPreLoad.js',
      'onboarding/js/vu.sop.audio.en.js',
      'onboarding/js/vu.sop.audioEnPreLoad.js',
      'onboarding/js/vu.sop.audio.pt.js',
      'onboarding/js/vu.sop.audioPtPreLoad.js',
      'onboarding/js/libs/face/*.json',
      'onboarding/js/libs/face/*.js',
      'onboarding/js/libs/h264-mp4-encoder/h264-mp4-encoder.web.js',
      'onboarding/js/libs/heic2any/heic2any.min.js',
      'onboarding/js/libs/html2canvas/html2canvas.min.js',
      'onboarding/js/libs/inspector-bokeh/dist/*.js',
      'onboarding/js/libs/pico/**',
      'onboarding/js/libs/tensorflowjs/4.22.0/*.js',
      'onboarding/js/libs/tensorflowjs/4.22.0/*.wasm',
      'onboarding/js/libs/ua-parser-js/ua-parser.js',
      'onboarding/js/libs/webrtc/adapter-latest.js',
      'onboarding/js/libs/zxing-wasm/index.js',
      'onboarding/js/libs/zxing-wasm/zxing_reader.wasm',
      'onboarding/html/**/*.html',
      'onboarding/css/**/*.css',
      'onboarding/js/models/document/**',
      'onboarding/js/models/face-directions-gestures/**',
      'onboarding/js/models/face-location-and-rotation/**'
    ],
    plugins: [
      resolve(),
      commonjs(),
      //vuSecurityPlugin(),
      !isDebug && terser({
        format: {
          preamble: bannerContent,
          comments: false,
        },
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3,
        },
        mangle: false, // Disable mangling - let obfuscator handle this
        keep_fnames: true,
        keep_classnames: true,
      }),
      !isDebug && obfuscator({
        compact: true,
        stringArray: true,
        selfDefending: true,
        reservedNames: reservedNames || []
      }),
      // terser(isDebug ? {} :
      //   {
      //     format: {
      //       preamble: bannerContent,
      //       comments: false, // Remove comments
      //     },
      //     compress: {
      //       drop_console: true,  // Remove all console.* functions
      //       drop_debugger: true, // Remove debugger statements
      //       passes: 3            // Apply multiple passes for better compression
      //     },
      //     mangle: true,
      //     keep_fnames: true,     // Ensure function names are kept
      //     keep_classnames: true  // Ensure class names are kept
      //   }
      // ), // Optional: Minify the output
      // !isDebug && terser({
      //   format: {
      //     preamble: bannerContent,
      //     comments: false,
      //   },
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //     passes: 3,
      //   },
      //   mangle: true,
      //   keep_fnames: true,
      //   keep_classnames: true,
      // }),
      customAliases,
      visualizer({
        open: false, // Prevents automatically opening the report
        filename: 'bundle-analysis-vu-idcard.html', // Analysis file for vu.sop
      }),
      eslint({
        throwOnError: false, // Fail the build if there's an error
        include: ['onboarding/js/**/*.js'], // Lint only specific files
        exclude: ['node_modules/**', 'dist/**'], // Exclude specific folders
        overrideConfigFile: path.resolve(__dirname, '.eslintrc.cjs'),
      }),
      replace({
        preventAssignment: true,
        __DEBUG_ALLOW_VIRTUAL__: JSON.stringify(process.env.DEBUG_ALLOW_VIRTUAL || 'false'),
      }),
      copy({
        targets: [
          {
            src: 'onboarding/js/vu.sop.d.ts',
            dest: 'dist',
          },
          // {
          //   src: 'onboarding/js/vu.face.gestures.js',
          //   dest: 'dist'
          // },
          // {
          //   src: 'onboarding/js/vu.face.ui.gestures.js',
          //   dest: 'dist'
          // },
          {
            src: 'onboarding/js/vu.face.mixedChallenge.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.ui.mixedChallenge.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.orientation.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.ui.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.api.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.logApi.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.msg.es.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.msg.en.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audio.es.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audioEsPreLoad.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audio.en.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audioEnPreLoad.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/libs/face/*.json',
            dest: 'dist/libs/face'
          },
          {
            src: 'onboarding/js/libs/face/*.js',
            dest: 'dist/libs/face'
          },
          {
            src: 'onboarding/js/libs/h264-mp4-encoder/h264-mp4-encoder.web.js',
            dest: 'dist/libs/h264-mp4-encoder'
          },
          {
            src: 'onboarding/js/libs/heic2any/heic2any.min.js',
            dest: 'dist/libs/heic2any'
          },
          {
            src: 'onboarding/js/libs/html2canvas/html2canvas.min.js',
            dest: 'dist/libs/html2canvas'
          },
          {
            src: 'onboarding/js/libs/inspector-bokeh/dist/*.js',
            dest: 'dist/libs/inspector-bokeh/dist'
          },
          {
            src: 'onboarding/js/libs/pico/**',
            dest: 'dist/libs/pico'
          },
          {
            src: 'onboarding/js/libs/tensorflowjs/4.22.0/*.js',
            dest: 'dist/libs/tensorflowjs/4.22.0'
          },
          {
            src: 'onboarding/js/libs/tensorflowjs/4.22.0/*.wasm',
            dest: 'dist/libs/tensorflowjs/4.22.0'
          },
          {
            src: 'onboarding/js/libs/ua-parser-js/ua-parser.js',
            dest: 'dist/libs/ua-parser-js'
          },
          {
            src: 'onboarding/js/libs/webrtc/adapter-latest.js',
            dest: 'dist/libs/webrtc'
          },
          {
            src: 'onboarding/js/libs/zxing-wasm/index.js',
            dest: 'dist/libs/zxing-wasm'
          },
          {
            src: 'onboarding/js/libs/zxing-wasm/zxing_reader.wasm',
            dest: 'dist/libs/zxing-wasm'
          },
          {
            src: 'onboarding/html/**/*.html',
            dest: 'dist/html',
          },
          {
            src: 'onboarding/css/**/*.css',
            dest: 'dist/css',
          },
          {
            src: 'onboarding/js/models/document/**',
            dest: 'dist/models/document'
          },
          {
            src: 'onboarding/js/models/face-directions-gestures/**',
            dest: 'dist/models/face-directions-gestures'
          },
          {
            src: 'onboarding/js/models/face-location-and-rotation/**',
            dest: 'dist/models/face-location-and-rotation'
          },
          {
            src: 'scripts/copy-files.js',
            dest: 'dist/scripts'
          },
        ],
      }),
    ],
  },
  // Configuration for vu.face.auth.js
  {
    input: path.resolve(__dirname, 'onboarding/js/vu.face.auth.js'),
    output: [
      {
        file: 'dist/vu-face.umd.js',
        format: 'umd',
        name: 'vuFace', // Global variable name for UMD
        globals: {
          vu: 'vu', // External global variables for UMD
        },
        sourcemap: false
      },
      {
        file: 'dist/vu-face.es.js',
        format: 'es', // ES module format
        sourcemap: false
      },
    ],
    external: [
      // External dependencies
      'onboarding/js/vu.sop.d.ts',
      // 'onboarding/js/vu.face.gestures.js',
      // 'onboarding/js/vu.face.ui.gestures.js',
      'onboarding/js/vu.face.mixedChallenge.js',
      'onboarding/js/vu.face.ui.mixedChallenge.js',
      'onboarding/js/vu.face.orientation.js',
      'onboarding/js/vu.face.ui.js',
      'onboarding/js/vu.face.auth.api.js',
      'onboarding/js/vu.sop.api.js',
      'onboarding/js/vu.sop.logApi.js',
      'onboarding/js/vu.sop.msg.es.js',
      'onboarding/js/vu.sop.msg.en.js',
      'onboarding/js/vu.sop.audio.es.js',
      'onboarding/js/vu.sop.audioEsPreLoad.js',
      'onboarding/js/vu.sop.audio.en.js',
      'onboarding/js/vu.sop.audioEnPreLoad.js',
      'onboarding/js/libs/face/*.json',
      'onboarding/js/libs/face/*.js',
      'onboarding/js/libs/h264-mp4-encoder/h264-mp4-encoder.web.js',
      'onboarding/js/libs/heic2any/heic2any.min.js',
      'onboarding/js/libs/html2canvas/html2canvas.min.js',
      'onboarding/js/libs/inspector-bokeh/dist/*.js',
      'onboarding/js/libs/pico/**',
      'onboarding/js/libs/tensorflowjs/4.22.0/*.js',
      'onboarding/js/libs/tensorflowjs/4.22.0/*.wasm',
      'onboarding/js/libs/ua-parser-js/ua-parser.js',
      'onboarding/js/libs/webrtc/adapter-latest.js',
      'onboarding/js/libs/zxing-wasm/index.js',
      'onboarding/js/libs/zxing-wasm/zxing_reader.wasm',
      'onboarding/html/**/*.html',
      'onboarding/css/**/*.css',
      'onboarding/js/models/document/**',
      'onboarding/js/models/face-directions-gestures/**',
      'onboarding/js/models/face-location-and-rotation/**'
    ],
    plugins: [
      resolve(),
      commonjs(),
      //vuSecurityPlugin(),
      !isDebug && terser({
        format: {
          preamble: bannerContent,
          comments: false,
        },
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3,
        },
        mangle: false, // Disable mangling - let obfuscator handle this
        keep_fnames: true,
        keep_classnames: true,
      }),
      !isDebug && obfuscator({
        compact: true,
        stringArray: true,
        selfDefending: true,
        reservedNames: reservedNames || []
      }),
      // terser(isDebug ? {} :
      //   {
      //     format: {
      //       comments: false, // Remove comments
      //       preamble: bannerContent,
      //     },
      //     compress: {
      //       drop_console: true,  // Remove all console.* functions
      //       drop_debugger: true, // Remove debugger statements
      //       passes: 3            // Apply multiple passes for better compression
      //     },
      //     mangle: true,
      //     keep_fnames: true,     // Ensure function names are kept
      //     keep_classnames: true  // Ensure class names are kept
      //   }
      // ), // Optional: Minify the output
      // !isDebug && terser({
      //   format: {
      //     preamble: bannerContent,
      //     comments: false,
      //   },
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //     passes: 3,
      //   },
      //   mangle: true,
      //   keep_fnames: true,
      //   keep_classnames: true,
      // }),
      customAliases,
      visualizer({
        open: false, // Prevents automatically opening the report
        filename: 'bundle-analysis-vu-face.html', // Analysis file for vu.face.auth
      }),
      eslint({
        throwOnError: false, // Fail the build if there's an error
        include: ['onboarding/js/**/*.js'], // Lint only specific files
        exclude: ['node_modules/**', 'dist/**'], // Exclude specific folders
        overrideConfigFile: path.resolve(__dirname, '.eslintrc.cjs'),
      }),
      replace({
        preventAssignment: true,
        __DEBUG_ALLOW_VIRTUAL__: JSON.stringify(process.env.DEBUG_ALLOW_VIRTUAL || 'false'),
      }),
      copy({
        targets: [
          {
            src: 'onboarding/js/vu.sop.d.ts',
            dest: 'dist',
          },
          // {
          //   src: 'onboarding/js/vu.face.gestures.js',
          //   dest: 'dist'
          // },
          // {
          //   src: 'onboarding/js/vu.face.ui.gestures.js',
          //   dest: 'dist'
          // },
          {
            src: 'onboarding/js/vu.face.mixedChallenge.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.ui.mixedChallenge.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.orientation.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.ui.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.face.auth.api.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.api.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.logApi.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.msg.es.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.msg.en.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.msg.pt.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audio.es.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audioEsPreLoad.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audio.en.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audioEnPreLoad.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audio.pt.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/vu.sop.audioPtPreLoad.js',
            dest: 'dist'
          },
          {
            src: 'onboarding/js/libs/face/*.json',
            dest: 'dist/libs/face'
          },
          {
            src: 'onboarding/js/libs/face/*.js',
            dest: 'dist/libs/face'
          },
          {
            src: 'onboarding/js/libs/h264-mp4-encoder/h264-mp4-encoder.web.js',
            dest: 'dist/libs/h264-mp4-encoder'
          },
          {
            src: 'onboarding/js/libs/heic2any/heic2any.min.js',
            dest: 'dist/libs/heic2any'
          },
          {
            src: 'onboarding/js/libs/html2canvas/html2canvas.min.js',
            dest: 'dist/libs/html2canvas'
          },
          {
            src: 'onboarding/js/libs/inspector-bokeh/dist/*.js',
            dest: 'dist/libs/inspector-bokeh/dist'
          },
          {
            src: 'onboarding/js/libs/pico/**',
            dest: 'dist/libs/pico'
          },
          {
            src: 'onboarding/js/libs/tensorflowjs/4.22.0/*.js',
            dest: 'dist/libs/tensorflowjs/4.22.0'
          },
          {
            src: 'onboarding/js/libs/tensorflowjs/4.22.0/*.wasm',
            dest: 'dist/libs/tensorflowjs/4.22.0'
          },
          {
            src: 'onboarding/js/libs/ua-parser-js/ua-parser.js',
            dest: 'dist/libs/ua-parser-js'
          },
          {
            src: 'onboarding/js/libs/webrtc/adapter-latest.js',
            dest: 'dist/libs/webrtc'
          },
          {
            src: 'onboarding/js/libs/zxing-wasm/index.js',
            dest: 'dist/libs/zxing-wasm'
          },
          {
            src: 'onboarding/js/libs/zxing-wasm/zxing_reader.wasm',
            dest: 'dist/libs/zxing-wasm'
          },
          {
            src: 'onboarding/html/**/*.html',
            dest: 'dist/html',
          },
          {
            src: 'onboarding/css/**/*.css',
            dest: 'dist/css',
          },
          {
            src: 'onboarding/js/models/document/**',
            dest: 'dist/models/document'
          },
          {
            src: 'onboarding/js/models/face-directions-gestures/**',
            dest: 'dist/models/face-directions-gestures'
          },
          {
            src: 'onboarding/js/models/face-location-and-rotation/**',
            dest: 'dist/models/face-location-and-rotation'
          },
          {
            src: 'scripts/copy-files.js',
            dest: 'dist/scripts'
          },
        ],
      }),
    ],
  },
];
