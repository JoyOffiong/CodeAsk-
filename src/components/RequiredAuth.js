import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
// import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

// export const RequiredAuth = () => {
//   const { auth } = useAuth();
//   // const {user} = useAuth()
//   const location = useLocation();

//   return auth ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/sign-up" state={{ from: location }} replace />
//   );
// };

export const RequiredAuth = (tokens) => {
  const { auth } = useAuth();

  // const {auth, setAuth, user, setUser} = useAuth()

  //   const loggedInUser = JSON.parse(localStorage.getItem("user")) 

  //   const loginuser = loggedInUser.tokens.access.token
  //   const registereduser=  loggedInUser.user
  //   console.log(loggedInUser)
  //      setAuth({...auth , accessToken:loginuser});
  //      setUser({...user, registereduser})
  //      console.log(auth)
  //      console.log(user)

 
  const location = useLocation();
console.log(tokens)
  return tokens ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-up" state={{ from: location }} replace />
  );

  
};

