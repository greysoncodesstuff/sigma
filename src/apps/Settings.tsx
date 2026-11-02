import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [wallpaper, setWallpaper] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [accentColor, setAccentColor] = useState('#3b82f6');

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'system', name: 'System', icon: '💻' },
    { id: 'network', name: 'Network', icon: '📶' },
    { id: 'sound', name: 'Sound', icon: '🔊' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'about', name: 'About', icon: 'ℹ️' },
  ];

  const wallpapers = [
    'from-blue-900 via-purple-900 to-slate-900',
    'from-emerald-900 via-teal-900 to-cyan-900',
    'from-rose-900 via-pink-900 to-purple-900',
    'from-amber-900 via-orange-900 to-red-900',
    'from-indigo-900 via-blue-900 to-cyan-900',
    'from-slate-900 via-gray-900 to-zinc-900',
  ];

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-blue-500' : 'bg-white/20'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5.5 left-[22px]' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="h-full flex text-white">
      {/* Sidebar */}
      <div className="w-52 border-r border-white/10 p-3 shrink-0" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="text-lg font-semibold mb-4 px-2">Settings</div>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2.5 mb-0.5 transition-colors ${
              activeTab === tab.id ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-white/5 text-white/70'
            }`}
          >
            <span>{tab.icon}</span> {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-xs text-white/50">Use dark theme across the system</div>
                </div>
                <Toggle value={darkMode} onChange={setDarkMode} />
              </div>

              <div>
                <div className="font-medium mb-2">Wallpaper</div>
                <div className="grid grid-cols-3 gap-2">
                  {wallpapers.map((wp, i) => (
                    <button
                      key={i}
                      onClick={() => setWallpaper(i)}
                      className={`h-16 rounded-lg bg-gradient-to-br ${wp} transition-all ${
                        wallpaper === i ? 'ring-2 ring-blue-400 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Accent Color</div>
                <div className="flex gap-2">
                  {['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'].map(color => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-8 h-8 rounded-full transition-transform ${accentColor === color ? 'scale-125 ring-2 ring-white' : ''}`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Font Size: {fontSize}px</div>
                <input
                  type="range"
                  min="10"
                  max="20"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">System</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-white/50">Device Name</div>
                <div className="font-medium">Nova Desktop</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-white/50">Processor</div>
                <div className="font-medium">Virtual Core @ 3.2 GHz</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-white/50">Memory</div>
                <div className="font-medium">16 GB DDR5</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-white/50">Storage</div>
                <div className="font-medium">512 GB NVMe SSD</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-white/50">Graphics</div>
                <div className="font-medium">Nova GPU 4090</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Network</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📶</span>
                  <div>
                    <div className="font-medium">WiFi</div>
                    <div className="text-xs text-white/50">Connected to NovaNet-5G</div>
                  </div>
                </div>
                <Toggle value={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📡</span>
                  <div>
                    <div className="font-medium">Bluetooth</div>
                    <div className="text-xs text-white/50">2 devices connected</div>
                  </div>
                </div>
                <Toggle value={true} onChange={() => {}} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sound' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Sound</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <div className="font-medium">System Sounds</div>
                  <div className="text-xs text-white/50">Play sounds for system events</div>
                </div>
                <Toggle value={sounds} onChange={setSounds} />
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="font-medium mb-2">Volume</div>
                <input type="range" defaultValue={75} className="w-full accent-blue-500" />
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="font-medium mb-2">Media Volume</div>
                <input type="range" defaultValue={60} className="w-full accent-blue-500" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <div className="font-medium">Enable Notifications</div>
                  <div className="text-xs text-white/50">Show notification banners</div>
                </div>
                <Toggle value={notifications} onChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <div className="font-medium">Do Not Disturb</div>
                  <div className="text-xs text-white/50">Silence all notifications</div>
                </div>
                <Toggle value={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">About NovaOS</h2>
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌟</div>
              <div className="text-2xl font-bold">NovaOS</div>
              <div className="text-white/50">Version 2.1.0</div>
              <div className="mt-6 p-4 rounded-xl bg-white/5 text-left text-sm space-y-2">
                <div className="flex justify-between"><span className="text-white/50">Build</span><span>2026.01.15</span></div>
                <div className="flex justify-between"><span className="text-white/50">Kernel</span><span>Nova 6.1.0</span></div>
                <div className="flex justify-between"><span className="text-white/50">Desktop</span><span>Nova DE 4.0</span></div>
                <div className="flex justify-between"><span className="text-white/50">License</span><span>Open Source</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
