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
      className="absolute bottom-16 left-4 w-[600px] rounded-2xl overflow-hidden z-[10000] animate-slideUp"
      style={{ 
        background: 'rgba(25, 25, 35, 0.92)', 
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-5 pb-4">
        <div className="flex items-center bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-blue-500/50 focus-within:bg-white/8 transition-all">
          <span className="text-white/40 mr-3 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search apps, files, settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-white/90 placeholder:text-white/30"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-white/40 hover:text-white/60 text-sm ml-2 w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center">✕</button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 max-h-[420px] overflow-auto">
        {search ? (
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-semibold">Results</div>
            <div className="grid grid-cols-4 gap-2">
              {filteredApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app); onClose(); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${app.color}40, ${app.color}20)` }}
                  >
                    {app.icon}
                  </div>
                  <span className="text-xs text-white/70 truncate w-full text-center font-medium">{app.name}</span>
                </button>
              ))}
            </div>
            {filteredApps.length === 0 && (
              <div className="text-center py-12 text-white/30 text-sm">No results found</div>
            )}
          </div>
        ) : (
          <>
            {/* Pinned */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Pinned</span>
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                {showAll ? 'Show less' : 'All apps →'}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {(showAll ? apps : pinnedApps).map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app); onClose(); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${app.color}40, ${app.color}20)` }}
                  >
                    {app.icon}
                  </div>
                  <span className="text-xs text-white/70 truncate w-full text-center font-medium">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Recommended */}
            {!showAll && (
              <>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-semibold">Recommended</div>
                <div className="space-y-1">
                  {recommendedApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => { onOpenApp(app); onClose(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform shadow-md"
                        style={{ background: `linear-gradient(135deg, ${app.color}40, ${app.color}20)` }}
                      >
                        {app.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-white/80 font-medium">{app.name}</div>
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
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/8" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg">
            N
          </div>
          <span className="text-sm text-white/70 font-medium">Nova User</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-sm" title="Lock">🔒</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-sm" title="Sleep">🌙</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-sm" title="Restart">🔄</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-sm" title="Power">⏻</button>
        </div>
      </div>
    </div>
  );
}
