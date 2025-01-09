import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";


const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
