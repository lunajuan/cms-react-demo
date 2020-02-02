import React from 'react';

const styles = {
  primary: ' bg-white border border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white',
  secondary: 'bg-white border border-gray-100 text-gray-600',
};

const Button = props => {
  const { children, className, buttonStyle, type } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type || 'button'}
      className={`px-4 py-2 rounded-lg ${className} ${styles[buttonStyle] || styles.secondary}`}
    >
      {children}
    </button>
  );
};

export default Button;
