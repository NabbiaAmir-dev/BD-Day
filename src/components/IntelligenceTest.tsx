import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';

type Q = {
  q: string;
  options: string[];
  correct: number[];
  hint: string;
  badge?: string;
};

const QUESTIONS: Q[] = [
  {
    q: 'Senior says: "It\'s urgent." What does this actually mean?',
    options: ['It is really urgent', 'He wants to scare Junior', 'He is serious', 'Depends on Mr. Kharoos'],
    correct: [3],
    hint: 'The answer is always: Depends on Mr. Kharoos.',
  },
  {
    q: 'Which statement is scientifically impossible?',
    options: ['Senior can praise Junior', 'Senior is self-praising', 'Senior replies instantly', 'Senior starts emotional drama'],
    correct: [0],
    hint: 'Senior praising Junior? Scientists have not recorded this phenomenon.',
  },
  {
    q: 'Senior sends: "We need to talk." What should Junior do?',
    options: ['Stay calm', 'Prepare mentally', 'Prepare emotionally', 'All of the above'],
    correct: [3],
    hint: 'All of the above. And maybe write a will too.',
  },
  {
    q: 'Senior says: "I\'m not angry." This means:',
    options: ['He is calm', 'He is peaceful', 'Danger level increasing', 'Everything is normal'],
    correct: [2],
    hint: '"I\'m not angry" is the final warning before the storm.',
  },
  {
    q: "Senior hasn't replied for 3 days. What is the most likely explanation?",
    options: ['Busy', 'Sleeping', 'Thinking', 'Crafting the perfect lecture'],
    correct: [3],
    hint: 'A masterpiece takes time. The lecture is being polished.',
  },
  {
    q: 'What powers Senior the most?',
    options: ['Coffee', 'Tea', 'Food', 'Praising himself'],
    correct: [3],
    hint: 'Self-praise is Senior\'s premium fuel. Nothing else comes close.',
  },
  {
    q: 'Junior disappears for one day. Senior immediately:',
    options: ["Doesn't care", 'Sleeps peacefully', 'Starts FBI investigation', 'Opens WhatsApp every 30 seconds'],
    correct: [2],
    hint: 'Full FBI mode. Missing posters are already being designed.',
  },
  {
    q: 'Senior receives a message saying: "Okay." What happens next?',
    options: ['He accepts it', 'He moves on', 'He discovers 47 hidden meanings', 'Nothing'],
    correct: [2],
    hint: '"Okay" alone contains multitudes. Senior will find all 47 of them.',
  },
  {
    q: 'Senior starts a sentence with: "Listen carefully..." What appears next?',
    options: ['A short message', 'A simple answer', 'A 40-minute life lesson', 'Silence'],
    correct: [2],
    hint: 'Clear your calendar. Get comfortable. The lesson has begun.',
  },
  {
    q: 'How many compliments does Senior need daily?',
    options: ['5', '20', '50', 'Unlimited'],
    correct: [3],
    hint: 'Unlimited. The supply must never run dry.',
  },
  {
    q: 'Junior says: "You\'re amazing." What happens next?',
    options: ['Senior says thanks', 'Senior smiles', 'Senior starts a self-appreciation documentary', 'Background music starts playing'],
    correct: [2, 3],
    hint: 'Both. Simultaneously. The documentary AND the background music.',
  },
  {
    q: "What is Senior's greatest fear?",
    options: ['Horror movies', 'Spiders', 'Running out of lectures', 'Junior disappearing'],
    correct: [3],
    hint: 'Junior disappearing. Senior would launch a full investigation within 30 minutes.',
  },
  {
    q: 'After years of research, scientists concluded that Senior is:',
    options: ['Uncle G', 'Gorilla', 'Emotional Blackmailer', 'A Legendary Combination Of All Three'],
    correct: [3],
    hint: 'The holy trinity. Uncle G + Gorilla + Emotional Blackmailer = The Legend.',
    badge: '👑 FINAL BOSS QUESTION',
  },
  {
    q: "Who is Senior's favorite person?",
    options: ['Himself', 'Himself', 'Himself', 'Junior (but he\'ll never admit it)'],
    correct: [3],
    hint: 'D. Obviously D. Even Senior knows it deep down.',
    badge: '🎁 SECRET BONUS',
  },
];

