import React from 'react';
import Navigation from '../../components/Navigation';
import Categories from '../../components/Categories';
import Filter from '../../components/Filter';
import ListProduct from '../../components/ListProduct';
import WomenProduct from '../../components/WomenProduct';



const WomenPage = () => {
  return (
    <div>
        <div className='w-full'>
            <Navigation />
        </div>
        <div className='w-full'>
            <Categories />
        </div>
        <div className='w-full flex p-8 justify-between'>
            <div className='w-[20%]'>
                <Filter />
            </div>
            <div className='w-[78%]'>
                <WomenProduct />
            </div>
        </div>
    </div>
  )
      
};

export default WomenPage;
