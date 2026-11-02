import { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [phase, setPhase] = useState<'boot' | 'lock'>('boot');
  const [bootProgress, setBootProgress] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const bootTimer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(bootTimer);
          setTimeout(() => setPhase('lock'), 400);
          return 100;
        }
        return prev + 3;
      });
    }, 25);
    return () => clearInterval(bootTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (phase === 'boot') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-6xl mb-8 animate-pulse">🌟</div>
          <div className="text-white text-2xl font-light tracking-[0.3em] mb-10 uppercase">NovaOS</div>
          <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={onUnlock}
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Time */}
      <div className="text-center mb-16 z-10 animate-fadeIn">
        <div className="text-8xl font-extralight text-white tracking-wider tabular-nums drop-shadow-2xl">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-xl text-white/50 mt-3 font-light tracking-wide">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* User avatar */}
      <div className="flex flex-col items-center z-10 animate-slideUp">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold shadow-2xl mb-4 ring-4 ring-white/10">
          N
        </div>
        <div className="text-white text-xl font-medium mb-2">Nova User</div>
        <div className="text-white/40 text-sm mt-3 animate-pulse tracking-wide">Click anywhere to unlock</div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-8 flex items-center gap-8 text-white/30 text-xs z-10">
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🔋</span>
          <span>87%</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🌤️</span>
          <span>24°C</span>
        </div>
      </div>
    </div>
  );
}
