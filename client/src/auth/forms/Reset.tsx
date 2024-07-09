import { useContext, useState } from "react";
import { useResetPassword } from "../../lib/react-query/queriesAndMutations";
import { toast } from "react-toastify";
import { RecoveryContext } from "../AuthLayout";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();
  const { mutateAsync: resetPassword } = useResetPassword();
  const { email } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const updatePassword = async (
    password: string,
    repassword: string,
    email: string
  ) => {
    await resetPassword({
      password: password,
      repassword: repassword,
      email: email,
    });

    setPassword("");
    setRepassword("");
    navigate("/login");
    toast.success("Password updated");
  };
  return (
    <div className="w-full flex justify-center items-center ">
      <form
        className="w-[80%] md:w-[50%] xl:w-[30%] flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword(password, repassword, email);
        }}
      >
        <div className="w-full ">
          <span className="text-[.8rem]"> New Password </span>
          <div className="bg-[#1A222B] rounded-md">
            <input
              type="password"
              className="w-full py-4 px-5 bg-transparent focus:outline-none"
              placeholder="New Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <span className="text-[.8rem]"> Re-enter New Password </span>
          <div className="bg-[#1A222B] rounded-md">
            <input
              type="password"
              className="w-full py-4 px-5 bg-transparent focus:outline-none"
              placeholder="Re-enter New Password "
              onChange={(e) => setRepassword(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            className="w-full bg-[#228B22] py-4 px-10 rounded-md cursor-pointer"
            type="submit"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
