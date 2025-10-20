import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
    const { keycloak } = useKeycloak();
    const location = useLocation();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!keycloak.authenticated && !isRedirecting) {
            setIsRedirecting(true);

            const currentPath = location.pathname + location.search;
            sessionStorage.setItem("redirectAfterLogin", currentPath);

            const redirectUri = window.location.origin + currentPath;
            keycloak.login({ redirectUri });
        }
    }, [keycloak.authenticated, location, isRedirecting]);

    if (isRedirecting || !keycloak.authenticated) {
        return <div>Redirecting to login...</div>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
