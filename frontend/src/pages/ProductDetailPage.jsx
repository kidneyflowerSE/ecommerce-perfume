import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { FiCheck, FiMap } from "react-icons/fi";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import axios from "axios";
import { formatPrice } from "../utils/formatPrice";
import LoadingPage from "./LoadingPage";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {

    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState({});
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Có lỗi xảy ra!");
        setLoading(false);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/brands/${id}`)
      .then((response) => {
        setBrand(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Có lỗi xảy ra!");
        setLoading(false);
      });
  }, [id]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/categories/1`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Có lỗi xảy ra!");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="w-full h-full">
    <LoadingPage />
  </div>;
  if (error) return <div>{error}</div>;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);


  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      brand: brand.name || "N/A",
      price: product.price,
      imageUrl: product.imageUrl,
      category: category.name || "N/A",
      quantity,
    };

    addToCart(cartItem);
    alert("Đã thêm sản phẩm vào giỏ hàng");
  };
  

    return (
        <div>
            <div className="w-full">
                <Navigation />
            </div>
            {/* <div className="w-full">
                <Categories />
            </div> */}
            <div className="w-full flex mt-10">
                <div className="w-1/2 flex justify-center">
                    <img src={product.imageUrl} alt="" className="w-[500px] h-[500px]"/>
                </div>
                <div className="w-1/4 flex flex-col">
                    <div className="border-b-4 border-black">
                        <p className="font-bold text-xl tracking-wider">{(product.name).toUpperCase()}</p>
                    </div>
                    <span className="py-4 border-b tracking-wider flex justify-between">
                        <span>Brand: <span>{brand.name}</span></span>
                        <span>Xuất sứ: <span>{brand.country}</span></span>

                    </span>
                    <span className="py-6 font-bold text-xl tracking-wider">{formatPrice(product.price)}</span>
                    <div className="flex justify-between border-y py-3 items-center gap-1 tracking-wider text-sm text-green-400">
                        <p className="">Số lượng trong kho: {product.stock}</p>
                        <p className="text-red-500">Đã bán: 255</p>
                    </div>

                    <div className=" flex justify-between border-y py-3 items-center gap-1 tracking-wider text-sm">
                        <span className="w-[60%]">Số lượng</span>
                        <div className="w-[40%] flex justify-between items-center">
                            <button 
                                className="py-2 px-4 rounded-lg bg-gray-300"
                                onClick={decreaseQuantity}
                            >
                                -
                            </button>
                            <span className="font-medium text-xl">{quantity}</span>
                            <button 
                                className="py-2 px-4 rounded-lg bg-gray-300"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button className="mt-8 py-4 border-2 border-black" onClick={handleAddToCart}>
                        <p className="tracking-widest text-sm">THÊM VÀO GIỎ HÀNG</p>
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-2/3 flex justify-center p-10 mt-40 border-b">
                    <h1 className="font-semibold tracking-widest text-2xl">THÔNG TIN VỀ SẢN PHẨM</h1>
                </div>
                <div className="w-2/3 flex flex-col justify-center tracking-wide border-b">
                    <h2 className="py-4 font-semibold">CHI TIẾT</h2>
                    <div className="py-2">
                        <h2 className="mb-4">THƯƠNG HIỆU</h2>
                        <p className="text-sm font-light">{brand.description}</p>
                    </div>
                    <div className="py-2">
                        <h2 className="mb-4">THÀNH PHẦN</h2> 
                        <p className="text-sm font-light">Eau de Parfum lấy cảm hứng từ hương hoa kết hợp với aldehyde điển hình. Hương hoa là sự hoà quyện hài hoà và tinh tế
                             giữa hoa hồng, hoa nhài và hương cam quýt. 
                            Thành phần aldehyde mang đến sự độc đáo, cùng những nốt hương vanilla cho mùi 
                            hương thêm nồng nàn, quyến rũ.
                        </p>
                    </div>
                    <div className="py-2">
                        <h2 className="mb-4">HƯƠNG THƠM</h2>
                        <p className="text-sm font-light">{product.description}</p>
                    </div>
                    
                </div>
                <div className="w-2/3 flex flex-col pb-4 border-b mb-20 py-2">
                    <h2 className="items-start py-4 font-semibold tracking-wide">VỀ CỬA HÀNG CỦA CHÚNG TÔI</h2>
                    <div className="flex tracking-wide pb-2">
                        <div className="w-1/2 flex justify-center">
                            <img src="/assets/shop.jpg" alt="" className="w-[70%] h-[100%] object-scale-down"/>
                        </div>
                        <div className="w-1/2 flex flex-col justify-center items-center h-[100%]">
                            <h2 className="p-2">CỬA HÀNG NƯỚC HOA</h2>
                            <p className="p-2 text-sm font-light">Một không gian tuyệt vời để bạn có thể khám phá toàn bộ dòng sản phẩm trang điểm, 
                                chăm sóc da và nước hoa với sự tư vấn từ các chuyên viên về nước hoa và trang điểm CHANEL.
                                 Một không gian đặc biệt giúp bạn đắm chìm vào thế giới của CHANEL.
                            </p>
                            <div className="flex gap-2 items-center text-sm mt-4 hover:border-b-2 hover:border-black cursor-pointer tracking-widest">
                                <span>VỊ TRÍ CỬA HÀNG</span>
                                <FiMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black text-white">
                <Footer />
            </div>
        </div>
    )
};
export default ProductDetailPage;