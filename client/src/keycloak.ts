import Keycloak from "keycloak-js";

// @ts-ignore
const keycloak = new Keycloak({
    url: "http://localhost:9090",
    realm: "ImpulzRealm",
    clientId: "ImpulzClient"
});

export default keycloak