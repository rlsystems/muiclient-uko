import { Roles } from 'app/models/roles';
import React, { Suspense, Fragment, lazy, LazyExoticComponent, FC } from 'react';
import {  Route } from 'react-router-dom';
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
  routes.map((route, i) => {
    const Guard = route.guard || React.Component;
    const Layout = route.layout || Fragment;
    const Component = route.component || React.Component;

    return (
      <Route
        key={i}
        path={route.path}
        element={(
          <Fragment>
            {route.title &&
              <Helmet>
                <title>{route.title}</title>
              </Helmet>
            }
            {route.guard ?
              <Guard roles={route.roles}>
                <Layout>
                  <Component />
                </Layout>
              </Guard> :
              <Layout>
                <Component />
              </Layout>
            }
          </Fragment>
        )}
      />
    ) })
);

const appName = "ASP Nano Demo"

const routes: RouteType[] = [
  {
    path: '/',
    guard: GuestGuard,
    component: LoginPage,
    title: `${appName} | Login`
  },
  {
    path: '/404',
    component: NotFoundPage,
    title: `${appName} | Not Found`
  },
  {
    path: '/403',
    component: UnauthorizedPage,
    title: `${appName} | Unauthorized`
  },
  {
    path: '/login',
    guard: GuestGuard,
    component: LoginPage,
    title: `${appName} | Login`
  },
  {
    path: '/forgot-password',
    guard: GuestGuard,
    component: ForgotPasswordPage,
    title: `${appName} | Forgot Password`
  },
  {
    path: '/reset-password',
    guard: GuestGuard,
    component: ResetPasswordPage,
    title: `${appName} | Reset Password`
  },
  {
    path: '/venues',
    guard: AuthGuard,
    layout: AppLayout,
    component: VenueListPage,
    title: `${appName} | Venues`
  },
  {
    path: '/samples',
    guard: AuthGuard,
    component: SampleListPage,
    title: `${appName} | UI Component Samples`,
    layout: AppLayout,
  },
  {
    path: '/profile',
    guard: AuthGuard,
    component: AccountSettingsPage,
    title: `${appName} | Profile`,
    layout: AppLayout,
  },
  {
    path: '/users',
    component: UserListPage,
    guard: AuthGuard,
    roles: [Roles.root, Roles.admin],
    title: `${appName} | User Administration`,
    layout: AppLayout,
  },
  {
    path: '/tenants',
    component: TenantListPage,
    guard: AuthGuard,
    roles: [Roles.root],
    title: `${appName} | Tenant Administration`,
    layout: AppLayout,
  },
  {
    path: '*',
    component: NotFoundPage
  }
];

export default routes;