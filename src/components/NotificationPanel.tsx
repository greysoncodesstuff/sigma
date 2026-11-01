interface NotificationPanelProps {
  onClose: () => void;
}

const notifications = [
  { id: 1, icon: '✉️', title: 'New Email', message: 'Alex Johnson sent you a message', time: '2 min ago', color: '#6366f1' },
  { id: 2, icon: '📅', title: 'Upcoming Event', message: 'Project Deadline at 5:00 PM', time: '15 min ago', color: '#ef4444' },
  { id: 3, icon: '🔄', title: 'System Update', message: 'NovaOS 2.1.1 is available', time: '1 hour ago', color: '#3b82f6' },
  { id: 4, icon: '🎵', title: 'Now Playing', message: 'Midnight Dreams - Luna Wave', time: '2 hours ago', color: '#ec4899' },
  { id: 5, icon: '💾', title: 'Backup Complete', message: 'All files synced to cloud', time: '3 hours ago', color: '#10b981' },
];

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  return (
    <div
      className="absolute top-12 right-3 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-[10000] animate-scaleIn"
      style={{ background: 'rgba(20, 20, 35, 0.95)', backdropFilter: 'blur(30px)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm font-semibold text-white">Notifications</span>
        <button onClick={onClose} className="text-xs text-white/40 hover:text-white/70 px-2 py-1 rounded hover:bg-white/10">
          Clear all
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2 p-3 border-b border-white/10">
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl bg-blue-500/20 text-blue-300">
          <span className="text-lg">📶</span>
          <span className="text-[9px]">WiFi</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-white/60">
          <span className="text-lg">📡</span>
          <span className="text-[9px]">Bluetooth</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-white/60">
          <span className="text-lg">🌙</span>
          <span className="text-[9px]">DND</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 text-white/60">
          <span className="text-lg">✈️</span>
          <span className="text-[9px]">Airplane</span>
        </button>
      </div>

      {/* Notifications */}
      <div className="max-h-72 overflow-auto">
        {notifications.map(notif => (
          <div key={notif.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5"
              style={{ background: `${notif.color}25` }}
            >
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white/90">{notif.title}</span>
                <span className="text-[10px] text-white/30">{notif.time}</span>
              </div>
              <div className="text-xs text-white/50 mt-0.5 truncate">{notif.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-white/10 text-center">
        <span className="text-[10px] text-white/30">NovaOS Notification Center</span>
      </div>
    </div>
  );
}
