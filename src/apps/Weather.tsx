export default function Weather() {
  const forecast = [
    { day: 'Mon', icon: '☀️', high: 28, low: 18 },
    { day: 'Tue', icon: '⛅', high: 25, low: 17 },
    { day: 'Wed', icon: '🌧️', high: 22, low: 15 },
    { day: 'Thu', icon: '⛈️', high: 20, low: 14 },
    { day: 'Fri', icon: '🌤️', high: 24, low: 16 },
    { day: 'Sat', icon: '☀️', high: 27, low: 18 },
    { day: 'Sun', icon: '☀️', high: 29, low: 19 },
  ];

  const hourly = [
    { time: 'Now', temp: 24, icon: '☀️' },
    { time: '1PM', temp: 25, icon: '☀️' },
    { time: '2PM', temp: 26, icon: '⛅' },
    { time: '3PM', temp: 25, icon: '⛅' },
    { time: '4PM', temp: 24, icon: '🌤️' },
    { time: '5PM', temp: 22, icon: '🌤️' },
    { time: '6PM', temp: 20, icon: '🌙' },
    { time: '7PM', temp: 19, icon: '🌙' },
  ];

  return (
    <div className="h-full overflow-auto text-white" style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.25) 0%, rgba(30,30,40,0.95) 100%)' }}>
      {/* Current Weather */}
      <div className="p-8 text-center">
        <div className="text-sm text-white/60 mb-2 font-medium">San Francisco, CA</div>
        <div className="text-8xl mb-3 drop-shadow-2xl">☀️</div>
        <div className="text-6xl font-extralight">24°</div>
        <div className="text-white/60 mt-2 text-lg">Sunny</div>
        <div className="text-sm text-white/40 mt-1 font-medium">H: 28° L: 18°</div>
      </div>

      {/* Hourly */}
      <div className="mx-5 p-5 rounded-2xl border border-white/10 mb-4" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
        <div className="text-xs text-white/50 uppercase tracking-wider mb-4 font-semibold">Hourly Forecast</div>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <span className="text-xs text-white/50 font-medium">{h.time}</span>
              <span className="text-2xl">{h.icon}</span>
              <span className="text-sm font-semibold">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="mx-5 p-5 rounded-2xl border border-white/10 mb-4" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
        <div className="text-xs text-white/50 uppercase tracking-wider mb-4 font-semibold">7-Day Forecast</div>
        <div className="space-y-4">
          {forecast.map((day, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="w-12 text-sm text-white/70 font-medium">{day.day}</span>
              <span className="text-xl">{day.icon}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/40 w-8 text-right">{day.low}°</span>
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                    style={{ width: `${((day.high - day.low) / 15) * 100}%`, marginLeft: `${((day.low - 10) / 30) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-8">{day.high}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="mx-5 grid grid-cols-2 gap-3 mb-5">
        <div className="p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
          <div className="text-xs text-white/50 font-medium mb-1">Humidity</div>
          <div className="text-2xl font-light">62%</div>
        </div>
        <div className="p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
          <div className="text-xs text-white/50 font-medium mb-1">Wind</div>
          <div className="text-2xl font-light">12 km/h</div>
        </div>
        <div className="p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
          <div className="text-xs text-white/50 font-medium mb-1">UV Index</div>
          <div className="text-2xl font-light">6 High</div>
        </div>
        <div className="p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
          <div className="text-xs text-white/50 font-medium mb-1">Visibility</div>
          <div className="text-2xl font-light">16 km</div>
        </div>
      </div>
    </div>
  );
}
