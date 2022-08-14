import React, { Fragment, ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../../app/stores/store";

interface GuestGuardProps {
  children: ReactNode;
}

// this handles the initial redirection
const GuestGuard = ({ children }: GuestGuardProps) => {
  const { currentUserStore: {isLoggedIn} } = useStore();

  if (isLoggedIn) return <Redirect to="/venues" />;

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
