import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  color: ${props => props.theme.colors.indigo_500};
  border: 1px solid ${props => props.theme.colors.indigo_500};
  padding: ${props => props.theme.spacing['1']} ${props => props.theme.spacing['2']};
  font-size: ${props => props.theme.fontSize.lg};
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
