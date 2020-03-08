import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import FlashContext, { FlashProvider } from './components/FlashContext';
import Container from './components/Container';
import ProductRoutes from './ProductRoutes';

const RandomFlash = () => {
  const { setFlash } = useContext(FlashContext);
  return (
    <button type="button" onClick={() => setFlash('Random Flash')}>
      Show Flash
    </button>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FlashProvider>
        <Container>
          <RandomFlash />
          <ProductRoutes />
        </Container>
      </FlashProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
