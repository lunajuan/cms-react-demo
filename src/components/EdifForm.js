import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';
import NotFound from './NotFound';

const EdifForm = props => {
  const { id } = useParams();
  const { products, editProduct } = props;
  const product = products.find(({ id: productID }) => productID === id);

  return <>{product ? <Form product={product} editProduct={editProduct} /> : <NotFound />}</>;
};

export default EdifForm;
