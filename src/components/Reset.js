import React from 'react';
import { BiReset } from 'react-icons/bi';
import '../datepicker.css'; // Optional: for consistent styling

const Reset = ({ onReset }) => {
  return (
    <div className='relative flex items-center justify-end h-full w-10' >
      
    <button
      type='button'
      onClick={onReset}
      className='flex items-center justify-center w-full h-full bg-white border border-gray-300 rounded'
    >
      <BiReset className='text-accent text-xl' />
    </button>
    </div>
  );
};

export default Reset;
