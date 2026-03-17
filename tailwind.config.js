/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0d1117',
          card: '#161b22',
          input: '#21262d',
          border: '#30363d',
        },
        accent: {
          DEFAULT: '#e94560',
          hover: '#ff6b81',
        },
        txt: {
          DEFAULT: '#e6edf3',
          dim: '#8b949e',
        },
        ok: '#3fb950',
        warn: '#d29922',
        fail: '#f85149',
        info: '#58a6ff',
        purple: '#bc8cff',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['Cascadia Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}