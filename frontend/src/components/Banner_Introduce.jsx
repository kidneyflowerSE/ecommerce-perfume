import axios from "axios";
import React, { useEffect, useState } from "react";

const Banner_Introduce = () => {
    const [top10Products, setTop10Products] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedTop10Product = localStorage.getItem("top10product");
        if (storedTop10Product) {
            setTop10Products(JSON.parse(storedTop10Product));
            setLoading(false);
        } else {
            axios
                .get("http://localhost:8080/api/products/top-selling")
                .then((response) => {
                    setTop10Products(response.data);
                    localStorage.setItem("top10product", JSON.stringify(response.data));
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message || "Có lỗi xảy ra!");
                    setLoading(false);
                });
        }
    }, []);

    const firstProduct = top10Products[0];
    const secondProduct = top10Products[1];

    return (
        <div className="flex justify-center items-center w-full border-2">
            {/* Kiểm tra và hiển thị sản phẩm đầu tiên */}
            {firstProduct && (
                <div className="w-1/2 flex border-r-2" key={firstProduct.id}>
                    <div className="flex w-1/2 justify-center">
                        <img
                            src={firstProduct.imageUrl || "/assets/3.jpg"}
                            alt={firstProduct.name}
                            className="w-[400px] h-[400px]"
                        />
                    </div>
                    <div className="flex flex-col w-1/2 justify-center justify-items-center p-4">
                        <h2>{firstProduct.name}</h2>
                        <p>{firstProduct.description || "Mô tả sản phẩm không có sẵn."}</p>
                    </div>
                </div>
            )}

            {secondProduct && (
                <div className="w-1/2 flex" key={secondProduct.id}>
                    <div className="flex w-1/2 justify-center">
                        <img
                            src={secondProduct.imageUrl || "/assets/1.jpg"}
                            alt={secondProduct.name}
                            className="w-[400px] h-[400px]"
                        />
                    </div>
                    <div className="flex flex-col w-1/2 justify-center justify-items-center p-4">
                        <h2>{secondProduct.name}</h2>
                        <p>{secondProduct.description || "Mô tả sản phẩm không có sẵn."}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner_Introduce;
