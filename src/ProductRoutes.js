import React, { useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, useLocation } from 'react-router-dom';
import sampleData from './sample-data';
import useHistory from './hooks/useHistory';
import NotFound from './components/NotFound';
import Products from './components/Products';
import Form from './components/Form';
import EditForm from './components/EdifForm';
import { removeIndex } from './lib';

const ProductNav = () => {
  const { pathname } = useLocation();

  if (pathname === '/') return null;

  return (
    <NavLink exact to="/">
      All Products
    </NavLink>
  );
};
const ProductRoutes = () => {
  const { getCurrentHistory: getCurrentProducts, updateHistory } = useHistory([[...sampleData]]);

  const addProduct = useCallback(
    product => {
      const { title } = product;
      const currentProducts = getCurrentProducts([]);
      const updatedProducts = [...currentProducts, product];
      updateHistory({ updatedProducts, flashMessage: `${title} Added!` });
    },
    [getCurrentProducts, updateHistory]
  );

  const removeProduct = useCallback(
    index => {
      const currentListOfProducts = getCurrentProducts();
      const updatedProducts = removeIndex(currentListOfProducts, index);
      updateHistory({ updatedProducts });
    },
    [getCurrentProducts, updateHistory]
  );

  const editProduct = useCallback(
    product => {
      const { id, title } = product;
      const currentProductsCopy = [...getCurrentProducts()];

      const productIndex = currentProductsCopy.findIndex(({ id: productId }) => productId === id);
      if (productIndex === -1) return;

      currentProductsCopy[productIndex] = product;
      updateHistory({ updatedProducts: currentProductsCopy, flashMessage: `${title} Updated!` });
    },
    [getCurrentProducts, updateHistory]
  );

  return (
    <Router>
      <ProductNav />
      <Switch>
        <Route exact path="/">
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
    </Router>
  );
};

export default ProductRoutes;
