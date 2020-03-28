/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Button from './Button';
import { colorStyles } from './RichTextArea';

const parseContentState = contentState => {
  const options = {
    inlineStyles: colorStyles.reduce((map, styleProps) => {
      const updatedMap = map;
      const { styleName, style } = styleProps;
      updatedMap[styleName] = { style };
      return updatedMap;
    }, {}),
  };

  return stateToHTML(contentState, options);
};

const parseRichText = content =>
  content.blocks ? parseContentState(convertFromRaw(content)) : parseContentState(content);

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
    background-color: ${props => props.theme.muted};
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
            {products.map(product => {
              const { id, title, description, image_url } = product;
              return (
                <Item key={id}>
                  <div>
                    <img
                      className="image"
                      src={image_url || 'https://source.unsplash.com/gJylsVMSf-k/150x150'}
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <h3>{title}</h3>
                    {typeof description === 'string' ? (
                      <p>{description}</p>
                    ) : (
                      <div
                        // if we didn't trust the html string then we would sanitize
                        //   here or before saving the data.
                        //   eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: parseRichText(description),
                        }}
                      />
                    )}
                  </div>
                  <div className="controls">
                    <Link to={`/product/edit/${id}`}>
                      <Button className="control">Edit</Button>
                    </Link>
                    <Button
                      className="control"
                      buttonStyle="danger"
                      onClick={() => removeProduct(product)}
                    >
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
