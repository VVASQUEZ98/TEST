// ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import Switch from 'react-switch'; // Asegúrate de que esta librería esté instalada

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <Switch
        onChange={toggleTheme}
        checked={theme === 'dark'}
        offColor="#888"
        onColor="#000"
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </div>
  );
};

export default ThemeToggle;