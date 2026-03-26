import { black, transparent, white } from 'tailwindcss/colors';

export const colors = {
  primary: {
    100: '#FE3C00',
    80: '#FE6333',
    60: '#FE8A66',
    40: '#FFB199',
    20: '#FFD8CC',
  },
  neutral: {
    100: '#171616',
    80: '#454545',
    60: '#747373',
    40: '#A2A2A2',
    20: '#D1D0D0',
  },

  alert: {
    success: { 1: '#2DAC3E', 2: '#ABDEB1' },
    error: { 1: '#DE3737', 2: '#FFD2D2' },
    warning: { 1: '#E1CF36', 2: '#FFFACB' },
  },
  white,
  black,
  transparent,
} as const;
