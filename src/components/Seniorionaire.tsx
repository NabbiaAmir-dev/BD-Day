import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';

type Q = { q: string; options: string[]; correct: number[] };

const QUESTIONS: Q[] = [
  {
    q: "Senior's favorite hobby is:",
    options: ['Sleeping', 'Lecturing', 'Overthinking', 'All of the Above'],
    correct: [3],
  },
  {
    q: 'What should you do when Senior says: "I\'m not angry."',
    options: ['Celebrate', 'Ignore', 'Run', 'Hide'],
    correct: [2, 3],
  },
];

export function Seniorionaire() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [prize, setPrize] = useState(0);

  const q = QUESTIONS[current];

  const toggle = (i: number) => {
    if (answered) return;
    sfx.click();
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  };

  const submit = () => {
    if (selected.length === 0) return;
    const isCorrect =
      selected.length === q.correct.length && q.correct.every((c) => selected.includes(c));
    setCorrect(isCorrect);
    setAnswered(true);
    if (isCorrect) {
      setPrize((p) => p + 1);
      sfx.correct();
    } else {
      sfx.wrong();
    }
  };

  const next = () => {
    if (current + 1 >= QUESTIONS.length) {
      // loop back for replayability
      sfx.fanfare();
      setCurrent(0);
      setPrize(0);
    } else {
      sfx.whoosh();
      setCurrent((c) => c + 1);
    }
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
  };

  return (
    <Section id="seniorionaire">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-sunshine/20 text-sunshine rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 05
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            💰 WHO WANTS TO BE A SENIORIONAIRE?
          </h2>
          <p className="text-white/60 text-sm sm:text-base">Answer correctly. Win glory.</p>
        </div>

        <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border relative">
          {/* Spotlight effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sunshine/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-cyan-400 text-sm">
                QUESTION {current + 1}/{QUESTIONS.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sunshine text-2xl">💰</span>
                <span className="font-display text-sunshine text-xl">{prize}M</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl mb-4 animate-float-mid">🎬</div>
              <h3 className="text-white text-lg sm:text-2xl font-semibold max-w-xl mx-auto">
                {q.q}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                const isSelected = selected.includes(i);
                const isCorrect = q.correct.includes(i);
                let cls = 'bg-white/5 border-white/10 hover:border-sunshine/50 hover:bg-white/10';
                if (answered) {
                  if (isCorrect) cls = 'bg-green-500/20 border-green-400 scale-105';
                  else if (isSelected) cls = 'bg-red-500/20 border-red-400';
                  else cls = 'bg-white/5 border-white/10 opacity-50';
                } else if (isSelected) {
                  cls = 'bg-sunshine/20 border-sunshine';
                }
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    disabled={answered}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${cls} ${!answered && 'hover:scale-[1.02]'} ${answered && isCorrect && 'animate-wiggle'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-sunshine to-tangerine flex items-center justify-center font-bold text-black text-sm">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-white text-sm sm:text-base">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`mt-6 p-4 rounded-xl text-center animate-slide-up ${correct ? 'bg-green-500/10 border border-green-400/40' : 'bg-red-500/10 border border-red-400/40'}`}>
                <p className="font-display text-xl sm:text-2xl mb-1">
                  {correct ? '🎉 CORRECT! +1 MILLION' : '💸 WRONG!'}
                </p>
                <p className="text-white/70 text-sm">
                  {correct
                    ? 'You are one step closer to becoming a Seniorionaire!'
                    : `Correct: ${q.correct.map((c) => String.fromCharCode(65 + c)).join(' & ')}`}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              {!answered ? (
                <button
                  onClick={submit}
                  disabled={selected.length === 0}
                  className="px-8 py-3 rounded-full font-display text-black bg-gradient-to-r from-sunshine to-tangerine hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
                >
                  LOCK IN ANSWER
                </button>
              ) : (
                <button
                  onClick={next}
                  className="px-8 py-3 rounded-full font-display text-white bg-gradient-to-r from-hotpink to-neon hover:scale-105 transition-transform"
                >
                  {current + 1 >= QUESTIONS.length ? '↻ PLAY AGAIN' : 'NEXT QUESTION →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
