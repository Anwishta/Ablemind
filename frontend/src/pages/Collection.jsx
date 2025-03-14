import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleFilter = (value, stateSetter) => {
    stateSetter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
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
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting after filtering
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
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Arrow"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Computer", "Maths", "English"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  className="w-3"
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
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Easy", "Medium", "Hard"].map((sub) => (
              <label key={sub} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={sub}
                  onChange={(e) => toggleFilter(e.target.value, setSubCategory)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
  <Title text1="ALL" text2="COURSES" />

  {/* Sort Dropdown */}
  <select
    onChange={(e) => setSortType(e.target.value)}
    className="border border-gray-300 text-sm px-2 py-1 focus:outline-none"
  >
    <option value="relevant">Sort by: Relevant</option>
    <option value="low-high">Sort by: Low to High</option>
    <option value="high-low">Sort by: High to Low</option>
  </select>
</div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
