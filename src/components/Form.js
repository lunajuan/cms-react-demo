import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory, Prompt } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import nprogress from 'nprogress';
import Button from './Button';
import RichTextArea from './RichTextArea';

const NUMBER_OF_IMAGES = 4;
const IMAGE_CONTAINER_CLASS = 'image-container';

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
  .image-preview {
    margin: ${props => props.theme.spacing['6']} 0;
    display: block;
    width: 150px;
    height: 150px;
  }

  .field-group {
    display: block;
    margin: ${props => props.theme.spacing['8']} 0;
  }

  .field-label {
    display: block;
    color: ${props => props.theme.text.muted};
    margin: ${props => props.theme.spacing['3']} 0;
  }

  .${IMAGE_CONTAINER_CLASS} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: ${props => props.theme.spacing['2']};
    justify-content: center;
  }

  .progress-bar {
    min-height: ${props => props.theme.spacing['2']};
    display: block;
  }

  .image-radio {
    position: relative;

    [type='radio'] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    img {
      display: block;
      width: 100%;
      cursor: pointer;
      box-shadow: ${props => props.theme.boxShadow.default};
      border-radius: 5px;

      &:hover {
        box-shadow: ${props => props.theme.boxShadow.lg};
      }
    }

    &.is-selected {
      img {
        box-shadow: none;
      }

      &::after {
        content: '✓';
        color: white;
        background-color: ${props => props.theme.background.success};
        border-radius: ${props => props.theme.radius.full};
        width: 10px;
        height: 10px;
        padding: ${props => props.theme.spacing['3']};
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }
  }
`;

const Error = styled.span`
  margin: ${props => props.theme.spacing['2']};
  color: ${props => props.theme.text.danger};
`;

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('* required'),
  description: Yup.mixed().test('is-empty', '* required', value =>
    value.getCurrentContent().hasText()
  ),
});

const ImageRadioInputs = props => {
  const { name, urls, value, onChange, onBlur, setFieldValue } = props;

  useEffect(() => {
    if (value.length || !urls.length) return;
    setFieldValue(name, urls[0]);
  }, [name, setFieldValue, urls, value.length]);

  return urls.map((url, i) => {
    const key = `${url}${i}`;
    const checked = url === value;
    return (
      <div key={key} className={`image-radio${checked ? ' is-selected' : ''}`}>
        <label htmlFor={key}>
          <input
            id={key}
            type="radio"
            name={name}
            value={url}
            checked={url === value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <img src={url} alt="" />
        </label>
      </div>
    );
  });
};

const FocusOnError = props => {
  const { isValid, isSubmitting, errors, fieldElements } = props;
  useEffect(() => {
    if (!isSubmitting || isValid) return;

    const firstErrorKey = Object.keys(errors)[0];
    const el = fieldElements[firstErrorKey];
    if (!el) return;
    el.focus();
  }, [errors, fieldElements, isSubmitting, isValid]);

  return null;
};

// pass in id
const Form = props => {
  const { addProduct, product, editProduct } = props;
  const browserHistory = useHistory();
  const [imageOptions, setImageOptions] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingErrorMessage, setFetchingErrorMessage] = useState(null);
  const fieldElements = { title: useRef(), description: useRef() };
  const setFieldEl = name => el => {
    fieldElements[name] = el;
  };

  const initialImageUrl = product && product.image_url ? product.image_url : null;

  nprogress.configure({ parent: `.progress-bar` });

  useEffect(() => {
    if (imageOptions) return;
    setIsFetching(true);
    nprogress.start();
    const numberOfImages = initialImageUrl ? NUMBER_OF_IMAGES - 1 : NUMBER_OF_IMAGES;
    const fetchImagePromise = Array(numberOfImages)
      .fill()
      .map((_, index) =>
        fetch(`https://source.unsplash.com/collection/345710/150x150?sig=${index}`)
      );

    Promise.all(fetchImagePromise)
      .then(imageRes => {
        const fetchedUrls = imageRes.map(res => res.url);
        const allUrls = initialImageUrl ? [initialImageUrl, ...fetchedUrls] : fetchedUrls;
        nprogress.done();
        setImageOptions(allUrls);
        setIsFetching(false);
      })
      .catch(() => {
        console.log(
          '🧹 Swipping image fetching error under the rug. In production use error tracking system.'
        );
        nprogress.done();
        setIsFetching(false);
        setFetchingErrorMessage('Unable to retrieve images. Please refresh the page.');
      });
  }, [imageOptions, initialImageUrl]);

  return (
    <>
      <Formik
        initialValues={{
          title: product ? product.title : '',
          description: product
            ? createEditorStateFromContent(product.description)
            : EditorState.createEmpty(),
          image_url: initialImageUrl || '',
        }}
        validationSchema={ProductSchema}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          if (isFetching) {
            setSubmitting(false);
            return;
          }

          const { title, description, image_url } = values;
          const id = product ? product.id : (+new Date()).toString();
          const allValues = { id, title, description: description.getCurrentContent(), image_url };

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
            values: { title, description, image_url },
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
            dirty,
            isSubmitting,
            isValid,
          } = props;

          const titleInvalid = errors.title && touched.title;
          const descriptionInvalid = errors.description && touched.description;

          return (
            <FormContainer onSubmit={handleSubmit}>
              <FocusOnError
                isValid={isValid}
                isSubmitting={isSubmitting}
                errors={errors}
                fieldElements={fieldElements}
              />
              <Prompt when={dirty && !isSubmitting} message="Are you sure you want to leave?" />
              <label htmlFor="title" className="field-group">
                <span className="field-label">
                  Title{titleInvalid ? <Error>{errors.title}</Error> : null}
                </span>
                <input
                  ref={setFieldEl('title')}
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
                  setFieldEl={setFieldEl}
                  isInvalid={descriptionInvalid}
                />
              </label>
              <div className="field-group">
                <span className="field-label">Image</span>
                <span className="progress-bar" />
                {fetchingErrorMessage && <Error>{fetchingErrorMessage}</Error>}
                <div className={IMAGE_CONTAINER_CLASS}>
                  {imageOptions && (
                    <ImageRadioInputs
                      name="image_url"
                      value={image_url}
                      urls={imageOptions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting || isFetching}>
                Submit
              </Button>
            </FormContainer>
          );
        }}
      </Formik>
    </>
  );
};

export default Form;
