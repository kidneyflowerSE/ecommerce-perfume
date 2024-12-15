import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BannerIntro = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8080/api/products/top-selling')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false); // Tắt trạng thái loading
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false); // Tắt trạng thái loading nếu lỗi xảy ra
      });
  }, []);
  
  const navigate = useNavigate();

  const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Hiệu ứng loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : (
            products.slice(0, 4).map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleClickProduct(product.id)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-900">${product.price}.00</span>
                    <span className="text-sm text-gray-500">{product.brandName}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerIntro;
