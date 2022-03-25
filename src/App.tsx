
import * as React from 'react';
import { useEffect } from 'react';

import { Box, styled, StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ukoTheme } from "./theme/index";

import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { useStore } from './app/stores/store'; //main mobx store

import DashboardSidebar from "./navigation/DashboardSideBar";
import DashboardNavbar from './navigation/DashboardNavbar';
import LoadingComponent from './components/LoadingComponent';
import NotFound from './pages/NotFound';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';


import UserList from './pages/users/UserList';
import VenueList from './pages/venues/VenueList';
import VenueForm from './pages/venues/form/VenueForm'; //to be updated
import TenantDashboard from './pages/tenants/dashboard/TenantDashboard';
import TenantForm from './pages/tenants/form/TenantForm';
import TenantList from './pages/tenants/TenantList';


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


  // styled components (Wrapper to offset content from side navigation)
  const Wrapper = styled(Box)(({ theme }) => ({
    width: `calc(100% - 80px)`,
    paddingLeft: "3rem",
    paddingRight: "3rem",
    transition: "all 0.3s",
    marginLeft: 80,
  }));


  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />

          <ToastContainer position='bottom-right' hideProgressBar />


          {/* Full Pages */}
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/' component={HomePage} />

            {/* Pages with Side Navigation Bar */}
            <Route
              path={'/(.+)'}
              render={() => (

                <>
                  <DashboardSidebar />


                  <Wrapper>
                    <DashboardNavbar />
                    <Switch>

                      <Route exact path='/venues' component={VenueList} />
                      <Route exact key={location.key} path={['/createVenue', '/editVenue/:id']} component={VenueForm} />

                      <Route exact path='/users' component={UserList} />

                      <Route exact path='/tenants' component={TenantList} />
                      <Route component={NotFound} />
                    </Switch>


                  </Wrapper>

                </>

              )} />
          </Switch>

        </ThemeProvider>
      </StyledEngineProvider>
    </>

  );
}


export default observer(App);