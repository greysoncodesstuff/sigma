import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<string | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const handleNumber = (num: string) => {
    if (resetNext) {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (newOp: string) => {
    if (prev !== null && op) {
      const result = calculate(parseFloat(prev), parseFloat(display), op);
      setDisplay(String(result));
      setPrev(String(result));
    } else {
      setPrev(display);
    }
    setOp(newOp);
    setResetNext(true);
  };

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prev !== null && op) {
      const result = calculate(parseFloat(prev), parseFloat(display), op);
      setDisplay(String(result));
      setPrev(null);
      setOp(null);
      setResetNext(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleToggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    { label: 'AC', action: handleClear, style: 'bg-white/10 hover:bg-white/15 text-orange-400 font-semibold' },
    { label: '±', action: handleToggleSign, style: 'bg-white/10 hover:bg-white/15 text-orange-400 font-semibold' },
    { label: '%', action: handlePercent, style: 'bg-white/10 hover:bg-white/15 text-orange-400 font-semibold' },
    { label: '÷', action: () => handleOp('÷'), style: `${op === '÷' ? 'bg-orange-500 text-white' : 'bg-orange-500/90 hover:bg-orange-500 text-white'} font-semibold` },
    { label: '7', action: () => handleNumber('7'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '8', action: () => handleNumber('8'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '9', action: () => handleNumber('9'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '×', action: () => handleOp('×'), style: `${op === '×' ? 'bg-orange-500 text-white' : 'bg-orange-500/90 hover:bg-orange-500 text-white'} font-semibold` },
    { label: '4', action: () => handleNumber('4'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '5', action: () => handleNumber('5'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '6', action: () => handleNumber('6'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '-', action: () => handleOp('-'), style: `${op === '-' ? 'bg-orange-500 text-white' : 'bg-orange-500/90 hover:bg-orange-500 text-white'} font-semibold` },
    { label: '1', action: () => handleNumber('1'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '2', action: () => handleNumber('2'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '3', action: () => handleNumber('3'), style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '+', action: () => handleOp('+'), style: `${op === '+' ? 'bg-orange-500 text-white' : 'bg-orange-500/90 hover:bg-orange-500 text-white'} font-semibold` },
    { label: '0', action: () => handleNumber('0'), style: 'bg-white/5 hover:bg-white/10 text-white col-span-2' },
    { label: '.', action: handleDecimal, style: 'bg-white/5 hover:bg-white/10 text-white' },
    { label: '=', action: handleEquals, style: 'bg-orange-500 hover:bg-orange-400 text-white font-semibold' },
  ];

  return (
    <div className="h-full flex flex-col p-5" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
      {/* Display */}
      <div className="mb-5 p-5 rounded-2xl" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {prev && op && (
          <div className="text-right text-sm text-white/40 mb-2 font-medium">{prev} {op}</div>
        )}
        <div className="text-right text-4xl font-light text-white tracking-wider overflow-hidden tabular-nums">
          {display.length > 12 ? parseFloat(display).toExponential(6) : display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2.5 flex-1">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`${btn.style} rounded-2xl text-lg transition-all active:scale-95 shadow-sm ${btn.label === '0' ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
