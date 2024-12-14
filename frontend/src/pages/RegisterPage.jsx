import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/customers/create",
                formData
            );
            alert("Đăng ký thành công!");
            console.log(response.data);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-12 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold tracking-wider pb-8">PERFUME STORE</h1>
                <h2 className="text-xl text-center text-gray-700 mb-4">
                    ĐĂNG KÝ
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="name">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nhập họ và tên"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded placeholder:italic"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded placeholder:italic"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="phone">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded placeholder:italic"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="address">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded placeholder:italic"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded placeholder:italic"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border bg-black text-white rounded"
                    >
                        Đăng Ký
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Đã có tài khoản?{" "}
                        <a
                            href="/login"
                            className="text-red-500 hover:underline"
                        >
                            Đăng nhập ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
