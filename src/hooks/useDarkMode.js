// https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/#article-header-id-4
import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [isThemeSet, setIsThemeSet] = useState(false);

  const setMode = mode => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode('light');
    }

    setIsThemeSet(true);
  }, []);

  return [theme, toggleTheme, isThemeSet];
};

export default useDarkMode;
