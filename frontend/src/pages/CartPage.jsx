import React, { useContext } from "react";
import { FiArrowLeft, FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartId } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  console.log(cartItems)

  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");
  const handleInforClick = () => navigate("/checkout");

  return (
    <div className="w-full mx-auto p-4 justify-between flex flex-col">
      <div className="w-full">
        <Navigation />
      </div>
      <div className="flex w-full py-8 px-20 justify-center gap-20">
        <div className="w-1/2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border-2 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border-2"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <span className="flex gap-4 text-sm items-center text-gray-500">
                        <p className="">Giá: {formatPrice(item.price)}</p>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <button
                      className="py-1 px-3 bg-gray-200 rounded-lg"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-xl">{item.quantity}</span>
                    <button
                      className="py-1 px-3 bg-gray-200 rounded-lg"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="p-2 text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Giỏ hàng của bạn hiện tại trống.</p>
          )}
        </div>

        <div className="w-1/3 flex flex-col items-between justify-start border-2 rounded-md h-[500px] p-4 space-y-4">
          <div>
            <div className="w-full flex items-center justify-center">
              <h2 className="text-xl font-semibold tracking-wide mb-10">TÓM TẮT ĐƠN HÀNG</h2>
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Tổng cộng:</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="py-2 px-4 rounded-md border-2 flex items-center gap-2 shadow-inner hover:shadow-lg"
                onClick={handleHomeClick}
              >
                <FiArrowLeft />
                <span>Tiếp tục mua sắm</span>
              </button>
              <button
                className="bg-black text-white py-2 px-4 rounded-md flex items-center gap-2"
                onClick={handleInforClick}
              >
                <span>Tiến hành thanh toán</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
