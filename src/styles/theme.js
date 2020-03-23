import colors from './colors';
import spacing from './spacing';
import { fontSize, fontWeight, fontFamily } from './font';
import boxShadow from './box-shadow';

const defaultThemeProps = {
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  colors,
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  radius: {
    sm: '0.2rem',
    default: '0.4rem',
    md: '0.6rem',
    lg: '0.8rem',
    full: '9999px',
  },
  boxShadow,
};

export const lightTheme = {
  ...defaultThemeProps,
  html: colors.grey_900,
  body: colors.grey_100,
  bodyBorder: colors.grey_500,
  bodyImageFill: colors.grey_300.replace('#', '%23'),
  textPrimary: colors.grey_900,
  buttonStyles: {
    primary: { fg: colors.indigo_500, bg: 'white' },
    danger: { fg: colors.red_500, bg: 'white' },
  },
};

export const darkTheme = {
  ...defaultThemeProps,
  html: colors.grey_900,
  textPrimary: colors.grey_050,
  buttonStyles: Object.entries(lightTheme.buttonStyles).reduce(
    (darkThemeButtons, lightThemeButton) => {
      const [buttonType, buttonColors] = lightThemeButton;
      darkThemeButtons[buttonType] = { fg: buttonColors.bg, bg: buttonColors.fg };
      return darkThemeButtons;
    },
    {}
  ),
};
