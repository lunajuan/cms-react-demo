import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { FlashProvider } from './components/FlashContext';
import Container from './components/Container';
import ProductRoutes from './ProductRoutes';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <FlashProvider>
        <Container>
          <ProductRoutes />
        </Container>
      </FlashProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
