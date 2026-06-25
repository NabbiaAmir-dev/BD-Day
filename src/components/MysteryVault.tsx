import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';
import { ConfettiBurst } from './Effects';
import { Lock, Unlock } from 'lucide-react';

type Riddle = { q: string; options: string[]; correct: number };

const RIDDLES: Riddle[] = [
  {
    q: 'I give advice. I lecture people. I pretend to be strict. But secretly care. Who am I?',
    options: ['Teacher', 'Senior', 'Grandpa', 'Gorilla'],
    correct: 1,
  },
  {
    q: "I say I'm not angry. But everyone knows I am. Who am I?",
    options: ['Senior', 'Hulk', 'Angry Bird', 'All Of Them'],
    correct: 3,
  },
  {
    q: 'What is stronger than Wi-Fi?',
    options: ['Friendship', "Senior's lectures", 'Cake', 'Pizza'],
    correct: 1,
  },
];

export function MysteryVault() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [unlocked, setUnlocked] = useState(0);
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);

  const r = RIDDLES[current];

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === r.correct) {
      sfx.correct();
      const newUnlocked = unlocked + 1;
      setUnlocked(newUnlocked);
      if (newUnlocked === RIDDLES.length) {
        setTimeout(() => {
          setBurst((b) => b + 1);
          sfx.fanfare();
          setOpen(true);
        }, 800);
      }
    } else {
      sfx.wrong();
    }
  };

  const next = () => {
    if (current + 1 >= RIDDLES.length) return;
    sfx.whoosh();
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setUnlocked(0);
    setOpen(false);
    sfx.click();
  };

  return (
    <Section id="vault">
      <ConfettiBurst trigger={burst} count={200} />
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-sunshine/20 text-sunshine rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 08
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🏦 BIRTHDAY MYSTERY VAULT
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Solve the riddles. Crack the vault. Claim the treasure.
          </p>
        </div>

        {/* Lock indicators */}
        <div className="flex justify-center gap-4 mb-6">
          {RIDDLES.map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                i < unlocked
                  ? 'bg-green-500/20 border-2 border-green-400'
                  : 'bg-white/5 border-2 border-white/10'
              }`}
            >
              {i < unlocked ? (
                <Unlock size={20} className="text-green-400" />
              ) : (
                <Lock size={20} className="text-white/40" />
              )}
            </div>
          ))}
        </div>

        {!open ? (
          <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border">
            <div className="text-center mb-4">
              <span className="font-mono text-cyan-400 text-sm">
                RIDDLE {current + 1}/{RIDDLES.length}
              </span>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl mb-4 animate-float-mid">🧩</div>
              <p className="text-white text-lg sm:text-xl font-semibold italic max-w-lg mx-auto">
                "{r.q}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {r.options.map((opt, i) => {
                const isCorrect = i === r.correct;
                const isSelected = i === selected;
                let cls = 'bg-white/5 border-white/10 hover:border-sunshine/50 hover:bg-white/10';
                if (answered) {
                  if (isCorrect) cls = 'bg-green-500/20 border-green-400';
                  else if (isSelected) cls = 'bg-red-500/20 border-red-400';
                  else cls = 'bg-white/5 border-white/10 opacity-50';
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${cls} ${!answered && 'hover:scale-[1.02]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-white text-sm sm:text-base">{opt}</span>
                      {answered && isCorrect && <span className="ml-auto">✅</span>}
                      {answered && isSelected && !isCorrect && <span className="ml-auto">❌</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="mt-6 text-center">
                <p className={`font-bold text-lg mb-3 ${selected === r.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {selected === r.correct ? '✅ Correct! Lock disengaged.' : '❌ Wrong! Try the next one.'}
                </p>
                {current + 1 < RIDDLES.length && (
                  <button
                    onClick={next}
                    className="px-6 py-3 rounded-full font-display text-white bg-gradient-to-r from-sunshine to-tangerine hover:scale-105 transition-transform"
                  >
                    NEXT RIDDLE →
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="glass-dark rounded-3xl p-8 sm:p-12 gradient-border text-center animate-bounce-in">
            <div className="text-8xl mb-6 animate-float-mid">🎉</div>
            <h3 className="font-display text-3xl sm:text-5xl gradient-text mb-4">
              VAULT UNLOCKED!
            </h3>
            <p className="text-white text-lg sm:text-xl mb-6">
              You've cracked the mystery of Senior! The treasure was inside you all along...
              <br />
              <span className="text-sunshine font-semibold">(and also this birthday website)</span>
            </p>
            <button
              onClick={restart}
              className="px-6 py-3 rounded-full font-display text-white bg-gradient-to-r from-hotpink to-neon hover:scale-105 transition-transform"
            >
              ↻ LOCK VAULT AGAIN
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
