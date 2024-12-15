import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Banner_Introduce from "../components/Banner_Introduce";
import Banner_Content from "../components/Banner_Content";
import Footer from "../components/Footer";
import Feedback from "../components/Feedback";
import Categories from "../components/Categories";
import ProductSection from "../components/ProductSection";
import axios from "axios";
import Marquee from "../components/Marquee";

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const itemsPerPage = 4;

  const targetFirstBrands = ["LV", "Dior", "Clive"];
  const targetSecondBrands = ["Tom Ford", "Roja", "Liis"];

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/brands");
      setBrands(response.data); // Save all brands from API
    } catch (err) {
      console.error("Failed to fetch brands:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter brands for targetFirstBrands and targetSecondBrands
  const getFilteredBrands = (targets) => {
    return brands.filter((brand) => targets.includes(brand.name));
  };

  const firstBrandSections = getFilteredBrands(targetFirstBrands);
  const secondBrandSections = getFilteredBrands(targetSecondBrands);

  return (
    <div>
      <div className="w-full">
        <Navigation />
      </div>
      <div className="w-full">
        <Categories />
      </div>
      <div className="w-full">
        <Marquee />
      </div>
      <div className="flex flex-col justify-center justify-items-center w-full p-20">
        <h1 className="py-4 font-semibold underline text-xl mt-4">
          TOP SẢN PHẨM BÁN CHẠY NHẤT
        </h1>
        <Banner_Introduce />
      </div>

      {/* Hiển thị targetFirstBrands */}
      {firstBrandSections.map((brand) => (
        <ProductSection
          key={brand.id}
          brandName={brand.name}
          targetBrands={[brand.name]}
          itemsPerPage={itemsPerPage}
        />
      ))}

      <div className="w-full justify-center justify-items-center p-20">
        <Banner_Content />
      </div>

      {/* Hiển thị targetSecondBrands */}
      {secondBrandSections.map((brand) => (
        <ProductSection
          key={brand.id}
          brandName={brand.name}
          targetBrands={[brand.name]}
          itemsPerPage={itemsPerPage}
        />
      ))}

      <div className="w-full">
        <span className="flex flex-col justify-center items-center mt-10 py-10">
          <span className="border-t-2 pb-10 w-2/3"></span>
          <h1 className="text-2xl font-medium">
            KHÁCH HÀNG ĐÁNH GIÁ GÌ VỀ SẢN PHẨM CỦA CHÚNG TÔI
          </h1>
        </span>
        <Feedback />
      </div>

      <div className="w-full bg-black text-white">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
