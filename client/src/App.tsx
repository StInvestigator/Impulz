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
import MusicPlayer from './components/MusicPlayer.tsx';
import {$authApi} from "./http";

function App() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      }}
    >
      <BrowserRouter>
        <SecuredContent />
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

const SecuredContent = () => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && location.hash.includes('state=')) {
      navigate('/', { replace: true });
    }

    if (initialized && keycloak.authenticated && keycloak.token) {
      sendTokenToBackend();
    }
  }, [initialized, location, navigate, keycloak]);

  const sendTokenToBackend = async() => {
    try {
      const response = await $authApi.post("/api/login-success");
      console.log("user synced successfully: ",response.data);
    }
    catch (error){
      console.error("Error sending token to backend:",error);
    }
  };

  if (!initialized) return <div>Loading...</div>;

  if (!keycloak.authenticated && location.pathname !== "/") {
    keycloak.login();
    return <div>Redirecting to login...</div>;
  }

  return (
      <>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box component="main" display={"flex"}>
            <Sidebar />
            <Box component="article" sx={{
              width: "100%",
              marginLeft: `320px`,
              marginTop: "48px",
              padding: "60px 20px 120px 20px",
              overflowX: 'hidden',
            }}>
              <ScrollToTop />
              <AppRouter />
            </Box>
          </Box>
          <MusicPlayer/>
          <Footer />
        </ThemeProvider>
      </>
  );
}

export default App;