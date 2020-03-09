import React from 'react';
import styled from 'styled-components';
import PinkHighlighter from '../styles/PinkHighlighter';

const Counter = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colors.grey_800};
  font-size: ${props => props.theme.fontSize.sm};
  margin: ${props => props.theme.spacing['2']} 0;

  .message {
    padding: 0 ${props => props.theme.spacing['2']};
  }
`;

const CharLimit = props => {
  const { charsLimit, remainingChars } = props;
  if (!charsLimit) return null;

  const hitLimit = remainingChars < 0;

  return (
    <Counter>
      {hitLimit ? (
        <PinkHighlighter className="message">Over Limit: {remainingChars}</PinkHighlighter>
      ) : (
        <span className="message">Remaining Characters: {remainingChars}</span>
      )}
    </Counter>
  );
};

export default CharLimit;
