import colors from './colors';
import spacing from './spacing';
import { fontSize, fontWeight, fontFamily } from './font';
import boxShadow from './box-shadow';

const reversePropsProps = (props, nestedPropsToSwap) => {
  return Object.entries(props).reduce((reversed, [propName, nestedProps]) => {
    const [nestedPropName1, nestedPropName2] = nestedPropsToSwap;
    const newReverse = reversed;
    newReverse[propName] = {
      [nestedPropName1]: nestedProps[nestedPropName2],
      [nestedPropName2]: nestedProps[nestedPropName1],
    };

    return newReverse;
  }, {});
};

const defaultThemeProps = {
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
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
  html: colors.grey_700,
  texturedBg: colors.indigo_100,
  textureFill: colors.indigo_300,
  contentBg: 'white',
  background: {
    success: colors.cyan_500,
    muted: colors.grey_600,
  },
  text: {
    primary: colors.grey_900,
    secondary: colors.grey_800,
    muted: colors.grey_600,
    danger: colors.red_400,
  },
  border: {
    default: colors.grey_500,
    light: colors.grey_100,
    danger: colors.red_400,
  },
  link: colors.indigo_300,
  buttonStyles: {
    primary: { fg: colors.indigo_500, bg: 'white' },
    danger: { fg: colors.red_500, bg: 'white' },
  },
};

export const darkTheme = {
  ...defaultThemeProps,
  html: colors.grey_900,
  texturedBg: colors.grey_800,
  textureFill: colors.grey_600,
  contentBg: colors.grey_900,
  background: {
    success: colors.cyan_500,
    muted: colors.grey_600,
  },
  text: {
    primary: colors.grey_100,
    secondary: colors.grey_200,
    muted: colors.grey_500,
    danger: colors.red_400,
  },
  border: {
    default: colors.grey_500,
    light: colors.grey_900,
    danger: colors.red_400,
  },
  link: colors.indigo_300,
  buttonStyles: reversePropsProps(lightTheme.buttonStyles, ['fg', 'bg']),
};
