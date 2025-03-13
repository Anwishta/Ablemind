import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../../public/assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if the current path includes 'collection'
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-white-50 text-center">
      {/* Search Input Container */}
      <div className="inline-flex items-center justify-center border-2 border-gray-600 px-5 py-2 mx-3 my-5 rounded-full w-full sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Search"
          type="text"
        />
        <img className="w-4" src={assets.search_icon} alt="Search Icon" />
      </div>

      {/* Cross Icon */}
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close Search"
      />
    </div>
  ) : null;
};

export default SearchBar;
