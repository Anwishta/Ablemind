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
    <div className='text-center text-3xl py-8'>
                    <Title text1={'OUR'} text2={'TEACHERS'} />
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti, ad fugiat sunt facere inventore adipisci cumque molestias eum quo, dignissimos nemo veritatis, quod mollitia atque asperiores fuga quisquam voluptate.
                    </p>
                </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 flex justify-center items-center ">
      
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold">{teacher.name}</h2>
            <p className="text-gray-600">{teacher.subject}</p>
            <StarRating rating={teacher.rating} />
          </div>
        ))}
    
    </div>
    <VideoCall />
    </>
  );
};

export default Teachers;
