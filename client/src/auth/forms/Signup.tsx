import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "../../lib/react-query/queriesAndMutations";
import Loader from "../../components/shared/Loader";
import { TUserData } from "../../types/types";
import {} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: userSignUp, isPending: isCreatingUser } =
    useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData: TUserData = { username, email, password };

    setUsername("");
    setEmail("");
    setPassword("");

    try {
      await userSignUp(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="w-[45%] flex flex-col justify-center items-center text-center">
      <h1 className="inter-800 text-[1.7rem]">Register</h1>
      <h3 className="mb-5">
        Already have an account?
        <Link to="/login">
          <span className="text-[#228B22] underline font-bold ml-1 cursor-pointer">
            Login here!
          </span>
        </Link>
      </h3>

      <form
        className="w-[80%] text-start flex flex-col gap-7"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex flex-col px-5 gap-1">
          <label htmlFor="username"> Username </label>
          <input
            type="text"
            className="bg-[#1A222B] py-5 px-5 rounded-lg focus:outline-none"
            placeholder="Username"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>

        <div className="w-full flex flex-col px-5 gap-1">
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            className="bg-[#1A222B] py-5 px-5 rounded-lg focus:outline-none"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div className="w-full flex flex-col px-5 gap-1">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            className="bg-[#1A222B] py-5 px-5 rounded-lg focus:outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <div className="w-full px-5">
          <button
            type="submit"
            className="w-full bg-[#228B22] py-3 rounded-lg font-bold"
          >
            {isCreatingUser ? <Loader /> : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
