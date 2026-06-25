import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';
import { ConfettiBurst } from './Effects';

const CRIMES = [
  { num: '001', text: 'Giving lectures nobody requested.', emoji: '🎤' },
  { num: '002', text: 'Replying after 3 business days.', emoji: '🐢' },
  { num: '003', text: 'Being angry for mysterious reasons.', emoji: '😤' },
  { num: '004', text: 'Using emotional blackmail professionally.', emoji: '🎭' },
  { num: '005', text: 'Pretending not to care while secretly caring the most.', emoji: '🥺' },
];

export function InvestigationBoard() {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false, false]);
  const [verdict, setVerdict] = useState(false);
  const [burst, setBurst] = useState(0);

  const reveal = (i: number) => {
    if (revealed[i]) return;
    sfx.pop();
    setRevealed((r) => r.map((v, idx) => (idx === i ? true : v)));
  };

  const allRevealed = revealed.every(Boolean);

  return (
    <Section id="investigation">
      <ConfettiBurst trigger={burst} count={60} />
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-electric/20 text-cyan rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 01
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🔍 FBI BIRTHDAY INVESTIGATION
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Evidence board. Click each crime file to reveal.
          </p>
        </div>

        {/* Investigation board */}
        <div className="relative glass-dark rounded-3xl p-6 sm:p-10">
          {/* Red string web */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none">
            <line x1="20%" y1="20%" x2="80%" y2="30%" stroke="#ff2d87" strokeWidth="2" />
            <line x1="80%" y1="30%" x2="30%" y2="70%" stroke="#ff2d87" strokeWidth="2" />
            <line x1="30%" y1="70%" x2="70%" y2="80%" stroke="#ff2d87" strokeWidth="2" />
            <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#ff2d87" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="#ff2d87" strokeWidth="2" />
          </svg>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CRIMES.map((c, i) => (
              <button
                key={c.num}
                onClick={() => reveal(i)}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                  revealed[i]
                    ? 'bg-hotpink/10 border-hotpink scale-100'
                    : 'bg-white/5 border-white/10 hover:border-cyan/50 hover:scale-[1.03] cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">CRIME #{c.num}</span>
                  <span className="text-2xl">{revealed[i] ? c.emoji : '📁'}</span>
                </div>
                {revealed[i] ? (
                  <p className="text-white text-sm sm:text-base animate-slide-up">{c.text}</p>
                ) : (
                  <p className="text-white/40 text-sm sm:text-base font-mono">
                    ████████████████
                    <br />
                    <span className="text-cyan-400/60 text-xs">[CLASSIFIED — TAP TO DECRYPT]</span>
                  </p>
                )}
              </button>
            ))}

            {/* Center pin */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-hotpink to-neon flex items-center justify-center text-5xl animate-pulse-glow shadow-2xl">
                🕵️
              </div>
            </div>
          </div>

          {/* Verdict */}
          {allRevealed && !verdict && (
            <div className="mt-8 text-center animate-bounce-in">
              <button
                onClick={() => {
                  sfx.alarm();
                  setVerdict(true);
                  setBurst((b) => b + 1);
                }}
                className="px-8 py-3 rounded-full font-display text-white bg-gradient-to-r from-tangerine to-hotpink hover:scale-105 transition-transform shadow-lg"
              >
                ⚖️ READ THE VERDICT
              </button>
            </div>
          )}

          {verdict && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-hotpink/20 to-neon/20 border-2 border-hotpink text-center animate-bounce-in">
              <p className="font-display text-2xl sm:text-3xl text-white mb-2">VERDICT: GUILTY.</p>
              <p className="text-sunshine text-lg sm:text-xl font-semibold">
                Sentence: Must eat birthday cake immediately. 🎂
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
