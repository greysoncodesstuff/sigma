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
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 52px)', zIndex: win.zIndex }
    : { top: win.y, left: win.x, width: win.width, height: win.height, zIndex: win.zIndex };

  return (
    <div
      className="absolute flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl"
      style={{
        ...style,
        background: 'rgba(30, 30, 40, 0.92)',
        transition: isDragging ? 'none' : 'box-shadow 0.2s',
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center h-10 px-3 select-none shrink-0 cursor-default"
        style={{ background: 'rgba(20, 20, 30, 0.8)' }}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
          >
            <span className="text-[8px] text-red-900 opacity-0 group-hover:opacity-100">✕</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center group"
          >
            <span className="text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100">−</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group"
          >
            <span className="text-[8px] text-green-900 opacity-0 group-hover:opacity-100">⤢</span>
          </button>
        </div>
        <div className="flex-1 text-center text-xs text-white/70 font-medium truncate px-4">
          {win.icon} {win.title}
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
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleResizeMouseDown}
        >
          <svg className="w-3 h-3 text-white/30 absolute bottom-0.5 right-0.5" viewBox="0 0 10 10">
            <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}
