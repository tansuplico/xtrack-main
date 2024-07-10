import React from "react";
import { CSSTransition } from "react-transition-group";
import { TIconCustomize } from "../../types/types";

const IconCustomize: React.FC<TIconCustomize> = ({
  setColorSelected,
  setIconSelected,
  iconRef,
  showIconCustomize,
}) => {
  return (
    <CSSTransition
      in={showIconCustomize}
      timeout={300}
      classNames="icon-customize"
      unmountOnExit
    >
      <div
        ref={iconRef}
        className="absolute top-[6rem] w-full lg:w-[40%] bg-[#1A222B] rounded-md p-3 z-10"
      >
        <div>
          <h1 className="mb-5"> Color </h1>
          <div className="grid grid-cols-5 gap-4 place-items-center">
            <div
              className="w-[40px] h-[40px] bg-[#A52A2A] rounded-full cursor-pointer"
              onClick={() => setColorSelected("A52A2A")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#177245] rounded-full cursor-pointer"
              onClick={() => setColorSelected("177245")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FFBF00] rounded-full cursor-pointer"
              onClick={() => setColorSelected("FFBF00")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FF00FF] rounded-full cursor-pointer"
              onClick={() => setColorSelected("FF00FF")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#E97451] rounded-full cursor-pointer"
              onClick={() => setColorSelected("E97451")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#CD5700] rounded-full cursor-pointer"
              onClick={() => setColorSelected("CD5700")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#DE3163] rounded-full cursor-pointer"
              onClick={() => setColorSelected("DE3163")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#007FFF] rounded-full cursor-pointer"
              onClick={() => setColorSelected("007FFF")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#8A2BE2] rounded-full cursor-pointer"
              onClick={() => setColorSelected("8A2BE2")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FF4F00] rounded-full cursor-pointer"
              onClick={() => setColorSelected("FF4F00")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#100C08] rounded-full cursor-pointer"
              onClick={() => setColorSelected("100C08")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#808000] rounded-full cursor-pointer"
              onClick={() => setColorSelected("808000")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#00009C] rounded-full cursor-pointer"
              onClick={() => setColorSelected("00009C")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#FF69B4] rounded-full cursor-pointer"
              onClick={() => setColorSelected("FF69B4")}
            ></div>
            <div
              className="w-[40px] h-[40px] bg-[#00CCCC] rounded-full cursor-pointer"
              onClick={() => setColorSelected("00CCCC")}
            ></div>
          </div>

          <h1 className="my-5"> Icon </h1>
          <div className="grid grid-cols-5 gap-4 place-items-center">
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/rent.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/rent.svg`}
                alt="rent"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/beauty.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/beauty.svg`}
                alt="beauty"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/bills.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/bills.svg`}
                alt="bills"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/car.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/car.svg`}
                alt="car"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/education.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/education.svg`}
                alt="education"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/entertainment.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/entertainment.svg`}
                alt="entertainment"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/food.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/food.svg`}
                alt="food"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/family.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/family.svg`}
                alt="family"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/grocery.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/grocery.svg`}
                alt="grocery"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/health.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/health.svg`}
                alt="health"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/shopping.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/shopping.svg`}
                alt="shopping"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/sports.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/sports.svg`}
                alt="sports"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/travel.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/travel.svg`}
                alt="travel"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/transportation.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/transportation.svg`}
                alt="transportation"
                className="w-[26px]"
              />
            </div>
            <div
              className="w-[40px] h-[40px] bg-[#8B8589] flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setIconSelected(`/work.svg`)}
            >
              <img
                src={`https://xtrack-main.onrender.com/work.svg`}
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

export default IconCustomize;
