import dashboard from "../../assets/dashboard.svg";
import categories from "../../assets/categories.svg";
import transactions from "../../assets/transactions.svg";
import logout from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useGetUser } from "../../lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";

interface SidebarProps {
  onLogout: () => Promise<void>;
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onLogout,
  showSidebar,
  setShowSidebar,
}) => {
  const { data: getUser } = useGetUser();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    if (getUser) {
      setUsername(
        getUser[0].username[0].toUpperCase() + getUser[0].username.slice(1)
      );
      setProfileImage(getUser[0].image);
    }
  }, [getUser]);

  return (
    <aside
      className={`absolute ${
        showSidebar ? "left-0" : "left-[-50rem]"
      } lg:static w-[70%] md:w-[40%] lg:w-[25%] h-screen bg-[#020B11] border-r border-[#1A222B] py-5 flex flex-col justify-between transition-all z-50`}
    >
      <div>
        <div className="px-5 mb-10">
          <div className="mb-5">
            <h1 className="inter-800-italic text-[1.5rem] pl-5 text-[#228B22]">
              XTrack
            </h1>
          </div>

          <div className="px-5 py-2 flex justify-start items-center gap-3 bg-[#1A222B] rounded-lg ">
            <img
              src={
                profileImage
                  ? `http://localhost:5000/assets${profileImage}`
                  : `http://localhost:5000/assets/male-one.svg`
              }
              alt="profile"
              className="w-[50px] h-[50px] rounded-[25px]"
            />

            <div className="w-[70%]">
              <h1 className="font-bold">{username}</h1>
              <h3 className="text-[.8rem]"> Free </h3>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h1 className="px-5 mb-5 font-bold text-[#228B22] "> General </h1>
          <ul className="flex flex-col gap-5">
            <Link to="/dashboard" onClick={() => setShowSidebar(false)}>
              <li className="px-5 flex justify-start items-center gap-4 cursor-pointer">
                <img src={dashboard} alt="dashboard" className="w-[35px]" />
                Dashboard
              </li>
            </Link>
            <Link to="/categories" onClick={() => setShowSidebar(false)}>
              <li className="px-5 flex justify-start items-center gap-4 cursor-pointer">
                <img src={categories} alt="categories" className="w-[35px]" />
                Categories
              </li>
            </Link>
            <Link to="/transactions" onClick={() => setShowSidebar(false)}>
              <li className="px-5 flex justify-start items-center gap-4 cursor-pointer">
                <img
                  src={transactions}
                  alt="transactions"
                  className="w-[35px]"
                />
                Transactions
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <h1 className="px-5 mb-5 font-bold text-[#228B22]"> Extras </h1>
          <ul className="flex flex-col gap-5">
            <Link to="/settings" onClick={() => setShowSidebar(false)}>
              <li className="px-5 flex justify-start items-center gap-4 cursor-pointer">
                <img src={dashboard} alt="dashboard" className="w-[35px]" />
                Settings
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div>
        <ul className="flex flex-col gap-5">
          <li
            className="px-5 flex justify-start items-center gap-4 cursor-pointer"
            onClick={handleLogout}
          >
            <img src={logout} alt="logout" className="w-[35px]" />
            Log out
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
