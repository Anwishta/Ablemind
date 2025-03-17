import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = ({ isDarkMode }) => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleFilter = (value, stateSetter) => {
    stateSetter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">
      {/* Filter Section */}
      <div  className="readable-area w-full sm:w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transform transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt="Arrow"
          />
        </p>

        <div
          className={`border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          {/* Category Filter */}
          <div className="mb-4">
            <p className="mb-3 text-sm font-semibold">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-gray-300">
              {["Computer", "Maths", "English"].map((cat) => (
                <label key={cat} className="flex gap-2 items-center">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={cat}
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className="mb-4">
            <p className="mb-3 text-sm font-semibold">DIFFICULTY</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-gray-300">
              {["Easy", "Medium", "Hard"].map((sub) => (
                <label key={sub} className="flex gap-2 items-center">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={sub}
                    onChange={(e) =>
                      toggleFilter(e.target.value, setSubCategory)
                    }
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center mb-6 text-xl sm:text-2xl font-medium">
            <Title text1="ALL" text2="COURSES" />
          </div>

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className={`border rounded-md px-4 py-2 text-sm focus:outline-none transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
