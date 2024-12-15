import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [products, setProducts] = useState([]); // Khởi tạo `products` với mảng rỗng

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/products") // API lấy danh sách sản phẩm
            .then((response) => {
                setProducts(response.data || []); // Lưu danh sách sản phẩm
            })
            .catch((error) => console.error("Không thể tải danh sách sản phẩm:", error));
    }, []);

    // Lấy giỏ hàng từ API khi tải trang
    useEffect(() => {
        const customer = JSON.parse(localStorage.getItem("customer"));
        if (customer) {
            axios
                .get(`http://localhost:8080/api/carts/customer/${customer.id}`)
                .then((response) => {
                    setCartId(response.data.id); // Lưu ID của giỏ hàng
                    localStorage.setItem("cartId", response.data.id);

                    // Bổ sung thông tin cho từng sản phẩm trong giỏ hàng
                    const enrichedCartItems = response.data.cartItems.map((item) => {
                        const productInfo = products?.find((p) => p.id === item.id);
                        return {
                            ...item,
                            name: productInfo?.name || "Unknown",
                            brand: productInfo?.brand || "N/A",
                            imageUrl: productInfo?.imageUrl || "",
                            category: productInfo?.category || "N/A",
                        };
                    });

                    setCartItems(enrichedCartItems);
                })
                .catch((error) => console.error("Không thể tải giỏ hàng:", error));
        }
    }, [products]); // Chạy lại khi `products` thay đổi

    const addToCart = async (productId, quantity) => {
        try {
            const url = `http://localhost:8080/api/cart-items/add/${cartId}/${productId}?quantity=${quantity}`;
            const response = await axios.post(url);

            const productInfo = products?.find((p) => p.id === productId);
            if (!productInfo) {
                console.error(`Không tìm thấy thông tin bổ sung cho sản phẩm với ID: ${productId}`);
                return;
            }

            const enrichedItem = {
                ...response.data,
                name: productInfo.name,
                brand: productInfo.brand,
                imageUrl: productInfo.imageUrl,
                category: productInfo.category,
            };

            setCartItems((prevItems) => [...prevItems, enrichedItem]);
        } catch (error) {
            console.error("Không thể thêm sản phẩm vào giỏ hàng:", error.response || error.message);
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/cart-items/update/${cartItemId}`,
                null,
                { params: { quantity } }
            );
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === cartItemId ? { ...item, quantity: response.data.quantity } : item
                )
            );
        } catch (error) {
            console.error("Không thể cập nhật số lượng sản phẩm:", error.response || error.message);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart-items/remove/${cartItemId}`);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
        } catch (error) {
            console.error("Không thể xóa sản phẩm khỏi giỏ hàng:", error.response || error.message);
        }
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart-items/total/${cartId}`);
            return response.data; // Trả về tổng giá trị từ backend
        } catch (error) {
            console.error("Không thể tính tổng giá trị giỏ hàng:", error.response || error.message);
            return 0;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartId,
                addToCart,
                updateQuantity,
                removeFromCart,
                getCartItemCount,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
