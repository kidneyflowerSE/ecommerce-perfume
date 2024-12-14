import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import LoadingPage from "../pages/LoadingPage";

const WomenProduct = ({ filteredProducts }) => {
  const [womenProducts, setWomenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filteredProducts || filteredProducts.length === 0) {
    const storedProducts = localStorage.getItem("womenProducts");

    if (storedProducts) {
      setWomenProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      axios
        .get("http://localhost:8080/api/categories/2")
        .then((response) => {
          setWomenProducts(response.data);  // Fix here
          localStorage.setItem("womenProducts", JSON.stringify(response.data)); 
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message || "Có lỗi xảy ra!");
          setLoading(false);
        });
    } 
    } else {
      setLoading(false);
    }
  }, [filteredProducts]);

  const navigate = useNavigate();

  const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
  }

  if (loading) return <div className="w-full h-full">
    <LoadingPage />
  </div>;
  if (error) return <div>Lỗi: {error}</div>;

const productsToDisplay = filteredProducts?.length > 0 ? filteredProducts : womenProducts;

  return (
    <div className="grid grid-cols-4 gap-4">
      {productsToDisplay.map((product) => (
        <div
          key={product.id}
          className="relative border-2 rounded p-2 flex flex-col cursor-pointer group"
          onClick={() => handleClickProduct(product.id)}
        >
          <div className="p-2">
            <img 
              src={product.imageUrl}
              alt={product.name}
              className="rounded object-cover w-full h-50" 
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center p-4">
            <div className="flex justify-center tracking-wider font-semibold truncate w-64">
              <span className="truncate">{product.name}</span>
            </div>
            <span className="my-2 font-semibold tracking-wider text-xl">{formatPrice(product.price)}</span>
            <span className="text-xs font-light justify-between w-full flex my-1">
              {product.brand && (
                <span className="bg-slate-200 font-normal p-2 rounded">Xuất xứ: {product.brand.country}</span>
              )}
              <span className="bg-black font-normal p-2 rounded text-white">Còn {product.stock} sản phẩm</span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            <span className="absolute flex justify-center items-center left-0 top-0 w-12 h-6 rounded-tl rounded-br text-white bg-black">
                <span>{product.id}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default WomenProduct;
