const fs = require('fs');
const path = require('path');

const mainJs = fs.readFileSync('obsidian-plugin/main.js', 'utf8');
const manifestJson = fs.readFileSync('obsidian-plugin/manifest.json', 'utf8');

const escapedManifest = manifestJson.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$');
const escapedMainJs = mainJs.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$');

const content = `export const manifestJson = \`${escapedManifest}\`;\n\nexport const mainJs = \`${escapedMainJs}\`;\n`;

fs.writeFileSync('src/pluginFiles.ts', content);

// Export to a folder
const exportDir = 'dist-plugin';
if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
}
fs.writeFileSync(path.join(exportDir, 'main.js'), mainJs);
fs.writeFileSync(path.join(exportDir, 'manifest.json'), manifestJson);

console.log('Done! Exported to dist-plugin folder.');
