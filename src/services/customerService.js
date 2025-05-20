import axiosInstance from "./axiosInstance";

export const updateCustomer = async (updateCustomerRequest) => {
  if (!updateCustomerRequest || typeof updateCustomerRequest !== 'object') {
    throw new Error('updateCustomerRequest object is required');
  }

  try {
    const response = await axiosInstance.patch('/customers/update', updateCustomerRequest);
    return response.data;
  } catch (err) {
    const errorMessage = err?.response?.data?.message || 'Updating customer failed';
    console.error('Update customer error:', errorMessage);
    throw new Error(errorMessage);
  }
};