export function IntelligenceTest() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];

  const toggle = (i: number) => {
    if (answered) return;
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  };

  const submit = () => {
    if (selected.length === 0) return;
    const isCorrect =
      selected.length === q.correct.length && q.correct.every((c) => selected.includes(c));
    setCorrect(isCorrect);
    setAnswered(true);
    if (isCorrect) {
      setScore((s) => s + 1);
      sfx.correct();
    } else {
      sfx.wrong();
    }
  };

  const next = () => {
    if (current + 1 >= QUESTIONS.length) {
      setDone(true);
      sfx.fanfare();
      return;
    }
    setCurrent((c) => c + 1);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
    sfx.whoosh();
  };

  const restart = () => {
    setCurrent(0);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
    setScore(0);
    setDone(false);
    sfx.click();
  };

  if (done) {
    const pct = score / QUESTIONS.length;
    const verdict =
      pct === 1
        ? 'CERTIFIED SENIOR WHISPERER 🏆'
        : pct >= 0.75
          ? 'SENIOR ANALYST — LEVEL 2 🥈'
          : pct >= 0.5
            ? 'JUNIOR SENIOROLOGIST 📚'
            : 'STILL LEARNING THE WAYS 😅';

    return (
      <Section id="iq-test">
        <div className="w-full max-w-2xl text-center">
          <div className="inline-block px-4 py-1 bg-neon/20 text-neon rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 02 — RESULTS
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-6">SCORECARD</h2>
          <div className="glass-dark rounded-3xl p-8 gradient-border">
            <div className="text-7xl mb-4 animate-bounce-in">{pct === 1 ? '🏆' : '🧠'}</div>
            <div className="font-display text-5xl sm:text-7xl gradient-text mb-2">
              {score}/{QUESTIONS.length}
            </div>
            <p className="text-white text-xl sm:text-2xl font-semibold mb-4">{verdict}</p>
            <p className="text-white/60 text-sm sm:text-base">
              {pct === 1
                ? 'You understand Senior better than Senior understands Senior.'
                : 'Keep studying. MR Fraisand is a complex subject.'}
            </p>
            <button
              onClick={restart}
              className="mt-6 px-6 py-3 rounded-full font-display text-white bg-gradient-to-r from-neon to-electric hover:scale-105 transition-transform"
            >
              ↻ RETAKE TEST
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="iq-test">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-neon/20 text-neon rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 02
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🧠 SENIOR INTELLIGENCE TEST
          </h2>
          <p className="text-white/60 text-sm sm:text-base">Can you think like MR Fraisand?</p>
        </div>

        <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-cyan-400 text-sm">
              QUESTION {current + 1}/{QUESTIONS.length}
            </span>
            <span className="font-mono text-sunshine text-sm">SCORE: {score}</span>
          </div>

          <div className="h-2 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon to-cyan transition-all duration-500"
              style={{ width: `${((current + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {q.badge && (
            <div className="mb-3 inline-block px-3 py-1 bg-sunshine/20 text-sunshine rounded-full text-xs font-bold tracking-widest">
              {q.badge}
            </div>
          )}

          <h3 className="text-white text-lg sm:text-2xl font-semibold mb-6">{q.q}</h3>

          <div className="grid gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected.includes(i);
              const isCorrect = q.correct.includes(i);
              let cls = 'bg-white/5 border-white/10 hover:border-neon/50 hover:bg-white/10';
              if (answered) {
                if (isCorrect) cls = 'bg-green-500/20 border-green-400';
                else if (isSelected) cls = 'bg-red-500/20 border-red-400';
                else cls = 'bg-white/5 border-white/10 opacity-50';
              } else if (isSelected) {
                cls = 'bg-neon/20 border-neon';
              }
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  disabled={answered}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${cls} ${!answered && 'hover:scale-[1.02]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm shrink-0">
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

          {q.correct.length > 1 && !answered && (
            <p className="mt-2 text-cyan-400/60 text-xs font-mono">
              * Multiple correct answers — select all that apply
            </p>
          )}

          {answered && (
            <div
              className={`mt-6 p-4 rounded-xl animate-slide-up ${
                correct
                  ? 'bg-green-500/10 border border-green-400/40'
                  : 'bg-red-500/10 border border-red-400/40'
              }`}
            >
              <p className="font-bold text-lg mb-1">
                {correct ? '✅ CORRECT!' : '❌ NOT QUITE...'}
              </p>
              <p className="text-white/80 text-sm">{q.hint}</p>
              <p className="text-cyan-300 text-sm mt-1">
                Correct answer: {q.correct.map((c) => String.fromCharCode(65 + c)).join(' & ')}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!answered ? (
              <button
                onClick={submit}
                disabled={selected.length === 0}
                className="px-8 py-3 rounded-full font-display text-white bg-gradient-to-r from-neon to-electric hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
              >
                SUBMIT ANSWER
              </button>
            ) : (
              <button
                onClick={next}
                className="px-8 py-3 rounded-full font-display text-white bg-gradient-to-r from-hotpink to-tangerine hover:scale-105 transition-transform"
              >
                {current + 1 >= QUESTIONS.length ? 'SEE RESULTS →' : 'NEXT QUESTION →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
