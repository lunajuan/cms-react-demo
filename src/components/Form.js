import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { EditorState, ContentState } from 'draft-js';
import Button from './Button';
import RichTextArea from './RichTextArea';

const createEditorStateFromContent = content => {
  if (typeof content === 'string')
    return EditorState.createWithContent(ContentState.createFromText(content));
};

const FormContainer = styled.form`
  input,
  textarea {
    appearance: none;
    border: 1px solid ${props => props.theme.colors.grey_100};
    border-radius: 5px;
    padding: 0;
    line-height: inherit;
    color: inherit;
    display: block;
    width: 100%;
    padding: ${props => props.theme.spacing['2']} ${props => props.theme.spacing['3']};

    &:focus {
      outline: none;
      box-shadow: ${props => props.theme.boxShadow.outline};
    }
  }

  .field-group {
    display: block;
    margin-bottom: ${props => props.theme.spacing['3']};
  }

  .field-label {
    color: ${props => props.theme.colors.grey_600};
  }
`;

// pass in id
const Form = props => {
  const { addProduct, product, editProduct } = props;
  const browserHistory = useHistory();

  return (
    <>
      <h1>{product ? 'Edit' : 'New'}</h1>

      <Formik
        initialValues={{
          title: product ? product.title : '',
          description: product
            ? createEditorStateFromContent(product.description)
            : EditorState.createEmpty(),
        }}
        onSubmit={values => {
          const { title, description } = values;
          const id = product ? product.id : (+new Date()).toString();
          const allValues = { id, title, description };

          if (product) {
            editProduct(allValues);
          } else {
            addProduct(allValues);
          }

          browserHistory.push('/');
        }}
      >
        {props => {
          const {
            values: { title, description },
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
          } = props;
          return (
            <FormContainer onSubmit={handleSubmit}>
              <label htmlFor="title" className="field-group">
                <span className="field-label">Title</span>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={title}
                  name="title"
                />
                {errors.title && <div id="feedback">{errors.title}</div>}
              </label>

              <label htmlFor="description" className="field-group">
                <span className="field-label">Description</span>
                <RichTextArea
                  name="description"
                  value={description}
                  setFieldValue={setFieldValue}
                  setFieldToched={setFieldTouched}
                  charsLimit={500}
                />
              </label>
              <Button type="submit">Submit</Button>
            </FormContainer>
          );
        }}
      </Formik>
    </>
  );
};

export default Form;
