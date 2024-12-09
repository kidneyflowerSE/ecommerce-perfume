import React from "react";

const Footer = () => {
    return (
        <div className="p-10 flex justify-between">
            <div className="flex flex-col">
                <h2>Brand nước hoa cho Nam</h2>
                <span>Dior</span>
                <span>Channel</span>
                <span>Tom Ford</span>
                <span>Creed</span>
                <span>Gucci</span>
            </div>
            <div className="flex flex-col">
                <h2>Brand nước hoa cho Nữ</h2>
                    <span>Dior</span>
                    <span>Channel</span>
                    <span>Tom Ford</span>
                    <span>Creed</span>
                    <span>Gucci</span>
            </div>
            <div className="flex flex-col">
                <h2>Về chúng tôi</h2>
                <p>Chính sách</p>
                <p>Giới thiệu</p>
                <p>Liên hệ</p>
            </div>
            <dir className="flex flex-col">
                <h2>Địa chỉ cửa hàng</h2>
                <p>11 Nguyễn Đình Chiểu, P.ĐaKao, Quận 1, TP.Hồ Chí Minh</p>
            </dir>
        </div>
    )
};
export default Footer;