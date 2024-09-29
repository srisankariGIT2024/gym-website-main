import React from "react";
import BannerImg from "../../assets/banner.png";

const About = () => {
  return (
    
    <div className="py-14 dark:bg-black bg-slate-100 duration-300">
      <div className="container">
      <span id="services"></span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
          <div data-aos="fade-up">
            <img
              src={BannerImg}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mx-auto"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <div data-aos="zoom-in" className="flex items-center gap-4">
                <div className="text-primary/70 text-7xl ">
                  <h1 className="font-bold">01</h1>
                </div>
                <div>
                  <p className="text-primary">WHAT WE DO</p>
                  <h1 className="text-2xl sm:text-4xl font-bold">SmaLL Group Personal Training</h1>
                </div>
              </div>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              Our Small Group Personal Training is unlike anything you'll have experienced before. In micro training groups of just 6:1, all your workouts are customised for you, recorded and coached by an experienced personal trainer. The balance of the motivational group environment, 1-2-1 attention and your own personal nutrition & accountability coach makes it the perfect mix to produce fast results, without the bounce back
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
