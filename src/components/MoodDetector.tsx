import { useEffect, useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';

const MOODS = [
  { label: 'Happy', value: 5, color: '#ffd60a', emoji: '😊' },
  { label: 'Hungry', value: 25, color: '#ff7a00', emoji: '🍔' },
  { label: 'Thinking', value: 40, color: '#a855f7', emoji: '🤔' },
  { label: 'Planning A Lecture', value: 100, color: '#ff2d87', emoji: '📢' },
];

export function MoodDetector() {
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shake, setShake] = useState(false);
  const [bars, setBars] = useState<number[]>([0, 0, 0, 0]);

  const start = () => {
    setScanning(true);
    setShowResult(false);
    setBars([0, 0, 0, 0]);
    sfx.alarm();
  };

  useEffect(() => {
    if (!scanning) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= MOODS.length) {
        clearInterval(interval);
        setScanning(false);
        setShowResult(true);
        setShake(true);
        sfx.alarm();
        setTimeout(() => setShake(false), 1500);
        return;
      }
      setBars((b) => b.map((v, idx) => (idx === i ? MOODS[i].value : v)));
      sfx.ding();
      i++;
    }, 700);
    return () => clearInterval(interval);
  }, [scanning]);

  return (
    <Section id="mood-detector">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold tracking-widest mb-3 animate-pulse">
            ⚠️ SECTION 06 — EMERGENCY
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🚨 EMERGENCY MOOD DETECTOR
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Real-time psychological threat assessment.
          </p>
        </div>

        <div className={`glass-dark rounded-3xl p-6 sm:p-10 gradient-border relative overflow-hidden ${shake ? 'animate-shake-hard' : ''}`}>
          {/* Warning stripes */}
          {scanning && (
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #ff2d87 0, #ff2d87 20px, transparent 20px, transparent 40px)',
              }}
            />
          )}

          {/* Alarm light */}
          {(scanning || showResult) && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ff2d87]" />
              <span className="font-mono text-red-400 text-xs font-bold animate-pulse">REC</span>
            </div>
          )}

          {!scanning && !showResult && (
            <div className="text-center py-12">
              <div className="text-7xl mb-6 animate-wiggle">🚨</div>
              <button
                onClick={start}
                className="px-8 py-4 rounded-full font-display text-lg text-white bg-gradient-to-r from-red-500 to-hotpink hover:scale-105 transition-transform shadow-lg shadow-red-500/40 animate-pulse-glow"
              >
                ⚠️ ACTIVATE SCANNER
              </button>
            </div>
          )}

          {(scanning || showResult) && (
            <div className="relative">
              <h3 className="text-center text-white text-xl sm:text-2xl font-bold mb-6">
                {scanning ? 'SCANNING MOOD...' : 'MOOD ANALYSIS COMPLETE'}
              </h3>

              <div className="space-y-4">
                {MOODS.map((m, i) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                        <span className="text-lg">{m.emoji}</span> {m.label}
                      </span>
                      <span className="font-mono font-bold text-sm" style={{ color: m.color }}>
                        {bars[i]}%
                      </span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${bars[i]}%`,
                          background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`,
                          boxShadow: bars[i] > 0 ? `0 0 10px ${m.color}` : 'none',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {showResult && (
                <div className="mt-8 p-6 rounded-2xl bg-red-500/20 border-2 border-red-500 text-center animate-bounce-in">
                  <div className="text-5xl mb-3 animate-wiggle">⚠️</div>
                  <p className="font-display text-2xl sm:text-3xl text-red-400 mb-2">
                    WARNING!
                  </p>
                  <p className="text-white text-lg sm:text-xl font-bold mb-1">
                    LECTURE INCOMING!
                  </p>
                  <p className="text-white/70 text-sm sm:text-base">
                    Take Cover Immediately! 🏃‍♂️💨
                  </p>
                  <button
                    onClick={start}
                    className="mt-6 px-6 py-3 rounded-full font-display text-white bg-gradient-to-r from-red-500 to-hotpink hover:scale-105 transition-transform"
                  >
                    ↻ RESCAN
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
