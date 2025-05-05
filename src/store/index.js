import axiosInstance from "../helpers/ApiClient";
import storeCreator from "../middlewares/storeCreator";

// Create the store with the axios instance
export const store = storeCreator(axiosInstance);

// The types below are just for TypeScript; in JavaScript, we don't use them.
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
