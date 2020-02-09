import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Container from './components/Container';
import Products from './components/Products';
import Form from './components/Form';
import Button from './components/Button';

const App = () => {
  // use history to store products at different points in time to be able to
  // undo.
  const [history, setHistory] = useState([]);
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
          <Switch>
            <Route path="/form">
              <NavLink exact to="/">
                All Products
              </NavLink>
              <Form addProduct={addProduct} />
            </Route>
            <Route>
              {canUndo ? <Button onClick={() => undo()}>Undo</Button> : null}
              <Products products={history[historyPosition]} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
