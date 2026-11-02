import { useState, useEffect } from 'react';
import { WindowState, AppDefinition } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  apps: AppDefinition[];
  onOpenApp: (app: AppDefinition) => void;
  onFocusWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onStartClick: () => void;
  showStart: boolean;
  onNotificationClick?: () => void;
}

export default function Taskbar({ windows, apps, onOpenApp, onFocusWindow, onMinimizeWindow, onStartClick, showStart, onNotificationClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleTaskClick = (win: WindowState) => {
    if (win.minimized) {
      onFocusWindow(win.id);
    } else {
      onMinimizeWindow(win.id);
    }
  };

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-14 flex items-center px-4 z-[9999] animate-slideInFromBottom"
      style={{ 
        background: 'rgba(20, 20, 30, 0.75)', 
        backdropFilter: 'blur(30px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-1">
        {/* Start Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onStartClick(); }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            showStart 
              ? 'bg-white/15 scale-105 shadow-lg shadow-blue-500/20' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
          title="Start"
        >
          <span className="text-xl">🌟</span>
        </button>
        
        {/* Separator */}
        <div className="w-px h-7 bg-white/10 mx-2" />
        
        {/* Quick Launch */}
        <button
          onClick={() => onOpenApp(apps[0])}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all"
          title="Files"
        >
          <span className="text-lg">📁</span>
        </button>
        <button
          onClick={() => onOpenApp(apps[5])}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all"
          title="Browser"
        >
          <span className="text-lg">🌐</span>
        </button>
        <button
          onClick={() => onOpenApp(apps[1])}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all"
          title="Terminal"
        >
          <span className="text-lg">💻</span>
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-7 bg-white/10 mx-3" />

      {/* Running apps */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
        {windows.map(win => (
          <button
            key={win.id}
            onClick={() => handleTaskClick(win)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all max-w-44 ${
              !win.minimized 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-white/50 hover:bg-white/5 hover:text-white/70'
            }`}
          >
            <span className="text-sm">{win.icon}</span>
            <span className="truncate text-xs font-medium">{win.title}</span>
            {!win.minimized && (
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 shadow-sm shadow-blue-400/50" />
            )}
          </button>
        ))}
      </div>

      {/* Right section - System tray */}
      <div className="flex items-center gap-2">
        {/* System indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
          <span className="text-sm" title="WiFi">📶</span>
          <span className="text-sm" title="Volume">🔊</span>
          <span className="text-sm" title="Battery">🔋</span>
        </div>

        {/* Clock */}
        <button
          className="flex flex-col items-end px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
        >
          <span className="text-xs text-white/90 font-semibold tabular-nums">{formatTime(time)}</span>
          <span className="text-[10px] text-white/50 font-medium">{formatDate(time)}</span>
        </button>

        {/* Notification indicator */}
        <button 
          onClick={(e) => { e.stopPropagation(); onNotificationClick?.(); }}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all relative"
        >
          <span className="text-sm">🔔</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-sm shadow-red-500/50" />
        </button>
      </div>
    </div>
  );
}
