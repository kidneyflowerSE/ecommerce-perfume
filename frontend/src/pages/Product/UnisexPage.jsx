import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import Categories from '../../components/Categories';
import Filter from '../../components/Filter';
import ListProduct from '../../components/ListProduct';
import UnisexProduct from '../../components/UnisexProduct';



const UnisexPage = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    
        const handleFilterResults = (products) => {
        setFilteredProducts(products);
      };

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
                <Filter onFilter={handleFilterResults}/>
            </div>
            <div className='w-[78%]'>
                <UnisexProduct filteredProducts={filteredProducts} />
            </div>
        </div>
    </div>
  )
      
};

export default UnisexPage;
