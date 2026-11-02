import { useState, useCallback } from 'react';
import { WindowState, AppDefinition } from '../types';

export const apps: AppDefinition[] = [
  { id: 'files', name: 'Files', icon: '📁', color: '#f59e0b', defaultWidth: 700, defaultHeight: 500 },
  { id: 'terminal', name: 'Terminal', icon: '💻', color: '#1f2937', defaultWidth: 650, defaultHeight: 420 },
  { id: 'editor', name: 'Text Editor', icon: '📝', color: '#3b82f6', defaultWidth: 650, defaultHeight: 480 },
  { id: 'calculator', name: 'Calculator', icon: '🧮', color: '#8b5cf6', defaultWidth: 320, defaultHeight: 480 },
  { id: 'settings', name: 'Settings', icon: '⚙️', color: '#6b7280', defaultWidth: 600, defaultHeight: 450 },
  { id: 'browser', name: 'Browser', icon: '🌐', color: '#06b6d4', defaultWidth: 800, defaultHeight: 550 },
  { id: 'weather', name: 'Weather', icon: '🌤️', color: '#0ea5e9', defaultWidth: 400, defaultHeight: 500 },
  { id: 'music', name: 'Music', icon: '🎵', color: '#ec4899', defaultWidth: 380, defaultHeight: 500 },
  { id: 'photos', name: 'Photos', icon: '🖼️', color: '#10b981', defaultWidth: 600, defaultHeight: 450 },
  { id: 'store', name: 'App Store', icon: '🏪', color: '#f43f5e', defaultWidth: 650, defaultHeight: 500 },
  { id: 'mail', name: 'Mail', icon: '✉️', color: '#6366f1', defaultWidth: 600, defaultHeight: 450 },
  { id: 'calendar', name: 'Calendar', icon: '📅', color: '#ef4444', defaultWidth: 500, defaultHeight: 450 },
];

let nextZIndex = 100;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((app: AppDefinition) => {
    const existing = windows.find(w => w.app === app.id);
    if (existing) {
      setWindows(prev => prev.map(w =>
        w.id === existing.id ? { ...w, minimized: false, zIndex: ++nextZIndex } : w
      ));
      return;
    }

    const newWindow: WindowState = {
      id: `${app.id}-${Date.now()}`,
      title: app.name,
      app: app.id,
      x: 100 + Math.random() * 200,
      y: 50 + Math.random() * 100,
      width: app.defaultWidth,
      height: app.defaultHeight,
      minimized: false,
      maximized: false,
      zIndex: ++nextZIndex,
      icon: app.icon,
    };
    setWindows(prev => [...prev, newWindow]);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, maximized: !w.maximized, zIndex: ++nextZIndex } : w
    ));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: ++nextZIndex, minimized: false } : w
    ));
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, x, y } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, width, height } : w
    ));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  };
}
