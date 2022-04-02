import React, { Fragment, ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../../app/stores/store";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const { userStore: {isLoggedIn} } = useStore();

  if (isLoggedIn) return <Redirect to="/dashboard" />;

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
