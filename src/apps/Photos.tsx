import { useState } from 'react';

const photos = [
  { id: 1, color: 'from-blue-400 to-purple-500', label: 'Mountain View', date: 'Jan 15' },
  { id: 2, color: 'from-green-400 to-emerald-500', label: 'Forest Trail', date: 'Jan 12' },
  { id: 3, color: 'from-orange-400 to-red-500', label: 'Sunset Beach', date: 'Jan 10' },
  { id: 4, color: 'from-cyan-400 to-blue-500', label: 'Ocean Waves', date: 'Jan 8' },
  { id: 5, color: 'from-pink-400 to-rose-500', label: 'Cherry Blossoms', date: 'Jan 5' },
  { id: 6, color: 'from-yellow-400 to-amber-500', label: 'Golden Fields', date: 'Jan 3' },
  { id: 7, color: 'from-violet-400 to-indigo-500', label: 'Night Sky', date: 'Dec 30' },
  { id: 8, color: 'from-teal-400 to-cyan-500', label: 'Crystal Lake', date: 'Dec 28' },
  { id: 9, color: 'from-red-400 to-pink-500', label: 'City Lights', date: 'Dec 25' },
  { id: 10, color: 'from-emerald-400 to-green-500', label: 'Tropical Garden', date: 'Dec 22' },
  { id: 11, color: 'from-indigo-400 to-purple-500', label: 'Aurora', date: 'Dec 20' },
  { id: 12, color: 'from-amber-400 to-orange-500', label: 'Autumn Leaves', date: 'Dec 18' },
];

export default function Photos() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    const photo = photos.find(p => p.id === selected)!;
    return (
      <div className="h-full flex flex-col text-white">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <button onClick={() => setSelected(null)} className="text-sm hover:bg-white/10 px-3 py-1 rounded-lg">← Back</button>
          <span className="text-sm text-white/60">{photo.label}</span>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-sm">❤️</button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-sm">📤</button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-sm">🗑️</button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className={`w-full h-full max-w-lg max-h-80 rounded-xl bg-gradient-to-br ${photo.color} flex items-center justify-center shadow-2xl`}>
            <span className="text-6xl opacity-50">🖼️</span>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-white/10 text-center text-sm text-white/50" style={{ background: 'rgba(0,0,0,0.2)' }}>
          {photo.label} • {photo.date} • 4032 × 3024
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col text-white">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <span className="font-semibold">Photos</span>
        <div className="flex-1" />
        <button className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20">All Photos</button>
        <button className="text-xs px-3 py-1 rounded-lg hover:bg-white/10 text-white/60">Albums</button>
        <button className="text-xs px-3 py-1 rounded-lg hover:bg-white/10 text-white/60">Favorites</button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="text-xs text-white/40 mb-2">January 2026</div>
        <div className="grid grid-cols-3 gap-2">
          {photos.map(photo => (
            <button
              key={photo.id}
              onClick={() => setSelected(photo.id)}
              className={`aspect-square rounded-lg bg-gradient-to-br ${photo.color} hover:scale-105 transition-transform flex items-center justify-center shadow-lg`}
            >
              <span className="text-2xl opacity-60">🖼️</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
