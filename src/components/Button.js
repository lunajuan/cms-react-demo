/* eslint-disable camelcase */
import styled from 'styled-components';

const getColor = props => {
  const {
    colors: { indigo_500, red_500 },
  } = props.theme;
  const { danger } = props;

  if (danger) return red_500;
  return indigo_500;
};

const Button = styled.button`
  appearance: none;
  color: ${getColor};
  border: 1px solid ${getColor};
  padding: ${props => props.theme.spacing['1']} ${props => props.theme.spacing['2']};
  font-size: ${props => props.theme.fontSize.lg};
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.boxShadow.outline};
  }
`;

export default Button;
