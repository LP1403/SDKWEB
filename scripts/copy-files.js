const fs = require('fs');
const path = require('path');

// Function to delete all files and subdirectories in a directory
function clearDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const currentPath = path.join(dir, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursively delete directories
        clearDirectory(currentPath);
        fs.rmdirSync(currentPath);
      } else {
        // Delete files
        fs.unlinkSync(currentPath);
      }
    });
  }
}

// Function to copy files recursively
function copyFilesRecursive(src, dest, fileExtension = null) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyFilesRecursive(srcFile, destFile, fileExtension);
    } else {
      // If fileExtension is specified, only copy files with that extension
      if (fileExtension) {
        if (file.endsWith(fileExtension)) {
          fs.copyFileSync(srcFile, destFile);
        }
      } else {
        fs.copyFileSync(srcFile, destFile);
      }
    }
  });
}

// Clear existing directories
let destDir = path.join(process.cwd(), '..', '..', '..', 'public', 'static', 'vu-om-websdk');
clearDirectory(destDir);

// Copy libraries
destDir = path.join(process.cwd(), '..', '..', '..', 'public', 'static', 'vu-om-websdk', 'libs');
let sourceDir = path.join('dist/libs');
copyFilesRecursive(sourceDir, destDir);

// Copy models
destDir = path.join(process.cwd(), '..', '..', '..', 'public', 'static', 'vu-om-websdk', 'models');
sourceDir = path.join('dist/models');
copyFilesRecursive(sourceDir, destDir);

// Copy HTML
destDir = path.join(process.cwd(), '..', '..', '..', 'public', 'static', 'vu-om-websdk', 'html');
sourceDir = path.join('dist/html');
copyFilesRecursive(sourceDir, destDir);

// Copy CSS
destDir = path.join(process.cwd(), '..', '..', '..', 'public', 'static', 'vu-om-websdk', 'css');
sourceDir = path.join('dist/css');
copyFilesRecursive(sourceDir, destDir);

// Copy JS files from /dist to the root of /vu-om-websdk
destDir = path.join(process.cwd(), '..', '..', '..', 'public', 'static', 'vu-om-websdk');
sourceDir = path.join('dist');
copyFilesRecursive(sourceDir, destDir, '.js');  // Only copy .js files from /dist

console.log('Files copied successfully!');
