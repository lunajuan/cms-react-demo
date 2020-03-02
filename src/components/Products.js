import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
// import List from './List';

const Section = styled.div`
  .controls {
    text-align: center;
  }
`;

const ProductsSection = styled.div`
  small {
    display: block;
  }

  .heading,
  .message {
    text-align: center;
  }
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['3']} ${props => props.theme.spacing['4']};

  h3 {
    margin: 0 0 ${props => props.theme.spacing['2']};
  }

  p {
    margin: 0;
  }

  .placeholder-image {
    background-color: ${props => props.theme.colors.grey_200};
    width: 150px;
    height: 150px;
  }

  .text {
    padding: ${props => props.theme.spacing['3']};
  }

  .controls {
    text-align: right;
    grid-column-start: 2;
  }

  .control {
    border-radius: ${props => props.theme.radius.full};
    font-size: ${props => props.theme.fontSize.sm};
    margin: 0 ${props => props.theme.spacing['1']};
  }
`;

const Products = props => {
  const { products, removeProduct } = props;
  const hasProducts = products && products.length > 0;

  return (
    <Section>
      <div className="controls">
        <Link to="/product/new">
          <Button type="button">Add Product</Button>
        </Link>
      </div>

      {/* list of existing products */}
      <ProductsSection>
        <h2 className="heading">Products</h2>

        {hasProducts ? (
          <List>
            {products.map((product, i) => {
              const { title, description, id } = product;
              return (
                <Item key={title}>
                  <div className="placeholder-image" />
                  <div className="text">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <div className="controls">
                    <Link to={`/product/edit/${id}`}>
                      <Button className="control">Edit</Button>
                    </Link>
                    <Button className="control" danger onClick={() => removeProduct(i)}>
                      Delete
                    </Button>
                  </div>
                </Item>
              );
            })}
          </List>
        ) : (
          <div className="message">
            <p>
              No Product, Yet! <small>Add new a new product!</small>
            </p>
          </div>
        )}
      </ProductsSection>
    </Section>
  );
};

export default Products;
