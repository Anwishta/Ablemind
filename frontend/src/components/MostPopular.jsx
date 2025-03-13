import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const MostPopular = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]); // Add `products` as a dependency to ensure it updates when context changes

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'MOST'} text2={'POPULAR'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti, ad fugiat sunt facere inventore adipisci cumque molestias eum quo, dignissimos nemo veritatis, quod mollitia atque asperiores fuga quisquam voluptate.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item) => (
                    <ProductItem
                        key={item._id} // Unique key for React
                        id={item._id} // Pass product ID as a prop
                        image={item.image} // Pass image URL
                        name={item.name} // Pass product name
                        price={item.price} // Pass product price
                    />
                ))}
            </div>
        </div>
    );
};

export default MostPopular;
