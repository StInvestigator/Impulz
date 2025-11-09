import Keycloak from "keycloak-js";

// @ts-ignore
const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: "Impulz",
    clientId: "ImpulzClient"
});

export default keycloak