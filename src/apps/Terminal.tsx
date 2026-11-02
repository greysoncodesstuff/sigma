import { useState, useRef, useEffect } from 'react';

interface HistoryEntry {
  command: string;
  output: string;
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: 'NovaOS Terminal v2.1.0\nType "help" for available commands.\n' }
  ]);
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = (cmd: string): string => {
    const parts = cmd.trim().split(' ');
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        return `Available commands:
  help      - Show this help message
  echo      - Print text
  date      - Show current date/time
  whoami    - Show current user
  ls        - List files
  pwd       - Print working directory
  cd        - Change directory
  cat       - Display file contents
  clear     - Clear terminal
  neofetch  - System information
  calc      - Simple calculator
  cowsay    - Cow says something`;
      case 'echo':
        return args.join(' ');
      case 'date':
        return new Date().toString();
      case 'whoami':
        return 'novauser';
      case 'pwd':
        return `/home/novauser${currentDir === '~' ? '' : currentDir.replace('~', '')}`;
      case 'ls':
        return 'Documents  Downloads  Music  Pictures  Desktop  .config  .bashrc';
      case 'cd':
        if (args[0] === '..') setCurrentDir('~');
        else if (args[0]) setCurrentDir(`~/${args[0]}`);
        return '';
      case 'cat':
        if (args[0] === '.bashrc') return '# NovaOS bash configuration\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"';
        return `cat: ${args[0] || ''}: No such file or directory`;
      case 'clear':
        setHistory([]);
        return '';
      case 'neofetch':
        return `
  ╔═══════════════════╗     novauser@novaos
  ║   ◉  NovaOS 2.1  ║     ─────────────────
  ║   ◉   ████████   ║     OS: NovaOS 2.1.0
  ║   ◉   ████████   ║     Kernel: Nova 6.1.0
  ║   ◉   ████████   ║     Shell: nova-sh 2.1
  ║   ◉   ████████   ║     Resolution: ${window.innerWidth}x${window.innerHeight}
  ╚═══════════════════╝     DE: Nova Desktop
                            Theme: Dark Glass
                            CPU: Virtual Core @ 3.2GHz
                            Memory: 4.2GB / 16GB`;
      case 'calc':
        try {
          const expr = args.join('');
          const result = Function('"use strict"; return (' + expr.replace(/[^0-9+\-*/().]/g, '') + ')')();
          return `= ${result}`;
        } catch { return 'Error: Invalid expression'; }
      case 'cowsay':
        const msg = args.join(' ') || 'Moo!';
        const border = '─'.repeat(msg.length + 2);
        return ` ┌${border}┐\n │ ${msg} │\n └${border}┘\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
      case '':
        return '';
      default:
        return `nova-sh: command not found: ${command}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = processCommand(input);
    setHistory(prev => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div
      className="h-full font-mono text-sm p-4 cursor-text"
      style={{ background: 'rgba(0, 0, 0, 0.85)', color: '#a0ffa0' }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div key={i} className="mb-1">
          {entry.command && (
            <div className="flex items-center gap-2">
              <span className="text-blue-400">novauser@novaos</span>
              <span className="text-white/50">:</span>
              <span className="text-purple-400">{currentDir}</span>
              <span className="text-white/50">$</span>
              <span className="text-green-300">{entry.command}</span>
            </div>
          )}
          {entry.output && (
            <pre className="whitespace-pre-wrap text-white/80 mt-0.5">{entry.output}</pre>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-blue-400">novauser@novaos</span>
        <span className="text-white/50">:</span>
        <span className="text-purple-400">{currentDir}</span>
        <span className="text-white/50">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-300 caret-green-400"
          autoFocus
          spellCheck={false}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
