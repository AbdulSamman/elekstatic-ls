import axiosClient from "./axiosClient";

const addToCart = async (payload: any) => {
  return await axiosClient.post("/api/carts", payload);
};

// get cart Data
const getUserCartItems = async (email: any) => {
  return await axiosClient.get(
    `/api/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );
};

const deleteCartItem = async (documentId: any) => {
  return await axiosClient.delete(`/api/carts/${documentId}`);
};

export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
};
