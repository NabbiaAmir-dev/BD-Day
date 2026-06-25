import { useEffect, useState } from 'react';
import { sfx } from '../lib/sfx';
import { ConfettiBurst } from './Effects';

const BOOT_LINES = [
  'CONFIDENTIAL FILE FOUND',
  'Scanning Subject...',
  'Loading...',
];

const PROGRESS = [10, 35, 68, 99, 100];

const ALIASES = [
  'Uncle G',
  'Dada G',
  'Senior',
  'Bro',
  'Gorilla',
  'Kharoos Uncle G',
  'Moody Senior',
  'Emotional Blackmailer',
  'CEO of Mood Swings',
  'Minister of Lectures',
  'President of Overthinking',
];

export function OpeningScene({ onStart }: { onStart: () => void }) {
  const [phase, setPhase] = useState<'boot' | 'progress' | 'card'>('boot');
  const [typed, setTyped] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [progressIdx, setProgressIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(0);

  // Typing boot lines
  useEffect(() => {
    if (phase !== 'boot') return;
    if (lineIdx >= BOOT_LINES.length) {
      setPhase('progress');
      return;
    }
    const line = BOOT_LINES[lineIdx];
    if (typed.length < line.length) {
      const t = setTimeout(() => {
        setTyped(line.slice(0, typed.length + 1));
        sfx.type();
      }, 45);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTyped('');
        setLineIdx((i) => i + 1);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [typed, lineIdx, phase]);

  // Progress bar
  useEffect(() => {
    if (phase !== 'progress') return;
    if (progressIdx >= PROGRESS.length) {
      setBurst((b) => b + 1);
      sfx.fanfare();
      setTimeout(() => setPhase('card'), 600);
      return;
    }
    const target = PROGRESS[progressIdx];
    const t = setTimeout(() => {
      setProgress(target);
      sfx.ding();
      setProgressIdx((i) => i + 1);
    }, 500);
    return () => clearTimeout(t);
  }, [progressIdx, phase]);

  return (
    <div className="fixed inset-0 z-30 bg-[#05050f] flex items-center justify-center overflow-hidden">
      <ConfettiBurst trigger={burst} count={150} />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {phase === 'boot' && (
        <div className="font-mono text-cyan-300 text-lg sm:text-2xl max-w-2xl px-6 w-full">
          <div className="mb-2 text-hotpink font-bold tracking-widest text-sm sm:text-base">
            ◢◤ SYSTEM ACCESS GRANTED ◢◤
          </div>
          <div className="min-h-[8rem]">
            <span>{typed}</span>
            <span className="animate-blink">▊</span>
          </div>
        </div>
      )}

      {phase === 'progress' && (
        <div className="w-full max-w-2xl px-6 font-mono">
          <div className="text-cyan-300 text-lg sm:text-2xl mb-4">Scanning Subject...</div>
          <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden border border-cyan-400/30">
            <div
              className="h-full bg-gradient-to-r from-hotpink via-neon to-cyan transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-cyan-300 text-3xl sm:text-5xl font-bold mt-4 text-center">
            {progress}%
          </div>
        </div>
      )}

      {phase === 'card' && (
        <div className="relative z-10 w-full max-w-2xl mx-4 animate-bounce-in">
          <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-hotpink/20 text-hotpink rounded-full text-xs sm:text-sm font-bold tracking-widest mb-3 animate-pulse">
                ◢◤ TARGET IDENTIFIED ◢◤
              </div>
              <h1 className="font-display text-3xl sm:text-5xl gradient-text mb-2">
                THE LEGEND OF SENIOR
              </h1>
              <p className="text-white/60 text-sm sm:text-base italic">
                An official investigation into one of the most mysterious creatures ever discovered.
              </p>
            </div>

            <div className="space-y-4 font-mono text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-cyan-400 font-bold min-w-[80px]">NAME:</span>
                <span className="text-white text-lg">MR Fraisand</span>
              </div>

              <div>
                <span className="text-cyan-400 font-bold">ALIASES:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ALIASES.map((a, i) => (
                    <span
                      key={a}
                      className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold animate-pop-in"
                      style={{
                        animationDelay: `${i * 0.08}s`,
                        background: [
                          'rgba(255,45,135,0.2)',
                          'rgba(168,85,247,0.2)',
                          'rgba(0,229,255,0.2)',
                          'rgba(255,214,10,0.2)',
                          'rgba(255,122,0,0.2)',
                        ][i % 5],
                        color: ['#ff2d87', '#a855f7', '#00e5ff', '#ffd60a', '#ff7a00'][i % 5],
                        border: `1px solid ${['#ff2d87', '#a855f7', '#00e5ff', '#ffd60a', '#ff7a00'][i % 5]}40`,
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 pt-2">
                <span className="text-cyan-400 font-bold min-w-[80px]">STATUS:</span>
                <span className="text-sunshine font-semibold">Extremely Rare Species</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-cyan-400 font-bold min-w-[80px]">DANGER:</span>
                <span className="text-hotpink font-semibold">Depends On Mood ⚠️</span>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.whoosh();
                onStart();
              }}
              className="mt-8 w-full py-4 rounded-2xl font-display text-lg sm:text-xl text-white bg-gradient-to-r from-hotpink via-neon to-electric hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-hotpink/40"
            >
              ▶ START INVESTIGATION
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
