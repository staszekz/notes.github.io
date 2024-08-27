import { Button, Title } from '@mantine/core';
import { primary, secondary, dark, grey, red, warning, boxShadow } from '../utils/colors';
import classes from './styles.module.css'

export const theme = {
  colors: {
    primary, secondary, dark, grey, red, warning, boxShadow
  },
  shadows: {
    primary: `0 0 10px ${primary}`,
    secondary: `0 0 10px ${boxShadow}`,
  },
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif',
    textWrap: 'wrap' as "wrap" | "nowrap" | "balance" | "pretty" | "stable" | undefined,
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
  media: {
    phone: '@media(max-width: 520px)',
    tablet: '@media(max-width: 768px)',
    landscape: '@media(max-width: 736px) and (orientation: landscape) ',
  },
  components: {
    Button: Button.extend({
      classNames: {
        root: classes.buttonRoot,
      },
    }),
    Title: Title.extend({
      classNames: {
        root: classes.title,
      }
    })
  }
};
