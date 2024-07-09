import { useEffect, useState } from "react";
import { useGetUser } from "../../lib/react-query/queriesAndMutations";
import WalletDetails from "../../components/settings/WalletDetails";
import AccountDetails from "../../components/settings/AccountDetails";
import ChangePasswordMode from "../../components/settings/ChangePasswordMode";
import NavMenu from "../../components/shared/NavMenu";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
  const { setShowSidebar } = useOutletContext<{
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  const { data: getUser } = useGetUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (getUser) {
      setUsername(
        getUser[0].username[0].toUpperCase() + getUser[0].username.slice(1)
      );
      setEmail(getUser[0].email);
    }
  }, [getUser]);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full md:h-screen px-[2rem] lg:px-[1rem] xl:px-[5rem] py-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[1.7rem] font-bold "> Settings </h1>
        <NavMenu setShowSidebar={toggleSidebar} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[45%]">
          <h1 className="text-[1.2rem] font-bold mb-3"> Wallet Details </h1>

          <WalletDetails />
        </div>
        <div className="w-full md:w-[50%]">
          <h1 className="text-[1.2rem] font-bold mb-3"> Account Details </h1>

          <div className="flex flex-col gap-5">
            {changePasswordMode ? (
              <ChangePasswordMode
                setPassword={setPassword}
                setRepassword={setRepassword}
                password={password}
                repassword={repassword}
                setChangePasswordMode={setChangePasswordMode}
                changePasswordMode={changePasswordMode}
              />
            ) : (
              <AccountDetails
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                setUsername={setUsername}
                username={username}
                email={email}
                setChangePasswordMode={setChangePasswordMode}
                changePasswordMode={changePasswordMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
