import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';
const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="text-xl py-4 text-center border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Information Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-start gap-6">
          {/* Store Information */}
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br />
            Suite 350, Washington
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>

          {/* Careers Information */}
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm font-medium rounded-md bg-transparent text-black hover:bg-black hover:text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
  Explore Jobs
</button>

        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
