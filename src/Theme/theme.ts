import { colors } from '../utils/colors';

export const theme = {
  // colors,
  shadows: {
    primary: `0 0 10px ${colors.primary}`,
    secondary: `0 0 10px ${colors.boxShadow}`,
  },
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif',
    sizes: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: '700',
      },
      h2: {
        fontSize: '2.0rem',
        fontWeight: '600',
      },
      h3: {
        fontSize: '1.6rem',
        fontWeight: '500',
      },
    },
  },
  cursorType: 'pointer' as "pointer" | "default" | undefined,
  font: {
    this: '300',
    regular: '400',
    bold: '600',
  },
  fontSize: {
    xxs: '1rem',
    xs: '1.2rem',
    s: '1.6rem',
    m: '2.1rem',
    l: '2.4rem',
    xl: '4rem',
  },
  media: {
    phone: '@media(max-width: 520px)',
    tablet: '@media(max-width: 768px)',
    landscape: '@media(max-width: 736px) and (orientation: landscape) ',
  },
};
