import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from 'styled-components'
import useDarkMode from './hooks/useDarkMode'
import { lightTheme, darkTheme } from './styles/theme'
import ThemeToggle from './components/ThemeToggle'
import GlobalStyle from './styles/GlobalStyle'
import Background from './styles/Background'
import Container from './styles/Container'
import { FlashProvider } from './components/FlashContext'
import Content from './components/Content'
import ProductRoutes from './ProductRoutes'

const App = () => {
  const { theme, toggleTheme, isThemeSet } = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme
  // wait till theme has been set to prevent initializing with one theme and
  // immediately switching, creating a flash, to another based on user
  // preference
  if (!isThemeSet) return <div />

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <FlashProvider>
        <Background>
          <Container>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Content>
              <ProductRoutes />
            </Content>
          </Container>
        </Background>
      </FlashProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
