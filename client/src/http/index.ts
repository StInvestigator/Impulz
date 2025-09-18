import axios from "axios";
import keycloak from "../keycloak.ts";

const $api = axios.create({
    baseURL: "http://localhost:8083/api"
})

const $authApi = axios.create({
    baseURL: "http://localhost:8083/api"
})

$authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${keycloak.token}`
    return config;
})

export {
    $api,
    $authApi
}