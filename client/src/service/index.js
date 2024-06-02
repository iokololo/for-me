import axios from "axios";
import Cookies from "js-cookie";

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${Cookies.get("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
