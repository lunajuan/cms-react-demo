import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
// Color inline styles are mutually exclusive. Meaning they can't exist at the
// same time so enabling one should disable all others.

const getCustomSyleMapInstructions = getStyleValue => styles =>
  styles.reduce((customMap, style) => {
    const { styleName, style: cssStyles } = style;
    const updatedMap = customMap;
    updatedMap[styleName] = getStyleValue(cssStyles);
    return updatedMap;
  }, {});

const useCustomEditorStyles = () => {
  const { text: textThemeProps } = useContext(ThemeContext);
  const textColorStyles = Object.entries(textThemeProps).reduce(
    (styles, [styleName, colorValue]) => {
      const newStyles = styles;
      // remove primary because it is the default text color. This will probably
      // break easily so change to better solution
      if (styleName === 'primary') return styles;

      newStyles.push({ label: `${styleName} text color`, styleName, style: { color: colorValue } });
      return newStyles;
    },
    []
  );

  return { textColorStyles, getCustomSyleMapInstructions };
};

export default useCustomEditorStyles;
