let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15, delay = 0) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const start = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

export const sfx = {
  click: () => tone(600, 0.08, 'square', 0.1),
  pop: () => tone(800, 0.1, 'sine', 0.15),
  correct: () => {
    tone(523, 0.1, 'sine', 0.15, 0);
    tone(659, 0.1, 'sine', 0.15, 0.1);
    tone(784, 0.2, 'sine', 0.15, 0.2);
  },
  wrong: () => {
    tone(200, 0.15, 'sawtooth', 0.12, 0);
    tone(150, 0.2, 'sawtooth', 0.12, 0.15);
  },
  alarm: () => {
    tone(880, 0.15, 'square', 0.12, 0);
    tone(660, 0.15, 'square', 0.12, 0.2);
    tone(880, 0.15, 'square', 0.12, 0.4);
  },
  whoosh: () => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  },
  reveal: () => {
    tone(523, 0.15, 'sine', 0.12, 0);
    tone(659, 0.15, 'sine', 0.12, 0.12);
    tone(784, 0.15, 'sine', 0.12, 0.24);
    tone(1047, 0.4, 'sine', 0.12, 0.36);
  },
  ding: () => tone(1318, 0.15, 'sine', 0.12),
  type: () => tone(1200 + Math.random() * 200, 0.03, 'square', 0.04),
  fanfare: () => {
    tone(392, 0.15, 'square', 0.12, 0);
    tone(392, 0.15, 'square', 0.12, 0.15);
    tone(392, 0.15, 'square', 0.12, 0.3);
    tone(523, 0.15, 'square', 0.12, 0.45);
    tone(659, 0.4, 'square', 0.12, 0.6);
  },
};
