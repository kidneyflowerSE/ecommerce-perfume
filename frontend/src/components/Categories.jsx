import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("TRANG CHỦ");

  const navigate = useNavigate();
  const location = useLocation();

  // Cập nhật trạng thái selectedCategory dựa trên đường dẫn hiện tại
  useEffect(() => {
    setSelectedCategory(getCategoryFromPath(location.pathname));
  }, [location.pathname]);

  // Hàm lấy category từ đường dẫn
  const getCategoryFromPath = (path) => {
    switch (path) {
      case "/products/men":
        return "NƯỚC HOA NAM";
      case "/products/women":
        return "NƯỚC HOA NỮ";
      case "/products/unisex":
        return "NƯỚC HOA UNISEX";
      default:
        return "TRANG CHỦ";
    }
  };

  // Kiểm tra và tải danh sách categories từ localStorage hoặc API
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories)); // Nếu đã có dữ liệu thì lấy từ localStorage
      setLoading(false);
    } else {
      // Lấy danh sách categories từ API nếu chưa có trong localStorage
      axios
        .get("http://localhost:8080/api/categories")
        .then((response) => {
          const allCategories = [{ id: 0, name: "TRANG CHỦ", description: "Trang chủ" }, ...response.data];
          setCategories(allCategories);
          localStorage.setItem("categories", JSON.stringify(allCategories)); // Lưu vào localStorage
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  // Xử lý click vào category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name.toUpperCase()); // Cập nhật selectedCategory
    navigate(categoryRoute[category.name.toUpperCase()]); // Điều hướng đến route tương ứng
  };

  // Cấu hình route cho từng category
  const categoryRoute = {
    "TRANG CHỦ": "/",
    "NƯỚC HOA NAM": "/products/men",
    "NƯỚC HOA NỮ": "/products/women",
    "NƯỚC HOA UNISEX": "/products/unisex",
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="w-full flex relative border-b-2 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer tracking-wider text-sm">
      {categories.map((category) => (
        <span
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={`w-1/4 p-3 flex justify-center items-center relative text-xs ${
            selectedCategory === category.name.toUpperCase() ? "text-black" : "text-gray-500"
          }`}
        >
          {category.name.toUpperCase()}
          <span
            className={`absolute bottom-0 left-0 w-full h-1 bg-black transition-all duration-300 ${
              selectedCategory === category.name.toUpperCase() ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </span>
      ))}
    </div>
  );
};

export default Categories;
