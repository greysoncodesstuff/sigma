import React, { useRef, useCallback, useState, useEffect } from 'react';
import { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: React.ReactNode;
}

export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}: WindowProps) {
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (win.maximized) return;
    e.preventDefault();
    onFocus();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };
    setIsDragging(true);
  }, [win.x, win.y, win.maximized, onFocus]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    if (win.maximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origW: win.width,
      origH: win.height,
    };
  }, [win.width, win.height, win.maximized, onFocus]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        onMove(dragRef.current.origX + dx, Math.max(0, dragRef.current.origY + dy));
      }
      if (resizeRef.current) {
        const dx = e.clientX - resizeRef.current.startX;
        const dy = e.clientY - resizeRef.current.startY;
        onResize(
          Math.max(300, resizeRef.current.origW + dx),
          Math.max(200, resizeRef.current.origH + dy)
        );
      }
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      resizeRef.current = null;
      setIsDragging(false);
    };

    if (isDragging || resizeRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onMove, onResize]);

  if (win.minimized) return null;

  const style: React.CSSProperties = win.maximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 56px)', zIndex: win.zIndex }
    : { top: win.y, left: win.x, width: win.width, height: win.height, zIndex: win.zIndex };

  return (
    <div
      className="absolute flex flex-col rounded-2xl overflow-hidden animate-scaleIn"
      style={{
        ...style,
        background: 'rgba(28, 28, 35, 0.85)',
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center h-12 px-4 select-none shrink-0 cursor-default"
        style={{ 
          background: 'linear-gradient(180deg, rgba(40, 40, 50, 0.9) 0%, rgba(30, 30, 40, 0.9) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 transition-all flex items-center justify-center group shadow-sm"
          >
            <span className="text-[9px] text-red-900 opacity-0 group-hover:opacity-100 font-bold">✕</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all flex items-center justify-center group shadow-sm"
          >
            <span className="text-[9px] text-yellow-900 opacity-0 group-hover:opacity-100 font-bold">−</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 transition-all flex items-center justify-center group shadow-sm"
          >
            <span className="text-[9px] text-green-900 opacity-0 group-hover:opacity-100 font-bold">⤢</span>
          </button>
        </div>
        <div className="flex-1 text-center text-sm text-white/80 font-medium truncate px-4">
          <span className="mr-2">{win.icon}</span>
          {win.title}
        </div>
        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Resize Handle */}
      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize hover:bg-white/5 transition-colors"
          onMouseDown={handleResizeMouseDown}
        >
          <svg className="w-3 h-3 text-white/40 absolute bottom-1 right-1" viewBox="0 0 10 10">
            <path d="M9 1L1 9M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}
