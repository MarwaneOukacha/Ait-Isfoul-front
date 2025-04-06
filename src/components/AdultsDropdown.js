import React, { useContext } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { RoomContext } from '../context/RoomContext';

const AdultsDropdown = () => {
  const list = [
    { name: '1 Adult' },
    { name: '2 Adults' },
    { name: '3 Adults' },
    { name: '4 Adults' },
  ];
  const {adults,setAdults}=useContext(RoomContext);
  return (
  
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8">
        {adults}
        <BsChevronDown className="text-base text-accent-hover" />
      </Menu.Button>
      <Menu.Items as="ul" className="bg-white absolute w-full flex flex-col z-40">
        {list.map((li, index) => (
          <Menu.Item as="li" key={index} className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex items-center px-4 justify-center items-center cursor-pointer"
          onClick={()=>setAdults(li.name)}
          >
            {li.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default AdultsDropdown;
