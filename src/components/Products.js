/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import useCustomEditorStyles from '../hooks/useCustomEditorStyles';
import Button from './Button';

const parseRichText = (content, inlineStyles) => {
  const contentState = content.blocks ? convertFromRaw(content) : content;

  const options = {
    inlineStyles,
  };
  return stateToHTML(contentState, options);
};

const ProductsSection = styled.section`
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

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
  grid-template-areas:
    'image title'
    'image controls'
    'description description';
  grid-gap: ${props => props.theme.spacing['4']};
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['4']};
  margin: ${props => props.theme.spacing['8']} 0;
  border: 1px solid ${props => props.theme.border.light};

  @media (min-width: 700px) {
    grid-row-gap: 0;
    grid-column-gap: ${props => props.theme.spacing['8']};

    grid-template-areas:
      'image title'
      'image description'
      'image controls';
  }

  h3 {
    margin: 0 0 ${props => props.theme.spacing['2']};
  }

  p {
    margin: 0;
  }
  .image-container {
    grid-area: image;
    justify-self: end;
  }

  .image {
    display: block;
    background-color: ${props => props.theme.muted};
    width: 150px;
    height: 150px;
  }

  .title {
    grid-area: title;
    display: flex;
    align-items: flex-end;
    font-size: ${props => props.theme.fontSize['2xl']};

    @media (min-width: 700px) {
      display: block;
    }
  }

  .description {
    grid-area: description;
  }

  .controls {
    grid-area: controls;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    @media (min-width: 700px) {
      justify-content: flex-end;
    }
  }

  .control {
    border-radius: ${props => props.theme.radius.full};
    font-size: ${props => props.theme.fontSize.sm};
    margin: 0 ${props => props.theme.spacing['1']};
  }
`;

const Products = props => {
  const { products, removeProduct } = props;
  const { textColorStyles, getCustomSyleMapInstructions } = useCustomEditorStyles();
  const inlineStyles = getCustomSyleMapInstructions(cssProps => ({ style: cssProps }))(
    textColorStyles
  );

  const hasProducts = products && products.length > 0;

  return (
    <ProductsSection>
      <header className="section-header">
        <h2 className="heading">All Products</h2>
        <div className="controls">
          <Button to="/product/new">
            <b>+</b> Add Product
          </Button>
        </div>
      </header>

      {hasProducts ? (
        <List>
          {products.map(product => {
            const { id, title, description, image_url } = product;
            return (
              <Item key={id}>
                <div className="image-container">
                  <img
                    className="image"
                    src={image_url || 'https://source.unsplash.com/gJylsVMSf-k/150x150'}
                    alt=""
                  />
                </div>
                <h3 className="title">{title}</h3>
                {typeof description === 'string' ? (
                  <p className="description">{description}</p>
                ) : (
                  <div
                    className="description"
                    // if we didn't trust the html string then we would sanitize
                    //   here or before saving the data.
                    //   eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: parseRichText(description, inlineStyles),
                    }}
                  />
                )}
                <div className="controls">
                  <Button className="control" to={`/product/edit/${id}`} buttonStyle="muted">
                    Edit
                  </Button>
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
  );
};

export default Products;
