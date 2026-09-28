/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        git: {
          bg: '#0a0e17',
          surface: '#111827',
          border: '#1f293d',
          green: '#2ea043',
          'green-glow': '#3fb950',
          cyan: '#38bdf8',
          purple: '#a855f7',
          amber: '#f59e0b',
        },
      },
      boxShadow: {
        panel: '0 20px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(46, 160, 67, 0.15)',
        glow: '0 0 30px -5px rgba(46, 160, 67, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(56, 189, 248, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'terminal-blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
