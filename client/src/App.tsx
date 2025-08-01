import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
import AppRouter from "./components/AppRouter";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { ThemeProvider } from '@mui/material/styles';
import ScrollToTop from "./components/ScrollToTop.tsx";
import {theme} from "./theme.ts";

import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { useEffect } from "react";

function App() {
  return (
      <BrowserRouter>
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{ onLoad: 'login-required' }}
        >
          <SecuredContent />
        </ReactKeycloakProvider>
      </BrowserRouter>
  );
}

const SecuredContent = () => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized) {
      if (location.hash.includes('state=')) {
        navigate('/', { replace: true });
      }

      if (!keycloak.authenticated) {
        keycloak.login();
      }
    }
  }, [initialized, keycloak, location, navigate]);

  if (!initialized || !keycloak.authenticated) {
    return <div>Loading or redirecting to login...</div>;
  }

    return (
        <>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar />
                    <Box component="main" display={"flex"}>
                        <Sidebar />
                        <Box component="article" sx={{
                            width: "100%",
                            marginLeft: `320px`,
                            marginTop: "48px",
                            padding: "60px 20px 120px 20px",
                            overflowX: 'hidden', // предотвращает скролл
                        }}>
                            <ScrollToTop />
                            <AppRouter />
                        </Box>
                    </Box>
                    <Footer/>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;