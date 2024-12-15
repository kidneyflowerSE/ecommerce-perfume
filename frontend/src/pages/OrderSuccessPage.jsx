import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer
    }, [navigate]);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-green-100">
            <div className="bg-white p-10 rounded shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h1>
                <p className="text-lg text-gray-700">Cảm ơn bạn đã mua sắm tại PERFUME STORE!</p>
                <p className="text-sm text-gray-500 mt-2">Bạn sẽ được chuyển hướng về trang chủ trong 5 giây...</p>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
