import { useState } from 'react';

export default function TextEditor() {
  const [content, setContent] = useState(`# Welcome to NovaOS Text Editor

This is a simple but powerful text editor.
You can write notes, code, or anything else!

## Features:
- Syntax highlighting (coming soon)
- Auto-save
- Multiple tabs
- Dark theme

function hello() {
  console.log("Hello, NovaOS!");
}

// Start typing to edit this document...
`);
  const [fileName, setFileName] = useState('untitled.txt');
  const [saved, setSaved] = useState(true);

  const handleChange = (val: string) => {
    setContent(val);
    setSaved(false);
    setTimeout(() => setSaved(true), 1000);
  };

  const lineCount = content.split('\n').length;
  const charCount = content.length;

  return (
    <div className="h-full flex flex-col text-white">
      {/* Tab bar */}
      <div className="flex items-center border-b border-white/10" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10 bg-white/5">
          <span className="text-sm">📝</span>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="bg-transparent text-sm outline-none w-32 text-white/80"
          />
          {!saved && <span className="w-2 h-2 rounded-full bg-orange-400" />}
        </div>
        <div className="flex-1" />
        <div className="px-3 text-xs text-white/40">
          {saved ? '✓ Saved' : '● Unsaved'}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="py-3 px-2 text-right text-xs text-white/20 select-none shrink-0 border-r border-white/5" style={{ background: 'rgba(0,0,0,0.15)' }}>
          {content.split('\n').map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 bg-transparent p-3 outline-none resize-none text-sm leading-6 text-white/90 font-mono"
          spellCheck={false}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/10 text-xs text-white/40" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <span>{lineCount} lines • {charCount} chars</span>
        <span>UTF-8 • Plain Text</span>
      </div>
    </div>
  );
}
