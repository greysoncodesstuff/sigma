import { useState } from 'react';
import { AppDefinition } from '../types';

interface StartMenuProps {
  apps: AppDefinition[];
  onOpenApp: (app: AppDefinition) => void;
  onClose: () => void;
}

export default function StartMenu({ apps, onOpenApp, onClose }: StartMenuProps) {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedApps = apps.slice(0, 8);
  const recommendedApps = apps.slice(4, 8);

  return (
    <div
      className="absolute bottom-14 left-4 w-[580px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-[10000] animate-scaleIn"
      style={{ background: 'rgba(20, 20, 35, 0.95)', backdropFilter: 'blur(30px)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-4 pb-3">
        <div className="flex items-center bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
          <span className="text-white/40 mr-3">🔍</span>
          <input
            type="text"
            placeholder="Search apps, files, settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-white/90 placeholder:text-white/30"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-white/40 hover:text-white/60 text-sm">✕</button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 max-h-[400px] overflow-auto">
        {search ? (
          // Search results
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Results</div>
            <div className="grid grid-cols-4 gap-2">
              {filteredApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app); onClose(); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${app.color}25` }}
                  >
                    {app.icon}
                  </div>
                  <span className="text-xs text-white/70 truncate w-full text-center">{app.name}</span>
                </button>
              ))}
            </div>
            {filteredApps.length === 0 && (
              <div className="text-center py-8 text-white/30 text-sm">No results found</div>
            )}
          </div>
        ) : (
          <>
            {/* Pinned */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/40 uppercase tracking-wider">Pinned</span>
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                {showAll ? 'Less' : 'All apps'} →
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {(showAll ? apps : pinnedApps).map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app); onClose(); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                    style={{ background: `${app.color}25` }}
                  >
                    {app.icon}
                  </div>
                  <span className="text-xs text-white/70 truncate w-full text-center">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Recommended */}
            {!showAll && (
              <>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Recommended</div>
                <div className="space-y-1">
                  {recommendedApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => { onOpenApp(app); onClose(); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className="text-lg">{app.icon}</span>
                      <div className="text-left">
                        <div className="text-sm text-white/80">{app.name}</div>
                        <div className="text-xs text-white/40">Recently used</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs">
            N
          </div>
          <span className="text-sm text-white/70">Nova User</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-sm" title="Lock">🔒</button>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-sm" title="Sleep">🌙</button>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-sm" title="Restart">🔄</button>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-sm" title="Power">⏻</button>
        </div>
      </div>
    </div>
  );
}
