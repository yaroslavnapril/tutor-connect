import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tc: {
          green: '#2d5f3f',
          accent: '#c67b5c',
          bg: '#f5f3ef',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
