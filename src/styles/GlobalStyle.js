import { css, createGlobalStyle } from 'styled-components';

export const baseInputStyles = css`
  appearance: none;
  background: ${props => props.theme.contentBg};
  border: 1px solid ${props => props.theme.border.default};
  border-radius: 5px;
  color: inherit;
  display: block;
  line-height: inherit;
  width: 100%;
  padding: ${props => props.theme.spacing['2']} ${props => props.theme.spacing['3']};
`;

export const baseInputFocus = css`
  box-shadow: ${props => props.theme.boxShadow.outline};
`;

export const baseInputInvalid = css`
  border-width: 1px;
  border-color: ${props => props.theme.border.danger};
`;

const GlobalStyle = createGlobalStyle`
  html {
    color: ${props => props.theme.text.primary};
    background-color: ${props => props.theme.html};
    box-sizing: border-box;
    font-size: 10px;
    font-family: ${props => props.theme.fontFamily.sans};
    box-shadow: ${props => props.theme.boxShadow.default};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: ${props => props.theme.fontSize.base};
    line-height: ${props => props.theme.lineHeight.relaxed};
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.link};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${props => props.theme.fontFamily.barlow};
  }

  code {
    font-family: ${props => props.theme.fontFamily.mono}
  }

  input,
  textarea {
    ${baseInputStyles}

    &:focus {
      outline: none;
      ${baseInputFocus}
    }

    &.is-invalid {
      ${baseInputInvalid}
    }
  }

  .button,
  button {
    appearance: none;
    background-color: ${props => props.theme.contentBg};
    color: ${props => props.theme.text.primary};
    border: 1px solid ${props => props.theme.border.default};
    font-size: ${props => props.theme.fontSize.lg};
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: 0;
      box-shadow: ${props => props.theme.boxShadow.outline};
    }
  }
`;
export default GlobalStyle;
