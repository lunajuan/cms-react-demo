import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import colors from '../styles/colors';
// Color inline styles are mutually exclusive. Meaning they can't exist at the
// same time so enabling one should disable all others.

export const colorStyles = [
  { label: 'Indigo 500', styleName: 'indigo_500', style: { color: colors.indigo_500 } },
  { label: 'Red 500', styleName: 'red_500', style: { color: colors.red_500 } },
  { label: 'Grey 900', styleName: 'grey_900', style: { color: colors.grey_900 } },
  { label: 'Grey 800', styleName: 'grey_800', style: { color: colors.grey_800 } },
  { label: 'Grey 700', styleName: 'grey_700', style: { color: colors.grey_700 } },
  { label: 'Grey 600', styleName: 'grey_600', style: { color: colors.grey_600 } },
  { label: 'Grey 500', styleName: 'grey_500', style: { color: colors.grey_500 } },
  { label: 'Grey 400', styleName: 'grey_400', style: { color: colors.grey_400 } },
  { label: 'Grey 300', styleName: 'grey_300', style: { color: colors.grey_300 } },
  { label: 'Grey 200', styleName: 'grey_200', style: { color: colors.grey_200 } },
  { label: 'Grey 100', styleName: 'grey_100', style: { color: colors.grey_100 } },
];

const useCustomEditorStyles = () => {
  const { text: textThemeProps } = useContext(ThemeContext);
  const textColorStyles = Object.entries(textThemeProps).reduce(
    (styles, [styleName, colorValue]) => {
      const newStyles = styles;
      newStyles.push({ label: `${styleName} text color`, styleName, style: { color: colorValue } });
      return newStyles;
    },
    []
  );

  return { textColorStyles: [...textColorStyles, ...colorStyles] };
};

export default useCustomEditorStyles;
