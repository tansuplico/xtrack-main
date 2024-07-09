import phone from "../../assets/phone.png";

const Banner = () => {
  return (
    <section className="w-full px-[10%] mt-[2rem] md:mt-[5rem] flex flex-col gap-[7rem] md:gap-[5rem] lg:gap-5 lg:flex-row items-center">
      <div className="w-full lg:w-[50%] text-center">
        <h1 className="inter-800 text-[2.7rem] lg:text-[4rem] leading-[1]">
          Simplify your spending, master your money.
        </h1>
        <p className="text-[0.8rem] lg:text-[1rem] leading-2 mt-5 ">
          XTrack is an easy-to-use web application with a minimal design,
          crafted to streamline expense tracking and simplify your money
          management.
        </p>
      </div>

      <div className="w-full lg:w-[50%] flex justify-center items-center">
        <img
          src={phone}
          alt="phone"
          className="w-[75%] xsm:w-[45%] xmd:w-[40%] md:w-[33%] lg:w-[20%] h-[25rem] xmd:h-[27rem] xl:h-[33rem] absolute"
        />
        <div className="w-[16rem] h-[16rem] xsm:w-[18rem] xsm:h-[18rem] xmd:w-[22rem] xmd:h-[22rem] md:w-[24rem] md:h-[24rem] xl:w-[26rem] xl:h-[26rem] bg-[#228B22] rounded-[14rem]"></div>
      </div>
    </section>
  );
};

export default Banner;
