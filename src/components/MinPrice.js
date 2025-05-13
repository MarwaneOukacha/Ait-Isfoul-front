import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

const MinPrice = ({ minPrice, setMinPrice }) => {
  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <FaDollarSign className='text-accent text-base' />
      </div>
      <input
        type='number'
        placeholder='Min Price'
        className='w-full h-full pl-10 outline-none'
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
    </div>
  );
};

export default MinPrice;
