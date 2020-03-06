import React from 'react';
import styled from 'styled-components';

const Counter = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colors.grey_800};
  font-size: ${props => props.theme.fontSize.sm};
  margin: ${props => props.theme.spacing['2']} 0;

  .message {
    padding: 0 ${props => props.theme.spacing['2']};
  }

  .is-over-limit {
    background-color: ${props => props.theme.colors.red_200};
  }
`;

const CharLimit = props => {
  const { charsLimit, remainingChars } = props;
  if (!charsLimit) return null;

  const hitLimit = remainingChars < 0;
  const message = hitLimit ? 'Over Limit' : 'Charcters Left';

  return (
    <Counter>
      <span className={`message ${hitLimit ? ' is-over-limit' : ''}`}>
        {message}: {remainingChars}
      </span>
    </Counter>
  );
};

export default CharLimit;
