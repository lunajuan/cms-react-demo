/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { trim } from '../lib';
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
  grid-template-columns: 150px 1fr;
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['3']} ${props => props.theme.spacing['4']};

  h3 {
    margin: 0 0 ${props => props.theme.spacing['2']};
  }

  p {
    margin: 0;
  }

  .image {
    background-color: ${props => props.theme.colors.grey_200};
    width: 150px;
    height: 150px;
  }

  .image-author {
    display: block;
    overflow-x: hidden;
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
              const { id, title, description, image_url, image_author, image_author_url } = product;
              return (
                <Item key={id}>
                  <div>
                    <img
                      className="image"
                      src={image_url || 'https://source.unsplash.com/gJylsVMSf-k/150x150'}
                      alt=""
                    />

                    {image_author && image_author_url ? (
                      <a
                        className="image-author"
                        href={image_author_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <small>{image_author}</small>
                      </a>
                    ) : null}
                  </div>
                  <div className="text">
                    <h3>{title}</h3>
                    <p>{trim(description, 150)}</p>
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
