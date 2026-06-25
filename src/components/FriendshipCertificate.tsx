import { useState } from 'react';
import { Section } from './Section';
import { sfx } from '../lib/sfx';
import { ConfettiBurst } from './Effects';
import { Award } from 'lucide-react';

const ACHIEVEMENTS = [
  'Being a great friend',
  'Giving advice',
  'Being supportive',
  'Making memories',
  'Being present despite distance',
];

export function FriendshipCertificate() {
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(0);

  const reveal = () => {
    sfx.fanfare();
    setBurst((b) => b + 1);
    setRevealed(true);
  };

  return (
    <Section id="certificate">
      <ConfettiBurst trigger={burst} count={120} />
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-neon/20 text-neon rounded-full text-xs font-bold tracking-widest mb-3">
            SECTION 09
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">
            🏅 FRIENDSHIP CERTIFICATE
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Official. Certified. Well-deserved.
          </p>
        </div>

        {!revealed ? (
          <div className="text-center py-12">
            <div className="text-7xl mb-6 animate-float-mid">🏅</div>
            <button
              onClick={reveal}
              className="px-8 py-4 rounded-full font-display text-lg text-white bg-gradient-to-r from-neon via-hotpink to-tangerine hover:scale-105 transition-transform shadow-lg shadow-neon/40"
            >
              📜 REVEAL CERTIFICATE
            </button>
          </div>
        ) : (
          <div className="relative animate-bounce-in">
            {/* Certificate */}
            <div className="relative glass rounded-3xl p-8 sm:p-12 border-4 border-double border-sunshine/60 bg-gradient-to-br from-white/10 to-white/5">
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 text-sunshine text-2xl">✦</div>
              <div className="absolute top-3 right-3 text-sunshine text-2xl">✦</div>
              <div className="absolute bottom-3 left-3 text-sunshine text-2xl">✦</div>
              <div className="absolute bottom-3 right-3 text-sunshine text-2xl">✦</div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sunshine to-tangerine flex items-center justify-center shadow-lg shadow-sunshine/40">
                    <Award size={40} className="text-white" />
                  </div>
                </div>

                <p className="font-mono text-cyan-400 text-xs sm:text-sm tracking-widest mb-2">
                  ◢◤ OFFICIAL DOCUMENT ◢◤
                </p>

                <h3 className="font-display text-2xl sm:text-4xl gradient-text mb-6">
                  CERTIFICATE OF EXCELLENCE
                </h3>

                <p className="text-white/70 text-sm sm:text-base mb-2">Presented To:</p>
                <p className="font-display text-3xl sm:text-5xl text-white mb-6">
                  MR Fraisand
                </p>

                <p className="text-white/70 text-sm sm:text-base mb-4">
                  For Outstanding Achievement In:
                </p>

                <ul className="space-y-2 mb-6 max-w-md mx-auto">
                  {ACHIEVEMENTS.map((a, i) => (
                    <li
                      key={a}
                      className="flex items-center gap-3 text-white text-sm sm:text-base animate-slide-up"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    >
                      <span className="text-sunshine">✦</span>
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/70 text-sm mb-1">Lifetime Status:</p>
                  <p className="font-display text-xl sm:text-3xl text-hotpink">
                    Brother By Choice ❤️
                  </p>
                </div>

                {/* Seal */}
                <div className="mt-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hotpink to-neon flex items-center justify-center text-2xl shadow-lg shadow-hotpink/40 animate-tilt">
                    🔖
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
