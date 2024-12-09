import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Feedback = () => {
    const images = [
        "/assets/fe1.jpg",
        "/assets/fe2.jpg",
        "/assets/fe1.jpg",
        "/assets/fe2.jpg",
        "/assets/fe1.jpg",
        "/assets/fe2.jpg"
    ];


    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const getVisibleImages = () => {
        const leftImages = [
            // images[(currentIndex - 2 + images.length) % images.length],
            images[(currentIndex - 1 + images.length) % images.length]
        ];
        const rightImages = [
            images[(currentIndex + 1) % images.length],
            // images[(currentIndex + 2) % images.length]
        ];

        return { leftImages, rightImages };
    };

    const { leftImages, rightImages } = getVisibleImages();

    return (
        <div className=" w-full p-2 flex flex-col justify-center items-center">
            <h1>Khách hàng đánh giá gì về sản phẩm của chúng tôi</h1>

            <div className="flex justify-center items-center gap-4 w-2/3">
                <button onClick={goPrev} className="p-2 bg-gray-200 rounded-full">
                    <FiArrowLeft size={24} />
                </button>

                <div className="w-full flex justify-center items-center justify-items-center relative">
                    <div className="flex gap-2 opacity-70 brightness-90 absolute">
                        {leftImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Left ${idx}`}
                                className="h-[500px] object-cover rounded-xl opacity-60 border-1 border-black"
                                style={{transform: 'translateX(-90%)'}}
                            />
                        ))}
                    </div>

                    <img
                        src={images[currentIndex]}
                        alt="Main"
                        className="h-[600px] relative z-10 rounded-xl border-1 border-black"
                        // style={{ transform: 'translateX(-60%)' }}
                    />
                    <div className="flex gap-2 opacity-70 brightness-90 absolute">
                        {rightImages.map((img, idx) => (
                            <img 
                                key={idx}
                                src={img}
                                alt={`Right ${idx}`}
                                className="h-[500px] object-cover rounded-xl opacity-60 border-1 border-black"
                                style={{transform: 'translateX(90%)'}}
                            />
                        ))}
                    </div>
                </div>

                <button onClick={goNext} className="p-2 bg-gray-200 rounded-full z-10">
                    <FiArrowRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Feedback;
