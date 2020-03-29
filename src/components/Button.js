/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const createColorGetter = colorType => props =>
  props.theme.buttonStyles[props.buttonStyle][colorType];

const getForegroundColor = createColorGetter('fg');
const getBackgroundColor = createColorGetter('bg');

const buttonStyles = css`
  color: ${props => getForegroundColor(props)};
  border: 1px solid ${props => getForegroundColor(props)};
  padding: ${props => props.theme.spacing['1']} ${props => props.theme.spacing['2']};
  background-color: ${props => getBackgroundColor(props)};
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled.div`
  display: inline-block;

  a {
    ${buttonStyles}
  }
`;

const Button = props => {
  const { to, children, className, buttonStyle } = props;
  if (to) {
    return (
      <StyledLink buttonStyle={buttonStyle}>
        <Link to={to} className={`button${className ? ` ${className}` : ''}`}>
          {children}
        </Link>
      </StyledLink>
    );
  }

  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.defaultProps = {
  buttonStyle: 'primary',
};

Button.propTypes = {
  buttonStyle: propTypes.oneOf(['primary', 'secondary', 'muted', 'danger']),
};

export default Button;
