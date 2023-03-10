import axios from "axios";
const BASE_URL = "https://code-ask-backend-production.up.railway.app/v1/api/"

const baseURL =  axios.create({
  baseURL: "https://code-ask-backend-production.up.railway.app/v1/api/",
  headers: {
    Accept: "application/json",
    "Context-Type": "application/json; charset=UTF-8",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
  
});
   
  
export default baseURL;