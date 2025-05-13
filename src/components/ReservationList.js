import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaDownload, FaFileAlt } from "react-icons/fa";
import { searchMyBookings } from "../services/bookingService";

export default function ReservationList() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await searchMyBookings({ page: 0, size: 100 }); // adjust size as needed
        console.log(resp);
        setBookings(resp.content || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDownloadInvoice = (id) => {
    console.log(`Downloading invoice for booking ${id}`);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mt-16 mb-16">
        <h1 className="text-xl font-semibold text-gray-900 text-left mt-4 mb-6">My Room Bookings</h1>
        <div className="mt-2 h-1 w-16 bg-accent mx-0"></div>
      </div>

      <div className="shadow-lg border rounded-lg">
        <div className="p-6">
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Room</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Booking ID</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Check-in</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-8 py-5 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking.bookingReference} className="hover:bg-gray-50">
                    <td className="px-8 py-5 text-sm font-medium text-gray-900">{booking.room?.title}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.bookingReference}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.room?.price} USD</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.checkIn}</td>
                    <td className="px-8 py-5 text-sm">
                      <span className={`inline-block px-4 py-2 text-xs font-semibold leading-tight ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className="text-gray-500 hover:text-gray-700 mr-4"
                        onClick={() => handleDownloadInvoice(booking.bookingReference)}
                      >
                        <FaFileAlt className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            {currentBookings.map((booking) => (
              <div key={booking.bookingReference} className="border-b border-gray-200 p-6">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">{booking.room?.title}</span>
                  <span className={`inline-block px-4 py-2 text-xs font-semibold leading-tight ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Booking ID:</span>
                    <span className="ml-2">{booking.bookingReference}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <span className="ml-2">{booking.room?.price} USD</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-in:</span>
                    <span className="ml-2">{booking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-out:</span>
                    <span className="ml-2">{booking.checkOut}</span>
                  </div>
                </div>
                <button
                  className="mt-4 text-blue-500"
                  onClick={() => setExpandedBooking(expandedBooking === booking.bookingReference ? null : booking.bookingReference)}
                >
                  {expandedBooking === booking.bookingReference ? "Hide Details" : "Show Details"}
                </button>
                {expandedBooking === booking.bookingReference && (
                  <div className="mt-4">
                    <p><strong>Customer:</strong> {`${booking.customer.firstName} ${booking.customer.lastName}`}</p>
                    <p><strong>Email:</strong> {booking.customer.email}</p>
                    <p><strong>Phone:</strong> {booking.customer.phoneNumber}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center py-6 space-x-4">
            <button
              className="h-10 w-10 rounded-full border border-gray-300 p-3 text-gray-600 hover:bg-gray-200"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-10 w-10 rounded-full border border-gray-300 p-3 ${
                  currentPage === index + 1 ? "bg-accent text-white" : "bg-white text-gray-600"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="h-10 w-10 rounded-full border border-gray-300 p-3 text-gray-600 hover:bg-gray-200"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
