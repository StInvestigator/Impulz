import axios from "axios";
import keycloak from "../keycloak.ts";

const $api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

const $authApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

$authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${keycloak.token}`
    return config;
})

export {
    $api,
    $authApi
}