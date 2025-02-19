import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("sanctum_token")}`,
    'user_id': window.localStorage.getItem("user_id"),
  },
});
