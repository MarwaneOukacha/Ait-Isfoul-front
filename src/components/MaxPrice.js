import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

const MaxPrice = ({ maxPrice, setMaxPrice }) => {
  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <FaDollarSign className='text-accent text-base' />
      </div>
      <input
        type='number'
        placeholder='Max Price'
        className='w-full h-full pl-10 outline-none'
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>
  );
};

export default MaxPrice;
