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
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleTaskClick = (win: WindowState) => {
    if (win.minimized) {
      onFocusWindow(win.id);
    } else {
      onMinimizeWindow(win.id);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center px-3 z-[9999]"
      style={{ background: 'rgba(15, 15, 25, 0.85)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Left section - System buttons */}
      <div className="flex items-center gap-1">
        {/* Start Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onStartClick(); }}
          className={`p-2 rounded-lg transition-all text-lg ${showStart ? 'bg-white/15 scale-105' : 'hover:bg-white/10'}`}
          title="Start"
        >
          🌟
        </button>
        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-1" />
        {/* Quick Launch */}
        <button
          onClick={() => onOpenApp(apps[0])}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-lg"
          title="Files"
        >
          📁
        </button>
        <button
          onClick={() => onOpenApp(apps[5])}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-lg"
          title="Browser"
        >
          🌐
        </button>
        <button
          onClick={() => onOpenApp(apps[1])}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-lg"
          title="Terminal"
        >
          💻
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-white/10 mx-2" />

      {/* Running apps */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {windows.map(win => (
          <button
            key={win.id}
            onClick={() => handleTaskClick(win)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all max-w-40 ${
              !win.minimized ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'
            }`}
          >
            <span className="text-sm">{win.icon}</span>
            <span className="truncate text-xs">{win.title}</span>
            {!win.minimized && <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />}
          </button>
        ))}
      </div>

      {/* Right section - System tray */}
      <div className="flex items-center gap-3">
        {/* System indicators */}
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span title="WiFi">📶</span>
          <span title="Volume">🔊</span>
          <span title="Battery">🔋</span>
        </div>

        {/* Clock */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex flex-col items-end px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="text-xs text-white/90 font-medium">{formatTime(time)}</span>
          <span className="text-[10px] text-white/50">{formatDate(time)}</span>
        </button>

        {/* Notification indicator */}
        <button
          onClick={(e) => { e.stopPropagation(); onNotificationClick?.(); }}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
        >
          <span className="text-sm">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
