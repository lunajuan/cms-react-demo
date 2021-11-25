import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import NotificationProvider from './NoficationsContext'
import GlobalStyle from '../styles/GlobalStyle'
import { lightTheme, darkTheme } from '../styles/theme'
import { Mode } from '../hooks/useDarkMode'
import ProductsProvider from './ProductsProvider'

type Props = {
  themeMode: Mode
}

function Providers({ children, themeMode }: PropsWithChildren<Props>) {
  const theme = themeMode === 'light' ? lightTheme : darkTheme

  // @TODO: remove styled-components when completely converted over to Tailwind.
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NotificationProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default Providers
