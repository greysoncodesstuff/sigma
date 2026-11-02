import { useState } from 'react';

const bookmarks = [
  { name: 'Nova Search', url: 'nova://search', icon: '🔍' },
  { name: 'Nova Mail', url: 'nova://mail', icon: '✉️' },
  { name: 'Nova News', url: 'nova://news', icon: '📰' },
  { name: 'Nova Maps', url: 'nova://maps', icon: '🗺️' },
  { name: 'Nova Music', url: 'nova://music', icon: '🎵' },
  { name: 'Nova Video', url: 'nova://video', icon: '🎬' },
  { name: 'Nova Store', url: 'nova://store', icon: '🏪' },
  { name: 'Nova Cloud', url: 'nova://cloud', icon: '☁️' },
];

export default function Browser() {
  const [url, setUrl] = useState('nova://home');
  const [loading, setLoading] = useState(false);

  const navigate = (newUrl: string) => {
    setLoading(true);
    setUrl(newUrl);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="h-full flex flex-col text-white">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-2 pt-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-white/10 text-sm max-w-48">
          <span className="truncate">Nova Home</span>
          <button className="text-white/40 hover:text-white text-xs ml-2">×</button>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 text-sm">+</button>
      </div>

      {/* URL bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <button className="p-1 rounded hover:bg-white/10 text-white/50">←</button>
        <button className="p-1 rounded hover:bg-white/10 text-white/50">→</button>
        <button className="p-1 rounded hover:bg-white/10 text-white/50">↻</button>
        <div className="flex-1 flex items-center bg-white/5 rounded-lg px-3 py-1.5">
          <span className="text-green-400 text-xs mr-2">🔒</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(url)}
            className="flex-1 bg-transparent outline-none text-sm text-white/80"
          />
        </div>
        <button className="p-1 rounded hover:bg-white/10 text-white/50">⭐</button>
      </div>

      {/* Loading bar */}
      {loading && (
        <div className="h-0.5 bg-white/5">
          <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto p-6" style={{ background: 'rgba(0,0,0,0.1)' }}>
        {url === 'nova://home' && (
          <div className="max-w-2xl mx-auto">
            {/* Search */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nova
              </div>
              <div className="flex items-center bg-white/5 rounded-full px-5 py-3 max-w-lg mx-auto border border-white/10">
                <span className="text-white/40 mr-3">🔍</span>
                <input
                  placeholder="Search the web..."
                  className="flex-1 bg-transparent outline-none text-white/80"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-4 gap-4">
              {bookmarks.map((bm) => (
                <button
                  key={bm.url}
                  onClick={() => navigate(bm.url)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <span className="text-2xl">{bm.icon}</span>
                  <span className="text-xs text-white/60">{bm.name}</span>
                </button>
              ))}
            </div>

            {/* Recent */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-white/50 mb-3">Recently Visited</h3>
              <div className="space-y-2">
                {['nova://docs/getting-started', 'nova://news/tech', 'nova://mail/inbox'].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(link)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-sm text-white/60"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {url !== 'nova://home' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <div className="text-lg text-white/60">Loading {url}...</div>
              <div className="text-sm text-white/30 mt-2">This is a simulated browser</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
