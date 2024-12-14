import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Banner_Introduce from "../components/Banner_Introduce";
import Banner_Content from "../components/Banner_Content";
import Footer from "../components/Footer";
import Feedback from "../components/Feedback";
import Categories from "../components/Categories";
import axios from "axios";
import ProductSection from "../components/ProductSection";
import BrandIntro from "../components/BrandIntro";

const targetFirstBrands = ["LV", "Dior", "Clive"];
const targetSecondBrands = ["Tom Ford", "Roja"];

const fetchBrandsFromLocalStorage = (setBrands, setLoading, setError) => {
  try {
    const storedBrands = localStorage.getItem("brand");
    if (storedBrands) {
      const parsedBrands = JSON.parse(storedBrands);
      setBrands(parsedBrands);
      setLoading(false);
    } else {
      setError("Không có dữ liệu trong localStorage.");
      setLoading(false);
    }
  } catch (e) {
    setError("Dữ liệu trong localStorage không hợp lệ.");
    setLoading(false);
  }
};

const fetchBrandsFromAPI = async (setBrands, setLoading, setError) => {
  try {
    const response = await axios.get("http://localhost:8080/api/brands");
    const brandsData = response.data;
    localStorage.setItem("brand", JSON.stringify(brandsData));
    setBrands(brandsData);
    setLoading(false);
  } catch (e) {
    setError("Không thể tải dữ liệu từ API.");
    setLoading(false);
  }
};

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchBrands = async () => {
      const storedBrands = localStorage.getItem("brand");
      if (storedBrands) {
        fetchBrandsFromLocalStorage(setBrands, setLoading, setError);
      } else {
        await fetchBrandsFromAPI(setBrands, setLoading, setError);
      }
    };

    fetchBrands();
  }, []);

  const firstBrandSections = brands.filter((brand) =>
    targetFirstBrands.includes(brand.name)
  );

  const secondBrandSections = brands.filter((brand) =>
    targetSecondBrands.includes(brand.name)
  );

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="w-full">
        <Navigation />
      </div>
      <div className="w-full">
        <Categories />
      </div>
      <div className="flex flex-col justify-center justify-items-center w-full p-20">
        <h1>TOP SẢN PHẨM BÁN CHẠY NHẤT</h1>
        <Banner_Introduce />
      </div>

      <div className="w-full flex flex-col items-center shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
        {firstBrandSections.map((brand) => (
          <ProductSection
            key={brand.id}
            brandName={brand.name}
            products={brand.products}
            itemsPerPage={itemsPerPage}
          />
        ))}
      </div>

      

      <div className="w-full justify-center justify-items-center p-20">
        <Banner_Content />
      </div>
      <div className="w-full flex flex-col items-center shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
        {secondBrandSections.map((brand) => (
          <ProductSection
            key={brand.id}
            brandName={brand.name}
            products={brand.products}
            itemsPerPage={itemsPerPage}
          />
        ))}
      </div>
      
      <div className="w-full">
        <span className="flex flex-col justify-center items-center mt-10 py-10">
          <span className="border-t-2 pb-10 w-2/3"></span>
          <h1 className="text-2xl font-medium">KHÁCH HÀNG ĐÁNH GIÁ GÌ VỀ SẢN PHẨM CỦA CHÚNG TÔI</h1>
        </span>
        <Feedback />
      </div>

      <div className="w-full">
        <span className="flex flex-col justify-center items-center mt-10 py-10">
          <span className="border-t-2 pb-10 w-2/3"></span>
          <h1 className="text-2xl font-medium">KHÁCH HÀNG ĐÁNH GIÁ GÌ VỀ SẢN PHẨM CỦA CHÚNG TÔI</h1>
        </span>
        <BrandIntro />
      </div>

      <div className="w-full bg-black text-white">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
