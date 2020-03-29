import React, { useState, useCallback } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import styled from 'styled-components';
import useCustomEditorStyles from '../hooks/useCustomEditorStyles';
import { baseInputStyles, baseInputFocus, baseInputInvalid } from '../styles/GlobalStyle';
import CharLimit from './CharLimit';

const EditorWrapper = styled.div`
  .DraftEditor-root {
    ${baseInputStyles}
  }

  &.is-focused {
    .DraftEditor-root {
      ${baseInputFocus}
    }
  }

  &.is-invalid {
    .DraftEditor-root {
      ${baseInputInvalid}
    }
  }

  .public-DraftEditor-content {
    height: 200px;
    overflow: scroll;
  }
`;

const Controls = styled.div`
  button {
    cursor: pointer;
  }

  .default-buttons {
    margin: ${props => props.theme.spacing['2']} 0;
  }

  .default-button {
    appearance: none;
    border: 1px solid ${props => props.theme.border.default};
    padding: ${props => props.theme.spacing['1']};
    font-size: ${props => props.theme.fontSize.xs};
    font-weight: ${props => props.theme.fontWeight.bold};
    margin-right: ${props => props.theme.spacing['1']};
    min-width: 25px;

    &:hover,
    &.is-active {
      color: white;
      background-color: ${props => props.theme.background.muted};
    }
  }

  .color-buttons {
    line-height: 0;
    margin: ${props => props.theme.spacing['2']} 0;
  }

  .color-button {
    appearance: none;
    width: 16px;
    height: 16px;
    font-size: 0px;
    margin-right: ${props => props.theme.spacing['1']};
    padding: 0;
    border: 0;
  }
`;

const inlineStyles = [
  {
    label: 'B',
    styleName: 'BOLD',
    style: { fontWeight: '900' },
  },
  {
    label: 'I',
    styleName: 'ITALIC',
    style: { fontStyle: 'italic' },
  },
  {
    label: 'U',
    styleName: 'UNDERLINE',
    style: { textDecoration: 'underline' },
  },
];

const blockStyles = [
  {
    label: 'Unordered List',
    styleName: 'unordered-list-item',
  },
  {
    label: 'Ordered List',
    styleName: 'ordered-list-item',
  },
];

const editorContentLength = draftEditorState =>
  draftEditorState.getCurrentContent().getPlainText().length;

const getCurrentInlineStyles = draftEditorState => draftEditorState.getCurrentInlineStyle();
const getCurrentBlockStyle = draftEditorState => {
  const selection = draftEditorState.getSelection();
  return draftEditorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
};

/**
 *
 * @param {*} styles
 * @param {*} toggleFn
 * @param {*} currentStyles
 */
const getControlButtons = (styles, toggleFn, currentStyles) =>
  styles.map(styleProps => {
    const { label, styleName, style } = styleProps;
    const isActive =
      typeof currentStyles === 'string'
        ? currentStyles === styleName
        : currentStyles.has(styleName);
    return (
      <button
        key={label}
        type="button"
        style={style || null}
        className={`default-button${isActive ? ' is-active' : ''}`}
        onClick={e => {
          e.preventDefault();
          toggleFn(styleName);
        }}
      >
        {label}
      </button>
    );
  });

/**
 *
 * @param {*} styles
 * @param {*} toggleFn
 */
const getColorButtons = (styles, toggleFn) => {
  return styles.map(styleProps => {
    const { styleName, style } = styleProps;
    return (
      <button
        key={styleName}
        type="button"
        className="color-button"
        style={{ backgroundColor: style.color }}
        onClick={e => {
          e.preventDefault();
          toggleFn(styleName);
        }}
      >
        {styleName}
      </button>
    );
  });
};

const RichTextArea = props => {
  const {
    name,
    value: editorState,
    setFieldValue,
    setFieldTouched,
    charsLimit,
    isInvalid,
    setFieldEl,
  } = props;
  const [isFocused, setFocus] = useState(false);
  const { textColorStyles, getCustomSyleMapInstructions } = useCustomEditorStyles();
  const getCustomStyleMap = getCustomSyleMapInstructions(cssProps => cssProps);

  const initialCharsRemaining = editorContentLength(editorState);
  const [remainingChars, setRemainingChars] = useState(charsLimit - initialCharsRemaining);

  // onChange editor handler. This is where we update the formik field value
  // with the most up-to-date editorState. We can also update state of
  // remainingChars if applicable.
  const onChange = useCallback(
    updatedEditorState => {
      if (charsLimit) setRemainingChars(charsLimit - editorContentLength(updatedEditorState));
      setFieldValue(name, updatedEditorState);
    },
    [charsLimit, setFieldValue, name]
  );

  // https://draftjs.org/docs/quickstart-rich-styling/#richutils-and-key-commands
  const handleKeyCommand = useCallback(
    (command, updatedEditorState) => {
      const newState = RichUtils.handleKeyCommand(updatedEditorState, command);

      if (newState) {
        onChange(newState);
        return 'handled';
      }

      return 'not-handled';
    },
    [onChange]
  );

  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(() => {
    setFocus(false);
    setFieldTouched(name, true);
  }, [name, setFieldTouched]);

  const toggleInlineStyle = useCallback(
    inlineStyle => onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle)),
    [editorState, onChange]
  );

  const toogleBlockType = useCallback(
    blockType => onChange(RichUtils.toggleBlockType(editorState, blockType)),
    [editorState, onChange]
  );

  const toggleColorStyle = useCallback(
    colorStyle => {
      // get the current selection state
      const selection = editorState.getSelection();

      // modifie the contentState by removing all inline styles
      const currentContentState = editorState.getCurrentContent();
      const nextContentState = textColorStyles.reduce((contentState, style) => {
        return Modifier.removeInlineStyle(contentState, selection, style.styleName);
      }, currentContentState);

      let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
      const currentStyle = editorState.getCurrentInlineStyle();

      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, style) => {
          return RichUtils.toggleInlineStyle(state, style);
        }, nextEditorState);
      }

      if (!currentStyle.has(colorStyle)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, colorStyle);
      }

      onChange(nextEditorState);
    },
    [editorState, onChange, textColorStyles]
  );

  const wrapperClasses = [];
  if (isFocused) wrapperClasses.push('is-focused');
  if (isInvalid) wrapperClasses.push('is-invalid');

  return (
    <EditorWrapper className={wrapperClasses.length ? wrapperClasses.join(' ') : null}>
      <Controls>
        <div className="buttons">
          <div className="default-buttons">
            {getControlButtons(
              inlineStyles,
              toggleInlineStyle,
              getCurrentInlineStyles(editorState)
            )}
            {getControlButtons(blockStyles, toogleBlockType, getCurrentBlockStyle(editorState))}
          </div>
          <div className="color-buttons"> {getColorButtons(textColorStyles, toggleColorStyle)}</div>
        </div>
      </Controls>
      <Editor
        ref={setFieldEl('description')}
        editorState={editorState}
        customStyleMap={getCustomStyleMap(textColorStyles)}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        onFocus={onFocus}
        onBlur={onBlur}
        stripPastedStyles
      />
      {charsLimit ? <CharLimit charsLimit={charsLimit} remainingChars={remainingChars} /> : null}
    </EditorWrapper>
  );
};

export default RichTextArea;
