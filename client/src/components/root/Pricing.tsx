import check from "../../assets/check.svg";
import { TPricing } from "../../types/types";

const Pricing: React.FC<TPricing> = ({ pricingRef }) => {
  return (
    <section
      className="w-full px-[10%] lg:mt-[5rem] pt-[5rem] pb-[5rem] lg:pb-[15rem] flex items-center flex-col relative"
      ref={pricingRef}
    >
      <div className="w-full mb-10 lg:mb-0 text-center flex flex-col justify-center items-center z-10">
        <h1 className="inter-800 text-[2.7rem] lg:text-[3rem]"> Pricing </h1>
        <p className="w-full lg:w-[50%] lg:text-[1.2rem]">
          Choose the plan that best suits your financial goals and unlock a
          world of possibilities with our flexible pricing options.
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 z-10">
        <div className="w-full lg:w-[33%] p-9 bg-[#1A222B] rounded-xl flex flex-col gap-7 lg:mt-[15rem]">
          <div>
            <h1 className="inter-800 text-[2rem] lg:text-[1.8rem]"> Basic </h1>
            <h1 className="inter-800 text-[2rem] lg:text-[1.8rem] mlg:text-[3rem]">
              Free
            </h1>
          </div>
          <p>
            Access essential financial tools and tracking capabilities for free
            with our basic version
          </p>
          <button className="w-full p-5 bg-[#228B22] hover:bg-[#228835] transition-all rounded-xl">
            <span className="font-bold text-[1.2rem]">Get Started</span>
          </button>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Up to 2 wallets </span>
            </div>

            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Basic chart features </span>
            </div>

            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Detailed Dashboard </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[33%] p-9 bg-[#1A222B] rounded-xl flex flex-col gap-7 ">
          <div>
            <h1 className="inter-800 text-[1.5rem] lg:text-[1.8rem]">
              Premium
            </h1>
            <h1 className="inter-800 text-[2rem] lg:text-[1.8rem] mlg:text-[3rem]">
              ₱599.00
              <span className="text-[0.7rem] lg:text-[1.2rem]"> /year </span>
            </h1>
          </div>
          <p>
            Unlock advanced features and exclusive benefits with our premium
            version
          </p>
          <button className="w-full p-5 bg-[#228B22] hover:bg-[#228835] transition-all rounded-xl">
            <span className="font-bold text-[1.2rem]">Purchase</span>
          </button>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Unlimited wallets </span>
            </div>

            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Advance chart features </span>
            </div>

            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Unlimited wallet members </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[33%] p-9 bg-[#1A222B] rounded-xl flex flex-col gap-7 lg:mt-[15rem]">
          <div>
            <h1 className="inter-800 text-[2rem] lg:text-[1.8rem]"> Plus </h1>
            <h1 className="inter-800 text-[2rem] lg:text-[1.8rem] mlg:text-[3rem]">
              ₱299.00
              <span className="text-[0.7rem] lg:text-[1.2rem]"> /year </span>
            </h1>
          </div>
          <p>
            Upgrade to our Plus version for enhanced functionality and added
            convenience
          </p>
          <button className="w-full p-5 bg-[#228B22] hover:bg-[#228835] transition-all rounded-xl">
            <span className="font-bold text-[1.2rem]">Purchase</span>
          </button>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Up to 7 wallets </span>
            </div>

            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Up to 25+ Currencies </span>
            </div>

            <div className="flex gap-5 items-center">
              <img src={check} alt="check" className="w-8" />
              <span> Up to 3 wallet members </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[60rem] lg:h-[60rem] rounded-[30rem] bg-[#228B22] absolute top-[20%] z-0"></div>
    </section>
  );
};

export default Pricing;
