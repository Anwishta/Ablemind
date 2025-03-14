import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products?.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'NEW'} text2={'COURSES'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque modi, nulla perspiciatis sed placeat eos non quis labore
                    nostrum molestiae incidunt ullam excepturi. Nihil labore qui quasi ea similique.
                </p>
            </div>
            {/* rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
              latestProducts.map((item) => (
              <ProductItem
              key={item._id} 
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
        />
    ))
}

            </div>
        </div>
    );
};

export default LatestCollection;