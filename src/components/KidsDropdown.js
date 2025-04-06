import React,{useContext} from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { RoomContext } from '../context/RoomContext';

const KidsDropdown = () => {
  const list = [
      { name: '0 Kid' },
      { name: '1 Kid' },
      { name: '2 Kids' },
      { name: '3 Kids' },
      { name: '4 Kids' },
    ];
    const {kids,setKids}=useContext(RoomContext);
  
    return (
      <Menu as="div" className="w-full h-full bg-white relative">
        <Menu.Button className="w-full h-full flex items-center justify-between px-8">
          {kids==='0 Kids' ? 'No kids':kids}
          <BsChevronDown className="text-base text-accent-hover" />
        </Menu.Button>
        <Menu.Items as="ul" className="bg-white absolute w-full flex flex-col z-40">
          {list.map((li, index) => (
            <Menu.Item as="li" key={index} className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex items-center px-4 justify-center items-center cursor-pointer"
            onClick={()=>setKids(li.name)}
            >
              {li.name}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    );
};

export default KidsDropdown;
