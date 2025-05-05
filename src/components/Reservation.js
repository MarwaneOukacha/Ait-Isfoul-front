import { FaBed, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import RommeH02 from '../assets/img/rooms/room02.jpg'
import mastercard from '../assets/img/masterCardd.png'
import visa from '../assets/img/visaa.png'
import american from '../assets/img/americann.png'

import paypal from '../assets/img/paypl.png'




export default function Reservation() {
  return (
    <div className="min-h-screen bg-gray-50   pt-32" >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto my-8 px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Left Column - Room Details */}
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={RommeH02}
                  alt="Room Image"
                  className="mx-auto rounded-md"
                  width={300}
                  height={200}
                />
                <h2 className="text-xl font-bold mt-4">Deluxe Room</h2>
                <p className="text-gray-600">Available from Monday, 5th May 2025</p>
                <p className="text-gray-600">Ocean View, 2 King Beds</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Price per night:</span>
                  <span>1000 DH</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Guests:</span>
                  <span>2</span>
                </div>
                <div className="flex justify-between py-2 border-t pt-4">
                  <span className="font-medium">Total Price:</span>
                  <span className="font-bold">2000 DH</span>
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
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    
                    <input
                      id="id-card"
                      placeholder="Id card"
                      type="text"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">
                      <span className="font-semibold">Important:</span> The person checking in must present their
                      ID card at the reception desk.
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
                    <span className="font-bold">2000 DH</span> to{" "}
                    <span className="font-bold">Hotel XYZ</span>.
                  </p>
                  <p>You will be redirected to our payment partner's site.</p>
                </div>

                <div className="flex justify-center space-x-4 py-2">
                  <img src={american} width={50} height={30} />
                  <img src={mastercard} alt="Mastercard" width={50} height={30} />
                  <img src={visa} alt="Visa" width={50} height={30} />
                  <img src={paypal} alt="paypal" width={50} height={30} />
                </div>
              </div>

              <button className="bg-accent w-full  hover:bg-accent-100 text-white py-3 rounded-md">
                Confirm Booking
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
