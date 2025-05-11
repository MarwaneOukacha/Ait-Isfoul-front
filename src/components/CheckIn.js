import React,{useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
import {BsCalendar} from 'react-icons/bs'


const CheckIn = ({ checkIn, setCheckIn }) => {
  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <BsCalendar className='text-accent text-base'/>
      </div>
      <DatePicker
        className='w-full h-full'
        selected={checkIn}
        placeholderText='Check in'
        onChange={(date) => setCheckIn(date)}
      
      />
    </div>
  );
};

export default CheckIn;
