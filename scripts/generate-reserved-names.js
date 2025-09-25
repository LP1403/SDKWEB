// scripts/generate-reserved-names.js
const fs = require('fs');
const path = require('path');

class ReservedNamesGenerator {
  constructor() {
    this.reservedNames = new Set();
    this.addBuiltInNames();
  }

  addBuiltInNames() {
    // Global objects that should never be obfuscated
    const builtIns = [
      'window', 'document', 'navigator', 'console', 'setTimeout', 'setInterval',
      'requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'Date',
      'Array', 'Object', 'String', 'Number', 'Boolean', 'Function', 'Promise',
      'Error', 'TypeError', 'ReferenceError', 'SyntaxError', 'JSON', 'Math',
      'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'encodeURIComponent',
      'decodeURIComponent', 'btoa', 'atob'
    ];

    // Web APIs
    const webAPIs = [
      'getUserMedia', 'enumerateDevices', 'mediaDevices', 'getDisplayMedia',
      'MediaRecorder', 'MediaStream', 'VideoTrack', 'AudioTrack',
      'Canvas', 'CanvasRenderingContext2D', 'WebGLRenderingContext',
      'Image', 'Blob', 'File', 'FileReader', 'URL', 'URLSearchParams',
      'fetch', 'XMLHttpRequest', 'WebSocket', 'Worker', 'ServiceWorker',
      'ResizeObserver', 'MutationObserver', 'IntersectionObserver'
    ];

    // External libraries
    const externalLibs = [
      'tf', 'JEEFACEFILTERAPI', 'JEEFACETRANSFERAPI', 'pico', 'measureBlur',
      'html2canvas', 'UAParser', 'heic2any', 'HME', 'adapter'
    ];

    [...builtIns, ...webAPIs, ...externalLibs].forEach(name => {
      this.reservedNames.add(name);
    });
  }

  analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract VU namespace patterns
    this.extractVUPatterns(content);
    
    // Extract global assignments
    this.extractGlobalAssignments(content);
    
    // Extract function exports
    this.extractExports(content);
    
