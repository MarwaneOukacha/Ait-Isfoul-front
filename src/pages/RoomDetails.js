import React, { useContext, useEffect, useState } from 'react';
import AdultsDropdown from '../components/AdultsDropdown';
import KidsDropdown from '../components/KidsDropdown';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import { RoomContext } from '../context/RoomContext';
import { FaBath, FaCheck, FaCocktail, FaCoffee, FaHotdog, FaParking, FaStopwatch, FaSwimmingPool, FaWifi } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getRoomDetails, checkRoomAvailability } from '../services/roomService';
import { toast } from 'sonner';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({ images: [] });

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const { total,setTotal } = useContext(RoomContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoomDetails({ id: id });
        setRoom(data.data || {});
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchData();
  }, [id]);

  const facilities = [
    { name: 'Wifi', icon: <FaWifi /> },
    { name: 'Coffee', icon: <FaCoffee /> },
    { name: 'Bath', icon: <FaBath /> },
    { name: 'Parking Space', icon: <FaParking /> },
    { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
    { name: 'Breakfast', icon: <FaHotdog /> },
    { name: 'GYM', icon: <FaStopwatch /> },
    { name: 'Drinks', icon: <FaCocktail /> },
  ];

  const { title, description, facilitiesDesc, price } = room;
  const imageNames = room.images.map((image) => image.name);

// Add this import at the top

const handleBookNow = async () => {
  if (!checkIn || !checkOut) {
    toast.warning(`Please select both check-in and check-out dates.`,{
    style: {
      background: '#f59e0b', // amber
      color: 'white'
    }});
    return;
  }
   if (total > room.maxPeople) {
    console.error('Error maxPeoaple');
    toast.warning(`This room can not take more than ${room.maxPeople} person.`,{
    style: {
      background: '#f59e0b', // amber
      color: 'white'
    }});
    return;
  }
  // Format date as YYYY-MM-DD
  const formatDateTime = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    return `${yyyy}-${MM}-${dd}`;
  };

  try {
    const response = await checkRoomAvailability({
      roomId: id,
      checkIn: formatDateTime(checkIn),
      checkOut: formatDateTime(checkOut),
    });

    if (response.data === true) {
      navigate('/Book', {
        state: {
          room,
          checkIn,
          checkOut,
          total,
          id
        }
      });
    } else {
      toast.error('Sorry, this room is not available for the selected dates.');
    }
  } catch (error) {
    console.error('Error checking availability:', error);
    toast.error('Could not check availability. Please try again.');
  }
};


  return (
    <section>
      <div className='bg-chambre bg-cover bg-center h-[560px] relative flex justify-center items-center'>
        <div className='absolute w-full h-full'></div>
        <h1 className='text-6xl text-white z-20 font-primary text-center'>{title} Details</h1>
      </div>

      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row h-full py-24'>
          {/* Left side */}
          <div className='w-full h-full lg:w-[60%] px-6'>
            <h2 className='h2'>{title}</h2>
            <p className='mb-8'>{description}</p>

            {/* Carousel */}
            <div className="mb-8">
              <Carousel
                showThumbs={true}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
                autoPlay
                dynamicHeight={false}
                className=" shadow-lg"
              >
                {imageNames.map((img, index) => (
                  <div key={index}>
                    <img
                      src={`/img/rooms/${img}.jpg`}
                      alt={`Room Image ${index + 1}`}
                      className="max-h-[500px] object-cover w-full"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Facilities */}
            <div className='mt-12'>
              <h3 className='h3 mb-3'>Room facilities</h3>
              <p className='mb-12'>{facilitiesDesc}</p>
              <div className='grid grid-cols-2 gap-6 mb-12'>
                {facilities.map((item, index) => (
                  <div className='flex items-center gap-x-3 flex-1' key={index}>
                    <div className='text-3xl text-accent'>{item.icon}</div>
                    <div className='text-3xl text-base'>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className='w-full h-full lg:w-[40%]'>
            <div className='py-8 px-6 bg-accent/20 mb-12'>
              <div className='flex flex-col space-y-4 mb-4'>
                <h3>Your Reservation</h3>
                <div className='h-[60px]'>
                  <CheckIn checkIn={checkIn} setCheckIn={setCheckIn} />
                </div>
                <div className='h-[60px]'>
                  <CheckOut checkOut={checkOut} setCheckOut={setCheckOut} />
                </div>
                <div className='h-[60px]'>
                  <AdultsDropdown />
                </div>
                <div className='h-[60px]'>
                  <KidsDropdown />
                </div>
              </div>
              <button
                className='btn btn-lg btn-primary w-full'
                onClick={handleBookNow}
              >
                Book now for ${price}
              </button>
            </div>

            <div>
              <h3 className='h3'>Hotel rules</h3>
              <p className='mb-6'>
                We are committed to providing all guests with a comfortable, safe, and enjoyable stay. Kindly review the following rules which help maintain the quality and tranquility of our accommodations:
              </p>
              <ul className='flex flex-col gap-y-4'>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-in: 3:00 PM - 9:00 PM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-out: 10:30 AM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No pets
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No smoking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
