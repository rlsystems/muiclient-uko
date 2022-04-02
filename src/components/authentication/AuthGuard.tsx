import React, { Fragment, ReactNode } from "react";
import { useStore } from "../../app/stores/store";
import Login from "../../pages/authentication/Login";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { userStore: {isLoggedIn} } = useStore();

  if (!isLoggedIn) return <Login />;

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
