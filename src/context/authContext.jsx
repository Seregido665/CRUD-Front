import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getUserProfile } from '../services/user.service';
import { getToken, setToken, removeToken, isAuthenticated } from '../utils/auth';

// --- CONTEXTO DE AUTENTIFICACIÓN ---
// -- IMPORTAMOS LAS FUNCIONES D ELOS TOKEN PARA TRABAJAR CON ELLAS --

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // - LOGOUT -
  // EL useCallback ESPERA A QUE SE LLAME A LA FUNCION handleLogout
  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [])

  // IGUAL:  EL useCallback ESPERA A QUE SE LLAME A LA FUNCION handleSetUser
  const handleSetUser = useCallback((authData) => {
    if (authData.token) {
      setToken(authData.token);
    }
  }, [])

  // - VERIFICAMOS SI HAY TOKEN TRAS CARGAR LA PÁGINA -
  useEffect(() => {
    const token = getToken();

    if (token && isAuthenticated()) {
      getUserProfile()
        .then((profileData) => {
          setUser(profileData);
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          removeToken();
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('hola no hay token o está expirado')
      removeToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      handleSetUser,
      handleLogout,
      isAuthenticated: isAuthenticated(),
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
