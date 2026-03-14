import React, { useState } from 'react';
import { Download, Copy, Check, Terminal, FileCode2, Info, Twitter, FolderSync } from 'lucide-react';
import { motion } from 'motion/react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { mainJs, manifestJson } from './pluginFiles';

export default function App() {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleDownload = async () => {
    const zip = new JSZip();
    
    // Add files to zip
    zip.file('main.js', mainJs);
    zip.file('manifest.json', manifestJson);
    
    // Generate zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Trigger download
    saveAs(content, 'x-bookmarks-sync.zip');
  };

  const copyToClipboard = (text: string, file: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(file);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-white/10 bg-zinc-900/50 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-zinc-950 to-zinc-950 -z-10"></div>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
              <Twitter className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="p-3 bg-zinc-800 rounded-2xl border border-white/10">
              <FolderSync className="w-8 h-8 text-zinc-300" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            X Bookmarks to Obsidian
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            A lightweight, ready-to-use Obsidian plugin that syncs your X (Twitter) bookmarks directly into your vault as beautifully formatted Markdown files.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-5 h-5" />
              Download Plugin (.zip)
            </button>
            <a 
              href="#installation"
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-3 rounded-xl font-medium transition-colors border border-white/5"
            >
              <Terminal className="w-5 h-5" />
              Installation Guide
            </a>
          </motion.div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Instructions */}
        <div className="lg:col-span-1 space-y-12" id="installation">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-indigo-400" />
              How to Install
            </h2>
            <ol className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-zinc-800">
              {[
                "Download the plugin .zip file using the button above.",
                "Extract the contents.",
                "Open your Obsidian vault folder.",
                "Navigate to .obsidian/plugins/ (create it if it doesn't exist).",
                "Create a new folder named x-bookmarks-sync.",
                "Move the extracted main.js and manifest.json into this new folder.",
                "Restart Obsidian and enable the plugin in Settings > Community Plugins."
              ].map((step, i) => (
                <li key={i} className="relative pl-10">
                  <span className="absolute left-0 top-1 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm font-mono text-zinc-400 z-10">
                    {i + 1}
                  </span>
                  <p className="text-zinc-300 pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-zinc-900/50 border border-emerald-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-emerald-400 mb-3">How it works (No API Key Required!)</h3>
            <ol className="list-decimal list-inside text-sm text-zinc-400 leading-relaxed space-y-2 mb-4">
              <li>Click the <strong>Twitter icon</strong> in your Obsidian ribbon.</li>
              <li>A side panel will open with X.com. Log in to your account.</li>
              <li>Navigate to your Bookmarks and <strong>scroll down</strong> to load them.</li>
              <li>Click the <strong>Extract Bookmarks</strong> button at the top of the panel.</li>
              <li>The plugin will scrape the loaded tweets and save them as Markdown files!</li>
            </ol>
          </section>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FileCode2 className="w-6 h-6 text-indigo-400" />
            Plugin Source Code
          </h2>
          
          <div className="space-y-6">
            {/* manifest.json */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-white/10">
                <span className="font-mono text-sm text-zinc-400">manifest.json</span>
                <button 
                  onClick={() => copyToClipboard(manifestJson, 'manifest')}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {copiedFile === 'manifest' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-zinc-300">
                  <code>{manifestJson}</code>
                </pre>
              </div>
            </div>

            {/* main.js */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-white/10">
                <span className="font-mono text-sm text-zinc-400">main.js</span>
                <button 
                  onClick={() => copyToClipboard(mainJs, 'main')}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {copiedFile === 'main' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
                <pre className="font-mono text-sm text-zinc-300">
                  <code>{mainJs}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
