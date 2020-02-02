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
        <code>
          <span role="img" aria-label="festive emoji">
            🥳
          </span>{' '}
          Sample App Here!
        </code>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
