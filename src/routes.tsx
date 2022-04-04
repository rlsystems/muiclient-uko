import { RoleID } from 'app/models/user';
import React, { Suspense, Fragment, lazy, LazyExoticComponent, FC } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthGuard from './components/authentication/AuthGuard';
import GuestGuard from './components/authentication/GuestGuard';
import DashboardLayout from './components/Layouts/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';

interface RouteType {
  guard?: (props: any) => JSX.Element;
  layout?: (props: any) => JSX.Element;
  component?: (props: any) => JSX.Element;
  routes?: RouteType[];
  exact?: boolean;
  path?: string;
  roles?: RoleID[]
}

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const NotFoundPage = Loadable(lazy(() => import('./pages/NotFound')));
const HomePage = Loadable(lazy(() => import('./pages/home/HomePage')));
const LoginPage = Loadable(lazy(() => import('./pages/authentication/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('./pages/authentication/ForgotPassword')));
const ResetPasswordPage = Loadable(lazy(() => import('./pages/authentication/ResetPassword')));
const TenantListPage = Loadable(lazy(() => import('./pages/tenants/TenantList')));
const UserListPage = Loadable(lazy(() => import('./pages/users/UserList')));
const VenueListPage = Loadable(lazy(() => import('./pages/venues/VenueList')));
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
              route.guard ? <Guard roles={route.roles}>
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
                </Layout>
            )}
          />
        );
      })}
    </Switch>
);

const routes: RouteType[] = [
  {
    exact: true,
    path: '/404',
    component: NotFoundPage
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: LoginPage
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/forgot-password',
    component: ForgotPasswordPage
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/reset-password',
    component: ResetPasswordPage
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/',
    component: HomePage
  },
  {
    path: '/',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/venues',
        guard: AuthGuard,
        component: VenueListPage
      },
      {
        exact: true,
        path: '/profile',
        guard: AuthGuard,
        component: AccountSettingsPage
      },
      {
        exact: true,
        path: '/users',
        component: UserListPage,
        guard: AuthGuard,
        roles: [RoleID.root, RoleID.admin]
      },
      {
        exact: true,
        path: '/tenants',
        component: TenantListPage,
        guard: AuthGuard,
        roles: [RoleID.root]
      },
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