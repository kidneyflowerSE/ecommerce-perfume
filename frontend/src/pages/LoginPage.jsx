import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/customers/login", null, {
                params: { email, password },
            });
    
            if (response.status === 200) {
                const customer = response.data;
                localStorage.setItem("customer", JSON.stringify(customer));
                console.log("Customer ID:", customer.id);
    
                // Lấy giỏ hàng sau khi đăng nhập
                const cartResponse = await axios.get(`http://localhost:8080/api/carts/customer/${customer.id}`);
                localStorage.setItem("cartItems", JSON.stringify(cartResponse.data.cartItems || []));
                console.log("Giỏ hàng:", cartResponse.data.cartItems);
    
                alert("Đăng nhập thành công!");
                navigate("/"); // Chuyển hướng đến trang chủ
            }
        } catch (err) {
            setError("Email hoặc mật khẩu không đúng!");
        }
    };
    
    

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-12 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold tracking-wider pb-8">PERFUME STORE</h1>
                <h2 className="text-xl text-center text-gray-700 mb-4">ĐĂNG NHẬP</h2>

                {error && (
                    <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded placeholder:italic"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 mb-2" htmlFor="password">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded placeholder:italic"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-2 px-4 border bg-black text-white rounded"
                >
                    Đăng Nhập
                </button>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Chưa có tài khoản?{" "}
                        <a href="/register" className="text-red-500 hover:underline">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
