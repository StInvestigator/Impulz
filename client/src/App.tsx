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
import { useEffect, useState } from "react";
import MusicPlayer from './components/MusicPlayer.tsx';
import FullScreenPlayer from './components/FullScreenPlayer.tsx';
import {$authApi} from "./http";
import { useAppDispatch, useAppSelector } from './hooks/redux.ts';
import { fetchUserDetails } from './store/reducers/action-creators/user.ts';
import { setProfile } from './store/reducers/ProfileSlice.ts';
import './assets/fonts/fonts.css'

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
  const dispatch = useAppDispatch();

  const [isFullScreenPlayerOpen, setIsFullScreenPlayerOpen] = useState(false);

  const {
    active,
    playlist,
    currentTrackIndex,
    currentTime,
    duration,
    pause,
  } = useAppSelector((state) => state.player);

  useEffect(() => {
    if (keycloak.subject) {
      dispatch(fetchUserDetails(keycloak.subject))
          .unwrap()
          .then((user) => {
            dispatch(setProfile(user));
          })
          .catch((error) => {
            console.error('Failed to fetch user details:', error);
          });
    }
  }, [keycloak.subject, dispatch]);

  useEffect(() => {
    if (initialized && keycloak.authenticated && keycloak.token) {
      sendTokenToBackend();
    }
  }, [initialized, location, navigate, keycloak]);

  const handleOpenFullScreenPlayer = () => {
    setIsFullScreenPlayerOpen(true);
  };

  const handleCloseFullScreenPlayer = () => {
    setIsFullScreenPlayerOpen(false);
  };

  const sendTokenToBackend = async() => {
    try {
      const response = await $authApi.post("/login-success");
      console.log("user synced successfully: ",response.data);
    }
    catch (error){
      console.error("Error sending token to backend:",error);
    }
  };

  if (!initialized) return <div>Loading...</div>;

  return (
      <>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box component="main" display={"flex"}>
            <Sidebar />
            <Box sx={{
              position: 'relative',
              width: "calc(100% - 320px)",
              marginLeft: `320px`,
            }}>
              {/* Основной контент */}
              <Box component="article" sx={{
                marginTop: "48px",
                padding: "60px 20px 120px 20px",
                overflowX: 'hidden',
                display: isFullScreenPlayerOpen ? 'none' : 'block',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <ScrollToTop />
                <AppRouter />
              </Box>

              {/* Полноэкранный плеер внутри основного контейнера */}
              {active && isFullScreenPlayerOpen && (
                  <FullScreenPlayer
                      active={active}
                      playlist={playlist}
                      currentTrackIndex={currentTrackIndex}
                      currentTime={currentTime}
                      duration={duration}
                      pause={pause}
                      onClose={handleCloseFullScreenPlayer}
                      onCloseFullScreen={handleCloseFullScreenPlayer}
                  />
              )}
            </Box>
          </Box>

          <MusicPlayer
              onOpenFullScreen={handleOpenFullScreenPlayer}
              onCloseFullScreen={handleCloseFullScreenPlayer}
              isFullScreenMode={isFullScreenPlayerOpen}
          />
          {!isFullScreenPlayerOpen && <Footer />}
        </ThemeProvider>
      </>
  );
}

export default App;