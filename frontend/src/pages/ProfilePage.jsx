import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState({});

    // Lấy thông tin người dùng từ localStorage
    useEffect(() => {
        const customerData = JSON.parse(localStorage.getItem("customer"));
        if (!customerData) {
            navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
        } else {
            setCustomer(customerData);
            setUpdatedCustomer(customerData);
        }
    }, [navigate]);

    // Hàm xử lý khi người dùng chỉnh sửa thông tin
    const handleEdit = () => setEditMode(true);

    const handleSave = () => {
        // Cập nhật thông tin người dùng (giả sử API `/api/customers/update/{id}` tồn tại)
        fetch(`http://localhost:8080/api/customers/update/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCustomer),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Cập nhật thông tin thành công!");
                    setCustomer(updatedCustomer);
                    localStorage.setItem("customer", JSON.stringify(updatedCustomer));
                    setEditMode(false);
                } else {
                    throw new Error("Cập nhật thông tin thất bại");
                }
            })
            .catch((error) => alert(error.message));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer((prev) => ({ ...prev, [name]: value }));
    };

    if (!customer) {
        return null;
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold tracking-wider mb-8">Hồ Sơ Cá Nhân</h1>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2" htmlFor="name">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedCustomer.name}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-2 border rounded placeholder:italic"
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
                        value={updatedCustomer.email}
                        onChange={handleChange}
                        disabled
                        className="w-full px-4 py-2 border rounded placeholder:italic"
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
                        value={updatedCustomer.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-2 border rounded placeholder:italic"
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
                        value={updatedCustomer.address}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-2 border rounded placeholder:italic"
                    />
                </div>

                {editMode ? (
                    <button
                        onClick={handleSave}
                        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Lưu thay đổi
                    </button>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Chỉnh sửa
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
