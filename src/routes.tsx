import { Roles } from 'app/models/roles';
import React, { Suspense, Fragment, lazy, LazyExoticComponent, FC } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthGuard from './navigation/authGuards/AuthGuard';
import GuestGuard from './navigation/authGuards/GuestGuard';
import AppLayout from './navigation/AppLayout';
import LoadingScreen from './components/LoadingScreen';
import {Helmet} from "react-helmet";

interface RouteType {
  guard?: (props: any) => JSX.Element;
  layout?: (props: any) => JSX.Element;
  component?: (props: any) => JSX.Element;
  routes?: RouteType[];
  exact?: boolean;
  path?: string;
  roles?: Roles[];
  title?: string;
}

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const NotFoundPage = Loadable(lazy(() => import('./pages/404')));
const UnauthorizedPage = Loadable(lazy(() => import('./pages/403')));
const LoginPage = Loadable(lazy(() => import('./pages/authentication/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('./pages/authentication/ForgotPassword')));
const ResetPasswordPage = Loadable(lazy(() => import('./pages/authentication/ResetPassword')));
const TenantListPage = Loadable(lazy(() => import('./pages/tenants/TenantList')));
const UserListPage = Loadable(lazy(() => import('./pages/users/UserList')));
const VenueListPage = Loadable(lazy(() => import('./pages/venues/VenueList')));
const SampleListPage = Loadable(lazy(() => import('./pages/samples/SampleList')));
const AccountSettingsPage = Loadable(lazy(() => import('./pages/profile/AccountSettings')));

export const renderRoutes = (routes: RouteType[] = []) => (
  <Switch>
    {routes.map((route, i) => {
      const Guard = route.guard || React.Component; 
      const Layout = route.layout || Fragment;
      const Component = route.component || React.Component; 

      return (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          render={(props) => (
            <Fragment>
              {route.title &&
                <Helmet>
                  <title>{route.title}</title>
                </Helmet>
              }
              {route.guard ? <Guard roles={route.roles}>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard> :
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>}
            </Fragment>

          )}
        />
      );
    })}
  </Switch>
);

const appName = "ASP Nano Demo"

const routes: RouteType[] = [
  {
    exact: true,
    path: '/404',
    component: NotFoundPage,
    title: `${appName} | Not Found`
  },
  {
    exact: true,
    path: '/403',
    component: UnauthorizedPage,
    title: `${appName} | Unauthorized`
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: LoginPage,
    title: `${appName} | Login`
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/forgot-password',
    component: ForgotPasswordPage,
    title: `${appName} | Forgot Password`
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/reset-password',
    component: ResetPasswordPage,
    title: `${appName} | Reset Password`
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/',
    component: LoginPage,
    title: `${appName} | Login`
  },
  {
    path: '/',
    layout: AppLayout,
    routes: [
      {
        exact: true,
        path: '/venues',
        guard: AuthGuard,
        component: VenueListPage,
        title: `${appName} | Venues`
      },
      {
        exact: true,
        path: '/samples',
        guard: AuthGuard,
        component: SampleListPage,
        title: `${appName} | UI Component Samples`
      },
      {
        exact: true,
        path: '/profile',
        guard: AuthGuard,
        component: AccountSettingsPage,
        title: `${appName} | Profile`
      },
      {
        exact: true,
        path: '/users',
        component: UserListPage,
        guard: AuthGuard,
        roles: [Roles.root, Roles.admin],
        title: `${appName} | User Administration`
      },
      {
        exact: true,
        path: '/tenants',
        component: TenantListPage,
        guard: AuthGuard,
        roles: [Roles.root],
        title: `${appName} | Tenant Administration`
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    routes: [
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;