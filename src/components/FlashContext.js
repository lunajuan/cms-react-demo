import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const FlashContext = React.createContext();

const Flash = styled.div`
  position: fixed;
  bottom: ${props => props.theme.spacing['2']};
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid ${props => props.theme.colors.grey_500};
  border-radius: 5px;
  padding: ${props => props.theme.spacing['2']};

  /* animation */
  transition: transform 400ms;
  transform: translateY(
    ${({ transitionstate }) =>
      transitionstate === 'entering' || transitionstate === 'entered' ? 0 : 150}%
  );
`;

export const FlashProvider = props => {
  const { children } = props;
  const [message, setMessage] = useState('Welcome to this Demo!');
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    if (!message) return undefined;
    return setShowFlash(true);
  }, [message]);

  useEffect(() => {
    if (!showFlash) return undefined;

    const timer = setTimeout(() => {
      setShowFlash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, setMessage, showFlash]);

  return (
    <FlashContext.Provider value={{ message, setMessage }}>
      <Transition in={showFlash} timeout={400} unmountOnExit onExited={() => setMessage(null)}>
        {transitionstate => <Flash transitionstate={transitionstate}>{message}</Flash>}
      </Transition>
      {children}
    </FlashContext.Provider>
  );
};

export default FlashContext;
