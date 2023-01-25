import React, { Fragment, ReactNode } from "react";
import { useStore } from "../../app/stores/store";
import router from "router";

interface GuestGuardProps {
  children: ReactNode;
}

// this handles the initial redirection
const GuestGuard = ({ children }: GuestGuardProps) => {
  const { currentUserStore: {isLoggedIn} } = useStore();

  if (isLoggedIn) router.navigate("/venues")

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
