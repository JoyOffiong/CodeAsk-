import axiosPublic from "../baseURL";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const {setAuth, auth } = useAuth();

  const refresh = async () => {
   const tokens = JSON.parse(localStorage.getItem("tokens"));

    const response = await axiosPublic.post("auth/refresh-tokens", {
      refreshToken: tokens.refresh.token
    });


 localStorage.setItem('tokens', JSON.stringify(response.data))

 setAuth(response.data)
    return response.data.access.token;
  };
  return refresh;
};

export default useRefreshToken;
