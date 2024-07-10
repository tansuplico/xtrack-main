import { toast } from "react-toastify";
import maleOne from "../../assets/male-one.svg";
import maleTwo from "../../assets/male-two.svg";
import womanOne from "../../assets/woman-one.svg";
import womanTwo from "../../assets/woman-two.svg";
import { useModifyProfile } from "../../lib/react-query/queriesAndMutations";
import { TAccountDetails } from "../../types/types";

const AccountDetails: React.FC<TAccountDetails> = ({
  profileImage,
  setProfileImage,
  setUsername,
  username,
  email,
  setChangePasswordMode,
  changePasswordMode,
  isLoading,
}) => {
  const { mutateAsync: modifyUsername } = useModifyProfile();

  const updateProfile = async (username: string, image: string) => {
    await modifyUsername({ username: username, image: image });

    toast.success("Profile updated");
  };

  const toggleChangePasswordMode = () => {
    setChangePasswordMode(!changePasswordMode);
  };
  return (
    <>
      <div className="grid grid-cols-3 sm:flex gap-5">
        <img
          src={maleOne}
          alt="profile"
          onClick={() => setProfileImage("/male-one.svg")}
          className="w-12 cursor-pointer"
        />
        <img
          src={maleTwo}
          alt="profile"
          onClick={() => setProfileImage("/male-two.svg")}
          className="w-12 cursor-pointer"
        />
        <img
          src={womanOne}
          alt="profile"
          onClick={() => setProfileImage("/woman-one.svg")}
          className="w-12 cursor-pointer"
        />
        <img
          src={womanTwo}
          alt="profile"
          onClick={() => setProfileImage("/woman-two.svg")}
          className="w-12 cursor-pointer"
        />
      </div>

      <div>
        <span className="text-[.8rem]"> Username </span>
        <div className="bg-[#1A222B] rounded-md">
          <input
            type="text"
            className="w-full py-4 pl-5 bg-transparent focus:outline-none"
            placeholder="Username"
            onChange={(e) => setUsername(e.currentTarget.value)}
            value={isLoading ? "Loading... " : username}
          />
        </div>
      </div>

      <div>
        <span className="text-[.8rem]"> Email </span>
        <div className="bg-[#1A222B] rounded-md">
          <h1 className="py-4 pl-5 bg-transparent">
            {isLoading ? "Loading... " : email}
          </h1>
        </div>
      </div>

      <div>
        <span className="text-[.8rem]"> Password </span>
        <div className="bg-[#1A222B] rounded-md">
          <h1 className="py-4 pl-5 bg-transparent text-gray-500">
            ******************
          </h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-center gap-3">
        <button
          className="w-full bg-[#228B22] py-4 px-10 rounded-md cursor-pointer"
          onClick={() => updateProfile(username, profileImage)}
        >
          Save Changes
        </button>

        <button
          className="w-full bg-[#228B22] py-4 px-10 rounded-md cursor-pointer"
          onClick={toggleChangePasswordMode}
        >
          Change Password
        </button>
      </div>
    </>
  );
};

export default AccountDetails;
