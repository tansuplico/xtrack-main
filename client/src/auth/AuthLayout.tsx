// import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

// Define the shape of your context value
type RecoveryContextType = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  otp: number | null;
  setOTP: Dispatch<SetStateAction<number | null>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const defaultValue = {
  page: "login",
  setPage: () => {},
  otp: null,
  setOTP: () => {},
  email: "",
  setEmail: () => {},
};
export const RecoveryContext = createContext<RecoveryContextType>(defaultValue);

const AuthLayout = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState<number | null>(null);
  const [page, setPage] = useState<string>("login");
  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="w-full h-screen bg-[#010B13] text-white">
        <nav className="w-full py-5 flex justify-center items-center">
          <h1 className="inter-800-italic text-[#228B22] text-[2.5rem] italic">
            XTRACK
          </h1>
        </nav>

        <section className="w-full flex justify-center items-center ">
          <Outlet />
        </section>
      </div>
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
    </RecoveryContext.Provider>
  );
};

export default AuthLayout;
