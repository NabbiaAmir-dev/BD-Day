/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        electric: '#0066ff',
        neon: '#a855f7',
        sunshine: '#ffd60a',
        tangerine: '#ff7a00',
        hotpink: '#ff2d87',
        cyan: '#00e5ff',
      },
      fontFamily: {
        display: ['"Bungee"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-mid': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'shake-hard': 'shakeHard 0.4s ease-in-out',
        'wiggle': 'wiggle 0.6s ease-in-out infinite',
        'pop-in': 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'blink': 'blink 1s step-end infinite',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'tilt': 'tilt 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'rise': 'rise 4s ease-in forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 45, 135, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 45, 135, 0.9)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px) rotate(-1deg)' },
          '75%': { transform: 'translateX(8px) rotate(1deg)' },
        },
        shakeHard: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0)' },
          '20%': { transform: 'translate(-10px, 5px) rotate(-2deg)' },
          '40%': { transform: 'translate(10px, -5px) rotate(2deg)' },
          '60%': { transform: 'translate(-8px, 3px) rotate(-1deg)' },
          '80%': { transform: 'translate(8px, -3px) rotate(1deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        popIn: {
          '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        rise: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '100%': { transform: 'translateY(-20vh)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
