import React from "react";

const LoginPage = () => {
    const handleLogin = () => {
        alert("Đăng nhập thành công!");
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-12 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold tracking-wider pb-8">PERFUME STORE</h1>
                <h2 className="text-xl text-center text-gray-700 mb-4">
                    ĐĂNG NHẬP
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2" htmlFor="phone">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        className="w-full px-4 py-2 border rounded placeholder:italic "
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
                        <a
                            href="/register"
                            className="text-red-500 hover:underline"
                        >
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
