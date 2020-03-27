import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  background-color: white;
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['4']};
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;

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

const Body = styled.main`
  padding: ${props => props.theme.spacing['4']};
`;

const Container = props => {
  const { children } = props;

  return (
    <Content>
      {/* header */}
      <Header>
        <h1 className="heading">Mini React CMS Demo</h1>
        <p className="sub-heading">Rich Text Editor</p>
      </Header>

      {/* app sample goes in here */}
      <Body>{children}</Body>
    </Content>
  );
};

export default Container;
