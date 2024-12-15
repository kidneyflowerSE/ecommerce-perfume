import React from "react";
import "../css/Marquee.css"

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        {Array(10)
          .fill("Perfume Store")
          .map((text, index) => (
            <span key={index} className="marquee-text">
              {text}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
