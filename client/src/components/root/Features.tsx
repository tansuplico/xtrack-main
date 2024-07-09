import moon from "../../assets/moon.svg";
import custom from "../../assets/custom.svg";
import easy from "../../assets/easy.svg";
import { TFeatures } from "../../types/types";

const Features: React.FC<TFeatures> = ({ featuresRef }) => {
  return (
    <section
      className="w-full px-[10%] mt-[5rem] py-[5rem] lg:py-[10rem] flex items-center flex-col"
      ref={featuresRef}
    >
      <div className="w-full text-center mb-[3.5rem] flex flex-col justify-center items-center">
        <h1 className="inter-800 text-[2.7rem] lg:text-[3rem]">Features</h1>
        <p className="w-full lg:w-[52%] text-[0.9rem] md:text-[1.2rem]">
          Discover the unique capabilities that set our platform apart in
          simplifying your financial life.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-[5rem] lg:gap-0 justify-between lg:items-start items-center">
        <div className="w-full lg:w-[25%] flex flex-col gap-3">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-[30px] lg:w-[80px] lg:h-[80px] lg:rounded-[40px] bg-[#228B22] flex justify-center items-center">
              <img
                src={moon}
                alt="moon"
                className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]"
              />
            </div>
            <h1 className="inter-800 text-[1.8rem] leading-[1.2]">
              Eye <br /> Comfort
            </h1>
          </div>
          <p className="md:text-[1.2rem] leading-[1.7]">
            offers a default dark mode UI, reducing eye strain and providing a
            sleek, user-friendly experience in low-light environments.
          </p>
        </div>

        <div className="w-full lg:w-[25%] flex flex-col gap-3">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-[30px] lg:w-[80px] lg:h-[80px] lg:rounded-[40px] bg-[#228B22] flex justify-center items-center">
              <img
                src={custom}
                alt="moon"
                className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]"
              />
            </div>
            <h1 className="inter-800 text-[1.8rem] leading-[1.2]">
              Custom <br /> Layout
            </h1>
          </div>
          <p className="md:text-[1.2rem] leading-[1.7]">
            allow users to tailor their expense tracking to their unique needs,
            making it easy to organize and manage finances in a way that fits
            their lifestyle.
          </p>
        </div>

        <div className="w-full lg:w-[25%] flex flex-col gap-3">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-[30px] lg:w-[80px] lg:h-[80px] lg:rounded-[40px] bg-[#228B22] flex justify-center items-center">
              <img
                src={easy}
                alt="moon"
                className="w-[2rem] h-[2rem] lg:w-[3.5rem] lg:h-[3.5rem]"
              />
            </div>
            <h1 className="inter-800 text-[1.8rem] leading-[1.2]">
              Easy to <br /> use
            </h1>
          </div>
          <p className="md:text-[1.2rem] leading-[1.7]">
            ensures a clean interface that simplifies expense tracking, making
            financial management straightforward and stress-free for all users.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
