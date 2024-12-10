import React from "react";

const Banner_Content = () => {
    return (
        <div className="flex">
            <div className="flex flex-col w-1/2 justify-center justify-items-center p-4">
                <h3>Mùi hương khơi gợi sự bí ẩn nhất?</h3>
                <h2>N°5 Eau de Parfum</h2>
                <p>N°5, một đóa hoa aldehyde hoà quyện giữa hương hoa hồng và hoa nhài, 
                    được tăng cường bởi nốt hương aldehyde mang đến sự hiện diện độc đáo.
                     Một hương thơm bí ẩn có sức hấp dẫn không thể lý giải.
                     Nếu sự bí ẩn được đặt tên, N°5 sẽ là câu trả lời.    
                </p>
            </div>
            <div className="flex w-1/2 justify-center">
                <img 
                    src="/assets/1.jpg" alt="" 
                    className="w-[400px] h-[400px]"
                />
            </div>
            
        </div>
    )
};
export default Banner_Content;
