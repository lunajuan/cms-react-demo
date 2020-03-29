import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  background-color: ${props => props.theme.contentBg};
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['5']};
  min-height: 100%;

  .heading {
    text-align: center;
    margin-bottom: 0;
  }

  .sub-heading {
    text-align: center;
    margin-top: 0;
  }
`;

const Header = styled.header``;

const Content = props => {
  const { children } = props;

  return (
    <Main>
      <Header>
        <h1 className="heading">Mini React CMS Demo</h1>
        <p className="sub-heading">Rich Text Editor</p>
      </Header>

      {children}
    </Main>
  );
};

export default Content;
