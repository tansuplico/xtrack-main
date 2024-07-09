import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import {
  useCheckAuthUser,
  useLogoutUser,
} from "../lib/react-query/queriesAndMutations";
import CustomLoader from "../components/shared/CustomLoader";
import { Bounce, ToastContainer } from "react-toastify";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { mutateAsync: checkAuth } = useCheckAuthUser();
  const { mutateAsync: userLogout } = useLogoutUser();
  const [showSidebar, setShowSidebar] = useState(false);
  const [transactionBalance, setTransactionBalance] = useState(0);
  const authenticate = async () => {
    const authStatus = await checkAuth();
    setIsAuthenticated(authStatus);
  };

  const handleLogout = useCallback(async () => {
    try {
      await userLogout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [userLogout]);

  useEffect(() => {
    authenticate();
    const interval = setInterval(authenticate, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full relative xl:h-screen bg-[#010B13] text-white flex">
          <Sidebar
            onLogout={handleLogout}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <section className="w-full lg:w-[80%] lg:h-screen overflow-y-scroll ">
            <Outlet
              context={{
                showSidebar,
                setShowSidebar,
                transactionBalance,
                setTransactionBalance,
              }}
            />
          </section>
        </div>
      ) : isAuthenticated === null ? (
        <div className="bg-[#010B13] w-full h-screen flex justify-center items-center ">
          <CustomLoader />
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default MainLayout;
