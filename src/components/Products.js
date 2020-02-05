import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Section = styled.div`
  .controls {
    text-align: center;
  }
`;

const List = styled.div`
  background-color: ${props => props.theme.colors.yellow_050};
  small {
    display: block;
  }

  .heading,
  .message {
    text-align: center;
  }
`;

const Products = props => {
  const { products } = props;
  const hasProducts = products && products.length > 0;

  return (
    <Section>
      <div className="controls">
        <Link to="/form">
          <Button type="button">Add Product</Button>
        </Link>
      </div>

      {/* list of existing products */}
      <List>
        <h2 className="heading">Products</h2>
        {hasProducts ? (
          products.map(product => <li>{product}.title</li>)
        ) : (
          <div className="message">
            <p>
              No Product, Yet! <small>Add new a new product!</small>
            </p>
          </div>
        )}
      </List>
    </Section>
  );
};

export default Products;
