import React from "react";

const Results = () => {
  return (
    <div className="dark:bg-black text-white dark:text-white py-14">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* first col */}
          <div className="bg-dark/50 p-4 grid place-items-center">
            <div className="text-center space-y-3">
              <h1 className="text-5xl font-bold">12+</h1>
              <p className="text-xl font-semibold">Years of Experience</p>
            </div>
          </div>
          {/* second col */}
          <div className="grid grid-rows-2 gap-4">
            <div className="text-center p-6 bg-dark">
              <h1 className="text-3xl font-bold">600+</h1>
              <p>Happy Clients</p>
            </div>
            <div className="text-center p-6 bg-[#343131]">
              <h1 className="text-3xl font-bold">120+</h1>
              <p>Successful Champions</p>
            </div>
          </div>
          {/* Third col */}
          <div className="grid grid-rows-2 gap-4">
            <div className="text-center p-6 bg-[#3C3D37]">
              <h1 className="text-3xl font-bold">500+</h1>
              <p>Satisfied Transformations</p>
            </div>
            <div className="text-center p-6 bg-[#0B192C]">
              <h1 className="text-3xl font-bold">450+</h1>
              <p>Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
