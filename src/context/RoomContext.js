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
      const data = await searchRooms({ hotelRef: '450944880104' });
      console.log(data.content)
      setRooms(data.content || []); // depends on your API structure
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  fetchData();
    setTotal(Number(adults[0])+Number(kids[0]));
  },[adults,kids])
  const handleClick=(e)=>{
    e.preventDefault();
    setLoading(true);
    const newRooms=roomData.filter((room)=>{  
      return total<=room.maxPerson
    });
    setTimeout(()=>{
      setRooms(newRooms); //I need to fix it for the api case 
      setLoading(false)
    },3000)
    
  }
  return <RoomContext.Provider value={{ rooms, adults ,setAdults,kids,setKids,total,setTotal,setRooms,handleClick,loading}}>
        {children}
    </RoomContext.Provider>;
};

export default RoomProvider;

