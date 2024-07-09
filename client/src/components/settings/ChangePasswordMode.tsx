import React from "react";
import { useModifyPassword } from "../../lib/react-query/queriesAndMutations";
import { toast } from "react-toastify";
import { TIslanPassword } from "../../types/types";

const ChangePasswordMode: React.FC<TIslanPassword> = ({
  setPassword,
  setRepassword,
  password,
  repassword,
  setChangePasswordMode,
  changePasswordMode,
}) => {
  const { mutateAsync: modifyPassword } = useModifyPassword();

  const updatePassword = async (password: string, repassword: string) => {
    await modifyPassword({ password: password, repassword: repassword });

    setPassword("");
    setRepassword("");
    toast.success("Password updated");
  };

  return (
    <form
      className="w-full flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        updatePassword(password, repassword);
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

        <button
          className="w-full bg-[#228B22] py-4 px-10 rounded-md cursor-pointer"
          onClick={() => setChangePasswordMode(!changePasswordMode)}
        >
          Personal Information
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordMode;
