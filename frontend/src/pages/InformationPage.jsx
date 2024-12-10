import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const InformationPage = () => {
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate('/cart');
    }
    return (
        <div className="w-full h-full flex px-20">
            <div className="w-[60%] h-full py-5 border-r border-black">
                <div className="w-full h-full">
                    <div>
                        <img src="/assets/cointurtle.png" alt="" className="w-[120px] h-[120px]" />
                        <h1 className="text-xl font-bold mt-1">Nhập thông tin mua hàng</h1>
                    </div>
                    <div className="flex w-full border-b border-black">
                        <div className="w-1/2">
                            <div className="flex flex-col p-5 gap-4">
                                <input type="text" className="p-2 border border-gray-300" placeholder="Email" />
                                <input type="text" className="p-2 border border-gray-300" placeholder="Họ và tên"/>
                                <input type="text" className="p-2 border border-gray-300" placeholder="Số điện thoại"/>
                                <input type="text" className="p-2 border border-gray-300" placeholder="Địa chỉ"/>

                                <select className="p-2 border border-gray-300">
                                    <option value="" disabled>--</option>
                                    <option >Hồ Chí Minh</option>
                                    <option >Quảng Ngãi</option>
                                    <option >Hà Nội</option>
                                </select>
                                <select className="p-2 border border-gray-300">
                                    <option value="" disabled>--</option>
                                    <option >Quận 1</option>
                                    <option >Thành Phố Quảng Ngãi</option>
                                    <option >Hoàn Kiếm</option>
                                </select>
                                <select className="p-2 border border-gray-300">
                                    <option value="" disabled>--</option>
                                    <option >Đao Kao</option>
                                    <option >Tịnh Hòa</option>
                                    <option >Hàng Trống</option>
                                </select>
                                <textarea className="p-2 border border-gray-300" placeholder="Ghi chú (tùy chọn)"></textarea>
                            </div>
                        </div>
                        <div className="w-1/2 p-4">
                            <div>
                                <h2 className="font-bold text-xl">Vận chuyển</h2>
                                <div className="bg-blue-200 p-3 text-blue-600 my-2 rounded">
                                    <span>Vui lòng nhập thông tin giao hàng</span>
                                </div>
                            </div>
                            <div className="">
                                <p className="font-bold text-xl">Chọn phương thức thanh toán:</p>
      
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
               <div className="">
                    <div className="flex text-xl gap-2 font-semibold border-b border-black py-4">
                        <h1 className="ml-4">Đơn hàng: </h1>
                        <span>1 sản phẩm</span>
                    </div>
                    <div className="flex justify-between py-6 ml-4">
                        <div className="flex">
                            <img src="/assets/1.jpg" alt="" className="w-[60px] h-[60px] border border-gray-200" />
                            <div className="flex flex-col">
                                <span>Nuoc hoa nam</span>
                                <span>Gucci</span>
                            </div>
                        </div>
                        <span>500$</span>
                    </div>
                    <div className="pl-4">
                    <div className="border-y border-black py-4 flex justify-between">     
                            <input type="text"  className="p-3 border border-black rounded" placeholder="Nhập mã giảm giá của bạn"/>
                            <button className="bg-blue-500 text-white p-3 rounded">Áp dụng</button>
                    </div>
                    <div className="py-4 border-b border-black">
                    <div className="flex justify-between py-1">
                        <span>Tạm tính</span>
                        <span>500$</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Phí vận chuyển</span>
                        <span>20$</span>
                    </div>
                    </div>
                    <div className="flex justify-between py-4">
                        <span className="font-bold text-xl">Tổng cộng</span>
                        <span className="text-xl text-blue-400">520$</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <button className="flex justify-between items-center gap-1 text-blue-500 cursor-pointer" onClick={handleCartClick}>
                            <FiArrowLeft />
                            <span>Quay về giỏ hàng</span>
                        </button>
                        <button className="bg-blue-500 text-white py-3 px-8 rounded">Đặt hàng</button>
                    </div>
                    </div>
               </div>
            </div>
        </div>
    )
};
export default InformationPage;