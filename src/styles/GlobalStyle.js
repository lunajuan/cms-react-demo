import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${props => props.theme.colors.indigo_050};
    border-bottom: 1px solid ${props => props.theme.colors.indigo_200};
    border-top: 1px solid ${props => props.theme.colors.indigo_200};
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
    line-height: 2;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.cyan_600};
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

`;

export default GlobalStyle;
