import React from "react";
import BannerImg from "../../assets/121image.jpg";

const Banner2 = () => {
  return (
    <div className="py-14 dark:bg-dark bg-white duration-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <div data-aos="zoom-in" className="flex items-center gap-4">
                <div className="text-primary/70 text-7xl ">
                  <h1 className="font-bold">02</h1>
                </div>
                <div>
                  <p className="text-primary">WHAT WE DO</p>
                  <h1 className="text-2xl sm:text-4xl font-bold">1-2-1 Personal Training</h1>
                  <h4></h4>
                </div>
              </div>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              1-2-1 personal training is the ultimate investment in your health. You'll be working directly with your coach in our private studio, following a bespoke plan to ensure you hit your goals in record time. Whether you want to slim down, add muscle or anything in between, our personal training packages will get you there in a fun and sustainable way.
              </p>
              <p data-aos="fade-up" data-aos-delay="300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                tempora.
              </p>
              <button data-aos="fade-up" className="button-outline">
                Get Started
              </button>
            </div>
          </div>
          {/* Image section */}
          <div data-aos="fade-up">
            <img
              src={BannerImg}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
