import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../utils/formatPrice";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false); // Thêm trạng thái để xử lý "Không tìm thấy"

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Reset trạng thái
      setNotFound(false);
      setError(null);

      // Gọi API tìm kiếm sản phẩm
      const productResponse = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${encodeURIComponent(searchQuery)}`
      );

      // Nếu không tìm thấy sản phẩm, thử tìm kiếm theo thương hiệu
      if (!productResponse.data.length) {
        const brandResponse = await axios.get(
          `http://localhost:8080/api/brands/search?name=${encodeURIComponent(searchQuery)}`
        );

        if (brandResponse.data.products?.length) {
          setSearchResults(brandResponse.data.products);
        } else {
          setNotFound(true); // Không tìm thấy cả sản phẩm lẫn thương hiệu
        }
      } else {
        setSearchResults(productResponse.data);
      }
    } catch (err) {
      setError("Không thể tìm kiếm, vui lòng thử lại.");
    }
  };

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            handleSearch();
        }
    }
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNavigateToProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleNavigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Header */}
      <div
        className="w-2/3 flex justify-end my-10 items-center gap-2 cursor-pointer hover:text-red-500"
        onClick={handleHomeClick}
      >
        <p className="tracking-wider">ĐÓNG</p>
        <FiX size={24} />
      </div>

      {/* Search Input */}
      <div className="w-2/3 py-10">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="TÌM KIẾM"
            value={searchQuery}
            onKeyDown={handleEnter}
            onChange={handleInputChange}
            className="p-4 w-[94%] border-b-2 border-black focus:border-b-4 focus:outline-none text-center uppercase caret-center
                      placeholder: text-2xl font-semibold tracking-widest"
          />
          <FiSearch size={40} className="cursor-pointer" onClick={handleSearch} />
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 my-4">{error}</div>}

      {/* Không tìm thấy kết quả */}
      {notFound && (
        <div className="text-center text-red-500 text-lg my-4">
          Không tìm thấy kết quả nào cho "{searchQuery.toUpperCase()}".
        </div>
      )}

      {/* Search Results */}
      {!notFound && searchResults.length > 0 && (
        <div className="w-2/3 flex flex-col justify-center items-start tracking-wide">
          <span>Kết quả tìm kiếm</span>
          <div className="grid grid-cols-4 grid-rows-4 p-4 gap-4">
            {searchResults.map((product) => (
              <div className="border-2 flex w-full rounded" key={product.id}>
                <div
                  className="flex"
                  onClick={() => handleNavigateToProduct(product.id)}
                >
                  <div className="w-1/3">
                    <img
                      src="assets/2.jpg"
                      alt={product.name}
                      className="w-30 h-30 rounded inline-block mr-4"
                    />
                  </div>
                  <div className="py-2 w-2/3 flex flex-col">
                    <span className="font-semibold">{product.name}</span>
                    <span className="mt-4 text-xl">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {!notFound && !searchResults.length && (
        <div className="w-2/3 flex flex-col justify-center items-start tracking-wide">
          <span>Gợi ý</span>
          <div className="flex flex-col p-4">
            <span className="my-2 cursor-pointer">VỊ TRÍ CỬA HÀNG</span>
            <span
              className="my-2 cursor-pointer"
              onClick={() => handleNavigateToCategory("men")}
            >
              Nước hoa nam
            </span>
            <span
              className="my-2 cursor-pointer"
              onClick={() => handleNavigateToCategory("women")}
            >
              Nước hoa nữ
            </span>
            <span
              className="my-2 cursor-pointer"
              onClick={() => handleNavigateToCategory("unisex")}
            >
              Nước hoa unisex
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
