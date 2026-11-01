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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-1 z-10">
        {desktopIcons.map((icon) => {
          const app = apps.find(a => a.id === icon.app)!;
          return (
            <button
              key={icon.app}
              onDoubleClick={(e) => { e.stopPropagation(); handleDesktopIconDoubleClick(icon.app); }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-white/10 transition-colors w-20 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform drop-shadow-lg">{app.icon}</span>
              <span className="text-[11px] text-white/80 text-center leading-tight drop-shadow-md">{icon.label}</span>
            </button>
          );
        })}
      </div>

      {/* Widgets on desktop */}
      <div className="absolute top-4 right-4 z-10 space-y-3">
        {/* Clock Widget */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white">
          <ClockWidget />
        </div>
        {/* Quick Stats */}
        <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs">
          <div className="flex items-center gap-2 mb-2">
            <span>🌤️</span>
            <span className="text-white/80">24°C Sunny</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span>📶</span>
            <span className="text-white/80">NovaNet-5G</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔋</span>
            <span className="text-white/80">87%</span>
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
          className="absolute z-[10000] py-1 rounded-xl border border-white/10 shadow-2xl min-w-48 overflow-hidden"
          style={{ left: contextMenuPos.x, top: contextMenuPos.y, background: 'rgba(25, 25, 40, 0.95)', backdropFilter: 'blur(20px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { setShowContextMenu(false); }}
            className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3"
          >
            <span>🔄</span> Refresh
          </button>
          <button
            onClick={() => {
              setWallpaperIndex((wallpaperIndex + 1) % wallpapers.length);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3"
          >
            <span>🎨</span> Change Wallpaper
          </button>
          <div className="border-t border-white/10 my-1" />
          <button
            onClick={() => {
              const app = apps.find(a => a.id === 'settings');
              if (app) openWindow(app);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3"
          >
            <span>⚙️</span> Display Settings
          </button>
          <button
            onClick={() => {
              const app = apps.find(a => a.id === 'terminal');
              if (app) openWindow(app);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3"
          >
            <span>💻</span> Open Terminal
          </button>
          <div className="border-t border-white/10 my-1" />
          <button
            onClick={() => { setShowContextMenu(false); }}
            className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 flex items-center gap-3"
          >
            <span>ℹ️</span> About NovaOS
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
      <div className="text-3xl font-light tracking-wider">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-xs text-white/50 mt-1">
        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}
