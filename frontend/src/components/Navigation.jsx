import React, { useContext } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navigation = () => {
    const navigate = useNavigate();
    const { getCartItemCount } = useContext(CartContext);

    // Lấy thông tin người dùng từ localStorage
    const customer = JSON.parse(localStorage.getItem("customer"));

    const handleCartClick = () => navigate("/cart");
    const handleSearch = () => navigate("/search");
    const handleHomeClick = () => navigate("/");
    const handleProfileClick = () => navigate("/profile");
    const handleLogout = () => {
        localStorage.removeItem("customer");
        localStorage.removeItem("cartItems");
        navigate("/login");
    };

    // Tính số lượng sản phẩm trong giỏ hàng
    const cartItemCount = getCartItemCount();

    return (
        <div className="flex items-center w-full p-4 border-b">
            <div className="w-full flex justify-between items-center px-6">
                <div className="flex gap-2 justify-center items-center">
                    {customer ? (
                        <div className="flex items-center gap-4">
                            <FaUserCircle size={24} className="cursor-pointer" onClick={handleProfileClick} />
                            <span
                                className="p-2 border border-black rounded-md text-sm cursor-pointer font-medium"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </span>
                        </div>
                    ) : (
                        <>
                            <span
                                className="p-2 border border-black rounded-md text-sm cursor-pointer font-medium"
                                onClick={() => navigate("/login")}
                            >
                                Đăng nhập
                            </span>
                            <span
                                className="p-2 border border-black rounded-md text-sm cursor-pointer font-medium"
                                onClick={() => navigate("/register")}
                            >
                                Đăng ký
                            </span>
                        </>
                    )}
                </div>
                <span
                    className="flex-grow text-center tracking-wider font-semibold text-3xl cursor-pointer"
                    onClick={handleHomeClick}
                >
                    PERFUME STORE
                </span>
                <div className="flex items-center gap-6">
                    <FiSearch size={24} onClick={handleSearch} className="cursor-pointer" />
                    <div className="relative p-2">
                        <FiShoppingCart
                            size={24}
                            className="cursor-pointer"
                            onClick={handleCartClick}
                        />
                        {cartItemCount > 0 && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItemCount}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
