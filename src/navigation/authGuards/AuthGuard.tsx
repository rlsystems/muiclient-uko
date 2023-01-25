import { Roles } from "app/models/roles";
import React, { Fragment, ReactNode } from "react";
import { useStore } from "../../app/stores/store";
import router from "router";

interface AuthGuardProps {
  children: ReactNode;
  roles?: Roles[]
}

const AuthGuard = ({ children, roles }: AuthGuardProps) => {
  const { currentUserStore: {isLoggedIn, currentUser} } = useStore();

  if (!isLoggedIn) router.navigate("/login")
  if (roles && !roles.includes(currentUser?.roleId as Roles)) router.navigate("/403")

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
