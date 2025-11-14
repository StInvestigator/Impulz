import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box, Snackbar, Alert } from "@mui/material";
import AppRouter from "./components/AppRouter";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { ThemeProvider } from '@mui/material/styles';
import ScrollToTop from "./components/ScrollToTop.tsx";
import { theme } from "./theme.ts";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { useEffect } from "react";
import MusicPlayer from './components/MusicPlayer.tsx';
import FullScreenPlayer from './components/FullScreenPlayer.tsx';
import { $authApi } from "./http";
import { useAppDispatch, useAppSelector } from './hooks/redux.ts';
import { fetchUserDetails } from './store/reducers/action-creators/user.ts';
import { setProfile } from './store/reducers/ProfileSlice.ts';
import './assets/fonts/fonts.css'
import { closeFullScreenPlayer } from "./store/reducers/PlayerSlice.ts";
import { hideAlert } from './store/reducers/AlertSlice.ts';

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

  const {
    active,
    playlist,
    currentTrackIndex,
    currentTime,
    duration,
    pause,
    isFullScreenOpen
  } = useAppSelector((state) => state.player);

  const alert = useAppSelector((state) => state.alert);

  useEffect(() => {
    if (initialized && keycloak.authenticated && keycloak.token) {
      sendTokenToBackend();
    }
  }, [initialized, location, navigate, keycloak]);

  useEffect(() => {
    dispatch(closeFullScreenPlayer());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = 2000;

    const tryFetchProfile = () => {
      if (!keycloak.subject) return;
      dispatch(fetchUserDetails(keycloak.subject))
          .unwrap()
          .then((user) => {
            dispatch(setProfile(user));
          })
          .catch((error) => {
            console.error(`Failed to fetch user details (attempt ${attempts + 1}):`, error);

            if (attempts < maxAttempts) {
              attempts++;
              setTimeout(tryFetchProfile, retryDelay);
            } else {
              console.error('Max attempts reached. Could not fetch user details.');
            }
          });
    };

    tryFetchProfile();
  }, [keycloak.subject, dispatch]);

  const sendTokenToBackend = async () => {
    try {
      await $authApi.post("/login-success");
    }
    catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideAlert());
  };

  if (!initialized) return <div>Loading...</div>;

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar />
          <Box component="main" display={"flex"} sx={{ flex: 1 }}>
            <Sidebar />
            <Box sx={{
              position: 'relative',
              width: "calc(100% - 320px)",
              marginLeft: `320px`,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box component="article" sx={{
                marginTop: "48px",
                padding: "60px 20px 120px 20px",
                overflowX: 'hidden',
                display: isFullScreenOpen ? 'none' : 'block',
                width: '100%',
                boxSizing: 'border-box',
                flex: 1
              }}>
                <ScrollToTop />
                <AppRouter />
              </Box>

              {active && isFullScreenOpen && (
                  <FullScreenPlayer
                      active={active}
                      playlist={playlist}
                      currentTrackIndex={currentTrackIndex}
                      currentTime={currentTime}
                      duration={duration}
                      pause={pause}
                      onClose={() => dispatch(closeFullScreenPlayer())}
                      onCloseFullScreen={() => dispatch(closeFullScreenPlayer())}
                  />
              )}
            </Box>
          </Box>

          <MusicPlayer />

          {!isFullScreenOpen && (
              <Box sx={{ mt: 'auto' }}>
                <Footer />
              </Box>
          )}

          <Snackbar
              open={alert.open}
              autoHideDuration={3000}
              onClose={handleCloseAlert}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 9999
              }}
          >
            <Alert
                onClose={handleCloseAlert}
                severity={alert.severity}
                sx={{
                  backgroundColor: alert.severity === 'info' ? 'var(--dodger-blue)' :
                      alert.severity === 'error' ? '#ff9800' : undefined,
                  color: 'white',
                  '& .MuiAlert-icon': {
                    color: 'white',
                  }
                }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
  );
}

export default App;