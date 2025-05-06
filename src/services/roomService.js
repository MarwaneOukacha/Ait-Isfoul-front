// services/roomService.js
import axios from 'axios';

export const searchRooms = async ({
  hotelRef,
  keyword,
  roomStatus,
  minPrice,
  maxPrice,
  maxPeople,
  page = 0,
  size = 10,
  sort = 'id,desc'
}) => {
  if (!hotelRef) {
    throw new Error('hotelRef is required');
  }

  const params = new URLSearchParams();

  params.append('hotelRef', hotelRef);
  if (keyword) params.append('keyword', keyword);
  if (roomStatus) params.append('roomStatus', roomStatus);
  if (minPrice !== undefined) params.append('minPrice', minPrice);
  if (maxPrice !== undefined) params.append('maxPrice', maxPrice);
  if (maxPeople !== undefined) params.append('maxPeople', maxPeople);
  params.append('page', page);
  params.append('size', size);
  params.append('sort', sort);

  const response = await axios.get(`http://localhost:8088/rooms/search/hotel?${params.toString()}`);
  return response.data; // Expected to be paginated result
};
