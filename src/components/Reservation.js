import { FaBed, FaMoneyBillWave, FaCalendarAlt, FaSpinner } from "react-icons/fa";
import RommeH02 from '../assets/img/rooms/room02.jpg';
import mastercard from '../assets/img/masterCardd.png';
import visa from '../assets/img/visaa.png';
import american from '../assets/img/americann.png';
import paypal from '../assets/img/paypl.png';

import { toast } from 'sonner';
import { useLocation } from "react-router-dom";
import { getUserIdFromToken } from "../services/auth";
import { useEffect, useState } from "react";
import { createBooking } from "../services/bookingService";

function calculateNumberOfNights(checkInStr, checkOutStr) {
  const checkInDate = new Date(checkInStr);
  const checkOutDate = new Date(checkOutStr);
  const diffInTime = checkOutDate - checkInDate;
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays > 0 ? diffInDays : 1;
}

const formatDateTime = (date) => {
  const pad = (n) => n.toString().padStart(2, '0');
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  return `${yyyy}-${MM}-${dd}`;
};

export default function Reservation() {
  const location = useLocation();
  const { room, checkIn, checkOut, total, id } = location.state || {};
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);

    const bookingRequest = {
      roomId: id,
      firstName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      currency: "USD",
      customerId: "e3744606-776d-4f55-9567-045b27a446f0",
      checkIn: formatDateTime(checkIn),
      checkOut: formatDateTime(checkOut),
      total: total,
      adultsCount: 0,
      kidsCount: 0,
    };

    try {
      const response = await createBooking(bookingRequest);
      if (response?.checkoutUrl) {
        setTimeout(() => {
          window.location.href = response.checkoutUrl;
        }, 500);
      } else {
        toast.error('Something went wrong while redirecting to the payment page. Please try again later.');
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Booking failed: You need to log in`);
      setLoading(false);
    }
  };

  useEffect(() => {
    const idi = getUserIdFromToken();
    setUserId(idi);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <main className="max-w-6xl mx-auto my-8 px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Left Column - Room Details */}
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={`/img/rooms/${room?.images?.[0]?.name}.jpg`}
                  alt="Room Image"
                  className="mx-auto rounded-md"
                  width={300}
                  height={200}
                />
                <h2 className="text-xl font-bold mt-4">{room?.title}</h2>
                <p className="text-gray-600">{room?.facilitiesDesc}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Price per night:</span>
                  <span>{room?.price} USD</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Capacity room:</span>
                  <span>{room?.maxPeople}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Guests:</span>
                  <span>{total}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Number of nights:</span>
                  <span>{calculateNumberOfNights(checkIn, checkOut)}</span>
                </div>
                <div className="flex justify-between py-2 border-t pt-4">
                  <span className="font-medium">Total Price:</span>
                  <span className="font-bold">
                    {room?.price * calculateNumberOfNights(checkIn, checkOut)} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
                <p className="text-gray-600 mb-4">
                  Please provide the information of the person who will be checking in.
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-md"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-2 border rounded-md"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <input
                    id="id-card"
                    placeholder="Id card"
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                  />

                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p>
                      <span className="font-semibold">Important:</span> The person checking in must present
                      their ID card at the reception desk.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="form-checkbox" />
                    <label htmlFor="terms" className="text-sm">
                      I accept the{" "}
                      <a href="#" className="text-red-600 hover:underline">
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="credit-card" name="payment" value="credit-card" />
                  <label htmlFor="credit-card">Credit Card</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="cash" name="payment" value="cash" />
                  <label htmlFor="cash">PayPal</label>
                </div>

                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  <p>
                    You will proceed with a secure payment of{" "}
                    <span className="font-bold">{room?.price * calculateNumberOfNights(checkIn, checkOut)} USD</span> to{" "}
                    <span className="font-bold">Ait Isfoul Hotel</span>.
                  </p>
                  <p>You will be redirected to our payment partner's site.</p>
                </div>

                <div className="flex justify-center space-x-4 py-2">
                  <img src={american} width={50} height={30} alt="American Express" />
                  <img src={mastercard} alt="Mastercard" width={50} height={30} />
                  <img src={visa} alt="Visa" width={50} height={30} />
                  <img src={paypal} alt="Paypal" width={50} height={30} />
                </div>
              </div>

              <button
                className="bg-accent w-full hover:bg-accent-100 text-white py-3 rounded-md flex items-center justify-center"
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
