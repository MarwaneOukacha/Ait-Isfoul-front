import React, { useContext, useState } from 'react';
import CheckIn from '../components/CheckIn';
import KidsDropdown from '../components/KidsDropdown';
import AdultsDropdown from '../components/AdultsDropdown';
import CheckOut from '../components/CheckOut';
import { RoomContext } from '../context/RoomContext';
import MaxPrice from './MaxPrice';
import MinPrice from './MinPrice';
import Reset from './Reset';



const BookForm = () => {
  const {handleClick}=useContext(RoomContext);
  const {handleReset}=useContext(RoomContext);
  /*const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);*/
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');



  return <form className='h-[300px]  w-full lg:h-[70px]'>
    <div className='flex flex-col w-full h-full lg:flex-row'>
      <div className='flex-1 border-r '>
        <MinPrice minPrice={minPrice} setMinPrice={setMinPrice} />
      </div>
      <div className='flex-1 border-r '>
       <MaxPrice maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      </div>
      <div className='flex-1 border-r '>
        <AdultsDropdown/>
      </div>
      <div className='flex-1 border-r '>
        <KidsDropdown/>
      </div>
      <button className='btn btn-primary' type='submit' onClick={(e)=>handleClick(e,{ minPrice, maxPrice })}>Check now</button>
    </div>
  </form>;
};

export default BookForm;
