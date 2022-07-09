
import * as React from 'react';
import { useEffect } from 'react';

import { StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {ThemeProvider} from "@emotion/react"
import { nanoTheme } from "./theme";

import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { useStore } from './app/stores/store'; //main mobx store


import LoadingScreen from './components/LoadingScreen';

import routes, { renderRoutes } from './routes';

function App() {
  const location = useLocation(); //returns location object from router, useful for the key
  const { commonStore, currentUserStore } = useStore();
  const isDevelopment: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


  //Get the current user (otherwise reloading browser will clear mobx)
  useEffect(() => {
    if (commonStore.token) {
      currentUserStore.getCurrentUser().finally(() => commonStore.setAppLoaded());

    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, currentUserStore])

  //check if there is a subdomain given --> will hide the tenant fields on client, API will detect the subdomain from the URI if present and use that
  useEffect(() => {
    const host = window.location.host;
    const subdomain = host.split('.');
    const minimumSegments = isDevelopment ? 2 : 3;

    if (subdomain.length == minimumSegments) {
      commonStore.setSubdomain();
    }
  }, [])

  // App theme
  const appTheme = nanoTheme({
    direction: "ltr",
    colorMode: commonStore.darkMode ? 'dark' : 'light',
    isResponsiveFontSizes: true,
  });

  if (!commonStore.appLoaded) return <LoadingScreen />

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={appTheme}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <ToastContainer position='top-center' theme="dark" hideProgressBar draggable autoClose={3000} />
          {renderRoutes(routes)}
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}


export default observer(App);