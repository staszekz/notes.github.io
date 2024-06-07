import { colors } from '../utils/colors';

export const theme = {
  colors,
  fontFamily: 'Nunito, sans-serif', // 'Roboto, sans-serif
  headings: {
    fontFamily: 'Nunito, sans-serif',
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
