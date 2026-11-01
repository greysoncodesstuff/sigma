import { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [phase, setPhase] = useState<'boot' | 'lock'>('boot');
  const [bootProgress, setBootProgress] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Boot animation
    const bootTimer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(bootTimer);
          setTimeout(() => setPhase('lock'), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(bootTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (phase === 'boot') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-5xl mb-8 animate-pulse">🌟</div>
        <div className="text-white text-xl font-light tracking-widest mb-8">NovaOS</div>
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 rounded-full transition-all duration-100"
            style={{ width: `${bootProgress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden"
      onClick={onUnlock}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Time */}
      <div className="text-center mb-12 z-10">
        <div className="text-7xl font-extralight text-white tracking-wider">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-lg text-white/50 mt-2 font-light">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* User avatar */}
      <div className="flex flex-col items-center z-10 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-3xl shadow-xl mb-3 ring-2 ring-white/20">
          N
        </div>
        <div className="text-white text-lg font-medium mb-1">Nova User</div>
        <div className="text-white/40 text-sm mt-2 animate-pulse">Click anywhere to unlock</div>
      </div>

      {/* Bottom hints */}
      <div className="absolute bottom-8 flex items-center gap-6 text-white/30 text-xs">
        <span>📶 WiFi Connected</span>
        <span>🔋 87%</span>
        <span>🌤️ 24°C</span>
      </div>
    </div>
  );
}
