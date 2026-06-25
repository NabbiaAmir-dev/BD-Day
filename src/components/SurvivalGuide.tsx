import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RULES = [
  { num: 1, title: 'Never ask: "Why are you angry?"', body: 'Because now he is definitely angry. You just upgraded the situation from "mysterious" to "confirmed".', emoji: '😡' },
  { num: 2, title: 'If Senior says: "Listen carefully."', body: 'Cancel all upcoming plans. Clear your schedule. Hydrate. You are about to receive a 40-minute minimum lecture.', emoji: '📢' },
  { num: 3, title: 'If he starts with: "Nothing..."', body: 'Something definitely happened. "Nothing" is the opening credits of a drama series. Brace yourself.', emoji: '🚨' },
  { num: 4, title: 'Winning an argument against Senior', body: 'Is scientifically impossible. The laws of physics, logic, and reason all surrender at his doorstep. Just nod.', emoji: '🤷' },
  { num: 5, title: 'Always keep snacks nearby.', body: 'Hungry Senior is a different species. A dangerous, unpredictable, lecture-enhanced species. Snacks = survival.', emoji: '🍿' },
];

export function SurvivalGuide() {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const go = (dir: number) => {
    const next = page + dir;
    if (next < 0 || next >= RULES.length) return;
    sfx.whoosh();
    setFlipping(true);
    setTimeout(() => {
      setPage(next);
      setFlipping(false);
    }, 200);
  };

  const r = RULES[page];

  return (
    <Section id="survival-guide">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-tangerine/20 text-tangerine rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 03
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            📖 SENIOR SURVIVAL GUIDE
          </h2>
          <p className="text-white/60 text-sm sm:text-base">The official handbook. Flip carefully.</p>
        </div>

        <div className="perspective">
          <div
            className={`relative glass-dark rounded-3xl p-8 sm:p-12 gradient-border min-h-[24rem] flex flex-col justify-center transition-transform duration-200 ${
              flipping ? 'rotate-y-180 opacity-0' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute top-4 right-4 font-mono text-cyan-400/60 text-sm">
              PAGE {page + 1}/{RULES.length}
            </div>

            <div className="text-center">
              <div className="text-7xl sm:text-8xl mb-6 animate-float-mid">{r.emoji}</div>
              <div className="inline-block px-4 py-1 bg-hotpink/20 text-hotpink rounded-full text-sm font-bold mb-4">
                RULE #{r.num}
              </div>
              <h3 className="font-display text-xl sm:text-3xl text-white mb-4">{r.title}</h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
                {r.body}
              </p>
            </div>

            {/* Page corner fold */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/10 to-transparent rounded-bl-3xl rounded-br-3xl border-l border-t border-white/10" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => go(-1)}
            disabled={page === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-full glass text-white hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
          >
            <ChevronLeft size={20} /> PREV
          </button>

          <div className="flex gap-2">
            {RULES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  sfx.click();
                  setFlipping(true);
                  setTimeout(() => {
                    setPage(i);
                    setFlipping(false);
                  }, 200);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === page ? 'bg-hotpink scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            disabled={page === RULES.length - 1}
            className="flex items-center gap-2 px-5 py-3 rounded-full glass text-white hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
          >
            NEXT <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}
