const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const reservedNames = require('../rollup.reserved-names.json');

const isDebug = process.env.DEBUG_ALLOW_VIRTUAL === 'true';

// Paths to your external files and directories
const externalPaths = [
  'dist/vu.sop.d.ts',
  // 'dist/vu.face.gestures.js',
  // 'dist/vu.face.ui.gestures.js',
  'dist/vu.face.mixedChallenge.js',
  'dist/vu.face.ui.mixedChallenge.js',
  'dist/vu.face.orientation.js',
  'dist/vu.face.ui.js',
  'dist/vu.face.auth.api.js',
  'dist/vu.sop.api.js',
  'dist/vu.sop.logApi.js',
  'dist/vu.sop.msg.es.js',
  'dist/vu.sop.msg.en.js',
  'dist/vu.sop.msg.pt.js',
  'dist/vu.sop.audio.es.js',
  'dist/vu.sop.audioEsPreLoad.js',
  'dist/vu.sop.audio.en.js',
  'dist/vu.sop.audioEnPreLoad.js',
  'dist/vu.sop.audio.pt.js',
  'dist/vu.sop.audioPtPreLoad.js',  
  'dist/libs/face',
  'dist/libs/h264-mp4-encoder',
  'dist/libs/heic2any',
  'dist/libs/html2canvas',
  'dist/libs/inspector-bokeh/dist',
  'dist/libs/pico',
  'dist/libs/tensorflowjs/4.22.0',
  'dist/libs/ua-parser-js',
  'dist/libs/webrtc',
  'dist/libs/zxing-wasm',
  'dist/models/document',
  'dist/models/face-directions-gestures',
  'dist/models/face-location-and-rotation'
];

async function minifyFile(filePath) {
  if (isDebug) {
    console.log(`Skipped minification for ${filePath}`);
    return;
  }

  const code = await readFile(filePath, 'utf8');
  const result = await minify(code, {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
    mangle: true,
    keep_fnames: true,
    keep_classnames: true,
  });

  await writeFile(filePath, result.code, 'utf8');
  console.log(`Minified ${filePath}`);
}


async function minifyDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await minifyDirectory(filePath); // Recursively minify subdirectories
    } else if (filePath.endsWith('.js')) {
      await minifyFile(filePath);
    }
  }
}

async function run() {
  for (const filePath of externalPaths) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await minifyDirectory(filePath);
    } else if (filePath.endsWith('.js')) {
      await minifyFile(filePath);
    }
  }
  console.log('External files minification complete.');
}

run().catch((error) => {
  console.error('Error during external files minification:', error);
  process.exit(1);
});
