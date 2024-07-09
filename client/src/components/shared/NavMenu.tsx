import React from "react";
import { TNavMenu } from "../../types/types";

const NavMenu: React.FC<TNavMenu> = ({ setShowSidebar }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        className="lg:hidden"
        onClick={() => setShowSidebar()}
      />
      <label htmlFor="checkbox" className="toggle lg:hidden">
        <div className="bars" id="bar1"></div>
        <div className="bars" id="bar2"></div>
        <div className="bars" id="bar3"></div>
      </label>
    </div>
  );
};

export default NavMenu;
