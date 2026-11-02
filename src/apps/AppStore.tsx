const storeApps = [
  { name: 'Video Editor Pro', icon: '🎬', rating: 4.8, category: 'Creative', size: '245 MB', color: '#ef4444' },
  { name: 'Code Studio', icon: '💻', rating: 4.9, category: 'Developer', size: '180 MB', color: '#3b82f6' },
  { name: 'Fitness Tracker', icon: '💪', rating: 4.5, category: 'Health', size: '85 MB', color: '#10b981' },
  { name: 'Paint Studio', icon: '🎨', rating: 4.7, category: 'Creative', size: '320 MB', color: '#f59e0b' },
  { name: 'Task Manager', icon: '✅', rating: 4.6, category: 'Productivity', size: '45 MB', color: '#8b5cf6' },
  { name: 'Music Maker', icon: '🎹', rating: 4.4, category: 'Creative', size: '512 MB', color: '#ec4899' },
  { name: 'Chat Pro', icon: '💬', rating: 4.3, category: 'Social', size: '95 MB', color: '#06b6d4' },
  { name: 'Note Sync', icon: '📋', rating: 4.7, category: 'Productivity', size: '35 MB', color: '#6366f1' },
];

export default function AppStore() {
  return (
    <div className="h-full flex flex-col text-white">
      {/* Header */}
      <div className="p-6" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(139,92,246,0.2))' }}>
        <h1 className="text-2xl font-bold mb-1">App Store</h1>
        <p className="text-white/50 text-sm">Discover amazing apps for NovaOS</p>
        <div className="mt-4 flex items-center bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <span className="text-white/40 mr-2">🔍</span>
          <input placeholder="Search apps..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-6 py-3 border-b border-white/10">
        {['All', 'Creative', 'Productivity', 'Developer', 'Health', 'Social'].map(cat => (
          <button key={cat} className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 transition-colors">
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      <div className="flex-1 overflow-auto p-6">
        <div className="text-sm font-medium text-white/60 mb-3">Featured Apps</div>
        <div className="space-y-3">
          {storeApps.map((app, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${app.color}30` }}
              >
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{app.name}</div>
                <div className="text-xs text-white/40">{app.category} • {app.size}</div>
                <div className="text-xs text-yellow-400 mt-0.5">{'★'.repeat(Math.floor(app.rating))} {app.rating}</div>
              </div>
              <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors">
                Get
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
