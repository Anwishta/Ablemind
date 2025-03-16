import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import VideoLectures from "../components/VideoLectures";  

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center mt-10">Loading Product...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1">
          <img src={image} alt="Main Product" className="w-full h-auto" />
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img key={index} src={assets.star_icon} alt="Star Icon" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="Dull Star Icon" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="my-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <button
            onClick={() => navigate(`/course-details/${productData._id}`)}
            className="bg-black text-white px-8 py-3 mr-5 text-sm active:bg-gray-700"
          >
            READ MORE
          </button>

          <button
            onClick={() => addToCart(productData._id)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>

      <VideoLectures />

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sit in alias exercitationem, vero natus animi reiciendis dignissimos maiores ipsum molestias temporibus perferendis esse, dicta a? Eos vitae accusantium assumenda!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis vitae eligendi iste perferendis animi excepturi tempore maxime veniam quo dolor incidunt delectus odio commodi, provident amet. Esse, officia atque!
          </p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
