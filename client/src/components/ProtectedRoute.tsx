import React, {type JSX} from "react";
import { useKeycloak } from "@react-keycloak/web";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { keycloak } = useKeycloak();

    if (!keycloak.authenticated) {
        keycloak.login();
        return null;
    }

    return children;
};

export default ProtectedRoute;
