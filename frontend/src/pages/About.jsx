import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="about-container px-6 md:px-12 lg:px-20 py-12 border-t">
      {/* ✅ Restore Navbar Bottom Border */}
      

      {/* ✅ Enhanced Title Section */}
      <div className="text-center mb-12">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Content Section */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
        {/* Image Section */}
        <div className="relative w-full md:max-w-[450px] overflow-hidden rounded-lg shadow-lg">
          <img
            className="w-full transition-transform duration-500 hover:scale-105"
            src={assets?.about_img} // Ensure safe access
            alt="About AbleMind"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 dark:text-gray-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-black dark:text-white text-2xl">AbleMind</strong> was born from a passion for inclusivity 
            and a commitment to transforming learning. We believe in breaking 
            barriers and redefining education to make it accessible for everyone. 
            Our journey is driven by innovation, creativity, and a deep sense of 
            responsibility to empower learners of all abilities.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At <strong>AbleMind</strong>, our mission is to make education accessible, empowering, 
            and personalized. We strive to remove obstacles in learning by combining 
            cutting-edge technology with thoughtful design, ensuring that 
            everyone—regardless of ability—has the opportunity to grow, learn, and succeed.
          </p>
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="text-center mb-12">
        <Title text1="WHY" text2="CHOOSE US" className="text-4xl font-extrabold tracking-wide" />
      </div>

      {/* Additional Information Section */}
      <div className="flex flex-col md:flex-row text-sm mt-12 mb-20 gap-6">
        {[
          {
            title: "📚 Inclusive Learning",
            description: "Courses designed for all abilities, with accessibility at the core."
          },
          {
            title: "🎯 Personalized Experience",
            description: "Adaptive learning paths tailored to individual needs."
          },
          {
            title: "🔬 Expert-Curated Content",
            description: "High-quality, research-backed educational materials."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="border px-10 md:px-16 py-10 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 dark:text-white"
          >
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Newsletter Subscription */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
