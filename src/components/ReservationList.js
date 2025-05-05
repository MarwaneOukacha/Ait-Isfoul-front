import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaDownload, FaFileAlt } from "react-icons/fa"; // Importing React Icons

// Sample data for room bookings
const roomBookings = [
  {
    id: "#102345",
    room: "Deluxe Suite",
    amount: "1200DH",
    date: "2025/05/02",
    status: "Confirmed",
    customer: "John Doe",
    email: "johndoe@example.com",
    checkIn: "2025/05/02",
    checkOut: "2025/05/10",
  },
  {
    id: "#102346",
    room: "Standard Room",
    amount: "800DH",
    date: "2025/05/10",
    status: "Pending",
    customer: "Jane Smith",
    email: "janesmith@example.com",
    checkIn: "2025/05/10",
    checkOut: "2025/05/12",
  },
  {
    id: "#102347",
    room: "Executive Room",
    amount: "1500DH",
    date: "2025/05/15",
    status: "Confirmed",
    customer: "Alice Johnson",
    email: "alicej@example.com",
    checkIn: "2025/05/15",
    checkOut: "2025/05/20",
  },
  {
    id: "#102348",
    room: "Presidential Suite",
    amount: "3000DH",
    date: "2025/05/20",
    status: "Confirmed",
    customer: "Michael Brown",
    email: "michaelb@example.com",
    checkIn: "2025/05/20",
    checkOut: "2025/05/30",
  },
];

export default function ReservationList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(roomBookings.length / itemsPerPage);
  const [expandedBooking, setExpandedBooking] = useState(null); // State to manage expanded booking

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = roomBookings.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownloadInvoice = (id) => {
    // Add your logic here to download the invoice
    console.log(`Downloading invoice for booking ${id}`);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Heading Section */}
      <div className="mt-16 mb-16">
        <h1 className="text-xl font-semibold text-gray-900 text-left mt-4 mb-6">My Room Bookings</h1>
        <div className="mt-2 h-1 w-16 bg-accent mx-0"></div>
      </div>

      {/* Room Booking Table */}
      <div className="shadow-lg border rounded-lg">
        <div className="p-6">
          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Room</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Booking ID</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-8 py-5 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-8 py-5 text-sm font-medium text-gray-900">{booking.room}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.id}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.amount}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.date}</td>
                    <td className="px-8 py-5 text-sm">
                      <span
                        className={`inline-block px-4 py-2 text-xs font-semibold leading-tight ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className="text-gray-500 hover:text-gray-700 mr-4"
                        onClick={() => handleDownloadInvoice(booking.id)}
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
              <div key={booking.id} className="border-b border-gray-200 p-6">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">{booking.room}</span>
                  <span
                    className={`inline-block px-4 py-2 text-xs font-semibold leading-tight ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Booking ID:</span>
                    <span className="ml-2">{booking.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <span className="ml-2">{booking.amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-2">{booking.date}</span>
                  </div>
                </div>
                <button
                  className="mt-4 text-blue-500"
                  onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                >
                  {expandedBooking === booking.id ? "Hide Details" : "Show Details"}
                </button>
                {expandedBooking === booking.id && (
                  <div className="mt-4">
                    <p><strong>Customer:</strong> {booking.customer}</p>
                    <p><strong>Email:</strong> {booking.email}</p>
                    <p><strong>Check-in:</strong> {booking.checkIn}</p>
                    <p><strong>Check-out:</strong> {booking.checkOut}</p>
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
