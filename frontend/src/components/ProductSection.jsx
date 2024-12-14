import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";

const targetBrands = ["LV", "Dior", "Clive", "Tom Ford", "Roja"];

const ProductSection = ({ brandName, products, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(0);
  
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);
  
    const handleNext = () => {
      if (endIndex < products.length) {
        setCurrentPage((prev) => prev + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }
    };
  
    return (
      <div>
        <div className="w-full flex justify-between px-20">
          <h1 className="py-4 font-semibold underline text-xl mt-4">{brandName}</h1>
          {/* <div className="flex">
            <span>Xem thêm</span>
            <FiArrowRight />
          </div> */}
        </div>
  
        <div className="relative">
          {/* Nút chuyển trang */}
          <div className="absolute flex w-full justify-between items-center mt-[12rem] px-12">
            <button
              onClick={handlePrev}
              className="bg-black text-white px-4 py-4 rounded-full disabled:opacity-50 flex items-center justify-center"
              disabled={currentPage === 0}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="bg-black text-white px-4 py-4 rounded-full disabled:opacity-50 flex items-center justify-center"
              disabled={endIndex >= products.length}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
  
          {/* Hiển thị sản phẩm */}
          <div className="grid grid-cols-4 gap-4 px-20">
            {currentItems.map((product) => (
              <div
                key={product.id}
                className="border-2 p-4 rounded-md text-center shadow-[0px_2px_4px_rgba(0,0,0,0.1)]"
              >
                <img
                //   src={product.imageUrl || "/assets/2.jpg"}
                src="/assets/2.jpg"
                  alt={product.name}
                  className="w-full h-50 object-contain mb-4"
                />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm tracking-wide my-2">{product.description}</p>
                <div className="flex justify-between px-2 border-t-2 pt-4">
                  <p className="font-semibold">{formatPrice(product.price)}</p>
                  <p className="text-sm text-gray-600">Còn {product.stock} sản phẩm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  export default ProductSection;