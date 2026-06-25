import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';

type Roast = { num: string; lines: string[] };

const ROASTS: Roast[] = [
  { num: '01', lines: ['Senior can find hidden meanings in messages that never existed.', '"Okay" becomes a full conspiracy theory.'] },
  { num: '02', lines: ['Senior once replied so late that the conversation was added to the history syllabus.'] },
  { num: '03', lines: ['Senior started a sentence with: "Long story short..."', 'Three seasons later, the story is still continuing.'] },
  { num: '04', lines: ["NASA tried measuring Senior's mood swings.", 'The equipment exploded and requested retirement.'] },
  { num: '05', lines: ['The disappearance of Junior for one day scares Senior more than any horror movie ever made.'] },
  { num: '06', lines: ["Senior's overthinking has its own overthinking.", 'Scientists are still studying both.'] },
  { num: '07', lines: ['Senior once got offended by a situation he imagined, created, directed, and produced in his own head.'] },
  { num: '08', lines: ["Senior's favorite sport isn't football.", "It's jumping to conclusions."] },
  { num: '09', lines: ['Doctors confirmed Senior requires a minimum of 200 self-praises per day to remain operational.'] },
  { num: '10', lines: ['Junior once said: "Wow, amazing!"', 'Senior immediately entered a motivational speech mode and background music started automatically.'] },
  { num: '11', lines: ["Senior didn't talk to Junior for a while.", 'So instead of hearing "Hi," Junior started hearing:', '"Begani... Begani..." in the distance.'] },
  { num: '12', lines: ['Senior can turn: "Good Morning"', 'into', '"Let me tell you something about life..."'] },
  { num: '13', lines: ["Senior's confidence is so high that even mirrors ask for his autograph."] },
  { num: '14', lines: ["Senior doesn't read messages.", 'He analyzes them.'] },
  { num: '15', lines: ['Senior once looked at a text for 3 seconds and somehow found 14 hidden meanings.'] },
  { num: '16', lines: ['If self-appreciation were an Olympic sport, Senior would win gold, silver, and bronze.'] },
  { num: '17', lines: ['Senior can detect attitude from a message containing only one emoji.'] },
  { num: '18', lines: ["Senior's emotional speeches are longer than software terms and conditions.", 'Nobody finishes reading them.'] },
];

export function RoastGenerator() {
  const [current, setCurrent] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [spinning, setSpinning] = useState(false);

  const generate = () => {
    setSpinning(true);
    sfx.whoosh();
    let count = 0;
    const interval = setInterval(() => {
      setCurrent(Math.floor(Math.random() * ROASTS.length));
      sfx.type();
      count++;
      if (count > 8) {
        clearInterval(interval);
        let next = Math.floor(Math.random() * ROASTS.length);
        while (history.includes(next) && history.length < ROASTS.length) {
          next = Math.floor(Math.random() * ROASTS.length);
        }
        setCurrent(next);
        setHistory((h) => [...h.slice(-5), next]);
        setSpinning(false);
        sfx.pop();
      }
    }, 60);
  };

  const roast = current !== null ? ROASTS[current] : null;

  return (
    <Section id="roast-generator">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-hotpink/20 text-hotpink rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 07
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🔥 ROAST GENERATOR
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Press the button. Receive a freshly roasted MR Fraisand. Unlimited supply.
          </p>
        </div>

        <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border text-center min-h-[22rem] flex flex-col justify-center">
          {roast === null ? (
            <div className="text-7xl mb-6 animate-float-mid">🔥</div>
          ) : (
            <div className={`transition-all ${spinning ? 'opacity-60' : 'animate-bounce-in'}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">🔥</span>
                <span className="font-mono text-hotpink/80 text-sm font-bold tracking-widest">
                  ROAST #{roast.num}
                </span>
                <span className="text-4xl">🔥</span>
              </div>
              <div className="space-y-2 max-w-xl mx-auto">
                {roast.lines.map((line, i) => (
                  <p
                    key={i}
                    className={`text-white leading-relaxed ${
                      i === 0
                        ? 'text-lg sm:text-2xl font-semibold'
                        : 'text-base sm:text-lg text-white/80 italic'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={generate}
            disabled={spinning}
            className="mt-8 px-10 py-5 rounded-full font-display text-lg sm:text-xl text-white bg-gradient-to-r from-hotpink via-tangerine to-sunshine hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-hotpink/40 disabled:opacity-60"
          >
            {roast === null ? '🔥 ROAST MR FRAISAND' : '🔥 ROAST AGAIN'}
          </button>

          {history.length > 1 && (
            <p className="mt-4 text-white/40 text-xs font-mono">
              {history.length} roasts generated — Senior hasn't recovered yet
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
