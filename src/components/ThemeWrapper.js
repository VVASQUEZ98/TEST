import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
};

export default ThemeWrapper;