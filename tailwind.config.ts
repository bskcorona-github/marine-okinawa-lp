import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        okiblue: '#00A0C6',
        deepsea: '#0A2540',
        coral: '#FF6B6B',
        sand: '#F3EAD8',
        foam: '#E6F7FB',
      },
      backgroundImage: {
        'okinawa-sky-sea': 'linear-gradient(180deg, #00C2FF 0%, #0066FF 100%)',
        'okinawa-foam': 'radial-gradient(circle at 20% 20%, rgba(230,247,251,.6), transparent 40%), radial-gradient(circle at 80% 30%, rgba(230,247,251,.6), transparent 35%)'
      }
    },
  },
  plugins: [],
};

export default config;


