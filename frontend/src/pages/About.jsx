import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="about-container">
      {/* Title Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Image Section */}
        <img
          className="w-full md:max-w-[450px]"
          src={assets?.about_img}  // Ensure safe access
          alt="About AbleMind"
        />

        {/* Text Section */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <strong>AbleMind</strong> was born from a passion for inclusivity 
            and a commitment to transforming learning. We believe in breaking 
            barriers and redefining education to make it accessible for everyone. 
            Our journey is driven by innovation, creativity, and a deep sense of 
            responsibility to empower learners of all abilities.
          </p>

          <h2 className="text-lg font-semibold text-gray-800">Our Mission</h2>
          <p>
            At AbleMind, our mission is to make education accessible, empowering, 
            and personalized. We strive to remove obstacles in learning by combining 
            cutting-edge technology with thoughtful design, ensuring that 
            everyone—regardless of ability—has the opportunity to grow, learn, and succeed.
          </p>
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Additional Information Section */}
      <div className="flex flex-col md:flex-row text-sm mb-20">
        {[
          {
            title: "Inclusive Learning",
            description: "Courses designed for all abilities, with accessibility at the core."
          },
          {
            title: "Personalized Experience",
            description: "Adaptive learning paths tailored to individual needs."
          },
          {
            title: "Expert-Curated Content",
            description: "High-quality, research-backed educational materials."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Newsletter Subscription */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
