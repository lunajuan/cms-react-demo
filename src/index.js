import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Container from './components/Container';
import Products from './components/Products';
import Form from './components/form';

const App = () => {
  // set state to track all products
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Router>
          <Switch>
            <Route path="/form">
              <NavLink exact to="/">
                All Products
              </NavLink>
              <Form />
            </Route>
            <Route>
              <Products />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
