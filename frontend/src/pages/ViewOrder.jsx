import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { FiArrowLeft } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

const ViewOrder = () => {
    const location = useLocation();
    const { formData, cartItems } = location.state || {};

    if (!formData || !cartItems) {
        return <p className="text-center text-red-500 mt-10">Không có dữ liệu để hiển thị. Hãy quay lại và nhập thông tin!</p>;
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingFee = formData.shippingMethod === "Trả sau (khi nhận hàng)" ? 0 : formData.province === "Thành phố Hồ Chí Minh" ? 25 : 30;
    const discount = formData.discountApplied ? 0.1 * totalPrice : 0;
    const finalPrice = totalPrice + shippingFee - discount;

    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/checkout", {state: {formData, cartItems}});
    }

            const handleContinue = async () => {
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`,
                    paymentMethodId: formData.paymentMethod === "Trả sau (khi nhận hàng)" ? 1 : 2, // Phương thức thanh toán
                    shippingId: formData.shippingMethod === "COD" ? 1 : 2, // Phương thức giao hàng
                    tempCart: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                    returnUrl: "/", // URL quay về trang chủ
                    cancelUrl: "/checkout", // URL quay về checkout
                };
            
                try {
                    // Gửi yêu cầu POST để tạo đơn hàng
                    const orderResponse = await fetch("http://localhost:8080/api/order-placement/process", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
            
                    if (orderResponse.ok) {
                        const orderData = await orderResponse.json();
                        console.log("Order created successfully:", orderData);
            
                        if (formData.paymentMethod === "Trả sau (khi nhận hàng)") {
                            // Nếu là COD, điều hướng đến trang thành công
                            navigate("/order-success", { state: { orderId: orderData.id, totalAmount: orderData.totalAmount } });
                        } else {
                            // Nếu là thanh toán trước, gọi API để tạo link thanh toán
                            const paymentResponse = await fetch(`http://localhost:8080/api/orders/payment/create/${orderData.id}?returnUrl=http://localhost:3000&cancelUrl=http://localhost:3000/checkout`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
            
                            if (paymentResponse.ok) {
                                const paymentData = await paymentResponse.json();
                                console.log("Payment link created:", paymentData);
            
                                if (paymentData.error === 0 && paymentData.data.checkoutUrl) {
                                    // Điều hướng đến link thanh toán
                                    window.location.href = paymentData.data.checkoutUrl;
                                } else {
                                    console.error("Invalid payment response:", paymentData);
                                    alert("Đã có lỗi xảy ra khi tạo link thanh toán. Vui lòng thử lại!");
                                }
                            } else {
                                console.error("Failed to create payment link:", paymentResponse.status);
                                alert("Đã có lỗi xảy ra khi tạo link thanh toán. Vui lòng thử lại!");
                            }
                        }
                    } else {
                        console.error("Failed to create order:", orderResponse.status);
                        alert("Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!");
                    }
                } catch (error) {
                    console.error("Error while processing order:", error);
                    alert("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!");
                }
            };
               
    

    return (
        <div className="w-full flex flex-col justify-center items-center relative">
    <div className="w-[50%] mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border relative">
        <h1 className="text-3xl font-semibold tracking-wider text-center mb-4">PERFUME STORE</h1>
        <h1 className="text-2xl tracking-wide text-center mb-6">HÓA ĐƠN ĐẶT HÀNG</h1>

        <div className="absolute  right-10 transform rotate-12 opacity-50">
            <img src="assets/stamp.png" alt="" width={500} height={500}/>
        </div>

        <section className="mb-6">
            <h2 className="text-xl font-medium tracking-wide border-b pb-2 mb-4">THÔNG TIN KHÁCH HÀNG</h2>
            <p className="font-semibold">Email: <span className="font-normal italic ml-2">{formData.email}</span></p>
            <p className="font-semibold">Họ và Tên khách hàng: <span className="font-normal italic ml-2">{formData.name}</span></p>
            <p className="font-semibold">Số điện thoại: <span className="font-normal italic ml-2">{formData.phone}</span></p>
            <p className="font-semibold">Địa chỉ: <span className="font-normal italic ml-2">{formData.address}, {formData.ward}, {formData.district}, {formData.province}</span></p>
            {formData.note && <p className="font-semibold">Ghi chú: <span className="font-normal italic ml-2">{formData.note}</span></p>}
            <p className="font-semibold">Phương thức thanh toán: <span className="font-normal italic ml-2"> {formData.paymentMethod}</span></p>
            <p className="font-semibold">Thanh toán phí vận chuyển: <span className="font-normal italic ml-2"> {formData.shippingMethod === 'before' ? "Trả trước(kèm trong hóa đơn)" : "Trả sau(khi nhận hàng)"}</span></p>
        </section>

        <section className="mb-6">
            <h2 className="text-lg font-medium tracking-wide border-b pb-2 mb-4">CHI TIẾT ĐƠN HÀNG</h2>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Sản phẩm</th>
                        <th className="border px-4 py-2 text-center">Số lượng</th>
                        <th className="border px-4 py-2 text-right">Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2 text-center">{item.quantity}</td>
                            <td className="border px-4 py-2 text-right">{formatPrice(item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

        <section>
            <h2 className="text-lg font-medium tracking-wide border-b pb-2 mb-4">TỔNG CỘNG</h2>
            <div className="flex justify-between mb-2">
                <span className="font-medium">Tổng tiền hàng:</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="font-medium">Phí vận chuyển:</span>
                <span>{formatPrice(shippingFee)}</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between mb-2">
                    <span className="font-medium">Giảm giá:</span>
                    <span>-{formatPrice(discount)}</span>
                </div>
            )}
            <div className="flex justify-between border-t pt-2 mt-2 text-lg font-medium text-red-500">
                <span>TỔNG THANH TOÁN:</span>
                <span>{formatPrice(finalPrice)}</span>
            </div>
        </section>
    </div>
    <div className="max-w-4xl mx-auto gap-10 p-6 relative flex">
        <button className="border-2 p-3 flex rounded shadow-md text-red-500" onClick={handleBack}>
            <FiArrowLeft size={26}/>
            <span>Trở lại trang trước</span>
        </button>
        <button className="border-2 p-3 flex bg-black rounded shadow-md text-white" onClick={handleContinue}>
            <span>Tiến hành đặt hàng</span>
            <TiTick size={24}/>
        </button>
    </div>
</div>

    );
};

export default ViewOrder;


