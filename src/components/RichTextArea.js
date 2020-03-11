import React, { useState, useCallback } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import styled from 'styled-components';
import CharLimit from './CharLimit';
import colors from '../styles/colors';

const EditorWrapper = styled.div`
  .DraftEditor-root {
    appearance: none;
    border: 1px solid ${props => props.theme.colors.grey_100};
    border-radius: 5px;
    color: inherit;
    display: block;
    line-height: inherit;
    resize: none;
    width: 100%;
    padding: ${props => props.theme.spacing['2']} ${props => props.theme.spacing['3']};
  }

  &.is-focused {
    .DraftEditor-root {
      box-shadow: ${props => props.theme.boxShadow.outline};
    }
  }

  &.is-invalid {
    .DraftEditor-root {
      border-width: 2px;
      border-color: ${props => props.theme.colors.red_400};
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
    color: ${props => props.theme.colors.grey_700};
    border: 1px solid ${props => props.theme.colors.grey_700};
    padding: ${props => props.theme.spacing['1']};
    font-size: ${props => props.theme.fontSize.xs};
    font-weight: ${props => props.theme.fontWeight.bold};
    margin-right: ${props => props.theme.spacing['1']};
    min-width: 25px;

    &:hover,
    &.is-active {
      color: white;
      background-color: ${props => props.theme.colors.grey_700};
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

// Color inline styles are mutually exclusive. Meaning they can't exist at the
// same time so enabling one should disable all others.
export const colorStyles = [
  { label: 'Indigo 500', styleName: 'indigo_500', style: { color: colors.indigo_500 } },
  { label: 'Red 500', styleName: 'red_500', style: { color: colors.red_500 } },
  { label: 'Grey 900', styleName: 'grey_900', style: { color: colors.grey_900 } },
  { label: 'Grey 800', styleName: 'grey_800', style: { color: colors.grey_800 } },
  { label: 'Grey 700', styleName: 'grey_700', style: { color: colors.grey_700 } },
  { label: 'Grey 600', styleName: 'grey_600', style: { color: colors.grey_600 } },
  { label: 'Grey 500', styleName: 'grey_500', style: { color: colors.grey_500 } },
  { label: 'Grey 400', styleName: 'grey_400', style: { color: colors.grey_400 } },
  { label: 'Grey 300', styleName: 'grey_300', style: { color: colors.grey_300 } },
  { label: 'Grey 200', styleName: 'grey_200', style: { color: colors.grey_200 } },
  { label: 'Grey 100', styleName: 'grey_100', style: { color: colors.grey_100 } },
];

// We'll need some custom styles to register with draft. In my case I only need
// colors so we'll use the colorStyles to build the custom style map.
// https://draftjs.org/docs/advanced-topics-inline-styles#mapping-a-style-string-to-css
const customColorStyles = colorStyles.reduce((map, { styleName, style }) => {
  const updatedMap = map;
  updatedMap[styleName] = style;
  return updatedMap;
}, {});

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

const controlButtons = (styles, toggle, currentStyles) => {
  return styles.map(styleProps => {
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
          toggle(styleName);
        }}
      >
        {label}
      </button>
    );
  });
};

const colorButton = toggle => {
  return colorStyles.map(styleProps => {
    const { label, styleName, style } = styleProps;
    return (
      <button
        key={label}
        type="button"
        className="color-button"
        style={{ backgroundColor: style.color }}
        onClick={e => {
          e.preventDefault();
          toggle(styleName);
        }}
      >
        {label}
      </button>
    );
  });
};

const RichTextArea = props => {
  const { name, value: editorState, setFieldValue, setFieldTouched, charsLimit, isInvalid } = props;
  const [isFocused, setFocus] = useState(false);

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
      const nextContentState = colorStyles.reduce((contentState, style) => {
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
    [editorState, onChange]
  );

  const wrapperClasses = [];
  if (isFocused) wrapperClasses.push('is-focused');
  if (isInvalid) wrapperClasses.push('is-invalid');

  return (
    <EditorWrapper className={wrapperClasses.length ? wrapperClasses.join(' ') : null}>
      <Controls>
        <div className="buttons">
          <div className="default-buttons">
            {controlButtons(inlineStyles, toggleInlineStyle, getCurrentInlineStyles(editorState))}
            {controlButtons(blockStyles, toogleBlockType, getCurrentBlockStyle(editorState))}
          </div>
          <div className="color-buttons"> {colorButton(toggleColorStyle)}</div>
        </div>
      </Controls>
      <Editor
        editorState={editorState}
        customStyleMap={customColorStyles}
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
