import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  font-size: ${props => props.theme.fontSize['4xl']};
  text-align: center;
  margin: ${props => props.theme.spacing['8']};
  text-transform: uppercase;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.text.muted};
`;

const NotFound = () => {
  return <Text>Not Found!</Text>;
};

export default NotFound;
