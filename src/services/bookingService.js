import axios from 'axios';

export const createBooking = async (bookingRequest) => {
  if (!bookingRequest) {
    throw new Error('bookingRequest is required');
  }

  try {
    const response = await axios.post('http://localhost:8088/bookings/create', bookingRequest);
    return response.data; // This should match BookingResponseDTO
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
