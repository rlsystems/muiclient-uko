import { Box, StyledEngineProvider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import VenueDashboard from '../../pages/venues/dashboard/VenueDashboard';
import VenueForm from '../../pages/venues/form/VenueForm';
import Dashboard from '../../pages/dashboardSample/Dashboard';
import Orders from '../../pages/dashboardSample/Orders';
import HomePage from '../../pages/home/HomePage';
import LoginPage from '../../pages/login/LoginPage';
import TenantDashboard from '../../pages/tenants/dashboard/TenantDashboard';
import TenantForm from '../../pages/tenants/form/TenantForm';
import UserDashboard from '../../pages/users/dashboard/UserDashboard';
import UserProfile from '../../pages/users/form/UserProfile';
import UserRegistration from '../../pages/users/form/UserRegistration';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import NotFound from './NotFound';
import { ukoTheme } from "../../theme/";
import UserList from '../../pages/users/UserList';
//Started from Create React App, Typescript
//https://mui.com/getting-started/example-projects/

function App() {


  const location = useLocation(); //returns location object from router, useful for the key
  const { commonStore, userStore } = useStore();


  //do something when this component loads
  //in this case, get the current user (otherwise reloading browser will clear mobx)
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


  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          {/* CssBaseline is a MUI universal CSS reset */}
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

                <Box sx={{ display: 'flex' }}>
                  <NavBar />

                  <Switch>

                    <Route exact path='/dashboard' component={UserList} />

                    <Route exact path='/venues' component={VenueDashboard} />
                    <Route exact key={location.key} path={['/createVenue', '/editVenue/:id']} component={VenueForm} />

                    <Route exact path='/users' component={UserDashboard} />
                    <Route exact path='/createUser' component={UserRegistration} />
                    <Route exact key={location.key} path={['/editUser', '/editUser/:id']} component={UserProfile} />

                    <Route exact path='/tenants' component={TenantDashboard} />
                    <Route exact key={location.key} path={['/createTenant', '/editTenant/:id']} component={TenantForm} />
                    <Route component={NotFound} />
                  </Switch>
                </Box>



              )} />
          </Switch>

        </ThemeProvider>
      </StyledEngineProvider>





    </>




  );
}


export default observer(App);