import { createContext, useState } from "react";
import React from "react";

// export const userType={
//   username:"",
//   email :"",
//   password:"",
// }

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [reRender, setReRender] = useState(false);
  const [searchField, setSearchField] = useState("")

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        searchField, 
        setSearchField,
        reRender,
        setReRender

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
