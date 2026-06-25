import { useState } from 'react';
import { OpeningScene } from './components/OpeningScene';
import { InvestigationBoard } from './components/InvestigationBoard';
import { IntelligenceTest } from './components/IntelligenceTest';
import { SurvivalGuide } from './components/SurvivalGuide';
import { PersonalityScanner } from './components/PersonalityScanner';
import { Seniorionaire } from './components/Seniorionaire';
import { MoodDetector } from './components/MoodDetector';
import { RoastGenerator } from './components/RoastGenerator';
import { MysteryVault } from './components/MysteryVault';
import { FriendshipCertificate } from './components/FriendshipCertificate';
import { GrandFinale, SecretDocument } from './components/GrandFinale';
import { FloatingBalloons } from './components/Effects';
import { sfx } from './lib/sfx';

type Stage = 'opening' | 'main' | 'finale';

function App() {
  const [stage, setStage] = useState<Stage>('opening');
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Animated gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 25%, #0a1a2a 50%, #1a0a2a 75%, #0a0a1a 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />

      {/* Floating ambient balloons on main stage */}
      {stage === 'main' && <FloatingBalloons count={8} />}

      {stage === 'opening' && <OpeningScene onStart={() => setStage('main')} />}

      {stage === 'main' && (
        <main className="relative z-10">
          {/* Progress nav */}
          <nav className="fixed top-0 inset-x-0 z-30 glass-dark border-b border-white/10">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <span className="font-display text-sm sm:text-base gradient-text">
                OPERATION: SENIOR
              </span>
              <button
                onClick={() => {
                  sfx.whoosh();
                  setStage('finale');
                }}
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-hotpink to-neon hover:scale-105 transition-transform"
              >
                SKIP TO FINALE →
              </button>
            </div>
          </nav>

          <InvestigationBoard />
          <IntelligenceTest />
          <SurvivalGuide />
          <PersonalityScanner />
          <Seniorionaire />
          <MoodDetector />
          <RoastGenerator />
          <MysteryVault />
          <FriendshipCertificate />

          {/* Bridge to finale */}
          <section className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-xl">
              <div className="text-6xl mb-6 animate-float-mid">🎬</div>
              <h2 className="font-display text-2xl sm:text-4xl text-white mb-4">
                Ready for the Grand Finale?
              </h2>
              <p className="text-white/60 text-sm sm:text-base mb-8">
                You've completed the investigation. Now comes the celebration.
              </p>
              <button
                onClick={() => {
                  sfx.fanfare();
                  setStage('finale');
                }}
                className="px-10 py-5 rounded-full font-display text-lg sm:text-xl text-white bg-gradient-to-r from-hotpink via-tangerine to-sunshine hover:scale-105 transition-transform shadow-lg shadow-hotpink/40 animate-pulse-glow"
              >
                🎉 ENTER THE FINALE
              </button>
            </div>
          </section>
        </main>
      )}

      {stage === 'finale' && (
        <GrandFinale onRevealSecret={() => setShowSecret(true)} />
      )}

      {showSecret && <SecretDocument onClose={() => setShowSecret(false)} />}
    </div>
  );
}

export default App;
