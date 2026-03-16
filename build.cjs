const fs = require('fs');
const path = require('path');

const mainJs = fs.readFileSync('obsidian-plugin/main.js', 'utf8');
// Use root manifest.json as the canonical source
const manifestJson = fs.readFileSync('manifest.json', 'utf8');

const escapedManifest = manifestJson.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$');
const escapedMainJs = mainJs.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$');

const content = `export const manifestJson = \`${escapedManifest}\`;\n\nexport const mainJs = \`${escapedMainJs}\`;\n`;

fs.writeFileSync('src/pluginFiles.ts', content);

// Copy main.js to root for GitHub Releases
fs.writeFileSync('main.js', mainJs);

// Export to dist-plugin folder for local vault testing
const exportDir = 'dist-plugin';
if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
}
fs.writeFileSync(path.join(exportDir, 'main.js'), mainJs);
fs.writeFileSync(path.join(exportDir, 'manifest.json'), manifestJson);

console.log('Done! Exported to root and dist-plugin folder.');
