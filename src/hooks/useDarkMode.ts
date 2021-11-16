// https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/#article-header-id-4
import { useEffect, useState } from 'react'

type Mode = 'light' | 'dark'
const THEME = 'theme'

const useDarkMode = () => {
  const [theme, setTheme] = useState<Mode>('light')
  const [isThemeSet, setIsThemeSet] = useState(false)

  const setMode = (mode: Mode) => {
    localStorage.setItem(THEME, mode)
    setTheme(mode)
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  useEffect(() => {
    const localTheme = localStorage.getItem(THEME)
    const osPrefersDark = matchMedia('(prefers-color-scheme: dark)').matches

    if ((osPrefersDark && !localTheme) || localTheme === 'dark') {
      setMode('dark')
    } else {
      setMode('light')
    }
    setIsThemeSet(true)
  }, [])

  return { theme, toggleTheme, isThemeSet }
}

export default useDarkMode
