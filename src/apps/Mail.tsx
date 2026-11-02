import { useState } from 'react';

const emails = [
  { id: 1, from: 'Nova Team', subject: 'Welcome to NovaOS 2.1!', preview: 'We are excited to announce the latest version...', time: '10:30 AM', unread: true, star: true },
  { id: 2, from: 'Alex Johnson', subject: 'Meeting tomorrow', preview: 'Hey, just wanted to confirm our meeting at 2pm...', time: '9:15 AM', unread: true, star: false },
  { id: 3, from: 'GitHub', subject: 'New pull request #234', preview: 'A new pull request has been opened in your repo...', time: 'Yesterday', unread: false, star: true },
  { id: 4, from: 'Sarah Miller', subject: 'Project update', preview: 'The latest progress on the design project is...', time: 'Yesterday', unread: false, star: false },
  { id: 5, from: 'Nova Cloud', subject: 'Storage alert', preview: 'You have used 80% of your cloud storage...', time: 'Jan 13', unread: false, star: false },
  { id: 6, from: 'Newsletter', subject: 'Weekly tech digest', preview: 'This week in tech: AI breakthroughs, new frameworks...', time: 'Jan 12', unread: false, star: false },
  { id: 7, from: 'David Chen', subject: 'Re: Design feedback', preview: 'Thanks for the feedback! I will update the mockups...', time: 'Jan 11', unread: false, star: true },
];

export default function Mail() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [folder, setFolder] = useState('inbox');

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: '📥', count: 2 },
    { id: 'starred', name: 'Starred', icon: '⭐', count: 3 },
    { id: 'sent', name: 'Sent', icon: '📤', count: 0 },
    { id: 'drafts', name: 'Drafts', icon: '📝', count: 1 },
    { id: 'trash', name: 'Trash', icon: '🗑️', count: 0 },
  ];

  const selected = emails.find(e => e.id === selectedEmail);

  return (
    <div className="h-full flex text-white">
      {/* Sidebar */}
      <div className="w-44 border-r border-white/10 p-3 shrink-0" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <button className="w-full py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4 hover:bg-indigo-500/30 transition-colors">
          ✏️ Compose
        </button>
        {folders.map(f => (
          <button
            key={f.id}
            onClick={() => { setFolder(f.id); setSelectedEmail(null); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between mb-0.5 transition-colors ${
              folder === f.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/60'
            }`}
          >
            <span className="flex items-center gap-2"><span>{f.icon}</span> {f.name}</span>
            {f.count > 0 && <span className="text-xs bg-indigo-500/30 px-1.5 py-0.5 rounded-full">{f.count}</span>}
          </button>
        ))}
      </div>

      {/* Email List */}
      <div className="w-64 border-r border-white/10 shrink-0 overflow-auto" style={{ background: 'rgba(0,0,0,0.1)' }}>
        {emails.map(email => (
          <button
            key={email.id}
            onClick={() => setSelectedEmail(email.id)}
            className={`w-full text-left px-4 py-3 border-b border-white/5 transition-colors ${
              selectedEmail === email.id ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className={`text-sm ${email.unread ? 'font-semibold' : 'text-white/70'}`}>{email.from}</span>
              <span className="text-[10px] text-white/40">{email.time}</span>
            </div>
            <div className={`text-xs truncate ${email.unread ? 'text-white/90' : 'text-white/50'}`}>{email.subject}</div>
            <div className="text-xs text-white/30 truncate mt-0.5">{email.preview}</div>
          </button>
        ))}
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-auto">
        {selected ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{selected.subject}</h2>
                <div className="text-sm text-white/50 mt-1">From: {selected.from}</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg text-sm">↩️</button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-sm">🗑️</button>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-sm text-white/70 leading-relaxed">
                {selected.preview}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                <br /><br />
                Best regards,<br />
                {selected.from}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white/30">
            <div className="text-center">
              <div className="text-4xl mb-2">✉️</div>
              <div className="text-sm">Select an email to read</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
