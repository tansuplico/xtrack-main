import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";

const Footer = () => {
  return (
    <footer className="w-full px-[10%] pt-[4rem] lg:pt-[8rem] pb-[3rem] flex items-center flex-col relative">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] mb-10">
          <h1 className="anton-regular text-[2rem] mb-2"> XTRACK</h1>
          <h3>
            Keep your finances <br /> in check, every time
          </h3>
        </div>
        <div className="w-full lg:w-[40%] flex flex-col lg:flex-row gap-5 lg:gap-[8rem] ">
          <div>
            <h1 className="font-bold text-[1.2rem] mb-3"> More </h1>
            <ul className="flex flex-col gap-3">
              <li className="w-max menu-item relative inline-block cursor-pointer">
                Privacy and Policy
              </li>
              <li className="w-max menu-item relative inline-block cursor-pointer">
                FAQ
              </li>
              <li className="w-max menu-item relative inline-block cursor-pointer">
                Terms
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold text-[1.2rem] mb-3"> Follow Us </h1>
            <div className="flex gap-5">
              <img src={facebook} alt="fb" className="w-8 cursor-pointer" />
              <img src={twitter} alt="tw" className="w-8 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[10rem] flex items-center justify-center ">
        <span> Tristan Suplico © 2024 </span>
      </div>
    </footer>
  );
};

export default Footer;
