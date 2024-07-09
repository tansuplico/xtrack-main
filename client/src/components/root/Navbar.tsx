import { MutableRefObject } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TNavbar } from "../../types/types";

const Navbar: React.FC<TNavbar> = ({ featuresRef, reviewsRef, pricingRef }) => {
  function showInView(ref: MutableRefObject<HTMLDivElement | null>) {
    if (!ref.current) {
      toast.error("Section doesn't exist");
    } else {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  return (
    <nav className="w-full bg-[#010B13] text-white flex items-center justify-between px-[10%] py-8">
      <div>
        <h1 className="inter-800-italic text-[#228B22] text-[2rem] italic">
          XTRACK
        </h1>
      </div>

      <Link to="/login">
        <button className="md:hidden bg-[#228B22] w-[7rem] py-1 ml-8 rounded-[5px]">
          <span> Sign In </span>
        </button>
      </Link>

      <div className="hidden text-[1.1rem] md:flex items-center">
        <ul className="flex gap-9">
          <li
            className="menu-item relative inline-block cursor-pointer"
            onClick={() => showInView(featuresRef)}
          >
            Features
          </li>
          <li
            className="menu-item relative inline-block cursor-pointer"
            onClick={() => showInView(reviewsRef)}
          >
            Reviews
          </li>
          <li
            className="menu-item relative inline-block cursor-pointer"
            onClick={() => showInView(pricingRef)}
          >
            Pricing
          </li>
        </ul>
        <Link to="/login">
          <button className="bg-[#228B22] w-[7rem] py-1 ml-8 rounded-[5px]">
            <span> Sign In </span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
