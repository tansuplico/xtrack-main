// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { RecoveryContext } from "./AuthLayout";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { email, otp } = useContext(RecoveryContext);

  if (!email || !otp) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
