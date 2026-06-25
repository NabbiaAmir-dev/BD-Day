import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle';
  life: number;
};

const COLORS = ['#ff2d87', '#a855f7', '#00e5ff', '#ffd60a', '#ff7a00', '#0066ff'];

export function ConfettiBurst({ trigger, count = 80 }: { trigger: number; count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (trigger === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: Math.random() * -18 - 6,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        life: 1,
      });
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      particlesRef.current.forEach((p) => {
        p.vy += 0.4;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 0.008;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

export function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rocketsRef = useRef<
    { x: number; y: number; vx: number; vy: number; color: string; exploded: boolean }[]
  >([]);
  const sparksRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lastLaunch = 0;

    const launchRocket = () => {
      const x = Math.random() * canvas.width;
      rocketsRef.current.push({
        x,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 6 + 10),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
      });
    };

    const explode = (rx: number, ry: number, color: string) => {
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 6 + 2;
        sparksRef.current.push({
          x: rx,
          y: ry,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          color,
          rotation: 0,
          rotationSpeed: 0,
          shape: 'circle',
          life: 1,
        });
      }
    };

    const animate = (t: number) => {
      ctx.fillStyle = 'rgba(10,10,26,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (t - lastLaunch > 600) {
        launchRocket();
        lastLaunch = t;
      }

      rocketsRef.current = rocketsRef.current.filter((r) => !r.exploded && r.y > 0);
      rocketsRef.current.forEach((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.15;
        if (r.vy >= 0) {
          r.exploded = true;
          explode(r.x, r.y, r.color);
        }
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      sparksRef.current = sparksRef.current.filter((s) => s.life > 0);
      sparksRef.current.forEach((s) => {
        s.vy += 0.05;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

const BALLOON_COLORS = ['#ff2d87', '#a855f7', '#00e5ff', '#ffd60a', '#ff7a00', '#0066ff'];

export function FloatingBalloons({ count = 12 }: { count?: number }) {
  const [balloons] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 40 + 30,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 6,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      drift: Math.random() * 40 - 20,
    })),
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-0"
          style={{
            left: `${b.left}%`,
            animation: `rise ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          <svg width={b.size} height={b.size * 1.3} viewBox="0 0 40 52" style={{ transform: `translateX(${b.drift}px)` }}>
            <ellipse cx="20" cy="20" rx="18" ry="20" fill={b.color} opacity="0.85" />
            <ellipse cx="14" cy="14" rx="5" ry="7" fill="rgba(255,255,255,0.4)" />
            <path d="M20 40 L18 44 L22 44 Z" fill={b.color} />
            <path d="M20 44 Q15 48 20 52 Q25 48 20 44" stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="1" />
          </svg>
        </div>
      ))}
    </div>
  );
}
