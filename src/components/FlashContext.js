import React, { useState } from 'react';

const FlashContext = React.createContext();

export const FlashProvider = props => {
  const { children } = props;
  const [message, setMessage] = useState('Welcome to this Demo!');

  return (
    <FlashContext.Provider value={{ setMessage }}>
      {message ? <div style={{ backgroundColor: 'red', color: 'white' }}>{message}</div> : null}
      {children}
    </FlashContext.Provider>
  );
};

export default FlashContext;
