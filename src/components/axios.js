import { Axios } from "axios";

export const client = new Axios({
  baseURL: import.meta.env.VITE_LARAVEL_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("sanctum_token")}`,
  },
    
});
