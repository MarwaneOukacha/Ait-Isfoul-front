import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function Invoice({ booking, onClose }) {
  const invoiceRef = useRef();

  const generatePDF = () => {
    const element = invoiceRef.current;
    if (!element) {
      console.error("Invoice ref not found");
      return;
    }

    const options = {
      margin: 0.5,
      filename: `${booking.bookingReference}-invoice.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        if (onClose) onClose();
      });
  };

  return (
    <div>
      {/* Off-screen but visible invoice container */}
      <div
        ref={invoiceRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "210mm",
          padding: "20mm",
          backgroundColor: "white",
          color: "black",
          fontSize: "12pt",
          lineHeight: "1.4",
        }}
      >
        <h1>{booking.room?.title} Invoice</h1>
        <p><strong>Booking ID:</strong> {booking.bookingReference}</p>
        <p><strong>Customer:</strong> {booking.customer?.firstName} {booking.customer?.lastName}</p>
        <p><strong>Check-in:</strong> {booking.checkIn}</p>
        <p><strong>Check-out:</strong> {booking.checkOut}</p>
        <p><strong>Amount:</strong> {booking.room?.price} USD</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>

      <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Download Invoice PDF
      </button>
    </div>
  );
}
