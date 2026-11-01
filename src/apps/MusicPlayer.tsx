import { useState } from 'react';

const songs = [
  { title: 'Midnight Dreams', artist: 'Luna Wave', album: 'Neon Nights', duration: '3:42', color: '#8b5cf6' },
  { title: 'Electric Sunset', artist: 'Synth Riders', album: 'Horizons', duration: '4:15', color: '#ec4899' },
  { title: 'Ocean Breeze', artist: 'Coastal Vibes', album: 'Tides', duration: '3:58', color: '#06b6d4' },
  { title: 'Starlight', artist: 'Nova Echo', album: 'Cosmos', duration: '5:01', color: '#f59e0b' },
  { title: 'City Lights', artist: 'Urban Pulse', album: 'Metropolis', duration: '3:33', color: '#10b981' },
  { title: 'Rainfall', artist: 'Ambient Flow', album: 'Serenity', duration: '6:12', color: '#6366f1' },
  { title: 'Golden Hour', artist: 'Sunset Collective', album: 'Warmth', duration: '4:28', color: '#f43f5e' },
  { title: 'Neon Dreams', artist: 'Retro Wave', album: 'Arcade', duration: '3:55', color: '#a855f7' },
];

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);

  const song = songs[currentSong];

  return (
    <div className="h-full flex flex-col text-white" style={{ background: 'rgba(0,0,0,0.3)' }}>
      {/* Album Art */}
      <div className="p-6 flex flex-col items-center">
        <div
          className="w-40 h-40 rounded-2xl shadow-2xl flex items-center justify-center mb-4 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${song.color}40, ${song.color}20)`,
            boxShadow: `0 20px 60px ${song.color}30`,
          }}
        >
          <span className="text-6xl">{isPlaying ? '🎵' : '🎶'}</span>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{song.title}</div>
          <div className="text-sm text-white/50">{song.artist}</div>
          <div className="text-xs text-white/30 mt-0.5">{song.album}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(parseInt(e.target.value))}
          className="w-full accent-pink-500 h-1"
        />
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>1:{Math.floor(progress / 5).toString().padStart(2, '0')}</span>
          <span>{song.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 py-4">
        <button className="text-white/50 hover:text-white transition-colors text-lg">🔀</button>
        <button
          onClick={() => setCurrentSong((currentSong - 1 + songs.length) % songs.length)}
          className="text-white/70 hover:text-white transition-colors text-xl"
        >
          ⏮
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black text-xl hover:scale-105 transition-transform"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => setCurrentSong((currentSong + 1) % songs.length)}
          className="text-white/70 hover:text-white transition-colors text-xl"
        >
          ⏭
        </button>
        <button className="text-white/50 hover:text-white transition-colors text-lg">🔁</button>
      </div>

      {/* Volume */}
      <div className="px-6 flex items-center gap-2">
        <span className="text-sm">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="flex-1 accent-pink-500 h-1"
        />
      </div>

      {/* Playlist */}
      <div className="flex-1 mt-4 overflow-auto border-t border-white/10">
        <div className="p-3">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Up Next</div>
          {songs.map((s, i) => (
            <button
              key={i}
              onClick={() => { setCurrentSong(i); setIsPlaying(true); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                i === currentSong ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${s.color}30` }}
              >
                <span className="text-xs">🎵</span>
              </div>
              <div className="flex-1 text-left">
                <div className={`text-sm ${i === currentSong ? 'text-pink-400' : ''}`}>{s.title}</div>
                <div className="text-xs text-white/40">{s.artist}</div>
              </div>
              <span className="text-xs text-white/30">{s.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
