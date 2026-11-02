import { useState, useCallback, useEffect } from 'react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import LockScreen from './components/LockScreen';
import NotificationPanel from './components/NotificationPanel';
import { useWindowManager, apps } from './hooks/useWindowManager';
import FileExplorer from './apps/FileExplorer';
import Terminal from './apps/Terminal';
import TextEditor from './apps/TextEditor';
import Calculator from './apps/Calculator';
import Settings from './apps/Settings';
import Browser from './apps/Browser';
import Weather from './apps/Weather';
import MusicPlayer from './apps/MusicPlayer';
import Photos from './apps/Photos';
import AppStore from './apps/AppStore';
import Mail from './apps/Mail';
import Calendar from './apps/Calendar';

const desktopIcons = [
  { app: 'files', label: 'Files' },
  { app: 'browser', label: 'Browser' },
  { app: 'terminal', label: 'Terminal' },
  { app: 'editor', label: 'Text Editor' },
  { app: 'settings', label: 'Settings' },
  { app: 'music', label: 'Music' },
];

function AppContent({ appId }: { appId: string }) {
  switch (appId) {
    case 'files': return <FileExplorer />;
    case 'terminal': return <Terminal />;
    case 'editor': return <TextEditor />;
    case 'calculator': return <Calculator />;
    case 'settings': return <Settings />;
    case 'browser': return <Browser />;
    case 'weather': return <Weather />;
    case 'music': return <MusicPlayer />;
    case 'photos': return <Photos />;
    case 'store': return <AppStore />;
    case 'mail': return <Mail />;
    case 'calendar': return <Calendar />;
    default: return <div className="p-4 text-white/50">App not found</div>;
  }
}

export default function App() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const wallpapers = [
    'from-slate-900 via-blue-950 to-indigo-950',
    'from-emerald-950 via-teal-950 to-cyan-950',
    'from-purple-950 via-fuchsia-950 to-pink-950',
    'from-amber-950 via-orange-950 to-red-950',
    'from-gray-950 via-slate-900 to-zinc-950',
  ];

  const handleDesktopClick = useCallback(() => {
    setShowStartMenu(false);
    setShowContextMenu(false);
    setShowNotifications(false);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
    setShowStartMenu(false);
    setShowNotifications(false);
  }, []);

  const handleDesktopIconDoubleClick = useCallback((appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (app) openWindow(app);
  }, [openWindow]);

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div
      className={`w-screen h-screen overflow-hidden relative bg-gradient-to-br ${wallpapers[wallpaperIndex]} select-none`}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-6 left-6 grid grid-cols-1 gap-2 z-10">
        {desktopIcons.map((icon) => {
          const app = apps.find(a => a.id === icon.app)!;
          return (
            <button
              key={icon.app}
              onDoubleClick={(e) => { e.stopPropagation(); handleDesktopIconDoubleClick(icon.app); }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/10 transition-all w-24 group active:scale-95"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xl"
                style={{ background: `linear-gradient(135deg, ${app.color}30, ${app.color}10)`, border: `1px solid ${app.color}20` }}
              >
                {app.icon}
              </div>
              <span className="text-xs text-white/90 text-center leading-tight font-medium drop-shadow-lg">{icon.label}</span>
            </button>
          );
        })}
      </div>

      {/* Widgets on desktop */}
      <div className="absolute top-6 right-6 z-10 space-y-4">
        {/* Clock Widget */}
        <div 
          className="p-5 rounded-2xl text-white animate-fadeIn"
          style={{ 
            background: 'rgba(25, 25, 35, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <ClockWidget />
        </div>
        
        {/* Quick Stats Widget */}
        <div 
          className="p-4 rounded-2xl text-white text-xs space-y-3 animate-fadeIn"
          style={{ 
            background: 'rgba(25, 25, 35, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animationDelay: '0.1s'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-sm">🌤️</span>
            </div>
            <div>
              <div className="text-white/90 font-medium">24°C</div>
              <div className="text-white/40 text-[10px]">Sunny</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-sm">📶</span>
            </div>
            <div>
              <div className="text-white/90 font-medium">NovaNet-5G</div>
              <div className="text-white/40 text-[10px]">Connected</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <span className="text-sm">🔋</span>
            </div>
            <div>
              <div className="text-white/90 font-medium">87%</div>
              <div className="text-white/40 text-[10px]">Charging</div>
            </div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onMove={(x, y) => updateWindowPosition(win.id, x, y)}
          onResize={(w, h) => updateWindowSize(win.id, w, h)}
        >
          <AppContent appId={win.app} />
        </Window>
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          apps={apps}
          onOpenApp={openWindow}
          onClose={() => setShowStartMenu(false)}
        />
      )}

      {/* Context Menu */}
      {showContextMenu && (
        <div
          className="absolute z-[10000] py-2 rounded-2xl min-w-52 overflow-hidden animate-scaleIn"
          style={{ 
            left: contextMenuPos.x, 
            top: contextMenuPos.y, 
            background: 'rgba(25, 25, 35, 0.92)', 
            backdropFilter: 'blur(30px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { setShowContextMenu(false); }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-base">🔄</span> Refresh
          </button>
          <button
            onClick={() => {
              setWallpaperIndex((wallpaperIndex + 1) % wallpapers.length);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-base">🎨</span> Change Wallpaper
          </button>
          <div className="border-t border-white/8 my-1" />
          <button
            onClick={() => {
              const app = apps.find(a => a.id === 'settings');
              if (app) openWindow(app);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-base">⚙️</span> Display Settings
          </button>
          <button
            onClick={() => {
              const app = apps.find(a => a.id === 'terminal');
              if (app) openWindow(app);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-base">💻</span> Open Terminal
          </button>
          <div className="border-t border-white/8 my-1" />
          <button
            onClick={() => { setShowContextMenu(false); }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-base">ℹ️</span> About NovaOS
          </button>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        apps={apps}
        onOpenApp={openWindow}
        onFocusWindow={focusWindow}
        onMinimizeWindow={minimizeWindow}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        showStart={showStartMenu}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
      />

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}

function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-4xl font-light tracking-wider tabular-nums">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-xs text-white/50 mt-2 font-medium">
        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}
