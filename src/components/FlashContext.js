import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Button from './Button';

const TRANSITION_DURATION_MS = 500;

const FlashContext = React.createContext();

const FlashGroup = styled.div`
  position: fixed;
  bottom: ${props => props.theme.spacing['3']};
  right: ${props => props.theme.spacing['3']};
  max-width: 300px;

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
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid ${props => props.theme.colors.grey_500};
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
  const [flashes, setFlashes] = useState([
    { id: 'default', message: 'Welcome to the dungeon', undo: null },
  ]);

  const setFlash = useCallback(
    (message, undo) => {
      if (!message || !message.trim().length) return;
      const updatedFlashes = undo ? flashes.filter(flash => !flash.undo) : [...flashes];

      const id = (+new Date()).toString();

      const newFlash = { id, message: message.trim(), undo };
      updatedFlashes.push(newFlash);
      setFlashes(updatedFlashes);
    },
    [flashes]
  );

  const removeFlash = useCallback(
    id => {
      setFlashes(flashes.filter(flash => flash.id !== id));
    },
    [flashes]
  );

  return (
    <FlashContext.Provider value={{ setFlash }}>
      <FlashGroup>
        <TransitionGroup>
          {flashes.map(({ id, message, undo }) => (
            <CSSTransition key={id} timeout={TRANSITION_DURATION_MS} classNames="flash">
              <Flash>
                <span className="flash-container">
                  {message}
                  {undo ? (
                    <Button
                      className="flash-undo"
                      onClick={() => {
                        undo();
                        removeFlash(id);
                      }}
                    >
                      Undo
                    </Button>
                  ) : null}
                  <CloseButton onClick={() => removeFlash(id)}>close</CloseButton>
                </span>
              </Flash>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </FlashGroup>

      {children}
    </FlashContext.Provider>
  );
};

export default FlashContext;
