import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import axios from "axios";

const ProductSection = ({ brandName, targetBrands, itemsPerPage }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = isLoading ? [] : products.slice(startIndex, endIndex);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/brands");
      const filteredProducts = response.data
        .filter((brand) => targetBrands.includes(brand.name))
        .flatMap((brand) => brand.products);
      setProducts(filteredProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between px-20">
        <h1 className="py-4 font-semibold underline text-xl mt-4">
          {brandName}
        </h1>
      </div>
      <div className="relative">
        <div className="absolute flex w-full justify-between items-center mt-[12rem] px-12">
          <button
            onClick={handlePrev}
            className="bg-black text-white px-4 py-4 rounded-full disabled:opacity-50 flex items-center justify-center"
            disabled={currentPage === 0 || isLoading}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black text-white px-4 py-4 rounded-full disabled:opacity-50 flex items-center justify-center"
            disabled={endIndex >= products.length || isLoading}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 px-20">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="w-[404px] h-[360px] bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))
          ) : currentItems.length === 0 ? (
            <div className="col-span-4 text-gray-500 text-center py-4">
              Không có sản phẩm nào để hiển thị.
            </div>
          ) : (
            currentItems.map((product) => (
              <div
                key={product.id}
                className="border-2 p-4 rounded-md text-center shadow-md cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="w-full h-80 flex items-center justify-center rounded overflow-hidden mb-4">
                  <img
                    src={product.imageUrl || ""}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-lg font-bold truncate">{product.name}</h2>
                <p className="text-sm tracking-wide my-2 h-10 overflow-hidden text-ellipsis">
                  {product.description}
                </p>
                <div className="flex justify-between px-2 border-t-2 pt-4">
                  <p className="font-semibold">{formatPrice(product.price)}</p>
                  <p className="text-sm text-gray-600">
                    Còn {product.stock} sản phẩm
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
