// http/index.js
import axios from "axios";
import { setupHttpInterceptors } from "./interceptors";

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60 * 1000,
});

setupHttpInterceptors(http);

export default http;
