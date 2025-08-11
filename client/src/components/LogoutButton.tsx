import { useKeycloak } from "@react-keycloak/web";
import { Button } from "@mui/material";

const LogoutButton = () => {
    const { keycloak } = useKeycloak();

    const handleLogout = () => {
        try {
            keycloak.logout({
                redirectUri: window.location.origin
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
        >
            Выйти
        </Button>
    );
};

export default LogoutButton;