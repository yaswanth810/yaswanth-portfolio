import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#080A12',
        'accent-teal': '#64C8FF',
        'accent-blue': '#3C78DC',
        'text-primary': '#F0F5FF',
        'text-muted': '#5A6EA0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['GeistMono', 'ui-monospace', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
