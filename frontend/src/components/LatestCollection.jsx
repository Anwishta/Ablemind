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
            <div className="relative">
                {/* Left Arrow */}
                <button
                    ref={prevRef}
                    className="absolute top-1/2 -translate-y-1/2 -left-16 z-10 p-2"
                >
                    <FaChevronLeft className="text-3xl text-black hover:text-gray-800 transition-all duration-300" />
                </button>

                {/* Right Arrow */}
                <button
                    ref={nextRef}
                    className="absolute top-1/2 -translate-y-1/2 -right-16 z-10 p-2"
                >
                    <FaChevronRight className="text-3xl text-black hover:text-gray-800 transition-all duration-300" />
                </button>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
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
                            <div className="hover:scale-105 transition-transform duration-300">
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
