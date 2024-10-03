import React, { useContext, useEffect } from "react";
import { Session } from "@/context/user";
import { useNavigate } from "react-router-dom";
import { HOME } from "@/pages/routes";
import { ROLE } from "@/helpers/consts";

const Guard = ({ children }) => {
  const navigate = useNavigate();
  const { state } = useContext(Session);
  const { user } = state;

  const isAdmin = user?.role == ROLE.admin;

  useEffect(() => {
    // admin space
    (!user || !isAdmin) && navigate(HOME);
  }, []);

  return <>{user && isAdmin && children}</>;
};

export default Guard;
