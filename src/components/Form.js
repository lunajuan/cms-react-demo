import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import Button from './Button';
import RichTextArea from './RichTextArea';

const NUMBER_OF_IMAGES = 4;

const createEditorStateFromContent = content => {
  let contentState;
  if (typeof content === 'string') {
    contentState = ContentState.createFromText(content);
  } else if (content.blocks) {
    contentState = convertFromRaw(content);
  } else {
    contentState = content;
  }

  return EditorState.createWithContent(contentState);
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

    &.is-invalid {
      border-width: 2px;
      border-color: ${props => props.theme.colors.red_400};
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

const Error = styled.span`
  margin: ${props => props.theme.spacing['2']};
  color: ${props => props.theme.colors.red_400};
`;

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('* required'),
  description: Yup.mixed().test('is-empty', '* Required', value =>
    value.getCurrentContent().hasText()
  ),
});

// pass in id
const Form = props => {
  const { addProduct, product, editProduct } = props;
  const browserHistory = useHistory();
  const [imagePreviewUrl] = useState(product && product.image_url ? product.image_url : null);
  const [imageOptions, setImageOptions] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (imageOptions) return;

    setIsFetching(true);
    const numberOfImages = imagePreviewUrl ? NUMBER_OF_IMAGES - 1 : NUMBER_OF_IMAGES;
    const fetchImagePromise = Array(numberOfImages)
      .fill()
      .map((_, index) =>
        fetch(`https://source.unsplash.com/collection/345710/150x150?sig=${index}`)
      );

    Promise.all(fetchImagePromise).then(imageRes => {
      const imageUrls = imageRes.map(res => res.url);
      setImageOptions(imageUrls);
      setIsFetching(false);
    });
  }, [imageOptions, imagePreviewUrl]);

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
        validationSchema={ProductSchema}
        validateOnChange={false}
        onSubmit={values => {
          const { title, description } = values;
          const id = product ? product.id : (+new Date()).toString();
          const allValues = { id, title, description: description.getCurrentContent() };

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
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
          } = props;

          const titleInvalid = errors.title && touched.title;
          const descriptionInvalid = errors.description && touched.description;

          return (
            <FormContainer onSubmit={handleSubmit}>
              {imagePreviewUrl && <img src={imagePreviewUrl} alt="" />}
              <label htmlFor="title" className="field-group">
                <span className="field-label">
                  Title{titleInvalid ? <Error>{errors.title}</Error> : null}
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={title}
                  name="title"
                  className={titleInvalid ? 'is-invalid' : null}
                />
              </label>

              <label htmlFor="description" className="field-group">
                <span className="field-label">
                  Description{descriptionInvalid ? <Error>{errors.description}</Error> : null}
                </span>
                <RichTextArea
                  name="description"
                  value={description}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  charsLimit={500}
                  isInvalid={descriptionInvalid}
                />
              </label>
              <div>
                {isFetching && 'Fetching Images..'}
                {/* eslint-disable-next-line react/no-array-index-key */}
                {imageOptions && imageOptions.map((url, i) => <img key={i} src={url} alt="" />)}
              </div>
              <Button type="submit">Submit</Button>
            </FormContainer>
          );
        }}
      </Formik>
    </>
  );
};

export default Form;
