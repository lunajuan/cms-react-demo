import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';

const TRANSITION_DURATION_MS = 500;

const FlashContext = React.createContext();

const FlashGroup = styled.div`
  position: fixed;
  bottom: ${props => props.theme.spacing['3']};
  right: ${props => props.theme.spacing['3']};
  max-width: 300px;
  pointer-events: none;

  .flash-enter {
    transform: translateX(150%);
    opacity: 0;
  }
  .flash-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: transform ${TRANSITION_DURATION_MS}ms ease-in, opacity 300ms ease-in;
  }
  .flash-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .flash-exit-active {
    opacity: 0;
    transform: translateX(150%);
    transition: transform ${TRANSITION_DURATION_MS}ms ease-in, opacity 300ms ease-in;
  }
`;

const Flash = styled.div`
  display: flex;
  justify-content: flex-end;

  .flash-container {
    pointer-events: auto;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid ${props => props.theme.border.default};
    border-radius: 5px;
    padding: ${props => props.theme.spacing['2']};
    margin: ${props => props.theme.spacing['1']} 0;
  }

  .flash-undo {
    margin: 0 ${props => props.theme.spacing['1']};
  }
`;

const CloseButton = styled.button`
  appearance: none;
  padding: ${props => props.theme.spacing['1']} ${props => props.theme.spacing['2']};
  font-size: ${props => props.theme.fontSize.sm};
  border-radius: ${props => props.theme.radius.full};
  margin-left: ${props => props.theme.spacing['3']};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const FlashProvider = props => {
  const { children } = props;
  const [flash, setFlashObj] = useState({});
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (!showFlash) return undefined;
    const timer = setTimeout(() => {
      setShowFlash(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  const setFlash = useCallback((message, undo) => {
    if (!message || !message.trim().length) return;

    const newFlash = {
      message: message.trim(),
      undo,
    };

    setFlashObj(newFlash);
    setShowFlash(true);
  }, []);

  return (
    <FlashContext.Provider value={{ setFlash }}>
      <FlashGroup>
        <CSSTransition
          in={showFlash}
          timeout={TRANSITION_DURATION_MS}
          classNames="flash"
          unmountOnExit
        >
          <Flash>
            <span className="flash-container">
              {flash.message}
              {flash.undo ? (
                <Button
                  className="flash-undo"
                  onClick={() => {
                    flash.undo();
                    setShowFlash(false);
                  }}
                >
                  Undo
                </Button>
              ) : null}
              <CloseButton
                onClick={() => {
                  setShowFlash(false);
                }}
              >
                close
              </CloseButton>
            </span>
          </Flash>
        </CSSTransition>
      </FlashGroup>

      {children}
    </FlashContext.Provider>
  );
};

export default FlashContext;
