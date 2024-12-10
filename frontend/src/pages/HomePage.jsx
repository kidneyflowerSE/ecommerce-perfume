import React from 'react';
import Navigation from "../components/Navigation";
import Banner_Introduce from '../components/Banner_Introduce';
import ProductList from '../components/ProductList';
import Banner_Content from '../components/Banner_Content';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Categories from '../components/Categories';


const HomePage = () => {

  const products = [
    { id: 1, name: "Chanel No. 5", description: "Nước hoa nổi tiếng của Chanel", imageUrl: "https://via.placeholder.com/150", price: 100, branch: "Gucci" },
    { id: 2, name: "Dior Sauvage", description: "Một hương thơm nam tính và mạnh mẽ", imageUrl: "https://via.placeholder.com/150", price: 200, branch: "Channel" },
    { id: 3, name: "Gucci Bloom", description: "Hương thơm dịu nhẹ cho phụ nữ", imageUrl: "https://via.placeholder.com/150" , price : 80,  branch: "Dior" },
    { id: 4, name: "Tom Ford Black Orchid", description: "Hương thơm sang trọng và quyến rũ", imageUrl: "https://via.placeholder.com/150", price: 20, branch: "Channel"  },
    { id: 5, name: "Yves Saint Laurent Libre", description: "Hương thơm nữ tính và thanh lịch", imageUrl: "https://via.placeholder.com/150" , price: 10, branch: "Gucci" },
    { id: 6, name: "Armani Code", description: "Hương thơm gỗ và gia vị cho nam", imageUrl: "https://via.placeholder.com/150" , price: 10, branch: "Dior" },
    { id: 7, name: "Jo Malone London", description: "Hương thơm tự nhiên và thanh thoát", imageUrl: "https://via.placeholder.com/150" , price: 40, branch: "Dior" },
    { id: 8, name: "Bvlgari Omnia", description: "Nước hoa ấm áp, nữ tính", imageUrl: "https://via.placeholder.com/150" , price: 60, branch: "Dior" },
    { id: 9, name: "Versace Eros", description: "Hương thơm quyến rũ và táo bạo", imageUrl: "https://via.placeholder.com/150" , price: 25, branch: "Dior" },
    { id: 10, name: "Chloe Nomade", description: "Hương thơm hoa cỏ tự nhiên", imageUrl: "https://via.placeholder.com/150" , price: 58, branch: "Dior" },
    { id: 11, name: "Hermes Terre d’Hermes", description: "Hương thơm gỗ mạnh mẽ cho nam", imageUrl: "https://via.placeholder.com/150", price: 60 , branch: "Gucci" },
    { id: 12, name: "Prada L'Homme", description: "Hương thơm nhẹ nhàng và thanh thoát", imageUrl: "https://via.placeholder.com/150", price: 30 , branch: "Channel" },
    { id: 13, name: "Chanel Bleu", description: "Hương thơm gỗ và citrus", imageUrl: "https://via.placeholder.com/150" , price: 35, branch: "Channel" },
    { id: 14, name: "Dolce & Gabbana Light Blue", description: "Nước hoa nhẹ nhàng và tươi mát", imageUrl: "https://via.placeholder.com/150" , price: 60, branch: "Channel" },
    { id: 15, name: "Calvin Klein Eternity", description: "Hương thơm quyến rũ và lãng mạn", imageUrl: "https://via.placeholder.com/150" , price: 70, branch: "Channel" },
    { id: 16, name: "Marc Jacobs Daisy", description: "Hương thơm hoa cỏ tươi mát", imageUrl: "https://via.placeholder.com/150" , price: 80, branch: "Channel" },
];

  const diorProducts = products.filter(product => product.branch === "Dior");
  const channelProducts = products.filter(product => product.branch === "Channel");
  const gucciProducts = products.filter(product => product.branch === "Gucci");


  return (
    <div>
      <div className='w-full'>
          <Navigation />
      </div>
      <div className='w-full'>
          <Categories />
      </div>
      <div className='flex justify-center justify-items-center w-full p-20'>
          <Banner_Introduce />
      </div>
      <div className='w-full'>
        <div>
          <div className='w-full flex justify-between pl-20 pr-20'>
            <h1>Dior</h1>
            <div className='flex'>
              <span>Xem thêm</span>
              <FiArrowRight />
            </div>
          </div>
          <ProductList products={diorProducts}/>
        </div>
        <div>
        <div className='w-full flex justify-between pl-20 pr-20'>
            <h1>Channel</h1>
            <div className='flex'>
              <span>Xem thêm</span>
              <FiArrowRight />
            </div>
          </div>
          <ProductList products={channelProducts} />
        </div>
        <div>
        <div className='w-full flex justify-between pl-20 pr-20'>
            <h1>Gucci</h1>
            <div className='flex'>
              <span>Xem thêm</span>
              <FiArrowRight />
            </div>
          </div>
          <ProductList products={gucciProducts}/>
        </div>
      </div>
      <div className='w-full justify-center justify-items-center p-20'>
        <Banner_Content />
      </div>
      <div className='w-full'>
      <div className='w-full flex justify-between pl-20 pr-20'>
            <h1>Dior</h1>
            <div className='flex'>
              <span>Xem thêm</span>
              <FiArrowRight />
            </div>
          </div>
          <ProductList products={diorProducts} />
      </div>
      <div className='w-full'>
        <Feedback />
      </div>
      <div className='w-full bg-black text-white'>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
