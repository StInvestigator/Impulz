import { useKeycloak } from "@react-keycloak/web";

// @ts-ignore
const AdminRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    if (!keycloak.hasRealmRole("admin")) {
        return <div>Доступ запрещён! Требуется роль admin.</div>;
    }

    return children;
};

export default AdminRoute;  // Добавляем default export