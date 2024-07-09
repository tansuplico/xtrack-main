import "./globals.css";
import Navbar from "./components/root/Navbar";
import Banner from "./components/root/Banner";
import Features from "./components/root/Features";
import Reviews from "./components/root/Reviews";
import Pricing from "./components/root/Pricing";
import Footer from "./components/root/Footer";
import { useRef } from "react";

const App = () => {
  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);
  const pricingRef = useRef(null);

  return (
    <main className="w-full bg-[#010B13] text-white">
      <Navbar
        featuresRef={featuresRef}
        reviewsRef={reviewsRef}
        pricingRef={pricingRef}
      />
      <Banner />
      <Features featuresRef={featuresRef} />
      <Reviews reviewsRef={reviewsRef} />
      <Pricing pricingRef={pricingRef} />
      <Footer />
    </main>
  );
};

export default App;
