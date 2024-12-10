import React from "react";
import { FiSearch, FiX, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const home = useNavigate();
    const handleHomeClick = () => {
        home('/');
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-2/3 flex justify-end my-10 items-center gap-2 cursor-pointer hover:text-red-500" onClick={handleHomeClick}>
                <p className="tracking-wider">ĐÓNG</p>
                <FiX size={24}/>
            </div>
            <div className="w-2/3 py-10">
                <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="TÌM KIẾM" 
                    className="p-4 w-[94%] border-b-2 border-black focus:border-b-4 focus:outline-none text-center uppercase caret-center
                                placeholder: text-2xl font-semibold tracking-widest"
                />

                    <FiSearch size={40} className="cursor-pointer"/>
                </div>
            </div>
            <div className="w-2/3 flex flex-col justify-center items-start tracking-wide">
                <span>Gợi ý</span>
                <div className="flex flex-col p-4">
                    <span className="py-2 cursor-pointer">VỊ TRÍ CỬA HÀNG</span>
                    <span className="py-2 cursor-pointer">SẢN PHẨM BÁN CHẠY</span>
                    <span className="py-2 cursor-pointer">NƯỚC HOA THƠM</span>
                </div>
            </div>
        </div>
    )
};
export default SearchPage;