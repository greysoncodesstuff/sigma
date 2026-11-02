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
      className="absolute top-14 right-4 w-80 rounded-2xl overflow-hidden z-[10000] animate-scaleIn"
      style={{ 
        background: 'rgba(25, 25, 35, 0.92)', 
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <span className="text-sm font-semibold text-white">Notifications</span>
        <button onClick={onClose} className="text-xs text-white/40 hover:text-white/70 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
          Clear all
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2 p-4 border-b border-white/8">
        <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors">
          <span className="text-lg">📶</span>
          <span className="text-[9px] font-medium">WiFi</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
          <span className="text-lg">📡</span>
          <span className="text-[9px] font-medium">Bluetooth</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
          <span className="text-lg">🌙</span>
          <span className="text-[9px] font-medium">DND</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
          <span className="text-lg">✈️</span>
          <span className="text-[9px] font-medium">Airplane</span>
        </button>
      </div>

      {/* Notifications */}
      <div className="max-h-80 overflow-auto">
        {notifications.map(notif => (
          <div key={notif.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-md"
              style={{ background: `linear-gradient(135deg, ${notif.color}30, ${notif.color}15)` }}
            >
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-semibold text-white/90">{notif.title}</span>
                <span className="text-[10px] text-white/30 font-medium">{notif.time}</span>
              </div>
              <div className="text-xs text-white/50 truncate">{notif.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/8 text-center" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <span className="text-[10px] text-white/30 font-medium">NovaOS Notification Center</span>
      </div>
    </div>
  );
}
