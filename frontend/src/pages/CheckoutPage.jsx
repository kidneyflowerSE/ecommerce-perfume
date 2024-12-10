import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const CheckOutPage = () => {

    const { cartItems, removeFromCart, updateQuantity, getCartItemCount } = useContext(CartContext);
    
    const [discountCode, setDiscountCode] = useState(""); 
    const [discountApplied, setDiscountApplied] = useState(false); 

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shippingFee = 20; 
    const discount = discountApplied ? 0.1 * totalPrice : 0; 

    const finalPrice = totalPrice + shippingFee - discount; 

    const cartItemCount = getCartItemCount();

    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    }
    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleDiscountChange = (e) => {
        setDiscountCode(e.target.value);
    }

    const applyDiscount = () => {
        if (discountCode === "HUYDZ") {
            setDiscountApplied(true);
            alert("Mã giảm giá hợp lệ, bạn được anh Huy bo 10k");
        } else {
            alert("Mã giảm giá không hợp lệ!");
        }
    };


    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
  
    // Lấy danh sách tỉnh/thành phố khi component mount
    useEffect(() => {
      fetch("https://provinces.open-api.vn/api/p?depth=2")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch provinces");
          }
          return res.json();
        })
        .then((data) => setProvinces(data))
        .catch((error) => setError(error.message)); // Xử lý lỗi khi lấy dữ liệu tỉnh
    }, []);
  
    // Lấy danh sách quận/huyện khi tỉnh thay đổi
    const handleProvinceChange = (e) => {
      const provinceCode = e.target.value;
      setSelectedProvince(provinceCode);
      setLoading(true); // Đánh dấu trạng thái đang tải
  
      fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch districts");
          }
          return res.json();
        })
        .then((data) => {
          setDistricts(data.districts); // Lưu danh sách quận/huyện
          setLoading(false); // Kết thúc trạng thái loading
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };
    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        setLoading(true); // Đánh dấu trạng thái đang tải
    
        fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch wards");
          }
          return res.json();
        })
        .then((data) => {
          setWards(data.wards); // Lưu danh sách quận/huyện
          setLoading(false); // Kết thúc trạng thái loading
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
      };

//   console.log(provinces,districts,wards);

    return (
        <div className="w-full h-full flex px-20">
            <div className="w-[60%] h-full py-5 border-r border-black">
                <div className="w-full h-full">
                    <div className="flex flex-col">
                        <span 
                            className='flex-grow text-center tracking-wider font-semibold text-3xl mb-10 cursor-pointer' 
                            onClick={handleHomeClick}
                        >
                            PERFUME ECOMMERCE
                        </span>
                        <h1 className="text-xl font-medium tracking-wide mt-1">Nhập thông tin mua hàng</h1>
                    </div>
                    <div className="flex w-full border-b border-black">
                        <div className="w-1/2">
                            <div className="flex flex-col p-5 gap-3">
                                <input type="text" className="p-3 border border-gray-300 text-sm rounded placeholder:italic tracking-wider" placeholder="Email" />
                                <input type="text" className="p-3 border border-gray-300 text-sm rounded placeholder:italic tracking-wider" placeholder="Họ và tên" />
                                <input type="number" className="p-3 border border-gray-300 text-sm rounded placeholder:italic tracking-wider" placeholder="Số điện thoại" />
                                <input type="text" className="p-3 border border-gray-300 text-sm rounded placeholder:italic tracking-wider" placeholder="Địa chỉ" />


                                <label className="text-sm mt-4 tracking-wide text-gray-500">Tỉnh/Thành Phố</label>
                                <select className="p-2 border border-gray-300 rounded" onChange={handleProvinceChange} value={selectedProvince}>
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.code}>{province.name}</option>
                                    ))}
                                </select>
                                <label className="text-sm tracking-wide text-gray-500 rounded">Quận/Huyện</label>
                                <select className="p-2 border border-gray-300" onChange={handleDistrictChange} disabled={!selectedProvince}>
                                    <option value="">Chọn Quận/Huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.code} value={district.code}>{district.name}</option>
                                    ))}
                                </select>
                                <label className="text-sm tracking-wide text-gray-500 rounded">Xã/Phường</label>
                                <select className="p-2 border border-gray-300"  disabled={!selectedDistrict}>
                                    <option value="">Chọn Phường/Xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.code} value={ward.code}>{ward.name}</option>
                                    ))}
                                    
                                </select>
                                <textarea className="p-2 border border-gray-300 rounded placeholder:text-sm placeholder:italic font-light" placeholder="Ghi chú (tùy chọn)"></textarea>
                            </div>
                        </div>
                        <div className="w-1/2 p-4">
                            <div>
                                <h2 className="font-medium text-xl">Vận chuyển</h2>
                                <div className="bg-blue-200 p-3 text-blue-600 my-2 rounded">
                                    <span>Vui lòng nhập thông tin giao hàng</span>
                                </div>
                            </div>
                            <div className="">
                                <p className="font-medium text-xl">Chọn phương thức thanh toán:</p>
      
                                <div className="mt-4 flex flex-col gap-4">
                                    <label className="inline-flex items-center border border-black p-3 rounded">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            className="form-radio h-5 w-5 text-blue-500"
                                        />
                                    <span className="ml-2">Thanh toán khi nhận hàng (COD)</span>
                                    </label>

                                    <label className="inline-flex items-center border border-black p-3 rounded">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="bank"
                                            className="form-radio h-5 w-5 text-blue-500"
                                        />
                                        <span className="ml-2">Thanh toán ngân hàng</span>
                                    </label>
                                    <label className="inline-flex items-center border border-black p-3 rounded">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="momo"
                                            className="form-radio h-5 w-5 text-blue-500"
                                        />
                                        <span className="ml-2">Thanh toán Momo</span>
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[40%]">
                    <div className="h-[80%]">
                        {cartItems.length > 0 ? (
                            <div className="flex text-xl gap-2 font-medium border-b border-black py-4">
                                <h1 className="ml-4">Đơn hàng: </h1>
                                <span>{cartItemCount} sản phẩm</span>
                            </div>
                        ) : null}

                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between py-6 ml-4">
                                <div className="flex">
                                    <img src={item.imageUrl} alt={item.name} className="w-[60px] h-[60px] border border-gray-200 rounded-md" />
                                    <div className="flex flex-col ml-4">
                                        <span className="font-medium">{item.name}</span>
                                        <div className="text-gray-500 text-sm mt-2 gap-4 flex">
                                            <span>Loại: {item.category}</span>
                                            <span className="">Brand: {item.brand}</span>
                                        </div>
                                    </div>
                                </div>
                                <span>{item.quantity} x {formatPrice(item.price)}</span>
                            </div>
                        ))}

                        <div className="pl-4">
                            <div className="border-y border-black py-4 flex justify-between">
                                <input
                                    type="text"
                                    value={discountCode}
                                    onChange={handleDiscountChange}
                                    className="p-3 border border-black rounded"
                                    placeholder="Nhập mã giảm giá của bạn"
                                />
                                <button onClick={applyDiscount} className="bg-black text-white py-3 px-6 rounded">Áp dụng</button>
                            </div>
                            <div className="py-4 border-b border-black">
                                <div className="flex justify-between py-1">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatPrice(shippingFee)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between py-4">
                                <span className="font-medium text-xl">Tổng cộng</span>
                                <span className="text-xl text-red-500">{formatPrice(finalPrice)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                        <button className="flex justify-between items-center gap-1 cursor-pointer border-2 p-2 rounded-md" onClick={handleCartClick}>
                            <FiArrowLeft />
                            <span>Quay về giỏ hàng</span>
                        </button>
                        <button className=" bg-black text-white py-3 px-12 rounded">Đặt hàng</button>
                    </div>
                </div>
        </div>
    )
};
export default CheckOutPage;