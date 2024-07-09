import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import stars from "../../assets/stars.svg";
import useWindowSize from "../../hooks/useWindowSize";
import { TReviews } from "../../types/types";

const Reviews: React.FC<TReviews> = ({ reviewsRef }) => {
  const size = useWindowSize();

  return (
    <section
      className="px-[10%] mt-[5rem] pb-[5rem] flex items-center flex-col"
      ref={reviewsRef}
    >
      <div className="text-center mb-[3rem] flex flex-col justify-center items-center">
        <h1 className="inter-800 text-[3rem]"> Reviews </h1>
        <p>What our users think about XTRACK </p>
      </div>

      <div className="w-full flex flex-col justify-between items-center relative">
        <div className="w-[80%] h-[15rem] bg-[#228B22] rounded-[2rem] absolute z-0"></div>

        <div className="w-full flex flex-col lg:flex-row justify-between z-[100] mt-5">
          {size.width !== undefined && size.width < 1024 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper w-full h-full"
            >
              <SwiperSlide className="pb-10">
                <div className="bg-[#1A222B] p-7 flex flex-col gap-2 rounded-lg">
                  <h1 className="inter-800 text-[1.9rem] text-[#228B22]">
                    Edgar
                  </h1>
                  <img src={stars} alt="stars" className="w-[6rem]" />
                  <p className="text-[1.15rem] italic leading-[1.9]">
                    “I've tried numerous expense tracking apps before stumbling
                    upon this gem, and let me tell you, it's been a
                    game-changer! The interface is so clean and intuitive,
                    making it a breeze to stay on top of my spending.”
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="pb-10">
                <div className="bg-[#1A222B] p-7 flex flex-col gap-2 rounded-lg">
                  <h1 className="inter-800 text-[1.9rem] text-[#228B22]">
                    Dhonnah
                  </h1>
                  <img src={stars} alt="stars" className="w-[6rem]" />
                  <p className="text-[1.15rem] italic leading-[1.9]">
                    "XTRACK is the best expense tracking app I've ever used; its
                    clean, intuitive interface makes managing my finances a
                    breeze. The detailed reports have completely transformed how
                    I track my spending."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide className="pb-10">
                <div className="bg-[#1A222B] p-7 flex flex-col gap-2 rounded-lg">
                  <h1 className="inter-800 text-[1.9rem] text-[#228B22]">
                    Lara
                  </h1>
                  <img src={stars} alt="stars" className="w-[6rem]" />
                  <p className="text-[1.15rem] italic leading-[1.9]">
                    "XTRACK has revolutionized my expense tracking with its
                    simple, user-friendly design. The instant transaction
                    updates and insightful spending reports make budgeting
                    easier than ever."
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          ) : (
            <>
              <div className="w-[31%] bg-[#1A222B] p-7 flex flex-col gap-2 rounded-lg">
                <h1 className="inter-800 text-[#228B22] text-[1.9rem]">
                  Edgar
                </h1>
                <img src={stars} alt="stars" className="w-[35%]" />
                <p className="text-[1.15rem] italic leading-[1.9]">
                  “I've tried numerous expense tracking apps before stumbling
                  upon this gem, and let me tell you, it's been a game-changer!
                  The interface is so clean and intuitive, making it a breeze to
                  stay on top of my spending.”
                </p>
              </div>

              <div className="w-[31%] bg-[#1A222B] p-7 flex flex-col gap-2 rounded-lg">
                <h1 className="inter-800 text-[#228B22] text-[1.9rem]">
                  Dhonnah
                </h1>
                <img src={stars} alt="stars" className="w-[35%]" />
                <p className="text-[1.15rem] italic leading-[1.9]">
                  "XTRACK is the best expense tracking app I've ever used; its
                  clean, intuitive interface makes managing my finances a
                  breeze. The detailed reports and seamless bank integration
                  have completely transformed how I track my spending."
                </p>
              </div>

              <div className="w-[31%] bg-[#1A222B] p-7 flex flex-col gap-2 rounded-lg">
                <h1 className="inter-800 text-[#228B22] text-[1.9rem]">Lara</h1>
                <img src={stars} alt="stars" className="w-[35%]" />
                <p className="text-[1.15rem] italic leading-[1.9]">
                  "XTRACK has revolutionized my expense tracking with its
                  simple, user-friendly design. The instant transaction updates
                  and insightful spending reports make budgeting easier than
                  ever."
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
