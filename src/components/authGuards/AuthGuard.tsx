import { Roles } from "app/models/roles";
import React, { Fragment, ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../../app/stores/store";

interface AuthGuardProps {
  children: ReactNode;
  roles?: Roles[]
}

const AuthGuard = ({ children, roles }: AuthGuardProps) => {
  const { currentUserStore: {isLoggedIn, currentUser} } = useStore();

  if (!isLoggedIn) return <Redirect to="/login" />;
  if (roles && !roles.includes(currentUser?.roleId as Roles)) return <Redirect to="/403" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
