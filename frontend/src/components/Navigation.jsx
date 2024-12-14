import React, { useContext, useState } from 'react';
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { BsFilePerson } from 'react-icons/bs';
import { FaUser, FaUserCircle } from 'react-icons/fa';

const Navigation = () => {
  const navigate = useNavigate();
  

  const { getCartItemCount } = useContext(CartContext);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const search = useNavigate();
  const handleSearch = () => {
    search('/search');
  };

  const home = useNavigate();
  const handleHomeClick = () => {
    home('/');
  };

  const login = useNavigate();
  const handleLoginClick = () => {
    login('/login');
  }

  const signup = useNavigate();
  const handleRegisterClick = () => {
    signup('/register');
  }

  const cartItemCount = getCartItemCount();

  return (
    <div className="flex items-center w-full p-4 border-b">
        <div className='w-full flex justify-between items-center px-6'>
          <div className='flex gap-2 justify-center items-center'>
            <span 
              className='p-2 border border-black rounded-md text-sm cursor-pointer font-medium'
              onClick={handleLoginClick}
              >
              Đăng nhập
            </span>
            <span 
              className='p-2 border border-black rounded-md text-sm cursor-pointer font-medium'
              onClick={handleRegisterClick}
              >
                Đăng ký
            </span>
          </div>
          <span 
            className='flex-grow text-center tracking-wider font-semibold text-3xl cursor-pointer' 
            onClick={handleHomeClick}
          >
            PERFUME STORE
          </span>
          <div className='flex items-center gap-6'>
            <FiSearch size={24} onClick={handleSearch} className='cursor-pointer'/>
            <div className="relative p-2">
              <FiShoppingCart size={24} className='cursor-pointer' onClick={handleCartClick} />
              {cartItemCount >= 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Navigation;
