import Keycloak from "keycloak-js";

// @ts-ignore
const keycloak = new Keycloak({
    url: "http://localhost:9090",
    realm: "ImpulzRealm",
    clientId: "ImpulzClient",
    redirectUri: "http://localhost:3000",
});


export default keycloak