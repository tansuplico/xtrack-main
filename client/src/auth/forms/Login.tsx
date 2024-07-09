import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TUserData } from "../../types/types";
import { useLoginUser } from "../../lib/react-query/queriesAndMutations";
import Loader from "../../components/shared/Loader";
import { useContext } from "react";
import { RecoveryContext } from "../AuthLayout";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { email, setEmail, setOTP } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const { mutateAsync: userLogin, isPending: isLoggingUser } = useLoginUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData: Pick<TUserData, "email" & "password"> = { email, password };

    setEmail("");
    setPassword("");

    try {
      await userLogin(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  const navigateToOTP = () => {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);

      axios
        .post("http://localhost:5000/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => {
          navigate("/otp");
        })
        .catch(() => {
          toast.error("An error has occured, please try again.");
        });
      return;
    }

    return toast.error("Enter your email first");
  };

  return (
    <div className="w-[45%] flex flex-col justify-center items-center text-center">
      <h1 className="inter-800 text-[1.7rem]">Welcome Back!</h1>
      <h3 className="mb-5">
        No account yet?
        <Link to="/signup">
          <span className="text-[#228B22] underline font-bold ml-1 cursor-pointer">
            Sign up here!
          </span>
        </Link>
      </h3>

      <form
        className="w-[80%] text-start flex flex-col gap-7 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex flex-col px-5 gap-1 ">
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            className="bg-[#1A222B] py-5 px-5 rounded-lg focus:outline-none"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
          />
        </div>

        <div className="w-full flex flex-col px-5 gap-1">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            className="bg-[#1A222B] py-5 px-5 rounded-lg focus:outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
          <div className="flex justify-end mt-2">
            <span
              className="underline font-bold text-[.8rem] cursor-pointer"
              onClick={() => navigateToOTP()}
            >
              Forgot password?
            </span>
          </div>
        </div>

        <div className="w-full px-5">
          <button
            type="submit"
            className="w-full bg-[#228B22] py-3 rounded-lg font-bold"
          >
            {isLoggingUser ? <Loader /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
