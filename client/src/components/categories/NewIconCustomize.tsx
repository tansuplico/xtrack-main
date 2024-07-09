import React from "react";
import { CSSTransition } from "react-transition-group";
import { TNewIconCustomize } from "../../types/types";

const NewIconCustomize: React.FC<TNewIconCustomize> = ({
  setNewColorSelected,
  setNewIconSelected,
  newIconRef,
  showNewIconCustomize,
  categoryToEdit,
  ex,
}) => {
  return (
    <CSSTransition
      in={showNewIconCustomize && ex.category === categoryToEdit}
      timeout={300}
      classNames="icon-customize"
      unmountOnExit
    >
      <div
        ref={newIconRef}
        className="absolute top-[8rem] w-full md:w-[60%] lg:w-full  bg-[#1A222B] rounded-md p-3 z-20"
      >
        <div>
          <h1 className="mb-5"> Color </h1>
          <div className="grid grid-cols-5 gap-4 place-items-center">
            <div
              className="w-[40px] h-[40px] bg-[#A52A2A] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("A52A2A")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#177245] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("177245")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FFBF00] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("FFBF00")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FF00FF] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("FF00FF")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#E97451] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("E97451")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#CD5700] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("CD5700")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#DE3163] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("DE3163")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#007FFF] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("007FFF")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#8A2BE2] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("8A2BE2")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FF4F00] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("FF4F00")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#100C08] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("100C08")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#808000] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("808000")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#00009C] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("00009C")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FF69B4] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("FF69B4")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#00CCCC] rounded-full cursor-pointer"
              onClick={() => setNewColorSelected("00CCCC")}
            ></div>
          </div>

          <h1 className="my-5"> Icon </h1>
          <div className="grid grid-cols-5 gap-4 place-items-center">
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/rent.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/rent.svg`}
                alt="rent"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/beauty.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/beauty.svg`}
                alt="beauty"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/bills.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/bills.svg`}
                alt="bills"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/car.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/car.svg`}
                alt="car"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/education.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/education.svg`}
                alt="education"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/entertainment.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/entertainment.svg`}
                alt="entertainment"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/food.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/food.svg`}
                alt="food"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/family.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/family.svg`}
                alt="family"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/grocery.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/grocery.svg`}
                alt="grocery"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/health.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/health.svg`}
                alt="health"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/shopping.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/shopping.svg`}
                alt="shopping"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/sports.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/sports.svg`}
                alt="sports"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/travel.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/travel.svg`}
                alt="travel"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/transportation.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/transportation.svg`}
                alt="transportation"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setNewIconSelected(`/assets/work.svg`)}
            >
              <img
                src={`http://localhost:5000/assets/work.svg`}
                alt="work"
                className="w-[26px]"
              />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NewIconCustomize;
