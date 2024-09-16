import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          strong: 'hsl(172, 67%, 45%)',
          hover_strong: 'hsl(172, 67%, 70%)',
          verylightgrayish: 'hsl(189, 41%, 97%)',
          lightgrayish: 'hsl(185, 41%, 84%)',
          grayish: 'hsl(184, 14%, 56%)',
          darkgrayish: 'hsl(186, 14%, 43%)',
          verydark: 'hsl(183, 100%, 15%)',
        },
        white: 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        mono: ['Space Mono', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;
