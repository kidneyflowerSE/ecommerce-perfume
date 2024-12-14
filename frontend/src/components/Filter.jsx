import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
      price: null,
      brand: null,
      country: null,
    });
  
    const handleFilterChange = (type, value) => {
      setFilters((prev) => ({
        ...prev,
        [type]: value,
      }));
    };
  
    useEffect(() => {
        const fetchData = async () => {
          let url = "";
          let filteredData = [];
      
          try {
            if (filters.price) {
              const [minPrice, maxPrice] = filters.price.split("-");
              url = `http://localhost:8080/api/products/filterByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`;
            } else if (filters.brand) {
              url = `http://localhost:8080/api/products/search?keyword=${filters.brand}`;
            } else if (filters.country) {
              url = `http://localhost:8080/api/products/products-by-country?country=${filters.country}`;
            }
      
            if (url) {
              const response = await axios.get(url);
      
              // Nếu lọc theo brand, lấy danh sách sản phẩm
              if (filters.brand && response.data.products) {
                filteredData = response.data.products;
              } else {
                filteredData = response.data; // Với các bộ lọc khác, trả về toàn bộ response
              }
      
              onFilter(filteredData); // Gửi dữ liệu lọc về App
            }
          } catch (error) {
            console.error("Lỗi khi gọi API:", error);
          }
        };
      
        fetchData();
      }, [filters]);
      

      

    return (
        <div className="h-fit w-fit border-2 bg-gray-100 flex flex-col p-4 pr-24 rounded">
            <h1 className="tracking-wider font-bold">Bộ lọc</h1>

            <div className="mt-2">
                <h2 className="mt-2">Giá</h2>
                <div className="mt-2 ml-6">
                    {["0-100", "100-200", "200-500", "500-1000"].map((range) => (
                        <label className="flex" key={range}>
                            <input
                                type="radio"
                                name="price"
                                value={range}
                                onChange={() => handleFilterChange("price", range)}
                            />
                            <span className="ml-2">{`Từ ${range.replace("-", " đến ")}`}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-2">
                <h2 className="mt-2">Brand</h2>
                <div className="mt-2 ml-6">
                    {["LV", "Clive", "Tom Ford", "Le Labo", "Roja"].map((brand) => (
                        <label className="flex" key={brand}>
                            <input
                                type="radio"
                                name="brand"
                                value={brand}
                                onChange={() => handleFilterChange("brand", brand)}
                            />
                            <span className="ml-2">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-2">
                <h2 className="mt-2">Quốc gia sản xuất</h2>
                <div className="mt-2 ml-6">
                    {["Pháp", "Mỹ", "Anh", "Việt Nam"].map((country) => (
                        <label className="flex" key={country}>
                            <input
                                type="radio"
                                name="country"
                                value={country}
                                onChange={() => handleFilterChange("country", country)}
                            />
                            <span className="ml-2">{country}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;
