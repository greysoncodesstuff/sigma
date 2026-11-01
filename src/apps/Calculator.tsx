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
    { label: 'AC', action: handleClear, style: 'bg-white/10 hover:bg-white/20 text-orange-400' },
    { label: '±', action: handleToggleSign, style: 'bg-white/10 hover:bg-white/20 text-orange-400' },
    { label: '%', action: handlePercent, style: 'bg-white/10 hover:bg-white/20 text-orange-400' },
    { label: '÷', action: () => handleOp('÷'), style: `${op === '÷' ? 'bg-orange-400 text-white' : 'bg-orange-500/80 hover:bg-orange-500 text-white'}` },
    { label: '7', action: () => handleNumber('7'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '8', action: () => handleNumber('8'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '9', action: () => handleNumber('9'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '×', action: () => handleOp('×'), style: `${op === '×' ? 'bg-orange-400 text-white' : 'bg-orange-500/80 hover:bg-orange-500 text-white'}` },
    { label: '4', action: () => handleNumber('4'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '5', action: () => handleNumber('5'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '6', action: () => handleNumber('6'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '-', action: () => handleOp('-'), style: `${op === '-' ? 'bg-orange-400 text-white' : 'bg-orange-500/80 hover:bg-orange-500 text-white'}` },
    { label: '1', action: () => handleNumber('1'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '2', action: () => handleNumber('2'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '3', action: () => handleNumber('3'), style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '+', action: () => handleOp('+'), style: `${op === '+' ? 'bg-orange-400 text-white' : 'bg-orange-500/80 hover:bg-orange-500 text-white'}` },
    { label: '0', action: () => handleNumber('0'), style: 'bg-white/5 hover:bg-white/15 text-white col-span-2' },
    { label: '.', action: handleDecimal, style: 'bg-white/5 hover:bg-white/15 text-white' },
    { label: '=', action: handleEquals, style: 'bg-orange-500 hover:bg-orange-400 text-white' },
  ];

  return (
    <div className="h-full flex flex-col p-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
      {/* Display */}
      <div className="mb-4 p-4 rounded-xl bg-black/30">
        {prev && op && (
          <div className="text-right text-sm text-white/40 mb-1">{prev} {op}</div>
        )}
        <div className="text-right text-3xl font-light text-white tracking-wider overflow-hidden">
          {display.length > 12 ? parseFloat(display).toExponential(6) : display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`${btn.style} rounded-xl text-lg font-medium transition-all active:scale-95 ${btn.label === '0' ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
