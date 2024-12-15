import React, { useEffect, useRef } from "react";

const BrandIntro = () => {
    const images = [
        "/assets/clive.jpg",
        "/assets/dior.jpg",
        "/assets/lv.jpg",
        "/assets/tom ford.png",
        "/assets/clive.jpg",
        "/assets/dior.jpg",
        "/assets/lv.jpg",
        "/assets/tom ford.png",
    ];

    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        let animationFrame;
        let scrollAmount = 1; 

        const scrollCarousel = () => {
            carousel.scrollLeft -= scrollAmount;
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0; 
            }

            animationFrame = requestAnimationFrame(scrollCarousel);
        };

        animationFrame = requestAnimationFrame(scrollCarousel);

        return () => cancelAnimationFrame(animationFrame); 
    }, []);
    return (
        <div
            ref={carouselRef}
            className="w-full overflow-hidden whitespace-nowrap gap-2"
            style={{ height: "auto" }}
        >
            <div className="inline-flex w-[150px] ">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Image ${idx}`}
                        className="inline-block mx-2 border"
                        style={{ display: "inline-block" }}
                    />
                ))}
                {images.map((img, idx) => (
                    <img
                        key={`duplicate-${idx}`}
                        src={img}
                        alt={`Duplicate Image ${idx}`}
                        className="inline-block mx-2"
                        style={{ display: "inline-block" }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrandIntro;
