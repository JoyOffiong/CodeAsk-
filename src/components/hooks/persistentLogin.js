import React from "react";
import { useAuth } from "./useAuth";
import useRefreshToken from "./useRefresh";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom";

function PersistentLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
      !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    
      console.log(`isLoading ${isLoading}`);
      console.log(`aT: ${JSON.stringify(auth.accessToken)}`);
      console.log(`aT: ${JSON.stringify(auth.access.token)}`);
  }, []);

  // useEffect(() => {
  // }, [isLoading]);

  return(
  <>{isLoading 
  ? <Spinner />
   : <Outlet />}
  </>
  );
}

export default PersistentLogin;
