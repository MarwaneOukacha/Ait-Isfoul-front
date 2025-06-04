import React,{createContext,useEffect,useState} from 'react';
import { searchRooms } from '../services/roomService'; // path to your API service

import {roomData} from '../data';

export const RoomContext=createContext();

const RoomProvider = ({children}) => {
  
  
  const [rooms,setRooms]=useState([]);
  const [adults,setAdults]=useState('1 Adult');
  const [kids,setKids]=useState('0 Kids');
  const [total,setTotal]=useState(0);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
   const fetchData = async () => {
    try {
      const data = await searchRooms({ hotelRef: '450944016524' });
      console.log(data.content)
      setRooms(data.content || []); // depends on your API structure
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  fetchData();
  setTotal(Number(adults[0])+Number(kids[0]));
  },[adults, kids])

  const handleClick= async (e,{ minPrice, maxPrice })=>{
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchRooms({ hotelRef: '450944016524' ,minPrice:minPrice,maxPrice:maxPrice,maxPeople:total});
      console.log(data.content)
      setRooms(data.content || []); // depends on your API structure
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setLoading(false)
  }
  return <RoomContext.Provider value={{ rooms, adults ,setAdults,kids,setKids,total,setTotal,setRooms,handleClick,loading}}>
        {children}
    </RoomContext.Provider>;
};

export default RoomProvider;

