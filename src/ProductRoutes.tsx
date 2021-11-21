import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Form from './components/Form'
import EditForm from './components/EdifForm'

const ProductBreadCrumbs = () => {
  const { pathname } = useLocation()

  if (pathname === '/') return null

  return (
    <NavLink exact to="/">
      All Products
    </NavLink>
  )
}

const ProductRoutes = () => (
  <Router>
    <ProductBreadCrumbs />
    <Switch>
      <Route exact path="/">
        <Products />
      </Route>
      {/* <Route path="/product/new">
        <Form addProduct={addProduct} />
      </Route>
      <Route path="/product/edit/:id">
        <EditForm products={getCurrentProducts([])} editProduct={editProduct} />
      </Route> */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
)

export default ProductRoutes
