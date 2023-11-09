import React, { createContext, useState, useContext, useEffect } from "react";

// Crear un contexto para el login
const UserContext = createContext();

// Crear un componente que proporcionará el contexto
const UserProvider = ({ children }) => {
  const userlocalstorage = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
    token: localStorage.getItem("token") || null,
    identification: userlocalstorage?.identification || null,
    name: userlocalstorage?.name || null,
    isLoading: false,
  });

  const login = (token, identification, name) => {
    setUser({
      token,
      identification,
      name,
    });
  };

  const logout = () => {
    setUser({
      token: null,
      identification: null,
      name: null,
    });
  };
  useEffect(() => {
    if (!user.token  || !user.identification) {
      window.location.href = "/";
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
