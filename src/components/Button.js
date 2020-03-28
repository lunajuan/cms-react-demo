/* eslint-disable camelcase */
import styled from 'styled-components';
import propTypes from 'prop-types';

const createColorGetter = colorType => props =>
  props.theme.buttonStyles[props.buttonStyle][colorType];

const getForegroundColor = createColorGetter('fg');
const getBackgroundColor = createColorGetter('bg');

const Button = styled.button`
  color: ${props => getForegroundColor(props)};
  border: 1px solid ${props => getForegroundColor(props)};
  padding: ${props => props.theme.spacing['1']} ${props => props.theme.spacing['2']};
  background-color: ${props => getBackgroundColor(props)};
`;

Button.defaultProps = {
  buttonStyle: 'primary',
};

Button.propTypes = {
  buttonStyle: propTypes.oneOf(['primary', 'danger']),
};

export default Button;
