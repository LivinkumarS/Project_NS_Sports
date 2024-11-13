import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  function reDirect() {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/");
    }
    return;
  }

  useEffect(() => {
    reDirect();
  }, []);
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}