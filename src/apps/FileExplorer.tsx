import { useState } from 'react';

const fileSystem = {
  'Documents': {
    type: 'folder',
    children: {
      'Resume.pdf': { type: 'file', icon: '📄', size: '2.4 MB' },
      'Notes.txt': { type: 'file', icon: '📝', size: '12 KB' },
      'Budget.xlsx': { type: 'file', icon: '📊', size: '156 KB' },
      'Project Plan.docx': { type: 'file', icon: '📄', size: '89 KB' },
    }
  },
  'Pictures': {
    type: 'folder',
    children: {
      'Vacation': { type: 'folder', children: { 'beach.jpg': { type: 'file', icon: '🖼️', size: '4.2 MB' }, 'sunset.jpg': { type: 'file', icon: '🖼️', size: '3.8 MB' } } },
      'Screenshots': { type: 'folder', children: { 'screen1.png': { type: 'file', icon: '🖼️', size: '1.1 MB' } } },
      'wallpaper.png': { type: 'file', icon: '🖼️', size: '5.6 MB' },
      'profile.jpg': { type: 'file', icon: '🖼️', size: '2.1 MB' },
    }
  },
  'Music': {
    type: 'folder',
    children: {
      'playlist.m3u': { type: 'file', icon: '🎵', size: '2 KB' },
      'song1.mp3': { type: 'file', icon: '🎵', size: '8.4 MB' },
      'song2.mp3': { type: 'file', icon: '🎵', size: '6.2 MB' },
      'album_art.jpg': { type: 'file', icon: '🖼️', size: '1.8 MB' },
    }
  },
  'Downloads': {
    type: 'folder',
    children: {
      'setup.exe': { type: 'file', icon: '⚙️', size: '45 MB' },
      'archive.zip': { type: 'file', icon: '📦', size: '120 MB' },
      'report.pdf': { type: 'file', icon: '📄', size: '3.2 MB' },
    }
  },
  'Desktop': {
    type: 'folder',
    children: {
      'shortcut.app': { type: 'file', icon: '🔗', size: '1 KB' },
    }
  },
};

type FileEntry = { type: 'folder'; children: Record<string, FileEntry> } | { type: 'file'; icon: string; size: string };

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const getCurrentFolder = (): Record<string, FileEntry> => {
    let current: any = fileSystem;
    for (const segment of currentPath) {
      const entry = current[segment];
      if (entry && entry.type === 'folder') {
        current = entry.children;
      }
    }
    return current;
  };

  const entries = getCurrentFolder();

  const navigateTo = (name: string) => {
    const entry = entries[name];
    if (entry && entry.type === 'folder') {
      setCurrentPath([...currentPath, name]);
      setSelected(null);
    }
  };

  const goBack = () => {
    setCurrentPath(prev => prev.slice(0, -1));
    setSelected(null);
  };

  return (
    <div className="flex h-full text-white/90">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/10 p-3 shrink-0" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="text-xs text-white/40 uppercase tracking-wider mb-2 px-2">Favorites</div>
        {Object.keys(fileSystem).map(name => (
          <button
            key={name}
            onClick={() => { setCurrentPath([name]); setSelected(null); }}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              currentPath[0] === name ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'
            }`}
          >
            <span>📁</span> {name}
          </button>
        ))}
        <div className="text-xs text-white/40 uppercase tracking-wider mt-4 mb-2 px-2">Storage</div>
        <div className="px-2">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>Used</span><span>245 GB / 512 GB</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.15)' }}>
          <button
            onClick={goBack}
            disabled={currentPath.length === 0}
            className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 transition-colors"
          >
            ←
          </button>
          <div className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-sm text-white/60">
            / {currentPath.join(' / ')}
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(entries).map(([name, entry]) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                onDoubleClick={() => navigateTo(name)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  selected === name ? 'bg-blue-500/20 ring-1 ring-blue-500/50' : 'hover:bg-white/5'
                }`}
              >
                <span className="text-3xl mb-1">
                  {entry.type === 'folder' ? '📁' : (entry as any).icon}
                </span>
                <span className="text-xs text-center truncate w-full">{name}</span>
                {entry.type === 'file' && (
                  <span className="text-[10px] text-white/40">{(entry as any).size}</span>
                )}
              </button>
            ))}
          </div>
          {Object.keys(entries).length === 0 && (
            <div className="flex items-center justify-center h-full text-white/30">
              This folder is empty
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="px-4 py-1.5 border-t border-white/10 text-xs text-white/40" style={{ background: 'rgba(0,0,0,0.15)' }}>
          {Object.keys(entries).length} items {selected && `• ${selected} selected`}
        </div>
      </div>
    </div>
  );
}
