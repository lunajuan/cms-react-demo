import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Container from './components/Container';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <code className="block px-4 py-2 text-red-400 bg-gray-050 text-center flex items-center justify-center">
          <span role="img" aria-label="festive emoji" className="text-4xl mr-3">
            🥳
          </span>{' '}
          Sample App Here!
        </code>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
