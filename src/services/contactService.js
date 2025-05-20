import axiosInstance from "./axiosInstance";

export const contactUs = async ({ name, email,subject,message }) => {
  try {
    const response = await axiosInstance.post(`/email/contact`, { name, email,subject,message });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'contact us failed');
  }
};