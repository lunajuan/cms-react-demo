import React, { useState } from 'react';
import styled from 'styled-components';

const FlashContext = React.createContext();

const Flash = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid ${props => props.theme.colors.grey_500};
  border-radius: 5px 5px 0 0;
  padding: ${props => props.theme.spacing['2']};
`;

export const FlashProvider = props => {
  const { children } = props;
  const [message, setMessage] = useState('Welcome to this Demo!');

  return (
    <FlashContext.Provider value={{ setMessage }}>
      {message ? <Flash>{message}</Flash> : null}
      {children}
    </FlashContext.Provider>
  );
};

export default FlashContext;
