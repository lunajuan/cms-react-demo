import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { FlashProvider } from './FlashContext'
import GlobalStyle from '../styles/GlobalStyle'
import { lightTheme, darkTheme } from '../styles/theme'
import { Mode } from '../hooks/useDarkMode'

type Props = {
  themeMode: Mode
}

function Providers({ children, themeMode }: PropsWithChildren<Props>) {
  const theme = themeMode === 'light' ? lightTheme : darkTheme

  // @TODO: remove styled-components when completely converted over to Tailwind.
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FlashProvider>{children}</FlashProvider>
    </ThemeProvider>
  )
}

export default Providers
