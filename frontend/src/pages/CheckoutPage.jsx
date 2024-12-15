import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const CheckOutPage = () => {

    const navigate = useNavigate();
    const { cartItems, getCartItemCount } = useContext(CartContext);

    // Trạng thái thông tin cá nhân
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");

    // Trạng thái địa phương
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const [selectedProvinceName, setSelectedProvinceName] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedWardName, setSelectedWardName] = useState("");

    // Trạng thái phương thức thanh toán
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    //Trạng thái phí ship
    const [shippingFee, setShippingFee] = useState(30);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
    
    // Trạng thái mã giảm giá
    const [discountCode, setDiscountCode] = useState("");
    const [discountApplied, setDiscountApplied] = useState(false);

    // Trạng thái khác
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    // Tính toán chi phí
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = discountApplied ? 0.1 * totalPrice : 0;
    const finalPrice = totalPrice + shippingFee - discount;
    const cartItemCount = getCartItemCount();


    useEffect(() => {
        const customer = JSON.parse(localStorage.getItem("customer"));
        if (customer) {
            setEmail(customer.email || "");
            setName(customer.name || "");
            setPhone(customer.phone || "");
            setAddress(customer.address || "");
        }
    }, []);

    // Fetch danh sách tỉnh/thành phố
    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p")
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((error) => setError("Lỗi khi tải danh sách tỉnh/thành phố"));
    }, []);

    // Khi chọn Tỉnh/Thành phố
    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
    
        // Tìm tên tỉnh/thành phố
        const selectedProvince = provinces.find((province) => province.code.toString() === provinceCode);
        const provinceName = selectedProvince ? selectedProvince.name : ""; // Gán tên tỉnh/thành phố

        setSelectedProvinceName(provinceName);
        console.log(provinceName)

        handleShippingChange(selectedShippingMethod || "after");
    
        // Fetch danh sách quận/huyện
        fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then((res) => res.json())
            .then((data) => setDistricts(data.districts))
            .catch((error) => console.error("Lỗi khi tải danh sách quận/huyện:", error));
    };
    
    
    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
    
        // Tìm tên quận/huyện từ danh sách
        const selectedDistrict = districts.find((district) => district.code.toString() === districtCode);

        setSelectedDistrictName(selectedDistrict ? selectedDistrict.name : ""); 
    
        // Fetch danh sách xã/phường
        fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then((res) => res.json())
            .then((data) => setWards(data.wards))
            .catch((error) => console.error("Lỗi khi tải danh sách xã/phường:", error));
    };
    
    const handleWardChange = (e) => {
        const wardCode = e.target.value;
        setSelectedWard(wardCode);
        const selectedWard = wards.find((ward) => ward.code.toString() === wardCode);
        setSelectedWardName(selectedWard ? selectedWard.name : ""); 
    };
    
    // Áp dụng mã giảm giá
    const handleDiscountChange = (e) => setDiscountCode(e.target.value);
    const applyDiscount = () => {
        if (discountCode === "HUYDZ") {
            setDiscountApplied(true);
            alert("Mã giảm giá hợp lệ! Bạn được giảm 10%");
        } else {
            alert("Mã giảm giá không hợp lệ!");
        }
    };
    const handleShippingChange = (method) => {
        setSelectedShippingMethod(method);
        if (method === "before") {
            setShippingFee(0); // Phí vận chuyển miễn phí khi trả trước
        } else {
            setShippingFee(selectedProvinceName === "Thành phố Hồ Chí Minh" ? 25 : 30); // Tính phí vận chuyển bình thường
        }
    };
    

    // Xử lý nút "Đặt hàng"
    const handleReviewClick = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Vui lòng nhập email.";
        if (!name) newErrors.name = "Vui lòng nhập họ và tên.";
        if (!phone) newErrors.phone = "Vui lòng nhập số điện thoại.";
        if (!address) newErrors.address = "Vui lòng nhập địa chỉ.";
        if (!selectedProvince) newErrors.province = "Vui lòng chọn tỉnh/thành phố.";
        if (!selectedDistrict) newErrors.district = "Vui lòng chọn quận/huyện.";
        if (!selectedWard) newErrors.ward = "Vui lòng chọn xã/phường.";
        if (!selectedPaymentMethod) newErrors.payment = "Vui lòng chọn phương thức thanh toán.";
        if (!selectedShippingMethod) newErrors.shipping = "Vui lòng chọn phương thức thanh toán phí vận chuyển.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = {
            email,
            name,
            phone,
            address,
            province: selectedProvinceName,
            district: selectedDistrictName,
            ward: selectedWardName,
            note,
            paymentMethod: selectedPaymentMethod,
            shippingMethod: selectedShippingMethod,
        };
        console.log(formData)

        navigate("/vieworder", { state: { formData, cartItems } });
    };
    

    const home = useNavigate();
    const cart = useNavigate();
    const handleHomeClick = () => {
        navigate("/")
    }
    const handleCartClick = () => {
        navigate("/cart")
    }



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
                                <input 
                                    type="text" 
                                    className={`p-3 border ${errors.email ? 'border-red-500 placeholder:text-red-500' : 'border-gray-300'} text-sm rounded placeholder:italic tracking-wider`}
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                                <input 
                                    type="text" 
                                    className={`p-3 border ${errors.name ? 'border-red-500 placeholder:text-red-500' : 'border-gray-300'} text-sm rounded placeholder:italic tracking-wider`}
                                    placeholder="Họ và tên" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                <input 
                                    type="text" 
                                    className={`p-3 border ${errors.phone ? 'border-red-500 placeholder:text-red-500' : 'border-gray-300'} text-sm rounded placeholder:italic tracking-wider`}
                                    placeholder="Số điện thoại" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                <input 
                                    type="text" 
                                    className={`p-3 border ${errors.address ? 'border-red-500 placeholder:text-red-500' : 'border-gray-300'} text-sm rounded placeholder:italic tracking-wider`} 
                                    placeholder="Địa chỉ" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}


                                <label className="text-sm mt-4 tracking-wide text-gray-500">Tỉnh/Thành Phố</label>
                                <select 
                                    className={`p-2 border ${ errors.province ? 'border-red-500 text-red-500' : 'border-gray-300'} rounded`} 
                                    onChange={handleProvinceChange} 
                                    value={selectedProvince}
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.code}>{province.name}</option>
                                    ))}
                                </select>
                                {errors.province && <p className="text-red-500 text-xs">{errors.province}</p>}

                                <label className="text-sm tracking-wide text-gray-500">Quận/Huyện</label>
                                <select 
                                    className={`p-2 border ${ errors.district ? 'border-red-500 text-red-500' : 'border-gray-300'} rounded`} 
                                    onChange={handleDistrictChange} 
                                    disabled={!selectedProvince}
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.code} value={district.code}>{district.name}</option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-xs">{errors.district}</p>}

                            
                                <label className="text-sm tracking-wide text-gray-500">Xã/Phường</label>
                                <select 
                                    className={`p-2 border ${ errors.ward ? 'border-red-500 text-red-500' : 'border-gray-300'} rounded`} 
                                    disabled={!selectedDistrict}
                                    onChange={handleWardChange}
                                  
                                >
                                    <option value="">Chọn Phường/Xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.code} value={ward.code}>{ward.name}</option>
                                    ))}
                                </select>
                                {errors.ward && <p className="text-red-500 text-xs">{errors.ward}</p>}

                                <textarea 
                                    className="p-2 mt-2 border border-gray-300 rounded placeholder:text-sm placeholder:italic font-light" 
                                    placeholder="Ghi chú (tùy chọn)"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                >
                                    
                                </textarea>
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
                                    <label className={`inline-flex items-center border border-black p-3 rounded ${errors.payment ? 'border-red-500 text-red-500' : 'border-black'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="Thanh toán khi nhận hàng (COD)"
                                            className="form-radio h-5 w-5 text-blue-500"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        />
                                    <span className="ml-2">Thanh toán khi nhận hàng (COD)</span>
                                    </label>

                                    <label className={`inline-flex items-center border border-black p-3 rounded ${errors.payment ? 'border-red-500 text-red-500' : 'border-black'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="Thanh toán qua ngân hàng (MB Bank)"
                                            className="form-radio h-5 w-5 text-blue-500"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        />
                                        <span className="ml-2">Thanh toán ngân hàng</span>
                                    </label>
                                </div>
                                {errors.payment && <p className="text-red-500 text-xs">{errors.payment}</p>}
                            </div>
                            <div className="">
                                <p className="font-medium text-xl mt-4">Phí vận chuyển:</p>
      
                                <div className="mt-4 flex flex-col gap-4">
                                    <label className={`inline-flex items-center border border-black p-3 rounded ${errors.payment ? 'border-red-500 text-red-500' : 'border-black'}`}>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="before"
                                            className="form-radio h-5 w-5 text-blue-500"
                                            onChange={(e) => setSelectedShippingMethod(e.target.value || 'before')}
                                        />
                                    <span className="ml-2">Trả trước (kèm theo trong hóa đơn)</span>
                                    </label>

                                    <label className={`inline-flex items-center border border-black p-3 rounded ${errors.shipping ? 'border-red-500 text-red-500' : 'border-black'}`}>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="after"
                                            className="form-radio h-5 w-5 text-blue-500"
                                            onChange={(e) => setSelectedShippingMethod(e.target.value || 'after')}
                                        />
                                        <span className="ml-2">Trả sau (khi nhận hàng)</span>
                                    </label>
                                </div>
                                {errors.shipping && <p className="text-red-500 text-xs">{errors.shipping}</p>}
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
                                    className="p-3 border border-black rounded placeholder:text-sm placeholder:italic"
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
                        <button className=" bg-black text-white py-3 px-12 rounded" onClick={handleReviewClick}>Đặt hàng</button>
                    </div>
                </div>
        </div>
    )
};

export default CheckOutPage;