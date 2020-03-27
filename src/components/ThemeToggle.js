import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.border.default};
  padding: ${props => props.theme.spacing['2']} ${props => props.theme.spacing['4']};
  border-radius: ${props => props.theme.radius.full};
  cursor: pointer;
  margin: ${props => props.theme.spacing['3']} 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ThemeToggle = props => {
  const { theme, toggleTheme } = props;
  const isLight = theme === 'light';

  return (
    <Wrapper>
      <ToggleContainer type="button" onClick={toggleTheme}>
        <strong>{isLight ? 'Dark' : 'Light'}</strong> Mode
      </ToggleContainer>
    </Wrapper>
  );
};

export default ThemeToggle;
