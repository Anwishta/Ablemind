import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div className="about-container">
      {/* Title Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* About Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Image Section */}
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About"
        />

        {/* Text Section */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            AbleMind was born from a passion for inclusivity and a commitment to
            transforming learning. We believe in breaking barriers and
            redefining education to make it accessible for everyone. Our journey
            is driven by innovation, creativity, and a deep sense of
            responsibility to empower learners of all abilities. From the very
            beginning, we have worked tirelessly to create a diverse and
            inclusive learning environment. Our team carefully designs and
            curates courses that are not only engaging but also accessible to
            individuals with different learning needs. Every resource on our
            platform reflects our dedication to quality, adaptability, and
            inclusivity.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            At AbleMind, our mission is to make education accessible,
            empowering, and personalized. We strive to remove obstacles in
            learning by combining cutting-edge technology with thoughtful
            design, ensuring that everyone—regardless of ability—has the
            opportunity to grow, learn, and succeed.
          </p>
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* Additional Information (Optional) */}
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Inclusive Learning:</b>
          <p className="text-gray-600">
          Courses designed for all abilities, with accessibility at the core.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Personalized Experience:</b>
          <p className="text-gray-600">
          Adaptive learning paths tailored to individual needs.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Expert-Curated Content:</b>
          <p className="text-gray-600">
          High-quality, research-backed educational materials.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
