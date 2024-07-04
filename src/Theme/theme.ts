import { colors } from '../utils/colors';

export const theme = {
  colors,
  shadows: {
    primary: `0 0 10px ${colors.primary}`,
    secondary: `0 0 10px ${colors.boxShadow}`,
  },
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif',
    sizes: {
      h1: '3.5rem',
      h2: '3.0rem',
      h3: '2.4rem',
      h4: '2rem',
      h5: '1.8rem',
      h6: '1.6rem',
    },
  },
  font: {
    this: 300,
    regular: 400,
    bold: 600,
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
