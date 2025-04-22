import React, { createContext, useState, useEffect, useContext } from 'react';

// Creamos el contexto
export const ThemeContext = createContext();

// Definimos los temas
const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    navbar: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.69) 100%)',
    footerBg: '#f8f9fa',
    cardBackground: '#ffffff',
    cardText: '#252e48',
    inputBg: '#ffffff',
    placeholder: '#6c757d',
    linkHover: '#495057',
    buttonBg: '#222222',
    buttonText: '#ffffff'
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    navbar: 'linear-gradient(90deg, #1a1a1a 0%,rgb(0, 0, 0) 100%)',
    footerBg: '#1a1a1a',
    cardBackground: '#1e1e1e',
    cardText: '#ffffff',
    inputBg: '#2d2d2d',
    placeholder: '#adb5bd',
    linkHover: '#dee2e6',
    buttonBg: '#ffffff',
    buttonText: '#000000'
  }
};

// Componente Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [themeStyles, setThemeStyles] = useState(themes.light);

  // Cargar tema guardado al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    setThemeStyles(themes[savedTheme]);
  }, []);

  // Actualizar estilos cuando cambia el tema
  useEffect(() => {
    setThemeStyles(themes[theme]);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};

// Componente Wrapper (opcional, puede estar en archivo separado)
export const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();
  return <div data-theme={theme}>{children}</div>;
};