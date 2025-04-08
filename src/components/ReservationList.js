"use client";

import { useState } from "react";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaTrash,
  FaCheckCircle,
  FaDoorOpen,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
} from "react-icons/fa";

const reservations = [
  {
    id: 1,
    guestName: "John Doe",
    checkIn: "2025-05-20",
    checkOut: "2025-05-25",
    roomType: "Deluxe King",
    status: "confirmed",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    checkIn: "2025-06-10",
    checkOut: "2025-06-15",
    roomType: "Ocean View Suite",
    status: "pending",
  },
  {
    id: 3,
    guestName: "Alex Johnson",
    checkIn: "2025-07-01",
    checkOut: "2025-07-04",
    roomType: "Standard Room",
    status: "cancelled",
  },
];

export default function ReservationList() {
  const [openReservationId, setOpenReservationId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  const toggleDropdown = (id) => {
    setOpenReservationId(openReservationId === id ? null : id);
  };

  const handleDeleteClick = (id) => {
    // Show the confirmation popup when trash icon is clicked
    setShowModal(true);
    setReservationToDelete(id);
  };

  const handleCancelDelete = () => {
    // Close the modal without deleting
    setShowModal(false);
    setReservationToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Handle the deletion logic here, e.g., call an API to delete the reservation
    console.log(`Reservation ${reservationToDelete} cancelled.`);
    setShowModal(false);
    setReservationToDelete(null);
  };

  const handleDownloadInvoice = (id) => {
    // You can implement the logic for downloading the invoice
    console.log(`Download invoice for reservation ${id}`);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 pt-24 px-6">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Reservation List</h2>

        <div className="space-y-8">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white shadow-md p-6 border border-gray-100 transition-all hover:shadow-xl"
            >
              {/* Header row */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDropdown(res.id)}
              >
                <div className="flex-1 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-10 text-lg">
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaUserAlt className="text-accent w-5 h-5" />
                    <span className="font-semibold">{res.guestName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt />
                    <span>{res.checkIn} → {res.checkOut}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaDoorOpen />
                    <span>{res.roomType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-semibold uppercase px-4 py-1 tracking-wide 
                    ${res.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : res.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}
                  >
                    {res.status}
                  </span>

                  {openReservationId === res.id ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>

              {/* Dropdown content */}
              {openReservationId === res.id && (
                <div className="mt-6 text-gray-600 text-sm space-y-2">
                  <p><strong>Email:</strong> john@example.com</p>
                  <p><strong>Guests:</strong> 2 adults</p>
                  <p><strong>Special Requests:</strong> Early check-in, sea view</p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-red-500 hover:text-red-700 transition">
                      <FaTrash size={18} onClick={() => handleDeleteClick(res.id)} />
                    </button>
                    <FaDownload size={18} className="text-gray hover:text-accent transition"/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6  shadow-xl w-96">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cancel Reservation</h2>
              <p className="text-gray-600">
                Are you sure you want to cancel the reservation? Please note that you may not receive the full refund due to Stripe's cancellation policy.
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
