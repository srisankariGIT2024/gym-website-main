import React from "react";
import BannerImg from "../../assets/Nutrition-Coach.jpg";

const About = () => {
  return (
    <div className="py-14 dark:bg-black bg-slate-100 duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
          <div data-aos="fade-up">
            <img
              src={BannerImg}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[200px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mx-auto"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <div data-aos="zoom-in" className="flex items-center gap-4">
                <div className="text-primary/70 text-7xl ">
                  <h1 className="font-bold">03</h1>
                </div>
                <div>
                  <p className="text-primary">WHAT WE DO</p>
                  <h1 className="text-2xl sm:text-4xl font-bold">Nutrition Coaching</h1>
                </div>
              </div>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              We'll teach you how to take control of your health and weight, without relying on any specific diet or products, with our 1-2-1 nutrition coaching. You'll working alongside a qualified nutritionist to build a sustainable approach together, so you'll not only hit your physique goals, but be able to stay there without rigid diets or unrealistic restrictions.
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
        </div>
      </div>
    </div>
  );
};

export default About;
