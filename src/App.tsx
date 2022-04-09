
import * as React from 'react';
import { useEffect } from 'react';

import { StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ukoTheme } from "./theme/index";

import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { useStore } from './app/stores/store'; //main mobx store


import LoadingScreen from './components/LoadingScreen';

import routes, { renderRoutes } from './routes';

function App() {
  const location = useLocation(); //returns location object from router, useful for the key
  const { commonStore, userStore } = useStore();

  //Get the current user (otherwise reloading browser will clear mobx)
  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  // App theme
  const appTheme = ukoTheme({
    direction: "ltr",
    theme: commonStore.darkMode ? 'dark' : 'light',
    responsiveFontSizes: true,
  });

  if (!commonStore.appLoaded) return <LoadingScreen />

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <ToastContainer position='top-center' theme="dark" hideProgressBar draggable autoClose={3000} />
        {renderRoutes(routes)}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}


export default observer(App);