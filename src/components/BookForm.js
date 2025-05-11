import React, { useContext, useState } from 'react';
import CheckIn from '../components/CheckIn';
import KidsDropdown from '../components/KidsDropdown';
import AdultsDropdown from '../components/AdultsDropdown';
import CheckOut from '../components/CheckOut';
import { RoomContext } from '../context/RoomContext';



const BookForm = () => {
  const {handleClick}=useContext(RoomContext);
const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);


  return <form className='h-[300px]  w-full lg:h-[70px]'>
    <div className='flex flex-col w-full h-full lg:flex-row'>
      <div className='flex-1 border-r '>
        <CheckIn checkIn={checkIn} setCheckIn={setCheckIn} />
      </div>
      <div className='flex-1 border-r '>
        <CheckOut checkOut={checkOut} setCheckOut={setCheckOut}/>
      </div>
      <div className='flex-1 border-r '>
        <AdultsDropdown/>
      </div>
      <div className='flex-1 border-r '>
        <KidsDropdown/>
      </div>
      <button className='btn btn-primary' type='submit' onClick={(e)=>handleClick(e)}>Check now</button>
    </div>
  </form>;
};

export default BookForm;
