/**
 * Build script - Copies web files to www folder for Capacitor
 */
const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

// Files and folders to copy
const toCopy = [
    'index.html',
    'css',
    'js',
    'assets'
];

// Create www folder if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('Building to www folder...');

toCopy.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    
    if (fs.existsSync(srcPath)) {
        console.log(`  Copying ${item}...`);
        copyRecursive(srcPath, destPath);
    } else {
        console.log(`  Skipping ${item} (not found)`);
    }
});

console.log('Done! Now run: npx cap sync');
