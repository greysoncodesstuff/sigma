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
    <div className="h-full overflow-auto text-white" style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.3) 0%, rgba(30,30,40,0.9) 100%)' }}>
      {/* Current Weather */}
      <div className="p-6 text-center">
        <div className="text-sm text-white/60 mb-1">San Francisco, CA</div>
        <div className="text-7xl mb-2">☀️</div>
        <div className="text-5xl font-light">24°</div>
        <div className="text-white/60 mt-1">Sunny</div>
        <div className="text-sm text-white/40 mt-1">H: 28° L: 18°</div>
      </div>

      {/* Hourly */}
      <div className="mx-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Hourly Forecast</div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <span className="text-xs text-white/50">{h.time}</span>
              <span className="text-lg">{h.icon}</span>
              <span className="text-sm font-medium">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="mx-4 mt-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
        <div className="text-xs text-white/50 uppercase tracking-wider mb-3">7-Day Forecast</div>
        <div className="space-y-3">
          {forecast.map((day, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="w-10 text-sm text-white/70">{day.day}</span>
              <span className="text-lg">{day.icon}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/40">{day.low}°</span>
                <div className="w-20 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                    style={{ width: `${((day.high - day.low) / 15) * 100}%`, marginLeft: `${((day.low - 10) / 30) * 100}%` }}
                  />
                </div>
                <span className="text-sm">{day.high}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="mx-4 grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-white/50">Humidity</div>
          <div className="text-lg font-medium">62%</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-white/50">Wind</div>
          <div className="text-lg font-medium">12 km/h</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-white/50">UV Index</div>
          <div className="text-lg font-medium">6 High</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-white/50">Visibility</div>
          <div className="text-lg font-medium">16 km</div>
        </div>
      </div>
    </div>
  );
}
