import { useEffect, useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';

const TRAITS = [
  { label: 'Kindness', value: 95, color: '#00e5ff', emoji: '❤️' },
  { label: 'Loyalty', value: 100, color: '#a855f7', emoji: '🤝' },
  { label: 'Protectiveness', value: 100, color: '#0066ff', emoji: '🛡️' },
  { label: 'Drama', value: 999, color: '#ff2d87', emoji: '🎭' },
  { label: 'Mood Swings', value: 100, color: '#ff7a00', emoji: '🎢', display: 'Infinite' },
  { label: 'Lecturing Ability', value: 100, color: '#ffd60a', emoji: '🎤', display: 'Legendary' },
  { label: 'Friendship Value', value: 100, color: '#ff2d87', emoji: '💎', display: 'Priceless' },
];

const SCAN_STEPS = ['Scanning...', 'Analyzing...', 'Processing...', 'Compiling Results...'];

export function PersonalityScanner() {
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [animated, setAnimated] = useState<number[]>([]);

  const start = () => {
    setScanning(true);
    setShowResults(false);
    setStep(0);
    setAnimated([]);
    sfx.whoosh();
  };

  useEffect(() => {
    if (!scanning) return;
    if (step >= SCAN_STEPS.length) {
      sfx.reveal();
      setScanning(false);
      setShowResults(true);
      return;
    }
    sfx.ding();
    const t = setTimeout(() => setStep((s) => s + 1), 800);
    return () => clearTimeout(t);
  }, [scanning, step]);

  // Animate bars when results show
  useEffect(() => {
    if (!showResults) return;
    TRAITS.forEach((_, i) => {
      setTimeout(() => {
        setAnimated((a) => [...a, i]);
        sfx.pop();
      }, i * 250);
    });
  }, [showResults]);

  return (
    <Section id="scanner">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-cyan/20 text-cyan rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 04
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🤖 AI PERSONALITY SCANNER
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Futuristic deep-scan of the subject's psyche.
          </p>
        </div>

        <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border relative overflow-hidden min-h-[20rem]">
          {/* Scan line */}
          {scanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent animate-scan shadow-[0_0_20px_#00e5ff]" />
              <div className="absolute inset-0 bg-cyan/5" />
            </div>
          )}

          {!scanning && !showResults && (
            <div className="text-center py-12">
              <div className="text-7xl mb-6 animate-float-mid">🤖</div>
              <button
                onClick={start}
                className="px-8 py-4 rounded-full font-display text-lg text-white bg-gradient-to-r from-cyan to-electric hover:scale-105 transition-transform shadow-lg shadow-cyan/40"
              >
                ▶ INITIATE DEEP SCAN
              </button>
            </div>
          )}

          {scanning && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 animate-pulse">🔬</div>
              <p className="font-mono text-cyan-300 text-xl sm:text-2xl mb-4">
                {SCAN_STEPS[step] || 'Complete'}
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${i < step ? 'bg-cyan' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className="space-y-4 animate-slide-up">
              {TRAITS.map((t, i) => {
                const isAnimated = animated.includes(i);
                return (
                  <div key={t.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                        <span className="text-lg">{t.emoji}</span> {t.label}
                      </span>
                      <span className="font-mono font-bold text-sm" style={{ color: t.color }}>
                        {t.display ?? `${t.value}%`}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: isAnimated ? `${Math.min(t.value, 100)}%` : '0%',
                          background: `linear-gradient(90deg, ${t.color}, ${t.color}aa)`,
                          boxShadow: isAnimated ? `0 0 12px ${t.color}` : 'none',
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 text-center">
                <button
                  onClick={start}
                  className="px-6 py-3 rounded-full font-display text-white bg-gradient-to-r from-neon to-hotpink hover:scale-105 transition-transform"
                >
                  ↻ RESCAN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
