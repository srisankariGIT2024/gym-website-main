import React from "react";
import BannerImg from "../../assets/Nutrition-Coach.jpg";
import TransformationImg from "../../assets/beforeandafter.jpg"; // Use one image for both before and after

const FeedbackCard = ({ image, feedback }) => (
  <div className="border rounded-lg shadow-md p-4 text-center transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200">
    <div className="flex flex-col items-center">
      <img src={image} alt="Before and After Transformation" className="h-32 w-32 rounded-lg mb-2" />
      <h2 className="text-xl font-semibold text-primary">Before & After</h2>
    </div>
    <p className="mt-4 text-gray-700">{feedback}</p>
  </div>
);

const Transformation = () => {
  return (
    <div className="py-14 dark:bg-black bg-slate-100 duration-300">
      <span id="transformation"></span>
      <div className="container">
        <div className="pb-12">
          <h1
            data-aos="fade-up"
            className="text-3xl font-bold text-center sm:text-4xl aos-init aos-animate"
          >
            See <span className="text-primary">Client's</span> Transformation
          </h1>
        </div>
        {/* Cards for Before/After transformations and feedback */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeedbackCard
            image={TransformationImg}
            feedback="I lost 20 pounds in 3 months and learned to enjoy food again!"
          />
          <FeedbackCard
            image={TransformationImg}
            feedback="The coaching helped me build healthy habits for life!"
          />
          <FeedbackCard
            image={TransformationImg}
            feedback="I never thought I could reach my goals, but with guidance, I did!"
          />
        </div>
      </div>
    </div>
  );
};

export default Transformation;
