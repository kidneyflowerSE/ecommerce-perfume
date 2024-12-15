import React from "react";

const Footer = () => {
    return (
        <div className="p-10 bg-gray-900 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand nước hoa cho Nam */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Brand nước hoa cho Nam</h2>
                    <ul className="space-y-2">
                        <li>Dior</li>
                        <li>Channel</li>
                        <li>Tom Ford</li>
                        <li>Creed</li>
                        <li>Gucci</li>
                    </ul>
                </div>

                {/* Brand nước hoa cho Nữ */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Brand nước hoa cho Nữ</h2>
                    <ul className="space-y-2">
                        <li>Dior</li>
                        <li>Channel</li>
                        <li>Tom Ford</li>
                        <li>Creed</li>
                        <li>Gucci</li>
                    </ul>
                </div>

                {/* Về chúng tôi */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Về chúng tôi</h2>
                    <ul className="space-y-2">
                        <li>Chính sách</li>
                        <li>Giới thiệu</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>

                {/* Địa chỉ cửa hàng */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Địa chỉ cửa hàng</h2>
                    <p className="mb-4">
                        11 Nguyễn Đình Chiểu, P.ĐaKao, Quận 1, TP.Hồ Chí Minh
                    </p>
                    <div
                        className="rounded-md overflow-hidden shadow-lg"
                        style={{ filter: 'grayscale(1)' }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.9552993636717!2d106.7006798196022!3d10.789486284853194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b545b5903b%3A0x2381a6fe3f690419!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCBWaeG7hW4gdGjDtG5nIEPGoSBz4bufIHThuqFpIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1734085372744!5m2!1svi!2s"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Store Location"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm flex flex-col text-gray-400">
                © {new Date().getFullYear()} Perfume Store. All rights reserved.
                <span className="mt-1 italic">Design & Build By Lý Trọng Ân - Vũ Hoàng Phát - Phạm Nguyễn Quốc Huy</span>
            </div>
        </div>
    );
};

export default Footer;
