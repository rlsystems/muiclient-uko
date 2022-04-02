
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
const TenantListPage = Loadable(lazy(() => import('./pages/tenants/TenantList')));
const UserListPage = Loadable(lazy(() => import('./pages/users/UserList')));
const VenueListPage = Loadable(lazy(() => import('./pages/venues/VenueList')));
const AccountSettingsPage = Loadable(lazy(() => import('./pages/profile/AccountSettings')));

export const renderRoutes = (routes: RouteType[] = []) => (
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component || React.Component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
);

const routes = [
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
    path: '/',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/venues',
        component: VenueListPage
      },
      {
        exact: true,
        path: '/profile',
        component: AccountSettingsPage
      },
      {
        exact: true,
        path: '/users',
        component: UserListPage
      },
      {
        exact: true,
        path: '/tenants',
        component: TenantListPage
      },
      {
        exact: true,
        path: '/',
        component: HomePage
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
        exact: true,
        path: '/',
        component: () => <Redirect to="/login" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;