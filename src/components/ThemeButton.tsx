import React from 'react'
import { Mode } from '../hooks/useDarkMode'
import { TertiaryButton } from './NewButton'

type Props = {
  theme: Mode
  toggleTheme: () => void
  className?: string
}

function ThemeButton({ theme, className, toggleTheme }: Props) {
  return (
    <TertiaryButton rounded onClick={toggleTheme} className={className}>
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </TertiaryButton>
  )
}

export default ThemeButton
