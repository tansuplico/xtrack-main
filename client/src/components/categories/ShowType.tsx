import React from "react";
import { CSSTransition } from "react-transition-group";
import { TShowType } from "../../types/types";

const ShowType: React.FC<TShowType> = ({
  typeRef,
  setTypeSelected,
  setShowType,
  showType,
}) => {
  return (
    <CSSTransition
      in={showType}
      timeout={300}
      classNames="icon-customize"
      unmountOnExit
    >
      <div
        ref={typeRef}
        className="absolute bottom-[-3rem] xmd:bottom-[-9rem] lg:top-[6rem] w-full lg:right-[25%] xmd:w-[48%] lg:w-[22%] xl:w-[24%] bg-[#1A222B] rounded-md z-10"
      >
        <div
          className="px-5 py-5 cursor-pointer rounded-md hover:bg-[#228B22] transition-all"
          onClick={() => {
            setTypeSelected("Income");
            setShowType(false);
          }}
        >
          <h1> Income </h1>
        </div>

        <div
          className="px-5 py-5 cursor-pointer rounded-md hover:bg-[#228B22] transition-all"
          onClick={() => {
            setTypeSelected("Expenses");
            setShowType(false);
          }}
        >
          <h1> Expense </h1>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ShowType;
