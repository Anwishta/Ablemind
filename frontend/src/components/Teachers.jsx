import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import VideoCall from "./VideoCall";
import Title from "./Title";

const teachers = [
  {
    id: 1,
    name: "John Doe",
    subject: "Mathematics",
    image: "https://media.istockphoto.com/id/1987655119/photo/smiling-young-businesswoman-standing-in-the-corridor-of-an-office.jpg?s=612x612&w=0&k=20&c=5N_IVGYsXoyj-H9vEiZUCLqbmmineaemQsKt2NTXGms=",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Emily Smith",
    subject: "Java",
    image: "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.0,
  },
  {
    id: 3,
    name: "Michael Brown",
    subject: "English",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg/1200px-Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Sophia Wilson",
    subject: "Computer Science",
    image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    rating: 3.5,
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
};

const Teachers = () => {
  return (
    <>
      {/* Title Section */}
      <div className="text-center text-3xl py-8">
        <Title text1="OUR" text2="TEACHERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our teachers are experienced professionals dedicated to providing top-notch education.
        </p>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-12 lg:px-20">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700"
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{teacher.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{teacher.subject}</p>
            <div className="mt-2">
              <StarRating rating={teacher.rating} />
            </div>
          </div>
        ))}
      </div>

      {/* Video Call Section */}
      <VideoCall />
    </>
  );
};

export default Teachers;
