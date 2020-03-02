import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, NavLink, useLocation } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Container from './components/Container';
import NotFound from './components/NotFound';
import Products from './components/Products';
import Form from './components/Form';
import EditForm from './components/EdifForm';
import Button from './components/Button';
import { removeIndex } from './lib';

const Nav = () => {
  const { pathname } = useLocation();

  if (pathname === '/') return null;

  return (
    <NavLink exact to="/">
      All Products
    </NavLink>
  );
};

const App = () => {
  // use history to store products at different points in time to be able to
  // undo.
  const [history, setHistory] = useState([
    [
      {
        id: 'cool-shirt',
        title: 'Cool Shirt',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      },
      {
        id: 'awesome-shirt',
        title: 'Awesome Shirt',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      },
    ],
  ]);
  const [historyPosition, setHistoryProsition] = useState(0);
  const [canUndo, setCanUndo] = useState(false);

  const addProduct = useCallback(
    product => {
      // grab a fresh cloned copy of the history in case we reverted back to a
      // previous position. This guarantees we don't include all the records
      // that were "undone".
      const newHistory = history.slice(0, historyPosition + 1);
      // We need the most current list of products that we will gather with out
      // new product we want to add
      const currentListOfProducts = newHistory[newHistory.length - 1] || [];
      // create a new array of all the products from before and the new product
      // included.
      const updatedProducts = [...currentListOfProducts, product];

      // Add the new list of products to our new history.
      newHistory.push(updatedProducts);

      // set all our states
      setHistory(newHistory);
      setHistoryProsition(newHistory.length - 1);
      setCanUndo(true);
    },
    [history, historyPosition]
  );

  const removeProduct = useCallback(
    index => {
      const newHistory = history.slice(0, historyPosition + 1);
      // We need the most current list of products that we will gather with out
      // new product we want to add
      const currentListOfProducts = newHistory[newHistory.length - 1] || [];
      if (!currentListOfProducts.length) return;

      const updatedProducts = removeIndex(currentListOfProducts, index);
      newHistory.push(updatedProducts);

      setHistory(newHistory);
      setHistoryProsition(newHistory.length - 1);
      setCanUndo(true);
    },
    [history, historyPosition]
  );

  const undo = useCallback(() => {
    // if we have to check if there is even any history to undo or if we can
    // undo at all.
    if (!history.length || !canUndo) return;

    // Set state of the position. This does not remove any array of products
    // from the history but rather the current position, wich will appear like
    // we removed it since our re-render will display the products at that
    // position.
    setHistoryProsition(historyPosition - 1);
    setCanUndo(false);
  }, [canUndo, history, historyPosition]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              {canUndo ? <Button onClick={() => undo()}>Undo</Button> : null}
              <Products products={history[historyPosition] || []} removeProduct={removeProduct} />
            </Route>
            <Route path="/product/new">
              <Form addProduct={addProduct} />
            </Route>
            <Route path="/product/edit/:id">
              <EditForm products={history[historyPosition]} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
