import { axiosPrivate } from "../baseURL";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import useRefreshToken from "./useRefresh";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const tokens = JSON.parse(localStorage.getItem("tokens"));
  // console.log(user.tokens.access.token)
  useEffect(() => {
    try {
      axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            if (tokens) {
              // const accessToken= user.tokens.access.token

              config.headers["Authorization"] = `Bearer ${tokens.access.token}`;
            }
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error.config;
          if (error.response.status === 401 && !prevRequest.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );
    } catch (error) {
      console.log(error);
    }

    return () => {
      // axiosPrivate.interceptors.request.eject(requestIntercept);
      // axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
