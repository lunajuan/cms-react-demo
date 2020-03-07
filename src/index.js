import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, NavLink, useLocation } from 'react-router-dom';
import sampleData from './sample-data';
import useHistory from './hooks/useHistory';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { FlashProvider } from './components/FlashContext';
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
  const { getCurrentHistory: getCurrentProducts, updateHistory, canUndo, undo } = useHistory([
    [...sampleData],
  ]);

  const addProduct = useCallback(
    product => {
      const currentProducts = getCurrentProducts([]);
      const updatedProducts = [...currentProducts, product];
      updateHistory(updatedProducts);
    },
    [getCurrentProducts, updateHistory]
  );

  const removeProduct = useCallback(
    index => {
      const currentListOfProducts = getCurrentProducts();
      const updatedProducts = removeIndex(currentListOfProducts, index);
      updateHistory(updatedProducts);
    },
    [getCurrentProducts, updateHistory]
  );

  const editProduct = useCallback(
    product => {
      const { id } = product;
      const currentProductsCopy = [...getCurrentProducts()];

      const productIndex = currentProductsCopy.findIndex(({ id: productId }) => productId === id);
      if (productIndex === -1) return;

      currentProductsCopy[productIndex] = product;
      updateHistory(currentProductsCopy);
    },
    [getCurrentProducts, updateHistory]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Router>
          <FlashProvider>
            <Nav />
            <Switch>
              <Route exact path="/">
                {canUndo ? <Button onClick={() => undo()}>Undo</Button> : null}
                <Products products={getCurrentProducts([])} removeProduct={removeProduct} />
              </Route>
              <Route path="/product/new">
                <Form addProduct={addProduct} />
              </Route>
              <Route path="/product/edit/:id">
                <EditForm products={getCurrentProducts([])} editProduct={editProduct} />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </FlashProvider>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
