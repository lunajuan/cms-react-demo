// https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/#article-header-id-4
import { useEffect, useState, useCallback } from 'react';

const checkLocalStorageAvailability = () => {
  try {
    const test = 'test';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [isThemeSet, setIsThemeSet] = useState(false);
  const isLocalStorageAvailable = checkLocalStorageAvailability();

  const setMode = useCallback(
    mode => {
      if (isLocalStorageAvailable) window.localStorage.setItem('theme', mode);
      setTheme(mode);
    },
    [isLocalStorageAvailable]
  );

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = isLocalStorageAvailable ? window.localStorage.getItem('theme') : null;

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !localTheme
    ) {
      setMode('dark');
    } else if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode('light');
    }

    setIsThemeSet(true);
  }, [isLocalStorageAvailable, setMode]);

  return [theme, toggleTheme, isThemeSet];
};

export default useDarkMode;
