import { useState } from 'react';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(0); // January 2026
  const [selectedDay, setSelectedDay] = useState(15);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const events: Record<number, { title: string; color: string; time: string }[]> = {
    5: [{ title: 'Team Standup', color: '#3b82f6', time: '9:00 AM' }],
    10: [{ title: 'Design Review', color: '#8b5cf6', time: '2:00 PM' }],
    15: [
      { title: 'Project Deadline', color: '#ef4444', time: '5:00 PM' },
      { title: 'Lunch with Alex', color: '#10b981', time: '12:30 PM' },
    ],
    18: [{ title: 'Sprint Planning', color: '#f59e0b', time: '10:00 AM' }],
    22: [{ title: 'Dentist Appointment', color: '#ec4899', time: '3:00 PM' }],
    25: [{ title: 'Birthday Party', color: '#06b6d4', time: '7:00 PM' }],
    28: [{ title: 'Code Review', color: '#6366f1', time: '11:00 AM' }],
  };

  // January 2026 starts on Thursday (day 4)
  const firstDay = 4;
  const daysInMonth = 31;
  const today = new Date();
  const isCurrentMonth = today.getMonth() === 0 && today.getFullYear() === 2026;
  const todayDate = isCurrentMonth ? today.getDate() : -1;

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const selectedEvents = events[selectedDay] || [];

  return (
    <div className="h-full flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
            className="p-1.5 hover:bg-white/10 rounded-lg"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold">{months[currentMonth]} 2026</h2>
          <button
            onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
            className="p-1.5 hover:bg-white/10 rounded-lg"
          >
            →
          </button>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-sm hover:bg-red-500/30 transition-colors">
          + Event
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-xs text-white/40 py-1">{day}</div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                onClick={() => day && setSelectedDay(day)}
                disabled={!day}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all relative ${
                  !day ? 'invisible' :
                  day === selectedDay ? 'bg-red-500/30 ring-1 ring-red-500/50' :
                  day === todayDate ? 'bg-white/10 ring-1 ring-white/30' :
                  'hover:bg-white/5'
                }`}
              >
                <span className={day === todayDate ? 'font-bold text-red-400' : ''}>{day}</span>
                {day && events[day] && (
                  <div className="flex gap-0.5 mt-0.5">
                    {events[day].slice(0, 3).map((e, j) => (
                      <div key={j} className="w-1 h-1 rounded-full" style={{ background: e.color }} />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Events Panel */}
        <div className="w-52 border-l border-white/10 p-4 overflow-auto" style={{ background: 'rgba(0,0,0,0.15)' }}>
          <div className="text-sm font-medium mb-3">
            {months[currentMonth]} {selectedDay}
          </div>
          {selectedEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedEvents.map((event, i) => (
                <div key={i} className="p-3 rounded-lg border border-white/10" style={{ background: `${event.color}15` }}>
                  <div className="text-sm font-medium" style={{ color: event.color }}>{event.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{event.time}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-white/30 text-center mt-8">
              No events today
            </div>
          )}

          {/* Upcoming */}
          <div className="mt-6">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Upcoming</div>
            <div className="space-y-2">
              {Object.entries(events)
                .filter(([day]) => parseInt(day) > selectedDay)
                .slice(0, 3)
                .map(([day, evts]) => (
                  <div key={day} className="text-xs">
                    <div className="text-white/40">{months[currentMonth]} {day}</div>
                    {evts.map((e, i) => (
                      <div key={i} className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                        <span className="text-white/60">{e.title}</span>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
