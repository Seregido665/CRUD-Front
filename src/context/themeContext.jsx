import React, { createContext, useState } from 'react';

// --- CONTEXTO BASICO --
// -- PARA CAMBIAR EL TEMA A CLARO o OSCURO, YA QUE DEBERA PERSISTIR INDEPENDIENTE MENTE DE LA PAGINA --
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storagedTheme = window.localStorage.getItem('user_theme')
  const [theme, setTheme] = useState(storagedTheme || 'light');

  // -- CUANDO SE LLAME A LA FUNCION --
  const handleChangeTheme = () => {
    setTheme((actualTheme) => {
      window.localStorage.setItem('user_theme', actualTheme === 'light' ? 'dark' : 'light')
      return actualTheme === 'light' ? 'dark' : 'light'
    })
  }

  // -- LO APLICAMOS A TODO EL children --> App.jsx
  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
