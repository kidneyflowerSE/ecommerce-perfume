import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi'; 
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Chanel No. 5', price: 100, quantity: 1, imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Dior Sauvage', price: 200, quantity: 2, imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Dior Sauvage', price: 200, quantity: 2, imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Dior Sauvage', price: 200, quantity: 2, imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Dior Sauvage', price: 200, quantity: 2, imageUrl: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Gucci Bloom', price: 80, quantity: 1, imageUrl: 'https://via.placeholder.com/100' },
  ]);

  const navigateInfor = useNavigate(); 

  const handleInforClick = () => {
    navigateInfor('/information');  
  }

  const navigateHome = useNavigate();

  const handleHomeClick = () => {
    navigateHome('/')
  }

  

  const updateQuantity = (id, qty) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };


  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="w-full mx-auto p-4 flex justify-between">
      <div className="w-1/2  ">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">Giá: ${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 bg-gray-200 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    className="p-2 bg-gray-200 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="p-2 text-red-500"
                    onClick={() => removeItem(item.id)}
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

      <div className="w-1/3 bg-slate-300 h-[500px]">
        <div className='w-full flex justify-between'>
            <span>Nuoc hoa</span>
            <span>500$</span>
        </div>
        <div className='w-full flex justify-between'>
            <h2 className="text-xl font-semibold">Tổng cộng:</h2>
            <span> ${totalPrice}</span>
        </div>
       
        <div className="w-full flex justify-between">
          
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" onClick={handleHomeClick}>
            Tiếp tục mua sắm
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600" onClick={handleInforClick}>
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
