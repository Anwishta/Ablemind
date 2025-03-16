import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    
    // Create refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (products?.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className="relative my-16">
            {/* Title Section */}
            <div className="text-center text-3xl py-8">
                <Title text1="NEW" text2="COURSES" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Explore our latest courses, designed to help you stay ahead in your learning journey.
                </p>
            </div>

            {/* Swiper Carousel Container */}
            <div className="relative max-w-7xl mx-auto">
                {/* Left Arrow */}
                <button
                    ref={prevRef}
                    className="absolute top-[45%] left-[-85px] -translate-y-1/2 z-10 p-3 bg-gray-800 text-white shadow-md rounded-full transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
                >
                    <FaChevronLeft className="text-3xl" />
                </button>

                {/* Right Arrow */}
                <button
                    ref={nextRef}
                    className="absolute top-[45%] right-[-85px] -translate-y-1/2 z-10 p-3 bg-gray-800 text-white shadow-md rounded-full transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
                >
                    <FaChevronRight className="text-3xl" />
                </button>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={60}  // Matches MostPopular
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 60 },
                        768: { slidesPerView: 3, spaceBetween: 70 },
                        1024: { slidesPerView: 4, spaceBetween: 80 },
                        1280: { slidesPerView: 5, spaceBetween: 90 },
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="px-6"
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {latestProducts.map((item) => (
                        <SwiperSlide key={item._id} className="flex justify-center">
                            <div className="w-full max-w-[270px] sm:max-w-[300px] md:max-w-[330px] hover:scale-105 transition-transform duration-300">
                                <ProductItem
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LatestCollection;
