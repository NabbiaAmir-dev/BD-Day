import { useEffect, useState } from 'react';
import { sfx } from '../lib/sfx';
import { Fireworks, FloatingBalloons, ConfettiBurst } from './Effects';

const LINES = [
  'Behind every joke...',
  'Behind every lecture...',
  'Behind every mood swing...',
  'Behind every roast...',
  'Behind every nickname...',
  'There is someone who has always been a good friend.',
  'Someone who stayed despite the distance.',
  'Someone who became family without sharing blood.',
  'Someone who earned the title of brother through loyalty and friendship.',
];

const TITLES = [
  { text: 'HAPPY BIRTHDAY', emoji: '🎂' },
  { text: 'UNCLE G', emoji: '😎' },
  { text: 'GORILLA KHAROOS', emoji: '🦍' },
  { text: 'MOODY SENIOR', emoji: '😂' },
  { text: 'THE LEGEND HIMSELF', emoji: '🎉' },
];

export function GrandFinale({ onRevealSecret }: { onRevealSecret: () => void }) {
  const [phase, setPhase] = useState<'lines' | 'titles' | 'message' | 'button'>('lines');
  const [lineIdx, setLineIdx] = useState(0);
  const [titleIdx, setTitleIdx] = useState(0);
  const [burst, setBurst] = useState(0);

  // Reveal lines one by one
  useEffect(() => {
    if (phase !== 'lines') return;
    if (lineIdx >= LINES.length) {
      setPhase('titles');
      setBurst((b) => b + 1);
      sfx.fanfare();
      return;
    }
    sfx.ding();
    const t = setTimeout(() => setLineIdx((i) => i + 1), 1800);
    return () => clearTimeout(t);
  }, [lineIdx, phase]);

  // Reveal titles
  useEffect(() => {
    if (phase !== 'titles') return;
    if (titleIdx >= TITLES.length) {
      setPhase('message');
      return;
    }
    sfx.reveal();
    const t = setTimeout(() => setTitleIdx((i) => i + 1), 1200);
    return () => clearTimeout(t);
  }, [titleIdx, phase]);

  // Show final message + button
  useEffect(() => {
    if (phase !== 'message') return;
    const t = setTimeout(() => {
      setPhase('button');
      sfx.pop();
    }, 2000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-30 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2a] to-[#0a0a1a] overflow-y-auto">
      <Fireworks active />
      <FloatingBalloons count={16} />
      <ConfettiBurst trigger={burst} count={250} />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Lines phase */}
        {phase === 'lines' && (
          <div className="text-center max-w-2xl">
            {LINES.slice(0, lineIdx).map((line, i) => {
              const isLast5 = i >= 5;
              return (
                <p
                  key={i}
                  className={`animate-slide-up mb-4 ${
                    isLast5
                      ? 'text-white text-lg sm:text-2xl font-semibold'
                      : 'text-white/70 text-base sm:text-xl italic'
                  }`}
                  style={{ animationDelay: '0s' }}
                >
                  {line}
                </p>
              );
            })}
            {lineIdx < LINES.length && (
              <span className="inline-block w-3 h-6 bg-hotpink animate-blink" />
            )}
          </div>
        )}

        {/* Titles phase */}
        {phase === 'titles' && (
          <div className="text-center">
            <div className="space-y-4 mb-8">
              {TITLES.slice(0, titleIdx).map((t, i) => (
                <h1
                  key={i}
                  className="font-display text-3xl sm:text-6xl gradient-text animate-bounce-in"
                  style={{ animationDelay: '0s' }}
                >
                  {t.text} {t.emoji}
                </h1>
              ))}
            </div>
            {titleIdx < TITLES.length && (
              <span className="inline-block w-3 h-8 bg-sunshine animate-blink" />
            )}
          </div>
        )}

        {/* Final message + button */}
        {(phase === 'message' || phase === 'button') && (
          <div className="text-center max-w-2xl animate-slide-up">
            <div className="space-y-2 mb-8">
              {TITLES.map((t, i) => (
                <h1
                  key={i}
                  className="font-display text-2xl sm:text-5xl gradient-text"
                >
                  {t.text} {t.emoji}
                </h1>
              ))}
            </div>

            <div className="glass-dark rounded-3xl p-6 sm:p-10 gradient-border mb-8">
              <p className="text-white text-base sm:text-lg leading-relaxed mb-4">
                Thank you for all the advice, all the laughs, all the memories, and all the support.
              </p>
              <p className="text-white text-base sm:text-lg leading-relaxed mb-4">
                Distance may separate places, but it can never separate genuine friendship.
              </p>
              <p className="text-white text-base sm:text-lg leading-relaxed mb-4">
                You are not my brother by blood. You are my brother by choice.
              </p>
              <p className="text-sunshine text-base sm:text-lg leading-relaxed font-semibold">
                May this year bring you happiness, success, health, peace, adventure, and countless reasons to smile.
              </p>
              <p className="font-display text-2xl sm:text-3xl gradient-text mt-4">
                Happy Birthday, MR Fraisand.
              </p>
            </div>

            {phase === 'button' && (
              <button
                onClick={() => {
                  sfx.whoosh();
                  onRevealSecret();
                }}
                className="px-8 py-4 rounded-full font-display text-lg text-white bg-gradient-to-r from-hotpink via-neon to-electric hover:scale-105 transition-transform shadow-lg shadow-hotpink/40 animate-pulse-glow"
              >
                🗂️ CLICK FOR CLASSIFIED INFORMATION
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function SecretDocument({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
      <ConfettiBurst trigger={1} count={300} />
      <div className="glass-dark rounded-3xl p-8 sm:p-12 gradient-border max-w-lg w-full text-center animate-bounce-in">
        <div className="text-6xl mb-4">🗂️</div>
        <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">
          ◢◤ CLASSIFIED — CASE FILE ◢◤
        </p>
        <h2 className="font-display text-3xl sm:text-5xl gradient-text mb-6">CASE CLOSED</h2>

        <p className="text-white/70 text-sm sm:text-base mb-2">Investigation Complete.</p>
        <p className="text-white text-lg sm:text-xl mb-2">Final Verdict:</p>
        <p className="text-white text-base sm:text-lg mb-1">Subject Found Guilty...</p>
        <p className="font-display text-2xl sm:text-3xl text-sunshine mb-6">
          Of Being An Amazing Brother.
        </p>

        <div className="text-4xl sm:text-5xl mb-6 animate-float-mid">
          🎂🎉❤️🥳✨🦍😎🎊🚀
        </div>

        <button
          onClick={() => {
            sfx.click();
            onClose();
          }}
          className="px-6 py-3 rounded-full font-display text-white bg-gradient-to-r from-hotpink to-neon hover:scale-105 transition-transform"
        >
          ← BACK TO CELEBRATION
        </button>
      </div>
    </div>
  );
}
