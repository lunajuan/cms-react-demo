import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import useDarkMode from './hooks/useDarkMode'
import ThemeButton from './components/ThemeButton'
import Background from './layout/Background'
import Container from './styles/Container'
import Content from './components/Content'
import ProductRoutes from './ProductRoutes'
import Providers from './components/Providers'

const App = () => {
  const { theme, toggleTheme, isThemeSet } = useDarkMode()
  // wait till theme has been set to prevent initializing with one theme and
  // immediately switching, creating a flash, to another based on user
  // preference
  if (!isThemeSet) return <div />

  return (
    <Providers themeMode={theme}>
      <Background>
        <Container>
          <ThemeButton
            theme={theme}
            toggleTheme={toggleTheme}
            className="mb-8"
          />
          <Content>{/* <ProductRoutes /> */}</Content>
        </Container>
      </Background>
    </Providers>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
