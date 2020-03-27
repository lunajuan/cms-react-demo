import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  appearance: none;
  border: 2px solid red;
`;

const ThemeToggle = props => {
  const { theme, toggleTheme } = props;
  const isLight = theme === 'light';

  return (
    <ToggleContainer type="button" onClick={toggleTheme}>
      {isLight ? 'Dark Mode' : 'Light Mode'}
    </ToggleContainer>
  );
};

export default ThemeToggle;
