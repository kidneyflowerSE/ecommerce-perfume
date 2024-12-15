import React from "react";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate

const ProductList = ({ products }) => {
  const navigate = useNavigate();  // Khởi tạo hook navigate

  // Hàm xử lý khi nhấn vào sản phẩm
  const handleProductClick = (id) => {
    // Điều hướng đến trang chi tiết sản phẩm với ID sản phẩm
    navigate(`/productdetail/${id}`);
  };

  return (
    <div className="p-10 flex justify-center">
      <button>
        <FiArrowLeft />
      </button>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 text-center cursor-pointer"
            onClick={() => handleProductClick(product.id)}  // Gọi hàm điều hướng khi nhấn vào sản phẩm
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mx-auto mb-4 h-32 w-32 object-cover"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-red-600">{product.price}</p>
          </div>
        ))}
      </div>
      <button>
        <FiArrowRight />
      </button>
    </div>
  );
};

export default ProductList;
