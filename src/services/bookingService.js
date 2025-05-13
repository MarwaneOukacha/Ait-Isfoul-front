import axiosInstance from './axiosInstance';


export const createBooking = async (bookingRequest) => {
  if (!bookingRequest) {
    throw new Error('bookingRequest is required');
  }

  try {
    const response = await axiosInstance.post('/bookings/create', bookingRequest);
    return response.data; // This should match BookingResponseDTO
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const searchMyBookings = async ({
  keyword,
  status,
  checkIn,
  checkOut,
  page = 0,
  size = 10
} = {}) => {
  const response = await axiosInstance.get('/bookings/myBookings', {
    params: {
      keyword,
      status,
      checkIn,
      checkOut,
      page,
      size
    }
  });

  return response.data;
};