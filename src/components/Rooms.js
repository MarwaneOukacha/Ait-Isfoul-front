import React, { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';
import Room from '../components/Room';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const {rooms,loading}=useContext(RoomContext);
  
  return <section className='py-24'>
    {loading && (<div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center '>
      <TailSpin color='white'/>
    </div>)}
    <div className='container mx-auto lg:px-0'>
      <div className='text-center'>
        <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>
          Hotel & Restaurant
        </div>
        <h2 className='font-primary text-[45px] mb-4'>Room & Suites</h2>
      </div>
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {rooms.map((room,indexe)=>{
            return <Room room={room} key={indexe}/>
          })}
          
        </div>

    </div>
  </section>;
};

export default Rooms;
