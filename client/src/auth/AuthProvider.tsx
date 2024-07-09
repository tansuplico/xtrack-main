import { useCallback, useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { userLogout } from "../lib/api/api";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const handleLogout = useCallback(async () => {
    try {
      await userLogout();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [userLogout]);

  useEffect(() => {
    const path = ["/dashboard", "/settings", "/categories", "/transactions"];
    const currentPath = path.some((p) => matchPath(p, location.pathname));

    if (!currentPath) handleLogout();
  }, [location.pathname, handleLogout]);
  return children;
};

export default AuthProvider;