    // Extract object property accesses
    this.extractPropertyAccesses(content);
  }

  extractVUPatterns(content) {
    // Match vu.* patterns
    const vuPatterns = [
      /\bvu\.[a-zA-Z][a-zA-Z0-9._]*/g,
      /\bvuIDCard\.[a-zA-Z][a-zA-Z0-9._]*/g,
      /\bvuFace\.[a-zA-Z][a-zA-Z0-9._]*/g,
      /\bwindow\.vu\.[a-zA-Z][a-zA-Z0-9._]*/g,
      /\bwindow\.vuIDCard\.[a-zA-Z][a-zA-Z0-9._]*/g,
      /\bwindow\.vuFace\.[a-zA-Z][a-zA-Z0-9._]*/g
    ];

    vuPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      matches.forEach(match => {
        // Clean up the match
        const cleaned = match.replace(/^window\./, '');
        this.reservedNames.add(cleaned);
        
        // Also add individual parts
        const parts = cleaned.split('.');
        for (let i = 1; i <= parts.length; i++) {
          this.reservedNames.add(parts.slice(0, i).join('.'));
        }
      });
    });
  }

  extractGlobalAssignments(content) {
    // Match global variable assignments
    const globalPatterns = [
      /(?:window|global)\.([a-zA-Z][a-zA-Z0-9_]*)\s*=/g,
      /(?:window|global)\[['"]([a-zA-Z][a-zA-Z0-9_]*)['"]\]\s*=/g,
      /export\s+(?:default\s+)?(?:function|class|const|let|var)\s+([a-zA-Z][a-zA-Z0-9_]*)/g
    ];

    globalPatterns.forEach(pattern => {
      const matches = [...content.matchAll(pattern)];
      matches.forEach(match => {
        this.reservedNames.add(match[1]);
      });
    });
  }

  extractExports(content) {
    // Match various export patterns
    const exportPatterns = [
      /export\s*{\s*([^}]+)\s*}/g,
      /export\s+(?:default\s+)?([a-zA-Z][a-zA-Z0-9_]*)/g,
      /module\.exports\s*=\s*([a-zA-Z][a-zA-Z0-9_]*)/g,
      /module\.exports\.([a-zA-Z][a-zA-Z0-9_]*)/g
    ];

    exportPatterns.forEach(pattern => {
      const matches = [...content.matchAll(pattern)];
      matches.forEach(match => {
        if (match[1].includes(',')) {
          // Handle export { a, b, c }
          match[1].split(',').forEach(name => {
            const cleaned = name.trim().replace(/\s+as\s+.*/, '');
            if (cleaned && /^[a-zA-Z]/.test(cleaned)) {
              this.reservedNames.add(cleaned);
            }
          });
        } else {
          this.reservedNames.add(match[1]);
        }
      });
    });
  }

  extractPropertyAccesses(content) {
    // Extract function calls and property accesses that look like APIs
    const apiPatterns = [
      /\.([a-zA-Z][a-zA-Z0-9_]*)\s*\(/g,  // method calls
      /\.([a-zA-Z][a-zA-Z0-9_]*)\s*=/g,   // property assignments
      /\.([a-zA-Z][a-zA-Z0-9_]*)\b/g      // property access
    ];

    apiPatterns.forEach(pattern => {
      const matches = [...content.matchAll(pattern)];
      matches.forEach(match => {
        const name = match[1];
        // Only include if it looks like a public API
        if (name.length > 2 && !name.startsWith('_') && !/^[0-9]/.test(name)) {
          this.reservedNames.add(name);
        }
      });
    });
  }

  analyzeCodebase(basePath) {
    // Automatically scan all JS files in onboarding/js/
    const jsDirectory = path.join(basePath, 'onboarding/js');
    
    if (!fs.existsSync(jsDirectory)) {
      console.error(`Directory not found: ${jsDirectory}`);
      return;
    }

    const allJSFiles = this.getAllJSFiles(jsDirectory);
    
    console.log(`Found ${allJSFiles.length} JavaScript files to analyze:`);
    allJSFiles.forEach(file => {
      const relativePath = path.relative(basePath, file);
      console.log(`  - ${relativePath}`);
    });
    
    console.log('\nAnalyzing files...');
    allJSFiles.forEach(file => {
      const relativePath = path.relative(basePath, file);
      console.log(`Analyzing: ${relativePath}`);
      this.analyzeFile(file);
    });
  }

  getAllJSFiles(directory) {
    let jsFiles = [];
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and other irrelevant directories
          if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
            scanDirectory(fullPath);
          }
        } else if (item.endsWith('.js') && !item.endsWith('.min.js')) {
          jsFiles.push(fullPath);
        }
      });
    };
    
    scanDirectory(directory);
    return jsFiles.sort();
  }

  generateReservedNames() {
    // Convert Set to sorted array
    const sortedNames = Array.from(this.reservedNames).sort();
    
    // Group by category for better organization
    const categorized = {
      globals: sortedNames.filter(name => !name.includes('.')),
      vuNamespace: sortedNames.filter(name => name.startsWith('vu.') && !name.startsWith('vuIDCard') && !name.startsWith('vuFace')),
      vuIDCard: sortedNames.filter(name => name.startsWith('vuIDCard')),
      vuFace: sortedNames.filter(name => name.startsWith('vuFace')),
      apis: sortedNames.filter(name => name.includes('api') || name.includes('Api')),
      other: sortedNames.filter(name => 
        name.includes('.') && 
        !name.startsWith('vu.') && 
        !name.startsWith('vuIDCard') && 
        !name.startsWith('vuFace') &&
        !name.includes('api') && 
        !name.includes('Api')
      )
    };

    return {
      all: sortedNames,
      categorized: categorized
    };
  }

  saveToFile(outputPath) {
    const result = this.generateReservedNames();
    
    // Create the JSON file
    const jsonContent = JSON.stringify(result.all, null, 2);
    fs.writeFileSync(outputPath, jsonContent);
    
    // Create a detailed breakdown file
    const breakdownPath = outputPath.replace('.json', '-breakdown.json');
    const breakdownContent = JSON.stringify(result.categorized, null, 2);
    fs.writeFileSync(breakdownPath, breakdownContent);
    
    console.log(`\nGenerated ${result.all.length} reserved names`);
    console.log(`Saved to: ${outputPath}`);
    console.log(`Breakdown saved to: ${breakdownPath}`);
    
    // Print summary
    console.log('\nSummary:');
    Object.entries(result.categorized).forEach(([category, names]) => {
      console.log(`  ${category}: ${names.length} names`);
    });
  }
}

// Usage
function main() {
  const generator = new ReservedNamesGenerator();
  const basePath = process.cwd();
  
  console.log('Analyzing codebase for reserved names...');
  generator.analyzeCodebase(basePath);
  
  const outputPath = path.join(basePath, 'rollup.reserved-names.json');
  generator.saveToFile(outputPath);
  
  console.log('\nDone! Review the generated files and adjust as needed.');
}

if (require.main === module) {
  main();
}

module.exports = ReservedNamesGenerator;